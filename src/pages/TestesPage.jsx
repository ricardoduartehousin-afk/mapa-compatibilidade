import { useState } from 'react';
import { calculateCompatibility } from '../utils/numerology';

const testCases = [
  { p1: 'Maria', d1: '15/03/1990', p2: 'João', d2: '20/07/1988' },
  { p1: 'Ana', d1: '01/01/2000', p2: 'Pedro', d2: '12/12/1999' },
  { p1: 'Clara', d1: '08/06/1995', p2: 'Lucas', d2: '25/11/1992' },
  { p1: 'Juliana', d1: '30/09/1985', p2: 'Rafael', d2: '14/02/1987' },
  { p1: 'Camila', d1: '22/04/1998', p2: 'Thiago', d2: '05/08/1994' },
];

export default function TestesPage() {
  const [results, setResults] = useState(null);

  const runTests = () => {
    const output = testCases.map(tc => {
      const res = calculateCompatibility(tc.p1, tc.d1, tc.p2, tc.d2);
      return { ...tc, result: res };
    });
    setResults(output);
  };

  return (
    <div className="cosmic-container">
      <div className="glass-panel" style={{ maxWidth: 800, margin: '40px auto', padding: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h2 style={{ fontSize: '1.5rem' }}>Testes de Cálculo</h2>
          <button onClick={runTests} className="btn btn-primary" style={{ padding: '8px 20px' }}>
            Executar Testes
          </button>
        </div>

        {results && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', fontSize: '0.8rem', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ color: '#64748b', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <th style={{ textAlign: 'left', padding: '8px 12px' }}>Casal</th>
                  <th style={{ textAlign: 'left', padding: '8px 12px' }}>Nascimento</th>
                  <th style={{ textAlign: 'center', padding: '8px 12px' }}>%</th>
                  <th style={{ textAlign: 'center', padding: '8px 12px' }}>Destino P1</th>
                  <th style={{ textAlign: 'center', padding: '8px 12px' }}>Destino P2</th>
                  <th style={{ textAlign: 'center', padding: '8px 12px' }}>Alma P1</th>
                  <th style={{ textAlign: 'center', padding: '8px 12px' }}>Alma P2</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '8px 12px' }}>{r.p1} & {r.p2}</td>
                    <td style={{ padding: '8px 12px', color: '#94a3b8' }}>{r.d1} / {r.d2}</td>
                    <td style={{ textAlign: 'center', padding: '8px 12px', color: '#a78bfa', fontWeight: 700 }}>
                      {r.result?.percentage ?? '—'}%
                    </td>
                    <td style={{ textAlign: 'center', padding: '8px 12px' }}>{r.result?.destino1 ?? '—'}</td>
                    <td style={{ textAlign: 'center', padding: '8px 12px' }}>{r.result?.destino2 ?? '—'}</td>
                    <td style={{ textAlign: 'center', padding: '8px 12px' }}>{r.result?.alma1 ?? '—'}</td>
                    <td style={{ textAlign: 'center', padding: '8px 12px' }}>{r.result?.alma2 ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!results && (
          <p style={{ color: '#64748b', textAlign: 'center', padding: '40px 0' }}>
            Clique em "Executar Testes" para rodar os cálculos de compatibilidade com dados de exemplo.
          </p>
        )}
      </div>
    </div>
  );
}
