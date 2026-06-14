import { calculateCompatibility } from './numerology.js';
import {
  PERFIL_DESTINO,
  PERFIL_ALMA,
  COMPATIBILIDADE_DESTINO,
  COMPATIBILIDADE_ALMA,
  getSameSoulText,
  ENERGIA_INTIMA,
  getIntimateDynamic,
  ENCERRAMENTO
} from '../src/utils/mapaDoCasalContent.js';
import MEANINGS from '../src/utils/numerologyMeanings.js';

function reduceNum(num) {
  if (num <= 9) return num;
  if (num === 11) return 2;
  if (num === 22) return 4;
  const s = num.toString().split('').reduce((a, b) => a + parseInt(b), 0);
  return s > 9 ? s.toString().split('').reduce((a, b) => a + parseInt(b), 0) : s;
}

function reduceSum(a, b) {
  let s = a + b;
  while (s > 9 && s !== 11 && s !== 22) {
    s = s.toString().split('').reduce((acc, d) => acc + parseInt(d), 0);
  }
  if (s === 11) return 2;
  if (s === 22) return 4;
  return s;
}

function getProfile(num, map) {
  return map[reduceNum(num)] || map[1];
}

const STYLES = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif; background: #0b0e1a; color: #e2e8f0; padding: 0; }
  .container { max-width: 600px; margin: 24px auto; background: #11142a; border-radius: 20px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); }
  .header { background: linear-gradient(135deg, #1a1a3e 0%, #0f1228 50%, #1a1a3e 100%); padding: 40px 32px 32px; text-align: center; position: relative; overflow: hidden; }
  .header::before { content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle at 30% 40%, rgba(249,115,22,0.06) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(59,130,246,0.06) 0%, transparent 50%); pointer-events: none; }
  .badge-top { display: inline-block; background: rgba(249,115,22,0.12); color: #f97316; padding: 4px 16px; border-radius: 999px; font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 12px; position: relative; }
  .header h1 { font-size: 26px; color: #fff; margin-bottom: 4px; font-weight: 700; letter-spacing: -0.02em; position: relative; }
  .header .subtitle { color: #94a3b8; font-size: 13px; position: relative; }
  .couple-hearts { display: flex; align-items: center; justify-content: center; gap: 12px; margin-top: 16px; position: relative; }
  .couple-hearts .name { font-size: 18px; font-weight: 700; }
  .name-p1 { color: #3b82f6; }
  .name-p2 { color: #f97316; }
  .heart-icon { font-size: 18px; }
  .section { padding: 28px 32px; border-bottom: 1px solid rgba(255,255,255,0.05); }
  .section:last-child { border-bottom: none; }
  .section-title { font-size: 17px; font-weight: 700; margin-bottom: 14px; display: flex; align-items: center; gap: 8px; }
  .section-title .icon { width: 28px; height: 28px; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0; }
  .pct-wrap { text-align: center; padding: 8px 0 4px; }
  .pct-circle { width: 130px; height: 130px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px; position: relative; }
  .pct-circle-inner { width: 108px; height: 108px; border-radius: 50%; background: #11142a; display: flex; flex-direction: column; align-items: center; justify-content: center; }
  .pct-number { font-size: 34px; font-weight: 800; line-height: 1; }
  .pct-label { font-size: 10px; color: #94a3b8; margin-top: 2px; letter-spacing: 0.05em; text-transform: uppercase; }
  .pct-desc { text-align: center; color: #94a3b8; font-size: 13px; line-height: 1.7; max-width: 480px; margin: 0 auto; }
  .pct-desc strong { color: #f97316; }
  .badge-row { display: flex; justify-content: center; gap: 12px; margin: 16px 0 4px; flex-wrap: wrap; }
  .num-badge { display: inline-flex; flex-direction: column; align-items: center; padding: 10px 18px; border-radius: 12px; border: 1px solid; min-width: 80px; }
  .num-badge .nb-num { font-size: 24px; font-weight: 800; line-height: 1.2; }
  .num-badge .nb-label { font-size: 9px; text-transform: uppercase; letter-spacing: 0.06em; opacity: 0.7; }
  .num-badge-orange { background: rgba(249,115,22,0.08); border-color: rgba(249,115,22,0.25); }
  .num-badge-orange .nb-num { color: #f97316; }
  .num-badge-blue { background: rgba(59,130,246,0.08); border-color: rgba(59,130,246,0.25); }
  .num-badge-blue .nb-num { color: #3b82f6; }
  .num-badge-purple { background: rgba(139,92,246,0.08); border-color: rgba(139,92,246,0.25); }
  .num-badge-purple .nb-num { color: #8b5cf6; }
  .num-badge-green { background: rgba(16,185,129,0.08); border-color: rgba(16,185,129,0.25); }
  .num-badge-green .nb-num { color: #10b981; }
  .calc-info { color: #64748b; font-size: 12px; line-height: 1.7; text-align: center; margin-bottom: 10px; }
  .calc-info strong { color: #94a3b8; font-weight: 600; }
  .profile-card { border-left: 3px solid; padding-left: 16px; margin-bottom: 20px; }
  .profile-card:last-child { margin-bottom: 0; }
  .profile-card h3 { font-size: 15px; font-weight: 700; margin-bottom: 8px; }
  .profile-card p { color: #cbd5e1; font-size: 13px; line-height: 1.7; margin-bottom: 10px; }
  .strength { color: #10b981; font-size: 12px; font-weight: 600; margin-top: 8px; margin-bottom: 4px; }
  .weakness { color: #ef4444; font-size: 12px; font-weight: 600; margin-top: 8px; margin-bottom: 4px; }
  .item-list { list-style: none; padding: 0; margin: 0 0 8px 0; }
  .item-list li { color: #94a3b8; font-size: 12px; line-height: 1.6; margin-bottom: 4px; padding-left: 10px; position: relative; }
  .item-list li::before { content: ''; position: absolute; left: 0; top: 7px; width: 4px; height: 4px; border-radius: 50%; }
  .item-list.green li::before { background: #10b981; }
  .item-list.red li::before { background: #ef4444; }
  .item-list.star li::before { background: #3b82f6; }
  .item-list.orange li::before { background: #f97316; }
  .love-box { margin-top: 8px; padding: 10px 14px; border-radius: 8px; font-size: 12.5px; line-height: 1.7; color: #cbd5e1; }
  .compat-block { margin-top: 12px; }
  .compat-block p { color: #cbd5e1; font-size: 13px; line-height: 1.7; margin-bottom: 10px; }
  .compat-conclusion { margin-top: 12px; padding: 12px 16px; border-radius: 8px; border-left: 3px solid #10b981; background: linear-gradient(135deg, rgba(16,185,129,0.06), rgba(59,130,246,0.06)); }
  .compat-conclusion p { color: #cbd5e1; font-size: 12.5px; line-height: 1.7; margin: 0; }
  .compat-conclusion .label { color: #10b981; font-size: 12px; font-weight: 600; margin-bottom: 3px; }
  .divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent); margin: 24px 0; }
  .same-soul-box { margin: 16px 0; padding: 16px 20px; border-radius: 12px; border: 1px solid rgba(139,92,246,0.2); background: linear-gradient(135deg, rgba(139,92,246,0.06), rgba(236,72,153,0.06)); }
  .same-soul-box h3 { color: #8b5cf6; font-size: 15px; margin-bottom: 10px; }
  .same-soul-box p { color: #cbd5e1; font-size: 12.5px; line-height: 1.7; margin-bottom: 6px; }
  .same-soul-box .quote { margin-top: 8px; padding: 10px; background: rgba(139,92,246,0.08); border-radius: 8px; text-align: center; font-style: italic; color: #cbd5e1; font-size: 13px; }
  .energy-card { margin-bottom: 16px; }
  .energy-card h4 { font-size: 14px; font-weight: 700; margin-bottom: 6px; }
  .energy-card p { color: #cbd5e1; font-size: 12.5px; line-height: 1.7; margin-bottom: 6px; }
  .energy-card .highlights-label { color: #3b82f6; font-size: 11px; font-weight: 600; margin-top: 4px; margin-bottom: 2px; }
  .dynamic-text { color: #cbd5e1; font-size: 13px; line-height: 1.7; margin-bottom: 10px; }
  .special-list { list-style: none; padding: 0; margin: 0 0 10px 0; }
  .special-list li { color: #94a3b8; font-size: 12px; line-height: 1.6; margin-bottom: 3px; padding-left: 10px; position: relative; }
  .special-list li::before { content: ''; position: absolute; left: 0; top: 7px; width: 4px; height: 4px; border-radius: 50%; background: #10b981; }
  .challenge-item { margin-bottom: 8px; padding-left: 10px; border-left: 2px solid rgba(239,68,68,0.2); }
  .challenge-item strong { display: block; color: #ef4444; font-size: 12px; margin-bottom: 2px; }
  .challenge-item span { color: #94a3b8; font-size: 12px; line-height: 1.6; }
  .conclusion-box { margin-top: 12px; padding: 14px 18px; border-radius: 8px; background: linear-gradient(135deg, rgba(249,115,22,0.06), rgba(139,92,246,0.06)); }
  .conclusion-box .cl-label { color: #f97316; font-size: 12px; font-weight: 600; margin-bottom: 3px; }
  .conclusion-box p { color: #cbd5e1; font-size: 12.5px; line-height: 1.7; }
  .closing { text-align: center; padding: 24px 32px; background: #0a0c16; }
  .closing p { color: #94a3b8; font-size: 14px; line-height: 1.8; white-space: pre-line; }
  .footer { text-align: center; padding: 16px 32px; }
  .footer p { color: #475569; font-size: 11px; line-height: 1.6; }
  .footer a { color: #64748b; text-decoration: underline; }
`;

function formatDate() {
  return new Date().toLocaleDateString('pt-BR');
}

export function generateReportHtml(lead) {
  const results = calculateCompatibility(lead.nomeP1, lead.dataP1, lead.nomeP2, lead.dataP2);

  const d1 = results.destinyP1;
  const d2 = results.destinyP2;
  const s1 = results.soulNumberP1;
  const s2 = results.soulNumberP2;
  const e1 = results.expressionP1;
  const e2 = results.expressionP2;
  const pct = results.percentage;
  const finalNumber = results.finalNumber;

  const n1 = lead.nomeP1.split(' ')[0];
  const n2 = lead.nomeP2.split(' ')[0];
  const nome1 = lead.nomeP1;
  const nome2 = lead.nomeP2;

  const rd1 = reduceNum(d1);
  const rd2 = reduceNum(d2);
  const rs1 = reduceNum(s1);
  const rs2 = reduceNum(s2);

  const destCoupleFinal = reduceSum(rd1, rd2);
  const soulCoupleFinal = reduceSum(rs1, rs2);

  const perfilDestino1 = getProfile(d1, PERFIL_DESTINO);
  const perfilDestino2 = getProfile(d2, PERFIL_DESTINO);
  const perfilAlma1 = getProfile(s1, PERFIL_ALMA);
  const perfilAlma2 = getProfile(s2, PERFIL_ALMA);

  const compatDestino = COMPATIBILIDADE_DESTINO[destCoupleFinal] || COMPATIBILIDADE_DESTINO[2];
  const compatAlma = COMPATIBILIDADE_ALMA[soulCoupleFinal] || COMPATIBILIDADE_ALMA[2];

  const sameSoul = rs1 === rs2;
  const sameSoulData = sameSoul ? getSameSoulText(nome1, nome2, rs1) : null;

  const intDynamic = getIntimateDynamic(destCoupleFinal, soulCoupleFinal);

  const energiaIntima1 = {
    destino: ENERGIA_INTIMA.destino[rd1] || ENERGIA_INTIMA.destino[1],
    alma: ENERGIA_INTIMA.alma[rs1] || ENERGIA_INTIMA.alma[1],
    destaques: ENERGIA_INTIMA.destaques[rs1] || ENERGIA_INTIMA.destaques[1]
  };
  const energiaIntima2 = {
    destino: ENERGIA_INTIMA.destino[rd2] || ENERGIA_INTIMA.destino[1],
    alma: ENERGIA_INTIMA.alma[rs2] || ENERGIA_INTIMA.alma[1],
    destaques: ENERGIA_INTIMA.destaques[rs2] || ENERGIA_INTIMA.destaques[1]
  };

  const compatibleLevel = pct >= 80 ? 'alta' : pct >= 65 ? 'média' : 'em desenvolvimento';
  const pctColor = pct >= 80 ? '#10b981' : pct >= 65 ? '#f97316' : '#ef4444';

  function itemList(items, cls) {
    if (!items || !items.length) return '';
    return `<ul class="item-list ${cls}">${items.map(i => `<li>${i}</li>`).join('')}</ul>`;
  }

  function renderProfile(name, number, color, perfil, type) {
    const firstName = name.split(' ')[0];
    const label = type === 'destino' ? 'Destino' : 'Alma';
    const loveTitle = type === 'destino' ? `Como ${firstName} vê o amor` : `Visão de ${firstName} sobre o amor`;
    const loveText = type === 'destino' ? perfil.comoVeAmor : perfil.visaoAmor;
    const improveTitle = type === 'destino' ? 'Como melhorar no amor' : 'Sugestão de melhora';
    const improveText = type === 'destino' ? perfil.comoMelhorar : perfil.sugestaoMelhora;
    return `
      <div class="profile-card" style="border-color:${color}">
        <h3 style="color:${color}">${firstName} (${label} ${number})</h3>
        <p>${perfil.descricao}</p>
        <div class="strength">Pontos Fortes</div>
        ${itemList(perfil.pontosFortes, 'green')}
        <div class="weakness">Pontos a Desenvolver</div>
        ${itemList(perfil.pontosFracos, 'red')}
        <div class="love-box" style="background:${color}06">
          <strong style="color:${color};font-size:12px">${loveTitle}</strong><br/>
          ${loveText}
        </div>
        <div class="love-box" style="background:rgba(249,115,22,0.04);margin-top:6px">
          <strong style="color:#f97316;font-size:12px">${improveTitle}</strong><br/>
          ${improveText}
        </div>
      </div>
    `;
  }

  function renderCompat(compat) {
    if (!compat) return '';
    return `
      <div class="compat-block">
        <p>${compat.explicacao}</p>
        <div class="strength">Pontos Positivos</div>
        ${itemList(compat.pontosPositivos, 'green')}
        <div class="weakness">Desafios</div>
        ${itemList(compat.desafios, 'red')}
        <div class="compat-conclusion">
          <div class="label">Conclusão</div>
          <p>${compat.conclusao}</p>
        </div>
      </div>
    `;
  }

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mapa de Compatibilidade — ${n1} & ${n2}</title>
  <style>${STYLES}</style>
</head>
<body>
  <div class="container">

    <!-- ═══ CAPA ═══ -->
    <div class="header">
      <div class="badge-top">✨ Mapa do Casal</div>
      <h1>Mapa de Compatibilidade</h1>
      <p class="subtitle">Análise numerológica completa do casal</p>
      <div class="couple-hearts">
        <span class="name name-p1">${n1}</span>
        <span class="heart-icon">💫</span>
        <span class="name name-p2">${n2}</span>
      </div>
    </div>

    <!-- ═══ VISÃO GERAL ═══ -->
    <div class="section">
      <div class="section-title">
        <span class="icon" style="background:rgba(249,115,22,0.12);color:#f97316">◆</span>
        Visão Geral
      </div>
      <p style="color:#cbd5e1;font-size:13.5px;line-height:1.8;text-align:center;">
        ${n1} e ${n2}, aqui está o mapa de compatibilidade amorosa de vocês, baseado nos números do destino e da alma. Este relatório explora as energias individuais de cada um e como elas se conectam, revelando os pontos fortes da relação e os aspectos que podem ser cultivados para um relacionamento mais consciente e equilibrado.
      </p>

      <div class="pct-wrap">
        <div class="pct-circle" style="background:conic-gradient(${pctColor} ${pct}%, #1e2040 ${pct}%)">
          <div class="pct-circle-inner">
            <div class="pct-number" style="color:${pctColor}">${pct}%</div>
            <div class="pct-label">Compatibilidade</div>
          </div>
        </div>
        <p class="pct-desc">
          A compatibilidade entre ${nome1} e ${nome2} foi classificada como <strong style="color:${pctColor}">${compatibleLevel}</strong>. Este percentual reflete a combinação das energias individuais de cada um e a forma como elas se complementam.
        </p>
      </div>

      <div class="badge-row">
        <div class="num-badge num-badge-orange">
          <span class="nb-num">${finalNumber}</span>
          <span class="nb-label">Nº do Casal</span>
        </div>
        <div class="num-badge num-badge-blue">
          <span class="nb-num">${destCoupleFinal}</span>
          <span class="nb-label">Destino</span>
        </div>
        <div class="num-badge num-badge-purple">
          <span class="nb-num">${soulCoupleFinal}</span>
          <span class="nb-label">Alma</span>
        </div>
      </div>
    </div>

    <!-- ═══ DESTINO DO CASAL ═══ -->
    <div class="section">
      <div class="section-title">
        <span class="icon" style="background:rgba(59,130,246,0.12);color:#3b82f6">◈</span>
        <span style="color:#3b82f6">Número de Destino do Casal</span>
      </div>
      <p style="color:#94a3b8;font-size:13px;line-height:1.7;margin-bottom:12px;">
        O número de destino do casal revela o propósito central da relação — a missão que vocês vieram cumprir juntos e as dinâmicas que definirão a jornada de vocês.
      </p>
      <p class="calc-info">
        Destino de ${n1}: <strong>${d1}</strong> + Destino de ${n2}: <strong>${d2}</strong><br/>
        ${rd1} + ${rd2} = <strong>${destCoupleFinal}</strong>
      </p>
      <div class="badge-row">
        <div class="num-badge num-badge-blue">
          <span class="nb-num">${destCoupleFinal}</span>
          <span class="nb-label">Destino do Casal</span>
        </div>
      </div>

      <div style="margin-top:16px">
        <p style="color:#3b82f6;font-size:13px;font-weight:600;margin-bottom:4px">Significado: ${MEANINGS[destCoupleFinal]?.name || ''}</p>
        <p style="color:#94a3b8;font-size:12.5px;line-height:1.7">${MEANINGS[destCoupleFinal]?.destiny || ''}</p>
      </div>

      <div class="divider"></div>

      <h3 style="color:#fff;font-size:14px;font-weight:700;margin-bottom:14px">Perfis Individuais de Destino</h3>
      ${renderProfile(nome1, d1, '#3b82f6', perfilDestino1, 'destino')}
      <div style="height:12px"></div>
      ${renderProfile(nome2, d2, '#f97316', perfilDestino2, 'destino')}

      <div class="divider"></div>

      <h3 style="color:#fff;font-size:14px;font-weight:700;margin-bottom:8px">Compatibilidade de Destino</h3>
      <p class="calc-info">${rd1} + ${rd2} = ${rd1 + rd2} → <strong>${destCoupleFinal}</strong></p>
      ${renderCompat(compatDestino)}
    </div>

    <!-- ═══ ALMA DO CASAL ═══ -->
    <div class="section">
      <div class="section-title">
        <span class="icon" style="background:rgba(139,92,246,0.12);color:#8b5cf6">◇</span>
        <span style="color:#8b5cf6">Número de Alma do Casal</span>
      </div>
      <p style="color:#94a3b8;font-size:13px;line-height:1.7;margin-bottom:12px;">
        O número de alma do casal revela os desejos mais profundos de vocês como par — a conexão emocional, os sonhos compartilhados e o que realmente alimenta a relação em nível íntimo.
      </p>
      <p class="calc-info">
        Alma de ${n1}: <strong>${s1}</strong> + Alma de ${n2}: <strong>${s2}</strong><br/>
        ${rs1} + ${rs2} = <strong>${soulCoupleFinal}</strong>
      </p>
      <div class="badge-row">
        <div class="num-badge num-badge-purple">
          <span class="nb-num">${soulCoupleFinal}</span>
          <span class="nb-label">Alma do Casal</span>
        </div>
      </div>

      <div style="margin-top:16px">
        <p style="color:#8b5cf6;font-size:13px;font-weight:600;margin-bottom:4px">Significado: ${MEANINGS[soulCoupleFinal]?.name || ''}</p>
        <p style="color:#94a3b8;font-size:12.5px;line-height:1.7">${MEANINGS[soulCoupleFinal]?.soul || ''}</p>
      </div>

      <div class="divider"></div>

      <h3 style="color:#fff;font-size:14px;font-weight:700;margin-bottom:14px">Perfis Individuais de Alma</h3>
      ${renderProfile(nome1, s1, '#8b5cf6', perfilAlma1, 'alma')}
      <div style="height:12px"></div>
      ${renderProfile(nome2, s2, '#ec4899', perfilAlma2, 'alma')}

      ${sameSoul && sameSoulData ? `
      <div class="same-soul-box">
        <h3>★ ${sameSoulData.title}</h3>
        <p>${sameSoulData.intro}</p>
        ${sameSoulData.body.map(p => `<p>${p}</p>`).join('')}
        ${sameSoulData.desafios.map(p => `<p style="padding-left:10px;border-left:2px solid rgba(139,92,246,0.3)">${p}</p>`).join('')}
        <div class="quote">"${sameSoulData.mensagemFinal}"</div>
      </div>
      ` : ''}

      <div class="divider"></div>

      <h3 style="color:#fff;font-size:14px;font-weight:700;margin-bottom:8px">Compatibilidade de Almas</h3>
      <p class="calc-info">${rs1} + ${rs2} = ${rs1 + rs2} → <strong>${soulCoupleFinal}</strong></p>
      ${renderCompat(compatAlma)}
    </div>

    <!-- ═══ COMPATIBILIDADE ÍNTIMA ═══ -->
    <div class="section">
      <div class="section-title">
        <span class="icon" style="background:rgba(249,115,22,0.12);color:#f97316">♥</span>
        <span style="color:#f97316">Compatibilidade Íntima</span>
      </div>

      <p style="color:#cbd5e1;font-size:13px;line-height:1.7;margin-bottom:14px">
        Quando ${n1} e ${n2} se encontram na intimidade, a energia de vocês cria uma dinâmica única. A química entre vocês não é apenas física — é emocional e energética. Cada um traz sua assinatura energética para a relação.
      </p>

      <div class="energy-card">
        <h4 style="color:#3b82f6">Energia de ${n1} (Destino ${d1} · Alma ${s1})</h4>
        <p>${energiaIntima1.destino} ${energiaIntima1.alma}</p>
        <div class="highlights-label">O que a destaca:</div>
        <ul class="item-list star">${energiaIntima1.destaques.map(i => `<li>${i}</li>`).join('')}</ul>
      </div>

      <div class="divider" style="margin:12px 0"></div>

      <div class="energy-card">
        <h4 style="color:#f97316">Energia de ${n2} (Destino ${d2} · Alma ${s2})</h4>
        <p>${energiaIntima2.destino} ${energiaIntima2.alma}</p>
        <div class="highlights-label">O que o destaca:</div>
        <ul class="item-list orange">${energiaIntima2.destaques.map(i => `<li>${i}</li>`).join('')}</ul>
      </div>

      <h4 style="color:#fff;font-size:14px;font-weight:700;margin:16px 0 8px">A Dinâmica Entre Vocês</h4>
      <p class="dynamic-text">${intDynamic.dinâmica}</p>

      <p style="color:#10b981;font-size:12px;font-weight:600;margin-bottom:4px">O que torna essa relação especial</p>
      <ul class="special-list">${intDynamic.especial.map(i => `<li>${i}</li>`).join('')}</ul>

      <p style="color:#ef4444;font-size:12px;font-weight:600;margin-top:10px;margin-bottom:6px">Desafios e Como Superá-los</p>
      ${intDynamic.desafios.map(d => `
        <div class="challenge-item">
          <strong>${d.titulo}</strong>
          <span>${d.texto}</span>
        </div>
      `).join('')}

      <div class="conclusion-box">
        <div class="cl-label">Conclusão</div>
        <p>A intimidade entre vocês é marcada por uma combinação única de prazer, confiança e conexão emocional. A troca de energia entre ${n1} e ${n2} cria uma sintonia rara. Ao equilibrar as forças individuais de cada um, a relação de vocês tem tudo para ser repleta de momentos intensos e verdadeiramente satisfatórios.</p>
      </div>
    </div>

    <!-- ═══ ENCERRAMENTO ═══ -->
    <div class="closing">
      <p>${ENCERRAMENTO.mensagem}</p>
      <p style="margin-top:12px;color:#64748b;font-size:13px">Use este mapa como ferramenta de autoconhecimento e crescimento — para que a relação de vocês continue evoluindo com consciência e propósito.</p>
    </div>

    <!-- ═══ RODAPÉ ═══ -->
    <div class="footer">
      <p>Documento gerado em ${formatDate()} para ${lead.email}</p>
      <p style="margin-top:2px">Teste de Afinidade — Mapa de Compatibilidade de Casal © ${new Date().getFullYear()}</p>
    </div>

  </div>
</body>
</html>`;
}
