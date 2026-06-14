import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Check, Heart, User, Calendar, Mail, Phone, ShieldCheck } from 'lucide-react';

const STEPS = [
  {
    id: 'nomeP1',
    question: 'Qual é o seu nome completo?',
    subtitle: 'Nome de batismo, sem abreviações',
    icon: User,
    type: 'text',
    placeholder: 'Seu nome completo...',
    field: 'nomeP1'
  },
  {
    id: 'dataP1',
    question: 'E a sua data de nascimento?',
    subtitle: 'Precisamos dela para calcular seu caminho de destino',
    icon: Calendar,
    type: 'date',
    field: 'dataP1'
  },
  {
    id: 'nomeP2',
    question: 'Agora, qual o nome do seu amor?',
    subtitle: 'Nome completo de batismo do seu parceiro(a)',
    icon: Heart,
    type: 'text',
    placeholder: 'Nome completo dele(a)...',
    field: 'nomeP2'
  },
  {
    id: 'dataP2',
    question: 'E a data de nascimento dele(a)?',
    subtitle: 'Para cruzarmos os caminhos de destino',
    icon: Calendar,
    type: 'date',
    field: 'dataP2'
  },
  {
    id: 'email',
    question: 'Qual o seu melhor e-mail?',
    subtitle: 'Vamos enviar o mapa completo para você',
    icon: Mail,
    type: 'email',
    placeholder: 'seuemail@exemplo.com',
    field: 'email'
  },
  {
    id: 'whatsapp',
    question: 'E o seu WhatsApp?',
    subtitle: 'Para enviarmos o link do seu mapa',
    icon: Phone,
    type: 'tel',
    placeholder: '(99) 99999-9999',
    field: 'whatsapp'
  },
  {
    id: 'acceptedTerms',
    question: 'Quase lá! Aceita os termos?',
    subtitle: 'Precisamos da sua autorização para gerar o mapa',
    icon: ShieldCheck,
    type: 'checkbox',
    field: 'acceptedTerms',
    label: 'Concordo com a coleta de dados para fins de cálculo e envio da sinastria numerológica, de acordo com a LGPD.'
  }
];

const PHONE_MASK = (value) => {
  let v = value.replace(/\D/g, '');
  if (v.length > 11) v = v.slice(0, 11);
  if (v.length > 7) {
    return `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
  }
  if (v.length > 2) {
    return `(${v.slice(0, 2)}) ${v.slice(2)}`;
  }
  if (v.length > 0) {
    return `(${v}`;
  }
  return v;
};

export default function MultiStepForm({ onSubmit }) {
  const [currentStep, setCurrentStep] = useState(0);
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
  const [direction, setDirection] = useState('next');

  const step = STEPS[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === STEPS.length - 1;
  const progress = ((currentStep + 1) / STEPS.length) * 100;

  const updateField = (value) => {
    const field = step.field;
    if (field === 'whatsapp') {
      value = PHONE_MASK(value);
    }
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleCheckbox = () => {
    setFormData(prev => ({ ...prev, acceptedTerms: !prev.acceptedTerms }));
    setError('');
  };

  const validateStep = () => {
    const value = formData[step.field];
    if (step.type === 'checkbox') {
      if (!formData.acceptedTerms) {
        setError('Você precisa aceitar os termos para continuar.');
        return false;
      }
      return true;
    }
    if (!value || (typeof value === 'string' && !value.trim())) {
      const label = step.field === 'nomeP1' ? 'nome' :
        step.field === 'dataP1' ? 'data de nascimento' :
        step.field === 'nomeP2' ? 'nome do parceiro' :
        step.field === 'dataP2' ? 'data de nascimento' :
        step.field === 'email' ? 'e-mail' :
        step.field === 'whatsapp' ? 'WhatsApp' : 'campo';
      setError(`Por favor, preencha ${label}.`);
      return false;
    }
    if (step.field === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError('Digite um e-mail válido.');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    if (isLast) {
      onSubmit(formData);
      return;
    }
    setDirection('next');
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setDirection('prev');
    setCurrentStep(prev => prev - 1);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && step.type !== 'checkbox') {
      e.preventDefault();
      handleNext();
    }
  };

  const currentValue = formData[step.field];
  const isCheckboxChecked = step.type === 'checkbox' && formData.acceptedTerms;

  return (
    <div className="glass-panel multi-step-panel">
      {/* Progresso */}
      <div className="multi-step-progress">
        <div className="multi-step-bar-track">
          <div className="multi-step-bar-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <span className="multi-step-count">{currentStep + 1} de {STEPS.length}</span>
      </div>

      {/* Animação de entrada da pergunta */}
      <div className={`multi-step-content ${direction === 'next' ? 'slide-in-right' : 'slide-in-left'}`} key={currentStep}>
        {/* Ícone decorativo */}
        <div className="multi-step-icon-wrapper">
          <step.icon size={28} />
        </div>

        {/* Pergunta */}
        <h2 className="multi-step-question">{step.question}</h2>
        <p className="multi-step-subtitle">{step.subtitle}</p>

        {/* Input */}
        <div className="multi-step-input-area">
          {step.type === 'checkbox' ? (
            <label className="legal-checkbox multi-step-checkbox">
              <input
                type="checkbox"
                checked={isCheckboxChecked}
                onChange={handleCheckbox}
              />
              <span>{step.label}</span>
            </label>
          ) : step.type === 'date' ? (
            <input
              type="text"
              inputMode="numeric"
              placeholder="dd / mm / aaaa"
              value={currentValue}
              onChange={e => {
                const raw = e.target.value.replace(/\D/g, '').slice(0, 8);
                const formatted = raw
                  .replace(/^(\d{2})(\d)/, '$1 / $2')
                  .replace(/^(\d{2})\s\/\s(\d{2})(\d)/, '$1 / $2 / $3');
                updateField(formatted);
              }}
              onKeyDown={handleKeyDown}
              className="multi-step-input"
              autoFocus
            />
          ) : (
            <input
              type={step.type}
              value={currentValue}
              onChange={e => updateField(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={step.placeholder || ''}
              className="multi-step-input"
              autoFocus
            />
          )}
        </div>

        {/* Erro */}
        {error && (
          <div className="multi-step-error">{error}</div>
        )}

        {/* Dica */}
        {step.field === 'nomeP1' || step.field === 'nomeP2' ? (
          <p className="multi-step-hint">Digite o nome completo como na certidão de nascimento</p>
        ) : null}
      </div>

      {/* Navegação */}
      <div className="multi-step-nav">
        {!isFirst ? (
          <button onClick={handleBack} className="btn btn-nav btn-nav-back">
            <ArrowLeft size={18} />
            Voltar
          </button>
        ) : <div />}

        <button onClick={handleNext} className={`btn btn-nav btn-nav-next ${isLast ? 'btn-orange' : ''}`}>
          {isLast ? 'Ver Compatibilidade' : 'Próximo'}
          {isLast ? <Check size={18} /> : <ArrowRight size={18} />}
        </button>
      </div>
    </div>
  );
}
