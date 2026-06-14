import ENV from '../config/env';

const styles = {
  backgroundColor: '#dc2626',
  color: '#fff',
  textAlign: 'center',
  padding: '6px 16px',
  fontSize: '0.75rem',
  fontWeight: 700,
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 99999,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
};

export default function DevBadge({ children }) {
  if (!ENV.isDevelopment) return children;

  return (
    <>
      <div style={styles}>
        <span style={{ fontSize: '0.85rem' }}>⚡</span>
        Ambiente de Desenvolvimento
        <span style={{ fontSize: '0.85rem' }}>⚡</span>
      </div>
      <div style={{ paddingTop: '30px' }}>{children}</div>
    </>
  );
}
