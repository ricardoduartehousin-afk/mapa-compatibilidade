import { calculateCompatibility } from './numerology.js';

function numMeaning(n) {
  const m = {
    1: 'Liderança, independência, iniciativa, coragem',
    2: 'Sensibilidade, parceria, cooperação, equilíbrio',
    3: 'Comunicação, criatividade, expressão, entusiasmo',
    4: 'Estabilidade, construção, disciplina, segurança',
    5: 'Liberdade, aventura, mudança, adaptabilidade',
    6: 'Responsabilidade, cuidado, harmonia, família',
    7: 'Introspecção, análise, sabedoria, espiritualidade',
    8: 'Poder, abundância, realização material, justiça',
    9: 'Compaixão, universalidade, conclusão, generosidade'
  };
  return m[n] || 'Autoconhecimento e evolução';
}

function destinySummary(d) {
  const m = {
    1: 'Você veio ao mundo para liderar, inovar e abrir caminhos. Sua alma é independente e não se satisfaz com o comum.',
    2: 'Sua missão é construir pontes, pacificar ambientes e ensinar através da sensibilidade e da diplomacia.',
    3: 'Você está aqui para se expressar, inspirar alegria e mostrar que a criatividade é a maior força de transformação.',
    4: 'Sua jornada é de construção sólida, disciplina e lealdade. Você é a base sobre a qual os outros se apoiam.',
    5: 'Você veio para experimentar, quebrar paradigmas e provar que a verdadeira liberdade está em expandir horizontes.',
    6: 'Sua alma veio para cuidar, acolher e harmonizar. Você é o pilar de sustentação emocional de quem ama.',
    7: 'Sua jornada é de busca interior, conhecimento profundo e compreensão dos mistérios da vida.',
    8: 'Você está aqui para dominar o mundo material com integridade, transformando poder em propósito.',
    9: 'Sua missão é amar incondicionalmente, encerrar ciclos com sabedoria e deixar um legado de compaixão.'
  };
  return m[d] || 'Uma jornada única de autodescoberta e crescimento.';
}

function soulSummary(s) {
  const m = {
    1: 'No fundo do seu coração, você anseia por ser reconhecido, brilhar com luz própria e viver de forma autêntica.',
    2: 'Seu maior desejo é amar e ser amado em um ambiente de paz, parceria e compreensão mútua.',
    3: 'Sua alma pulsa por liberdade criativa, alegria contagiante e a capacidade de tocar o coração dos outros.',
    4: 'Você busca segurança, estabilidade e a certeza de que construiu algo que valha a pena.',
    5: 'Seu espírito anseia por aventura, descobertas e uma vida sem amarras ou limitações.',
    6: 'O que você mais deseja é criar um lar amoroso, cuidar de quem ama e sentir-se essencial na vida do outro.',
    7: 'Sua alma busca compreensão, respostas profundas e um sentido maior para a existência.',
    8: 'Você deseja prosperidade, reconhecimento e a liberdade que vem com a realização material.',
    9: 'Seu coração anseia por fazer diferença no mundo, amar sem limites e deixar sua marca na humanidade.'
  };
  return m[s] || 'Uma busca profunda por propósito e conexão verdadeira.';
}

