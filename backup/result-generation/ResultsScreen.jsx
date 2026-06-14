import React from 'react';
import { Heart, ArrowRight, CheckCircle, AlertTriangle, Sparkles, Star, Compass, Gem, BookOpen, Moon, Sun } from 'lucide-react';
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

function ProfileBlock({ name, number, color, perfil, type }) {
  const firstName = name.split(' ')[0];

  const fortis = perfil.pontosFortes || [];
  const fracos = perfil.pontosFracos || [];

  return (
    <div className="pdf-profile" style={{ borderLeft: `3px solid ${color}`, marginBottom: '1.5rem' }}>
      <h4 style={{ color, fontSize: '1.15rem', marginBottom: '0.5rem' }}>
        {firstName} (Número de {type === 'destino' ? 'Destino' : 'Alma'} {number})
      </h4>
      <p style={{ color: '#cbd5e1', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: '1rem' }}>
        {perfil.descricao || perfil.descricao}
      </p>

      {fortis.length > 0 && (
        <>
          <h5 style={{ color: '#10b981', fontSize: '0.95rem', marginBottom: '0.5rem' }}>Pontos Fortes</h5>
          {fortis.map((item, i) => (
            <p key={`f-${i}`} style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '0.35rem', paddingLeft: '0.75rem' }}>
              <CheckCircle size={10} style={{ color: '#10b981', display: 'inline', marginRight: '6px' }} />
              <strong>{item.split(':')[0]}:</strong> {item.split(':').slice(1).join(':')}
            </p>
          ))}
        </>
      )}

      {fracos.length > 0 && (
        <>
          <h5 style={{ color: '#ef4444', fontSize: '0.95rem', marginBottom: '0.5rem', marginTop: '1rem' }}>Pontos Fracos</h5>
          {fracos.map((item, i) => (
            <p key={`w-${i}`} style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '0.35rem', paddingLeft: '0.75rem' }}>
              <AlertTriangle size={10} style={{ color: '#ef4444', display: 'inline', marginRight: '6px' }} />
              <strong>{item.split(':')[0]}:</strong> {item.split(':').slice(1).join(':')}
            </p>
          ))}
        </>
      )}

      {type === 'destino' && perfil.comoVeAmor && (
        <div style={{ marginTop: '1rem', background: `${color}08`, padding: '0.75rem', borderRadius: '8px' }}>
          <h6 style={{ color, fontSize: '0.85rem', marginBottom: '0.3rem' }}>Como {firstName} vê o amor</h6>
          <p style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: 1.6 }}>{perfil.comoVeAmor}</p>
        </div>
      )}
      {type === 'destino' && perfil.comoMelhorar && (
        <div style={{ marginTop: '0.5rem', background: 'rgba(249,115,22,0.06)', padding: '0.75rem', borderRadius: '8px' }}>
          <h6 style={{ color: '#f97316', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Como melhorar no amor</h6>
          <p style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: 1.6 }}>{perfil.comoMelhorar}</p>
        </div>
      )}

      {type === 'alma' && perfil.visaoAmor && (
        <div style={{ marginTop: '1rem', background: `${color}08`, padding: '0.75rem', borderRadius: '8px' }}>
          <h6 style={{ color, fontSize: '0.85rem', marginBottom: '0.3rem' }}>Visão de {firstName} sobre o amor</h6>
          <p style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: 1.6 }}>{perfil.visaoAmor}</p>
        </div>
      )}
      {type === 'alma' && perfil.sugestaoMelhora && (
        <div style={{ marginTop: '0.5rem', background: 'rgba(249,115,22,0.06)', padding: '0.75rem', borderRadius: '8px' }}>
          <h6 style={{ color: '#f97316', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Sugestão de melhora no amor</h6>
          <p style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: 1.6 }}>{perfil.sugestaoMelhora}</p>
        </div>
      )}
    </div>
  );
}

