# Integração Asaas — Referência

## Ambientes
| Ambiente  | URL                                    |
|-----------|----------------------------------------|
| Produção  | `https://api.asaas.com/v3`             |
| Sandbox   | `https://api-sandbox.asaas.com/v3`     |

Chaves de API são distintas entre ambientes. Criar conta sandbox em https://sandbox.asaas.com

## Fluxo Pix (QR Code Dinâmico)
1. **Criar cliente**: `POST /v3/customers` → `{ name, email, cpfCnpj }`
2. **Criar cobrança Pix**: `POST /v3/payments` → `{ customer, billingType: "PIX", value, dueDate }`
3. **Obter QR Code**: `GET /v3/payments/{id}/pixQrCode` → retorna `encodedImage` (base64), `payload` (copia-e-cola), `expirationDate`

### Observações
- QR Code dinâmico expira 12 meses após data de vencimento
- Pode gerar QR Code sem chave Pix cadastrada (vinculado a instituição parceira)
- QR sem chave expira 23:59 do mesmo dia
- A cada atualização na cobrança, obter novo QR Code

## Webhooks
### Configuração
- URL configurada no dashboard: Integrações > Webhooks
- Até 10 URLs diferentes, cada uma com eventos específicos
- Pode definir `authToken` enviado como header `asaas-access-token`

### Eventos de Cobrança Pix
- **PAYMENT_CREATED** → Cobrança gerada
- **PAYMENT_RECEIVED** → Pix recebido, valor disponível na conta

### Payload Webhook
```json
{
  "id": "evt_...",
  "event": "PAYMENT_RECEIVED",
  "dateCreated": "2024-06-12 16:45:03",
  "payment": {
    "id": "pay_...",
    "status": "RECEIVED",
    "value": 19.90,
    "billingType": "PIX",
    ...
  }
}
```

### Regras
- Entrega "at least once" — implementar idempotência
- Responder HTTP 200-299 para sucesso
- 15 falhas consecutivas → fila pausada
- Eventos guardados por 14 dias
- Pode reativar fila via API ou dashboard

### Fluxo Pix
`PAYMENT_CREATED` → `PAYMENT_RECEIVED` (imediato para Pix)

## Segurança
### Whitelist de IPs
- Configurar em Menu > Integrações > Mecanismos de segurança
- IP único ou intervalo (máx 50 IPs)
- IP não autorizado → HTTP 403 com `"not_allowed_ip"`
- Recomendação: NAT Gateway com IP estático para cloud

### Chaves de API
- Até 10 chaves por conta
- Podem ter nome e data de expiração
- 3 meses inativa → desabilitada (reativável)
- 6 meses inativa → expirada permanentemente
- Armazenar em vault / variáveis de ambiente
- NUNCA no código fonte

## Sandbox para Testes
- Criar conta em https://sandbox.asaas.com
- Conta independente da produção
- Dados e credenciais separados
- Aprovação automática de contas
- Pagamento precisa ser confirmado manualmente no dashboard
- Cartões fictícios para teste

## Problemas Identificados no Projeto
### 1. Bug: Polling só ativa com asaasId
**Arquivo:** `src/components/PaywallModal.jsx:50`
```js
if (data.asaasId) { setPolling(true); }
```
Quando Asaas falha (ex: IP não autorizado), retorna `asaasId: null`, polling nunca começa.
**Fix:** Sempre ativar polling quando há `leadId`.

### 2. Chave de produção em dev local
**Arquivo:** `server/.env`
`ASAAS_MODE=production` + chave `$aact_prod_...`
IP local não está na whitelist → 403.
**Fix:** Usar sandbox para desenvolvimento.

### 3. Webhook não chega em localhost
Asaas não consegue chamar `localhost:3001`.
**Solução dev:** Usar endpoint `/api/pix/simular-pagamento` + polling.
**Solução prod:** Configurar webhook URL pública (ex: Render).

### 4. Timer useEffect ineficiente
`PaywallModal.jsx:81-91` — cria/destroi intervalo a cada segundo.
**Fix:** Usar `useRef` para o timer, dependência vazia.