export function generateReportHtml(lead) {
  const results = calculateCompatibility(lead.nomeP1, lead.dataP1, lead.nomeP2, lead.dataP2);

  const d1 = results.destinyP1;
  const d2 = results.destinyP2;
  const s1 = results.soulNumberP1;
  const s2 = results.soulNumberP2;
  const pct = results.percentage;

  const n1 = lead.nomeP1.split(' ')[0];
  const n2 = lead.nomeP2.split(' ')[0];
  const nome1 = lead.nomeP1;
  const nome2 = lead.nomeP2;

  const compatibleLevel = pct >= 80 ? 'alta' : pct >= 65 ? 'média' : 'em desenvolvimento';

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mapa de Compatibilidade</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0f0f1a; color: #e2e8f0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; background: #1a1a2e; border-radius: 16px; overflow: hidden; }
    .header { background: linear-gradient(135deg, #f97316, #3b82f6); padding: 40px 32px 32px; text-align: center; }
    .header h1 { font-size: 26px; color: #fff; margin-bottom: 6px; }
    .header p { color: rgba(255,255,255,0.85); font-size: 14px; }
    .couple-badge { display: inline-block; background: rgba(255,255,255,0.15); padding: 8px 20px; border-radius: 999px; margin-top: 12px; font-size: 16px; color: #fff; font-weight: 600; }
    .section { padding: 28px 32px; border-bottom: 1px solid rgba(255,255,255,0.06); }
    .section:last-child { border-bottom: none; }
    .section-title { font-size: 18px; color: #f97316; margin-bottom: 16px; font-weight: 700; }
    .percentage-circle { width: 120px; height: 120px; border-radius: 50%; background: conic-gradient(#f97316 ${pct}%, #2d2d4a ${pct}%); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }
    .percentage-circle-inner { width: 100px; height: 100px; border-radius: 50%; background: #1a1a2e; display: flex; flex-direction: column; align-items: center; justify-content: center; }
    .percentage-number { font-size: 32px; font-weight: 800; color: #f97316; line-height: 1; }
    .percentage-label { font-size: 11px; color: #94a3b8; margin-top: 2px; }
    .compatibility-text { text-align: center; color: #94a3b8; font-size: 14px; line-height: 1.6; margin-top: 8px; }
    .number-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .number-card { background: #252540; border-radius: 12px; padding: 16px; border: 1px solid rgba(255,255,255,0.06); }
    .number-card .label { color: #94a3b8; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; }
    .number-card .value { font-size: 28px; font-weight: 700; margin: 4px 0; }
    .number-card .meaning { color: #cbd5e1; font-size: 13px; line-height: 1.5; }
    .number-card.destiny { border-left: 3px solid #3b82f6; }
    .number-card.destiny .value { color: #3b82f6; }
    .number-card.soul { border-left: 3px solid #8b5cf6; }
    .number-card.soul .value { color: #8b5cf6; }
    .person-block { margin-bottom: 20px; }
    .person-block:last-child { margin-bottom: 0; }
    .person-name { color: #f97316; font-size: 16px; font-weight: 600; margin-bottom: 8px; }
    .person-desc { color: #94a3b8; font-size: 13px; line-height: 1.6; }
    .highlight-box { background: linear-gradient(135deg, rgba(249,115,22,0.08), rgba(59,130,246,0.08)); border-radius: 12px; padding: 20px; margin-top: 16px; border-left: 3px solid #f97316; }
    .highlight-box p { color: #cbd5e1; font-size: 14px; line-height: 1.7; }
    .footer { text-align: center; padding: 24px 32px; background: #0f0f1a; }
    .footer p { color: #64748b; font-size: 12px; }
    .btn { display: inline-block; background: #f97316; color: #fff; text-decoration: none; padding: 12px 32px; border-radius: 8px; font-weight: 600; font-size: 14px; margin-top: 16px; }
    .divider { height: 1px; background: rgba(255,255,255,0.06); margin: 16px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✨ Mapa de Compatibilidade</h1>
      <p>Análise completa com base na numerologia do casal</p>
      <div class="couple-badge">${n1} 💫 ${n2}</div>
    </div>

    <div class="section" style="text-align:center">
      <div class="percentage-circle">
        <div class="percentage-circle-inner">
          <div class="percentage-number">${pct}%</div>
          <div class="percentage-label">COMPATIBILIDADE</div>
        </div>
      </div>
      <p class="compatibility-text">A compatibilidade entre ${nome1} e ${nome2} foi classificada como <strong style="color:#f97316">${compatibleLevel}</strong>. Este percentual reflete a soma das energias individuais de cada um e a forma como elas se combinam.</p>
    </div>

    <div class="section">
      <div class="section-title">🎯 Números de Destino</div>
      <p style="color:#94a3b8;font-size:13px;line-height:1.6;margin-bottom:16px">O número de destino revela o propósito de vida, a missão que cada um veio cumprir e as características centrais da personalidade.</p>
      <div class="person-block">
        <div class="person-name">${nome1}</div>
        <div class="number-grid">
          <div class="number-card destiny">
            <div class="label">Destino</div>
            <div class="value">${d1}</div>
            <div class="meaning">${numMeaning(d1 > 9 ? (d1 === 11 ? 2 : d1 === 22 ? 4 : d1) : d1)}</div>
          </div>
          <div class="number-card soul">
            <div class="label">Alma</div>
            <div class="value">${s1}</div>
            <div class="meaning">${numMeaning(s1 > 9 ? (s1 === 11 ? 2 : s1 === 22 ? 4 : s1) : s1)}</div>
          </div>
        </div>
        <p style="color:#cbd5e1;font-size:13px;line-height:1.6;margin-top:12px">${destinySummary(d1 > 9 ? (d1 === 11 ? 2 : d1 === 22 ? 4 : d1) : d1)}</p>
        <p style="color:#8b5cf6;font-size:13px;line-height:1.6;margin-top:8px;font-style:italic">Desejo da alma: ${soulSummary(s1 > 9 ? (s1 === 11 ? 2 : s1 === 22 ? 4 : s1) : s1)}</p>
      </div>
      <div class="divider"></div>
      <div class="person-block">
        <div class="person-name">${nome2}</div>
        <div class="number-grid">
          <div class="number-card destiny">
            <div class="label">Destino</div>
            <div class="value">${d2}</div>
            <div class="meaning">${numMeaning(d2 > 9 ? (d2 === 11 ? 2 : d2 === 22 ? 4 : d2) : d2)}</div>
          </div>
          <div class="number-card soul">
            <div class="label">Alma</div>
            <div class="value">${s2}</div>
            <div class="meaning">${numMeaning(s2 > 9 ? (s2 === 11 ? 2 : s2 === 22 ? 4 : s2) : s2)}</div>
          </div>
        </div>
        <p style="color:#cbd5e1;font-size:13px;line-height:1.6;margin-top:12px">${destinySummary(d2 > 9 ? (d2 === 11 ? 2 : d2 === 22 ? 4 : d2) : d2)}</p>
        <p style="color:#8b5cf6;font-size:13px;line-height:1.6;margin-top:8px;font-style:italic">Desejo da alma: ${soulSummary(s2 > 9 ? (s2 === 11 ? 2 : s2 === 22 ? 4 : s2) : s2)}</p>
      </div>
    </div>

    <div class="section">
      <div class="section-title">💞 Sobre a Relação</div>
      <div class="highlight-box">
        <p>${nome1} (Destino ${d1}) e ${nome2} (Destino ${d2}) formam uma parceria onde cada um traz sua força individual para construir uma história juntos. A energia de ${n1} é marcada pelo número ${d1}, que representa ${numMeaning(d1 > 9 ? (d1 === 11 ? 2 : d1 === 22 ? 4 : d1) : d1)}. Já ${n2} carrega a energia do número ${d2}, que simboliza ${numMeaning(d2 > 9 ? (d2 === 11 ? 2 : d2 === 22 ? 4 : d2) : d2)}.</p>
        <p style="margin-top:12px">A alma de cada um também revela desejos profundos: ${n1} busca "${soulSummary(s1 > 9 ? (s1 === 11 ? 2 : s1 === 22 ? 4 : s1) : s1)}" enquanto ${n2} anseia por "${soulSummary(s2 > 9 ? (s2 === 11 ? 2 : s2 === 22 ? 4 : s2) : s2)}". Compreender essas necessidades é o primeiro passo para uma relação mais consciente e satisfatória.</p>
      </div>
    </div>

    <div class="footer">
      <p>Este mapa foi gerado com base na numerologia cabalística tradicional.</p>
      <p style="margin-top:4px">Use estas informações como ferramenta de autoconhecimento e crescimento.</p>
      <p style="margin-top:12px">© ${new Date().getFullYear()} Teste de Afinidade — Todos os direitos reservados.</p>
    </div>
  </div>
</body>
</html>`;
}
