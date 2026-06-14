## Data
2026-06-14

## Objetivo
Reorganização estrutural do projeto Mapa de Compatibilidade (Numerologia de Casal), eliminando duplicação de código e padronizando arquitetura.

## Alterações
1. Criado `shared/numerology.js` como fonte única dos cálculos numerológicos
2. `server/numerology.js` agora re-exporta de `shared/numerology.js`
3. `src/utils/numerology.js` agora re-exporta de `shared/numerology.js` (mantendo REPORTS)
4. Arquivado `V1/` e `V2/` em `archive/V1` e `archive/V2`
5. Criado `memory/project-memory.md` (este arquivo)
6. Criado `memory/lessons-learned.md`
7. Backup completo da geração de resultados salvo em `backup/result-generation/`
8. Atualizado `AGENTS.md` com nova estrutura de diretórios

## Arquivos Afetados
- `shared/numerology.js` — NOVO (fonte única de cálculos)
- `server/numerology.js` — Alterado (agora re-exporta de shared)
- `src/utils/numerology.js` — Alterado (agora re-exporta de shared)
- `AGENTS.md` — Alterado (nova estrutura)
- `archive/V1/` — Movido
- `archive/V2/` — Movido
- `backup/result-generation/` — NOVO (backup)

## Impacto
- Build frontend compila sem erros
- Cálculos numerológicos centralizados — qualquer correção é feita em um único lugar
- V1/V2 fora do caminho principal do projeto
- Dívida técnica reduzida

## Resultado
Projeto mais organizado, com separação clara entre shared (cálculos), frontend e backend.
