import React, { useRef, useState } from 'react';
import { Download, Heart, ArrowLeft, Sparkles, Star, Compass, Gem, CheckCircle, AlertTriangle } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
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

function SectionTitle({ icon: Icon, title, color = '#f97316' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
      <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon size={20} color={color} />
      </div>
      <h2 style={{ color: '#fff', fontSize: '1.3rem', margin: 0, fontFamily: 'var(--font-serif)' }}>{title}</h2>
    </div>
  );
}

function ProfileBox({ name, number, color, perfil, type }) {
  const firstName = name.split(' ')[0];
  return (
    <div style={{ borderLeft: `3px solid ${color}`, paddingLeft: '16px', marginBottom: '20px' }}>
      <h3 style={{ color, fontSize: '1.05rem', marginBottom: '8px' }}>{firstName} (Número de {type === 'destino' ? 'Destino' : 'Alma'} {number})</h3>
      <p style={{ color: '#cbd5e1', lineHeight: 1.7, fontSize: '0.92rem', marginBottom: '12px' }}>{perfil.descricao}</p>

      <h4 style={{ color: '#10b981', fontSize: '0.9rem', marginBottom: '6px' }}>Pontos Fortes</h4>
      {perfil.pontosFortes.map((item, i) => (
        <p key={`f-${i}`} style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '4px', paddingLeft: '10px' }}>
          <CheckCircle size={10} color="#10b981" style={{ display: 'inline', marginRight: '6px' }} />
          <strong>{item.split(':')[0]}:</strong> {item.split(':').slice(1).join(':')}
        </p>
      ))}

      <h4 style={{ color: '#ef4444', fontSize: '0.9rem', marginBottom: '6px', marginTop: '10px' }}>Pontos Fracos</h4>
      {perfil.pontosFracos.map((item, i) => (
        <p key={`w-${i}`} style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '4px', paddingLeft: '10px' }}>
          <AlertTriangle size={10} color="#ef4444" style={{ display: 'inline', marginRight: '6px' }} />
          <strong>{item.split(':')[0]}:</strong> {item.split(':').slice(1).join(':')}
        </p>
      ))}

      {type === 'destino' && perfil.comoVeAmor && (
        <div style={{ marginTop: '10px', background: `${color}08`, padding: '10px 14px', borderRadius: '8px' }}>
          <p style={{ color, fontSize: '0.82rem', marginBottom: '4px', fontWeight: 600 }}>Como {firstName} vê o amor</p>
          <p style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: 1.6 }}>{perfil.comoVeAmor}</p>
        </div>
      )}
      {type === 'destino' && perfil.comoMelhorar && (
        <div style={{ marginTop: '6px', background: 'rgba(249,115,22,0.06)', padding: '10px 14px', borderRadius: '8px' }}>
          <p style={{ color: '#f97316', fontSize: '0.82rem', marginBottom: '4px', fontWeight: 600 }}>Como melhorar no amor</p>
          <p style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: 1.6 }}>{perfil.comoMelhorar}</p>
        </div>
      )}

      {type === 'alma' && perfil.visaoAmor && (
        <div style={{ marginTop: '10px', background: `${color}08`, padding: '10px 14px', borderRadius: '8px' }}>
          <p style={{ color, fontSize: '0.82rem', marginBottom: '4px', fontWeight: 600 }}>Visão de {firstName} sobre o amor</p>
          <p style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: 1.6 }}>{perfil.visaoAmor}</p>
        </div>
      )}
      {type === 'alma' && perfil.sugestaoMelhora && (
        <div style={{ marginTop: '6px', background: 'rgba(249,115,22,0.06)', padding: '10px 14px', borderRadius: '8px' }}>
          <p style={{ color: '#f97316', fontSize: '0.82rem', marginBottom: '4px', fontWeight: 600 }}>Sugestão de melhora no amor</p>
          <p style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: 1.6 }}>{perfil.sugestaoMelhora}</p>
        </div>
      )}
    </div>
  );
}

