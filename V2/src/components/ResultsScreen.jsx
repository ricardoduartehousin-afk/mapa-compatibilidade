import React from 'react';
import { Heart, ArrowRight, CheckCircle, AlertTriangle, Sparkles, Moon, Sun, Star, BookOpen } from 'lucide-react';
import { REPORTS } from '../utils/numerology';
import NUMEROLOGY_MEANINGS from '../utils/numerologyMeanings';

function getMeaning(type, number) {
  const num = number > 9 ? number : number;
  const base = num <= 9 ? num : (num === 11 ? 2 : num === 22 ? 4 : 1);
  return NUMEROLOGY_MEANINGS[base]?.[type] || '';
}

function PersonNumbers({ name, data: personData, color }) {
  return (
    <div className="results-person" style={{ borderTop: `3px solid ${color}` }}>
      <div className="results-person-header">
        <div className="results-person-avatar" style={{ background: `${color}15`, color }}>
          <Star size={20} />
        </div>
        <h3>{name.split(' ')[0]}</h3>
      </div>

      <div className="results-numbers-grid">
        <div className="results-number-item">
          <div className="results-number-top">
            <Moon size={13} />
            <span>Destino</span>
          </div>
          <span className="results-number-val" style={{ color }}>{personData.destiny}</span>
          <p className="results-number-desc">{getMeaning('destiny', personData.destiny)}</p>
        </div>

        <div className="results-number-item">
          <div className="results-number-top">
            <Sparkles size={13} />
            <span>Alma</span>
          </div>
          <span className="results-number-val" style={{ color }}>{personData.soul}</span>
          <p className="results-number-desc">{getMeaning('soul', personData.soul)}</p>
        </div>

        <div className="results-number-item">
          <div className="results-number-top">
            <Sun size={13} />
            <span>Expressão</span>
          </div>
          <span className="results-number-val" style={{ color }}>{personData.expression}</span>
          <p className="results-number-desc">{getMeaning('expression', personData.expression)}</p>
        </div>
      </div>
    </div>
  );
}

const PROS_SECTIONS = ['atracaoInicial', 'amorIntimidade', 'missaoEspiritual', 'potencialLongoPrazo'];
const CONS_SECTIONS = ['desafiosKarmicos', 'vidaFinanceira', 'conselho'];

function extractSentences(sections, report, max) {
  const lines = [];
  for (const key of sections) {
    const paragraphs = report.sections?.[key];
    if (paragraphs) {
      for (const p of paragraphs) {
        const sentences = p.split('. ').filter(s => s.trim().length > 20);
        for (const s of sentences) {
          if (lines.length >= max) break;
          lines.push(s.trim());
        }
        if (lines.length >= max) break;
      }
    }
    if (lines.length >= max) break;
  }
  return lines;
}

export default function ResultsScreen({ data, results, onContinue }) {
  const report = REPORTS[results.finalNumber];

  const compatibilities = extractSentences(PROS_SECTIONS, report, 8);
  const incompatibilities = extractSentences(CONS_SECTIONS, report, 6);

  return (
    <div className="glass-panel results-screen">
      <div className="report-header">
        <span className="report-badge">
          <Sparkles size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
          Mapa Completo Desbloqueado
        </span>
        <h2 className="report-title" style={{ fontSize: '1.4rem' }}>
          A Numerologia Revela Tudo
        </h2>
        <div className="couple-names-badge">
          <span>{data.nomeP1.split(' ')[0]}</span>
          <Heart size={14} fill="#f97316" style={{ color: '#f97316' }} />
          <span>{data.nomeP2.split(' ')[0]}</span>
        </div>
      </div>

      {/* AFINIDADE GERAL */}
      <div className="results-affinity">
        <div className="results-affinity-circle">
          <span className="results-affinity-val">{results.percentage}%</span>
          <span className="results-affinity-label">Afinidade</span>
        </div>
        <div>
          <p className="results-affinity-title">Número do Casal: <strong>{results.finalNumber}</strong></p>
          <p className="results-affinity-sub">A vibração que une vocês</p>
        </div>
      </div>

      <div className="section-divider" style={{ margin: '1.2rem 0' }} />

      {/* NÚMEROS INDIVIDUAIS */}
      <h3 className="results-section-title">
        <BookOpen size={18} />
        O Que os Números Dizem Sobre Cada Um
      </h3>

      <PersonNumbers
        name={data.nomeP1}
        data={{
          destiny: results.destinyP1,
          soul: results.soulNumberP1,
          expression: results.expressionP1
        }}
        color="#3b82f6"
      />

      <PersonNumbers
        name={data.nomeP2}
        data={{
          destiny: results.destinyP2,
          soul: results.soulNumberP2,
          expression: results.expressionP2
        }}
        color="#f97316"
      />

      <div className="section-divider" style={{ margin: '1.2rem 0' }} />

      {/* COMPATIBILIDADES E INCOMPATIBILIDADES */}
      <h3 className="results-section-title">
        <Heart size={18} />
        Compatibilidades & Incompatibilidades do Casal
      </h3>

      <div className="results-comp-grid">
        <div className="results-comp-block results-comp-pros">
          <h4 className="results-comp-title">
            <CheckCircle size={18} />
            Compatibilidades
          </h4>
          <ul className="results-comp-list">
            {compatibilities.map((item, i) => (
              <li key={i}>
                <CheckCircle size={14} />
                <span>{item}.</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="results-comp-block results-comp-cons">
          <h4 className="results-comp-title">
            <AlertTriangle size={18} />
            Incompatibilidades
          </h4>
          <ul className="results-comp-list">
            {incompatibilities.map((item, i) => (
              <li key={i} className="inc-item">
                <AlertTriangle size={14} />
                <span>{item}.</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button onClick={onContinue} className="btn btn-orange" style={{ marginTop: '1.5rem' }}>
        Ver Relatório Completo
        <ArrowRight size={18} />
      </button>
    </div>
  );
}
