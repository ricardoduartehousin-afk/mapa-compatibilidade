import React, { useState, useRef } from 'react';
import { Heart, ArrowLeft, Download, Share2, Check, Sparkles, Star, Compass, Gem, CheckCircle, AlertTriangle } from 'lucide-react';
import {
  PERFIL_DESTINO,
  PERFIL_ALMA,
  COMPATIBILIDADE_DESTINO,
  COMPATIBILIDADE_ALMA,
  getSameSoulText,
  ENERGIA_INTIMA,
  getIntimateDynamic,
  ENCERRAMENTO
} from '../utils/mapaDoCasalContent';

function reduceNum(num) {
  if (num <= 9) return num;
  if (num === 11) return 2;
  if (num === 22) return 4;
  const sum = num.toString().split('').reduce((a, b) => a + parseInt(b), 0);
  return sum > 9 ? sum.toString().split('').reduce((a, b) => a + parseInt(b), 0) : sum;
}

function getProfile(num, map) {
  const n = reduceNum(num);
  return map[n] || map[1];
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

const SECTIONS = [
  { key: 'visaoGeral', icon: Compass, title: 'Destino do Casal', color: '#f97316' },
  { key: 'perfis', icon: Star, title: 'Perfis Individuais', color: '#3b82f6' },
  { key: 'compatibilidade', icon: Heart, title: 'Compatibilidade', color: '#10b981' },
  { key: 'alma', icon: Gem, title: 'Número de Alma do Casal', color: '#8b5cf6' },
  { key: 'intimidade', icon: Heart, title: 'Compatibilidade Íntima', color: '#f97316' },
];

export default function FullReport({ data, results, onReset }) {
  const [copiedLink, setCopiedLink] = useState(false);
  const reportRef = useRef(null);

  const n1 = data.nomeP1.split(' ')[0];
  const n2 = data.nomeP2.split(' ')[0];
  const nomeCompleto1 = data.nomeP1;
  const nomeCompleto2 = data.nomeP2;

  const d1 = results.destinyP1;
  const d2 = results.destinyP2;
  const s1 = results.soulNumberP1;
  const s2 = results.soulNumberP2;

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
  const sameSoulData = sameSoul ? getSameSoulText(nomeCompleto1, nomeCompleto2, rs1) : null;

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

  const handlePrint = () => {
    alert("Para gerar o PDF, certifique-se de selecionar 'Salvar como PDF' na tela de impressão do seu navegador.");
    window.print();
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}?ref=testedeafinidade&p1=${encodeURIComponent(data.nomeP1)}&p2=${encodeURIComponent(data.nomeP2)}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Nosso Mapa de Compatibilidade', text: `Fizemos nosso mapa de compatibilidade amorosa!`, url: shareUrl });
      } catch (err) { console.log('Compartilhamento cancelado', err); }
    } else {
      navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div ref={reportRef} className="glass-panel" style={{ maxWidth: '100%', padding: '3rem 2rem', borderRadius: '0' }}>
        <div className="report-header">
          <span className="report-badge">
            <Sparkles size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
            Mapa do Casal — Análise Completa
          </span>
          <h2 className="report-title" style={{ fontSize: '1.6rem' }}>
            Mapa de Compatibilidade Amorosa
          </h2>
          <div className="couple-names-badge">
            <span>{n1}</span>
            <Heart size={14} fill="var(--accent-orange)" style={{ color: 'var(--accent-orange)' }} />
            <span>{n2}</span>
          </div>
        </div>

        <div className="card-grid">
          <div className="stat-card">
            <span className="stat-card-title">Afinidade Geral</span>
            <div className="stat-card-val highlight" style={{ fontSize: '1.8rem' }}>{results.percentage}%</div>
          </div>
          <div className="stat-card">
            <span className="stat-card-title">Número do Casal</span>
            <div className="stat-card-val" style={{ fontSize: '1.8rem', color: '#10b981' }}>{results.finalNumber}</div>
          </div>
        </div>

        {/* ─── INTRO ─── */}
        <p style={{ color: '#cbd5e1', lineHeight: 1.7, fontSize: '0.95rem', textAlign: 'center', margin: '2rem 0' }}>
          {n1}! Aqui está o seu mapa de compatibilidade amorosa com {n2}, com base nos números de destino e alma de vocês. Vamos explorar as energias de cada um e como elas se conectam, criando um panorama de harmonia e desafios para o relacionamento de vocês. Esse mapa tem o intuito de te ajudar a compreender melhor os pontos fortes da relação e os aspectos que podem precisar de mais atenção, para que o relacionamento de vocês cresça e evolua com equilíbrio.
        </p>

        <div className="section-divider" style={{ margin: '2.5rem 0' }} />

        {/* ═══ 1. DESTINO DO CASAL ═══ */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>
            NÚMERO DE DESTINO DO CASAL
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '0.5rem' }}>
            O número de destino do casal é uma maneira de entender a energia que você e {n2} compartilham como parceiros. Ele reflete o propósito e as dinâmicas centrais do relacionamento de vocês, mostrando o que essa união representa e os caminhos que podem trilhar juntos.
          </p>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1rem' }}>
            <strong>Como funciona?</strong> Cada um tem seu número de destino individual (o seu é {d1}, e o dele(a) é {d2}). Esses números refletem quem vocês são como indivíduos. Mas, quando somamos esses números, criamos um terceiro número: o número de destino do casal ({rd1} + {rd2} = {rd1 + rd2} → {destCoupleFinal}), que mostra o que vocês representam como uma unidade.
          </p>

          <div style={{ textAlign: 'center', margin: '1.5rem 0' }}>
            <span style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(249,115,22,0.1)', border: '2px solid rgba(249,115,22,0.3)', borderRadius: '50%', width: '80px', height: '80px', justifyContent: 'center' }}>
              <span style={{ fontSize: '2rem', fontWeight: 700, color: '#f97316', lineHeight: 1 }}>{destCoupleFinal}</span>
              <span style={{ fontSize: '0.65rem', color: '#94a3b8' }}>Destino do Casal</span>
            </span>
          </div>

          {/* Perfil Pessoa 1 */}
          <div className="profile-block" style={{ borderLeft: '3px solid #3b82f6', paddingLeft: '1rem', marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#3b82f6', fontSize: '1.2rem' }}>{n1} (Número de Destino {d1})</h3>
            <p style={{ color: '#cbd5e1', lineHeight: 1.7, fontSize: '0.9rem' }}>{perfilDestino1.descricao}</p>
            <h4 style={{ color: '#10b981', fontSize: '0.95rem', marginTop: '0.75rem' }}>Pontos Fortes</h4>
            {perfilDestino1.pontosFortes.map((item, i) => (
              <p key={`f1-${i}`} style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, paddingLeft: '0.75rem' }}>
                <CheckCircle size={10} style={{ color: '#10b981', display: 'inline', marginRight: '6px' }} />
                <strong>{item.split(':')[0]}:</strong> {item.split(':').slice(1).join(':')}
              </p>
            ))}
            <h4 style={{ color: '#ef4444', fontSize: '0.95rem', marginTop: '0.75rem' }}>Pontos Fracos</h4>
            {perfilDestino1.pontosFracos.map((item, i) => (
              <p key={`w1-${i}`} style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, paddingLeft: '0.75rem' }}>
                <AlertTriangle size={10} style={{ color: '#ef4444', display: 'inline', marginRight: '6px' }} />
                <strong>{item.split(':')[0]}:</strong> {item.split(':').slice(1).join(':')}
              </p>
            ))}
          </div>

          <div style={{ textAlign: 'center', margin: '1rem 0' }}>
            <Heart size={16} fill="var(--accent-orange)" style={{ color: 'var(--accent-orange)', opacity: 0.4 }} />
          </div>

          {/* Perfil Pessoa 2 */}
          <div className="profile-block" style={{ borderLeft: '3px solid #f97316', paddingLeft: '1rem', marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#f97316', fontSize: '1.2rem' }}>{n2} (Número de Destino {d2})</h3>
            <p style={{ color: '#cbd5e1', lineHeight: 1.7, fontSize: '0.9rem' }}>{perfilDestino2.descricao}</p>
            <h4 style={{ color: '#10b981', fontSize: '0.95rem', marginTop: '0.75rem' }}>Pontos Fortes</h4>
            {perfilDestino2.pontosFortes.map((item, i) => (
              <p key={`f2-${i}`} style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, paddingLeft: '0.75rem' }}>
                <CheckCircle size={10} style={{ color: '#10b981', display: 'inline', marginRight: '6px' }} />
                <strong>{item.split(':')[0]}:</strong> {item.split(':').slice(1).join(':')}
              </p>
            ))}
            <h4 style={{ color: '#ef4444', fontSize: '0.95rem', marginTop: '0.75rem' }}>Pontos Fracos</h4>
            {perfilDestino2.pontosFracos.map((item, i) => (
              <p key={`w2-${i}`} style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, paddingLeft: '0.75rem' }}>
                <AlertTriangle size={10} style={{ color: '#ef4444', display: 'inline', marginRight: '6px' }} />
                <strong>{item.split(':')[0]}:</strong> {item.split(':').slice(1).join(':')}
              </p>
            ))}
          </div>

          {/* Compatibilidade */}
          <h3 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '0.75rem' }}>
            Compatibilidade Entre {n1} ({d1}) e {n2} ({d2})
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
            Somatória dos Números de Destino: {rd1} + {rd2} = {rd1 + rd2} → {destCoupleFinal}
          </p>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: '0.75rem' }}>{compatDestino.explicacao}</p>
          {compatDestino.pontosPositivos.map((item, i) => (
            <p key={`cp-${i}`} style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, paddingLeft: '0.75rem' }}>
              <CheckCircle size={10} style={{ color: '#10b981', display: 'inline', marginRight: '6px' }} />
              <strong>{item.split(':')[0]}:</strong> {item.split(':').slice(1).join(':')}
            </p>
          ))}
          {compatDestino.desafios.map((item, i) => (
            <p key={`cd-${i}`} style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, paddingLeft: '0.75rem' }}>
              <AlertTriangle size={10} style={{ color: '#ef4444', display: 'inline', marginRight: '6px' }} />
              <strong>{item.split(':')[0]}:</strong> {item.split(':').slice(1).join(':')}
            </p>
          ))}
          <div style={{ marginTop: '0.75rem', padding: '0.75rem', background: 'rgba(16,185,129,0.08)', borderRadius: '8px' }}>
            <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.6 }}><strong style={{ color: '#10b981' }}>Conclusão:</strong> {compatDestino.conclusao}</p>
          </div>
        </div>

        <div className="section-divider" style={{ margin: '2.5rem 0' }} />

        {/* ═══ 2. ALMA DO CASAL ═══ */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>
            NÚMERO DE ALMA DO CASAL
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '0.5rem' }}>
            O Número de Alma do Casal revela os desejos mais profundos e a conexão emocional e espiritual entre você e {n2}. Ele mostra os sonhos e necessidades que vocês têm como parceiros, o tipo de vínculo emocional que buscam e o que realmente os faz se sentir realizados e conectados.
          </p>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1rem' }}>
            Esse número influencia como vocês se conectam, compartilham sentimentos e enfrentam desafios juntos. Ele ajuda a alinhar os anseios de ambos, criando uma base sólida de apoio emocional e compreensão, o que torna a relação única e especial.
          </p>

          <div style={{ textAlign: 'center', margin: '1.5rem 0' }}>
            <span style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(139,92,246,0.1)', border: '2px solid rgba(139,92,246,0.3)', borderRadius: '50%', width: '80px', height: '80px', justifyContent: 'center' }}>
              <span style={{ fontSize: '2rem', fontWeight: 700, color: '#8b5cf6', lineHeight: 1 }}>{soulCoupleFinal}</span>
              <span style={{ fontSize: '0.65rem', color: '#94a3b8' }}>Alma do Casal</span>
            </span>
          </div>

          {/* Perfil Alma 1 */}
          <div className="profile-block" style={{ borderLeft: '3px solid #8b5cf6', paddingLeft: '1rem', marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#8b5cf6', fontSize: '1.2rem' }}>{n1} (Número de Alma {s1})</h3>
            <p style={{ color: '#cbd5e1', lineHeight: 1.7, fontSize: '0.9rem' }}>{perfilAlma1.descricao}</p>
            <h4 style={{ color: '#10b981', fontSize: '0.95rem', marginTop: '0.75rem' }}>Pontos Fortes</h4>
            {perfilAlma1.pontosFortes.map((item, i) => (
              <p key={`af1-${i}`} style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, paddingLeft: '0.75rem' }}>
                <CheckCircle size={10} style={{ color: '#10b981', display: 'inline', marginRight: '6px' }} />
                <strong>{item.split(':')[0]}:</strong> {item.split(':').slice(1).join(':')}
              </p>
            ))}
            <h4 style={{ color: '#ef4444', fontSize: '0.95rem', marginTop: '0.75rem' }}>Pontos Fracos</h4>
            {perfilAlma1.pontosFracos.map((item, i) => (
              <p key={`aw1-${i}`} style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, paddingLeft: '0.75rem' }}>
                <AlertTriangle size={10} style={{ color: '#ef4444', display: 'inline', marginRight: '6px' }} />
                <strong>{item.split(':')[0]}:</strong> {item.split(':').slice(1).join(':')}
              </p>
            ))}
          </div>

          <div style={{ textAlign: 'center', margin: '1rem 0' }}>
            <Heart size={16} fill="var(--accent-orange)" style={{ color: 'var(--accent-orange)', opacity: 0.4 }} />
          </div>

          {/* Perfil Alma 2 */}
          <div className="profile-block" style={{ borderLeft: '3px solid #ec4899', paddingLeft: '1rem', marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#ec4899', fontSize: '1.2rem' }}>{n2} (Número de Alma {s2})</h3>
            <p style={{ color: '#cbd5e1', lineHeight: 1.7, fontSize: '0.9rem' }}>{perfilAlma2.descricao}</p>
            <h4 style={{ color: '#10b981', fontSize: '0.95rem', marginTop: '0.75rem' }}>Pontos Fortes</h4>
            {perfilAlma2.pontosFortes.map((item, i) => (
              <p key={`af2-${i}`} style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, paddingLeft: '0.75rem' }}>
                <CheckCircle size={10} style={{ color: '#10b981', display: 'inline', marginRight: '6px' }} />
                <strong>{item.split(':')[0]}:</strong> {item.split(':').slice(1).join(':')}
              </p>
            ))}
            <h4 style={{ color: '#ef4444', fontSize: '0.95rem', marginTop: '0.75rem' }}>Pontos Fracos</h4>
            {perfilAlma2.pontosFracos.map((item, i) => (
              <p key={`aw2-${i}`} style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, paddingLeft: '0.75rem' }}>
                <AlertTriangle size={10} style={{ color: '#ef4444', display: 'inline', marginRight: '6px' }} />
                <strong>{item.split(':')[0]}:</strong> {item.split(':').slice(1).join(':')}
              </p>
            ))}
          </div>

          {/* Almas Gêmeas */}
          {sameSoul && sameSoulData && (
            <div style={{ margin: '2rem 0', padding: '1.5rem', background: 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(236,72,153,0.08))', borderRadius: '12px', border: '1px solid rgba(139,92,246,0.2)' }}>
              <h3 style={{ color: '#8b5cf6', fontSize: '1.1rem', marginBottom: '0.75rem' }}>
                <Star size={16} style={{ display: 'inline', marginRight: '6px' }} />
                {sameSoulData.title}
              </h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '0.5rem' }}>{sameSoulData.intro}</p>
              {sameSoulData.body.map((p, i) => (
                <p key={`ss-${i}`} style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '0.5rem' }}>{p}</p>
              ))}
              {sameSoulData.desafios.map((p, i) => (
                <p key={`sd-${i}`} style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '0.5rem', paddingLeft: '0.75rem', borderLeft: '2px solid rgba(139,92,246,0.3)' }}>{p}</p>
              ))}
              <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(139,92,246,0.1)', borderRadius: '8px', textAlign: 'center' }}>
                <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: 1.6, fontStyle: 'italic' }}>"{sameSoulData.mensagemFinal}"</p>
              </div>
            </div>
          )}

          {/* Compatibilidade de Alma */}
          <h3 style={{ color: '#fff', fontSize: '1.1rem', margin: '1.5rem 0 0.75rem' }}>
            Compatibilidade Entre {n1} ({s1}) e {n2} ({s2})
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
            Somatória dos Números de Alma: {rs1} + {rs2} = {rs1 + rs2} → {soulCoupleFinal}
          </p>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: '0.75rem' }}>{compatAlma.explicacao}</p>
          {compatAlma.pontosPositivos.map((item, i) => (
            <p key={`ap-${i}`} style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, paddingLeft: '0.75rem' }}>
              <CheckCircle size={10} style={{ color: '#10b981', display: 'inline', marginRight: '6px' }} />
              <strong>{item.split(':')[0]}:</strong> {item.split(':').slice(1).join(':')}
            </p>
          ))}
          {compatAlma.desafios.map((item, i) => (
            <p key={`ad-${i}`} style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, paddingLeft: '0.75rem' }}>
              <AlertTriangle size={10} style={{ color: '#ef4444', display: 'inline', marginRight: '6px' }} />
              <strong>{item.split(':')[0]}:</strong> {item.split(':').slice(1).join(':')}
            </p>
          ))}
          <div style={{ marginTop: '0.75rem', padding: '0.75rem', background: 'rgba(139,92,246,0.08)', borderRadius: '8px' }}>
            <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.6 }}><strong style={{ color: '#8b5cf6' }}>Conclusão:</strong> {compatAlma.conclusao}</p>
          </div>
        </div>

        <div className="section-divider" style={{ margin: '2.5rem 0' }} />

        {/* ═══ 3. COMPATIBILIDADE ÍNTIMA ═══ */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>
            COMPATIBILIDADE ÍNTIMA DO CASAL
          </h2>

          <p style={{ color: '#cbd5e1', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: '1rem' }}>
            Quando você e {n2} se encontram, a energia de vocês é única. A química entre vocês não é apenas física, é emocional e espiritual. Aqui, as energias se misturam de forma poderosa, criando uma dinâmica onde cada um pode se expressar livremente, sem medo de ser quem realmente é.
          </p>

          <h3 style={{ color: '#3b82f6', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Sua Energia (Destino {d1} e Alma {s1})</h3>
          <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '0.5rem' }}>
            {energiaIntima1.destino} {energiaIntima1.alma}
          </p>
          <p style={{ color: '#3b82f6', fontSize: '0.85rem', marginTop: '0.5rem', marginBottom: '0.25rem' }}>O que te destaca:</p>
          {energiaIntima1.destaques.map((item, i) => (
            <p key={`ei1-${i}`} style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, paddingLeft: '0.75rem' }}>
              <Star size={10} style={{ color: '#3b82f6', display: 'inline', marginRight: '6px' }} />
              {item}
            </p>
          ))}

          <div style={{ textAlign: 'center', margin: '1rem 0' }}>
            <Heart size={16} fill="var(--accent-orange)" style={{ color: 'var(--accent-orange)', opacity: 0.4 }} />
          </div>

          <h3 style={{ color: '#f97316', fontSize: '1.1rem', marginBottom: '0.5rem' }}>A Energia d{n2} (Destino {d2} e Alma {s2})</h3>
          <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '0.5rem' }}>
            {energiaIntima2.destino} {energiaIntima2.alma}
          </p>
          <p style={{ color: '#f97316', fontSize: '0.85rem', marginTop: '0.5rem', marginBottom: '0.25rem' }}>O que o destaca:</p>
          {energiaIntima2.destaques.map((item, i) => (
            <p key={`ei2-${i}`} style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, paddingLeft: '0.75rem' }}>
              <Star size={10} style={{ color: '#f97316', display: 'inline', marginRight: '6px' }} />
              {item}
            </p>
          ))}

          <h3 style={{ color: '#fff', fontSize: '1.1rem', margin: '1.5rem 0 0.75rem' }}>A Dinâmica Íntima Entre Vocês</h3>
          <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '0.75rem' }}>{intDynamic.dinâmica}</p>

          <p style={{ color: '#10b981', fontSize: '0.85rem', marginBottom: '0.25rem' }}>O que torna essa relação especial:</p>
          {intDynamic.especial.map((item, i) => (
            <p key={`esp-${i}`} style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, paddingLeft: '0.75rem' }}>
              <CheckCircle size={10} style={{ color: '#10b981', display: 'inline', marginRight: '6px' }} />
              {item}
            </p>
          ))}

          <p style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '1rem', marginBottom: '0.25rem' }}>Desafios e Como Superá-los</p>
          {intDynamic.desafios.map((desafio, i) => (
            <p key={`des-${i}`} style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '0.5rem', paddingLeft: '0.75rem', borderLeft: '2px solid rgba(239,68,68,0.2)' }}>
              <strong>{desafio.titulo}:</strong> {desafio.texto}
            </p>
          ))}

          <div style={{ marginTop: '1rem', padding: '1rem', background: 'linear-gradient(135deg, rgba(249,115,22,0.08), rgba(139,92,246,0.08))', borderRadius: '8px' }}>
            <p style={{ color: '#f97316', fontSize: '0.9rem', marginBottom: '0.3rem' }}><strong>Conclusão</strong></p>
            <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.6 }}>
              A intimidade entre vocês é marcada por uma combinação de prazer, confiança e conexão emocional. A troca de energia entre vocês cria uma sintonia que é difícil de encontrar. Se souberem equilibrar as forças de liderança e exploração, a relação de vocês será repleta de momentos intensos, inesquecíveis e verdadeiramente satisfatórios.
            </p>
          </div>
        </div>

        {/* ─── ENCERRAMENTO ─── */}
        <div style={{ textAlign: 'center', padding: '2rem 0 1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
            {ENCERRAMENTO.mensagem}
          </p>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '10px',
          padding: '1rem',
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          textAlign: 'center',
          marginTop: '2rem'
        }}>
          Este é um documento confidencial gerado terapeuticamente em {new Date().toLocaleDateString('pt-BR')} para {data.email}.
        </div>
      </div>

      {/* ── BOTÕES ── */}
      <div className="report-actions no-print" style={{ marginTop: '1.5rem' }}>
        <button onClick={handlePrint} className="btn btn-secondary" style={{ flex: 1, background: '#3b82f6', color: 'white', border: 'none' }}>
          <Download size={16} />
          Salvar como PDF
        </button>
        <button onClick={handleShare} className="btn btn-secondary" style={{ flex: 1 }}>
          {copiedLink ? <Check size={16} style={{ color: '#10b981' }} /> : <Share2 size={16} />}
          {copiedLink ? 'Link Copiado!' : 'Compartilhar Relatório'}
        </button>
      </div>

      <button onClick={onReset} className="btn btn-orange no-print" style={{ marginTop: '1.5rem', width: '100%' }}>
        <ArrowLeft size={16} />
        Fazer Nova Consulta
      </button>
    </div>
  );
}
