import nodemailer from 'nodemailer';
import { generateReportHtml } from './reportHtml.js';
import { execute } from './db.js';

function getTransporter() {
  const host = process.env.SMTP_HOST;
  if (!host) return null;

  return nodemailer.createTransport({
    host,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
}

async function sendResultEmail(toEmail, toName, html) {
  const transporter = getTransporter();
  if (!transporter) {
    console.log('[EMAIL] SMTP não configurado. Defina SMTP_HOST, SMTP_USER e SMTP_PASS no .env');
    return { sent: false, reason: 'SMTP_NOT_CONFIGURED' };
  }

  try {
    const info = await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME || 'Teste de Afinidade'}" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: `"${toName}" <${toEmail}>`,
      subject: 'Seu Mapa de Compatibilidade está pronto!',
      html
    });
    console.log(`[EMAIL] Enviado para ${toEmail}: ${info.messageId}`);
    return { sent: true, messageId: info.messageId };
  } catch (err) {
    console.error('[EMAIL] Erro ao enviar:', err.message);
    return { sent: false, reason: err.message };
  }
}

export async function sendLeadReport(lead) {
  if (!lead || lead.status !== 'pago') {
    return { sent: false, reason: 'Lead não está com status pago' };
  }

  if (lead.email_sent) {
    console.log(`[EMAIL] Lead #${lead.id} já recebeu email. Pulando.`);
    return { sent: false, reason: 'ALREADY_SENT' };
  }

  try {
    const html = generateReportHtml(lead);
    const result = await sendResultEmail(lead.email, lead.nomeP1, html);

    if (result.sent) {
      execute('UPDATE leads SET email_sent = 1, updatedAt = datetime("now", "-3 hours") WHERE id = ?', [lead.id]);
      console.log(`[EMAIL] Lead #${lead.id} marcado como email_sent`);
    }

    return result;
  } catch (err) {
    console.error('[EMAIL] Erro ao gerar/enviar relatório:', err.message);
    return { sent: false, reason: err.message };
  }
}

export async function sendLeadReportById(leadId, dbQueryOne) {
  const lead = dbQueryOne('SELECT * FROM leads WHERE id = ?', [leadId]);
  if (!lead) return { sent: false, reason: 'LEAD_NOT_FOUND' };
  return sendLeadReport(lead);
}