function CompatibilityBlock({ compat }) {
  if (!compat) return null;
  return (
    <div>
      <p style={{ color: '#cbd5e1', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: '1rem' }}>
        {compat.explicacao}
      </p>

      <h5 style={{ color: '#10b981', fontSize: '0.95rem', marginBottom: '0.5rem' }}>Pontos Positivos da Compatibilidade</h5>
      {compat.pontosPositivos?.map((item, i) => (
        <p key={`pp-${i}`} style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '0.35rem', paddingLeft: '0.75rem' }}>
          <CheckCircle size={10} style={{ color: '#10b981', display: 'inline', marginRight: '6px' }} />
          <strong>{item.split(':')[0]}:</strong> {item.split(':').slice(1).join(':')}
        </p>
      ))}

      <h5 style={{ color: '#ef4444', fontSize: '0.95rem', marginBottom: '0.5rem', marginTop: '1rem' }}>Desafios na Compatibilidade</h5>
      {compat.desafios?.map((item, i) => (
        <p key={`dc-${i}`} style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '0.35rem', paddingLeft: '0.75rem' }}>
          <AlertTriangle size={10} style={{ color: '#ef4444', display: 'inline', marginRight: '6px' }} />
          <strong>{item.split(':')[0]}:</strong> {item.split(':').slice(1).join(':')}
        </p>
      ))}

      <div style={{ marginTop: '1rem', background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(59,130,246,0.08))', padding: '1rem', borderRadius: '8px', borderLeft: '3px solid #10b981' }}>
        <h6 style={{ color: '#10b981', fontSize: '0.9rem', marginBottom: '0.3rem' }}>Conclusão Final</h6>
        <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.6 }}>{compat.conclusao}</p>
      </div>
    </div>
  );
}

