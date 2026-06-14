## Problema
Duplicação de código de cálculo numerológico entre `src/utils/numerology.js` e `server/numerology.js`.

### Causa
Falta de uma camada `shared/` desde o início. O backend foi criado como um port do frontend, copiando a lógica.

### Correção
Criado `shared/numerology.js` como fonte única. Ambos os lados agora importam do mesmo arquivo.

### Prevenção Futura
Qualquer nova lógica de domínio (cálculos, validações, regras de negócio) deve ser colocada em `shared/` antes de ser usada no frontend e backend.

---

## Problema
3 componentes de relatório fazendo a mesma coisa (`MapaResultado.jsx`, `ResultsScreen.jsx`, `FullReport.jsx`).

### Causa
Evolução do design em fases (V1 → V2 → V3) sem limpeza dos componentes obsoletos.

### Correção
Unificado em `MapaResultado.jsx`. Pendente remover `ResultsScreen.jsx` e `FullReport.jsx`.

### Prevenção Futura
Quando um componente for substituído, removê-lo imediatamente em vez de acumular versões obsoletas.

---

## Problema
CSS monolítico com 2.175 linhas em `src/index.css`.

### Causa
Toda estilização foi colocada em um único arquivo para acelerar o desenvolvimento.

### Prevenção Futura
Modularizar CSS por seção (form, paywall, report, admin) assim que possível.

---

## Problema
Versões antigas (V1, V2) dentro do repositório principal atrapalhando navegação.

### Causa
Falta de política de arquivamento de versões anteriores.

### Prevenção Futura
Mover versões antigas para `archive/` ou branch separada imediatamente após nova versão estabilizar.
