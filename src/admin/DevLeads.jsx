import React, { useState, useEffect, useCallback } from 'react';
import { fetchLeads, fetchLead, deleteLead } from './api';

function esc(s) {
  if (!s) return '';
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export default function DevLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [detail, setDetail] = useState(null);
  const [sortField, setSortField] = useState('createdAt');
  const [sortDir, setSortDir] = useState(-1);
  const [page, setPage] = useState(1);
  const [toast, setToast] = useState(null);
  const PER_PAGE = 20;

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadLeads = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchLeads({ search, status: statusFilter });
      setLeads(data);
    } catch {
      showToast('Erro ao carregar leads', 'error');
    }
    setLoading(false);
  }, [search, statusFilter]);

  useEffect(() => {
    loadLeads();
  }, [loadLeads]);

  useEffect(() => {
    setPage(1);
  }, [search, statusFilter]);

  const handleSort = (field) => {
    if (sortField === field) setSortDir(d => -d);
    else { setSortField(field); setSortDir(1); }
  };

  const sorted = [...leads].sort((a, b) => {
    let va = a[sortField] ?? '', vb = b[sortField] ?? '';
    if (sortField === 'id' || sortField === 'percentage') return (va - vb) * sortDir;
    return String(va).localeCompare(String(vb)) * sortDir;
  });

  const totalPages = Math.ceil(sorted.length / PER_PAGE) || 1;
  const start = (page - 1) * PER_PAGE;
  const pageData = sorted.slice(start, start + PER_PAGE);

  const viewDetail = async (id) => {
    try {
      const lead = await fetchLead(id);
      setDetail(lead);
    } catch {
      showToast('Erro ao carregar detalhes', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Tem certeza que deseja excluir este cadastro?')) return;
    try {
      await deleteLead(id);
      showToast('Cadastro excluído com sucesso');
      loadLeads();
    } catch {
      showToast('Erro ao excluir', 'error');
    }
  };

  const exportCSV = () => {
    const api = import.meta.env.VITE_API_URL || '';
    const token = localStorage.getItem('dev_token');
    window.open(`${api}/api/leads/export?token=${token}`, '_blank');
  };

  const formatDate = (d) => {
    if (!d) return '-';
    return new Date(d + 'Z').toLocaleDateString('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div>
      <h2 style={{ color: '#fff', fontSize: '1.4rem', marginBottom: '20px' }}>Cadastros</h2>

      {/* Filtros */}
      <div style={{
        display: 'flex', gap: '10px', flexWrap: 'wrap',
        background: '#141729', border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '12px', padding: '14px 18px', marginBottom: '16px',
        alignItems: 'center'
      }}>
        <input
          type="text"
          placeholder="Buscar por nome, email ou WhatsApp..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={inputStyle}
        />
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          style={selectStyle}
        >
          <option value="">Todos</option>
          <option value="pendente">Pendentes</option>
          <option value="pago">Pagos</option>
        </select>
        <button onClick={loadLeads} style={btnPrimary}>Filtrar</button>
        <button onClick={exportCSV} style={btnSecondary}>Exportar CSV</button>
      </div>

      {/* Tabela */}
      <div style={{
        background: '#141729',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '12px',
        overflow: 'hidden'
      }}>
        {loading ? (
          <p style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>Carregando...</p>
        ) : pageData.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>Nenhum cadastro encontrado</p>
        ) : (
          <>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    {['id', 'nomeP1', 'nomeP2', 'email', 'whatsapp', 'status', 'percentage', 'createdAt'].map(f => (
                      <th
                        key={f}
                        onClick={() => handleSort(f)}
                        style={{ ...thStyle, cursor: 'pointer', userSelect: 'none' }}
                      >
                        {f === 'id' ? '#' :
                         f === 'nomeP1' ? 'Pessoa 1' :
                         f === 'nomeP2' ? 'Pessoa 2' :
                         f === 'whatsapp' ? 'WhatsApp' :
                         f === 'percentage' ? '%' :
                         f === 'createdAt' ? 'Data' : f.charAt(0).toUpperCase() + f.slice(1)}
                        {sortField === f && (sortDir === 1 ? ' ▲' : ' ▼')}
                      </th>
                    ))}
                    <th style={thStyle}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {pageData.map(lead => (
                    <tr key={lead.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                      <td style={{ ...tdStyle, color: '#64748b' }}>{lead.id}</td>
                      <td style={tdStyle}>
                        <strong>{esc(lead.nomeP1?.split(' ')[0])}</strong>
                        <br /><span style={{ color: '#64748b', fontSize: '0.75rem' }}>{lead.dataP1}</span>
                      </td>
                      <td style={tdStyle}>
                        <strong>{esc(lead.nomeP2?.split(' ')[0])}</strong>
                        <br /><span style={{ color: '#64748b', fontSize: '0.75rem' }}>{lead.dataP2}</span>
                      </td>
                      <td style={tdStyle}>{esc(lead.email)}</td>
                      <td style={tdStyle}>{esc(lead.whatsapp)}</td>
                      <td style={tdStyle}>
                        <span style={{
                          display: 'inline-block', padding: '2px 10px', borderRadius: '999px',
                          fontSize: '0.75rem', fontWeight: 600,
                          background: lead.status === 'pago' ? 'rgba(16,185,129,0.12)' : 'rgba(245,158,11,0.12)',
                          color: lead.status === 'pago' ? '#10b981' : '#f59e0b'
                        }}>
                          {lead.status === 'pago' ? 'Pago' : 'Pendente'}
                        </span>
                      </td>
                      <td style={tdStyle}>{lead.percentage || '-'}</td>
                      <td style={{ ...tdStyle, color: '#64748b', fontSize: '0.8rem' }}>{formatDate(lead.createdAt)}</td>
                      <td style={tdStyle}>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button onClick={() => viewDetail(lead.id)} style={iconBtn} title="Ver detalhes">👁️</button>
                          <button onClick={() => handleDelete(lead.id)} style={{ ...iconBtn, color: '#ef4444' }} title="Excluir">🗑️</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Paginação */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '12px 18px', borderTop: '1px solid rgba(255,255,255,0.06)'
            }}>
              <span style={{ color: '#64748b', fontSize: '0.8rem' }}>
                {sorted.length} registro(s) — Página {page} de {totalPages}
              </span>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  style={{ ...btnSecondary, opacity: page <= 1 ? 0.4 : 1 }}
                >Anterior</button>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  style={{ ...btnSecondary, opacity: page >= totalPages ? 0.4 : 1 }}
                >Próxima</button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Modal de Detalhes */}
      {detail && (
        <div
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.6)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', zIndex: 100
          }}
          onClick={e => { if (e.target === e.currentTarget) setDetail(null); }}
        >
          <div style={{
            background: '#141729', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px', padding: '24px', maxWidth: '500px', width: '90%',
            maxHeight: '80vh', overflowY: 'auto'
          }}>
            <h3 style={{ color: '#fff', margin: '0 0 16px', fontSize: '1.1rem' }}>
              Detalhes do Cadastro #{detail.id}
            </h3>
            {[
              ['Pessoa 1', `${detail.nomeP1} (${detail.dataP1})`],
              ['Pessoa 2', `${detail.nomeP2} (${detail.dataP2})`],
              ['Email', detail.email],
              ['WhatsApp', detail.whatsapp],
              ['Status', detail.status === 'pago' ? '✅ Pago' : '⏳ Pendente'],
              ['Compatibilidade', detail.percentage ? `${detail.percentage}%` : '—'],
              ['Asaas ID', detail.asaas_id || '—'],
              ['Criado em', formatDate(detail.createdAt)],
              ['Atualizado em', formatDate(detail.updatedAt)],
              ['LGPD', detail.acceptedTerms ? '✅ Aceito' : '❌ Não aceito']
            ].map(([label, value]) => (
              <div key={label} style={{ marginBottom: '10px' }}>
                <p style={{ color: '#64748b', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 2px' }}>
                  {label}
                </p>
                <p style={{ color: '#cbd5e1', fontSize: '0.9rem', margin: 0 }}>{value}</p>
              </div>
            ))}
            <button
              onClick={() => setDetail(null)}
              style={{ ...btnPrimary, width: '100%', marginTop: '8px' }}
            >Fechar</button>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: '24px', right: '24px',
          background: '#141729', border: `1px solid ${toast.type === 'error' ? '#ef4444' : '#10b981'}`,
          borderRadius: '8px', padding: '12px 20px', color: '#e2e8f0',
          fontSize: '0.85rem', zIndex: 200, animation: 'slideUp 0.3s ease'
        }}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  padding: '8px 12px',
  background: '#1e2235',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '6px',
  color: '#e2e8f0',
  fontSize: '0.85rem',
  minWidth: '240px',
  outline: 'none'
};

const selectStyle = {
  ...inputStyle,
  minWidth: '140px',
  cursor: 'pointer'
};

const btnPrimary = {
  padding: '8px 16px',
  background: '#f97316',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '0.85rem',
  fontWeight: 500
};

const btnSecondary = {
  padding: '8px 16px',
  background: '#1e2235',
  color: '#94a3b8',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '0.85rem'
};

const thStyle = {
  padding: '10px 12px',
  textAlign: 'left',
  color: '#64748b',
  fontWeight: 600,
  fontSize: '0.72rem',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  whiteSpace: 'nowrap'
};

const tdStyle = {
  padding: '10px 12px',
  color: '#cbd5e1',
  whiteSpace: 'nowrap'
};

const iconBtn = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '4px',
  fontSize: '1rem'
};
