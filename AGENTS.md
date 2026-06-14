# Projeto — Mapa de Compatibilidade (Numerologia de Casal)

## Comandos
- `npm run dev` — Iniciar servidor de desenvolvimento (frontend Vite)
- `npm run build` — Verificar build de produção (sempre rodar antes de entregar)
- `npm run dev:server` — Iniciar backend (na raiz)
- `npm run dev:all` — Iniciar frontend + backend simultaneamente
- `cd server && npm run dev` — Iniciar apenas o backend

## Estrutura
- `shared/numerology.js` — **Fonte única** dos cálculos numerológicos (usado tanto pelo frontend quanto pelo backend)
- `src/components/` — Componentes React (MultiStepForm, PaywallModal, MapaResultado, etc.)
- `src/utils/numerology.js` — Re-exporta de shared/ e mantém REPORTS (frontend-only)
- `src/utils/numerologyMeanings.js` — Significados individuais dos números
- `src/utils/mapaDoCasalContent.js` — Conteúdo completo dos relatórios (perfis, compatibilidades)
- `src/index.css` — Estilos CSS
- `server/` — Backend Node.js + Express + SQLite (sql.js)
- `server/numerology.js` — Re-exporta de shared/
- `admin/index.html` — Painel de controle de cadastros (Vanilla JS)
- `src/admin/` — Admin React (DevLogin, DevDashboard, DevLeads)
- `backup/result-generation/` — Backup do conteúdo de geração de resultados
- `archive/V1/` e `archive/V2/` — Versões anteriores arquivadas
- `memory/` — Memória do projeto (project-memory.md, lessons-learned.md)

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
