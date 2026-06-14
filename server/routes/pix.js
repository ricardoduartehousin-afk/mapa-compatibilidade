import { Router } from 'express';
import { queryOne, execute } from '../db.js';
import { sendLeadReport } from '../email.js';

const router = Router();

const BASE_URLS = {
  sandbox: 'https://api-sandbox.asaas.com/v3',
  production: 'https://api.asaas.com/v3'
};

function getAsaasBaseUrl() {
  const mode = process.env.ASAAS_MODE || 'sandbox';
  return BASE_URLS[mode] || BASE_URLS.sandbox;
}

function getAsaasHeaders() {
  return {
    'Content-Type': 'application/json',
    'User-Agent': 'TesteDeAfinidade/1.0',
    'access_token': process.env.ASAAS_API_KEY
  };
}

function gerarCpfPlaceholder(email) {
  const hash = email.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const base = (hash % 899999999) + 100000000;
  const digits = base.toString().split('').map(Number);
  let sum1 = 0, sum2 = 0;
  for (let i = 0; i < 9; i++) {
    sum1 += digits[i] * (10 - i);
    sum2 += digits[i] * (11 - i);
  }
  let d1 = (sum1 * 10) % 11;
  if (d1 === 10) d1 = 0;
  sum2 += d1 * 2;
  let d2 = (sum2 * 10) % 11;
  if (d2 === 10) d2 = 0;
  return `${base}${d1}${d2}`;
}

async function criarOuBuscarCliente(nome, email, cpf) {
  const baseUrl = getAsaasBaseUrl();
  const headers = getAsaasHeaders();

  const searchRes = await fetch(`${baseUrl}/customers?email=${encodeURIComponent(email)}`, { headers });
  if (searchRes.ok) {
    const searchData = await searchRes.json();
    if (searchData.data && searchData.data.length > 0) {
      return { id: searchData.data[0].id, created: false };
    }
  }

  const createRes = await fetch(`${baseUrl}/customers`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      name: nome,
      email,
      cpfCnpj: cpf || gerarCpfPlaceholder(email),
      notificationDisabled: true
    })
  });

  if (!createRes.ok) {
    const err = await createRes.text();
    console.error('Erro ao criar cliente Asaas:', err);
    return null;
  }

  const data = await createRes.json();
  return { id: data.id, created: true };
}

async function gerarCobrancaAsaas(valor, nomeCliente, cpfCliente, emailCliente) {
  const apiKey = process.env.ASAAS_API_KEY;
  if (!apiKey) return { error: 'API key não configurada' };

  const baseUrl = getAsaasBaseUrl();
  const headers = getAsaasHeaders();

  let customerId = process.env.ASAAS_CUSTOMER_ID;
  if (!customerId) {
    const result = await criarOuBuscarCliente(nomeCliente, emailCliente, cpfCliente);
    if (!result) {
      return { error: 'Falha ao criar/buscar cliente no Asaas' };
    }
    customerId = result.id;
  }

  const response = await fetch(`${baseUrl}/payments`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      customer: customerId,
      billingType: 'PIX',
      value: valor,
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      description: 'Mapa de Compatibilidade - Teste de Afinidade',
      postalService: false
    })
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Asaas error:', error);
    return { error: `Asaas retornou ${response.status}: ${error.slice(0, 200)}` };
  }

  return { success: true, data: await response.json() };
}