function CompatBlock({ compat }) {
  if (!compat) return null;
  return (
    <div>
      <p style={{ color: '#cbd5e1', lineHeight: 1.7, fontSize: '0.92rem', marginBottom: '12px' }}>{compat.explicacao}</p>
      <h4 style={{ color: '#10b981', fontSize: '0.9rem', marginBottom: '6px' }}>Pontos Positivos</h4>
      {compat.pontosPositivos.map((item, i) => (
        <p key={`pp-${i}`} style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '4px', paddingLeft: '10px' }}>
          <CheckCircle size={10} color="#10b981" style={{ display: 'inline', marginRight: '6px' }} />
          <strong>{item.split(':')[0]}:</strong> {item.split(':').slice(1).join(':')}
        </p>
      ))}
      <h4 style={{ color: '#ef4444', fontSize: '0.9rem', marginBottom: '6px', marginTop: '10px' }}>Desafios</h4>
      {compat.desafios.map((item, i) => (
        <p key={`dc-${i}`} style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '4px', paddingLeft: '10px' }}>
          <AlertTriangle size={10} color="#ef4444" style={{ display: 'inline', marginRight: '6px' }} />
          <strong>{item.split(':')[0]}:</strong> {item.split(':').slice(1).join(':')}
        </p>
      ))}
      <div style={{ marginTop: '12px', background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(59,130,246,0.08))', padding: '12px 16px', borderRadius: '8px', borderLeft: '3px solid #10b981' }}>
        <p style={{ color: '#10b981', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>Conclusão</p>
        <p style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: 1.6 }}>{compat.conclusao}</p>
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div style={{ textAlign: 'center', margin: '20px 0' }}>
      <Heart size={16} fill="#f97316" color="#f97316" style={{ opacity: 0.4 }} />
    </div>
  );
}

function NumberCircle({ number, label, color }) {
  return (
    <div style={{ textAlign: 'center', margin: '16px 0' }}>
      <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', background: `${color}12`, border: `2px solid ${color}40`, borderRadius: '50%', width: '72px', height: '72px', justifyContent: 'center' }}>
        <span style={{ fontSize: '1.8rem', fontWeight: 700, color, lineHeight: 1 }}>{number}</span>
        <span style={{ fontSize: '0.55rem', color: '#94a3b8', marginTop: '2px' }}>{label}</span>
      </div>
    </div>
  );
}

