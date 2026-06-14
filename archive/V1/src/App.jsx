import React, { useState } from 'react';
import MultiStepForm from './components/MultiStepForm';
import CalculatingScreen from './components/CalculatingScreen';
import PaywallModal from './components/PaywallModal';
import FullReport from './components/FullReport';
import { calculateCompatibility } from './utils/numerology';

export default function App() {
  const [step, setStep] = useState('input'); // 'input' | 'calculating' | 'paywall' | 'report'
  const [formData, setFormData] = useState(null);
  const [results, setResults] = useState(null);

  const handleFormSubmit = (data) => {
    setFormData(data);
    
    // Calcula os números de compatibilidade na hora
    const res = calculateCompatibility(
      data.nomeP1,
      data.dataP1,
      data.nomeP2,
      data.dataP2
    );
    setResults(res);

    // Salva o lead no localStorage (simulando salvar no banco de dados)
    const leads = JSON.parse(localStorage.getItem('teste_de_afinidade_leads') || '[]');
    leads.push({ ...data, status: 'pendente', createdAt: new Date().toISOString() });
    localStorage.setItem('teste_de_afinidade_leads', JSON.stringify(leads));

    setStep('calculating');
  };

  const handleCalculatingComplete = () => {
    setStep('paywall');
  };

  const handlePaymentSuccess = () => {
    // Atualiza status do lead no localStorage para pago
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

    setStep('report');
  };

  const handleReset = () => {
    setFormData(null);
    setResults(null);
    setStep('input');
  };

  return (
    <div className="cosmic-container">
      {/* Luzes cósmicas de fundo */}
      <div className="glow-orb glow-blue"></div>
      <div className="glow-orb glow-orange"></div>

      <header className="header-logo">
        <h1>Teste de <span>Afinidade</span></h1>
        <p>Análise de Compatibilidade do Casal</p>
      </header>

      {/* Renderização condicional das telas */}
      {step === 'input' && (
        <MultiStepForm onSubmit={handleFormSubmit} />
      )}

      {step === 'calculating' && (
        <CalculatingScreen onComplete={handleCalculatingComplete} />
      )}

      {step === 'paywall' && results && (
        <PaywallModal 
          percentage={results.percentage} 
          onPaymentSuccess={handlePaymentSuccess} 
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
        <p>© {new Date().getFullYear()} Teste de Afinidade. Todos os direitos reservados.</p>
        <p style={{ marginTop: '0.25rem', fontSize: '0.7rem', opacity: 0.7 }}>
          Desenvolvido com fins de autoconhecimento e orientação numerológica.
        </p>
      </footer>
    </div>
  );
}
