// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TABELA CABALÍSTICA (CALDEIA) TRADICIONAL
// Atribui valores únicos de 1 a 8 a cada letra do alfabeto.
// Diferente da Pitagórica, a Cabalística é assimétrica e reflete
// a energia vibratória de cada símbolo individualmente.
// Referência: Numerologia Cabalística clássica
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const LETTER_MAP = {
  // Valor 1: A, I, J, Q, Y
  a: 1, i: 1, j: 1, q: 1, y: 1,
  // Valor 2: B, K, R
  b: 2, k: 2, r: 2,
  // Valor 3: C, G, L, S
  c: 3, g: 3, l: 3, s: 3,
  // Valor 4: D, M, T
  d: 4, m: 4, t: 4,
  // Valor 5: E, H, N, X
  e: 5, h: 5, n: 5, x: 5,
  // Valor 6: U, V, W
  u: 6, v: 6, w: 6,
  // Valor 7: O, Z
  o: 7, z: 7,
  // Valor 8: F, P
  f: 8, p: 8
  // Nota: a letra 9 não é usada na Cabalística Caldeia pois
  // o 9 é considerado sagrado/divino e não é atribuído a letras.
};

// Remove acentos e caracteres especiais, mantendo apenas letras de A-Z
function normalizeString(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos (á → a, é → e, etc.)
    .replace(/[ñ]/g, 'n')
    .replace(/[ç]/g, 'c')
    .replace(/[^a-z]/g, ''); // Mantém apenas letras
}

