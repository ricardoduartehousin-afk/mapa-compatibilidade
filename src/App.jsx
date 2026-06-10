import React, { useState } from 'react';
import MultiStepForm from './components/MultiStepForm';
import CalculatingScreen from './components/CalculatingScreen';
import PaywallModal from './components/PaywallModal';
import ResultsScreen from './components/ResultsScreen';
import FullReport from './components/FullReport';
import { calculateCompatibility } from './utils/numerology';

const API = import.meta.env.VITE_API_URL || '';

export default function App() {
  const [step, setStep] = useState('input');
  const [formData, setFormData] = useState(null);
  const [results, setResults] = useState(null);
  const [leadId, setLeadId] = useState(null);

  const handleFormSubmit = async (data) => {
    setFormData(data);

    const res = calculateCompatibility(data.nomeP1, data.dataP1, data.nomeP2, data.dataP2);
    setResults(res);

    const leads = JSON.parse(localStorage.getItem('jornada_interior_leads') || '[]');
    leads.push({ ...data, status: 'pendente', createdAt: new Date().toISOString() });
    localStorage.setItem('jornada_interior_leads', JSON.stringify(leads));

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
          await fetch(`${API}/api/leads/${lead.id}`, {
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
      const leads = JSON.parse(localStorage.getItem('jornada_interior_leads') || '[]');
      const updatedLeads = leads.map(lead => {
        if (lead.email === formData.email && lead.whatsapp === formData.whatsapp) {
          return { ...lead, status: 'pago' };
        }
        return lead;
      });
      localStorage.setItem('jornada_interior_leads', JSON.stringify(updatedLeads));
    }

    setStep('results');
  };

  const handleContinueToFullReport = () => {
    setStep('report');
  };

  const handleReset = () => {
    setFormData(null);
    setResults(null);
    setLeadId(null);
    setStep('input');
  };

  return (
    <div className="cosmic-container">
      <div className="glow-orb glow-blue"></div>
      <div className="glow-orb glow-orange"></div>

      <header className="header-logo">
        <h1>Jornada <span>Interior</span></h1>
        <p>Análise de Compatibilidade do Casal</p>
      </header>

      {step === 'input' && (
        <MultiStepForm onSubmit={handleFormSubmit} />
      )}

      {step === 'calculating' && (
        <CalculatingScreen onComplete={handleCalculatingComplete} />
      )}

      {step === 'paywall' && results && (
        <PaywallModal
          percentage={results.percentage}
          leadId={leadId}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      {step === 'results' && results && formData && (
        <ResultsScreen
          data={formData}
          results={results}
          onContinue={handleContinueToFullReport}
        />
      )}

      {step === 'report' && results && formData && (
        <FullReport
          data={formData}
          results={results}
          onReset={handleReset}
        />
      )}

      <footer className="footer-text">
        <p>© {new Date().getFullYear()} Jornada Interior. Todos os direitos reservados.</p>
        <p style={{ marginTop: '0.25rem', fontSize: '0.7rem', opacity: 0.7 }}>
          Desenvolvido com fins de autoconhecimento e orientação numerológica.
        </p>
      </footer>
    </div>
  );
}