export default function MapaResultado({ data, results, onReset }) {
  const reportRef = useRef(null);
  const [gerando, setGerando] = useState(false);

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

  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;
    setGerando(true);
    try {
      const element = reportRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#0b0e1a',
        width: element.scrollWidth,
        height: element.scrollHeight,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [595, 842] // A4
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      let heightLeft = pdfHeight;
      let position = 0;

      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 30;

      while (heightLeft > 0) {
        pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, pdfHeight, undefined, 'FAST');
        heightLeft -= pageHeight;
        position -= pageHeight;
        if (heightLeft > 0) {
          pdf.addPage();
        }
      }

      pdf.save(`Mapa_do_Casal_${n1}_${n2}.pdf`);
    } catch (err) {
      console.error('Erro ao gerar PDF:', err);
      alert('Ocorreu um erro ao gerar o PDF. Tente novamente.');
    }
    setGerando(false);
  };

  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto'
  };

  const pageStyle = {
    background: 'var(--bg-glass, rgba(11,14,26,0.96))',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '16px',
    padding: '32px 28px',
    position: 'relative',
    overflow: 'hidden'
  };

  return (
    <div style={containerStyle}>
      {/* ─── BOTÕES DE AÇÃO ─── */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
        <button
          onClick={handleDownloadPDF}
          disabled={gerando}
          className="btn"
          style={{ flex: 1, background: 'linear-gradient(135deg, #f97316, #ea580c)', color: 'white', border: 'none', padding: '14px 20px', fontSize: '1rem', fontWeight: 600, borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
        >
          <Download size={20} />
          {gerando ? 'Gerando PDF...' : 'Baixar PDF Completo'}
        </button>
        <button
          onClick={onReset}
          className="btn"
          style={{ background: 'rgba(255,255,255,0.06)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)', padding: '14px 20px', fontSize: '0.95rem', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}
        >
          <ArrowLeft size={18} />
          Nova Consulta
        </button>
      </div>

      {/* ─── CONTEÚDO DO MAPA ─── */}
      <div ref={reportRef} style={pageStyle}>
        {/* CAPA */}
        <div style={{ textAlign: 'center', padding: '20px 0 24px' }}>
          <span style={{ display: 'inline-block', background: 'rgba(249,115,22,0.12)', color: '#f97316', padding: '4px 14px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '12px' }}>
            <Sparkles size={12} style={{ display: 'inline', marginRight: '6px' }} />
            Mapa do Casal
          </span>
          <h1 style={{ color: '#fff', fontSize: '1.6rem', fontFamily: 'var(--font-serif)', margin: '8px 0 4px' }}>
            Mapa de Compatibilidade Amorosa
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '8px' }}>
            <span style={{ color: '#3b82f6', fontSize: '1.15rem', fontWeight: 600 }}>{n1}</span>
            <Heart size={18} fill="#f97316" color="#f97316" />
            <span style={{ color: '#f97316', fontSize: '1.15rem', fontWeight: 600 }}>{n2}</span>
          </div>
        </div>

        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(249,115,22,0.3), transparent)', margin: '4px 0 20px' }} />

        {/* INTRO */}
        <p style={{ color: '#cbd5e1', lineHeight: 1.7, fontSize: '0.92rem', textAlign: 'center', marginBottom: '24px' }}>
          {n1}! Aqui está o seu mapa de compatibilidade amorosa com {n2}, com base nos números de destino e alma de vocês. Vamos explorar as energias de cada um e como elas se conectam, criando um panorama de harmonia e desafios para o relacionamento de vocês. Esse mapa tem o intuito de te ajudar a compreender melhor os pontos fortes da relação e os aspectos que podem precisar de mais atenção, para que o relacionamento de vocês cresça e evolua com equilíbrio.
        </p>

        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)', margin: '0 0 24px' }} />

        {/* ═══ 1. DESTINO DO CASAL ═══ */}
        <SectionTitle icon={Compass} title="Número de Destino do Casal" color="#f97316" />

        <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.7 }}>
          O número de destino do casal reflete o propósito e as dinâmicas centrais do relacionamento de vocês, mostrando o que essa união representa e os caminhos que podem trilhar juntos.
        </p>
        <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.7, marginTop: '6px' }}>
          <strong>Como funciona?</strong> Cada um tem seu número de destino individual (seu: {d1}, de {n2}: {d2}). Quando somamos, criamos o número de destino do casal: {rd1} + {rd2} = {rd1 + rd2} → <strong style={{ color: '#f97316' }}>{destCoupleFinal}</strong>.
        </p>

        <NumberCircle number={destCoupleFinal} label="Destino do Casal" color="#f97316" />

        <ProfileBox name={nomeCompleto1} number={d1} color="#3b82f6" perfil={perfilDestino1} type="destino" />
        <Divider />
        <ProfileBox name={nomeCompleto2} number={d2} color="#f97316" perfil={perfilDestino2} type="destino" />

        <h3 style={{ color: '#fff', fontSize: '1rem', margin: '16px 0 8px' }}>
          Compatibilidade — {n1} ({d1}) e {n2} ({d2})
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '10px' }}>
          {rd1} + {rd2} = {rd1 + rd2} → <strong>{destCoupleFinal}</strong>
        </p>
        <CompatBlock compat={compatDestino} />

        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)', margin: '28px 0' }} />

        {/* ═══ 2. ALMA DO CASAL ═══ */}
        <SectionTitle icon={Gem} title="Número de Alma do Casal" color="#8b5cf6" />

        <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.7 }}>
          O Número de Alma do Casal revela os desejos mais profundos e a conexão emocional entre vocês. Ele mostra os sonhos e necessidades que vocês têm como parceiros, o tipo de vínculo emocional que buscam e o que realmente os faz se sentir realizados.
        </p>

        <NumberCircle number={soulCoupleFinal} label="Alma do Casal" color="#8b5cf6" />

        <ProfileBox name={nomeCompleto1} number={s1} color="#8b5cf6" perfil={perfilAlma1} type="alma" />
        <Divider />
        <ProfileBox name={nomeCompleto2} number={s2} color="#ec4899" perfil={perfilAlma2} type="alma" />

        {sameSoul && sameSoulData && (
          <div style={{ margin: '20px 0', padding: '16px 20px', background: 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(236,72,153,0.08))', borderRadius: '12px', border: '1px solid rgba(139,92,246,0.2)' }}>
            <h3 style={{ color: '#8b5cf6', fontSize: '1.05rem', marginBottom: '10px' }}>
              <Star size={16} style={{ display: 'inline', marginRight: '6px' }} />
              {sameSoulData.title}
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '8px' }}>{sameSoulData.intro}</p>
            {sameSoulData.body.map((p, i) => (
              <p key={`ss-${i}`} style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '6px' }}>{p}</p>
            ))}
            {sameSoulData.desafios.map((p, i) => (
              <p key={`sd-${i}`} style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '6px', paddingLeft: '10px', borderLeft: '2px solid rgba(139,92,246,0.3)' }}>{p}</p>
            ))}
            <div style={{ marginTop: '10px', padding: '10px', background: 'rgba(139,92,246,0.1)', borderRadius: '8px', textAlign: 'center' }}>
              <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.6, fontStyle: 'italic' }}>"{sameSoulData.mensagemFinal}"</p>
            </div>
          </div>
        )}

        <h3 style={{ color: '#fff', fontSize: '1rem', margin: '16px 0 8px' }}>
          Compatibilidade de Almas — {n1} ({s1}) e {n2} ({s2})
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '10px' }}>
          {rs1} + {rs2} = {rs1 + rs2} → <strong>{soulCoupleFinal}</strong>
        </p>
        <CompatBlock compat={compatAlma} />

        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)', margin: '28px 0' }} />

        {/* ═══ 3. COMPATIBILIDADE ÍNTIMA ═══ */}
        <SectionTitle icon={Heart} title="Compatibilidade Íntima do Casal" color="#f97316" />

        <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '14px' }}>
          Quando você e {n2} se encontram, a energia de vocês é única. A química entre vocês não é apenas física, é emocional e espiritual. Aqui, as energias se misturam de forma poderosa, criando uma dinâmica onde cada um pode se expressar livremente, sem medo de ser quem realmente é.
        </p>

        <h3 style={{ color: '#3b82f6', fontSize: '1rem', marginBottom: '6px' }}>Sua Energia (Destino {d1} e Alma {s1})</h3>
        <p style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '6px' }}>{energiaIntima1.destino} {energiaIntima1.alma}</p>
        <p style={{ color: '#3b82f6', fontSize: '0.82rem', marginTop: '6px', marginBottom: '4px', fontWeight: 600 }}>O que te destaca:</p>
        {energiaIntima1.destaques.map((item, i) => (
          <p key={`ei1-${i}`} style={{ color: '#94a3b8', fontSize: '0.82rem', lineHeight: 1.6, paddingLeft: '10px', marginBottom: '2px' }}>
            <Star size={9} color="#3b82f6" style={{ display: 'inline', marginRight: '6px' }} />
            {item}
          </p>
        ))}

        <Divider />

        <h3 style={{ color: '#f97316', fontSize: '1rem', marginBottom: '6px' }}>A Energia d{n2} (Destino {d2} e Alma {s2})</h3>
        <p style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '6px' }}>{energiaIntima2.destino} {energiaIntima2.alma}</p>
        <p style={{ color: '#f97316', fontSize: '0.82rem', marginTop: '6px', marginBottom: '4px', fontWeight: 600 }}>O que o destaca:</p>
        {energiaIntima2.destaques.map((item, i) => (
          <p key={`ei2-${i}`} style={{ color: '#94a3b8', fontSize: '0.82rem', lineHeight: 1.6, paddingLeft: '10px', marginBottom: '2px' }}>
            <Star size={9} color="#f97316" style={{ display: 'inline', marginRight: '6px' }} />
            {item}
          </p>
        ))}

        <h3 style={{ color: '#fff', fontSize: '1rem', marginTop: '16px', marginBottom: '8px' }}>A Dinâmica Íntima Entre Vocês</h3>
        <p style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '10px' }}>{intDynamic.dinâmica}</p>

        <p style={{ color: '#10b981', fontSize: '0.82rem', marginBottom: '4px', fontWeight: 600 }}>O que torna essa relação especial:</p>
        {intDynamic.especial.map((item, i) => (
          <p key={`esp-${i}`} style={{ color: '#94a3b8', fontSize: '0.82rem', lineHeight: 1.6, paddingLeft: '10px', marginBottom: '2px' }}>
            <CheckCircle size={9} color="#10b981" style={{ display: 'inline', marginRight: '6px' }} />
            {item}
          </p>
        ))}

        <p style={{ color: '#ef4444', fontSize: '0.82rem', marginTop: '10px', marginBottom: '6px', fontWeight: 600 }}>Desafios e Como Superá-los</p>
        {intDynamic.desafios.map((desafio, i) => (
          <p key={`des-${i}`} style={{ color: '#94a3b8', fontSize: '0.82rem', lineHeight: 1.6, marginBottom: '6px', paddingLeft: '10px', borderLeft: '2px solid rgba(239,68,68,0.2)' }}>
            <strong>{desafio.titulo}:</strong> {desafio.texto}
          </p>
        ))}

        <div style={{ marginTop: '12px', padding: '12px 16px', background: 'linear-gradient(135deg, rgba(249,115,22,0.08), rgba(139,92,246,0.08))', borderRadius: '8px' }}>
          <p style={{ color: '#f97316', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>Conclusão</p>
          <p style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: 1.6 }}>
            A intimidade entre vocês é marcada por uma combinação de prazer, confiança e conexão emocional. A troca de energia entre vocês cria uma sintonia que é difícil de encontrar. Se souberem equilibrar as forças de liderança e exploração, a relação de vocês será repleta de momentos intensos, inesquecíveis e verdadeiramente satisfatórios.
          </p>
        </div>

        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)', margin: '28px 0' }} />

        {/* ENCERRAMENTO */}
        <div style={{ textAlign: 'center', padding: '16px 0 8px' }}>
          <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
            {ENCERRAMENTO.mensagem}
          </p>
        </div>

        {/* RODAPÉ */}
        <div style={{ marginTop: '20px', padding: '10px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', fontSize: '0.75rem', color: '#475569', textAlign: 'center' }}>
          Documento gerado em {new Date().toLocaleDateString('pt-BR')} para {data.email} • Mapa de Compatibilidade © {new Date().getFullYear()}
        </div>
      </div>

      {/* ─── BOTÃO PDF RODAPÉ ─── */}
      <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
        <button
          onClick={handleDownloadPDF}
          disabled={gerando}
          className="btn"
          style={{ flex: 1, background: 'linear-gradient(135deg, #f97316, #ea580c)', color: 'white', border: 'none', padding: '14px 20px', fontSize: '1rem', fontWeight: 600, borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
        >
          <Download size={20} />
          {gerando ? 'Gerando PDF...' : 'Baixar PDF Completo'}
        </button>
        <button
          onClick={onReset}
          className="btn"
          style={{ background: 'rgba(255,255,255,0.06)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)', padding: '14px 20px', fontSize: '0.95rem', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}
        >
          <ArrowLeft size={18} />
          Nova Consulta
        </button>
      </div>
    </div>
  );
}
