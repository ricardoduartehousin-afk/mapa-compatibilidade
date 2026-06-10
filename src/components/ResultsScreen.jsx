import React from 'react';
import { Heart, ArrowRight, CheckCircle, AlertTriangle, Sparkles, BookOpen, Star, Compass, Gem } from 'lucide-react';
import { REPORTS } from '../utils/numerology';
import NUMEROLOGY_MEANINGS from '../utils/numerologyMeanings';

function get(num, field) {
  const n = num <= 9 ? num : (num === 11 ? 2 : num === 22 ? 4 : 1);
  return NUMEROLOGY_MEANINGS[n]?.[field] || '';
}

const COMPARISON = {
  same: {
    destiny: 'Vocês dois compartilham o mesmo número de destino, o que indica que seus propósitos de vida e valores fundamentais estão muito alinhados. Em relacionamentos, isso costuma gerar uma compreensão natural entre os dois — cada um entende, quase intuitivamente, de onde o outro vem e o que o motiva. Um ponto de atenção: casais muito parecidos podem reforçar mutuamente seus pontos cegos. O ideal é que, mesmo sendo alinhados, cada um cultive sua própria individualidade dentro da relação.',
    soul: 'Suas motivações mais profundas seguem a mesma direção. Quando ambos desejam coisas parecidas no íntimo, a conexão emocional flui com naturalidade. É como se vocês falassem a mesma língua do coração. O cuidado necessário é não se tornarem tão dependentes um do outro a ponto de perderem suas identidades individuais. Relacionamentos saudáveis são feitos de dois inteiros que se escolhem, não de metades que se completam.'
  },
  complementary: {
    destiny: 'Os números de destino de vocês se complementam de forma equilibrada. Um possui características que equilibram as do outro, criando uma dinâmica de parceria funcional. Na prática, isso significa que onde um tem mais dificuldade, o outro naturalmente tende a ter mais facilidade. Essa diferença, quando bem administrada, é a base para um relacionamento sólido. O segredo está em valorizar o que cada um traz, em vez de tentar fazer o outro ser mais parecido com você.',
    soul: 'Emocionalmente, vocês se equilibram. Enquanto um tende a sentir e reagir de uma forma, o outro naturalmente traz uma perspectiva diferente. Essa dinâmica pode gerar atrito se não houver comunicação clara, mas quando ambos se esforçam para entender o ponto de vista do outro, a relação se torna um espaço rico de crescimento mútuo. O importante é não interpretar a diferença como erro — ela é apenas um jeito diferente de funcionar.'
  },
  challenging: {
    destiny: 'Seus números de destino indicam formas diferentes de enxergar o mundo e lidar com a vida. Isso não significa que vocês são incompatíveis, mas sim que este relacionamento exigirá mais esforço consciente e disposição para entender o outro. As diferenças vão aparecer, especialmente na forma como cada um lida com responsabilidades, planos e prioridades. Casais que enfrentam esse desafio e aprendem a respeitar as diferenças costumam desenvolver uma relação especialmente madura e resiliente.',
    soul: 'O que move cada um de vocês emocionalmente é bem diferente. Um pode buscar mais conexão e proximidade, enquanto o outro valoriza mais independência e espaço. Um pode precisar de segurança e rotina, enquanto o outro busca novidades e mudanças. Isso não é um problema — é um convite ao diálogo. O desafio é encontrar um equilíbrio onde ambos se sintam respeitados em suas necessidades sem anular o que o outro é.'
  }
};

function compareNumbers(n1, n2) {
  const a = n1 > 9 ? (n1 === 11 ? 2 : n1 === 22 ? 4 : n1) : n1;
  const b = n2 > 9 ? (n2 === 11 ? 2 : n2 === 22 ? 4 : n2) : n2;
  if (a === b) return 'same';
  const diff = Math.abs(a - b);
  if (diff === 1 || diff === 4 || diff === 5) return 'complementary';
  return 'challenging';
}

