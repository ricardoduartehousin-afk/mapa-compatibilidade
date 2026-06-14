// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TABELA CABALÍSTICA (CALDEIA) TRADICIONAL
// Atribui valores únicos de 1 a 8 a cada letra do alfabeto.
// Diferente da Pitagórica, a Cabalística é assimétrica e reflete
// a energia vibratória de cada símbolo individualmente.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const LETTER_MAP = {
  a: 1, i: 1, j: 1, q: 1, y: 1,
  b: 2, k: 2, r: 2,
  c: 3, g: 3, l: 3, s: 3,
  d: 4, m: 4, t: 4,
  e: 5, h: 5, n: 5, x: 5,
  u: 6, v: 6, w: 6,
  o: 7, z: 7,
  f: 8, p: 8
};

function normalizeString(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[ñ]/g, 'n')
    .replace(/[ç]/g, 'c')
    .replace(/[^a-z]/g, '');
}

function reduceNumber(num, preserveMaster = false) {
  let current = num;
  while (current > 9) {
    if (preserveMaster && (current === 11 || current === 22)) {
      return current;
    }
    const digits = current.toString().split('').map(Number);
    current = digits.reduce((acc, d) => acc + d, 0);
  }
  return current || 1;
}

export function calculateExpression(name) {
  const normalized = normalizeString(name);
  let sum = 0;
  for (const char of normalized) {
    if (LETTER_MAP[char] !== undefined) {
      sum += LETTER_MAP[char];
    }
  }
  return reduceNumber(sum, true);
}

export function calculateSoulNumber(name) {
  const normalized = normalizeString(name);
  const vogals = ['a', 'e', 'i', 'o', 'u'];
  let sum = 0;
  for (const char of normalized) {
    if (vogals.includes(char) && LETTER_MAP[char] !== undefined) {
      sum += LETTER_MAP[char];
    }
  }
  return reduceNumber(sum, true);
}

export function calculateDestiny(dateStr) {
  const numbersOnly = dateStr.replace(/\D/g, '');
  const sum = numbersOnly.split('').map(Number).reduce((acc, d) => acc + d, 0);
  return reduceNumber(sum, true);
}

