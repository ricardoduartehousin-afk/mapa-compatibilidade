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

export default function DevFab() {
  const navigate = useNavigate();

  if (!ENV.devToolsEnabled) return null;

  const handleClick = () => {
    sessionStorage.setItem('dev_test_data', JSON.stringify(testData));
    navigate('/');
  };

  return (
    <button
      onClick={handleClick}
      style={{
        position: 'fixed',
        top: 36,
        right: 16,
        zIndex: 99998,
        background: '#7c3aed',
        color: '#fff',
        border: 'none',
        borderRadius: 8,
        padding: '8px 16px',
        fontSize: '0.8rem',
        fontWeight: 600,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
      }}
    >
      🧪 Teste Rápido
    </button>
  );
}