// Reduz um número somando seus dígitos até restar 1 dígito (ou Números Mestres 11 e 22)
function reduceNumber(num, preserveMaster = false) {
  let current = num;
  while (current > 9) {
    if (preserveMaster && (current === 11 || current === 22)) {
      return current;
    }
    const digits = current.toString().split('').map(Number);
    current = digits.reduce((acc, d) => acc + d, 0);
  }
  return current || 1; // Garante que nunca retorna 0
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// NÚMERO DA EXPRESSÃO — soma de todas as letras do nome
// Representa o potencial externo e a personalidade visível.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export function calculateExpression(name) {
  const normalized = normalizeString(name);
  let sum = 0;
  for (const char of normalized) {
    if (LETTER_MAP[char] !== undefined) {
      sum += LETTER_MAP[char];
    }
  }
  return reduceNumber(sum, true); // Preserva 11 e 22 (Números Mestres)
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// NÚMERO DE ALMA (IMPULSO DA ALMA) — soma apenas das VOGAIS
// Representa os desejos mais profundos e motivações internas.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export function calculateSoulNumber(name) {
  const normalized = normalizeString(name);
  const vogals = ['a', 'e', 'i', 'o', 'u'];
  let sum = 0;
  for (const char of normalized) {
    if (vogals.includes(char) && LETTER_MAP[char] !== undefined) {
      sum += LETTER_MAP[char];
    }
  }
  return reduceNumber(sum, true); // Preserva 11 e 22
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// NÚMERO DO DESTINO (CAMINHO DE VIDA) — soma dos dígitos da data
// Representa a missão de vida e o caminho kármico.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export function calculateDestiny(dateStr) {
  // Remove tudo que não for número e soma dígito por dígito
  const numbersOnly = dateStr.replace(/\D/g, '');
  const sum = numbersOnly.split('').map(Number).reduce((acc, d) => acc + d, 0);
  return reduceNumber(sum, true); // Preserva 11 e 22 no Caminho de Vida
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CÁLCULO DE COMPATIBILIDADE DO CASAL
// Usa os 6 fatores cabalísticos: Alma + Expressão + Destino
// de cada parceiro para gerar um resultado único por casal.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export function calculateCompatibility(p1Name, p1Date, p2Name, p2Date) {
  const soul1 = calculateSoulNumber(p1Name);
  const exp1  = calculateExpression(p1Name);
  const dest1 = calculateDestiny(p1Date);

  const soul2 = calculateSoulNumber(p2Name);
  const exp2  = calculateExpression(p2Name);
  const dest2 = calculateDestiny(p2Date);

  // Soma os 6 fatores cabalísticos do casal para gerar o número final
  // Os Números Mestres são reduzidos aqui para caber nos 9 relatórios
  const reducedSoul1 = soul1 > 9 ? reduceNumber(soul1, false) : soul1;
  const reducedExp1  = exp1  > 9 ? reduceNumber(exp1,  false) : exp1;
  const reducedSoul2 = soul2 > 9 ? reduceNumber(soul2, false) : soul2;
  const reducedExp2  = exp2  > 9 ? reduceNumber(exp2,  false) : exp2;
  const reducedDest1 = dest1 > 9 ? reduceNumber(dest1, false) : dest1;
  const reducedDest2 = dest2 > 9 ? reduceNumber(dest2, false) : dest2;

  const totalSum = reducedSoul1 + reducedExp1 + reducedDest1
                 + reducedSoul2 + reducedExp2 + reducedDest2;

  const finalNumber = reduceNumber(totalSum, false); // 1 a 9

  // Porcentagem de afinidade: determinística mas variada, baseada nos 6 fatores
  const raw = ((reducedSoul1 * 13) + (reducedExp1 * 7) + (reducedDest1 * 11)
             + (reducedSoul2 * 17) + (reducedExp2 * 5) + (reducedDest2 * 3)) % 36;
  const percentage = Math.max(55, Math.min(97, 55 + raw));

  return {
    soulNumberP1: soul1,
    expressionP1: exp1,
    destinyP1: dest1,
    soulNumberP2: soul2,
    expressionP2: exp2,
    destinyP2: dest2,
    finalNumber,
    percentage
  };
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// RELATÓRIOS COMPLETOS — Numerologia Cabalística (1 a 9)
// Cada relatório contém 11 seções detalhadas + prévia gratuita
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const REPORTS = {
  1: {
    title: "Vibração 1: A Força da Liderança e Independência",
    freeText: "Quando a compatibilidade resulta no número 1, a Numerologia Cabalística revela um relacionamento marcado por iniciativa, coragem e desejo de crescimento constante. Existe uma força impulsionadora dentro do casal que os empurra para frente, buscando novas conquistas, experiências e realizações.",
    sections: {
      visaoGeral: [
        "Quando a compatibilidade resulta no número 1, a Numerologia Cabalística revela um relacionamento marcado por iniciativa, coragem e desejo de crescimento constante. Esta é uma união de pessoas que não nasceram para permanecer estagnadas.",
        "Existe uma força impulsionadora dentro do casal que os empurra para frente, buscando novas conquistas, experiências e realizações.",
        "A energia do número 1 representa o início de ciclos, a liderança e a capacidade de abrir caminhos. Quando duas pessoas se unem sob essa vibração, existe um potencial extraordinário para construção de uma vida grandiosa, desde que aprendam a trabalhar juntos em vez de competir entre si.",
        "O relacionamento costuma começar rapidamente, com forte atração e sensação de admiração mútua."
      ],
      atracaoInicial: [
        "A atração entre vocês nasce da força que cada um percebe no outro.",
        "Existe fascínio pela independência, pela personalidade marcante e pela capacidade de realização.",
        "Vocês se enxergam como pessoas diferenciadas e sentem que podem conquistar muito mais juntos do que separados.",
        "Desde o início existe intensidade, iniciativa e desejo de avançar rapidamente na relação."
      ],
      compatibilidadeEmocional: [
        "Emocionalmente, esta não é uma união excessivamente melosa ou dependente.",
        "Ambos valorizam liberdade, autonomia e espaço individual.",
        "O amor costuma ser demonstrado através de atitudes práticas, proteção e incentivo ao crescimento pessoal.",
        "O desafio aparece quando um dos dois começa a sentir que suas necessidades emocionais não estão sendo devidamente reconhecidas.",
        "Aprender a verbalizar sentimentos será fundamental para o sucesso da relação."
      ],
      comunicacao: [
        "A comunicação tende a ser direta e objetiva.",
        "Vocês preferem resolver problemas rapidamente em vez de prolongar discussões.",
        "Porém, justamente pela personalidade forte de ambos, conflitos podem surgir quando cada um acredita estar certo.",
        "A Numerologia Cabalística indica que o crescimento deste relacionamento depende da capacidade de ouvir sem transformar toda divergência em disputa."
      ],
      amorIntimidade: [
        "A vida amorosa costuma ser intensa, apaixonada e cheia de energia.",
        "Existe forte magnetismo físico e desejo constante de conquistar o parceiro, mesmo após anos de convivência.",
        "O romance floresce quando ambos continuam admirando as conquistas um do outro.",
        "Quando a admiração desaparece, a paixão pode enfraquecer rapidamente."
      ],
      vidaFinanceira: [
        "Esta é uma excelente vibração para construção patrimonial.",
        "O casal possui energia empreendedora e facilidade para iniciar projetos.",
        "Podem prosperar através de negócios próprios, investimentos ou atividades que exijam liderança.",
        "O risco está em decisões impulsivas ou excesso de confiança.",
        "Planejamento e estratégia serão fundamentais para maximizar resultados."
      ],
      desafiosKarmicos: [
        "A principal lição desta união envolve o ego.",
        "Vocês vieram aprender que liderança não significa controle.",
        "Sempre que surgirem disputas de poder, o universo apresentará situações que exigirão cooperação.",
        "A maturidade chega quando ambos compreendem que o sucesso do relacionamento é mais importante que vencer uma discussão."
      ],
      missaoEspiritual: [
        "A missão deste casal é inspirar.",
        "Vocês possuem potencial para abrir caminhos não apenas para si mesmos, mas também para outras pessoas.",
        "Através da coragem, da iniciativa e da determinação, podem se tornar exemplo para familiares, amigos e futuras gerações."
      ],
      potencialLongoPrazo: [
        "Quando aprendem a equilibrar independência e parceria, esta união possui enorme potencial de durabilidade.",
        "Vocês envelhecem admirando as conquistas construídas juntos e celebrando cada desafio superado."
      ],
      conselho: [
        "Transformem a competição em cooperação.",
        "A energia que utilizam para disputar espaço pode ser direcionada para construir uma vida extraordinária."
      ],
      mensagemFinal: [
        "Vocês foram unidos para aprender a liderar sem dominar, amar sem prender e crescer sem deixar o outro para trás.",
        "O destino desta relação é avançar constantemente, construindo uma história marcada por coragem, evolução e conquistas."
      ]
    }
  },

  2: {
    title: "Vibração 2: A Harmonia da Sensibilidade e Companheirismo",
    freeText: "A vibração 2 é considerada uma das mais delicadas e emocionalmente profundas da Numerologia Cabalística. Quando um casal alcança esta compatibilidade, existe uma forte tendência à construção de uma parceria baseada na empatia, compreensão e apoio mútuo.",
    sections: {
      visaoGeral: [
        "A vibração 2 é considerada uma das mais delicadas e emocionalmente profundas da Numerologia Cabalística.",
        "Quando um casal alcança esta compatibilidade, existe uma forte tendência à construção de uma parceria baseada na empatia, compreensão e apoio mútuo.",
        "Vocês não foram unidos para competir, mas para caminhar lado a lado.",
        "O relacionamento possui uma energia suave, acolhedora e profundamente afetiva.",
        "Existe uma sensação de familiaridade que faz com que ambos se sintam seguros na presença um do outro."
      ],
      atracaoInicial: [
        "A atração costuma surgir de forma gradual.",
        "Diferentemente das vibrações mais impulsivas, aqui existe uma conexão emocional quase imediata.",
        "Vocês sentem que podem confiar um no outro.",
        "Muitas vezes a relação começa através de amizade, cumplicidade ou conversas profundas."
      ],
      compatibilidadeEmocional: [
        "Este é o ponto mais forte da união.",
        "Existe grande capacidade de compreender sentimentos sem necessidade de explicações detalhadas.",
        "Vocês percebem mudanças de humor, preocupações e necessidades emocionais de forma intuitiva.",
        "Porém, justamente por serem tão sensíveis, pequenas mágoas podem ser acumuladas silenciosamente.",
        "A comunicação emocional precisa ser transparente."
      ],
      comunicacao: [
        "A conversa tende a ser respeitosa e diplomática.",
        "Vocês geralmente evitam conflitos desnecessários.",
        "O perigo está em evitar discussões importantes para preservar uma falsa sensação de paz.",
        "A verdadeira harmonia nasce da sinceridade e não da omissão."
      ],
      amorIntimidade: [
        "A intimidade é marcada por carinho, afeto e conexão emocional profunda.",
        "O aspecto físico se fortalece através da confiança e da proximidade emocional.",
        "Existe forte necessidade de demonstrações de amor, atenção e presença.",
        "Pequenos gestos possuem enorme valor para este casal."
      ],
      vidaFinanceira: [
        "Embora não seja uma vibração extremamente ambiciosa, existe excelente potencial para estabilidade financeira.",
        "Vocês costumam tomar decisões pensando na segurança da família e do relacionamento.",
        "O foco está mais na qualidade de vida do que na busca por status."
      ],
      desafiosKarmicos: [
        "A principal lição envolve aprender a estabelecer limites saudáveis.",
        "Existe tendência a sacrificar excessivamente as próprias necessidades em favor do parceiro.",
        "A Numerologia Cabalística ensina que amar não significa abandonar a própria individualidade."
      ],
      missaoEspiritual: [
        "A missão deste casal é ensinar o verdadeiro significado da parceria.",
        "Vocês vieram demonstrar que força também pode existir na gentileza, na paciência e na compreensão."
      ],
      potencialLongoPrazo: [
        "Poucas vibrações possuem tanto potencial para relacionamentos duradouros quanto o número 2.",
        "Quando bem trabalhada, esta união pode atravessar décadas mantendo carinho, respeito e cumplicidade."
      ],
      conselho: [
        "Não tenham medo das conversas difíceis.",
        "A honestidade emocional fortalece aquilo que já é naturalmente harmonioso."
      ],
      mensagemFinal: [
        "Vocês foram unidos para aprender que o amor verdadeiro não é sobre controlar ou conquistar, mas sobre apoiar, compreender e crescer juntos."
      ]
    }
  },

  3: {
    title: "Vibração 3: O Brilho da Comunicação e Criatividade",
    freeText: "A vibração 3 representa alegria, criatividade, expressão e entusiasmo. Quando a compatibilidade resulta neste número, a Numerologia Cabalística indica uma relação marcada pela leveza, pela diversão e pelo desejo de viver intensamente.",
    sections: {
      visaoGeral: [
        "A vibração 3 representa alegria, criatividade, expressão e entusiasmo.",
        "Quando a compatibilidade resulta neste número, a Numerologia Cabalística indica uma relação marcada pela leveza, pela diversão e pelo desejo de viver intensamente.",
        "Vocês trazem cor para a vida um do outro.",
        "A convivência raramente é monótona.",
        "Existe necessidade constante de novidades, experiências e estímulos."
      ],
      atracaoInicial: [
        "A conexão geralmente nasce através da conversa.",
        "O humor, a inteligência e a capacidade de comunicação são fatores extremamente importantes.",
        "Vocês se sentem atraídos pela personalidade vibrante um do outro.",
        "A relação costuma começar cercada de risadas, diversão e entusiasmo."
      ],
      compatibilidadeEmocional: [
        "Existe facilidade para expressar sentimentos.",
        "Vocês gostam de conversar sobre praticamente tudo e encontram prazer na troca constante de ideias.",
        "O desafio aparece quando emoções mais profundas precisam ser enfrentadas.",
        "Em alguns momentos podem utilizar o humor como mecanismo para evitar vulnerabilidade."
      ],
      comunicacao: [
        "Este é o maior ponto forte da união.",
        "A comunicação flui naturalmente.",
        "Vocês conseguem conversar durante horas sem perceber o tempo passar.",
        "Quando utilizam essa habilidade para resolver conflitos, o relacionamento se fortalece enormemente."
      ],
      amorIntimidade: [
        "O romance é leve, divertido e espontâneo.",
        "Existe forte componente de amizade dentro da relação.",
        "A intimidade é alimentada pela admiração intelectual e pela conexão emocional.",
        "A paixão permanece viva enquanto houver novidade e criatividade."
      ],
      vidaFinanceira: [
        "O casal possui talento para áreas criativas, comunicação, marketing, vendas, entretenimento e empreendedorismo.",
        "Porém existe tendência a gastar impulsivamente ou priorizar prazeres imediatos.",
        "Aprender organização financeira será essencial."
      ],
      desafiosKarmicos: [
        "A principal lição desta união envolve disciplina.",
        "Vocês vieram aprender que sonhos precisam ser acompanhados de planejamento.",
        "Sem estrutura, existe risco de dispersão e instabilidade."
      ],
      missaoEspiritual: [
        "A missão deste casal é espalhar alegria.",
        "Vocês possuem capacidade de inspirar pessoas através da criatividade, da comunicação e da energia positiva.",
        "São aqueles que iluminam ambientes e aproximam pessoas."
      ],
      potencialLongoPrazo: [
        "Quando conseguem equilibrar diversão e responsabilidade, esta união possui enorme potencial de felicidade.",
        "O relacionamento permanece jovem mesmo com o passar dos anos."
      ],
      conselho: [
        "Não utilizem a leveza para fugir dos desafios.",
        "A maturidade emocional permitirá que o brilho da relação se torne ainda mais forte."
      ],
      mensagemFinal: [
        "Vocês foram unidos para mostrar que o amor também pode ser leve, divertido e inspirador.",
        "Juntos, possuem a capacidade de transformar a vida cotidiana em uma jornada cheia de significado, alegria e crescimento compartilhado."
      ]
    }
  },

  4: {
    title: "Vibração 4: A Solidez da Estabilidade e Construção",
    freeText: "A vibração 4 representa uma das uniões mais sólidas e confiáveis da Numerologia Cabalística. Quando dois seres se encontram sob esta energia, o universo está revelando uma parceria construída sobre bases reais, comprometimento verdadeiro e desejo genuíno de construir algo duradouro.",
    sections: {
      visaoGeral: [
        "A vibração 4 representa uma das uniões mais sólidas e confiáveis da Numerologia Cabalística.",
        "Quando dois seres se encontram sob esta energia, o universo está revelando uma parceria construída sobre bases reais, comprometimento verdadeiro e desejo genuíno de construir algo duradouro.",
        "Este não é um relacionamento de impulsos passageiros. Aqui existe seriedade, dedicação e a compreensão de que o amor verdadeiro se constrói dia após dia.",
        "A energia do 4 é a energia do alicerce. Assim como uma casa só permanece de pé quando sua fundação é sólida, este casal possui tudo o que é necessário para edificar uma vida estável e significativa."
      ],
      atracaoInicial: [
        "A atração entre vocês raramente nasce de forma explosiva ou impulsiva.",
        "Existe um processo gradual de aproximação, baseado na confiança, no respeito e na admiração pela seriedade um do outro.",
        "Vocês percebem no parceiro alguém confiável, responsável e com quem é possível planejar o futuro.",
        "A sensação de segurança que um proporciona ao outro é o principal combustível dessa atração."
      ],
      compatibilidadeEmocional: [
        "Emocionalmente, este casal costuma ser estável e leal.",
        "Existe profunda lealdade e compromisso com o bem-estar mútuo.",
        "O desafio está na dificuldade de expressar emoções com espontaneidade.",
        "Ambos tendem a ser reservados quanto aos sentimentos mais profundos, o que pode gerar uma sensação de frieza emocional com o tempo.",
        "Cultivar momentos de abertura e vulnerabilidade é essencial para aprofundar a conexão."
      ],
      comunicacao: [
        "A comunicação é prática, direta e voltada para soluções.",
        "Vocês não perdem tempo com rodeios e preferem abordar os problemas de frente.",
        "O cuidado necessário está em não transformar toda conversa em uma análise racional.",
        "Às vezes, o coração precisa falar mais alto do que a razão."
      ],
      amorIntimidade: [
        "A vida íntima pode demorar para se aprofundar, pois ambos precisam de confiança antes de se abrirem completamente.",
        "Quando a confiança está estabelecida, a intimidade é rica, segura e profundamente satisfatória.",
        "O amor é demonstrado através de atos concretos: cuidar, proteger, prover e estar presente nos momentos difíceis.",
        "Gestos românticos espontâneos precisam ser cultivados conscientemente para manter a chama acesa."
      ],
      vidaFinanceira: [
        "Esta é uma das vibrações mais favoráveis para construção de patrimônio.",
        "Vocês possuem disciplina financeira, capacidade de poupança e habilidade para planejar o futuro.",
        "Preferem segurança a riscos desnecessários.",
        "Com planejamento conjunto, têm tudo para construir um patrimônio sólido e deixar um legado para os filhos e familiares."
      ],
      desafiosKarmicos: [
        "A principal lição desta união envolve flexibilidade.",
        "A rigidez excessiva pode transformar a estabilidade em sufocamento.",
        "Vocês vieram aprender que as regras existem para servir a relação, não para aprisioná-la.",
        "O universo apresentará situações que exigirão adaptação, criatividade e abertura para o novo."
      ],
      missaoEspiritual: [
        "A missão deste casal é demonstrar que o amor verdadeiro se manifesta no cotidiano.",
        "Vocês vieram mostrar que a grandeza de uma relação não está apenas nos momentos extraordinários, mas na consistência, na presença e no cuidado diário.",
        "São exemplo de que o comprometimento é uma forma poderosa de amor."
      ],
      potencialLongoPrazo: [
        "Poucas vibrações possuem tanto potencial de longevidade quanto o número 4.",
        "Este é o casal que envelhece junto, que atravessa crises sem perder a essência da parceria.",
        "Com o tempo, a união se torna cada vez mais profunda, rica em histórias compartilhadas e conquistas construídas juntos."
      ],
      conselho: [
        "Reservem tempo para o romance espontâneo.",
        "A estabilidade é um presente, mas o amor também precisa de leveza, surpresas e momentos de pura alegria.",
        "Não deixem que a rotina apague o desejo."
      ],
      mensagemFinal: [
        "Vocês foram unidos para construir. Construir uma família, um lar, uma vida e um legado.",
        "A força desta relação está justamente na capacidade de permanecer, de continuar escolhendo um ao outro todos os dias, mesmo quando o caminho se torna difícil.",
        "Este é o amor que resiste ao tempo."
      ]
    }
  },

  5: {
    title: "Vibração 5: A Paixão da Liberdade e Aventura",
    freeText: "A vibração 5 é uma das mais intensas, magnéticas e fascinantes da Numerologia Cabalística. Quando dois seres se unem sob esta energia, o universo está criando um encontro repleto de movimento, paixão, descobertas e experiências que transformam.",
    sections: {
      visaoGeral: [
        "A vibração 5 é uma das mais intensas, magnéticas e fascinantes da Numerologia Cabalística.",
        "Quando dois seres se unem sob esta energia, o universo está criando um encontro repleto de movimento, paixão, descobertas e experiências que transformam.",
        "Este não é um relacionamento comum. A energia do 5 não permite estagnação, monotonia ou acomodação.",
        "Existe entre vocês uma força que empurra constantemente em direção ao novo, ao desconhecido e ao emocionante.",
        "A vida a dois sob esta vibração é uma aventura contínua."
      ],
      atracaoInicial: [
        "A atração entre vocês é quase imediata e muito difícil de ignorar.",
        "Existe magnetismo, fascínio e uma energia que simplesmente funciona desde o primeiro contato.",
        "Vocês se sentem atraídos pelo mistério, pela personalidade multifacetada e pela sensação de que ao lado do outro, a vida se torna mais intensa.",
        "A relação costuma começar de forma inesperada, muitas vezes em situações inusitadas ou durante viagens e experiências fora da rotina."
      ],
      compatibilidadeEmocional: [
        "Emocionalmente, esta é uma união complexa e apaixonante.",
        "Ambos possuem grande necessidade de liberdade e independência.",
        "O amor entre vocês é genuíno, mas pode oscila entre momentos de intensa conexão e períodos de distanciamento.",
        "O segredo está em compreender que a liberdade não é o oposto do amor, mas sim uma de suas expressões mais elevadas.",
        "Respeitar o espaço individual de cada um será fundamental para que a união prospere."
      ],
      comunicacao: [
        "A comunicação é estimulante, dinâmica e cheia de trocas intelectuais.",
        "Vocês possuem opiniões fortes e debates acalorados fazem parte do relacionamento.",
        "Quando canalizados de forma saudável, esses momentos fortalecem o vínculo.",
        "O cuidado necessário é não transformar a busca por estímulos externos em fuga das conversas importantes."
      ],
      amorIntimidade: [
        "A vida íntima deste casal é naturalmente intensa, sensual e cheia de energia.",
        "Existe forte atração física que se renova constantemente.",
        "A paixão permanece acesa quando ambos continuam surpreendendo um ao outro.",
        "Viagens juntos, novas experiências e sair da rotina regularmente são elementos essenciais para manter a chama viva."
      ],
      vidaFinanceira: [
        "Financeiramente, esta vibração traz tanto oportunidades quanto desafios.",
        "A mente criativa e adaptável de ambos gera facilidade para encontrar novas fontes de renda.",
        "Porém existe tendência a gastar impulsivamente em experiências, viagens e novas oportunidades.",
        "Criar uma reserva financeira sólida enquanto mantêm a leveza será o grande equilíbrio a ser buscado."
      ],
      desafiosKarmicos: [
        "A principal lição desta união envolve comprometimento.",
        "A energia do 5 tende a buscar sempre o próximo patamar, o que pode gerar instabilidade se não houver maturidade emocional.",
        "Vocês vieram aprender que a verdadeira liberdade não é fugir do amor, mas sim construir uma relação tão rica que a escolha de permanecer se torna natural e libertadora."
      ],
      missaoEspiritual: [
        "A missão deste casal é expandir.",
        "Vocês possuem capacidade de se transformar mutuamente de maneiras profundas e duradouras.",
        "Através das experiências vividas juntos, ambos evoluem espiritualmente e carregam essa sabedoria para todas as áreas da vida."
      ],
      potencialLongoPrazo: [
        "O potencial de longo prazo desta união depende diretamente da maturidade com que ambos lidam com a necessidade de liberdade.",
        "Quando encontram o equilíbrio entre independência e parceria, este casal constrói uma relação extraordinariamente rica e estimulante.",
        "São aqueles que aos 60 anos ainda planejam aventuras juntos."
      ],
      conselho: [
        "Criem rituais de reconexão.",
        "Mesmo que a vida seja agitada e cheia de movimentos, reservem momentos exclusivos para cultivar a intimidade e a cumplicidade.",
        "A aventura mais importante da vida de vocês é a que vivem juntos."
      ],
      mensagemFinal: [
        "Vocês foram unidos para se transformarem.",
        "Esta relação não existe para ser confortável ou previsível, mas para revelar a cada um o melhor que existe dentro de si.",
        "Juntos, são capazes de viver uma história que poucos têm coragem de escrever."
      ]
    }
  },

  6: {
    title: "Vibração 6: O Amor do Cuidado e Equilíbrio Familiar",
    freeText: "A vibração 6 é considerada pela Numerologia Cabalística como uma das mais abençoadas quando se trata de relacionamentos. Esta é a vibração do amor responsável, do cuidado genuíno e do desejo profundo de construir um lar harmonioso e cheio de significado.",
    sections: {
      visaoGeral: [
        "A vibração 6 é considerada pela Numerologia Cabalística como uma das mais abençoadas quando se trata de relacionamentos.",
        "Esta é a vibração do amor responsável, do cuidado genuíno e do desejo profundo de construir um lar harmonioso e cheio de significado.",
        "Quando dois seres se unem sob o número 6, existe uma vocação natural para a parceria, para o amor que nutre e para a criação de um ambiente de segurança e afeto.",
        "Este casal foi criado para cuidar um do outro e de todos ao redor."
      ],
      atracaoInicial: [
        "A atração nasce do cuidado.",
        "Vocês se sentem atraídos pela sensibilidade, pela generosidade e pela maneira como o outro cuida das pessoas ao redor.",
        "Existe admiração mútua pela capacidade de amar sem condições.",
        "A relação costuma começar de forma natural, sem jogos ou manipulações, baseada em honestidade e intenções verdadeiras."
      ],
      compatibilidadeEmocional: [
        "Emocionalmente, este é um dos casais mais profundos e amorosos da numerologia.",
        "Ambos possuem grande capacidade de empatia, cuidado e dedicação.",
        "O desafio aparece quando o excesso de responsabilidade com o outro gera perda de identidade individual.",
        "Aprender a amar sem se perder é a grande arte desta vibração."
      ],
      comunicacao: [
        "A comunicação tende a ser amorosa, gentil e respeitosa.",
        "Vocês possuem facilidade para dialogar e para encontrar soluções que satisfaçam ambos.",
        "O perigo está na tendência de evitar conflitos por medo de magoar o parceiro.",
        "A honestidade amorosa é o maior presente que podem oferecer um ao outro."
      ],
      amorIntimidade: [
        "A intimidade deste casal é rica, profunda e profundamente afetiva.",
        "O amor físico é uma extensão do amor emocional.",
        "Vocês se sentem seguros para se abrirem completamente.",
        "A dedicação mútua e o cuidado constante criam um ambiente de intimidade onde ambos podem ser exatamente quem são."
      ],
      vidaFinanceira: [
        "O casal possui excelente potencial para construção de um lar confortável e harmonioso.",
        "As decisões financeiras costumam ser tomadas pensando no bem-estar da família.",
        "Existe tendência a investir em qualidade de vida, conforto do lar e educação.",
        "O equilíbrio entre o que é necessário e o que é desejado será uma das principais lições financeiras."
      ],
      desafiosKarmicos: [
        "A principal lição desta união envolve aprender a receber além de dar.",
        "Existe forte tendência ao sacrifício excessivo, à abnegação e à colocação das necessidades do outro sempre acima das próprias.",
        "O universo apresentará situações que convidarão ambos a se permitirem ser cuidados sem culpa.",
        "O amor verdadeiro é uma troca, não um fardo."
      ],
      missaoEspiritual: [
        "A missão deste casal é criar um legado de amor.",
        "Vocês possuem o dom de transformar qualquer ambiente em um lar, de reunir pessoas e de demonstrar que o amor cotidiano é uma das forças mais poderosas do universo.",
        "Sua relação é um exemplo vivo de que é possível amar com profundidade, responsabilidade e alegria."
      ],
      potencialLongoPrazo: [
        "Esta é uma das vibrações com maior potencial de relacionamentos longos, estáveis e felizes.",
        "Com o tempo, o amor entre vocês se aprofunda e se transforma em uma parceria que vai muito além do romantismo.",
        "Torna-se companheirismo, respeito, cumplicidade e um amor que amadurece como vinho."
      ],
      conselho: [
        "Cuidem também de si mesmos.",
        "Um amor que cuida do outro sem se esquecer de si mesmo é o amor que se mantém vibrante, saudável e verdadeiro ao longo dos anos.",
        "Nutrindo a si mesmos, vocês se tornam capazes de amar ainda mais profundamente."
      ],
      mensagemFinal: [
        "Vocês foram unidos para construir um amor que seja lar.",
        "Um lugar de paz, aceitação e crescimento. Um amor que, mesmo diante das tempestades, permanece como porto seguro.",
        "Esta é a vibração do amor que a alma busca por toda a eternidade."
      ]
    }
  },

  7: {
    title: "Vibração 7: A Conexão Espiritual e Intelectual",
    freeText: "A vibração 7 é uma das mais raras e profundas da Numerologia Cabalística. Quando um casal recebe esta compatibilidade, o universo está sinalizando uma conexão que vai muito além do plano físico ou emocional comum.",
    sections: {
      visaoGeral: [
        "A vibração 7 é uma das mais raras e profundas da Numerologia Cabalística.",
        "Quando um casal recebe esta compatibilidade, o universo está sinalizando uma conexão que vai muito além do plano físico ou emocional comum.",
        "Existe entre vocês uma ligação de almas que transcende explicações racionais.",
        "Frequentemente, pessoas com esta vibração relatam a sensação de que já se conheciam antes, de que encontraram alguém com quem a comunicação acontece em níveis que as palavras às vezes não alcançam.",
        "Este é o casal dos grandes mistérios e das grandes revelações internas."
      ],
      atracaoInicial: [
        "A atração entre vocês é singular e difícil de descrever.",
        "Não se baseia apenas na aparência física ou em características superficiais.",
        "Existe algo mais profundo que os conecta: uma ressonância de ideias, valores, visão de mundo e busca espiritual.",
        "Muitas vezes o encontro acontece em circunstâncias incomuns ou em momentos de transformação pessoal.",
        "A sensação é de reconhecimento, como se o universo tivesse planejado esse encontro há muito tempo."
      ],
      compatibilidadeEmocional: [
        "Emocionalmente, esta é uma união de grande profundidade, mas também de grandes desafios.",
        "Ambos tendem à introspecção, ao processamento interno das emoções e à dificuldade de compartilhá-las com espontaneidade.",
        "Existe compreensão mútua de uma forma quase telepática, mas também o risco de criar distâncias emocionais silenciosas.",
        "A chave está em criar um espaço seguro onde a vulnerabilidade seja bem-vinda."
      ],
      comunicacao: [
        "A comunicação entre vocês pode ser extraordinária quando existe abertura.",
        "Vocês são capazes de conversar sobre temas que a maioria das pessoas jamais abordaria: filosofia, espiritualidade, propósito, vida e morte.",
        "O desafio aparece nas conversas cotidianas e emocionais.",
        "Nem sempre é fácil traduzir em palavras o que sentem, mas com prática e paciência, a comunicação se torna uma das maiores riquezas da relação."
      ],
      amorIntimidade: [
        "A intimidade desta relação possui dimensões que vão além do físico.",
        "Existe uma necessidade de conexão de alma, de se sentir verdadeiramente compreendido e aceito.",
        "Quando esse nível de profundidade é alcançado, a intimidade física torna-se uma experiência quase sagrada.",
        "O silêncio compartilhado, os olhares de cumplicidade e os momentos de reflexão juntos são formas de amor tão poderosas quanto qualquer palavra."
      ],
      vidaFinanceira: [
        "Financeiramente, este casal tende a não dar grande importância à riqueza material como fim em si mesma.",
        "O que buscam é segurança suficiente para terem liberdade de explorar seus interesses intelectuais e espirituais.",
        "Podem prosperar em áreas ligadas ao conhecimento, pesquisa, espiritualidade, ciência ou arte.",
        "O planejamento financeiro conjunto exigirá atenção, pois a tendência ao idealismo pode afastar o foco das necessidades práticas."
      ],
      desafiosKarmicos: [
        "O principal desafio desta união é a tendência ao isolamento.",
        "Tanto individual quanto como casal, existe o risco de se afastarem do mundo exterior de forma excessiva.",
        "Vocês vieram aprender que a sabedoria precisa ser compartilhada e que o amor floresce também no contato com o mundo.",
        "Outro desafio é a dificuldade de lidar com as imperfeições humanas, tanto do parceiro quanto de si mesmos."
      ],
      missaoEspiritual: [
        "A missão deste casal é buscar e compartilhar sabedoria.",
        "Vocês foram unidos para evoluir juntos em um nível de consciência que poucos alcançam.",
        "Através desta relação, ambos serão chamados a confrontar suas crenças mais profundas, a questionar e a se transformar.",
        "Sua união é um caminho espiritual em si mesma."
      ],
      potencialLongoPrazo: [
        "Quando encontram o equilíbrio entre profundidade e leveza, esta é uma das uniões mais ricas e significativas que existem.",
        "Com o tempo, tornam-se guardiões mútuos da sabedoria e do crescimento um do outro.",
        "Envelhecem como sábios que percorreram juntos um caminho extraordinário."
      ],
      conselho: [
        "Tragam o amor para o cotidiano.",
        "A profundidade é um dom, mas o amor também se nutre de momentos simples, de risadas, de leveza e de alegria compartilhada.",
        "Não deixem que a busca pelo extraordinário os faça perder o extraordinário que existe no ordinário."
      ],
      mensagemFinal: [
        "Vocês foram unidos para se revelar.",
        "Cada um é o espelho mais profundo que o outro possui.",
        "Através desta relação, ambos terão a oportunidade de se conhecer de uma forma que jamais alcançariam sozinhos.",
        "Este é o amor que transforma a alma."
      ]
    }
  },

  8: {
    title: "Vibração 8: O Sucesso do Poder Material e Conquistas",
    freeText: "A vibração 8 é a vibração do poder, da realização e da abundância na Numerologia Cabalística. Quando um casal recebe esta compatibilidade, o universo está indicando uma parceria com potencial extraordinário para conquistas materiais, liderança e construção de um legado duradouro.",
    sections: {
      visaoGeral: [
        "A vibração 8 é a vibração do poder, da realização e da abundância na Numerologia Cabalística.",
        "Quando um casal recebe esta compatibilidade, o universo está indicando uma parceria com potencial extraordinário para conquistas materiais, liderança e construção de um legado duradouro.",
        "Este não é um relacionamento de pessoas passivas. Ambos possuem ambição, determinação e a capacidade de transformar sonhos em realidade.",
        "Juntos, formam uma força quase irresistível de realização.",
        "O número 8 também carrega consigo a lei do karma: o que é semeado nesta relação, seja amor ou conflito, será amplificado e retornará multiplicado."
      ],
      atracaoInicial: [
        "A atração entre vocês costuma ser intensa e marcada pela admiração das capacidades um do outro.",
        "Vocês percebem no parceiro alguém com visão, determinação e ambição.",
        "Existe fascínio pela força de caráter, pela capacidade de realização e pela presença marcante.",
        "A relação frequentemente começa em contextos profissionais, de negócios ou em situações onde as habilidades de ambos estão em evidência."
      ],
      compatibilidadeEmocional: [
        "Esta é a área que exige maior atenção nesta vibração.",
        "Ambos tendem a colocar realizações externas acima das necessidades emocionais internas.",
        "O amor existe, é profundo e real, mas pode ser sufocado pelo peso das responsabilidades e da ambição.",
        "Criar espaço sagrado para a vulnerabilidade, para o afeto e para o cuidado mútuo será o grande desafio e também o grande tesouro desta relação."
      ],
      comunicacao: [
        "A comunicação tende a ser eficiente, objetiva e voltada para resultados.",
        "Vocês preferem agir a falar e costumam comunicar o amor através de atitudes concretas.",
        "O cuidado necessário está em não permitir que a eficiência substitua a intimidade.",
        "Algumas conversas precisam acontecer pelo simples prazer de se conectar, sem objetivo definido."
      ],
      amorIntimidade: [
        "A vida íntima deste casal pode ser intensa e apaixonada quando existe equilíbrio entre o lado profissional e o pessoal.",
        "O desejo e a atração permanecem fortes ao longo do tempo.",
        "Porém, quando o foco excessivo nas conquistas externas domina, a intimidade pode ser negligenciada.",
        "Proteger o tempo e o espaço da relação como uma prioridade absoluta é essencial para manter a conexão viva."
      ],
      vidaFinanceira: [
        "Este é o casal com maior potencial de prosperidade material na numerologia.",
        "Possuem capacidade natural para identificar oportunidades, liderar equipes e construir patrimônio.",
        "Quando trabalham juntos em direção a objetivos comuns, os resultados são impressionantes.",
        "O equilíbrio necessário está em lembrar que a riqueza é um meio, não um fim.",
        "O verdadeiro legado é construído também com amor, presença e conexão humana."
      ],
      desafiosKarmicos: [
        "O principal desafio desta vibração envolve o equilíbrio entre poder e amor.",
        "Existe tendência ao controle, à competitividade interna e à dificuldade de demonstrar fraqueza.",
        "O karma do 8 é poderoso: toda ação gera consequência amplificada.",
        "Vocês vieram aprender que verdadeiro poder não é dominação, mas a capacidade de elevar o outro sem diminuir a si mesmo."
      ],
      missaoEspiritual: [
        "A missão deste casal é construir um legado.",
        "Não apenas material, mas humano.",
        "Vocês têm a capacidade de impactar a vida de muitas pessoas através dos negócios que criam, das oportunidades que geram e do exemplo que oferecem.",
        "Sua relação pode ser uma fonte de inspiração para outros que desejam unir amor e conquista."
      ],
      potencialLongoPrazo: [
        "Quando encontram o equilíbrio entre ambição e afeto, esta é uma das uniões mais poderosas e duradouras que existem.",
        "Com o tempo, constroem juntos um império que vai além das finanças: um império de histórias, de conquistas compartilhadas e de amor que resistiu à pressão.",
        "Envelhecem como parceiros de guerra que venceram as batalhas mais importantes juntos."
      ],
      conselho: [
        "Lembrem-se regularmente do porquê escolheram um ao outro.",
        "O sucesso externo não tem sabor quando não há alguém ao lado para celebrá-lo.",
        "Invistam no relacionamento com a mesma energia e estratégia que investem nos negócios."
      ],
      mensagemFinal: [
        "Vocês foram unidos para construir um legado de poder e amor.",
        "Mas lembrem-se: ao final da vida, o que permanece não é o que acumularam, mas quem amaram e como amaram.",
        "Que o amor de vocês seja tão grandioso quanto as conquistas que alcançarão juntos."
      ]
    }
  },

  9: {
    title: "Vibração 9: A Conexão Humanitária e o Amor Incondicional",
    freeText: "A vibração 9 é considerada pela Numerologia Cabalística como a mais elevada e completa de todas. Ela representa o amor universal, a sabedoria acumulada, o fechamento de ciclos e a capacidade de amar sem condições, sem fronteiras e sem ego.",
    sections: {
      visaoGeral: [
        "A vibração 9 é considerada pela Numerologia Cabalística como a mais elevada e completa de todas.",
        "Ela representa o amor universal, a sabedoria acumulada, o fechamento de ciclos e a capacidade de amar sem condições, sem fronteiras e sem ego.",
        "Quando dois seres se encontram sob esta vibração, existe entre eles uma conexão de almas antigas, que já percorreram muitos caminhos e que se reencontram agora para completar algo maior.",
        "Este relacionamento possui uma qualidade etérea, quase espiritual, que vai muito além do que os olhos conseguem ver."
      ],
      atracaoInicial: [
        "A atração entre vocês possui uma qualidade difícil de explicar racionalmente.",
        "Existe um reconhecimento profundo, como se as almas se conhecessem de outras experiências.",
        "Há compaixão, admiração pelos valores e pela forma como cada um enxerga o mundo.",
        "O encontro costuma acontecer em momentos de transição, quando ambos estão prontos para uma transformação profunda.",
        "O universo orquestra esse encontro com precisão, pois ele faz parte de um propósito maior."
      ],
      compatibilidadeEmocional: [
        "A compatibilidade emocional desta vibração é profunda e rica.",
        "Existe grande capacidade de compaixão, aceitação e compreensão mútua.",
        "Ambos possuem sensibilidade elevada e facilidade para sentir as emoções do outro.",
        "O desafio está na tendência ao sacrifício excessivo.",
        "A generosidade desta vibração, quando não equilibrada, pode gerar exaustão emocional e a sensação de que o próprio eu foi esquecido em favor do outro ou do mundo."
      ],
      comunicacao: [
        "A comunicação deste casal possui uma qualidade elevada e filosófica.",
        "Vocês gostam de conversar sobre temas profundos e possuem visões de mundo ricas e bem fundamentadas.",
        "O cuidado necessário está em trazer a conversa também para o plano emocional e cotidiano.",
        "Nem toda comunicação precisa ser profunda. Às vezes, o amor se comunica também na leveza do dia a dia."
      ],
      amorIntimidade: [
        "A intimidade desta relação possui uma dimensão quase sagrada.",
        "O amor é vivido de forma intensa, mas também refinada e consciente.",
        "Existe grande generosidade na expressão do afeto.",
        "Ambos se sentem amados de uma forma que vai além do físico.",
        "O desafio está em manter a chama da paixão acesa enquanto o amor se aprofunda em sua dimensão espiritual."
      ],
      vidaFinanceira: [
        "Financeiramente, este casal costuma não se prender excessivamente a questões materiais.",
        "Existe generosidade natural que, quando não balanceada, pode gerar instabilidade.",
        "O potencial de prosperidade existe, especialmente em áreas ligadas a causas sociais, arte, espiritualidade, saúde e educação.",
        "Aprender a valorizar a própria energia e a receber sem culpa será uma lição importante para ambos."
      ],
      desafiosKarmicos: [
        "A principal lição desta vibração envolve o fechamento de ciclos.",
        "Vocês foram unidos para resolver questões kármicas antigas, tanto individuais quanto relacionadas um ao outro.",
        "Haverá momentos de profunda transformação, de perdas necessárias e de renúncias que abrem espaço para o novo.",
        "O maior desafio é aprender a deixar ir, seja pessoas, situações ou versões antigas de si mesmos, sem carregar o peso do passado.",
        "A leveza é a chave para a evolução desta vibração."
      ],
      missaoEspiritual: [
        "A missão deste casal é servir.",
        "Não de forma submissa ou sacrificial, mas através do exemplo de um amor que eleva, que inspira e que demonstra que é possível amar o mundo enquanto se ama profundamente uma pessoa.",
        "Vocês possuem o potencial de impactar a vida de muitas pessoas através da bondade, da compaixão e da sabedoria que emanam como casal.",
        "Sua relação é, em si mesma, um presente para o mundo."
      ],
      potencialLongoPrazo: [
        "Esta é uma das vibrações com maior potencial de evolução ao longo do tempo.",
        "O amor que começa como atração se transforma em devoção, depois em companheirismo e, finalmente, em uma união de almas que transcende qualquer definição comum de relacionamento.",
        "Quando bem trabalhada, esta relação é a que dura pela vida toda e além dela."
      ],
      conselho: [
        "Cuidem também de vocês mesmos.",
        "O mundo precisa de vocês, mas primeiro vocês precisam um do outro.",
        "Antes de servir ao próximo, nutram a relação, cultivem o amor que os une e protejam esse espaço sagrado que é a vida de vocês dois juntos."
      ],
      mensagemFinal: [
        "Vocês foram unidos não por acaso, mas por um propósito que vai além da compreensão humana ordinária.",
        "Esta relação é uma dádiva: um encontro de almas que percorreram longas jornadas e que finalmente chegaram ao mesmo lugar, ao mesmo tempo.",
        "Honrem este amor. Ele é raro, profundo e eterno.",
        "O destino desta relação é alcançar o amor em sua forma mais pura e elevada, transformando tudo e todos ao redor através da sua luz."
      ]
    }
  }
};

