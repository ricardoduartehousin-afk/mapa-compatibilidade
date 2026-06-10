import React, { useState } from 'react';
import { Compass, Heart, ArrowLeft, Printer, Download, Share2, Sparkles, Check, Star, Flame, MessageCircle, DollarSign, AlertCircle, Eye, Clock, Lightbulb, Mail, Loader } from 'lucide-react';
import { REPORTS } from '../utils/numerology';

const SECTION_CONFIG = [
  { key: 'visaoGeral',              icon: Eye,           title: 'Visão Geral da União',          color: '#f97316' },
  { key: 'atracaoInicial',          icon: Heart,         title: 'Atração Inicial',               color: '#f97316' },
  { key: 'compatibilidadeEmocional',icon: Sparkles,      title: 'Compatibilidade Emocional',     color: '#3b82f6' },
  { key: 'comunicacao',             icon: MessageCircle, title: 'Comunicação do Casal',          color: '#3b82f6' },
  { key: 'amorIntimidade',          icon: Flame,         title: 'Amor e Intimidade',             color: '#f97316' },
  { key: 'vidaFinanceira',          icon: DollarSign,    title: 'Vida Financeira e Patrimonial', color: '#10b981' },
  { key: 'desafiosKarmicos',        icon: AlertCircle,   title: 'Desafios Kármicos',             color: '#a78bfa' },
  { key: 'missaoEspiritual',        icon: Star,          title: 'Missão Espiritual da União',    color: '#a78bfa' },
  { key: 'potencialLongoPrazo',     icon: Clock,         title: 'Potencial de Longo Prazo',      color: '#10b981' },
  { key: 'conselho',                icon: Lightbulb,     title: 'Conselho da Numerologia Cabalística', color: '#f97316' },
  { key: 'mensagemFinal',           icon: Mail,          title: 'Mensagem Final',                color: '#3b82f6' },
];

function splitIntoLines(text, maxChars) {
  const words = text.split(' ');
  const lines = [];
  let current = '';
  for (const word of words) {
    if ((current + ' ' + word).trim().length > maxChars) {
      if (current) lines.push(current.trim());
      current = word;
    } else {
      current = (current + ' ' + word).trim();
    }
  }
  if (current) lines.push(current.trim());
  return lines;
}

function renderText(pdf, text, x, y, maxChars, lineHeight, maxY) {
  const lines = splitIntoLines(text, maxChars);
  for (const line of lines) {
    if (y + lineHeight > maxY) {
      pdf.addPage();
      y = 20;
    }
    pdf.text(line, x, y);
    y += lineHeight;
  }
  return y;
}

const SECTION_NAMES = {
  visaoGeral: 'Visão Geral da União',
  atracaoInicial: 'Atração Inicial',
  compatibilidadeEmocional: 'Compatibilidade Emocional',
  comunicacao: 'Comunicação do Casal',
  amorIntimidade: 'Amor e Intimidade',
  vidaFinanceira: 'Vida Financeira e Patrimonial',
  desafiosKarmicos: 'Desafios Kármicos',
  missaoEspiritual: 'Missão Espiritual da União',
  potencialLongoPrazo: 'Potencial de Longo Prazo',
  conselho: 'Conselho da Numerologia Cabalística',
  mensagemFinal: 'Mensagem Final',
};

