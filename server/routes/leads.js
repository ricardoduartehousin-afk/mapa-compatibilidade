import { Router } from 'express';
import { queryAll, queryOne, execute } from '../db.js';
import { adminAuth } from '../middleware/auth.js';
import { sendLeadReport } from '../email.js';

const router = Router();

router.post('/', (req, res) => {
  const { nomeP1, dataP1, nomeP2, dataP2, email, whatsapp, acceptedTerms } = req.body;

  if (!nomeP1 || !dataP1 || !nomeP2 || !dataP2 || !email || !whatsapp) {
    return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos' });
  }

  const existing = queryOne('SELECT id, status FROM leads WHERE email = ? AND whatsapp = ?', [email, whatsapp]);

  if (existing) {
    return res.json({ id: existing.id, status: existing.status, existing: true });
  }

  const result = execute(
    `INSERT INTO leads (nomeP1, dataP1, nomeP2, dataP2, email, whatsapp, acceptedTerms, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, 'pendente')`,
    [nomeP1, dataP1, nomeP2, dataP2, email, whatsapp, acceptedTerms ? 1 : 0]
  );

  res.status(201).json({ id: result.lastInsertRowid, status: 'pendente', existing: false });
});

router.patch('/:id/percentage', (req, res) => {
  const { percentage } = req.body;

  const lead = queryOne('SELECT id FROM leads WHERE id = ?', [req.params.id]);
  if (!lead) {
    return res.status(404).json({ error: 'Lead não encontrado' });
  }

  execute('UPDATE leads SET percentage = ?, updatedAt = datetime("now", "-3 hours") WHERE id = ?',
    [percentage, req.params.id]);

  res.json({ message: 'Percentual atualizado' });
});

router.get('/', adminAuth, (req, res) => {
  const { status, search, startDate, endDate } = req.query;
  let sql = 'SELECT * FROM leads WHERE 1=1';
  const params = [];

  if (status) {
    sql += ' AND status = ?';
    params.push(status);
  }

  if (search) {
    sql += ' AND (nomeP1 LIKE ? OR nomeP2 LIKE ? OR email LIKE ? OR whatsapp LIKE ?)';
    const term = `%${search}%`;
    params.push(term, term, term, term);
  }

  if (startDate) {
    sql += ' AND createdAt >= ?';
    params.push(startDate);
  }

  if (endDate) {
    sql += ' AND createdAt <= ?';
    params.push(endDate);
  }

  sql += ' ORDER BY createdAt DESC';

  const leads = queryAll(sql, params);
  res.json(leads);
});

router.get('/export', adminAuth, (req, res) => {
  const leads = queryAll('SELECT * FROM leads ORDER BY createdAt DESC');

  const headers = ['ID', 'Nome Pessoa 1', 'Data Pessoa 1', 'Nome Pessoa 2', 'Data Pessoa 2', 'Email', 'WhatsApp', 'Status', 'Percentual', 'Asaas ID', 'Criado em', 'Atualizado em'];
  const csvRows = [headers.join(',')];

  for (const lead of leads) {
    csvRows.push([
      lead.id,
      `"${(lead.nomeP1 || '').replace(/"/g, '""')}"`,
      lead.dataP1,
      `"${(lead.nomeP2 || '').replace(/"/g, '""')}"`,
      lead.dataP2,
      lead.email,
      lead.whatsapp,
      lead.status,
      lead.percentage || '',
      lead.asaas_id || '',
      lead.createdAt,
      lead.updatedAt
    ].join(','));
  }

  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename=leads.csv');
  res.send('\uFEFF' + csvRows.join('\n'));
});

router.get('/stats', adminAuth, (req, res) => {
  const total = queryOne('SELECT COUNT(*) as count FROM leads');
  const pendentes = queryOne("SELECT COUNT(*) as count FROM leads WHERE status = 'pendente'");
  const pagos = queryOne("SELECT COUNT(*) as count FROM leads WHERE status = 'pago'");

  res.json({
    total: total.count,
    pendentes: pendentes.count,
    pagos: pagos.count
  });
});

router.get('/:id', adminAuth, (req, res) => {
  const lead = queryOne('SELECT * FROM leads WHERE id = ?', [req.params.id]);

  if (!lead) {
    return res.status(404).json({ error: 'Lead não encontrado' });
  }

  res.json(lead);
});

router.get('/:id/status', (req, res) => {
  const lead = queryOne('SELECT id, status FROM leads WHERE id = ?', [req.params.id]);

  if (!lead) {
    return res.status(404).json({ error: 'Lead não encontrado' });
  }

  res.json({ id: lead.id, status: lead.status });
});

router.post('/:id/send-result', async (req, res) => {
  const lead = queryOne('SELECT * FROM leads WHERE id = ?', [req.params.id]);

  if (!lead) {
    return res.status(404).json({ error: 'Lead não encontrado' });
  }

  if (lead.status !== 'pago') {
    return res.status(400).json({ error: 'Lead ainda não está pago' });
  }

  const result = await sendLeadReport(lead);
  res.json(result);
});

router.delete('/:id', adminAuth, (req, res) => {
  const lead = queryOne('SELECT id FROM leads WHERE id = ?', [req.params.id]);

  if (!lead) {
    return res.status(404).json({ error: 'Lead não encontrado' });
  }

  execute('DELETE FROM leads WHERE id = ?', [req.params.id]);
  res.json({ message: 'Lead excluído com sucesso' });
});

router.patch('/:id', adminAuth, async (req, res) => {
  const { status, percentage, asaas_id } = req.body;

  const lead = queryOne('SELECT * FROM leads WHERE id = ?', [req.params.id]);
  if (!lead) {
    return res.status(404).json({ error: 'Lead não encontrado' });
  }

  const updates = [];
  const params = [];

  if (status) {
    updates.push('status = ?');
    params.push(status);
  }
  if (percentage !== undefined) {
    updates.push('percentage = ?');
    params.push(percentage);
  }
  if (asaas_id) {
    updates.push('asaas_id = ?');
    params.push(asaas_id);
  }

  if (updates.length === 0) {
    return res.status(400).json({ error: 'Nenhum campo para atualizar' });
  }

  updates.push("updatedAt = datetime('now', '-3 hours')");
  params.push(req.params.id);

  execute(`UPDATE leads SET ${updates.join(', ')} WHERE id = ?`, params);

  const updated = queryOne('SELECT * FROM leads WHERE id = ?', [req.params.id]);

  if (status === 'pago' && !lead.email_sent) {
    sendLeadReport(updated).catch(err => console.error('[EMAIL] Erro async no PATCH:', err.message));
  }

  res.json(updated);
});

export default router;
