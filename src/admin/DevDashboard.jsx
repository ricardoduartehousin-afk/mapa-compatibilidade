import React, { useState, useEffect } from 'react';
import { fetchStats, fetchLeads } from './api';

function StatCard({ label, value, color }) {
  return (
    <div style={{
      background: '#141729',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: '12px',
      padding: '20px'
    }}>
      <p style={{ color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 6px' }}>
        {label}
      </p>
      <p style={{ fontSize: '2.2rem', fontWeight: 700, color, margin: 0 }}>{value}</p>
    </div>
  );
}

export default function DevDashboard() {
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchStats(), fetchLeads()])
      .then(([s, leads]) => {
        setStats(s);
        setRecent(leads.slice(0, 10));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px', color: '#94a3b8' }}>
        Carregando...
      </div>
    );
  }

  const conversionRate = stats?.total > 0
    ? ((stats.pagos / stats.total) * 100).toFixed(1)
    : '0.0';

  return (
    <div>
      <h2 style={{ color: '#fff', fontSize: '1.4rem', marginBottom: '20px' }}>Dashboard</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        <StatCard label="Total de Cadastros" value={stats?.total || 0} color="#f97316" />
        <StatCard label="Pendentes" value={stats?.pendentes || 0} color="#f59e0b" />
        <StatCard label="Pagos" value={stats?.pagos || 0} color="#10b981" />
        <StatCard label="Taxa de Conversão" value={`${conversionRate}%`} color="#3b82f6" />
      </div>

      <div style={{
        background: '#141729',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h3 style={{ color: '#fff', fontSize: '1.1rem', margin: '0 0 16px' }}>Últimos Cadastros</h3>

        {recent.length === 0 ? (
          <p style={{ color: '#94a3b8', textAlign: 'center', padding: '24px' }}>Nenhum cadastro ainda</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <th style={thStyle}>#</th>
                  <th style={thStyle}>Pessoa 1</th>
                  <th style={thStyle}>Pessoa 2</th>
                  <th style={thStyle}>Email</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>%</th>
                  <th style={thStyle}>Data</th>
                </tr>
              </thead>
              <tbody>
                {recent.map(lead => (
                  <tr key={lead.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                    <td style={tdStyle}>{lead.id}</td>
                    <td style={tdStyle}>{lead.nomeP1?.split(' ')[0]}</td>
                    <td style={tdStyle}>{lead.nomeP2?.split(' ')[0]}</td>
                    <td style={tdStyle}>{lead.email}</td>
                    <td style={tdStyle}>
                      <span style={{
                        display: 'inline-block',
                        padding: '2px 10px',
                        borderRadius: '999px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        background: lead.status === 'pago' ? 'rgba(16,185,129,0.12)' : 'rgba(245,158,11,0.12)',
                        color: lead.status === 'pago' ? '#10b981' : '#f59e0b'
                      }}>
                        {lead.status === 'pago' ? 'Pago' : 'Pendente'}
                      </span>
                    </td>
                    <td style={tdStyle}>{lead.percentage || '-'}</td>
                    <td style={{ ...tdStyle, color: '#64748b', fontSize: '0.8rem' }}>
                      {lead.createdAt ? new Date(lead.createdAt + 'Z').toLocaleDateString('pt-BR') : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

const thStyle = {
  padding: '10px 12px',
  textAlign: 'left',
  color: '#64748b',
  fontWeight: 600,
  fontSize: '0.75rem',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  whiteSpace: 'nowrap'
};

const tdStyle = {
  padding: '10px 12px',
  color: '#cbd5e1',
  whiteSpace: 'nowrap'
};