export default function FullReport({ data, results, onReset }) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [generatingPdf, setGeneratingPdf] = useState(false);
  const report = REPORTS[results.finalNumber];

  const handlePrint = () => window.print();

  const handleDownloadPdf = async () => {
    if (generatingPdf) return;
    setGeneratingPdf(true);

    try {
      const { default: jsPDF } = await import('jspdf');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const marginX = 15;
      const marginY = 20;
      const contentW = pageW - marginX * 2;
      const maxChars = Math.floor(contentW / 2.8);
      const lineH = 5.5;

      let y = marginY;

      const checkPage = (needed) => {
        if (y + needed > pageH - marginY) {
          pdf.addPage();
          y = marginY;
        }
      };

      // ── Título ──
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(18);
      const titleLines = splitIntoLines(report.title, Math.floor(maxChars * 0.85));
      for (const line of titleLines) {
        checkPage(8);
        pdf.text(line, marginX, y);
        y += 8;
      }

      // ── Nomes ──
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(12);
      checkPage(7);
      pdf.text(`${data.nomeP1.split(' ')[0]}  &  ${data.nomeP2.split(' ')[0]}`, marginX, y);
      y += 10;

      // ── Stats ──
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(14);
      checkPage(8);
      pdf.text(`Afinidade Geral: ${results.percentage}%    |    Número do Casal: ${results.finalNumber}`, marginX, y);
      y += 8;

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      checkPage(6);
      pdf.text(`${data.nomeP1.split(' ')[0]}: Alma ${results.soulNumberP1} | Expressão ${results.expressionP1} | Destino ${results.destinyP1}`, marginX, y);
      y += 5;
      checkPage(6);
      pdf.text(`${data.nomeP2.split(' ')[0]}: Alma ${results.soulNumberP2} | Expressão ${results.expressionP2} | Destino ${results.destinyP2}`, marginX, y);
      y += 10;

      // ── Seções ──
      const sectionKeys = Object.keys(SECTION_NAMES);
      for (const key of sectionKeys) {
        const paragraphs = report.sections?.[key];
        if (!paragraphs || paragraphs.length === 0) continue;

        const sectionTitle = SECTION_NAMES[key];

        checkPage(12);
        y += 2;
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(13);
        pdf.text(sectionTitle, marginX, y);
        y += 7;

        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(10);

        for (const para of paragraphs) {
          checkPage(lineH + 2);
          y = renderText(pdf, para, marginX, y, maxChars, lineH, pageH - marginY);
          y += 2;
        }
      }

      // ── Rodapé ──
      checkPage(10);
      y += 3;
      pdf.setFont('helvetica', 'italic');
      pdf.setFontSize(8);
      const dateStr = new Date().toLocaleDateString('pt-BR');
      pdf.text(`Análise gerada em ${dateStr} para ${data.email}.`, marginX, y);

      pdf.save(`Mapa_Compatibilidade_${data.nomeP1.split(' ')[0]}_${data.nomeP2.split(' ')[0]}.pdf`);
    } catch (err) {
      console.error('Erro ao gerar PDF:', err);
      window.print();
    } finally {
      setGeneratingPdf(false);
    }
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}?ref=jornadainterior&p1=${encodeURIComponent(data.nomeP1)}&p2=${encodeURIComponent(data.nomeP2)}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <div className="glass-panel" style={{ maxWidth: '680px' }}>

      <div className="report-header">
        <span className="report-badge">
          <Sparkles size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
          Análise Completa Desbloqueada
        </span>
        <h2 className="report-title">{report.title}</h2>
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

      <div className="card-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <div className="stat-card" style={{ padding: '0.75rem' }}>
          <span className="stat-card-title">{data.nomeP1.split(' ')[0]}</span>
          <div style={{ fontSize: '0.8rem', opacity: 0.8, marginTop: '0.25rem' }}>
            Alma (Vogais): <strong style={{ color: '#3b82f6' }}>{results.soulNumberP1}</strong>
          </div>
          <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
            Expressão (Nome): <strong style={{ color: '#3b82f6' }}>{results.expressionP1}</strong>
          </div>
          <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
            Destino (Data): <strong style={{ color: '#3b82f6' }}>{results.destinyP1}</strong>
          </div>
        </div>
        <div className="stat-card" style={{ padding: '0.75rem' }}>
          <span className="stat-card-title">{data.nomeP2.split(' ')[0]}</span>
          <div style={{ fontSize: '0.8rem', opacity: 0.8, marginTop: '0.25rem' }}>
            Alma (Vogais): <strong style={{ color: 'var(--accent-orange)' }}>{results.soulNumberP2}</strong>
          </div>
          <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
            Expressão (Nome): <strong style={{ color: 'var(--accent-orange)' }}>{results.expressionP2}</strong>
          </div>
          <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
            Destino (Data): <strong style={{ color: 'var(--accent-orange)' }}>{results.destinyP2}</strong>
          </div>
        </div>
      </div>

      <div className="section-divider" style={{ margin: '1.5rem 0' }}></div>

      {SECTION_CONFIG.map(({ key, icon: Icon, title, color }) => {
        const paragraphs = report.sections?.[key];
        if (!paragraphs || paragraphs.length === 0) return null;

        return (
          <div key={key} className="report-block" style={{ borderLeft: `3px solid ${color}`, marginBottom: '1.25rem' }}>
            <h3 style={{ color }}>
              <Icon size={18} style={{ color, flexShrink: 0 }} />
              {title}
            </h3>
            {paragraphs.map((text, i) => (
              <p key={i} style={{ marginBottom: i < paragraphs.length - 1 ? '0.6rem' : 0 }}>
                {text}
              </p>
            ))}
          </div>
        );
      })}

      <div style={{
        background: 'rgba(255, 255, 255, 0.01)',
        border: '1px solid rgba(255, 255, 255, 0.03)',
        borderRadius: '10px',
        padding: '0.75rem',
        fontSize: '0.75rem',
        color: 'var(--text-muted)',
        textAlign: 'center',
        marginTop: '1rem'
      }}>
        Análise gerada em {new Date().toLocaleDateString('pt-BR')} para {data.email}.
        Link enviado também para o WhatsApp {data.whatsapp}.
      </div>

      <div className="report-actions">
        <button onClick={handleDownloadPdf} disabled={generatingPdf} className="btn btn-secondary" style={{ flex: 1 }}>
          {generatingPdf ? <Loader size={16} className="spin" /> : <Download size={16} />}
          {generatingPdf ? 'Gerando PDF...' : 'Baixar PDF'}
        </button>
        <button onClick={handlePrint} className="btn btn-secondary" style={{ flex: 1 }}>
          <Printer size={16} />
          Imprimir
        </button>
        <button onClick={handleShare} className="btn btn-secondary" style={{ flex: 1 }}>
          {copiedLink ? <Check size={16} style={{ color: '#10b981' }} /> : <Share2 size={16} />}
          {copiedLink ? 'Link Copiado!' : 'Compartilhar'}
        </button>
      </div>

      <button onClick={onReset} className="btn btn-orange" style={{ marginTop: '1.5rem', width: '100%' }}>
        <ArrowLeft size={16} />
        Fazer Nova Consulta
      </button>
    </div>
  );
}