function PersonRevelation({ name, destiny, soul, color, order }) {
  const destinyPersonality = get(destiny, 'personality');
  const soulPersonality = get(soul, 'personality');
  const destinyName = get(destiny, 'name');
  const soulName = get(soul, 'name');
  const firstName = name.split(' ')[0];

  return (
    <div className="v3-person" style={{ borderLeft: `3px solid ${color}` }}>
      <div className="v3-person-header">
        <span className="v3-person-order" style={{ background: `${color}20`, color }}>{order}</span>
        <h3>{firstName}</h3>
      </div>

      <div className="v3-number-card">
        <div className="v3-number-title">
          <Compass size={16} style={{ color }} />
          <span>Destino — {destinyName}</span>
          <span className="v3-number-badge" style={{ background: `${color}20`, color }}>{destiny}</span>
        </div>
        <p className="v3-number-text">{destinyPersonality}</p>
      </div>

      <div className="v3-number-card">
        <div className="v3-number-title">
          <Gem size={16} style={{ color }} />
          <span>Alma — {soulName}</span>
          <span className="v3-number-badge" style={{ background: `${color}20`, color }}>{soul}</span>
        </div>
        <p className="v3-number-text">{soulPersonality}</p>
      </div>

      <div className="v3-insight" style={{ background: `${color}08` }}>
        <Sparkles size={14} style={{ color }} />
        <p>Uma observação sobre {firstName}: seu jeito de agir no mundo (Destino {destiny}) e o que seu coração realmente deseja (Alma {soul}) podem às vezes puxar para direções diferentes. Isso não é contraditório — é humano. A maturidade emocional vem justamente de aprender a equilibrar essas duas forças: fazer o que precisa ser feito sem deixar de lado o que realmente importa para você.</p>
      </div>
    </div>
  );
}

function getAffinities(d1, s1, d2, s2, report) {
  const items = [];
  const prosSections = ['atracaoInicial', 'amorIntimidade', 'compatibilidadeEmocional'];
  for (const key of prosSections) {
    const p = report.sections?.[key];
    if (p) {
      for (const para of p) {
        const sentences = para.split('. ').filter(s => s.trim().length > 25);
        for (const s of sentences) {
          if (items.length >= 5) break;
          items.push(s.trim());
        }
        if (items.length >= 5) break;
      }
    }
    if (items.length >= 5) break;
  }
  return items;
}

function getIncompatibilities(d1, s1, d2, s2, report) {
  const items = [];
  const consSections = ['comunicacao', 'desafiosKarmicos', 'conselho'];
  for (const key of consSections) {
    const p = report.sections?.[key];
    if (p) {
      for (const para of p) {
        const sentences = para.split('. ').filter(s => s.trim().length > 25);
        for (const s of sentences) {
          if (items.length >= 4) break;
          items.push(s.trim());
        }
        if (items.length >= 4) break;
      }
    }
    if (items.length >= 4) break;
  }
  return items;
}

