import { useNavigate } from 'react-router-dom';
import ENV from '../config/env';

const testData = {
  nomeP1: 'Ana Silva',
  dataP1: '15/03/1990',
  nomeP2: 'João Santos',
  dataP2: '20/07/1988',
  email: 'teste@dev.com',
  whatsapp: '(11) 99999-8888',
};

export default function DevFab({ onGenerateTest }) {
  if (!ENV.devToolsEnabled) return null;

  return (
    <button
      onClick={() => onGenerateTest(testData)}
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 99998,
        background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
        color: '#fff',
        border: 'none',
        borderRadius: 60,
        padding: '14px 24px',
        fontSize: '0.85rem',
        fontWeight: 700,
        cursor: 'pointer',
        boxShadow: '0 4px 20px rgba(124, 58, 237, 0.4)',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        transition: 'transform 0.2s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      🧪 Teste Rápido
    </button>
  );
}
