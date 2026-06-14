import { useState } from 'react';

const mockLogs = [
  { time: '12:00:01', level: 'info', msg: 'Lead criado: joao@email.com' },
  { time: '12:00:05', level: 'info', msg: 'Pix gerado para lead #42' },
  { time: '12:01:12', level: 'warn', msg: 'Asaas API: IP não autorizado' },
  { time: '12:02:30', level: 'info', msg: 'Polling status: lead #42 ainda pendente' },
  { time: '12:05:00', level: 'error', msg: 'Falha ao gerar cobrança no Asaas' },
];

export default function LogsPage() {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? mockLogs : mockLogs.filter(l => l.level === filter);

  return (
    <div className="cosmic-container">
      <div className="glass-panel" style={{ maxWidth: 800, margin: '40px auto', padding: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h2 style={{ fontSize: '1.5rem' }}>Logs do Sistema</h2>
          <div style={{ display: 'flex', gap: 8 }}>
            {['all', 'info', 'warn', 'error'].map(l => (
              <button
                key={l}
                onClick={() => setFilter(l)}
                style={{
                  padding: '4px 12px',
                  borderRadius: 6,
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: filter === l ? 'rgba(167,139,250,0.2)' : 'transparent',
                  color: filter === l ? '#a78bfa' : '#94a3b8',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                }}
              >
                {l === 'all' ? 'Todos' : l}
              </button>
            ))}
          </div>
        </div>

        <div style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
          {filtered.map((log, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: 12,
                padding: '8px 12px',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
                color: log.level === 'error' ? '#f87171' : log.level === 'warn' ? '#fbbf24' : '#94a3b8',
              }}
            >
              <span style={{ color: '#64748b', minWidth: 60 }}>{log.time}</span>
              <span style={{
                minWidth: 40,
                textTransform: 'uppercase',
                fontSize: '0.7rem',
                fontWeight: 600,
                color: log.level === 'error' ? '#f87171' : log.level === 'warn' ? '#fbbf24' : '#64748b',
              }}>
                [{log.level}]
              </span>
              <span>{log.msg}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