export function calculateCompatibility(p1Name, p1Date, p2Name, p2Date) {
  const soul1 = calculateSoulNumber(p1Name);
  const exp1  = calculateExpression(p1Name);
  const dest1 = calculateDestiny(p1Date);

  const soul2 = calculateSoulNumber(p2Name);
  const exp2  = calculateExpression(p2Name);
  const dest2 = calculateDestiny(p2Date);

  const reducedSoul1 = soul1 > 9 ? reduceNumber(soul1, false) : soul1;
  const reducedExp1  = exp1  > 9 ? reduceNumber(exp1,  false) : exp1;
  const reducedSoul2 = soul2 > 9 ? reduceNumber(soul2, false) : soul2;
  const reducedExp2  = exp2  > 9 ? reduceNumber(exp2,  false) : exp2;
  const reducedDest1 = dest1 > 9 ? reduceNumber(dest1, false) : dest1;
  const reducedDest2 = dest2 > 9 ? reduceNumber(dest2, false) : dest2;

  const totalSum = reducedSoul1 + reducedExp1 + reducedDest1
                 + reducedSoul2 + reducedExp2 + reducedDest2;

  const finalNumber = reduceNumber(totalSum, false);

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
// RELATÓRIOS COMPLETOS — Expansão Psicológica e Comportamental
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const REPORTS = {
  1: {
    title: "Dinâmica 1: Liderança, Independência e Crescimento Contínuo",
    freeText: "A Dinâmica 1 representa a união de duas forças autônomas. Vocês não se uniram por dependência, mas por uma profunda admiração pela capacidade de realização um do outro. A relação é pautada no incentivo contínuo e na ausência de comodismo.",
    sections: {
      visaoGeral: [
        "A dinâmica do casal 1 é estruturada sobre o respeito mútuo à individualidade. Na psicologia dos relacionamentos, costuma-se dizer que casais saudáveis são formados por dois 'inteiros', e esta união reflete exatamente isso. Vocês não se veem como 'metades da laranja'; enxergam a parceria como a soma de duas potências.",
        "Uma das características mais fortes dessa relação é o movimento. Não existe muito espaço para a inércia ou para a estagnação. Se um dos parceiros resolve estacionar na vida profissional, pessoal ou emocional, o outro sentirá uma inquietação imediata. Há um empurrão mútuo (às vezes sutil, às vezes direto) para que ambos atinjam suas melhores versões.",
        "Existe também um forte componente de liderança. Vocês tendem a assumir a frente dos problemas quando eles surgem. Isso faz de vocês uma equipe imbatível contra desafios externos, mas pode se tornar um problema quando a disputa por quem 'está no comando' acontece dentro de casa.",
        "O sucesso desta união baseia-se na capacidade de alternar o poder. Um relacionamento sustentável para esse perfil exige que ambos sintam orgulho das vitórias do parceiro, sem cair na armadilha da competição conjugal."
      ],
      atracaoInicial: [
        "A atração inicial entre vocês raramente nasceu de vulnerabilidade ou necessidade de resgate. Na verdade, foi o magnetismo da autossuficiência que chamou a atenção. Vocês se interessaram pela postura de quem sabe o que quer e não tem medo de ir atrás.",
        "O flerte nessa dinâmica frequentemente envolveu certo desafio intelectual e demonstrações sutis de competência. Vocês admiraram a inteligência, a ambição ou a postura decidida um do outro logo nos primeiros contatos.",
        "Diferente de casais que se fundem imediatamente e perdem a identidade no começo do namoro, vocês mantiveram o senso de individualidade, o que só fez o interesse aumentar. A química aqui nasce do respeito."
      ],
      compatibilidadeEmocional: [
        "No aspecto emocional, a compatibilidade de vocês depende muito do espaço pessoal. Vocês precisam de oxigênio emocional para respirar. Ciúmes exagerados, cobranças por atenção em tempo integral ou tentativas de controle são recebidos como sinais de alerta vermelhos por essa dinâmica.",
        "Isso não significa que o amor seja frio. Pelo contrário: a demonstração de afeto é forte, protetora e extremamente leal. Porém, o amor de vocês é expresso através do respeito, de ações práticas e do encorajamento. Dizer 'eu acredito no seu potencial' é, para vocês, uma das mais profundas declarações de amor.",
        "A fraqueza emocional dessa união pode ser a dificuldade de demonstrar vulnerabilidade. Como ambos valorizam a imagem de força, confessar medo, insegurança ou tristeza pode ser um tabu doloroso. O casal ganha uma nova camada de intimidade quando ambos aprendem que chorar no ombro do outro não diminui o valor de nenhum dos dois."
      ],
      comunicacao: [
        "A comunicação entre vocês é caracterizada pela objetividade e, em grande parte, pela franqueza. Se há um problema, a tendência é colocá-lo sobre a mesa e dissecá-lo até encontrar uma solução tática.",
        "Essa clareza é maravilhosa para a vida prática, mas nas questões emocionais, a objetividade excessiva pode ferir. Se um de vocês precisa apenas de validação emocional ('estou me sentindo frustrado hoje'), e o outro responde imediatamente com uma lista de três passos lógicos para resolver o problema, a comunicação falha.",
        "O aprendizado aqui é a 'escuta ativa e empática', em oposição à 'escuta resolutiva'. Muitas vezes, o outro não quer que você resolva o problema dele; ele quer apenas que você ouça e compreenda o que ele sente."
      ],
      amorIntimidade: [
        "A intimidade de vocês é ativa, física e vibrante. A paixão costuma se manter alta na mesma proporção em que a admiração intelectual e profissional se mantém. Para vocês, ver o parceiro no seu melhor (seja fechando um negócio, seja brilhando em seu hobby) é um forte afrodisíaco.",
        "Contudo, a rotina esmagadora e o excesso de responsabilidades que ambos costumam assumir podem transformar o quarto em uma extensão do escritório ou apenas um local para dormir. Vocês precisam de momentos em que os 'crachás' de resolução de problemas fiquem do lado de fora.",
        "O flerte diário não pode morrer. Lembrar de conquistar o outro, mesmo após anos de união, é o que garante a saúde amorosa dessa dupla."
      ],
      vidaFinanceira: [
        "Este é, sem dúvida, um dos casais com maior potencial financeiro e patrimonial. Ambos possuem energia de sobra para o trabalho e visão de futuro. Vocês não se contentam com o básico e têm a ambição necessária para criar um padrão de vida muito confortável.",
        "A gestão financeira, porém, pode ser um campo de batalha caso não haja transparência total e divisão de territórios. Como ambos gostam de ter o controle das rédeas, é crucial que definam claramente como o dinheiro será gerido (contas conjuntas vs. separadas, limites de investimentos de risco, etc.)."
      ],
      diaADia: [
        "Na rotina diária, vocês são um casal 'fazedores'. As manhãs costumam ter um ritmo rápido. Vocês apreciam ter suas próprias agendas e não fazem questão de passar 24 horas por dia grudados. A independência é visível até na forma como gerenciam a casa.",
        "Quando se trata de lazer, vocês não são os típicos caseiros que passam o fim de semana inteiro assistindo séries (embora gostem disso em doses limitadas). Viagens ativas, esportes, jantares em locais interessantes e atividades que exijam certa energia são mais a cara de vocês.",
        "A divisão de tarefas domésticas funciona melhor quando está clara e setorizada. Se houver sobreposição, pode haver conflito de microgerenciamento ('não é assim que se arruma isso'). Se cada um tiver a sua 'área de responsabilidade', o dia a dia flui com perfeição."
      ],
      conflitos: [
        "Os gatilhos mais comuns para brigas na Dinâmica 1 envolvem a percepção de desrespeito à autoridade ou à autonomia de um dos parceiros. Microgerenciamento, tentativas de controle de agenda, e conselhos não solicitados são altamente inflamáveis.",
        "Durante um atrito, a discussão tende a subir de temperatura rapidamente. Como ambos são argumentativos, os conflitos podem se parecer com debates judiciais onde cada um tenta provar irrefutavelmente que está certo.",
        "A parte crítica dessa relação surge quando os dois decidem não ceder por mero orgulho. O orgulho é o veneno número um deste perfil. Vocês precisam lembrar que num relacionamento não há como um ganhar e o outro perder. Se um de vocês sai da briga humilhado ou silenciado, os dois perderam a conexão."
      ],
      pontosCegos: [
        "O ponto cego mais perigoso desta união é o isolamento em dupla. Como vocês são muito autossuficientes, podem criar uma dinâmica de 'nós contra o mundo', esquecendo de nutrir amizades ou de pedir conselhos externos quando a relação trava.",
        "Além disso, a obsessão pelo crescimento contínuo pode levar ao 'burnout conjugal'. Vocês podem esquecer como descansar e como apenas 'existir' na presença um do outro sem precisar produzir nada de útil."
      ],
      crescimento: [
        "O propósito comportamental desta união é demonstrar que a individualidade não precisa morrer para que um casal exista. Vocês ensinam as pessoas ao redor (amigos, filhos) o valor da autonomia aliada à parceria ética.",
        "O crescimento real ocorre quando vocês aprendem a liderar juntos: quando a voz de um é o complemento perfeito para a estratégia do outro, formando uma força indomável."
      ],
      potencialLongoPrazo: [
        "O potencial de sobrevivência desta união a longo prazo é altíssimo, desde que o egoísmo seja trocado pela mentalidade de equipe. Vocês nunca se cansarão um do outro se continuarem a evoluir pessoalmente.",
        "É o tipo de relacionamento onde, aos 70 anos, vocês olharão para o império (material ou familiar) que construíram e terão um profundo respeito por cada tijolo que assentaram juntos."
      ],
      conselho: [
        "Dê espaço ao outro. Se o seu parceiro estiver enfrentando um problema, pergunte 'como posso te apoiar?' em vez de tentar resolver a questão por ele. Lembre-se que vulnerabilidade é a chave para a intimidade real.",
        "E o mais importante: reservem momentos onde o único objetivo seja não fazer absolutamente nada juntos."
      ],
      mensagemFinal: [
        "Vocês formam uma parceria de águias. Têm visão, força e altitude. Mantenham o respeito intacto, nunca subestimem a força do orgulho e continuem encorajando o voo um do outro. O céu é de vocês."
      ]
    }
  },
  2: {
    title: "Dinâmica 2: Sensibilidade, Parceria e Refúgio Emocional",
    freeText: "A Dinâmica 2 representa uma profunda conexão empática. Vocês são um porto seguro mútuo num mundo agitado. A relação é pautada no cuidado, na escuta ativa e num nível de companheirismo extremamente raro.",
    sections: {
      visaoGeral: [
        "Na psicologia, chamamos este tipo de conexão de 'vínculo seguro focado'. A dinâmica do casal 2 é construída primariamente sobre a empatia. Há uma sensibilidade natural na forma como vocês se percebem. Frequentemente, não é necessário o uso de palavras; uma simples mudança no olhar ou na postura é suficiente para que um saiba que o outro teve um dia ruim.",
        "Este não é um casal cujo centro de gravidade está fora (no trabalho, na ambição desenfreada); o centro de gravidade está no 'nós'. A relação possui um caráter de ninho, de abrigo. Vocês se protegem ativamente das agressividades do mundo exterior.",
        "Uma característica marcante é a pacificação. A energia da relação é suave. Vocês preferem abrir mão de terem razão em favor de manterem a harmonia do ambiente. Esse nível de cooperação torna a convivência excepcionalmente doce, mas traz o risco de camuflar insatisfações em nome da 'paz a qualquer custo'.",
        "O sucesso desta união depende da capacidade de vocês normalizarem o conflito. Compreender que discordar não significa desamar é a chave para o amadurecimento emocional profundo dessa dinâmica."
      ],
      atracaoInicial: [
        "A atração de vocês provavelmente não começou com jogos de sedução agressivos ou exibições de ego. Ela nasceu do conforto. Desde o primeiro momento, algo no outro pareceu familiar, acolhedor e surpreendentemente seguro.",
        "A química inicial baseou-se na capacidade de escuta mútua. Vocês provavelmente passaram horas conversando sobre medos, sonhos e vulnerabilidades muito antes de consolidarem o relacionamento em outros níveis.",
        "O interesse mútuo floresceu na percepção de que 'aqui eu não preciso fingir ser forte o tempo todo'. A atração foi a promessa de descanso e de pertencimento real."
      ],
      compatibilidadeEmocional: [
        "Este é, emocionalmente, o núcleo mais compatível possível. A empatia que permeia a união faz com que exista validação constante dos sentimentos de ambos. Vocês são aquele casal que se abraça apertado sem motivo aparente.",
        "A fraqueza dessa altíssima conexão emocional é a tendência à simbiose (ou codependência). Se um está triste, o outro inevitavelmente afunda junto. A linha que separa 'eu' de 'você' pode se tornar tão fina que a individualidade corre risco de desaparecer.",
        "O maior ganho de compatibilidade acontecerá quando vocês aprenderem a diferenciação emocional: a habilidade de ser extremamente próximo ao parceiro, de oferecer suporte, mas não assumir para si a dor ou a angústia que pertence apenas a ele. Essa blindagem empática salvará vocês do esgotamento."
      ],
      comunicacao: [
        "A comunicação na Dinâmica 2 é rica em sutilezas. Vocês se preocupam genuinamente em não ferir o outro. Palavras são escolhidas com cuidado, o tom de voz costuma ser equilibrado e há muito espaço para a expressão de carinho.",
        "O perigo se encontra no que não é dito. Por pavor de magoar o parceiro ou de iniciar uma briga, vocês podem adotar o hábito nefasto da evitação. Um engole um comportamento que o desagrada, depois o outro engole uma falha, e o silêncio se torna pesado de coisas não ditas.",
        "O aprendizado fundamental de comunicação para vocês é a 'franqueza compassiva'. Aprender a colocar o desconforto na mesa de forma madura. Dizer a verdade com amor é a mais alta forma de diplomacia."
      ],
      amorIntimidade: [
        "A intimidade entre vocês é pautada na conexão afetiva absoluta. Para este perfil de casal, não existe intimidade física satisfatória sem que o terreno emocional esteja perfeitamente afofado. O toque é carinhoso, presente e carrega muito significado.",
        "O romantismo não é um evento de aniversário, é algo orgânico no cotidiano (um café levado na cama, um bilhete, o simples andar de mãos dadas).",
        "A manutenção da paixão exige apenas que não caiam numa rotina puramente 'fraternal'. Como vocês se tornam muito amigos, quase irmãos de alma, é necessário apimentar o cotidiano com saídas, surpresas e momentos voltados apenas à polaridade romântica e sexual."
      ],
      vidaFinanceira: [
        "Financeiramente, vocês preferem a segurança ao risco desmedido. As decisões são tomadas sempre em conjunto, priorizando o conforto do lar, a segurança no longo prazo e o bem-estar familiar.",
        "Podem, contudo, hesitar excessivamente diante de oportunidades de investimento ou mudanças profissionais por medo de desestabilizarem a paz do momento. Um pouco de arrojo e de planejamento para além do básico pode trazer grandes benefícios materiais."
      ],
      diaADia: [
        "O estilo de vida de vocês é altamente focado na harmonia e no conforto. Se o mundo lá fora é guerra, a casa de vocês precisa ser um templo de paz. A decoração, a comida, a organização... tudo visa o conforto e o acolhimento.",
        "Na rotina, preferem muito mais programas íntimos (assistir séries sob o cobertor, jantares caseiros, receber poucos e bons amigos) do que eventos barulhentos ou badalação. Viagens para locais tranquilos e de contato com a natureza ou com profundo apelo romântico são as favoritas.",
        "A divisão de tarefas domésticas é geralmente feita de forma justa, pois ambos não suportam ver o parceiro sobrecarregado. O cuidado contínuo pelo ambiente físico reflete o cuidado mental."
      ],
      conflitos: [
        "As brigas, quando ocorrem, raramente envolvem gritaria. O conflito nesta dinâmica costuma se manifestar através de mágoas silenciosas, passividade-agressividade ou distanciamento frio. Vocês tendem a se recolher quando feridos.",
        "O gatilho principal das brigas é a percepção de negligência emocional. Sentir que o parceiro não percebeu seu esforço ou não validou seu cansaço gera feridas profundas.",
        "A parte crítica é a dificuldade de virar a página. Por serem sensíveis, pequenas dores podem gerar um banco de ressentimentos. Vocês têm uma memória de elefante para o que machuca. Para limpar isso, o pedido de desculpas precisa vir acompanhado de mudança comportamental visível."
      ],
      pontosCegos: [
        "O ponto cego principal é o sacrifício da própria voz em nome do relacionamento. Um de vocês (ou ambos) pode abrir mão sistematicamente dos seus hobbys, amizades e projetos pessoais só para ficar mais tempo com o parceiro ou evitar chateações.",
        "Com o passar dos anos, essa anulação gera uma crise de identidade ('quem eu sou sem você?'). Manter uma fatia da sua vida apenas sua é essencial para a saúde a longo prazo."
      ],
      crescimento: [
        "O propósito comportamental desta união é manifestar o amor na sua forma mais pura e cuidadosa. Vocês ensinam empatia ao mundo.",
        "O crescimento absoluto acontece quando o casal percebe que a força e a doçura podem andar de mãos dadas. Quando vocês se tornam fortes não apenas para aguentar o mundo, mas seguros o suficiente para suportar a discordância sem sentir que a relação acabou."
      ],
      potencialLongoPrazo: [
        "Excepcionalmente alto. Vocês têm as bases exatas que geriatras e psicólogos encontram em casais que chegam felizes aos casamentos de ouro.",
        "A confiança emocional e o nível de entrelaçamento da vida cotidiana fazem de vocês parceiros para a eternidade, desde que aprendam a não acumular poeira debaixo do tapete."
      ],
      conselho: [
        "A paz forçada é apenas uma guerra sendo adiada. Acostumem-se a ter conversas desconfortáveis com regularidade. Tragam as pequenas insatisfações à luz imediatamente antes que se tornem amarguras.",
        "Protejam suas individualidades. O relacionamento fica muito mais interessante quando cada um tem novidades para contar no fim do dia."
      ],
      mensagemFinal: [
        "O nível de cuidado que vocês oferecem um ao outro é um antídoto para a dureza da vida moderna. Continuem protegendo essa sensibilidade, mas vistam também uma armadura de maturidade para que a relação nunca lhes custe a própria identidade."
      ]
    }
  },
  3: {
    title: "Dinâmica 3: Comunicação, Brilho e Entusiasmo Compartilhado",
    freeText: "A Dinâmica 3 representa um casal radiante. Vocês se uniram pelo entusiasmo, pelo fascínio intelectual e pela alegria contagiante. É uma relação alicerçada no diálogo interminável e na recusa em levar uma vida monótona ou descolorida.",
    sections: {
      visaoGeral: [
        "Do ponto de vista comportamental, este é o casal das infinitas possibilidades. O padrão primário da Dinâmica 3 é a extroversão e o constante estímulo. A relação atua como uma usina de criatividade. Vocês não param de falar, não param de pensar em projetos (mesmo que nunca os executem) e possuem uma habilidade singular de ver o lado positivo das coisas.",
        "Uma característica fundamental é que a amizade é tão importante quanto o romance. Vocês são verdadeiramente 'melhores amigos'. Gostam da companhia do outro para coisas banais simplesmente porque qualquer ida ao mercado com o parceiro se torna divertida ou acaba em alguma boa história.",
        "A comunicação é o pilar de sustentação e, ao mesmo tempo, a maior área de risco. O volume de informações trocadas é imenso. Vocês debatem desde filosofia abstrata até o roteiro da série com o mesmo fervor.",
        "A sombra dessa dinâmica, no entanto, é o excesso de estímulos que mascara a superficialidade. Vocês podem usar o riso e a diversão como mecanismo de fuga sistemática para não enfrentarem as camadas mais densas e difíceis da vida a dois. O sucesso a longo prazo depende de conseguirem equilibrar o riso com a profundidade emocional realista."
      ],
      atracaoInicial: [
        "O que chamou a atenção no início não foi o físico ou o status; foi o repertório. A atração nasceu da faísca intelectual. Uma resposta espirituosa, uma observação sagaz ou o fato de compartilharem referências e um humor muito peculiar e veloz.",
        "O flerte de vocês foi dominado por trocas verbais, mensagens cheias de química e uma curiosidade magnética. A sensação nos primeiros meses era a de ter encontrado alguém que falava exatamente o mesmo idioma do seu cérebro.",
        "O riso foi a grande cola inicial. Quem faz o outro rir de forma sincera consegue derrubar qualquer defesa emocional."
      ],
      compatibilidadeEmocional: [
        "A compatibilidade emocional de vocês é alta no que diz respeito ao companheirismo e à leveza. Nenhum de vocês gosta de pessoas que arrastam correntes ou se vitimizam continuamente. Vocês apoiam o parceiro sendo animadores de torcida.",
        "Contudo, a grande prova de fogo emocional acontece quando a vida perde a graça. Diante de lutos, crises financeiras graves ou depressões pontuais, essa dinâmica pode entrar em colapso se não aprender a lidar com o silêncio e o peso. Como o natural do casal é a alegria, o sofrimento do outro pode gerar uma sensação de impotência profunda ou uma tentativa desesperada de 'animar' o parceiro em um momento onde ele só precisava chorar acompanhado.",
        "Saber ficar confortavelmente no escuro com o outro, segurando a barra sem tentar apressar o processo de cura, é a maturidade máxima dessa união."
      ],
      comunicacao: [
        "A fluência verbal de vocês é fenomenal. Essa é a ferramenta de ouro do casal. Vocês negociam os termos do relacionamento verbalizando as necessidades claramente.",
        "O lado negro dessa fluência é a ironia e o sarcasmo. Em momentos de irritação, em vez de agressões brutas, vocês podem usar palavras precisas e afiadas como bisturis para ferir o parceiro. A agressão passiva disfarçada de 'piada' é um comportamento altamente tóxico que deve ser eliminado por vocês.",
        "Outro cuidado de comunicação é não usar o dom da palavra para enrolar o outro em discussões, saindo ilesos apenas porque têm uma retórica melhor. Honestidade vale mais que argumentação."
      ],
      amorIntimidade: [
        "A vida íntima é lúdica, exploratória e, assim como todo o resto, baseada em comunicação. O estímulo mental (falar o que sente, o que quer, as fantasias) costuma ser o grande catalisador da excitação física.",
        "A paixão requer novidade. A rotina sexual estritamente programada é o pior inimigo desse casal. Vocês precisam de elementos de surpresa, quebra de padrões e, claro, romance alegre.",
        "A manutenção da intimidade depende intrinsecamente do estado de amizade. Se a amizade esfria por mágoas, o desejo sexual entre vocês costuma evaporar junto."
      ],
      vidaFinanceira: [
        "Dois perfis altamente criativos juntos têm a fórmula perfeita para gerar oportunidades de negócios, contatos e renda. Vocês são 'vendáveis' e costumam construir redes de networking formidáveis.",
        "O desafio financeiro da Dinâmica 3 é puramente o foco e a disciplina. Vocês podem tender à dispersão: começam projetos incríveis mas abandonam antes da colheita porque uma nova ideia pareceu mais atrativa. O uso indiscriminado do dinheiro para o prazer imediato (viagens não planejadas, excesso de saídas) requer, urgentemente, o estabelecimento de um orçamento básico."
      ],
      diaADia: [
        "Na rotina, a estagnação é o inimigo público número um. O dia a dia de vocês raramente é monótono e programado na ponta do lápis. Existe sempre um espaço para o improviso.",
        "O estilo de vida do casal reflete extroversão. Preferem ter a agenda cheia. Sair para comer, frequentar eventos culturais, viagens curtas de fim de semana, socializar com diferentes grupos de amigos. A casa de vocês costuma ser o ponto de encontro da turma e possui uma energia 'viva'.",
        "A dificuldade de rotina aparece nas questões entediantes de administração da casa (limpeza, contas a pagar, burocracias). Muitas vezes o casal deixa tudo para a última hora. Definir dias fixos para a 'administração burocrática da vida' evitará pequenas crises."
      ],
      conflitos: [
        "As brigas entre vocês escalam verbalmente de forma rápida, e a inteligência de ambos faz com que não faltem argumentos. O gatilho costuma ser a percepção de que o outro não está ouvindo, está sendo teimoso, ou está invalidando a sua ideia.",
        "O lado negativo dos conflitos é que vocês podem usar manobras de distração na fala para não admitir que erraram, ou podem adotar posturas infantis e birrentas. Muitas vezes a briga termina com os dois exaustos mentalmente por terem argumentado durante 4 horas seguidas sobre detalhes mínimos.",
        "A solução é a objetividade no atrito. Foco no problema primário e suspensão total do uso do sarcasmo ou ironia quando os nervos estão à flor da pele."
      ],
      pontosCegos: [
        "O ponto cego crítico deste relacionamento é a imaturidade diante de temas que exigem persistência árida. Evitar encarar dívidas, evitar sentar para planejar o futuro financeiro ou evitar colocar um ponto final em padrões prejudiciais usando o bom humor como desculpa.",
        "Outro risco severo é a dispersão energética. Querer viver tudo ao mesmo tempo pode resultar em não construir nada de sólido e profundo, vivendo sempre no limite do esgotamento superficial."
      ],
      crescimento: [
        "O propósito comportamental desta união é ser um farol de alegria, inovação e pensamento ágil para as pessoas ao redor. Vocês são criadores natos.",
        "O crescimento acontece quando o casal une a criatividade e a amizade inabalável que possuem à disciplina e à profundidade emocional. Rir juntos nas tempestades não como negação do problema, mas como resiliência madura."
      ],
      potencialLongoPrazo: [
        "Muito favorável, especialmente porque a amizade intelectual e o fascínio tendem a não envelhecer com o corpo físico.",
        "Se conseguirem suportar a monotonia das fases onde a vida não é nada brilhante, chegarão à velhice como aquele casal jovial de 80 anos que ainda prega peças um no outro."
      ],
      conselho: [
        "Desenvolvam âncoras de rotina para que o relacionamento não fique flutuando no ar o tempo todo. Tenham responsabilidades inegociáveis um com o outro.",
        "Lembrem-se que nem toda crise se resolve na mesma noite com uma boa argumentação. Às vezes, as emoções apenas precisam do tempo lento do relógio para decantarem. Respeitem o silêncio."
      ],
      mensagemFinal: [
        "Vocês possuem uma sintonia mental brilhante e a vida do lado de vocês não é para quem tem coração fraco. Mantenham o humor como pilar de luz, mas não tenham medo de descer as escadas da intimidade profunda e, por vezes, silenciosa. Vocês são o par perfeito para escreverem juntos a mais cativante das histórias."
      ]
    }
  },
  4: {
    title: "Dinâmica 4: Construção, Estabilidade e Valores Inegociáveis",
    freeText: "A Dinâmica 4 representa os construtores de legados. A relação de vocês não vive de momentos efêmeros de empolgação emocional; ela se sustenta sobre bases reais, pragmatismo brutal e dedicação. É uma união projetada estruturalmente para resistir aos piores invernos.",
    sections: {
      visaoGeral: [
        "O padrão comportamental que define o Casal 4 é a segurança e o método. Em uma época de amores líquidos e relações descartáveis, vocês representam uma rocha sólida. Psicologicamente, a relação se pauta pela previsibilidade e pela confiança mútua irrestrita. Não há muito espaço para a ambiguidade. Quando vocês decidem estar juntos, é um compromisso assumido com todas as letras.",
        "A visão de futuro de vocês costuma ser muito convergente. Construir patrimônio, estabelecer uma moradia fixa, organizar a vida familiar, garantir aposentadoria e proteger quem se ama. A gestão do dia a dia é levada a sério.",
        "Embora essa estrutura forneça a mais valiosa de todas as moedas — a paz de espírito — ela abriga também o maior perigo: a estagnação sistêmica pela rotina excessiva. O relacionamento pode tornar-se uma espécie de 'S.A.' (Sociedade Anônima), onde o casamento funciona primorosamente bem na gestão de contas e obrigações, mas atrofia a paixão pelo excesso de deveres.",
        "O desafio existencial do casal é agendar, paradoxalmente, a flexibilidade e o lúdico. Aprender a quebrar regras de vez em quando."
      ],
      atracaoInicial: [
        "Vocês não se atraíram por histórias mirabolantes ou promessas vãs. A atração nasceu da percepção de estabilidade, caráter e solidez no outro. Alguém em quem se podia confiar.",
        "O processo de namoro raramente foi explosivo. Pode ter começado com cautela, observando se os valores batiam, se os planos de futuro eram alinhados e, principalmente, se o discurso do parceiro era comprovado pelas suas atitudes reais ao longo do tempo.",
        "A química entre vocês é ancorada no respeito. Sentir que o outro 'tem os pés no chão' foi o gatilho magnético primordial."
      ],
      compatibilidadeEmocional: [
        "A compatibilidade emocional reside na lealdade férrea. Uma vez que o casal cria seus laços, a dedicação é extrema. Em caso de doenças, desemprego ou crises severas externas, vocês fecham as portas e atuam como uma frente unida imbatível. A sensação de 'estou seguro com essa pessoa' nutre o emocional.",
        "A vulnerabilidade desta união é o bloqueio expressivo. Pessoas neste perfil sentem as emoções de maneira profunda, mas possuem uma barreira considerável para falar sobre as coisas do coração. Podem se fechar longamente quando magoados, optando pelo silêncio ou por enterrar-se no trabalho.",
        "A maturidade dessa união exige a criação de rituais semanais para apenas conversar sobre 'como você se sentiu nesta semana', desarmando o lado racional e obrigando-se a visitar o terreno emocional."
      ],
      comunicacao: [
        "A comunicação na Dinâmica 4 é altamente eficaz no que diz respeito às tarefas, cronogramas e responsabilidades vitais. Não há rodeios ou duplos sentidos. O que é dito, é feito.",
        "A armadilha na comunicação surge quando a linguagem corporativa e diretiva é trazida para a intimidade afetiva. Tratar as pequenas falhas do parceiro como se ele fosse um subordinado que não entregou um relatório, ou cobrar atitudes amorosas com tom de imposição legal. A inflexibilidade na fala endurece a relação.",
        "Desenvolver um vocabulário que inclua validação empática ('eu entendo o seu ponto e aprecio o que você fez, mas gostaria de tentar de outro modo') será revolucionário para a ternura na comunicação."
      ],
      amorIntimidade: [
        "O amor deste casal é devotado. É o clássico amor demonstrado pelo serviço. 'Eu arrumei seu pneu', 'Paguei o seu IPVA para você não se preocupar', 'Preparei a sua marmita'. Atitudes substituem as palavras poéticas.",
        "A intimidade sexual acompanha o nível de segurança mental e exaustão física do casal. Como vocês tendem a assumir cargas pesadas de responsabilidades de vida e trabalho, o grande limitador do romance não é a falta de amor, mas o puro cansaço de fim do dia.",
        "É imperativo que a intimidade e as preliminares sejam priorizadas. Para este casal, tirar um fim de semana de folga das responsabilidades apenas para recarregar a bateria a dois, esquecendo que o mundo real existe lá fora, é questão de sobrevivência íntima."
      ],
      vidaFinanceira: [
        "É aqui que vocês brilham de forma absoluta. O planejamento e a consistência geram a capacidade de acumular riqueza substancial a longo prazo. O foco em tijolos concretos (seja patrimônio físico, investimentos estáveis ou previdência) é um pilar da união.",
        "A zona de conflito surge apenas se um dos parceiros começar a desrespeitar os acordos orçamentários, ou no extremo oposto, se a ânsia pela estabilidade futura os impedir de usufruir um mínimo do dinheiro no presente, gerando uma privação mesquinha. O equilíbrio entre guardar e viver deve ser a regra."
      ],
      diaADia: [
        "A rotina de vocês é tão bem orquestrada quanto um relógio suíço. Cada um sabe as suas responsabilidades diárias, e o senso de dever de ambos faz a máquina da casa e do trabalho girar perfeitamente.",
        "No estilo de vida, vocês valorizam programas previsíveis e de alta qualidade. Gostam da sua casa, do seu conforto, daquele restaurante onde já sabem que o serviço é excelente e não terão surpresas desagradáveis. Não são o perfil de jogar mochilas nas costas para dormir no chão em nome da aventura.",
        "O peso do dia a dia está na ausência de espontaneidade. Quando as semanas e os meses se tornam idênticos e o foco na 'produtividade' e no 'dever' dita todas as horas do dia, a relação fica seca."
      ],
      conflitos: [
        "Os gatilhos para as brigas envolvem percepções de irresponsabilidade, mudanças de planos em cima da hora que desestruturam a rotina, quebra de acordos ou quando um sente que está carregando as pedras da casa sozinho.",
        "Nos embates, a postura costuma ser reativa e muito racionalista. Ambos apresentam o seu conjunto de 'provas' da discussão, raramente admitindo culpa. O silêncio punitivo ('tratamento de gelo') e o distanciamento físico são comuns quando não há acordo.",
        "A parte mais crítica dessa relação é o perigo de a inflexibilidade gerar o congelamento da união. Vocês precisam quebrar a teimosia lembrando do objetivo principal: não é vencer a briga, é fazer o relacionamento funcionar novamente."
      ],
      pontosCegos: [
        "O principal ponto cego é acreditar que as planilhas financeiras e as tarefas domésticas resolvidas representam um casamento saudável. Um casamento seguro e estruturado não significa um casamento preenchido de vitalidade emocional.",
        "Outro risco severo é o enrijecimento. A dificuldade pavorosa de se adaptar quando a vida traz variáveis incontroláveis (desemprego, perdas, mudanças de país) que quebram o planejamento que fizeram."
      ],
      crescimento: [
        "O propósito comportamental deste relacionamento é servir de fundação na vida das pessoas ao redor. Vocês serão frequentemente chamados a amparar familiares e amigos, e a sua união cria a estrutura para um legado geracional impecável.",
        "O crescimento acontece de forma bela quando o casal, tendo garantido os alicerces, se dá permissão incondicional para ser flexível e aproveitar as colheitas do seu duro trabalho sem nenhuma culpa."
      ],
      potencialLongoPrazo: [
        "É a dinâmica com um dos mais altos potenciais de durabilidade, quase inquebrável, visto que o compromisso de vocês com a instituição familiar é levado muito a sério.",
        "Se regarem a união com os fertilizantes do afeto diário, da leveza de um vinho sem hora marcada e de férias relaxantes longe do controle de tudo, estarão juntos e sólidos até o último capítulo."
      ],
      conselho: [
        "Cultivem a doçura e a vulnerabilidade. Lembrem-se que vocês não são sócios de uma empresa, são parceiros amorosos de vida. Demonstrem o amor em palavras e carinhos sem nenhum motivo prático.",
        "Forcem-se a sair da zona de conforto rotineira e abracem a surpresa com mais naturalidade."
      ],
      mensagemFinal: [
        "Poucos no mundo conseguem a consistência e o respeito absoluto que vocês possuem. Essa união é uma construção majestosa; mas não esqueçam que até os prédios mais fortes precisam de decorações belas e luz nas janelas. Enfeitem a vida de vocês com romantismo e flexibilidade, e terão o melhor de todos os mundos possíveis."
      ]
    }
  },
  5: {
    title: "Dinâmica 5: Movimento, Aventura e Libertação das Amarras",
    freeText: "A Dinâmica 5 representa um casal cujo código interno é a experimentação. Vocês foram unidos não para fincar raízes profundas no mesmo lugar pela eternidade, mas para caminharem e descobrirem o mundo juntos. O pior pesadelo desta união seria uma rotina burocrática.",
    sections: {
      visaoGeral: [
        "O perfil psicológico desta relação é fortemente marcado pela busca constante de dopamina emocional e estímulo. É o casal que se reconfigura constantemente. Vocês abominam o controle; não funcionam com regras rígidas de casamento tradicionais. A autonomia e a necessidade de sentir o vento no rosto são a base de ambos.",
        "Esta é uma dinâmica magnética. A química é palpável e a capacidade de adaptação às intempéries da vida é formidável. Quando perdem algo material, quando um é demitido ou precisam mudar de cidade repentinamente, vocês simplesmente enxergam nisso uma nova oportunidade. A resiliência pela flexibilidade é o maior poder de vocês.",
        "No entanto, o risco central da Dinâmica 5 é a síndrome da perna inquieta relacional. A aversão ao tédio pode sabotar fases do relacionamento que necessitam da estabilidade madura e da monotonia (como a construção patrimonial lenta e contínua). Se não há fogo queimando todo dia, pode surgir a sensação equivocada de que o amor acabou.",
        "Para que essa paixão frenética não imploda a longo prazo, o casal precisará dominar a arte de criar âncoras na liberdade. Descobrir que construir consistência em projetos paralelos pode ser tão excitante quanto a novidade."
      ],
      atracaoInicial: [
        "A atração inicial, como uma explosão num filme, foi baseada na eletricidade e no mistério. Vocês viram um no outro aquele espírito livre que pouca gente ousa assumir.",
        "Provavelmente houve uma forte carga sexual e uma conexão intelectual rápida focada nas visões nada ortodoxas do mundo e de relacionamento.",
        "A química floresceu sobre a promessa implícita: 'Nós não precisamos nos algemar um ao outro, e exatamente por isso queremos ficar perto'. Uma união não aprisionadora gerou um desejo profundo de entrega."
      ],
      compatibilidadeEmocional: [
        "Emocionalmente, vocês se entendem muito bem na questão de espaço. Quando um de vocês precisa respirar e ficar isolado no seu mundo, ou sair com os próprios amigos, o outro entende porque tem exatamente a mesma necessidade. A não-codependência é maravilhosa.",
        "O gargalo da compatibilidade aparece na profundidade de comprometimento afetivo frente ao cansaço ou nas fases onde o parceiro requer cuidados lentos. Como vocês são muito velozes em ir para o próximo capítulo de vida, a estabilidade de apenas segurar a mão e lidar com lutos, dores ou fragilidades de longo prazo requer um treinamento de paciência brutal.",
        "Aprender a suportar a rotina emocional, aceitando que o amor é uma jornada com planícies entediantes, fará de vocês invencíveis."
      ],
      comunicacao: [
        "A comunicação de vocês é rápida, expressiva, ousada e muito adaptável a novos temas.",
        "O perigo mora na evasão. Diante de DRs (Discussões de Relacionamento) pesadas sobre limites, futuro e finanças, um de vocês pode simplesmente se esgueirar porta afora, mudar de assunto, usar charme ou sair do ambiente com raiva porque detesta se sentir cobrado ou inquirido.",
        "Vocês precisam parar de usar as manobras evasivas. Sentem-se frente a frente sem o uso de celulares e tratem o conflito até o final, mesmo que isso os irrite profundamente. Resolver o que não é empolgante é vital."
      ],
      amorIntimidade: [
        "A vida íntima deste casal atinge picos de intensidade e exploração altíssimos. O apetite por novas experiências, cenários ou brincadeiras mantém o desejo vívido por muito mais tempo do que a maioria dos casais.",
        "O romantismo para o 5 raramente é o jantar padrão à luz de velas; ele é encontrado numa viagem exótica de surpresa, num encontro num lugar inusitado, numa quebra da agenda no meio da semana de trabalho.",
        "Para manter o sexo e a paixão no ápice por décadas, este casal não pode deixar a agenda profissional pasteurizar a agenda afetiva."
      ],
      vidaFinanceira: [
        "Ambos possuem grande agilidade intelectual para identificar oportunidades. Muitas vezes os ganhos vêm de várias frentes (trabalhos independentes, comércio, tecnologias, carreiras não convencionais).",
        "O problema crônico reside na impulsividade dos gastos. O 'eu mereço viver hoje' grita mais alto que a planilha do mês que vem. Vocês adoram experiências, viagens e prazeres rápidos. Se não criarem um sistema rígido de aporte financeiro automático de parte do que ganham, podem gerar dinheiro por anos e olhar para trás sem ter construído um patrimônio sólido."
      ],
      diaADia: [
        "A rotina de vocês é definida pela ausência dela. Os fins de semana dificilmente seguem um roteiro pré-fabricado. Estarão explorando um novo bairro hoje e trancados jogando videogame no amanhã.",
        "Gostam de estar na rua, apreciam a liberdade de ir e vir e detestam planejar os detalhes insignificantes do cotidiano.",
        "A bagunça na dinâmica das obrigações da casa pode gerar atritos pontuais, onde a pia fica cheia ou a conta não foi paga simplesmente porque ambos estavam muito absortos vivendo as próprias experiências ou trabalhando."
      ],
      conflitos: [
        "Os gatilhos máximos de atrito surgem da percepção de controle, cerceamento de liberdade e cobranças exaustivas sobre horários, ou ciúmes infundados. Nada ofende mais essa dinâmica que a sensação de ter a própria palavra desconfiada por paranoias parceiras.",
        "Em discussões, o tom pode se elevar rapidamente. Como há velocidade de raciocínio, vocês apontam as falhas do parceiro com precisão milimétrica. Podem ser ácidos e não têm problema algum em usar a tática de ir embora fisicamente para cortar o assunto no meio.",
        "O lado negro do conflito é que a repetição contínua da briga pode esvaziar rapidamente o desejo. Como ambos não temem a mudança, se a relação parecer ter se tornado um fardo chato, o botão de ejeção fica tentador. Vocês precisam manter o engajamento na solução."
      ],
      pontosCegos: [
        "Acreditarem que o amor genuíno e a intimidade andam de mãos dadas apenas com a adrenalina e o frio na barriga contínuos. Confundirem a fase da rotina natural e essencial de construção com o 'fim do amor'.",
        "A tendência grave a empurrar com a barriga problemas e responsabilidades entediantes achando que a vida vai se ajustar sozinha sem plano de ação."
      ],
      crescimento: [
        "O propósito comportamental deste casal é desestruturar velhos padrões perante a sociedade, amigos e família. Vocês mostram que é possível viver uma vida plena, feliz e conectada sem assinar em baixo dos estereótipos limitantes do 'relacionamento padrão'.",
        "A evolução desta união é quando percebem que o maior ato de liberdade e ousadia que existe no mundo é a decisão de se comprometer incondicionalmente a um grande amor diário."
      ],
      potencialLongoPrazo: [
        "Bastante favorável se a necessidade de mudança e crescimento for aplicada JUNTOS e com respeito à evolução um do outro. Vocês estarão casados mas sempre em um 'novo relacionamento', pois reinventarão os acordos da união diversas vezes na vida.",
        "O tédio os separa, mas se garantirem o estímulo um ao outro, vocês serão eternamente namorados independentes."
      ],
      conselho: [
        "Abram as asas, mas criem raízes suficientes para que a árvore não tombe na primeira tempestade prolongada.",
        "Não fuja da estabilidade no lar ou financeira. Entenda que a ordem material que vocês julgam entediante, na verdade é a rampa de lançamento que permite os voos cada vez mais altos e seguros de vocês."
      ],
      mensagemFinal: [
        "A parceria de vocês é uma lufada de ar fresco, cheia de movimento, vida vibrante e quebras de crenças. Jamais percam o entusiasmo contagiante com a existência, pois é esse olhar inquieto e corajoso que alimenta o amor entre vocês em sua mais bela profundidade."
      ]
    }
  },
  6: {
    title: "Dinâmica 6: Cuidado Universal, Ninho e Responsabilidade Incondicional",
    freeText: "A Dinâmica 6 representa o amor acolhedor elevado à máxima potência. Vocês não são apenas um casal, formam uma estrutura que assume feições quase que paternas e maternas para o mundo ao redor. O lar de vocês é o centro nervoso da união.",
    sections: {
      visaoGeral: [
        "Do ponto de vista psicológico, o comportamento deste casal é inteiramente focado na nutrição emocional, conforto doméstico e no bem-estar de toda a família extensa (filhos, pais, agregados) e da comunidade.",
        "Para vocês, amar é indissociável da ideia de cuidar ativamente. Não há limite claro entre as necessidades do relacionamento interno e o desejo enorme de prover um porto seguro a quem precisa no entorno. Vocês são aquele casal para o qual os amigos ligam em desespero durante as madrugadas, e para o qual os parentes migram aos domingos esperando acolhimento.",
        "A energia da união possui um tom clássico, conservador no que tange aos valores e incrivelmente harmonioso. Vocês valorizam reuniões familiares, o cheiro de comida em casa, as tradições bem marcadas e a beleza e o conforto do espaço físico que habitam.",
        "O risco fatal desta dinâmica é o esgotamento por excesso de responsabilidades. O casal pode carregar as pedras do mundo nos ombros, tentando resolver problemas de parentes enquanto silenciosamente o tesão e a energia primordial dos dois míngua sob a carga de estresse."
      ],
      atracaoInicial: [
        "A atração inicial teve fortes matizes de ternura e percepção de potencial para família. Pode não ter sido a faísca insana dos filmes de verão; foi o toque na alma perante o caráter cuidadoso, ético e protetor do outro.",
        "Desde os primeiros passos, a sintonia de vocês já envolvia longas conversas sobre infância, valores, sonhos familiares e responsabilidades da vida.",
        "Um reconheceu no outro aquele porto seguro onde as velas cansadas da rotina poderiam repousar perfeitamente para sempre."
      ],
      compatibilidadeEmocional: [
        "Altíssima capacidade de apoio nas horas extremas. A resiliência afetiva de vocês para cuidar do parceiro quando doente física ou emocionalmente é excepcional. O sentido de lealdade mútua não oscila.",
        "Contudo, há uma fraqueza considerável: a síndrome da perfeição do sacrifício. Um parceiro pode não expressar abertamente as suas próprias dores para não causar preocupação no outro que já anda tão sobrecarregado de funções. Essa atitude heroica silencia a intimidade verdadeira. A compatibilidade exige que a dor e a chateação não sejam filtradas, mas amplamente compartilhadas.",
        "Além disso, vocês tendem ao ciúme sutil quando o parceiro encontra conforto em outras vias (trabalho, hobbies solo) por não se sentirem 'tão necessários'. O cuidado excessivo sufoca; deem ao parceiro o direito de ter áreas independentes."
      ],
      comunicacao: [
        "A fala é quase sempre macia, carinhosa e imbuída de boas intenções. A harmonia relacional dita o vocabulário, com a constante reafirmação verbal dos valores centrais do casal.",
        "A armadilha na comunicação é varrer os atritos severos e as feiúras para debaixo do tapete a fim de proteger a bela estampa que criaram para fora. Ao não falarem duramente o que precisam por excesso de educação ou pavor do atrito, as águas de ressentimento vão fervendo lentamente no subsolo do inconsciente conjugal.",
        "A necessidade primária de comunicação aqui é aprender a discordar e a ser um pouco incômodos nas demandas conjuntas sem sentir que ofenderão mortalmente o companheiro."
      ],
      amorIntimidade: [
        "A intimidade se beneficia drasticamente do ambiente seguro. Quanto mais em harmonia o lar se encontra e as obrigações familiares saciadas, mais fluidos, sensuais e profundos serão os encontros de amor íntimo e romance do casal.",
        "O romantismo é traduzido fisicamente na manutenção do belo e do sensual (roupas de cama ricas, jantar primoroso, um bom vinho, carícias clássicas).",
        "O vilão número um do sexo e da intimidade de vocês é o cansaço parental/funcional que esmaga os dois se tentarem salvar o mundo todos os dias em vez de reservarem o tempo e o ambiente unicamente para a dupla."
      ],
      vidaFinanceira: [
        "Tendência a prover estabilidade primorosa, visando acima de tudo a qualidade de vida. Vocês preferem investir em propriedades, reformas na moradia e educação para os dependentes do que esbanjar com frivolidades solitárias.",
        "Cuidado redobrado na gestão financeira com dinheiro emprestado à família, ou gastos colossais ajudando quem não lhes dá retorno ou sugando continuamente os seus fundos em nome da 'boa ação' e da piedade irrestrita."
      ],
      diaADia: [
        "O lar é perfeitamente bem planejado em termos de rotina de manutenção e nutrição. O dia a dia possui ritmo clássico. Há prioridade em estar em casa sempre que possível e zelar pelas refeições e pelo ambiente acolhedor.",
        "A tendência das escapadas passa pelos finais de semana tranquilos com aqueles que o casal elegeu como família. Como estilo de vida, apreciam artes domésticas, receber bem com fartura e conforto e manter fortes os vínculos sociais profundos na base de muita doação.",
        "Precisam urgentemente colocar barreiras nas demandas não programadas do meio externo para as tarefas do próprio dia."
      ],
      conflitos: [
        "Gatilhos máximos para as discussões ocorrem mediante o descaso ou a negligência com as tarefas do lar e do cuidado mútuo por uma das partes, bem como falta de demonstração de zelo para com algum parente vital ou amigo. Atitudes egoístas do parceiro despertam ferida de traição de valores.",
        "Ao brigarem, costumam usar a postura de decepção silenciada, acusações que puxam o senso de culpa profunda ('depois de tudo que eu me sacrifico fazendo, é assim que sou tratado?') e a retirada temporária do afeto para que o outro entenda e pese o tamanho da falha e da ofensa desferida.",
        "O risco final no conflito deste perfil relacional é que não haja reconciliação profunda a menos que a pessoa sinta genuinamente o remorso na alma. Vocês precisam aprender que todos falham pontualmente, aceitem ser mais práticos no perdão no dia a dia."
      ],
      pontosCegos: [
        "A sobrecarga sistemática autoimposta perante a comunidade e perante os familiares esquecendo as próprias ambições de expansão do casal. Ser o amortecedor de choques do mundo externo destrói a própria vida de vocês dois.",
        "Codependência pesada que paralisa o voo individual e a incapacidade brutal de saberem como dizer 'não' claramente aos outros para pouparem a vocês mesmos."
      ],
      crescimento: [
        "O propósito comportamental deste casal no planeta é provar a força terapêutica, inabalável e colossal que um lar verdadeiro banhado com ética, carinho curador e fidelidade de propósitos produz à civilização.",
        "A elevação final ocorre quando vocês traçam um limite sagrado: do portão para fora, doamos, ajudamos; mas da linha para dentro, as prioridades e a energia e os cuidados essenciais são nossos e de mais ninguém."
      ],
      potencialLongoPrazo: [
        "Altíssimo potencial. Vocês são dotados de resiliência sem limites aos reveses do destino porque nunca duvidam da força da família para a qual servem de espinha dorsal mútua.",
        "Se aplicarem na relação uns miligramas saudáveis de puro e belo egoísmo para manter a intimidade focada e preservada, o céu familiar será perpétuo."
      ],
      conselho: [
        "Diga não às demandas daquelas pessoas que vocês amam de fora da união de vocês. Deleguem suas exaustões. Cuidem imensamente das costas de quem cuida dos outros.",
        "Namorem. Parem de vez em quando a grande roda das obrigações eternas e vão num jantar estritamente feito para dois deuses apaixonados, sem carregar pesos que não são seus."
      ],
      mensagemFinal: [
        "A dedicação monumental de vocês salva a vida perante a loucura da sociedade moderna. O ninho está construído para o repouso. Agora abracem esse poder curador um ao outro e desfrutem sozinhos dos louros daquilo que mais construíram de grandioso: o verdadeiro amor acolhedor."
      ]
    }
  },
  7: {
    title: "Dinâmica 7: Intelecto, Silêncio Oculto e Foco Existencial",
    freeText: "A Dinâmica 7 representa o casal dos mistérios profundos e da compreensão do que está além das aparências mundanas. Vocês não suportam o raso, o barulho superficial da sociedade e o fingimento fútil. A união de vocês é focada em ideias puras, crescimento analítico e extrema seletividade intelectual.",
    sections: {
      visaoGeral: [
        "Psicologicamente, este é o relacionamento menos dependente das frivolidades da vida em dupla. A conexão primordial encontra as suas bases na inteligência madura, no silêncio mútuo cheio de significados e num agudo senso de isolamento protetivo do mundo profano.",
        "Para vocês dois, sentar em absoluto silêncio lendo um livro na sala, com um respeitando plenamente a individualidade do outro no ambiente, pode ser mais profundo e gratificante que meses de falação incessante de qualquer outra dinâmica rotineira. A compreensão nas entrelinhas é fortíssima.",
        "Vocês possuem uma visão aguçada para descobrir verdades difíceis e enxergar a motivação escondida sob a máscara alheia da sociedade, atuando juntos como grandes analistas da realidade que os circunda.",
        "O ponto fatal do perfil relacional reside na dificuldade monstruosa em conectar nos níveis emocionais mundanos onde as trivialidades moram e onde o toque caloroso físico deveria imperar diariamente, podendo transformar a relação em duas ilhas congeladas vizinhas pela retração defensiva do isolamento excessivo."
      ],
      atracaoInicial: [
        "No primeiro choque do encontro, a atração foi regida pela curiosidade implacável, onde a mente perscrutadora e enigmática daquele parceiro pareceu o abismo certo para investigar os segredos mais fundos. Foi um mergulho no olhar inteligente e intrigante.",
        "As conversas, ao fluírem, provavelmente abordavam temas grandiosos: a natureza do espaço, de crenças antigas, teorias complexas e visões que afastam a mediocridade, criando instantaneamente uma redoma psíquica particular que isolava vocês da multidão medíocre à volta."
      ],
      compatibilidadeEmocional: [
        "Na dor calada, na pesquisa interna e na aceitação tácita e profunda da dor alheia o respeito não flutua. O silêncio compartilhado da compreensão silenciosa sem julgamentos fáceis na compatibilidade de mentes confere poder.",
        "A extrema deficiência emocional aparece nos atritos e chateações cotidianas onde sentimentos 'menores' e menos racionais imperam: tristeza passageira irracional ou medo. A frieza psíquica afiada impede de dar o conforto puramente afetuoso por estarem focados apenas nos aspectos intelectuais e matemáticos lógicos das falhas. Exige-se paciência gigante para amparar um carinho sem sentido em horas de necessidade orgânica de vulnerabilidade que não podem ser teorizadas.",
        "Precisam urgentemente abrir comportas mais generosas e vulneráveis sem que a cabeça analise exaustivamente antes o grau e o motivo prático da dor irracional. Aceitar a emoção do instante nua e crua."
      ],
      comunicacao: [
        "Comunicação baseada em altíssima objetividade analítica e verdades cirúrgicas brutais e honestas. Palavras precisas sem excesso e conversas onde o sentido real impera na avaliação rigorosa da sociedade e vida prática.",
        "A armadilha na comunicação de vocês reside em achar inútil relatar aos parceiros questões do dia a dia por parecem estúpidas ou indignas, calando angústias que poderiam ser debeladas. Quando magoado, o parceiro tende ao ensimesmamento punitivo silencioso, cortando pontes de contato que só o outro pode religar desvendando a barreira defensiva.",
        "A cura relacional se dá desenvolvendo vocabulário emocional simples e claro para o dia a dia, para que não cheguem a estágios herméticos insalubres em brigas profundas."
      ],
      amorIntimidade: [
        "A vida íntima, sensual, amorosa e sexual atua de forma inseparável do respeito psíquico na adoração. Exige alto envolvimento de pensamento e de sedução por parte do cérebro com diálogos e com estímulos intelectuais contínuos e enigmáticos antes da conexão real do físico orgânico cru e carnal ser aceita integralmente sem reservas.",
        "Para preservar e acender o romance de longo prazo na estabilidade sexual e relacional pura as viagens contemplativas e o desligamento em retiros ou exploração científica da própria relação de vocês no mundo atua maravilhosamente e traz vitalidade íntima na dupla longe da barulhenta superficialidade alheia."
      ],
      vidaFinanceira: [
        "Tendem à estabilidade cautelosa do controle frio ou à fúria investigativa a fim de possuírem o patrimônio apenas com o intuito focado de comprarem para eles sua mais preciosa posse a médio longo prazo: tempo livre imperturbável pela burocracia de pagar contas profanas mesquinhas do mês. Dinheiro importa por sua força protetora e garantidor da distância necessária.",
        "Têm que policiar a teimosia crônica em investimentos que julgam absolutos sozinhos recusando aceitar conselhos pragmáticos vitais de conselheiros mundanos nos reveses de ciclo econômico por orgulho na análise genial teórica incondicional do casal isolada perante perigos e perdas."
      ],
      diaADia: [
        "A rotina familiar flui harmoniosamente se houver absoluto respeito à agenda silenciosa. É uma paz meditativa sagrada e o retiro perfeito de leitura, organização, foco de pesquisas contínuas e quietudes prolongadas necessárias sem culpa perante pressões para socialização fútil o tempo inteiro exigido no final de semana pelo resto.",
        "Desdenham badalações incessantes frívolas vazias que os cansam e sobrecarregam psiquicamente demais por terem baterias recarregadas nos recantos da privacidade. Como modo de vida as companhias íntimas e profundamente sinceras bastam e saciam os anseios plenamente na companhia de seus amados pares reclusos de confiança da turma isolada protetora."
      ],
      conflitos: [
        "O gatilho que desencadeia brigas monumentais com retração fria no ápice é a mentira banal detectada agudamente no ar e atitudes onde a quebra de confiança invadiu o espaço particular das individualidades ferindo o pacto silente rigoroso na relação ou cobranças que esmagam o espaço na pressão constante.",
        "Ao brigarem adota-se um tom mortal de avaliação e de gelo analítico nas falas lógicas incontornáveis perante as acusações cortantes. Raramente haverá histeria descontrolada na superfície mas o atrito na intimidade congelará as comunicações no tratamento passivo e punitivo das barreiras psicológicas fechadas totalmente onde o frio corrói fundo os pilares.",
        "As curas não são conquistadas pelo berro, mas exigirão sim as confissões genuínas de coração desnudado, humildes nas fraquezas reais despidas e o compromisso ético renovado absoluto perante todas as leis e razões reestruturando as peças."
      ],
      pontosCegos: [
        "O ponto fatal do isolacionismo total cínico acreditando firmemente e perigando nas paranoias da arrogância mental contra a convivência mundana ao passo que as esferas práticas exigem que pisem descalços na terra para a simplicidade sem tantas armaduras conceituais fechadas em torres inatingíveis e que podem resfriar com a poeira a vida apaixonante do afeto rotineiro.",
        "A dificuldade letal na expressão do afeto bruto e simples onde o ego se amedronta na pura insegurança da vulnerabilidade nua para que não sejam machucados no profundo."
      ],
      crescimento: [
        "O propósito comportamental deste núcleo na existência humana repousa para testemunhar o significado inquebrável, ético do refino mental absoluto desbravando o vazio e trazendo claridade dos segredos e a evolução no caos aos que com vocês partilham da coragem da percepção íntima profunda real e autêntica longe de máscaras.",
        "As vitórias do amadurecimento das etapas são saboreadas por inteiro ao permitirem sentir no máximo as vivências afetivas orgânicas descontroladas com confiança infinita da rede sagrada do outro acolhendo onde não existirão mais armaduras rígidas protetoras necessárias pesando e machucando nos ombros exaustos."
      ],
      potencialLongoPrazo: [
        "Especial, forte, mas muito peculiar e de seleta compatibilidade. Se atingirem acordos básicos profundos e não resvalarem perigosamente caindo na aridez intelectual emocional sem vida afetiva trocada de volta do gelo frio as bases filosóficas estruturais durarão unidas mais que pedras fundamentais até ao infinito.",
        "Terão os caminhos plenos nos passos onde não precisam mais da provação de discursos exaustivos do nada por já serem a resposta exata nos olhos mudos da presença e amor constante eterno sem distúrbio."
      ],
      conselho: [
        "Lembrem sempre de trazer o carinho banal à rotina sem que isso pareça artificial perante lógicas rigorosas analíticas e saibam partilhar na comunhão do erro sem grandes análises filosóficas do caos para tudo. Não reprimam o lado bicho impulsivo na intimidade de vez em quando abraçando inteiros e cegos no instinto natural sem medo dos mistérios da emoção confusa sem respostas da dor.",
        "Façam concessões gentis na participação familiar profana leve de vez em quando do cotidiano da rotina da casa rindo na leveza simplória do tempo real gasto em companhias despojadas de grandes saberes na terra viva descalça."
      ],
      mensagemFinal: [
        "Vocês possuem um grau singular das conexões inesgotáveis nos corações na busca autêntica de verdades limpas e intelectuais sublimes e da pureza na comunhão onde não habita as futilidades falsas perante aparências. Desarmem com doçuras eventuais as defesas impenetráveis conjuntas perante a vulnerabilidade mútua de amor diário simples incondicional livre e verão desabrochar uma intimidade invulnerável nos alicerces inabaláveis celestiais e materiais para a história."
      ]
    }
  },
  8: {
    title: "Dinâmica 8: Ambição Compartilhada, Poder e Construção Magistral",
    freeText: "A Dinâmica 8 é guiada pelo motor da realização massiva. O relacionamento entre vocês possui, nas suas bases profundas, a energia de duas forças imperiais que se uniram para multiplicar o impacto que teriam sozinhas. A visão de longo prazo é focada nos resultados imponentes da dupla.",
    sections: {
      visaoGeral: [
        "Sob o prisma comportamental, este perfil conjugal assemelha-se a uma junta diretiva extremamente alinhada e potente. O padrão mestre aqui é o controle estratégico sobre os passos do sucesso e do patrimônio. Vocês rejeitam a fraqueza mental contínua, a desistência fácil de metas e exigem que o companheiro cresça sempre ombro a ombro na excelência da atuação profissional e social, servindo ambos como espelhos constantes da alta performance e produtividade mútua na vida.",
        "Este não é o casal da passividade ou das incertezas eternas. Se há desafios externos nas metas da união, os cérebros frios executivos logo formam frentes de ataque unificadas e obstinadas solucionando os obstáculos à frente esmagando problemas. A força que move os dois impulsiona riquezas não apenas financeiras, mas o status familiar conquistado com enorme suor tático dos envolvidos no plano principal de longo prazo grandioso compartilhado sem concessões ao amadorismo no meio do caminho focado.",
        "Os riscos gigantescos encontram-se na armadilha da hiper exigência do controle excessivo contínuo do casal na rigidez e nas avaliações do amor atadas visceralmente às métricas utilitárias de desempenho de produção. Quando o parceiro exausto apenas requer colo cego incondicional em falhas profundas de crise sem ter seu 'currículo da vida' analisado ou metas ajustadas com exigência insensível executiva para melhorias forçadas gerando enorme sobrecarga e o bloqueio afetivo relacional gelado se espalha nos ambientes fechados do amor por estarem voltados demais aos números e na manutenção de status forte sem fraquezas percebidas.",
        "A sublimação de maturidade deste casal invencível impõe as fronteiras que proíbam o trabalho exaustivo perene e o cálculo do sucesso mundano nas horas da intimidade, desarmando o lado gestor rígido e severo nos fins de dias da guerra a fim do conforto da aceitação irrestrita pacífica desarmada sem resultados a apresentar para ninguém na sala da intimidade sagrada pura do ninho familiar blindado pelo carinho sem regras ou metas frias ditadas da sociedade imposta lá fora na vida e no poder material."
      ],
      atracaoInicial: [
        "A faísca primordial de encontro não ocorreu pelas belezas frágeis passivas; vocês captaram num segundo no ar o olhar direto de firmeza inquebrável sem o menor pudor de liderança instintiva. Havia força, a altivez segura de um propósito que caminha passos pesados na ambição real inegociável nos corações fortes sem rodeios vitimizados na superfície do discurso atraente fatal de um magnetismo da confiança pura desbravadora corajosa imperiosa da atitude.",
        "Os encontros pautaram os alicerces nas percepções do potencial do gigante de construção da vida que residia oculto sob a força da postura elegante pragmática demonstrada do parceiro impulsionando o interesse irrefreável na energia do companheiro para jornadas longínquas pesadas colossais onde podiam de fato estarem protegidos pela solidez comprovada na ambição respeitosa."
      ],
      compatibilidadeEmocional: [
        "São pilares fundamentais impenetráveis nos laços afetivos sob severas tempestades, onde oferecem segurança psicológica irrestrita a quem escolhem e honram os sacrifícios dolorosos mantendo o prumo da solidez conjugal de confiança blindada na ética forte frente às calamidades ou as exigências onde as promessas jamais desabarão na fuga sem sentido a médio e longo prazo frente aos piores inimigos da realidade cruel nas provas existenciais suportadas ombro a ombro na trincheira férrea protetora.",
        "No revés perigoso, falham profundamente na fragilidade empática da dor descontrolada irracional prolongada de um ente em abalos ou perdas inexplicadas orgânicas sensíveis exigindo a doçura e afeto simples sem lições impacientes de superação contínua. Possuem pavios imensamente curtos na compreensão dos processos de lamentações emocionais prolongadas parecendo frios calculistas ditatoriais para estancarem fraquezas da vulnerabilidade nua no parceiro, gerando enorme solidão congelante por não entenderem a lentidão desestruturada nas reações alheias. Necessitam aprender urgentemente acolher as quebras temporárias nos espíritos exaustos do ser humano em luto orgânico sem urgência da performance heroica estancando curas apressadas forçadas brutais."
      ],
      comunicacao: [
        "Táticas eficientes implacáveis nos alinhamentos práticos operacionais na claridade executiva do dia e dos rumos sem mimimis das perdas dos debates teóricos infundados circulares nas retóricas estéreis nas ordens sem volta e na franqueza extrema afiada dos comandos sem filtros. O acordo de limites da responsabilidade do funcionamento perfeito do plano logístico conjugal do domínio total pragmático no sucesso é brutal na clareza resoluta irrestrita no dia a dia da máquina a dois blindada.",
        "Quando magoados os parceiros recuam num distanciamento intimidatório onde o silêncio possui gumes cortantes punitivos frios ou entram em ataques demolidores exigentes da argumentação inquebrável das análises ferindo na base egoica mortal no peito frágil no momento do combate impiedoso sem volta machucando as lembranças no fundo nas verdades implacáveis jogadas no nervo vivo da fraqueza pontual revelada da briga do estresse gerador crônico na pressão gigante insuportável no fundo da raiva da falta de poder dominado ou desrespeitados perante as falhas do caminho do sucesso exigido imposto."
      ],
      amorIntimidade: [
        "Quando desarmam as capas rigorosas imponentes do fardo impiedoso de executores do mundo encontram o abrigo de uma chama e uma sensualidade avassaladora feroz de doações plenas onde as fraquezas ocultas reprimidas e cansadas explodem em amor carnal generoso de proteção e no abraço na intimidade protetora com força da posse amorosa e do descanso nos portos seguros perante o domínio dos espaços quentes na entrega sem limite sexual nos momentos exatos desligados das luzes frenéticas do mundo externo pesado ininterrupto esmagador lá fora na lida estressante da vida da guerra material rotineira dura perene do tempo longo eterno cansativo do adulto real focado nas construções difíceis pesadas das cargas solitárias das vitórias da carreira estelar contínua de exigências da sobrevivência cruel."
      ],
      vidaFinanceira: [
        "Insuperáveis de um modo global magnético no instinto da capacidade aguçada feroz letal no tino estratégico em criar fontes inesgotáveis seguras sólidas dos dinheiros, as economias colossais familiares em progressão contínua firme contornando reveses para acumular legados inabaláveis blindando de todas formas e nas previsões dos ataques aos perigos materiais de perdas no núcleo inviolável dos investimentos conjuntos nas riquezas de expansões sucessivas contínuas protegidas sem abalos nos mares da volatilidade caótica nas tormentas severas financeiras perante as oscilações assustadoras da sorte que não existem no mapa real material prático dos domínios táticos impenetráveis da segurança imposta do sistema próprio conjugal forte do patrimônio da vida conquistada com honras a dois impávidos soberanos nos cumes solitários e poderosos."
      ],
      diaADia: [
        "A vida e o dia em si ditam no cronograma forte nas responsabilidades vitais inadiáveis rígidas focadas com disciplina nas altas produções sem margens da perguiça na exigência e da preguiça negligenciadora impeditiva do tempo no alto valor e rendimento de cada ciclo da meta de energia bem otimizada sem lamentos de comodismos frívolos vazios estagnados improdutivos das distrações fatais nas quebras do ritmo vital e do alto padrão estético de manutenção da ordem de funcionamento e excelência do maquinário focado firme implacável nos propósitos na organização suprema da eficiência da dupla de vida contínua com os lazeres refinados com estilo, recompensas merecidas valiosas em qualidade dos bons serviços requintados na restauração da dignidade após as exigências árduas brutais estafantes rotineiras da lida exaustiva de comando solitário na liderança diária das cobranças do mundo implacável cobrando excelência."
      ],
      conflitos: [
        "Ativa nas humilhações ou os cerceamentos indevidos das vontades, nas quebras dos propósitos onde um se sinta usado de forma covarde desrespeitando o território soberano e no microgerenciamento da liberdade no excesso imposto e das exigências nos abusos da intolerância insensível ditatorial com imposição autoritária esmagando nas humilhações que deflagam o vulcão terrível focado da frieza insensível de cortes definitivos e gelados no afastamento das fronteiras rompidas da indignação na falta do reconhecimento das parcerias no fundo da balança dos merecimentos justos na partilha exata nos pesos e nas réguas dos esforços nas frustrações punitivas gigantes na cólera silenciada mortal das crises absolutas do controle da autoridade rompida."
      ],
      pontosCegos: [
        "Ignorar nas métricas dos retornos concretos mensuráveis palpáveis de bens pragmáticos reais as sementes delicadas das carências profundas vulneráveis escondidas dos clamores invisíveis das pausas doces irracionais gratuitas sem sentido lógico das futilidades das horas mortas no romantismo de lazer e focar unicamente o casamento familiar sagrado blindado de afeto nas planilhas do contrato perene imutável nos rigores práticos como engrenagens contínuas da produtividade na seca aridez das estepes geladas e pesadas solitárias."
      ],
      crescimento: [
        "A marca de vocês e os propósitos fincados do destino ensinam a resiliência no domínio ético e inspiram a majestade humana perante a covardia do comodismo fácil servindo como guias e os exemplos morais invencíveis das fundações das comunidades das riquezas providas nas direções impulsionadoras a toda geração futura inspirada no modelo do legado das fortunas e potências geradas da persistência da superação irrestrita do poder nos exemplos invencíveis colossais prósperos justos puros."
      ],
      potencialLongoPrazo: [
        "Magnífico invulnerável da sobrevivência inquebrantável blindada dos compromissos nas eras sucessivas desde que o respeito do espaço e a divisão justa harmoniosa nas metas de ambos seja zelada equilibrada de sabedoria empática das tréguas pacíficas e doçuras gratuitas nas vulnerabilidades humanas do descanso nas fortalezas protetoras de confiança irrestrita da paz e dos triunfos e das calmas inesgotáveis plenas dos fins da tarde de recompensas serenas na coroa sagrada da paz eterna de velhices serenas sem armaduras rígidas na aceitação irrestrita plena desarmada madura dos corações eternos justos livres e verdadeiros da entrega imortal."
      ],
      conselho: [
        "As dores profundas não se gerenciam com a inteligência do planilhamento ou soluções pragmáticas forçadas impiedosas nas superações e não julguem os cansaços esporádicos com os olhos severos punitivos das preguiças frívolas no rigor absoluto contínuo intolerante implacável frio de um patrão que ignora lutos irrefutáveis internos silenciados com vergonhas medonhas profundas caladas de amor na alma despida sofrida machucada dolorida na vulnerabilidade das lutas diárias das existências humanas perdoadas falhas das fraquezas aceitas com beijos quentes apaziguadores confortadores na cama pacífica da compaixão real madura compassiva verdadeira limpa."
      ],
      mensagemFinal: [
        "Construam na beleza sólida da grandeza a imponente fortaleza impenetrável de domínio sem pares de vocês juntos na vitória das conquistas épicas inesquecíveis formidáveis com honras justas da história, mas garantam o segredo sagrado valioso escondido de abrirem o santuário da suavidade interna incondicional secreta inviolável nas moradas calmas do refúgio do cansaço e do romance nos braços amorosos de doçuras onde nenhum controle autoritário severo frio tenha vez e deponham juntas com coragem cega invencível todas amarras desnecessárias no perdão dos abraços eternos de almas descansadas plenas."
      ]
    }
  },
  9: {
    title: "Dinâmica 9: Humanitarismo, Idealismo e Expansão Transcendental",
    freeText: "A Dinâmica 9 traduz o auge do amor voltado ao propósito. Vocês se reconhecem em uma missão invisível muito mais vasta e sublime do que os pequenos caprichos rotineiros. O relacionamento é baseado num altruísmo profundo, no romantismo clássico inesquecível de entrega e num sonho compartilhado invencível inquebrável sublime puro das utopias justas compassivas no coração desbravador ético verdadeiro pacífico real espiritual amplo compassivo maduro leal incondicional de luz inesgotável.",
    sections: {
      visaoGeral: [
        "Psicologicamente, este é o relacionamento cujo foco transborda os limites habituais fechados dos muros do núcleo egoísta isolado nos interesses particulares rasos. A relação vive oxigenada pela profunda necessidade crônica da generosidade e nos compassos altruístas perante a humanidade à volta que respira inspirada na energia transformadora benévola amorosa da postura de bondade da dupla radiante nas influências dos apoios nas inspirações de referências fraternais inesgotáveis nos meios.",
        "Existe a marca contundente dolorosa aguda nas percepções dos sentimentos da empatia global compassiva com todas as criaturas sem fronteiras nas dores nas lutas das existências difíceis com o dom curador e orientador acolhedor sábio tolerante absoluto nos abrigos onde se dedicam aos esforços em transformar ativamente de alguma maneira o sofrimento à volta onde andam tocando os problemas dos mundos nas dedicações de valores éticos ideais inquebráveis irrestritos puros pautando sempre todas as decisões perenes.",
        "A fraqueza sistêmica e o grande perigo letal das dinâmicas repousa na auto exaustão contínua irresponsável na imolação psíquica, mental, na dilapidação perigosa do capital financeiro do casal esgotado pelas lutas alheias ou as doações infindáveis da filantropia das piedades em detrimento e total esquecimento cego egoísta e suicida da própria qualidade essencial, da estabilidade prática, proteção, blindagem de sobrevivência de vocês onde tentam de todas formas puras as ajudas milagrosas abnegadas para fora sugados vampirizados na síndrome trágica amarga ingrata silenciosa dos mártires nas omissões dos seus deveres na saúde amorosa no núcleo principal frágil de vocês.",
        "Precisam das ancoras inquebráveis mundanas lógicas dos sensos de proteção limítrofe no altruísmo descontrolado para a sanidade não ceder no meio do esgotamento nas decepções sombrias depressivas cruéis dos retornos da realidade nas ingratidões duras amargas nas feridas cruéis expostas solitárias esgotadas no amor desgastado nas estafas severas tristes cínicas nos recolhimentos ressentidos do silêncio frio do mundo exaurido em cobranças frias pesadas fúteis mortais."
      ],
      atracaoInicial: [
        "Vocês não colidiram de início pela trivial atração visual das epidermes apenas vazias na forma; foi a captação na frequência oculta da nobreza ética, da grandeza dos discursos nos horizontes vastos no caráter elevado, das virtudes irrefutáveis da bondade transparente nos gestos de integridade inspiradora que puxou um ao outro feito gravidade pura inevitável profunda. Era a alma antiga cansada maravilhosa nos olhares maduros nos sorrisos de compassiva luz infinita de valores puros irretocáveis na decência honrosa nas virtudes.",
        "A atração e a química nasceram dos valores afins nos sonhos dos propósitos gigantes sublimes nas indignações morais conjuntas perante a dor, sentindo de pronto a empatia gigante acolhedora e de perdões absolutos dos ombros inabaláveis fraternais pacíficos seguros acolhedores fortes de lealdades justas de uma companhia de luz perene inseparável infinita nos horizontes."
      ],
      compatibilidadeEmocional: [
        "Profundezas curadoras extraordinárias na intimidade do amparo nos piores vales das depressões da vida, nos tombos sem retornos nos apoios sem exigências da compaixão irrestrita onde a fonte da compreensão nos julgamentos apagados no perdão mútuo absoluto onde abraçam os fantasmas dolorosos com as doçuras divinas do amor pacífico calmo brando curativo silencioso consolador que perdoa na plenitude dos braços das madrugadas cruéis escuras dos lamentos calados das tristezas pesadas orgânicas do choro livre seguro autêntico verdadeiro pleno desarmado real limpo cristalino imortal livre das amarras do mundo das cobranças duras injustas profanas mesquinhas no julgamento cruel do humano falho amedrontado assustado culpado solitário exausto que encontrou a morada final no parceiro das eras perenes seguras.",
        "Possuem um sério e agudo perigo de compatibilidade no choque quando um decide ou necessita da atenção material estrita nas superficialidades egoicas no reconhecimento humano fútil na glória ou cede às vaidades menores, ocorrendo frustração decepcionante brutal severa ao confrontarem visões e sentindo ausências profundas na recusa por repulsa das condescendências materiais esvaziadas no esgotamento silencioso da relação nas quebras severas idealizadas perfeitas intangíveis nas cobranças das decepções pesadas na utopia inatingível da perfeição moral absoluta frustrada fria irrealista doentia imposta sem piedade compassiva nas dinâmicas imperfeitas do viver sujo imperfeito banal instável medíocre de dia a dia da terra."
      ],
      comunicacao: [
        "Inspiradora, elevada, carregada de significados e lições na troca rica madura constante nas referências plenas, os tons serenos pacíficos puros e os alinhamentos grandiosos nos horizontes de vidas, fluída e altamente compassiva benevolente tolerante compreensiva respeitosa atenta da essência humana sublime.",
        "Silenciam letalmente nas amarguras passivas contínuas nos lamentos ressentidos de mágoas das grandes decepções tristes na evasiva crônica silenciosa fria para não criar conflitos explosivos frontais desequilibrados pesados escondendo ressentimentos amargos cruéis doloridos das pequenas frustrações diárias pequenas onde sentiram nas faltas mínimas grandes vácuos frios e que deveriam ser expostos na franqueza libertadora nos diálogos corajosos limpos frontais saudáveis."
      ],
      amorIntimidade: [
        "A entrega transcende a pura química do desejo animal dos corpos e banha-se numa sacralidade lírica do romance poético sensual nas delicadezas da admiração venerada plena no carinho devotado nos olhares lentos na respiração partilhada no espaço de doação suprema irrestrita do prazer incondicional focado no deslumbramento no transe absoluto afetivo do companheiro e do amor de entrega inegoísta com a paz plena orgásmica na comunhão segura protetora carinhosa livre profunda inesquecível verdadeira pura íntima das existências de confianças infinitas de laços divinos do destino perene marcado do amor da poesia sublime romântica autêntica.",
        "Precisam afastar o risco brutal das desconexões da libido e apatia fria estagnada melancólica doentia pela sobrecarga severa no peso energético esgotante dramático contínuo das ansiedades nos problemas do mundo onde se afogam nos cuidados ou sacrifícios extremos de abnegação retirando a vitalidade das pulsões vitais na estafa trágica do corpo exausto nas frustrações crônicas na doação do amor pleno romântico sensual carnal inibido."
      ],
      vidaFinanceira: [
        "Vocês possuem os canais livres imensamente abundantes na prosperidade providencial que surge do nada pelo poder ético nas trocas sinceras de contribuições com a comunidade e pela criatividade na generosidade inesgotável das ações no mundo. As portas de abundância abrem nos contatos verdadeiros honestos fraternais sólidos sem os desvios frios calculistas na visão clara universal das conexões prósperas limpas inesgotáveis nos legados verdadeiros amplos abertos no poder limpo maduro íntegro respeitado seguro firme real."
      ],
      diaADia: [
        "A rotina familiar flui harmoniosamente se houver absoluto respeito à agenda silenciosa de regeneração necessária perante doações do cansaço do trabalho intenso altruísta. Requerem os mergulhos vitais nos refúgios dos silêncios artísticos pacíficos do mundo nas belezas de conexão simples nas paisagens para renovarem as matrizes da mente e do coração da serenidade e da lucidez pacífica longe do barulho das massas frenéticas barulhentas agressivas impacientes ruidosas nas explorações mundanas exigentes contínuas nas redes."
      ],
      conflitos: [
        "Gatilhos deflagradores terríveis de cortes no estresse da raiva fria implacável do julgamento final moral impiedoso nos embates acontecem perante o vislumbre cruel das ausências de compaixão brutal mesquinha insensível de atitudes de traições nas premissas éticas absolutas inegociáveis perante si e perante inocentes no egoísmo frio calculista cínico onde os abalos desmoronam de imediato os respeitos incondicionais nos alicerces fundidos sagrados na fé inquebrantável do parceiro das ilusões utópicas no deslumbramento desfeito impiedosamente frustrado."
      ],
      pontosCegos: [
        "As expectativas doentias de um nível celestial intocável imaculado do casal e do companheiro na rigidez insensível esmagadora que reprime com decepção a natureza real animalesca falha imperfeita pequena egoísta orgânica simples e mundana normal das pessoas nos atritos mesquinhos rasos diários. Não suportam perdoar os próprios defeitos terrenos fúteis ou tolerar as irritações bobas humanas no cotidiano chato da vida exigindo dos céus o purismo das luzes nos degraus de pressão inatingíveis estafantes onde a vida não acontece nos palcos poéticos da imaginação livre utópica divinizada inalcançável perigosa irreal ilusória isolada vazia solitária."
      ],
      crescimento: [
        "A manifestação suprema do destino perene nos horizontes no mundo ensina através dos comportamentos de caridade de empatia inabalável as curas absolutas pela via mestra insuperável invencível do perdão incondicional sublime. Soerguem à volta onde passam nas cinzas e resgatam as humanidades dos destroços desenganados e acendem o propósito de significado eterno nas trajetórias sombrias iluminadas do sol da bondade limpa compassiva inspiradora viva autêntica poderosa profunda imortal divina livre das vaidades frias nas conexões curadoras profundas nas amizades de redenção suprema do planeta abençoado."
      ],
      potencialLongoPrazo: [
        "Indestrutível se pautado e equilibrado na realidade crua nua cínica imperfeita onde aterrissem os voos constantes para curtir as mediocridades bobas dos erros tolos e do humor fácil ingênuo onde a vida pacata fútil rola. Sobreviverão imortais além do próprio ser nas parcerias plenas maduras calmas de compreensão nas tolerâncias absolutas unidas nos outonos sábios descansados com respeito e amores celestiais invencíveis calmos límpidos sem distúrbios plenos incondicionais da doçura terna serena invulnerável sagrada nas eras calmas unidas sem temores eternos dos corações blindados e seguros pacíficos curados divinos das almas velhas gêmeas eternas sem pressas."
      ],
      conselho: [
        "Perdoem ativamente e riam com os tropeços da infantilidade humana boba e frágil nos caprichos mesquinhos. Não julguem o cansaço do outro que apenas quis focar frivolamente nas compras fúteis desapegando das culpas dolorosas exaustivas morais de querer salvar tudo à volta das mazelas implacáveis insolúveis intermináveis pesadas crônicas mundiais e fechem as cortinas dos mundos exaustos das brigas com egoísmos pequenos de fim de domingo num filme divertido calmo ingênuo vazio sem mensagens existenciais complexas nas cobranças exaustivas divinas estéticas perfeccionistas duras da santidade severa solitária gelada irreal intocável distante pesada dolorida isolada cobrada punida."
      ],
      mensagemFinal: [
        "O legado amoroso imortal dessa união transcende e abraça nas curas todas as direções nas bençãos silenciosas puras calmas nos compassos do coração forte justo compassivo desarmado verdadeiro limpo real gigante sublime da alma na evolução das eras inteiras calmas plenas de amor nas doçuras sábias e do perdão e da tolerância invencível sagrada das estrelas seguras nos braços macios do companheiro para todas as estações intocáveis imaculadas eternas."
      ]
    }
  }
};
