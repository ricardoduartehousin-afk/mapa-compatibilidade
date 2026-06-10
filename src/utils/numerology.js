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
    title: "Perfil 1: A Força da Liderança e Independência",
    freeText: "Este é um casal que se destaca pela iniciativa, coragem e desejo constante de crescimento. Existe entre vocês um impulso natural para buscar novas conquistas e realizações. O grande aprendizado será cooperar em vez de competir, unindo forças para construir algo maior.",
    sections: {
      visaoGeral: [
        "Este é um casal que se destaca pela iniciativa, coragem e desejo constante de crescimento. Não é uma relação que se contenta com a estagnação — há sempre um impulso em direção a novos desafios.",
        "Uma característica marcante desta relação é a força de vontade que ambos possuem. Quando direcionada para objetivos comuns, essa determinação se torna o maior motor da parceria.",
        "Na prática, vocês não esperam que as coisas aconteçam: fazem acontecer. O desafio está em aprender a remar na mesma direção, em vez de disputar quem segura o leme.",
        "O relacionamento costuma começar com intensidade, com ambos se sentindo admirados pela força e capacidade de realização que percebem um no outro."
      ],
      atracaoInicial: [
        "A atração entre vocês nasce da admiração pela força que cada um percebe no outro. Não é uma conexão que brota da fragilidade, mas do reconhecimento de duas pessoas que se veem como capazes e realizadoras.",
        "Existe fascínio pela independência, pela personalidade marcante e pela capacidade de realização que cada um carrega.",
        "Vocês se enxergam como pessoas que têm objetivos claros e sentem que, juntos, podem conquistar ainda mais do que separados.",
        "Desde o início, há intensidade, iniciativa e um desejo mútuo de avançar rapidamente na construção da relação."
      ],
      compatibilidadeEmocional: [
        "Emocionalmente, esta não é uma união excessivamente dependente. Ambos valorizam sua liberdade, autonomia e espaço individual dentro da relação.",
        "O amor costuma ser demonstrado mais através de atitudes práticas, proteção e incentivo ao crescimento pessoal do que através de palavras ou gestos românticos tradicionais.",
        "O desafio aparece quando um dos dois começa a sentir que suas necessidades emocionais não estão sendo reconhecidas. Como ambos são pessoas fortes, às vezes um pode não perceber que o outro também precisa de acolhimento.",
        "Aprender a verbalizar sentimentos de forma clara e consistente será fundamental para aprofundar a conexão."
      ],
      comunicacao: [
        "A comunicação tende a ser direta, objetiva e prática. Vocês preferem resolver problemas rapidamente em vez de prolongar discussões.",
        "No entanto, justamente pela personalidade forte de ambos, conflitos podem surgir quando cada um acredita firmemente estar certo. O crescimento do casal depende da capacidade de ouvir sem transformar toda divergência em competição."
      ],
      amorIntimidade: [
        "A vida amorosa costuma ser intensa, apaixonada e cheia de vitalidade. Existe forte atração física e um desejo constante de conquistar o parceiro, mesmo após anos de convivência.",
        "O romance floresce quando ambos continuam admirando as qualidades e conquistas um do outro.",
        "Quando a admiração desaparece — pela rotina ou falta de cuidado — a paixão pode enfraquecer rapidamente. Manter vivo o olhar de admiração é um dos segredos mais importantes para este casal."
      ],
      vidaFinanceira: [
        "Esta é uma combinação favorável para construção patrimonial. O casal possui energia empreendedora e disposição para iniciar projetos.",
        "Podem prosperar através de negócios próprios, investimentos ou atividades que exijam liderança e iniciativa.",
        "O risco está em decisões impulsivas ou no excesso de confiança. Planejamento e estratégia conjunta serão fundamentais para maximizar resultados e evitar perdas."
      ],
      desafiosKarmicos: [
        "A principal lição desta união envolve o equilíbrio entre liderança e parceria. Quando duas pessoas fortes se unem, o ego pode se tornar um campo de disputa.",
        "O aprendizado aqui é compreender que liderar não significa controlar. As situações mais desafiadoras surgirão justamente para ensinar cooperação, paciência e humildade.",
        "A maturidade do casal chega quando ambos compreendem que o sucesso da relação é mais importante do que vencer uma discussão."
      ],
      missaoEspiritual: [
        "O propósito deste casal é inspirar outras pessoas através do exemplo. Vocês têm o potencial de abrir caminhos não apenas para si mesmos, mas para aqueles que os observam.",
        "Através da coragem, da iniciativa e da determinação, podem se tornar uma referência para familiares, amigos e para a comunidade ao redor.",
        "Sua relação pode mostrar que é possível ser forte sem deixar de ser parceiro."
      ],
      potencialLongoPrazo: [
        "Quando aprendem a equilibrar independência e parceria, esta união possui enorme potencial de durabilidade.",
        "Vocês podem envelhecer lado a lado admirando as conquistas que construíram juntos e celebrando cada desafio superado como equipe."
      ],
      conselho: [
        "Transformem a competição em cooperação. A energia que utilizam para disputar espaço pode ser direcionada para construir uma vida extraordinária juntos.",
        "Lembrem-se: vocês estão no mesmo time. Cada vitória do outro é também uma vitória sua."
      ],
      mensagemFinal: [
        "Vocês foram unidos para aprender a liderar sem dominar, amar sem prender e crescer sem deixar o outro para trás.",
        "O caminho desta relação é de avanço constante. Construam juntos uma história marcada por parceria, superação e conquistas compartilhadas."
      ]
    }
  },

  2: {
    title: "Perfil 2: A Harmonia da Sensibilidade e Companheirismo",
    freeText: "Este é um dos casais mais emocionalmente profundos. A relação é construída sobre a empatia, a compreensão e o apoio mútuo. Vocês não foram unidos para competir, mas para caminhar lado a lado.",
    sections: {
      visaoGeral: [
        "Este é um dos casais mais emocionalmente profundos e delicados. A relação é construída sobre a empatia, a compreensão e o apoio mútuo.",
        "Vocês não foram unidos para competir, mas para caminhar lado a lado. Existe uma sensação de familiaridade e segurança na presença um do outro que poucos casais experimentam.",
        "O que observamos é que esta é uma parceria onde o coração fala mais alto. As decisões são tomadas considerando os sentimentos de ambos, e o cuidado com o bem-estar do outro é uma prioridade natural.",
        "A conexão entre vocês tem uma qualidade acolhedora, que faz com que ambos se sintam em casa na presença do parceiro."
      ],
      atracaoInicial: [
        "A atração entre vocês costuma surgir de forma gradual, diferente de relações mais impulsivas. Existe uma conexão emocional quase imediata, uma sensação de que vocês já se conhecem há mais tempo do que realmente se conhecem.",
        "Vocês sentem que podem confiar um no outro desde cedo. A segurança emocional que o outro transmite é um dos maiores fatores de atração.",
        "Muitas vezes, a relação começa através da amizade, da cumplicidade ou de conversas profundas que revelam uma sintonia natural.",
        "Não é uma paixão explosiva, mas um reconhecimento tranquilo de que ali existe algo especial."
      ],
      compatibilidadeEmocional: [
        "Este é o ponto mais forte da união. Existe grande capacidade de compreender os sentimentos um do outro sem necessidade de longas explicações.",
        "Vocês percebem mudanças de humor, preocupações silenciosas e necessidades emocionais de forma quase intuitiva. Essa sensibilidade é um presente raro.",
        "Porém, justamente por serem tão sensíveis, pequenas mágoas podem ser acumuladas silenciosamente. Um pode deixar de expressar o que sente para não preocupar ou magoar o outro.",
        "A comunicação emocional precisa ser transparente. O silêncio que protege pode, com o tempo, se transformar em distância."
      ],
      comunicacao: [
        "A conversa tende a ser respeitosa, diplomática e cuidadosa. Vocês geralmente evitam conflitos desnecessários e preferem manter a harmonia.",
        "O perigo está justamente aí: evitar discussões importantes para preservar uma falsa sensação de paz. A verdadeira harmonia nasce da sinceridade, não da omissão.",
        "Aprender a discordar com respeito, sem medo de desagradar, é um dos grandes amadurecimentos deste casal."
      ],
      amorIntimidade: [
        "A intimidade é marcada por carinho, afeto e conexão emocional profunda. O aspecto físico se fortalece através da confiança e da proximidade emocional, não o contrário.",
        "Existe uma forte necessidade de demonstrações de amor, atenção e presença. Pequenos gestos — um abraço, uma palavra gentil, um cuidado inesperado — possuem enorme valor.",
        "Para este casal, o romance está nos detalhes. A ausência de demonstrações de afeto pode ser sentida como um sinal de distanciamento, mesmo quando não é.",
        "Cultivar momentos de conexão diária é essencial para manter a chama acesa."
      ],
      vidaFinanceira: [
        "Embora não seja uma combinação voltada para grandes ambições financeiras, existe excelente potencial para estabilidade.",
        "Vocês costumam tomar decisões pensando na segurança da família e do relacionamento, priorizando qualidade de vida em vez de status ou acúmulo.",
        "O equilíbrio financeiro vem naturalmente quando ambos estão alinhados sobre o que realmente importa."
      ],
      desafiosKarmicos: [
        "A principal lição deste casal envolve aprender a estabelecer limites saudáveis. Existe uma tendência a sacrificar as próprias necessidades em favor do parceiro.",
        "O aprendizado aqui é que amar não significa abrir mão de si mesmo. A relação mais saudável é aquela onde ambos podem ser inteiros, não metades que se completam.",
        "Dizer 'não' quando necessário não é um ato de egoísmo, mas de amor próprio — e esse amor fortalece a relação."
      ],
      missaoEspiritual: [
        "O propósito deste casal é demonstrar o verdadeiro significado da parceria. Vocês mostram que força também pode existir na gentileza, na paciência e na compreensão.",
        "Através do exemplo de vocês, muitas pessoas ao redor podem aprender sobre respeito, empatia e o valor de uma relação construída com cuidado.",
        "Sua contribuição para o mundo é provar que o amor sensível é tão poderoso quanto qualquer outra força."
      ],
      potencialLongoPrazo: [
        "Poucos casais possuem tanto potencial para relacionamentos duradouros quanto este. Quando bem trabalhada, esta união pode atravessar décadas mantendo carinho, respeito e cumplicidade.",
        "O tempo, para vocês, é um aliado: quanto mais convivem, mais a conexão se aprofunda e mais a confiança se solidifica."
      ],
      conselho: [
        "Não tenham medo das conversas difíceis. A honestidade emocional fortalece aquilo que já é naturalmente harmonioso.",
        "Lembrem-se de que cuidar do outro inclui também permitir que o outro cuide de você. Vocês merecem receber tanto quanto dão."
      ],
      mensagemFinal: [
        "Vocês foram unidos para aprender que o amor verdadeiro não é sobre controlar ou conquistar, mas sobre apoiar, compreender e crescer juntos.",
        "Que a delicadeza de vocês nunca seja confundida com fraqueza, pois é justamente ela que faz desta relação um porto seguro para ambos."
      ]
    }
  },

  3: {
    title: "Perfil 3: O Brilho da Comunicação e Criatividade",
    freeText: "Este é um dos casais mais alegres e criativos. A relação é marcada pela leveza, pela diversão e pelo desejo de viver intensamente cada momento. Vocês trazem cor para a vida um do outro e raramente se deixam cair na monotonia.",
    sections: {
      visaoGeral: [
        "Este é um dos casais mais alegres, criativos e expressivos. A relação é marcada pela leveza, pela diversão e pelo entusiasmo com que vivem cada momento.",
        "Vocês trazem cor para a vida um do outro. A convivência raramente é monótona, e existe uma necessidade constante de novidades, experiências e estímulos.",
        "Uma característica marcante desta relação é a capacidade de encontrar prazer nas pequenas coisas e de transformar o cotidiano em algo especial.",
        "O que observamos é que este casal tem uma energia contagiante — pessoas ao redor gostam de estar perto de vocês porque sentem essa vitalidade."
      ],
      atracaoInicial: [
        "A conexão geralmente nasce através da conversa. O humor, a inteligência e a capacidade de comunicação são fatores extremamente importantes na atração inicial.",
        "Vocês se sentem atraídos pela personalidade vibrante um do outro, pela maneira como cada um vê o mundo e pela facilidade com que a troca de ideias acontece.",
        "A relação costuma começar cercada de risadas, diversão e entusiasmo. Existe uma sensação de que a vida fica mais leve quando estão juntos.",
        "Não é raro que amigos e familiares comentem sobre a química visível entre vocês desde o primeiro momento."
      ],
      compatibilidadeEmocional: [
        "Existe facilidade para expressar sentimentos e emoções. Vocês gostam de conversar sobre praticamente tudo e encontram prazer na troca constante de ideias.",
        "O desafio aparece quando emoções mais profundas ou dolorosas precisam ser enfrentadas. Em alguns momentos, podem usar o humor ou a distração como mecanismo para evitar a vulnerabilidade.",
        "A maturidade emocional deste casal cresce quando ambos aprendem que a leveza pode coexistir com a profundidade.",
        "Criar espaço para conversas sérias sem perder a alegria que os une é o grande equilíbrio a ser buscado."
      ],
      comunicacao: [
        "Este é o maior ponto forte da união. A comunicação flui naturalmente, e vocês conseguem conversar durante horas sem perceber o tempo passar.",
        "Quando utilizam essa habilidade para resolver conflitos — em vez de apenas para se divertir — o relacionamento se fortalece enormemente.",
        "A palavra tem poder para vocês. Usem-na para construir, para curar e para se conectar ainda mais profundamente."
      ],
      amorIntimidade: [
        "O romance é leve, divertido e espontâneo. Existe um forte componente de amizade dentro da relação, e vocês genuinamente gostam da companhia um do outro.",
        "A intimidade é alimentada pela admiração intelectual e pela conexão emocional. A paixão permanece viva enquanto houver novidade, criatividade e desejo de surpreender.",
        "O risco está na rotina: quando a relação se torna previsível demais, o interesse pode diminuir. Manter a criatividade viva é essencial.",
        "Planejar momentos especiais, viagens ou mesmo noites temáticas pode fazer uma grande diferença."
      ],
      vidaFinanceira: [
        "O casal possui talento para áreas criativas, comunicação, marketing, vendas, entretenimento e empreendedorismo. Podem prosperar profissionalmente unindo essas habilidades.",
        "Porém, existe tendência a gastar impulsivamente ou priorizar prazeres imediatos em detrimento de metas de longo prazo.",
        "Aprender organização financeira será essencial para transformar o potencial criativo em estabilidade duradoura."
      ],
      desafiosKarmicos: [
        "A principal lição desta união envolve disciplina e foco. Vocês vieram aprender que sonhos precisam ser acompanhados de planejamento para se tornarem realidade.",
        "Sem estrutura, existe o risco de dispersão e instabilidade. O aprendizado está em equilibrar a espontaneidade com a responsabilidade.",
        "A diversão é importante, mas a maturidade vem quando vocês aprendem a honrar também os compromissos e as metas que estabelecem juntos."
      ],
      missaoEspiritual: [
        "O propósito deste casal é espalhar alegria e inspirar as pessoas ao redor. Vocês têm uma capacidade natural de iluminar ambientes e aproximar pessoas.",
        "Através da criatividade, da comunicação e da energia positiva de vocês, muitos podem se sentir encorajados a viver com mais leveza e autenticidade.",
        "Sua relação é um lembrete de que o amor também pode ser divertido, sem perder sua profundidade."
      ],
      potencialLongoPrazo: [
        "Quando conseguem equilibrar diversão e responsabilidade, esta união possui enorme potencial de felicidade duradoura.",
        "O relacionamento permanece jovem mesmo com o passar dos anos, porque vocês têm a capacidade de se reinventar e de encontrar alegria nas pequenas coisas."
      ],
      conselho: [
        "Não utilizem a leveza para fugir dos desafios. Encarem os momentos difíceis com a mesma criatividade que aplicam nos momentos bons.",
        "A maturidade emocional não elimina a diversão — pelo contrário, permite que o brilho da relação se torne ainda mais forte e verdadeiro."
      ],
      mensagemFinal: [
        "Vocês foram unidos para mostrar que o amor também pode ser leve, divertido e inspirador.",
        "Juntos, possuem a capacidade de transformar a vida cotidiana em uma jornada cheia de significado, alegria e crescimento compartilhado."
      ]
    }
  },

  4: {
    title: "Perfil 4: A Solidez da Estabilidade e Construção",
    freeText: "Este é um dos casais mais sólidos e confiáveis. A relação é construída sobre bases reais, comprometimento genuíno e desejo sincero de construir algo duradouro. Não é um amor de impulsos passageiros, mas de dedicação diária.",
    sections: {
      visaoGeral: [
        "Este é um dos casais mais sólidos e confiáveis. A relação é construída sobre bases reais, comprometimento genuíno e desejo sincero de construir algo duradouro.",
        "Não é um relacionamento de impulsos passageiros. Aqui existe seriedade, dedicação e a compreensão de que o amor verdadeiro se constrói dia após dia, com escolhas conscientes.",
        "Uma característica marcante desta relação é a capacidade de planejar o futuro juntos. Vocês não apenas sonham — vocês constroem.",
        "O que observamos é que este casal possui tudo o que é necessário para edificar uma vida estável e significativa, desde que cultivem também a leveza e a espontaneidade."
      ],
      atracaoInicial: [
        "A atração entre vocês raramente nasce de forma explosiva. Existe um processo gradual de aproximação, baseado na confiança, no respeito e na admiração pela seriedade um do outro.",
        "Vocês percebem no parceiro alguém confiável, responsável e com quem é possível planejar o futuro. Essa sensação de segurança é o principal combustível da atração.",
        "Não é o amor que tira o chão, mas o amor que dá chão. E é exatamente isso que torna a conexão tão especial.",
        "A relação costuma começar de forma natural, sem pressa, permitindo que a confiança se estabeleça antes que a intimidade se aprofunde."
      ],
      compatibilidadeEmocional: [
        "Emocionalmente, este casal costuma ser estável e leal. Existe profundo compromisso com o bem-estar mútuo e uma dedicação que inspira segurança.",
        "O desafio está na dificuldade de expressar emoções com espontaneidade. Ambos tendem a ser reservados quanto aos sentimentos mais profundos, o que pode gerar uma sensação de distância emocional com o tempo.",
        "Cultivar momentos de abertura e vulnerabilidade é essencial para aprofundar a conexão. Nem tudo precisa ser resolvido — às vezes, precisa apenas ser compartilhado.",
        "Aprender que demonstrar fragilidade não é fraqueza, mas uma forma de fortalecer a intimidade."
      ],
      comunicacao: [
        "A comunicação é prática, direta e voltada para soluções. Vocês não perdem tempo com rodeios e preferem abordar os problemas de frente.",
        "O cuidado necessário está em não transformar toda conversa em uma análise racional. Às vezes, o coração precisa falar mais alto do que a razão.",
        "Reservem espaço para conversas que não tenham objetivo definido — apenas o prazer de se conectar."
      ],
      amorIntimidade: [
        "A vida íntima pode demorar para se aprofundar, pois ambos precisam de confiança antes de se abrirem completamente. Quando essa confiança está estabelecida, a intimidade é rica, segura e profundamente satisfatória.",
        "O amor é demonstrado através de atos concretos: cuidar, proteger, prover e estar presente nos momentos difíceis.",
        "Gestos românticos espontâneos precisam ser cultivados conscientemente. A rotina e a praticidade podem, com o tempo, ofuscar a chama da paixão.",
        "Surpreender o parceiro com pequenos gestos de afeto é um investimento que traz grandes retornos."
      ],
      vidaFinanceira: [
        "Esta é uma das combinações mais favoráveis para construção de patrimônio. Vocês possuem disciplina financeira, capacidade de poupança e habilidade para planejar o futuro.",
        "Preferem segurança a riscos desnecessários, o que é uma qualidade para a estabilidade.",
        "Com planejamento conjunto, têm tudo para construir um patrimônio sólido e deixar um legado para as próximas gerações."
      ],
      desafiosKarmicos: [
        "A principal lição desta união envolve flexibilidade. A rigidez excessiva pode transformar a estabilidade em sufocamento.",
        "Vocês são desafiados a aprender que as regras existem para servir a relação, não para aprisioná-la. A vida apresentará situações que exigirão adaptação, criatividade e abertura para o novo.",
        "O verdadeiro equilíbrio está em manter a estrutura sem perder a capacidade de se reinventar."
      ],
      missaoEspiritual: [
        "O propósito deste casal é demonstrar que o amor verdadeiro se manifesta no cotidiano. A grandeza de uma relação não está apenas nos momentos extraordinários, mas na consistência, na presença e no cuidado diário.",
        "Vocês são um exemplo de que o comprometimento é uma das formas mais poderosas de amor.",
        "Através da estabilidade que constroem juntos, criam um ambiente seguro onde todos ao redor podem florescer."
      ],
      potencialLongoPrazo: [
        "Poucos casais possuem tanto potencial de longevidade quanto este. Vocês são o tipo de casal que envelhece junto, que atravessa crises sem perder a essência da parceria.",
        "Com o tempo, a união se torna cada vez mais profunda, rica em histórias compartilhadas e conquistas construídas a quatro mãos."
      ],
      conselho: [
        "Reservem tempo para o romance espontâneo. A estabilidade é um presente, mas o amor também precisa de leveza, surpresas e momentos de pura alegria.",
        "Não deixem que a rotina apague o desejo. Lembrem-se de que a segurança e a paixão podem — e devem — coexistir."
      ],
      mensagemFinal: [
        "Vocês foram unidos para construir. Construir uma família, um lar, uma vida e um legado.",
        "A força desta relação está na capacidade de permanecer, de continuar escolhendo um ao outro todos os dias. Este é o amor que resiste ao tempo."
      ]
    }
  },

  5: {
    title: "Perfil 5: A Paixão da Liberdade e Aventura",
    freeText: "Este é um dos casais mais intensos e fascinantes. A relação é marcada pelo movimento, pela paixão e pelo desejo constante de descobrir o novo. Não é um relacionamento para quem busca acomodação — é uma aventura contínua vivida a dois.",
    sections: {
      visaoGeral: [
        "Este é um dos casais mais intensos e fascinantes. Não é uma relação comum — não permite estagnação, monotonia ou acomodação.",
        "Existe entre vocês uma energia que impulsiona constantemente em direção ao novo, ao desconhecido e ao emocionante. A vida a dois é uma aventura contínua.",
        "Uma característica marcante desta relação é a capacidade de se reinventar e de encontrar entusiasmo nas experiências compartilhadas.",
        "O que observamos é que este casal nunca para de evoluir. Cada fase da relação traz descobertas, e o tédio raramente encontra espaço."
      ],
      atracaoInicial: [
        "A atração entre vocês é quase imediata e muito difícil de ignorar. Existe magnetismo, fascínio e uma química que funciona desde o primeiro contato.",
        "Vocês se sentem atraídos pelo mistério, pela personalidade multifacetada e pela sensação de que, ao lado do outro, a vida se torna mais intensa.",
        "A relação costuma começar de forma inesperada — muitas vezes em situações inusitadas, durante viagens ou experiências fora da rotina.",
        "Desde o início, fica claro que esta não será uma relação comum. E é justamente isso que torna a conexão tão eletrizante."
      ],
      compatibilidadeEmocional: [
        "Emocionalmente, esta é uma união complexa e apaixonante. Ambos possuem grande necessidade de liberdade e independência.",
        "O amor entre vocês é genuíno, mas pode oscilar entre momentos de intensa conexão e períodos de distanciamento. Isso não é necessariamente um problema — é o ritmo natural de vocês.",
        "O segredo está em compreender que a liberdade não é o oposto do amor, mas sim uma de suas expressões mais saudáveis.",
        "Respeitar o espaço individual de cada um será fundamental para que a união prospere sem sufocar a essência de ninguém."
      ],
      comunicacao: [
        "A comunicação é estimulante, dinâmica e cheia de trocas intelectuais. Vocês possuem opiniões fortes, e debates acalorados fazem parte do relacionamento.",
        "Quando canalizados de forma saudável, esses momentos de discussão fortalecem o vínculo. O cuidado necessário é não transformar a busca por estímulos externos em fuga das conversas emocionais importantes."
      ],
      amorIntimidade: [
        "A vida íntima deste casal é naturalmente intensa, sensual e cheia de energia. Existe forte atração física que se renova constantemente.",
        "A paixão permanece acesa quando ambos continuam surpreendendo um ao outro. Viagens juntos, novas experiências e sair da rotina regularmente são essenciais.",
        "O risco está na previsibilidade. Quando a relação se torna rotineira demais, um dos dois pode buscar estímulos fora.",
        "Manter o elemento surpresa vivo é um dos maiores segredos deste casal."
      ],
      vidaFinanceira: [
        "Financeiramente, esta combinação traz tanto oportunidades quanto desafios. A mente criativa e adaptável de ambos gera facilidade para encontrar novas fontes de renda.",
        "Porém, existe tendência a gastar impulsivamente em experiências, viagens e novidades. Criar uma reserva financeira sólida será o grande equilíbrio a ser buscado.",
        "O ideal é unir a capacidade de ganhar dinheiro com uma disciplina mínima de planejamento."
      ],
      desafiosKarmicos: [
        "A principal lição desta união envolve comprometimento. A energia de vocês tende a buscar sempre o próximo patamar, o que pode gerar instabilidade se não houver maturidade emocional.",
        "O aprendizado está em compreender que a verdadeira liberdade não é fugir do compromisso, mas construir uma relação tão rica que a escolha de permanecer se torna natural.",
        "O amadurecimento vem quando vocês descobrem que estar juntos não limita a liberdade de ninguém — pelo contrário, a amplia."
      ],
      missaoEspiritual: [
        "O propósito deste casal é expandir horizontes — os próprios e os das pessoas ao redor. Vocês têm a capacidade de se transformar mutuamente de maneiras profundas.",
        "Através das experiências vividas juntos, ambos crescem e levam essa sabedoria para todas as áreas da vida.",
        "A relação de vocês é uma prova de que é possível amar intensamente sem perder a individualidade."
      ],
      potencialLongoPrazo: [
        "O potencial de longo prazo depende diretamente da maturidade com que ambos lidam com a necessidade de liberdade.",
        "Quando encontram o equilíbrio entre independência e parceria, constroem uma relação extraordinariamente rica e estimulante — daquelas que, aos 60 anos, ainda estão planejando a próxima aventura juntos."
      ],
      conselho: [
        "Criem rituais de reconexão. Mesmo que a vida seja agitada, reservem momentos exclusivos para cultivar a intimidade e a cumplicidade.",
        "Lembrem-se: a aventura mais importante da vida de vocês é a que vivem juntos. Não deixem que a busca pelo próximo estímulo os afaste do que já construíram."
      ],
      mensagemFinal: [
        "Vocês foram unidos para se transformar. Esta relação não existe para ser confortável ou previsível, mas para revelar o melhor que existe dentro de cada um.",
        "Juntos, são capazes de viver uma história que poucos têm coragem de escrever. Que ela seja cheia de amor, respeito e muitas aventuras compartilhadas."
      ]
    }
  },

  6: {
    title: "Perfil 6: O Amor do Cuidado e Equilíbrio Familiar",
    freeText: "Este é um casal que tem o amor responsável e o cuidado genuíno como marcas registradas. A relação é construída sobre o desejo profundo de construir um lar harmonioso e de cuidar um do outro com dedicação.",
    sections: {
      visaoGeral: [
        "Este é um casal que tem o amor responsável e o cuidado genuíno como marcas registradas. Existe uma vocação natural para a parceria e para a criação de um ambiente de segurança e afeto.",
        "O que observamos é que vocês foram feitos para cuidar um do outro — e também das pessoas ao redor. O lar que constroem juntos é um espaço de acolhimento.",
        "Uma característica marcante desta relação é a generosidade. Ambos se dedicam intensamente ao bem-estar do parceiro e da família.",
        "O desafio está em aprender a equilibrar o cuidado com o outro e o cuidado consigo mesmo."
      ],
      atracaoInicial: [
        "A atração nasce do cuidado. Vocês se sentem atraídos pela sensibilidade, pela generosidade e pela maneira como o outro trata as pessoas ao redor.",
        "Existe admiração mútua pela capacidade de amar sem condições e de estar presente nos momentos importantes.",
        "A relação costuma começar de forma natural, sem jogos ou manipulações, baseada em honestidade e intenções verdadeiras.",
        "Há uma sensação de segurança desde o início, como se vocês já soubessem que podem confiar um no outro."
      ],
      compatibilidadeEmocional: [
        "Emocionalmente, este é um dos casais mais profundos e amorosos. Ambos possuem grande capacidade de empatia, cuidado e dedicação.",
        "O desafio aparece quando o excesso de responsabilidade com o outro gera perda de identidade individual. É importante lembrar que cada um é completo por si só.",
        "Aprender a amar sem se perder é a grande arte desta relação. O amor não exige sacrifício da própria essência.",
        "Cultivar interesses individuais e momentos de autocuidado fortalece a relação em vez de enfraquecê-la."
      ],
      comunicacao: [
        "A comunicação tende a ser amorosa, gentil e respeitosa. Vocês possuem facilidade para dialogar e encontrar soluções que satisfaçam ambos.",
        "O perigo está na tendência de evitar conflitos por medo de magoar o parceiro. A honestidade amorosa — dizer a verdade com carinho — é o maior presente que podem oferecer um ao outro."
      ],
      amorIntimidade: [
        "A intimidade deste casal é rica, profunda e profundamente afetiva. O amor físico é uma extensão natural do amor emocional.",
        "Vocês se sentem seguros para se abrir completamente, e essa confiança é a base de uma vida íntima satisfatória.",
        "A dedicação mútua e o cuidado constante criam um ambiente onde ambos podem ser exatamente quem são, sem máscaras.",
        "O romance se fortalece quando vocês lembram de nutrir não apenas o papel de cuidadores, mas também o de amantes."
      ],
      vidaFinanceira: [
        "O casal possui excelente potencial para construir um lar confortável e harmonioso. As decisões financeiras costumam ser tomadas pensando no bem-estar da família.",
        "Existe tendência a investir em qualidade de vida, conforto do lar e educação. O desafio está em equilibrar o que é necessário com o que é desejado.",
        "Aprender a dizer não para alguns gastos em nome de metas maiores será uma lição importante."
      ],
      desafiosKarmicos: [
        "A principal lição desta união envolve aprender a receber. Existe uma forte tendência ao sacrifício excessivo, a colocar as necessidades do outro sempre acima das próprias.",
        "O aprendizado aqui é que o amor verdadeiro é uma troca, não um fardo. Vocês precisam se permitir ser cuidados sem culpa.",
        "Cuidar de si mesmo não é egoísmo — é a condição para cuidar bem do outro."
      ],
      missaoEspiritual: [
        "O propósito deste casal é criar um legado de amor. Vocês têm o dom de transformar qualquer ambiente em um lar, de reunir pessoas e de demonstrar que o amor cotidiano é uma das forças mais poderosas que existem.",
        "Sua relação é um exemplo vivo de que é possível amar com profundidade, responsabilidade e alegria.",
        "Através do cuidado que oferecem, inspiram outras pessoas a também construir relações mais afetivas."
      ],
      potencialLongoPrazo: [
        "Esta é uma das combinações com maior potencial para relacionamentos longos, estáveis e felizes.",
        "Com o tempo, o amor entre vocês se aprofunda e se transforma em uma parceria que vai muito além do romantismo — torna-se companheirismo, respeito, cumplicidade."
      ],
      conselho: [
        "Cuidem também de si mesmos. Um amor que cuida do outro sem se esquecer de si mesmo é o amor que se mantém saudável e verdadeiro ao longo dos anos.",
        "Nutrindo a si mesmos, vocês se tornam capazes de amar ainda mais profundamente."
      ],
      mensagemFinal: [
        "Vocês foram unidos para construir um amor que seja lar. Um lugar de paz, aceitação e crescimento.",
        "Que este amor, mesmo diante dos desafios, permaneça como porto seguro para ambos."
      ]
    }
  },

  7: {
    title: "Perfil 7: A Conexão Intelectual e Profunda",
    freeText: "Este é um dos casais mais profundos e únicos. Existe entre vocês uma conexão que vai além do comum, baseada em valores, ideias e uma busca compartilhada por conhecimento. A relação tem uma qualidade introspectiva que poucos compreendem.",
    sections: {
      visaoGeral: [
        "Este é um dos casais mais profundos e singulares. A conexão entre vocês vai além do que é comum — existe uma sintonia de ideias, valores e visão de mundo.",
        "Frequentemente, pessoas com este perfil relatam a sensação de que já se conheciam antes, como se houvesse um reconhecimento profundo desde o primeiro encontro.",
        "Uma característica marcante desta relação é a necessidade de espaço para a reflexão individual. Ambos valorizam momentos de solitude e processamento interno.",
        "O que observamos é que este casal não se contenta com superficialidades. A busca por entendimento mútuo e por crescimento pessoal é uma constante."
      ],
      atracaoInicial: [
        "A atração entre vocês é singular e difícil de descrever em termos simples. Não se baseia apenas na aparência física ou em características superficiais.",
        "Existe algo mais profundo que os conecta: uma ressonância de ideias, valores e visão de mundo. Vocês se sentem compreendidos de uma forma que poucas pessoas proporcionam.",
        "Muitas vezes, o encontro acontece em circunstâncias incomuns ou em momentos de transformação pessoal. A sensação é de reconhecimento.",
        "Não é uma atração explosiva, mas sim o encontro de duas mentes que se complementam."
      ],
      compatibilidadeEmocional: [
        "Emocionalmente, esta é uma união de grande profundidade, mas também de grandes desafios. Ambos tendem à introspecção e ao processamento interno das emoções.",
        "Existe compreensão mútua de uma forma quase silenciosa, mas também o risco de criar distâncias emocionais quando um não compartilha o que sente.",
        "A chave está em criar um espaço seguro onde a vulnerabilidade seja bem-vinda. Nem sempre é fácil traduzir em palavras o que se passa por dentro, mas a prática fortalece a conexão.",
        "Lembrem-se: o outro não pode ler sua mente. Compartilhar é um ato de amor."
      ],
      comunicacao: [
        "A comunicação entre vocês pode ser extraordinária quando existe abertura. São capazes de conversar sobre temas que a maioria das pessoas jamais abordaria — filosofia, propósito, vida, conhecimento.",
        "O desafio aparece nas conversas cotidianas e emocionais. Nem sempre é fácil traduzir sentimentos em palavras, mas com paciência e prática, a comunicação se torna uma das maiores riquezas da relação."
      ],
      amorIntimidade: [
        "A intimidade desta relação possui dimensões que vão além do físico. Existe uma necessidade de se sentir verdadeiramente compreendido e aceito.",
        "Quando esse nível de profundidade é alcançado, a intimidade física torna-se uma experiência rica e significativa.",
        "O silêncio compartilhado, os olhares de cumplicidade e os momentos de reflexão juntos são formas de amor tão poderosas quanto qualquer palavra.",
        "O desafio está em não deixar que a profundidade intelectual substitua a conexão física e afetiva."
      ],
      vidaFinanceira: [
        "Financeiramente, este casal tende a não dar grande importância à riqueza material como um fim em si mesma. O que buscam é segurança suficiente para ter liberdade de explorar seus interesses.",
        "Podem prosperar em áreas ligadas ao conhecimento, pesquisa, ciência, arte ou educação.",
        "O planejamento financeiro conjunto exigirá atenção, pois a tendência ao idealismo pode afastar o foco das necessidades práticas do dia a dia."
      ],
      desafiosKarmicos: [
        "O principal desafio desta união é a tendência ao isolamento. Tanto individual quanto como casal, existe o risco de se afastarem do mundo exterior de forma excessiva.",
        "O aprendizado está em compreender que o conhecimento e a profundidade ganham ainda mais valor quando compartilhados com os outros.",
        "Outro ponto importante é aprender a lidar com as imperfeições — tanto as do parceiro quanto as suas próprias. A perfeição não é um destino realista para nenhuma relação."
      ],
      missaoEspiritual: [
        "O propósito deste casal é buscar e compartilhar sabedoria. Vocês foram unidos para crescer juntos em um nível de profundidade que poucos alcançam.",
        "Através desta relação, ambos serão convidados a confrontar suas crenças, a questionar e a se transformar.",
        "A jornada de vocês juntos é, em si mesma, um caminho de aprendizado contínuo."
      ],
      potencialLongoPrazo: [
        "Quando encontram o equilíbrio entre profundidade e leveza, esta é uma das uniões mais ricas e significativas.",
        "Com o tempo, tornam-se guardiões mútuos do crescimento um do outro. Envelhecem como companheiros que percorreram juntos um caminho extraordinário de descobertas."
      ],
      conselho: [
        "Tragam o amor para o cotidiano. A profundidade é um dom, mas o amor também se nutre de momentos simples, de risadas e de alegria compartilhada.",
        "Não deixem que a busca pelo extraordinário os faça perder o extraordinário que existe nas pequenas coisas do dia a dia."
      ],
      mensagemFinal: [
        "Vocês foram unidos para se revelar um ao outro. Cada um é o espelho mais profundo que o outro possui.",
        "Através desta relação, ambos terão a oportunidade de se conhecer de uma forma que jamais alcançariam sozinhos. Que este seja um caminho de descoberta, crescimento e amor."
      ]
    }
  },

  8: {
    title: "Perfil 8: O Poder da Realização e Conquistas",
    freeText: "Este é um casal com potencial extraordinário para realizações. Ambos possuem ambição, determinação e capacidade de transformar sonhos em realidade. Juntos, formam uma força poderosa de construção e prosperidade.",
    sections: {
      visaoGeral: [
        "Este é um casal com potencial extraordinário para realizações. Ambos possuem ambição, determinação e uma capacidade notável de transformar sonhos em realidade.",
        "Juntos, formam uma força poderosa. Não é um relacionamento de pessoas passivas — pelo contrário, há uma energia de construção e prosperidade que os acompanha.",
        "Uma característica marcante desta relação é a visão de longo prazo. Vocês não pensam apenas no presente, mas no legado que desejam construir.",
        "O que observamos é que este casal tem tudo para alcançar grandes conquistas materiais, desde que não se esqueça de cultivar também o lado afetivo da relação."
      ],
      atracaoInicial: [
        "A atração entre vocês costuma ser intensa e marcada pela admiração das capacidades um do outro. Vocês percebem no parceiro alguém com visão, determinação e ambição.",
        "Existe fascínio pela força de caráter, pela capacidade de realização e pela presença marcante que cada um possui.",
        "A relação frequentemente começa em contextos profissionais, de negócios ou em situações onde as habilidades de ambos estão em evidência.",
        "Há um reconhecimento mútuo de que encontraram alguém à altura dos seus próprios sonhos."
      ],
      compatibilidadeEmocional: [
        "Esta é a área que exige maior atenção. Ambos tendem a colocar as realizações externas acima das necessidades emocionais.",
        "O amor existe, é profundo e real, mas pode ser sufocado pelo peso das responsabilidades e da ambição. Com a correria do dia a dia, a conexão emocional pode ficar em segundo plano.",
        "Criar espaço para a vulnerabilidade, para o afeto e para o cuidado mútuo será o grande desafio — e também o maior tesouro desta relação.",
        "Reservar tempo de qualidade um para o outro não é opcional: é essencial."
      ],
      comunicacao: [
        "A comunicação tende a ser eficiente, objetiva e voltada para resultados. Vocês preferem agir a falar e costumam comunicar o amor através de atitudes concretas.",
        "O cuidado necessário está em não permitir que a eficiência substitua a intimidade. Algumas conversas precisam acontecer pelo simples prazer de se conectar, sem objetivo definido."
      ],
      amorIntimidade: [
        "A vida íntima deste casal pode ser intensa e apaixonada quando existe equilíbrio entre o lado profissional e o pessoal.",
        "O desejo e a atração permanecem fortes ao longo do tempo, mas o foco excessivo nas conquistas externas pode fazer com que a intimidade seja negligenciada.",
        "Proteger o tempo e o espaço da relação como uma prioridade absoluta é essencial para manter a conexão viva.",
        "Lembrem-se: o sucesso profissional não compensa o vazio afetivo."
      ],
      vidaFinanceira: [
        "Este é o casal com maior potencial de prosperidade material. Possuem capacidade natural para identificar oportunidades, liderar equipes e construir patrimônio.",
        "Quando trabalham juntos em direção a objetivos comuns, os resultados são impressionantes.",
        "O equilíbrio necessário está em lembrar que a riqueza é um meio, não um fim. O verdadeiro legado é construído também com amor, presença e conexão humana."
      ],
      desafiosKarmicos: [
        "O principal desafio desta união envolve o equilíbrio entre poder e amor. Existe tendência ao controle, à competitividade e à dificuldade de demonstrar vulnerabilidade.",
        "O aprendizado está em compreender que o verdadeiro poder não está na dominação, mas na capacidade de elevar o outro sem diminuir a si mesmo.",
        "As maiores lições virão dos momentos em que vocês precisarem escolher entre estar certo e estar junto."
      ],
      missaoEspiritual: [
        "O propósito deste casal é construir um legado — não apenas material, mas humano. Vocês têm a capacidade de impactar a vida de muitas pessoas através do que criam juntos.",
        "Seja através dos negócios, das oportunidades que geram ou do exemplo que oferecem, sua relação pode ser uma fonte de inspiração.",
        "Mostrem que é possível unir sucesso profissional e amor verdadeiro."
      ],
      potencialLongoPrazo: [
        "Quando encontram o equilíbrio entre ambição e afeto, esta é uma das uniões mais poderosas e duradouras.",
        "Com o tempo, constroem juntos um império que vai além das finanças — um império de histórias, conquistas compartilhadas e amor que resistiu à pressão."
      ],
      conselho: [
        "Lembrem-se regularmente do porquê escolheram um ao outro. O sucesso externo não tem sabor quando não há alguém ao lado para celebrá-lo.",
        "Invistam no relacionamento com a mesma energia e estratégia que investem nos negócios. O retorno será imensurável."
      ],
      mensagemFinal: [
        "Vocês foram unidos para construir um legado de poder e amor. Mas lembrem-se: ao final da vida, o que permanece não é o que acumularam, mas quem amaram e como amaram.",
        "Que o amor de vocês seja tão grandioso quanto as conquistas que alcançarão juntos."
      ]
    }
  },

  9: {
    title: "Perfil 9: A Conexão Humanitária e o Amor Incondicional",
    freeText: "Este é um casal que representa o amor em sua forma mais ampla e generosa. A relação é marcada pela compaixão, pela sabedoria acumulada e pela capacidade de amar de forma incondicional. Há entre vocês uma conexão que vai além do individual.",
    sections: {
      visaoGeral: [
        "Este é um casal que representa o amor em sua forma mais ampla e generosa. A relação é marcada pela compaixão, pela sabedoria e pela capacidade de amar além das condições.",
        "Quando duas pessoas se encontram neste perfil, existe entre elas uma conexão que transcende o interesse individual. Há uma compreensão profunda de que o amor é maior do que dois egos.",
        "Uma característica marcante desta relação é o desejo de contribuir com o mundo. Vocês não querem apenas ser felizes juntos — querem que a felicidade de vocês faça diferença na vida de outras pessoas.",
        "O que observamos é que este casal possui uma maturidade emocional que permite enxergar além das dificuldades cotidianas."
      ],
      atracaoInicial: [
        "A atração entre vocês possui uma qualidade difícil de explicar racionalmente. Existe um reconhecimento profundo, como se já se conhecessem de outras experiências de vida.",
        "Há compaixão, admiração pelos valores e pela forma como cada um enxerga o mundo. O interior do outro é tão atraente quanto sua aparência.",
        "O encontro costuma acontecer em momentos de transição, quando ambos estão prontos para uma transformação importante em suas vidas.",
        "Não é por acaso que vocês se encontraram neste momento específico da vida de cada um."
      ],
      compatibilidadeEmocional: [
        "A compatibilidade emocional é profunda e rica. Existe grande capacidade de compaixão, aceitação e compreensão mútua.",
        "Ambos possuem sensibilidade elevada para sentir as emoções do outro, o que cria uma conexão quase instintiva.",
        "O desafio está na tendência ao sacrifício excessivo. A generosidade desta relação, quando não equilibrada, pode gerar exaustão emocional.",
        "Lembrem-se: amar o mundo não significa esquecer de si mesmos. O equilíbrio entre dar e receber é fundamental."
      ],
      comunicacao: [
        "A comunicação tem uma qualidade elevada e filosófica. Vocês gostam de conversar sobre temas profundos e possuem visões de mundo ricas e bem fundamentadas.",
        "O cuidado necessário está em trazer a conversa também para o plano emocional e cotidiano. Nem toda comunicação precisa ser profunda — às vezes, o amor se comunica na leveza do dia a dia."
      ],
      amorIntimidade: [
        "A intimidade desta relação possui uma dimensão especial. O amor é vivido de forma intensa, mas também consciente e madura.",
        "Existe grande generosidade na expressão do afeto. Ambos se sentem amados de uma forma que vai além do físico.",
        "O desafio está em manter a chama da paixão acesa enquanto o amor se aprofunda. A intensidade emocional não precisa diminuir a paixão — elas podem coexistir.",
        "Cultivar momentos de prazer e leveza é tão importante quanto as conversas profundas."
      ],
      vidaFinanceira: [
        "Financeiramente, este casal costuma não se prender excessivamente a questões materiais. Existe uma generosidade natural que, quando não balanceada, pode gerar instabilidade.",
        "O potencial de prosperidade existe, especialmente em áreas ligadas a causas sociais, arte, saúde e educação.",
        "Aprender a valorizar a própria energia e a receber sem culpa será uma lição importante para ambos."
      ],
      desafiosKarmicos: [
        "A principal lição desta união envolve o fechamento de ciclos e a capacidade de deixar ir. Haverá momentos de transformação em que será necessário se desprender de velhos padrões.",
        "O maior aprendizado está em aprender a soltar — seja pessoas, situações ou versões antigas de si mesmos — sem carregar o peso do passado.",
        "A leveza é a chave. Não carreguem o mundo nos ombros: vocês estão juntos para tornar a jornada mais suave, não mais pesada."
      ],
      missaoEspiritual: [
        "O propósito deste casal é servir — não de forma submissa, mas através do exemplo de um amor que eleva e inspira.",
        "Vocês têm o potencial de impactar a vida de muitas pessoas através da bondade, da compaixão e da sabedoria que emanam como casal.",
        "Sua relação é, em si mesma, um presente para o mundo — mas não se esqueçam de que o primeiro presente que precisam dar é um ao outro."
      ],
      potencialLongoPrazo: [
        "Esta é uma das uniões com maior potencial de evolução ao longo do tempo. O amor de vocês tem a capacidade de se aprofundar e se transformar continuamente.",
        "Quando bem cuidada, esta relação tem tudo para ser uma das mais significativas e duradouras, marcada pelo crescimento pessoal e pela contribuição ao mundo."
      ],
      conselho: [
        "Cuidem também de si mesmos. O mundo precisa de vocês, mas primeiro vocês precisam um do outro.",
        "Antes de servir ao próximo, nutram a relação, cultivem o amor que os une e protejam esse espaço que é a vida de vocês dois juntos."
      ],
      mensagemFinal: [
        "Vocês foram unidos para mostrar que o amor é capaz de transcender o individual e tocar o coletivo.",
        "Que a história de vocês seja um exemplo de generosidade, compaixão e da beleza de amar sem medidas. Mas que nunca se esqueçam: o amor mais bonito é aquele que também cuida de si mesmo."
      ]
    }
  }
};

