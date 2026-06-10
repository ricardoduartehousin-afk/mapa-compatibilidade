# Retrospectiva — Mapa de Compatibilidade

## O que deu certo ✅

### Arquitetura e Fluxo
- **Funil de 5 etapas** (`input → calculating → paywall → results → report`): a separação entre preview dos resultados e relatório completo criou um fluxo de conversão mais inteligente, dando valor gradual ao usuário.
- **Componente combinado `ResultsScreen`**: unificar perfil individual + comparação + síntese do casal em uma tela foi mais coeso do que ter dois componentes separados (`IndividualResults` + `CoupleResults`).
- **Maquina de estados simples no App.jsx**: sem router, sem biblioteca externa — `useState('step')` resolveu o problema de navegação de forma direta e previsível.

### Componentes
- **`MultiStepForm`**: 7 passos com validação por etapa, barra de progresso, máscara de telefone e navegação por teclado. Não precisou de alterações em nenhuma versão.
- **`CalculatingScreen`**: tela de carregamento com anéis animados e mensagens de status progressivas. Simples, eficaz, nunca precisou de mudança.
- **`FullReport` + geração de PDF**: implementação madura desde a V1 — jsPDF com word-wrap próprio, quebra de página automática, rodapé com data/email. Código estável e sem bugs.
- **`PaywallModal` (main)**: timer com estado de expiração, badge de urgência, botão de refresh e feedback visual de cópia — refinamentos de UX que fizeram diferença.

### Motor de Cálculo
- **`numerology.js`**: tabela cabalística caldeia, redução de números, cálculo dos 6 números individuais e fórmula de compatibilidade com pesos primos. Tudo implementado corretamente na V1 e nunca precisou de correção.
- **`numerologyMeanings.js` (main)**: expansão para incluir `personality`, `love`, `needs`, `name` e números mestres 11/22. Dados ricos que alimentam os perfis individuais.

### Tom dos Textos
- A migração de linguagem mística (`vibração`, `energia cósmica`, `universo`) para tom terapêutico/psicológico (`padrão de comportamento`, `dinâmica`, `aprendizado`, `propósito`) deixou os relatórios mais profissionais e acolhedores.
- Os relatórios no objeto `REPORTS` têm 11 seções bem estruturadas com conteúdo de qualidade consistente.

### Persistência
- `localStorage` para leads com status `pendente`/`pago` foi a escolha certa para um MVP 100% client-side sem backend.

---

## O que deu errado ❌

### Código Morto
- **`LandingPage.jsx`** (~213 linhas): foi substituído pelo `MultiStepForm` mas nunca removido. Permanece no projeto em todas as versões sem ser importado.
- **`IndividualResults.jsx`** (~97 linhas) e **`CoupleResults.jsx`** (~108 linhas): criados na V2, nunca foram conectados ao `App.jsx`. O `ResultsScreen` combinado tornou-os obsoletos, mas continuam no código.
- **Total: ~418 linhas de dead code** poluindo a base.

### Lógica Duplicada e Frágil
- **Redução de números mestres duplicada**: `ResultsScreen.jsx` reimplementa redução de 11→2 e 22→4 com ternários manuais em vez de reusar `reduceNumber()` do `numerology.js`. Isso é frágil — se a lógica mudar em um lugar, o outro fica inconsistente.
- **`getAffinities` e `getIncompatibilities`**: recebem parâmetros `d1, s1, d2, s2` mas nunca os usam — os parâmetros são decorativos e enganosos.

### UX e Confiabilidade
- **QR Code sem fallback**: carregado via `<img src="https://api.qrserver.com/...">` sem estado de loading ou fallback se o serviço externo falhar.
- **Mock de pagamento sem abstração**: o Pix está hardcoded como string em `PaywallModal.jsx` e `FullReport.jsx`. Para integrar um gateway real, precisará refatorar ambos.
- **Deduplicação de leads frágil**: a busca por lead existente compara `email && whatsapp` — mesmo email com WhatsApp diferente cria lead duplicado.

### Engenharia
- **Sem TypeScript**: projeto usa `.jsx` puro. Para um app com 9 componentes e 3 utilitários, a falta de tipos já gerou parâmetros não utilizados e lógica duplicada que poderiam ser evitados.
- **Sem error boundaries**: qualquer erro em `ResultsScreen` ou `FullReport` quebra o app inteiro.
- **Sem testes**: nenhum teste automatizado. A fórmula de compatibilidade e a redução de números são candidatos naturais para testes unitários.

---

## Lições Aprendidas

1. **Dead code acumula rápido**: revisões periódicas para limpar componentes não utilizados deveriam ser rotina. `LandingPage`, `IndividualResults` e `CoupleResults` deveriam ter sido removidos na mesma PR que os tornou obsoletos.

2. **Uma fonte de verdade para lógica de negócio**: a redução de números mestres deve viver em `numerology.js` e ser importada por quem precisar. Nunca reimplementar.

3. **Preview pago → relatório completo é um padrão de conversão eficaz**: mostrar valor antes de pedir mais engajamento (o "results" antes do "report") funciona melhor que entregar tudo de uma vez.

4. **Separar visualização de formatação de dados**: o `ResultsScreen` mistura lógica de cálculo (comparação de números) com renderização JSX. Extrair a lógica para hooks ou utilitários tornaria o código mais testável.

5. **Mock de pagamento com abstração**: mesmo em MVP, vale a pena criar uma interface/função `processPayment()` que possa ser substituída por um gateway real sem mexer no componente.

6. **CSS puro escala até certo ponto**: 2148 linhas em `index.css` já está no limite. Vale considerar CSS Modules ou styled-components conforme o projeto cresce.

7. **O tom terapêutico foi acerto**: a diretriz do `AGENTS.md` de evitar linguagem mística melhorou visivelmente a qualidade percebida dos relatórios. Manter esse padrão.

8. **Versionamento de componentes arquivados**: as pastas `V1/` e `V2/` são úteis como referência histórica, mas criaram cópias de arquivos que podem ficar dessincronizadas. Uma abordagem com tags git seria mais limpa.

---

## Recomendações Imediatas

- [ ] Remover `LandingPage.jsx`, `IndividualResults.jsx`, `CoupleResults.jsx`
- [ ] Extrair redução de números mestres para `numerogy.js` (`reduceNumber`) e usar em `ResultsScreen` e `compareNumbers`
- [ ] Remover parâmetros não utilizados de `getAffinities`/`getIncompatibilidades`
- [ ] Adicionar loading state e fallback para QR Code do Pix
- [ ] Adicionar Error Boundary no `App.jsx`
- [ ] Centralizar configuração do Pix em um arquivo de constantes
