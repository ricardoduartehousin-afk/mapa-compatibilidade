import React, { useState } from 'react';
import { Heart, User, Calendar, Mail, Phone, ShieldCheck } from 'lucide-react';

export default function LandingPage({ onSubmit }) {
  const [formData, setFormData] = useState({
    nomeP1: '',
    dataP1: '',
    nomeP2: '',
    dataP2: '',
    email: '',
    whatsapp: '',
    acceptedTerms: false
  });

  const [error, setError] = useState('');

  // Máscara simples para celular (XX) XXXXX-XXXX
  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
    if (value.length > 7) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }
    setFormData({ ...formData, whatsapp: value });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validações básicas
    if (!formData.nomeP1.trim() || !formData.nomeP2.trim()) {
      setError('Por favor, digite os nomes de batismo completos de ambos.');
      return;
    }
    if (!formData.dataP1 || !formData.dataP2) {
      setError('Por favor, preencha as datas de nascimento de ambos.');
      return;
    }
    if (!formData.email.trim() || !formData.whatsapp.trim()) {
      setError('Os dados de contato (E-mail e WhatsApp) são necessários para o envio do mapa.');
      return;
    }
    if (!formData.acceptedTerms) {
      setError('É necessário aceitar os termos de uso e política de privacidade.');
      return;
    }

    // Passa os dados para o App.jsx
    onSubmit(formData);
  };

  return (
    <div className="glass-panel">
      <h2 className="form-title">Verificar Compatibilidade</h2>
      
      {error && (
        <div style={{
          backgroundColor: 'rgba(239, 68, 68, 0.15)',
          border: '1px solid rgba(239, 68, 68, 0.4)',
          borderRadius: '8px',
          padding: '0.75rem',
          marginBottom: '1rem',
          fontSize: '0.85rem',
          color: '#fca5a5',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} id="compatibility-form">
        
        {/* PARCEIRO 1 */}
        <div className="partner-section">
          <div className="partner-label blue">
            <Heart size={18} fill="#3b82f6" /> Você
          </div>
          
          <div className="form-group">
            <label htmlFor="nomeP1">Seu Nome de Batismo</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                id="nomeP1"
                name="nomeP1"
                placeholder="Nome completo (sem abreviações)"
                value={formData.nomeP1}
                onChange={handleChange}
                className="blue-focus"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="dataP1">Sua Data de Nascimento</label>
            <input
              type="date"
              id="dataP1"
              name="dataP1"
              value={formData.dataP1}
              onChange={handleChange}
              className="blue-focus"
              required
            />
          </div>
        </div>

        <div className="section-divider"></div>

        {/* PARCEIRO 2 */}
        <div className="partner-section">
          <div className="partner-label">
            <Heart size={18} fill="var(--accent-orange)" /> Parceiro(a)
          </div>

          <div className="form-group">
            <label htmlFor="nomeP2">Nome de Batismo Dele(a)</label>
            <input
              type="text"
              id="nomeP2"
              name="nomeP2"
              placeholder="Nome completo (sem abreviações)"
              value={formData.nomeP2}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="dataP2">Data de Nascimento Dele(a)</label>
            <input
              type="date"
              id="dataP2"
              name="dataP2"
              value={formData.dataP2}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="section-divider"></div>

        {/* CONTATO / LEAD */}
        <div className="partner-section">
          <div className="partner-label" style={{ color: '#fff', fontSize: '0.9rem' }}>
            Onde enviar seu Mapa Completo?
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Seu Melhor E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="seuemail@exemplo.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="whatsapp">WhatsApp</label>
              <input
                type="tel"
                id="whatsapp"
                name="whatsapp"
                placeholder="(99) 99999-9999"
                value={formData.whatsapp}
                onChange={handlePhoneChange}
                required
              />
            </div>
          </div>
        </div>

        <label className="legal-checkbox" htmlFor="acceptedTerms">
          <input
            type="checkbox"
            id="acceptedTerms"
            name="acceptedTerms"
            checked={formData.acceptedTerms}
            onChange={handleChange}
          />
          <span>
            Concordo com a coleta de dados acima para fins de cálculo e envio da sinastria numerológica, de acordo com as diretrizes da LGPD.
          </span>
        </label>

        <button type="submit" className="btn btn-orange" style={{ marginTop: '1.5rem' }} id="btn-submit-calculate">
          Calcular Compatibilidade
        </button>
      </form>
    </div>
  );
}
