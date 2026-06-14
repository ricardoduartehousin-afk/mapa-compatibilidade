export default function RelatoriosPage() {
  return (
    <div className="cosmic-container">
      <div className="glass-panel" style={{ maxWidth: 800, margin: '40px auto', padding: 32 }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: 16 }}>Relatórios</h2>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>
          Painel de relatórios e métricas do sistema.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          {[
            { label: 'Total de Leads', value: '—' },
            { label: 'Taxa de Conversão', value: '—' },
            { label: 'Pagamentos Hoje', value: '—' },
            { label: 'Usuários Ativos', value: '—' },
          ].map(item => (
            <div key={item.label} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: 8 }}>{item.label}</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#a78bfa' }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
