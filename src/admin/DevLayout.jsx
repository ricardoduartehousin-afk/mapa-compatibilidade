import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout, getUser } from './api';

const NAV = [
  { path: '/dev/dashboard', label: 'Dashboard', icon: '📊' },
  { path: '/dev/leads', label: 'Cadastros', icon: '📋' },
];

export default function DevLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    logout();
    navigate('/dev');
  };

  return (
    <div style={styles.wrapper}>
      <header style={styles.header}>
        <Link to="/dev/dashboard" style={styles.logo}>
          Teste de <span style={{ color: '#f97316' }}>Afinidade</span>
          <span style={styles.badge}>DEV</span>
        </Link>
        <nav style={styles.nav}>
          {NAV.map(item => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                ...styles.navLink,
                ...(location.pathname === item.path ? styles.navLinkActive : {})
              }}
            >
              {item.icon} {item.label}
            </Link>
          ))}
        </nav>
        <div style={styles.userArea}>
          <span style={styles.userName}>{user}</span>
          <button onClick={handleLogout} style={styles.logoutBtn}>Sair</button>
        </div>
      </header>
      <main style={styles.main}>
        {children}
      </main>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: '100vh',
    background: '#0b0e1a',
    color: '#e2e8f0',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  header: {
    background: '#141729',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    padding: '0 24px',
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    gap: '32px'
  },
  logo: {
    color: '#e2e8f0',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  badge: {
    background: 'rgba(249,115,22,0.15)',
    color: '#f97316',
    fontSize: '0.65rem',
    padding: '2px 6px',
    borderRadius: '4px',
    fontWeight: 700,
    letterSpacing: '0.05em'
  },
  nav: {
    display: 'flex',
    gap: '4px',
    flex: 1
  },
  navLink: {
    color: '#94a3b8',
    textDecoration: 'none',
    padding: '6px 14px',
    borderRadius: '6px',
    fontSize: '0.9rem',
    transition: 'all 0.2s'
  },
  navLinkActive: {
    color: '#fff',
    background: 'rgba(249,115,22,0.12)'
  },
  userArea: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  userName: {
    color: '#94a3b8',
    fontSize: '0.85rem'
  },
  logoutBtn: {
    background: 'rgba(239,68,68,0.12)',
    color: '#ef4444',
    border: '1px solid rgba(239,68,68,0.2)',
    padding: '6px 14px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: 500
  },
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '24px'
  }
};