export default function ResultsScreen({ data, results, onContinue }) {
  const report = REPORTS[results.finalNumber];
  const d1 = results.destinyP1;
  const s1 = results.soulNumberP1;
  const e1 = results.expressionP1;
  const d2 = results.destinyP2;
  const s2 = results.soulNumberP2;
  const e2 = results.expressionP2;
  const n1 = data.nomeP1.split(' ')[0];
  const n2 = data.nomeP2.split(' ')[0];

  const affinities = getAffinities(d1, s1, d2, s2, report);
  const incompatibilities = getIncompatibilities(d1, s1, d2, s2, report);
  const destComp = compareNumbers(d1, d2);
  const soulComp = compareNumbers(s1, s2);

  const totalSum = (d1 > 9 ? (d1 === 11 ? 2 : 4) : d1) +
    (e1 > 9 ? (e1 === 11 ? 2 : 4) : e1) +
    (s1 > 9 ? (s1 === 11 ? 2 : 4) : s1) +
    (d2 > 9 ? (d2 === 11 ? 2 : 4) : d2) +
    (e2 > 9 ? (e2 === 11 ? 2 : 4) : e2) +
    (s2 > 9 ? (s2 === 11 ? 2 : 4) : s2);

  return (
    <div className="glass-panel v3-screen">
      <div className="report-header">
        <span className="report-badge">
          <Sparkles size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
          Seu Mapa Completo
        </span>
        <h2 className="report-title" style={{ fontSize: '1.3rem' }}>
          O Perfil de Cada Um e a Dinâmica do Casal
        </h2>
        <div className="couple-names-badge">
          <span>{n1}</span>
          <Heart size={14} fill="#f97316" style={{ color: '#f97316' }} />
          <span>{n2}</span>
        </div>
      </div>

      {/* ═══ 1. PERFIL INDIVIDUAL ═══ */}
      <div className="v3-section">
        <div className="v3-section-header">
          <BookOpen size={20} />
          <h3>Quem é Cada Um — Perfil e Motivações</h3>
        </div>
        <p className="v3-section-sub">Antes de entender a relação, é importante entender cada pessoa individualmente. O número de Destino mostra como cada um age no mundo; o número da Alma revela o que cada um realmente deseja no fundo do coração.</p>

        <PersonRevelation
          name={data.nomeP1}
          destiny={d1}
          soul={s1}
          color="#3b82f6"
          order="1"
        />

        <div className="v3-divider">
          <Heart size={16} fill="#f97316" style={{ color: '#f97316' }} />
        </div>

        <PersonRevelation
          name={data.nomeP2}
          destiny={d2}
          soul={s2}
          color="#f97316"
          order="2"
        />
      </div>

      {/* ═══ 2. COMPATIBILIDADES ═══ */}
      <div className="v3-section">
        <div className="v3-section-header">
          <Heart size={20} />
          <h3>Como Vocês se Relacionam — Pontos Fortes e Desafios</h3>
        </div>
        <p className="v3-section-sub">Agora que conhece o perfil de cada um, veja como essas características interagem no dia a dia do relacionamento.</p>

        <div className="v3-compare-card">
          <div className="v3-compare-title">
            <Compass size={16} />
            Comparação dos Caminhos de Vida (Destino)
          </div>
          <div className="v3-compare-badges">
            <span className="v3-badge" style={{ background: '#3b82f620', color: '#3b82f6' }}>{n1}: {d1}</span>
            <span className="v3-badge" style={{ background: '#f9731620', color: '#f97316' }}>{n2}: {d2}</span>
          </div>
          <p className="v3-compare-text">{COMPARISON[destComp].destiny}</p>
        </div>

        <div className="v3-compare-card">
          <div className="v3-compare-title">
            <Gem size={16} />
            Comparação das Motivações Internas (Alma)
          </div>
          <div className="v3-compare-badges">
            <span className="v3-badge" style={{ background: '#3b82f620', color: '#3b82f6' }}>{n1}: {s1}</span>
            <span className="v3-badge" style={{ background: '#f9731620', color: '#f97316' }}>{n2}: {s2}</span>
          </div>
          <p className="v3-compare-text">{COMPARISON[soulComp].soul}</p>
        </div>

        <div className="v3-understand-box">
          <Sparkles size={18} />
          <div>
            <strong>Uma reflexão importante sobre as diferenças:</strong>
            <p>As diferenças entre vocês não são defeitos — são simplesmente formas diferentes de funcionar. Em todo relacionamento, existem áreas de sintonia natural e áreas que exigem mais esforço. O que faz um casal durar não é a ausência de diferenças, mas a capacidade de respeitá-las e encontrar um meio-termo que funcione para os dois. Onde {n1} tem mais facilidade, {n2} pode aprender; onde {n2} sente mais necessidade, {n1} pode se esforçar para compreender. É uma via de mão dupla.</p>
          </div>
        </div>

        <div className="v3-comp-grid">
          <div className="v3-comp-block v3-comp-pros">
            <h4 className="v3-comp-block-title">
              <CheckCircle size={16} />
              O que já funciona bem
            </h4>
            <ul className="v3-comp-list">
              {affinities.map((item, i) => (
                <li key={i}><CheckCircle size={12} /> <span>{item}.</span></li>
              ))}
            </ul>
          </div>

          <div className="v3-comp-block v3-comp-cons">
            <h4 className="v3-comp-block-title">
              <AlertTriangle size={16} />
              O que merece atenção
            </h4>
            <ul className="v3-comp-list">
              {incompatibilities.map((item, i) => (
                <li key={i} className="v3-inc-item"><AlertTriangle size={12} /> <span>{item}.</span></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="v3-how-to-box">
          <h4>
            <Star size={18} />
            O que pode fortalecer essa relação
          </h4>
          <p>{report.sections?.conselho?.[0] || 'Conversem abertamente sobre o que cada um sente e precisa. Todos os relacionamentos passam por ajustes — o importante é manter o diálogo honesto e a disposição para entender o outro. Reservem um tempo para conversas sem distrações, onde cada um possa falar e ser ouvido de verdade. Lembrem-se de que vocês estão no mesmo time, mesmo quando pensam diferente.'}</p>
        </div>
      </div>

      {/* ═══ 3. SÍNTESE DO CASAL ═══ */}
      <div className="v3-section">
        <div className="v3-section-header">
          <Gem size={20} />
          <h3>Síntese da Relação — O Número do Casal</h3>
        </div>
        <p className="v3-section-sub">A soma de todos os números de cada um forma um retrato completo da dinâmica do casal — um panorama geral de como essas duas pessoas funcionam juntas.</p>

        <div className="v3-sum-box">
          <div className="v3-sum-calculation">
            <span className="v3-sum-label">Entenda como chegamos a este resultado:</span>
            <div className="v3-sum-numbers">
              <div className="v3-sum-person">
                <span style={{ color: '#3b82f6' }}>{n1}</span>
                <span>Destino {d1} + Alma {s1} + Expressão {e1}</span>
              </div>
              <span className="v3-sum-plus">+</span>
              <div className="v3-sum-person">
                <span style={{ color: '#f97316' }}>{n2}</span>
                <span>Destino {d2} + Alma {s2} + Expressão {e2}</span>
              </div>
              <span className="v3-sum-plus">=</span>
              <div className="v3-sum-result">
                <span>{totalSum} → {results.finalNumber}</span>
              </div>
            </div>
          </div>

          <div className="v3-sum-circle">
            <span className="v3-sum-val">{results.finalNumber}</span>
            <span className="v3-sum-label">Número do Casal</span>
          </div>
        </div>

        <div className="v3-final-block">
          <h4>{report.title}</h4>
          <div className="v3-final-stats">
            <div className="v3-final-stat">
              <span className="v3-final-stat-val" style={{ color: '#f97316' }}>{results.percentage}%</span>
              <span className="v3-final-stat-label">Afinidade</span>
            </div>
          </div>
          {report.sections?.visaoGeral?.slice(0, 3).map((p, i) => (
            <p key={i} className="v3-final-text">{p}</p>
          ))}
          <div className="v3-final-message">
            <Star size={16} />
            <p>{report.sections?.mensagemFinal?.[0] || 'Relacionamentos são construídos no dia a dia, com pequenas escolhas, respeito e disposição para crescer juntos.'}</p>
          </div>
        </div>
      </div>

      <button onClick={onContinue} className="btn btn-orange" style={{ marginTop: '1.5rem' }}>
        Ver Relatório Detalhado Completo
        <ArrowRight size={18} />
      </button>
    </div>
  );
}
