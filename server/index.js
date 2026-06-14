import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { initDb } from './db.js';
import leadsRouter from './routes/leads.js';
import pixRouter from './routes/pix.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.use('/api/leads', leadsRouter);
app.use('/api/pix', pixRouter);

app.use('/admin', express.static(join(__dirname, '..', 'admin')));

import { getSmtpStatus } from './email.js';

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), smtp: getSmtpStatus() });
});

app.get('/api/diagnostico-email', (req, res) => {
  res.json({
    smtp: getSmtpStatus(),
    env: {
      SMTP_HOST: process.env.SMTP_HOST ? process.env.SMTP_HOST.substring(0, 20) + '...' : null,
      SMTP_PORT: process.env.SMTP_PORT || null,
      SMTP_USER: process.env.SMTP_USER ? process.env.SMTP_USER.substring(0, 10) + '...' : null,
      SMTP_FROM: process.env.SMTP_FROM || null,
      SMTP_FROM_NAME: process.env.SMTP_FROM_NAME || null
    }
  });
});

export { app };

const isStandalone = process.argv[1] && (process.argv[1].includes('index.js') || process.argv[1].includes('server'));

if (isStandalone) {
  initDb().then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
      console.log(`Admin: http://localhost:${PORT}/admin`);
    });
  }).catch(err => {
    console.error('Erro ao iniciar banco de dados:', err);
    process.exit(1);
  });
} else {
  initDb().catch(err => console.error('Erro ao iniciar banco:', err));
}
