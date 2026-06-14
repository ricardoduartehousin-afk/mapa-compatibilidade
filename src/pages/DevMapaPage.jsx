import React, { useState } from 'react';
import MultiStepForm from '../components/MultiStepForm';
import CalculatingScreen from '../components/CalculatingScreen';
import PaywallModal from '../components/PaywallModal';
import MapaResultado from '../components/MapaResultado';
import { calculateCompatibility } from '../utils/numerology';

const API = import.meta.env.VITE_API_URL || '';

export default function DevMapaPage() {
  const [step, setStep] = useState('input');
  const [formData, setFormData] = useState(null);
  const [results, setResults] = useState(null);
  const [leadId, setLeadId] = useState(null);

  const handleFormSubmit = async (data) => {
    setFormData(data);

    const res = calculateCompatibility(data.nomeP1, data.dataP1, data.nomeP2, data.dataP2);
    setResults(res);

    const leads = JSON.parse(localStorage.getItem('teste_de_afinidade_leads') || '[]');
    leads.push({ ...data, status: 'pendente', createdAt: new Date().toISOString() });
    localStorage.setItem('teste_de_afinidade_leads', JSON.stringify(leads));

    try {
      const response = await fetch(`${API}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        const lead = await response.json();
        setLeadId(lead.id);
        if (res?.percentage) {
          await fetch(`${API}/api/leads/${lead.id}/percentage`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ percentage: res.percentage })
          });
        }
      }
    } catch {
      console.log('Backend indisponível, usando armazenamento local');
    }

    setStep('calculating');
  };

  const handleCalculatingComplete = () => {
    setStep('paywall');
  };

  const handlePaymentSuccess = () => {
    if (formData) {
      const leads = JSON.parse(localStorage.getItem('teste_de_afinidade_leads') || '[]');
      const updatedLeads = leads.map(lead => {
        if (lead.email === formData.email && lead.whatsapp === formData.whatsapp) {
          return { ...lead, status: 'pago' };
        }
        return lead;
      });
      localStorage.setItem('teste_de_afinidade_leads', JSON.stringify(updatedLeads));
    }
    setStep('done');
  };

  const handleReset = () => {
    setFormData(null);
    setResults(null);
    setLeadId(null);
    setStep('input');
  };

  return (
    <div className="cosmic-container" style={{ paddingTop: 30 }}>
      <div className="glow-orb glow-blue"></div>
      <div className="glow-orb glow-orange"></div>

      <header className="header-logo">
        <h1>Teste de <span>Afinidade</span></h1>
        <p style={{ color: '#a78bfa', fontSize: '0.75rem', fontWeight: 600 }}>
          ⚡ Ambiente DEV — Mapa de Compatibilidade
        </p>
      </header>

      {step === 'input' && (
        <MultiStepForm onSubmit={handleFormSubmit} />
      )}

      {step === 'calculating' && (
        <CalculatingScreen onComplete={handleCalculatingComplete} />
      )}

      {step === 'paywall' && results && (
        <>
          <PaywallModal
            percentage={results.percentage}
            leadId={leadId}
            onPaymentSuccess={handlePaymentSuccess}
          />
          <p style={{ color: '#64748b', fontSize: '0.75rem', textAlign: 'center', marginTop: '16px' }}>
            Pagamento 100% seguro • QR Code Pix • Pagamento processado por Asaas
          </p>
          <div style={{ textAlign: 'center', marginTop: 8 }}>
            <button
              onClick={handlePaymentSuccess}
              className="btn btn-secondary"
              style={{ background: '#3b82f6', color: 'white', border: 'none' }}
            >
              🚀 Pular Pagamento (DEV)
            </button>
          </div>
        </>
      )}

      {step === 'done' && results && formData && (
        <MapaResultado
          data={formData}
          results={results}
          onReset={handleReset}
        />
      )}

      <footer className="footer-text">
        <p>© {new Date().getFullYear()} Teste de Afinidade. Todos os direitos reservados.</p>
        <p style={{ marginTop: '0.25rem', fontSize: '0.7rem', opacity: 0.7 }}>
          Desenvolvido com fins de autoconhecimento e orientação numerológica.
        </p>
      </footer>
    </div>
  );
}
