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

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
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
