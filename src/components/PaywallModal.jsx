import React, { useState, useEffect } from 'react';
import { Lock, Clock, Copy, Check, AlertTriangle, RefreshCw } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || '';

export default function PaywallModal({ percentage, leadId, onPaymentSuccess }) {
  const [timeLeft, setTimeLeft] = useState(600);
  const [copied, setCopied] = useState(false);
  const [expired, setExpired] = useState(false);
  const [pixData, setPixData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pixError, setPixError] = useState(false);
  const [polling, setPolling] = useState(false);

  const fallbackPixCode = "00020101021226870014br.gov.bcb.pix2565api.asaas.com/v1/pix/qr-codes/1234567890abcdef1234567890abcdef520400005303986540519.905802BR5916JornadaInterior6009SaoPaulo62070503***6304abcd";

  useEffect(() => {
    if (leadId) {
      gerarPix();
    } else {
      setPixData(null);
      setLoading(false);
    }
  }, [leadId]);

  const gerarPix = async () => {
    setLoading(true);
    setPixError(false);

    try {
      const response = await fetch(`${API}/api/pix/gerar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId })
      });

      if (!response.ok) throw new Error('Erro ao gerar Pix');

      const data = await response.json();

      if (data.pago) {
        onPaymentSuccess();
        return;
      }

      setPixData(data);
      setTimeLeft(data.expiration || 600);
      setExpired(false);

      if (data.asaasId) {
        setPolling(true);
      }
    } catch {
      setPixError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!polling || !leadId) return;

    const interval = setInterval(async () => {
      try {
        const response = await fetch(`${API}/api/leads/${leadId}/status`);
        if (response.ok) {
          const data = await response.json();
          if (data.status === 'pago') {
            clearInterval(interval);
            setPolling(false);
            onPaymentSuccess();
          }
        }
      } catch {
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [polling, leadId, onPaymentSuccess]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setExpired(true);
      setPolling(false);
      return;
    }
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
    const code = pixData?.pixCode || fallbackPixCode;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleRefresh = () => {
    if (leadId) {
      gerarPix();
    } else {
      setTimeLeft(600);
      setExpired(false);
      setCopied(false);
    }
  };

  const handleSimularPagamento = async () => {
    if (leadId) {
      try {
        await fetch(`${API}/api/pix/simular-pagamento`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ leadId })
        });
      } catch {
      }
    }
    onPaymentSuccess();
  };

  const qrCodeUrl = pixData?.qrCode
    ? pixData.qrCode
    : `https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(fallbackPixCode)}`;

  const pixCodeToShow = pixData?.pixCode || fallbackPixCode;

  const isLow = timeLeft <= 60 && !expired;

  return (
    <div className="glass-panel paywall-content">
      <span className="paywall-badge">Afinidade Parcial Revelada</span>

      <div className="affinity-circle-container">
        <div className={`affinity-circle ${isLow ? 'affinity-circle-low' : ''} ${expired ? 'affinity-circle-expired' : ''}`}>
          <span className="affinity-val">{percentage}%</span>
          <span className="affinity-label">Compatibilidade</span>
        </div>
      </div>

      <p className="paywall-desc">
        A conexão inicial de vocês foi analisada com sucesso! Mas o mapa completo — os números de destino, alma, compatibilidades e incompatibilidades — está bloqueado.
      </p>

      <div className="locked-box">
        <h4 style={{ fontSize: '0.9rem', color: '#fff', marginBottom: '0.75rem', fontWeight: 600 }}>
          Ao desbloquear, você vai descobrir:
        </h4>
        <div className="locked-item">
          <Lock size={14} />
          <span><strong>Personalidade e Destino:</strong> Quem você é e para onde está indo.</span>
        </div>
        <div className="locked-item">
          <Lock size={14} />
          <span><strong>Número da Alma:</strong> Seus desejos mais profundos no amor.</span>
        </div>
        <div className="locked-item">
          <Lock size={14} />
          <span><strong>Compatibilidades:</strong> O que une e fortalece o casal.</span>
        </div>
        <div className="locked-item">
          <Lock size={14} />
          <span><strong>Incompatibilidades:</strong> O que precisa de atenção na relação.</span>
        </div>
      </div>

      <div className="payment-section">
        <div className="price-container">
          <span className="price-old">De R$ 39,90</span>
          <span className="price-new">Por R$ 19,90</span>
        </div>

        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Pague uma única vez com Pix. Acesso vitalício ao mapa completo.
        </p>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <div className="spinner" style={{ width: 32, height: 32, border: '3px solid var(--border)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 0.75rem' }}></div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Gerando código Pix...</p>
          </div>
        ) : !expired ? (
          <>
            <div className="qr-code-box">
              <img
                src={qrCodeUrl}
                alt="Pix QR Code"
                style={{ width: '140px', height: '140px', display: 'block' }}
                onError={(e) => { e.target.style.display = 'none'; setPixError(true); }}
              />
            </div>

            <div className={`timer-box ${isLow ? 'timer-box-low' : ''}`}>
              <Clock size={14} />
              <span>O Pix expira em: </span>
              <span className="timer-digits">{formatTime(timeLeft)}</span>
              {isLow && <span className="timer-urgent">URGENTE</span>}
            </div>

            <button
              onClick={handleCopyPix}
              className="btn btn-secondary"
              style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}
            >
              {copied ? <Check size={16} style={{ color: '#10b981' }} /> : <Copy size={16} />}
              {copied ? 'Código Copiado!' : 'Copiar Código Pix'}
            </button>

            <div className="copy-feedback">
              {copied && 'Pronto! Cole no app do seu banco para pagar.'}
            </div>

            {polling && (
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                Aguardando confirmação do pagamento...
              </p>
            )}
          </>
        ) : (
          <div className="expired-box">
            <AlertTriangle size={24} />
            <p>Tempo esgotado! O QR Code expirou.</p>
            <button onClick={handleRefresh} className="btn btn-secondary" style={{ marginTop: '0.75rem' }}>
              <RefreshCw size={16} />
              Gerar Novo Código
            </button>
          </div>
        )}

        <div className="simulation-banner">
          <p>🔒 <strong>Simulação de Pagamento</strong></p>
          <p style={{ fontSize: '0.75rem', marginTop: '0.25rem', opacity: 0.85 }}>
            Clique para testar o fluxo de pagamento aprovado.
          </p>
          <button
            type="button"
            onClick={handleSimularPagamento}
            id="btn-simulate-payment"
          >
            Simular Pagamento Aprovado
          </button>
        </div>
      </div>
    </div>
  );
}
