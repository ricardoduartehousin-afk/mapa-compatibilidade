# Projeto — Mapa de Compatibilidade (Numerologia de Casal)

## Comandos
- `npm run dev` — Iniciar servidor de desenvolvimento (frontend Vite)
- `npm run build` — Verificar build de produção (sempre rodar antes de entregar)
- `npm run dev:server` — Iniciar backend (na raiz)
- `npm run dev:all` — Iniciar frontend + backend simultaneamente
- `cd server && npm run dev` — Iniciar apenas o backend

## Estrutura
- `src/components/` — Componentes React (MultiStepForm, PaywallModal, ResultsScreen, FullReport, etc.)
- `src/utils/numerology.js` — Cálculos e relatórios completos (REPORTS)
- `src/utils/numerologyMeanings.js` — Significados individuais dos números
- `src/index.css` — Todos os estilos CSS
- `server/` — Backend Node.js + Express + SQLite (sql.js)
- `admin/index.html` — Painel de controle de cadastros

## Backend
- `server/index.js` — Servidor Express (porta 3001)
- `server/db.js` — Banco SQLite (sql.js, sem compilação nativa)
- `server/routes/leads.js` — CRUD de leads + admin endpoints
- `server/routes/pix.js` — Integração Asaas + geração de Pix
- `server/numerology.js` — Cálculos numerológicos (port do frontend)
- `server/reportHtml.js` — Gera HTML do relatório para email
- `server/email.js` — Serviço de envio de email via SMTP
- `admin/index.html` — Painel admin em `http://localhost:3001/admin`
- Admin default: `admin` / `admin123` (configurável em server/.env)

## Fluxo de Pagamento
1. Formulário envia lead → salva no backend (`POST /api/leads`)
2. Paywall gera Pix (`POST /api/pix/gerar`) → exibe QR code + código
3. Frontend polling a cada 3s (`GET /api/leads/:id/status`)
4. Asaas webhook ou simulação muda status para "pago"
5. Quando status muda para "pago", email com relatório é enviado automaticamente
6. Se backend estiver offline, fallback para localStorage + mock

## Email de Resultado
- Configurar SMTP no `.env`: `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, `SMTP_PORT`, `SMTP_FROM`
- O email é enviado automaticamente quando:
  - Webhook do Asaas confirma pagamento
  - Admin confirma pagamento manualmente no painel
  - Endpoint `POST /api/leads/:id/send-result` é chamado
- Admin pode reenviar email pelo botão 📧 no painel
- Coluna `email_sent` evita envios duplicados
- Se SMTP não estiver configurado, nenhum email é enviado (sem crash)

## Tom dos Textos
- Resultados devem soar como terapeuta/psicólogo, não como misticismo
- Evitar: vibração, energia cósmica, universo, karma, espiritual
- Preferir: padrão de comportamento, dinâmica, aprendizado, propósito
- Linguagem prática, humana e acolhedora

## Observações
- Paywall antes dos resultados (usuário paga para ver)
- Timer de 10 min no paywall com efeito visual de urgência
- V3 structure: individual profile → comparison → couple number → diagnosis
- Se `VITE_API_URL` não estiver definido, frontend funciona sem backend

## Deploy

### Frontend → Vercel
1. Criar conta em https://vercel.com
2. Instalar CLI: `npm i -g vercel`
3. Na raiz do projeto: `vercel`
4. O `vercel.json` já configura SPA routing
5. Em produção, definir `VITE_API_URL` apontando pro backend no Render

### Backend → Render.com
1. Criar conta em https://render.com (free tier)
2. Dashboard → New Web Service → conectar repositório GitHub
3. Configurar:
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `node index.js`
   - **Plan:** Free
  4. Adicionar variáveis de ambiente (Environment Variables):
    - `ASAAS_API_KEY` = sua chave (começa com `$aact_...`, o `$` FAZ PARTE da chave)
    - `ASAAS_MODE` = sandbox (ou production)
    - `ADMIN_USER` = admin
    - `ADMIN_PASS` = admin123
    - `PIX_VALUE` = 19.90
    - `CORS_ORIGIN` = URL do frontend no Vercel
    - `SMTP_HOST` = smtp.gmail.com (ou seu provedor)
    - `SMTP_USER` = seuemail@gmail.com
    - `SMTP_PASS` = senha do app
    - `SMTP_FROM` = seuemail@gmail.com
5. Após deploy, copiar URL do backend (ex: `https://seuapp.onrender.com`)
6. No Vercel, adicionar `VITE_API_URL=https://seuapp.onrender.com`

## Caminho do Projeto
- `C:\Users\rickd\OneDrive\Documentos\Antigravity\Mapa de Compatibilidade\`