async function gerarPixAsaas(paymentId) {
  const apiKey = process.env.ASAAS_API_KEY;
  if (!apiKey) return { error: 'API key não configurada' };

  const baseUrl = getAsaasBaseUrl();
  const headers = getAsaasHeaders();

  const response = await fetch(`${baseUrl}/payments/${paymentId}/pixQrCode`, {
    method: 'GET',
    headers
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Erro ao gerar Pix Asaas:', error);
    return { error: `Asaas retornou ${response.status}: ${error.slice(0, 200)}` };
  }

  return { success: true, data: await response.json() };
}

router.get('/meuip', async (req, res) => {
  try {
    const ipResp = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipResp.json();
    res.json({ ip: ipData.ip });
  } catch (e) {
    res.json({ erro: e.message });
  }
});

router.get('/diagnostico', async (req, res) => {
  const apiKey = process.env.ASAAS_API_KEY;
  const mode = process.env.ASAAS_MODE || 'sandbox';
  const baseUrl = getAsaasBaseUrl();

  const result = {
    modo: mode,
    url: baseUrl,
    keyConfigurada: !!apiKey,
    keyTamanho: apiKey ? apiKey.length : 0,
    keyPrefix: apiKey ? apiKey.substring(0, 12) + '...' : 'vazio',
    testes: {}
  };

  if (!apiKey) {
    result.conclusao = 'API key não configurada. Usando modo mock.';
    return res.json(result);
  }

  try {
    const headers = getAsaasHeaders();
    const resp = await fetch(`${baseUrl}/customers`, { headers });
    result.testes.listarClientes = {
      status: resp.status,
      ok: resp.ok
    };
    if (resp.ok) {
      const data = await resp.json();
      result.testes.listarClientes.total = data.totalCount || 0;
    } else {
      const err = await resp.text();
      result.testes.listarClientes.erro = err.slice(0, 200);
    }
  } catch (e) {
    result.testes.listarClientes = { erro: e.message };
  }

  if (result.testes.listarClientes?.ok) {
    result.conclusao = 'API Asaas funcionando!';
  } else {
    result.conclusao = 'API Asaas com problema. Verifique: 1) Chave válida? 2) Restrição de IP? 3) Ambiente correto?';
  }

  res.json(result);
});

router.post('/gerar', async (req, res) => {
  const { leadId } = req.body;

  if (!leadId) {
    return res.status(400).json({ error: 'leadId é obrigatório' });
  }

  const lead = queryOne('SELECT * FROM leads WHERE id = ?', [leadId]);
  if (!lead) {
    return res.status(404).json({ error: 'Lead não encontrado' });
  }

  if (lead.status === 'pago') {
    return res.json({ pago: true, message: 'Pagamento já realizado' });
  }

  const valor = parseFloat(process.env.PIX_VALUE || '19.90');

  if (process.env.ASAAS_API_KEY) {
    try {
      const cobranca = await gerarCobrancaAsaas(
        valor,
        lead.nomeP1,
        null,
        lead.email
      );

      if (cobranca.error) {
        console.warn('[PIX] Asaas falhou ao gerar cobrança, usando modo mock:', cobranca.error);
        throw new Error(cobranca.error);
      }

      const pixResult = await gerarPixAsaas(cobranca.data.id);

      if (pixResult.error) {
        console.warn('[PIX] Asaas falhou ao gerar QR Code, usando modo mock:', pixResult.error);
        throw new Error(pixResult.error);
      }

      execute('UPDATE leads SET asaas_id = ?, updatedAt = datetime("now", "-3 hours") WHERE id = ?',
        [cobranca.data.id, leadId]);

      const rawImage = pixResult.data.encodedImage || pixResult.data.qrCode;
      const qrCode = rawImage?.startsWith('data:') ? rawImage : `data:image/png;base64,${rawImage}`;

      return res.json({
        qrCode,
        pixCode: pixResult.data.payload || pixResult.data.pixCode,
        expiration: 600,
        asaasId: cobranca.data.id,
        valor
      });
    } catch (err) {
      console.warn('[PIX] Asaas indisponível, caindo para mock:', err.message);
    }
  }

  const mockPixCode = "00020101021226870014br.gov.bcb.pix2565api.asaas.com/v1/pix/qr-codes/1234567890abcdef1234567890abcdef520400005303986540519.905802BR5916TesteDeAfinidade6009SaoPaulo62070503***6304abcd";

  return res.json({
    qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(mockPixCode)}`,
    pixCode: mockPixCode,
    expiration: 600,
    asaasId: null,
    valor
  });
});

router.post('/webhook', async (req, res) => {
  const body = req.body;

  const token = req.headers['x-webhook-token'] || req.headers['access_token'];
  const expectedToken = process.env.ASAAS_WEBHOOK_TOKEN;
  if (expectedToken && token !== expectedToken) {
    console.warn('[WEBHOOK] Token inválido, ignorando');
    return res.status(401).json({ error: 'Token inválido' });
  }

  console.log('[WEBHOOK] Payload recebido:', JSON.stringify(body).slice(0, 1000));

  const payment = body.payment;
  const event = body.event;

  if (!payment || !payment.id) {
    console.log('[WEBHOOK] Ignorado: sem payment.id no payload');
    return res.status(200).json({ received: true });
  }

  try {
    const lead = queryOne('SELECT * FROM leads WHERE asaas_id = ?', [payment.id]);
    if (!lead) {
      console.log(`[WEBHOOK] Lead não encontrado para asaas_id = ${payment.id}`);
      return res.status(200).json({ received: true, note: 'Lead não encontrado' });
    }

    const isPago = event === 'PAYMENT_RECEIVED'
      || event === 'PAYMENT_CONFIRMED'
      || payment.status === 'RECEIVED'
      || payment.status === 'CONFIRMED';

    if (isPago) {
      execute('UPDATE leads SET status = "pago", updatedAt = datetime("now", "-3 hours") WHERE id = ?', [lead.id]);
      console.log(`[WEBHOOK] Lead #${lead.id} marcado como pago (event=${event}, status=${payment.status})`);
      if (!lead.email_sent) {
        const updatedLead = queryOne('SELECT * FROM leads WHERE id = ?', [lead.id]);
        sendLeadReport(updatedLead).catch(err => console.error('[WEBHOOK] Erro ao enviar email:', err.message));
      }
    } else {
      console.log(`[WEBHOOK] Lead #${lead.id} ignorado: event=${event}, status=${payment.status}`);
    }
  } catch (err) {
    console.error('[WEBHOOK] Erro ao processar:', err.message);
  }

  res.status(200).json({ received: true });
});

router.post('/simular-pagamento', (req, res) => {
  const { leadId } = req.body;

  if (!leadId) {
    return res.status(400).json({ error: 'leadId é obrigatório' });
  }

  const lead = queryOne('SELECT * FROM leads WHERE id = ?', [leadId]);
  if (!lead) {
    return res.status(404).json({ error: 'Lead não encontrado' });
  }

  execute('UPDATE leads SET status = "pago", updatedAt = datetime("now", "-3 hours") WHERE id = ?', [leadId]);

  const updatedLead = queryOne('SELECT * FROM leads WHERE id = ?', [leadId]);
  if (!lead.email_sent) {
    sendLeadReport(updatedLead).catch(err => console.error('[SIMULAR] Erro ao enviar email:', err.message));
  }

  res.json({ message: 'Pagamento simulado com sucesso', status: 'pago' });
});

export default router;
