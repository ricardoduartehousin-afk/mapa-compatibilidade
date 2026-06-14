import React from 'react';
import { Heart, ArrowRight, CheckCircle, AlertTriangle, Sparkles } from 'lucide-react';
import { REPORTS } from '../utils/numerology';

const PROS_SECTIONS = ['atracaoInicial', 'amorIntimidade', 'missaoEspiritual', 'potencialLongoPrazo'];
const CONS_SECTIONS = ['desafiosKarmicos', 'conselho'];

export default function CoupleResults({ data, results, onContinue }) {
  const report = REPORTS[results.finalNumber];

  const getPros = () => {
    const lines = [];
    for (const key of PROS_SECTIONS) {
      const paragraphs = report.sections?.[key];
      if (paragraphs) {
        paragraphs.forEach(p => {
          const sentences = p.split('. ').filter(s => s.trim().length > 20);
          sentences.slice(0, 2).forEach(s => lines.push(s.trim()));
        });
      }
    }
    return lines.slice(0, 6);
  };

  const getCons = () => {
    const lines = [];
    for (const key of CONS_SECTIONS) {
      const paragraphs = report.sections?.[key];
      if (paragraphs) {
        paragraphs.forEach(p => {
          const sentences = p.split('. ').filter(s => s.trim().length > 20);
          sentences.slice(0, 2).forEach(s => lines.push(s.trim()));
        });
      }
    }
    return lines.slice(0, 4);
  };

  const pros = getPros();
  const cons = getCons();

  return (
    <div className="glass-panel">
      <div className="report-header">
        <span className="report-badge">
          <Sparkles size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
          Compatibilidade do Casal
        </span>
        <h2 className="report-title" style={{ fontSize: '1.3rem' }}>
          {report.title}
        </h2>
        <div className="couple-names-badge">
          <span>{data.nomeP1.split(' ')[0]}</span>
          <Heart size={14} fill="var(--accent-orange)" style={{ color: 'var(--accent-orange)' }} />
          <span>{data.nomeP2.split(' ')[0]}</span>
        </div>
      </div>

      <div className="card-grid">
        <div className="stat-card">
          <span className="stat-card-title">Afinidade Geral</span>
          <div className="stat-card-val highlight" style={{ fontSize: '1.5rem' }}>{results.percentage}%</div>
        </div>
        <div className="stat-card">
          <span className="stat-card-title">Número do Casal</span>
          <div className="stat-card-val" style={{ fontSize: '1.5rem', color: '#10b981' }}>{results.finalNumber}</div>
        </div>
      </div>

      <div className="pros-cons-grid">
        <div className="pros-section">
          <h4 className="pros-cons-title pros-title">
            <CheckCircle size={18} />
            Pontos Fortes
          </h4>
          <ul className="pros-cons-list">
            {pros.map((item, i) => (
              <li key={i} className="pros-item">
                <CheckCircle size={14} />
                <span>{item}.</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="cons-section">
          <h4 className="pros-cons-title cons-title">
            <AlertTriangle size={18} />
            Desafios
          </h4>
          <ul className="pros-cons-list">
            {cons.map((item, i) => (
              <li key={i} className="cons-item">
                <AlertTriangle size={14} />
                <span>{item}.</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button onClick={onContinue} className="btn btn-orange" style={{ marginTop: '1.5rem' }}>
        Desbloquear Mapa Completo
        <ArrowRight size={18} />
      </button>
    </div>
  );
}
