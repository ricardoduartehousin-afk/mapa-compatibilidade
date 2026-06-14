import React, { useState, useEffect } from 'react';
import { Lock, CreditCard, ShieldCheck, CheckCircle2, Clock, Copy, Check } from 'lucide-react';

export default function PaywallModal({ percentage, onPaymentSuccess }) {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutos em segundos
  const [copied, setCopied] = useState(false);

  // Exemplo de código Pix Mockado para simulação
  const pixCode = "00020101021226870014br.gov.bcb.pix2565api.asaas.com/v1/pix/qr-codes/1234567890abcdef1234567890abcdef520400005303986540519.905802BR5916TesteDeAfinidade6009SaoPaulo62070503***6304abcd";

  // Contador regressivo
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="glass-panel paywall-content">
      <span className="paywall-badge">Afinidade Parcial Revelada</span>
      
      <div className="affinity-circle-container">
        <div className="affinity-circle">
          <span className="affinity-val">{percentage}%</span>
          <span className="affinity-label">Compatibilidade</span>
        </div>
      </div>

      <p className="paywall-desc">
        A vibração cósmica inicial de vocês foi analisada com sucesso! Há um fluxo energético importante entre vocês, mas o segredo da longevidade reside nos detalhes ocultos.
      </p>

      {/* BLOCOS BLOQUEADOS */}
      <div className="locked-box">
        <h4 style={{ fontSize: '0.9rem', color: '#fff', marginBottom: '0.75rem', fontWeight: 600 }}>
          O seu Relatório Completo de Sinastria contém:
        </h4>
        <div className="locked-item">
          <Lock size={14} />
          <span><strong>Vibração da Expressão:</strong> O potencial oculto na soma das letras de seus nomes.</span>
        </div>
        <div className="locked-item">
          <Lock size={14} />
          <span><strong>Caminho de Destino:</strong> O alinhamento dos propósitos através da data de nascimento.</span>
        </div>
        <div className="locked-item">
          <Lock size={14} />
          <span><strong>Desafios & Conflitos:</strong> Alertas importantes sobre onde vocês podem colidir.</span>
        </div>
        <div className="locked-item">
          <Lock size={14} />
          <span><strong>Conselho do Destino:</strong> Dicas práticas para harmonizar a união.</span>
        </div>
      </div>

      {/* SEÇÃO DE PAGAMENTO */}
      <div className="payment-section">
        <div className="price-container">
          <span className="price-old">De R$ 39,90</span>
          <span className="price-new">Por R$ 19,90</span>
        </div>

        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Pague uma única vez com Pix seguro. Acesso vitalício e envio no e-mail/WhatsApp.
        </p>

        {/* QR Code Mockado */}
        <div className="qr-code-box">
          {/* Usamos uma imagem estática ou geramos via API pública. Vamos usar qrserver para gerar o Pix mockado de verdade! */}
          <img 
            src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(pixCode)}`} 
            alt="Pix QR Code" 
            style={{ width: '140px', height: '140px', display: 'block' }}
          />
        </div>

        <div className="timer-box">
          <Clock size={14} />
          <span>O Pix expira em: </span>
          <span style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>{formatTime(timeLeft)}</span>
        </div>

        <button 
          onClick={handleCopyPix}
          className="btn btn-secondary" 
          style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}
        >
          {copied ? <Check size={16} style={{ color: '#10b981' }} /> : <Copy size={16} />}
          {copied ? 'Código Copiado!' : 'Copiar Código Copiar Pix'}
        </button>

        <div className="copy-feedback">
          {copied && 'Pronto! Cole no aplicativo do seu banco para pagar.'}
        </div>

        {/* SIMULADOR DE APROVAÇÃO (CRUCIAL PARA O MVP) */}
        <div className="simulation-banner">
          <p>🔒 <strong>Área de Simulação de Vendas</strong></p>
          <p style={{ fontSize: '0.75rem', marginTop: '0.25rem', opacity: 0.85 }}>
            Clique abaixo para simular a resposta automática do Webhook de pagamento.
          </p>
          <button 
            type="button" 
            onClick={onPaymentSuccess}
            id="btn-simulate-payment"
          >
            Simular Pagamento Aprovado
          </button>
        </div>
      </div>
    </div>
  );
}
