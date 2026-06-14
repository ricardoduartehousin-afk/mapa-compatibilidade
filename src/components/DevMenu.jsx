import { NavLink } from 'react-router-dom';
import { BarChart3, FileText, Activity, Beaker, Heart, ArrowLeft } from 'lucide-react';

const links = [
  { to: '/dev', label: 'Admin', icon: BarChart3 },
  { to: '/dev/mapadecompatibilidade', label: 'Mapa', icon: Heart },
  { to: '/relatorios', label: 'Relatórios', icon: FileText },
  { to: '/logs', label: 'Logs', icon: Activity },
  { to: '/testes', label: 'Testes', icon: Beaker },
];

export default function DevMenu() {
  return (
    <nav style={{
      background: 'rgba(30, 30, 50, 0.95)',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      padding: '0 16px',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      overflowX: 'auto',
    }}>
      <NavLink
        to="/"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '10px 12px',
          color: '#94a3b8',
          fontSize: '0.8rem',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        <ArrowLeft size={14} />
        Voltar ao App
      </NavLink>

      <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.1)', margin: '0 4px' }} />

      {links.map(link => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.to === '/dev'}
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '10px 12px',
            color: isActive ? '#a78bfa' : '#94a3b8',
            fontSize: '0.8rem',
            textDecoration: 'none',
            borderBottom: isActive ? '2px solid #a78bfa' : '2px solid transparent',
            whiteSpace: 'nowrap',
          })}
        >
          <link.icon size={14} />
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}