export default function ResultsScreen({ data, results, onContinue }) {
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

  return (
    <div className="glass-panel v3-screen">
      <div className="report-header">
        <span className="report-badge">
          <Sparkles size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
          Mapa do Casal
        </span>
        <h2 className="report-title" style={{ fontSize: '1.6rem', fontFamily: 'var(--font-serif)' }}>
          Mapa de Compatibilidade Amorosa
        </h2>
        <div className="couple-names-badge">
          <span>{n1}</span>
          <Heart size={14} fill="#f97316" style={{ color: '#f97316' }} />
          <span>{n2}</span>
        </div>
      </div>

      {/* ─── INTRO ─── */}
      <div className="v3-section">
        <p style={{ color: '#cbd5e1', lineHeight: 1.7, fontSize: '0.95rem', textAlign: 'center', marginBottom: 0 }}>
          {n1}! Aqui está o seu mapa de compatibilidade amorosa com {n2}, com base nos números de destino e alma de vocês. Vamos explorar as energias de cada um e como elas se conectam, criando um panorama de harmonia e desafios para o relacionamento de vocês. Esse mapa tem o intuito de te ajudar a compreender melhor os pontos fortes da relação e os aspectos que podem precisar de mais atenção, para que o relacionamento de vocês cresça e evolua com equilíbrio.
        </p>
      </div>

      {/* ════════════════════════════════════════════════════ */}
      {/* SEÇÃO 1: NÚMERO DE DESTINO DO CASAL */}
      {/* ════════════════════════════════════════════════════ */}
      <div className="v3-section">
        <div className="v3-section-header">
          <Compass size={20} />
          <h3>NÚMERO DE DESTINO DO CASAL</h3>
        </div>

        <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7 }}>
          O número de destino do casal é uma maneira de entender a energia que você e {n2} compartilham como parceiros. Ele reflete o propósito e as dinâmicas centrais do relacionamento de vocês, mostrando o que essa união representa e os caminhos que podem trilhar juntos.
        </p>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7, marginTop: '0.5rem' }}>
          <strong>Como funciona?</strong> Cada um tem seu número de destino individual (o seu é {d1}, e o dele(a) é {d2}). Esses números refletem quem vocês são como indivíduos. Mas, quando somamos esses números, criamos um terceiro número: o número de destino do casal ({rd1} + {rd2} = {rd1 + rd2} → {destCoupleFinal}), que mostra o que vocês representam como uma unidade.
        </p>

        <div style={{ textAlign: 'center', margin: '1.5rem 0' }}>
          <div className="v3-sum-circle" style={{ display: 'inline-flex' }}>
            <span className="v3-sum-val">{destCoupleFinal}</span>
            <span className="v3-sum-label">Destino do Casal</span>
          </div>
        </div>

        <ProfileBlock name={nomeCompleto1} number={d1} color="#3b82f6" perfil={perfilDestino1} type="destino" />
        <div style={{ textAlign: 'center', margin: '0.5rem 0' }}>
          <Heart size={18} fill="#f97316" style={{ color: '#f97316', opacity: 0.5 }} />
        </div>
        <ProfileBlock name={nomeCompleto2} number={d2} color="#f97316" perfil={perfilDestino2} type="destino" />

        <h4 style={{ color: '#fff', fontSize: '1rem', margin: '1.5rem 0 0.75rem' }}>
          Compatibilidade Entre {n1} ({d1}) e {n2} ({d2})
        </h4>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1rem' }}>
          Somatória dos Números de Destino: {rd1} + {rd2} = {rd1 + rd2} → {destCoupleFinal}
        </p>
        <CompatibilityBlock compat={compatDestino} />
      </div>

      {/* ════════════════════════════════════════════════════ */}
      {/* SEÇÃO 2: NÚMERO DE ALMA DO CASAL */}
      {/* ════════════════════════════════════════════════════ */}
      <div className="v3-section">
        <div className="v3-section-header">
          <Gem size={20} />
          <h3>NÚMERO DE ALMA DO CASAL</h3>
        </div>

        <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7 }}>
          O Número de Alma do Casal revela os desejos mais profundos e a conexão emocional e espiritual entre você e {n2}. Ele mostra os sonhos e necessidades que vocês têm como parceiros, o tipo de vínculo emocional que buscam e o que realmente os faz se sentir realizados e conectados.
        </p>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7, marginTop: '0.5rem' }}>
          Esse número influencia como vocês se conectam, compartilham sentimentos e enfrentam desafios juntos. Ele ajuda a alinhar os anseios de ambos, criando uma base sólida de apoio emocional e compreensão.
        </p>

        <div style={{ textAlign: 'center', margin: '1.5rem 0' }}>
          <div className="v3-sum-circle" style={{ display: 'inline-flex' }}>
            <span className="v3-sum-val">{soulCoupleFinal}</span>
            <span className="v3-sum-label">Alma do Casal</span>
          </div>
        </div>

        <ProfileBlock name={nomeCompleto1} number={s1} color="#8b5cf6" perfil={perfilAlma1} type="alma" />
        <div style={{ textAlign: 'center', margin: '0.5rem 0' }}>
          <Heart size={18} fill="#f97316" style={{ color: '#f97316', opacity: 0.5 }} />
        </div>
        <ProfileBlock name={nomeCompleto2} number={s2} color="#ec4899" perfil={perfilAlma2} type="alma" />

        {sameSoul && sameSoulData && (
          <div style={{ marginTop: '2rem', background: 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(236,72,153,0.08))', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(139,92,246,0.2)' }}>
            <h4 style={{ color: '#8b5cf6', fontSize: '1.1rem', marginBottom: '0.75rem' }}>
              <Star size={16} style={{ display: 'inline', marginRight: '6px' }} />
              {sameSoulData.title}
            </h4>
            <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '0.75rem' }}>
              {sameSoulData.intro}
            </p>
            {sameSoulData.body.map((p, i) => (
              <p key={`ss-${i}`} style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '0.5rem' }}>
                {p}
              </p>
            ))}
            {sameSoulData.desafios.map((p, i) => (
              <p key={`sd-${i}`} style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '0.5rem', paddingLeft: '0.75rem', borderLeft: '2px solid rgba(139,92,246,0.3)' }}>
                {p}
              </p>
            ))}
            <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(139,92,246,0.1)', borderRadius: '8px', textAlign: 'center' }}>
              <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: 1.6, fontStyle: 'italic' }}>
                "{sameSoulData.mensagemFinal}"
              </p>
            </div>
          </div>
        )}

        <h4 style={{ color: '#fff', fontSize: '1rem', margin: '1.5rem 0 0.75rem' }}>
          Compatibilidade Entre {n1} ({s1}) e {n2} ({s2})
        </h4>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1rem' }}>
          Somatória dos Números de Alma: {rs1} + {rs2} = {rs1 + rs2} → {soulCoupleFinal}
        </p>
        <CompatibilityBlock compat={compatAlma} />
      </div>

      {/* ════════════════════════════════════════════════════ */}
      {/* SEÇÃO 3: COMPATIBILIDADE ÍNTIMA */}
      {/* ════════════════════════════════════════════════════ */}
      <div className="v3-section">
        <div className="v3-section-header">
          <Heart size={20} />
          <h3>COMPATIBILIDADE ÍNTIMA DO CASAL</h3>
        </div>

        <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1rem' }}>
          Quando você e {n2} se encontram, a energia de vocês é única. A química entre vocês não é apenas física, é emocional e espiritual. Aqui, as energias se misturam de forma poderosa, criando uma dinâmica onde cada um pode se expressar livremente, sem medo de ser quem realmente é.
        </p>

        <h4 style={{ color: '#3b82f6', fontSize: '1rem', marginBottom: '0.5rem' }}>Sua Energia (Destino {d1} e Alma {s1})</h4>
        <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '0.5rem' }}>
          {energiaIntima1.destino} {energiaIntima1.alma}
        </p>
        <h6 style={{ color: '#3b82f6', fontSize: '0.85rem', marginTop: '0.75rem', marginBottom: '0.35rem' }}>O que te destaca:</h6>
        {energiaIntima1.destaques.map((item, i) => (
          <p key={`ed1-${i}`} style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '0.25rem', paddingLeft: '0.75rem' }}>
            <Star size={10} style={{ color: '#3b82f6', display: 'inline', marginRight: '6px' }} />
            {item}
          </p>
        ))}

        <div style={{ textAlign: 'center', margin: '1rem 0' }}>
          <Heart size={16} fill="#f97316" style={{ color: '#f97316', opacity: 0.4 }} />
        </div>

        <h4 style={{ color: '#f97316', fontSize: '1rem', marginBottom: '0.5rem' }}>A Energia d{n2} (Destino {d2} e Alma {s2})</h4>
        <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '0.5rem' }}>
          {energiaIntima2.destino} {energiaIntima2.alma}
        </p>
        <h6 style={{ color: '#f97316', fontSize: '0.85rem', marginTop: '0.75rem', marginBottom: '0.35rem' }}>O que o destaca:</h6>
        {energiaIntima2.destaques.map((item, i) => (
          <p key={`ed2-${i}`} style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '0.25rem', paddingLeft: '0.75rem' }}>
            <Star size={10} style={{ color: '#f97316', display: 'inline', marginRight: '6px' }} />
            {item}
          </p>
        ))}

        <h4 style={{ color: '#fff', fontSize: '1rem', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
          A Dinâmica Íntima Entre Vocês
        </h4>
        <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1rem' }}>
          {intDynamic.dinâmica}
        </p>

        <h6 style={{ color: '#10b981', fontSize: '0.85rem', marginBottom: '0.35rem' }}>O que torna essa relação especial:</h6>
        {intDynamic.especial.map((item, i) => (
          <p key={`esp-${i}`} style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '0.35rem', paddingLeft: '0.75rem' }}>
            <CheckCircle size={10} style={{ color: '#10b981', display: 'inline', marginRight: '6px' }} />
            {item}
          </p>
        ))}

        <h6 style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '1rem', marginBottom: '0.5rem' }}>Desafios e Como Superá-los</h6>
        {intDynamic.desafios.map((desafio, i) => (
          <p key={`des-${i}`} style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '0.5rem', paddingLeft: '0.75rem', borderLeft: '2px solid rgba(239,68,68,0.2)' }}>
            <strong>{desafio.titulo}:</strong> {desafio.texto}
          </p>
        ))}

        <div style={{ marginTop: '1rem', background: 'linear-gradient(135deg, rgba(249,115,22,0.08), rgba(139,92,246,0.08))', padding: '1rem', borderRadius: '8px' }}>
          <h6 style={{ color: '#f97316', fontSize: '0.9rem', marginBottom: '0.3rem' }}>Conclusão</h6>
          <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.6 }}>
            A intimidade entre vocês é marcada por uma combinação de prazer, confiança e conexão emocional. A troca de energia entre vocês cria uma sintonia que é difícil de encontrar. Se souberem equilibrar as forças de liderança e exploração, a relação de vocês será repleta de momentos intensos, inesquecíveis e verdadeiramente satisfatórios.
          </p>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════ */}
      {/* ENCERRAMENTO */}
      {/* ════════════════════════════════════════════════════ */}
      <div style={{ textAlign: 'center', padding: '2rem 0 1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
          {ENCERRAMENTO.mensagem}
        </p>
      </div>

      <button onClick={onContinue} className="btn btn-orange" style={{ marginTop: '1.5rem', width: '100%', fontSize: '1.1rem', padding: '1.25rem' }}>
        ABRIR E-BOOK COMPLETO (20 Páginas)
        <ArrowRight size={20} />
      </button>
    </div>
  );
}
