const API = import.meta.env.VITE_API_URL || '';

export function getAuthHeaders() {
  const token = localStorage.getItem('dev_token');
  if (!token) return {};
  return { 'Authorization': 'Basic ' + token, 'Content-Type': 'application/json' };
}

export async function login(user, pass) {
  const token = btoa(user + ':' + pass);
  const res = await fetch(`${API}/api/leads/stats`, {
    headers: { 'Authorization': 'Basic ' + token }
  });
  if (!res.ok) throw new Error('Credenciais inválidas');
  localStorage.setItem('dev_token', token);
  localStorage.setItem('dev_user', user);
  return true;
}

export function logout() {
  localStorage.removeItem('dev_token');
  localStorage.removeItem('dev_user');
}

export function isLoggedIn() {
  return !!localStorage.getItem('dev_token');
}

export function getUser() {
  return localStorage.getItem('dev_user') || '';
}

export async function fetchStats() {
  const res = await fetch(`${API}/api/leads/stats`, { headers: getAuthHeaders() });
  if (!res.ok) throw new Error('Erro ao carregar estatísticas');
  return res.json();
}

export async function fetchLeads(params = {}) {
  const query = new URLSearchParams();
  if (params.status) query.set('status', params.status);
  if (params.search) query.set('search', params.search);
  if (params.startDate) query.set('startDate', params.startDate);
  if (params.endDate) query.set('endDate', params.endDate);
  const url = `${API}/api/leads?${query.toString()}`;
  const res = await fetch(url, { headers: getAuthHeaders() });
  if (!res.ok) throw new Error('Erro ao carregar leads');
  return res.json();
}

export async function fetchLead(id) {
  const res = await fetch(`${API}/api/leads/${id}`, { headers: getAuthHeaders() });
  if (!res.ok) throw new Error('Erro ao carregar lead');
  return res.json();
}

export async function deleteLead(id) {
  const res = await fetch(`${API}/api/leads/${id}`, { method: 'DELETE', headers: getAuthHeaders() });
  if (!res.ok) throw new Error('Erro ao excluir lead');
  return res.json();
}

export async function updateLead(id, data) {
  const res = await fetch(`${API}/api/leads/${id}`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Erro ao atualizar lead');
  return res.json();
}
