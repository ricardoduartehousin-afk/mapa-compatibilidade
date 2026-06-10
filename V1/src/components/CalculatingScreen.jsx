import React, { useEffect, useState } from 'react';

const STATUS_MESSAGES = [
  { limit: 20, text: 'Estabelecendo conexões astrólogicas...' },
  { limit: 40, text: 'Decodificando vibração dos nomes de batismo...' },
  { limit: 60, text: 'Calculando caminho de destino e datas...' },
  { limit: 80, text: 'Cruzando sinastria de almas e afinidades...' },
  { limit: 100, text: 'Finalizando mapa de compatibilidade completo...' }
];

export default function CalculatingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('Inicializando motor numerológico...');

  useEffect(() => {
    // Incrementa a barra a cada 50ms para demorar ~5 segundos no total
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const next = prev + 1;
        
        // Atualiza a mensagem baseado na porcentagem
        const currentMsg = STATUS_MESSAGES.find(m => next <= m.limit);
        if (currentMsg) {
          setMessage(currentMsg.text);
        }

        return next;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => {
        onComplete();
      }, 600); // Pequeno delay pós-100% para visualização
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  return (
    <div className="glass-panel" style={{ display: 'flex', justifyContent: 'center' }}>
      <div className="loader-container">
        <div className="mystical-ring-container">
          <div className="mystical-ring"></div>
          <div className="mystical-ring-inner"></div>
          <div className="mystical-ring-center"></div>
        </div>

        <h3 className="loader-status">{message}</h3>
        
        <div style={{ color: 'var(--accent-orange)', fontWeight: 'bold', fontSize: '1.2rem', marginTop: '0.5rem' }}>
          {progress}%
        </div>

        <div className="loader-bar-bg">
          <div 
            className="loader-bar-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <p style={{ color: 'var(--text-muted, #94a3b8)', fontSize: '0.8rem', marginTop: '1rem', fontStyle: 'italic' }}>
          Conectando vibrações da tabela Pitagórica...
        </p>
      </div>
    </div>
  );
}
