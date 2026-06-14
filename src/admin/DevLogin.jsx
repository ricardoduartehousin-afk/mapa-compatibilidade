import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from './api';

export default function DevLogin() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !pass) { setError('Preencha usuário e senha'); return; }
    setLoading(true);
    setError('');
    try {
      await login(user, pass);
      navigate('/dev/dashboard');
    } catch {
      setError('Usuário ou senha inválidos');
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0b0e1a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <form onSubmit={handleSubmit} style={{
        background: '#141729',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '16px',
        padding: '40px 32px',
        width: '360px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '1.3rem', color: '#e2e8f0', margin: 0 }}>
            Teste de <span style={{ color: '#f97316' }}>Afinidade</span>
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '6px' }}>
            Painel de Desenvolvimento
          </p>
        </div>

        <input
          type="text"
          placeholder="Usuário"
          value={user}
          onChange={e => setUser(e.target.value)}
          style={inputStyle}
          autoFocus
        />
        <input
          type="password"
          placeholder="Senha"
          value={pass}
          onChange={e => setPass(e.target.value)}
          style={inputStyle}
        />

        {error && (
          <p style={{ color: '#ef4444', fontSize: '0.85rem', textAlign: 'center', margin: '8px 0' }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            ...btnStyle,
            opacity: loading ? 0.6 : 1
          }}
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px 14px',
  background: '#1e2235',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '8px',
  color: '#e2e8f0',
  fontSize: '0.9rem',
  marginBottom: '12px',
  outline: 'none',
  boxSizing: 'border-box'
};

const btnStyle = {
  width: '100%',
  padding: '12px',
  background: 'linear-gradient(135deg, #f97316, #ea580c)',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  fontSize: '1rem',
  fontWeight: 600,
  cursor: 'pointer',
  marginTop: '4px'
};
