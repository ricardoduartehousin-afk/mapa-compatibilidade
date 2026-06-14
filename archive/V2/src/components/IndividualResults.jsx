import React from 'react';
import { Heart, ArrowRight, Star, Sparkles, Moon, Sun } from 'lucide-react';
import NUMEROLOGY_MEANINGS from '../utils/numerologyMeanings';

function getMeaning(type, number) {
  const num = number > 9 ? number : number;
  const base = num <= 9 ? num : (num === 11 ? 2 : num === 22 ? 4 : 1);
  return NUMEROLOGY_MEANINGS[base]?.[type] || '';
}

function PersonalCard({ name, destiny, soul, expression, color, index }) {
  return (
    <div className="individual-card" style={{ borderTop: `3px solid ${color}` }}>
      <div className="individual-card-header">
        <div className="individual-avatar" style={{ background: `${color}20`, color }}>
          {index === 0 ? <Star size={22} /> : <Heart size={22} />}
        </div>
        <h3>{name.split(' ')[0]}</h3>
      </div>

      <div className="individual-numbers">
        <div className="number-block">
          <span className="number-label">
            <Moon size={14} />
            Destino
          </span>
          <span className="number-value" style={{ color }}>{destiny}</span>
          <p className="number-desc">{getMeaning('destiny', destiny)}</p>
        </div>

        <div className="number-block">
          <span className="number-label">
            <Sparkles size={14} />
          Alma
          </span>
          <span className="number-value" style={{ color }}>{soul}</span>
          <p className="number-desc">{getMeaning('soul', soul)}</p>
        </div>

        <div className="number-block">
          <span className="number-label">
            <Sun size={14} />
            Expressão
          </span>
          <span className="number-value" style={{ color }}>{expression}</span>
          <p className="number-desc">{getMeaning('expression', expression)}</p>
        </div>
      </div>
    </div>
  );
}

export default function IndividualResults({ data, results, onContinue }) {
  return (
    <div className="glass-panel">
      <div className="report-header">
        <span className="report-badge">
          <Sparkles size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
          Seus Números Desvendados
        </span>
        <h2 className="report-title" style={{ fontSize: '1.4rem' }}>
          O Universo Revela Quem Vocês São
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.3rem' }}>
          Cada número carrega uma vibração única. Veja o que eles dizem sobre vocês.
        </p>
      </div>

      <PersonalCard
        name={data.nomeP1}
        destiny={results.destinyP1}
        soul={results.soulNumberP1}
        expression={results.expressionP1}
        color="#3b82f6"
        index={0}
      />

      <div style={{ textAlign: 'center', margin: '0.5rem 0' }}>
        <Heart size={20} fill="#f97316" style={{ color: '#f97316', opacity: 0.6 }} />
      </div>

      <PersonalCard
        name={data.nomeP2}
        destiny={results.destinyP2}
        soul={results.soulNumberP2}
        expression={results.expressionP2}
        color="#f97316"
        index={1}
      />

      <button onClick={onContinue} className="btn btn-orange" style={{ marginTop: '1.5rem' }}>
        Ver Compatibilidade do Casal
        <ArrowRight size={18} />
      </button>
    </div>
  );
}
