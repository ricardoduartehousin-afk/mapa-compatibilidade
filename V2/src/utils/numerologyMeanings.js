// Significados de cada número para Destino, Alma e Expressão

const MEANINGS = {
  1: {
    destiny: 'Você nasceu para liderar. Seu caminho de vida exige coragem, independência e a capacidade de trilhar seus próprios caminhos. Veio ao mundo para ser pioneiro, inovar e mostrar que é possível construir algo novo. O maior aprendizado é equilibrar a força de vontade com a humildade.',
    soul: 'Sua alma anseia por liberdade e reconhecimento. Você tem um desejo profundo de ser único, de deixar sua marca no mundo e de viver de acordo com suas próprias regras. A motivação interior vem da necessidade de se expressar plenamente sem depender da aprovação alheia.',
    expression: 'Você transmite uma energia de confiança e determinação. As pessoas percebem em você um líder natural, alguém que toma iniciativa e não tem medo de desafios. Sua presença é magnética e inspira outros a seguirem seus passos.'
  },
  2: {
    destiny: 'Seu propósito é construir pontes. Você veio ao mundo para aprender sobre parceria, diplomacia e sensibilidade. Seu caminho envolve unir pessoas, criar harmonia onde existe conflito e demonstrar que a verdadeira força está na cooperação, não na competição.',
    soul: 'Sua alma busca conexão e pertencimento. O que move seu coração é a necessidade de amar e ser amado, de encontrar alguém com quem compartilhar a jornada. Você anseia por paz, equilíbrio e relacionamentos profundos e significativos.',
    expression: 'Você transmite uma energia acolhedora e pacificadora. As pessoas se sentem seguras perto de você, pois percebem sua capacidade de ouvir, compreender e apoiar. Sua presença suave e diplomática atrai aqueles que buscam conforto e compreensão.'
  },
  3: {
    destiny: 'Você nasceu para se expressar. Seu caminho de vida envolve comunicação, criatividade e alegria. Veio ao mundo para inspirar outros através de suas palavras, arte ou talento. O aprendizado está em equilibrar a leveza com a disciplina necessária para realizar seus sonhos.',
    soul: 'Sua alma vibra com criatividade e entusiasmo. Você tem um desejo profundo de se expressar, de ser ouvido e de compartilhar sua visão única do mundo. A motivação interior vem da necessidade de criar, de transformar ideias em realidade e de trazer alegria para quem está ao redor.',
    expression: 'Você transmite uma energia vibrante e contagiante. As pessoas são atraídas pelo seu carisma, seu senso de humor e sua capacidade de tornar qualquer ambiente mais leve e divertido. Sua presença ilumina onde quer que vá.'
  },
  4: {
    destiny: 'Seu propósito é construir bases sólidas. Você veio ao mundo para aprender sobre disciplina, trabalho duro e perseverança. Seu caminho envolve criar estruturas que resistam ao tempo, seja no plano material, familiar ou profissional. O maior aprendizado é a paciência.',
    soul: 'Sua alma busca segurança e estabilidade. O que move seu coração é a necessidade de construir algo duradouro, de ter uma base firde sobre a qual apoiar sua vida e a de quem ama. Você anseia por ordem, previsibilidade e a satisfação de ver resultados concretos.',
    expression: 'Você transmite uma energia de confiança e solidez. As pessoas percebem em você alguém confiável, responsável e comprometido. Sua presença inspira segurança e transmita a sensação de que, com você, tudo pode ser construído com bases firmes.'
  },
  5: {
    destiny: 'Você nasceu para ser livre. Seu caminho de vida envolve mudanças, aventuras e descobertas. Veio ao mundo para experimentar, para quebrar regras limitantes e para inspirar outros a também viverem com mais intensidade. O aprendizado está em encontrar equilíbrio entre liberdade e responsabilidade.',
    soul: 'Sua alma anseia por liberdade e variedade. Você tem um desejo profundo de explorar o mundo, de viver experiências novas e de escapar de qualquer tipo de prisão ou rotina. A motivação interior vem da necessidade de movimento, transformação e descoberta.',
    expression: 'Você transmite uma energia magnética e aventureira. As pessoas são atraídas pelo seu espírito livre, sua curiosidade e sua capacidade de tornar qualquer situação em uma aventura. Sua presença é eletrizante e inspira outros a saírem da zona de conforto.'
  },
  6: {
    destiny: 'Seu propósito é amar e cuidar. Você veio ao mundo para aprender sobre responsabilidade afetiva, família e serviço ao próximo. Seu caminho envolve criar um lar harmonioso, cuidar de quem ama e ser o porto seguro para os outros. O maior aprendizado é equilibrar o cuidar com o autocuidado.',
    soul: 'Sua alma busca amor e harmonia familiar. O que move seu coração é a necessidade de cuidar, de proteger e de criar um ambiente de paz e afeto para quem ama. Você anseia por relacionamentos verdadeiros, por um lar acolhedor e por saber que está fazendo diferença na vida de alguém.',
    expression: 'Você transmite uma energia amorosa e acolhedora. As pessoas percebem em você alguém generoso, dedicado e que coloca o bem-estar dos outros como prioridade. Sua presença transmite conforto e a sensação de que, com você, sempre há um lugar seguro.'
  },
  7: {
    destiny: 'Você nasceu para buscar a sabedoria. Seu caminho de vida envolve análise, espiritualidade e compreensão profunda da realidade. Veio ao mundo para questionar, para estudar e para descobrir verdades que poucos alcançam. O aprendizado está em compartilhar o que descobre e não se isolar.',
    soul: 'Sua alma anseia por conhecimento e significado. Você tem um desejo profundo de entender o funcionamento do universo, de decifrar os mistérios da vida e de encontrar respostas para perguntas essenciais. A motivação interior vem da necessidade de evoluir espiritualmente e intelectualmente.',
    expression: 'Você transmite uma energia misteriosa e profunda. As pessoas percebem em você alguém sábio, intuitivo e que enxerga além das aparências. Sua presença inspira curiosidade e respeito, e muitos buscam em você conselhos e orientação.'
  },
  8: {
    destiny: 'Seu propósito é manifestar abundância. Você veio ao mundo para aprender sobre poder, prosperidade e realização material. Seu caminho envolve desenvolver liderança, visão estratégica e a capacidade de transformar sonhos em realidade concreta. O maior aprendizado é usar o poder com sabedoria e generosidade.',
    soul: 'Sua alma busca reconhecimento e realização. O que move seu coração é a necessidade de alcançar grandes objetivos, de ser reconhecido por suas capacidades e de construir um legado significativo. Você anseia por prosperidade, não apenas material, mas em todas as áreas da vida.',
    expression: 'Você transmite uma energia de autoridade e sucesso. As pessoas percebem em você alguém ambicioso, determinado e com grande capacidade de realização. Sua presença inspira confiança e demonstra que é possível alcançar grandes conquistas com trabalho e estratégia.'
  },
  9: {
    destiny: 'Você nasceu para completar ciclos. Seu caminho de vida envolve compaixão, humanitarismo e sabedoria acumulada. Veio ao mundo para aprender a perdoar, a se desapegar e a amar incondicionalmente. O aprendizado está em usar sua experiência para servir ao próximo sem se perder no sacrifício.',
    soul: 'Sua alma busca propósito e transcendência. Você tem um desejo profundo de fazer diferença no mundo, de contribuir para algo maior que você mesmo. A motivação interior vem da necessidade de evoluir espiritualmente, de perdoar e de encontrar significado em cada experiência.',
    expression: 'Você transmite uma energia sábia e compassiva. As pessoas percebem em você alguém generoso, idealista e com uma visão ampla da vida. Sua presença inspira transformação e muitos buscam em você conforto espiritual e orientação.'
  }
};

export default MEANINGS;
