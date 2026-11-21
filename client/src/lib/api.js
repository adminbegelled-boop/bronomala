// API Client helper for Firewell Monorepo

const getBaseUrl = () => {
  // If explicitly configured in env
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  // When running locally in browser on Next dev server (port 3000)
  if (typeof window !== 'undefined' && window.location.port === '3000') {
    return 'http://localhost:5001/api';
  }
  // In production / served by Express on same port
  return '/api';
};

export const API_BASE = getBaseUrl();

// Token helper
export const getAuthToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('firewell_admin_token');
};

export const setAuthToken = (token) => {
  if (typeof window === 'undefined') return;
  if (token) {
    localStorage.setItem('firewell_admin_token', token);
  } else {
    localStorage.removeItem('firewell_admin_token');
  }
};

// Generic fetch wrapper
const request = async (endpoint, options = {}) => {
  const url = `${API_BASE}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const contentType = response.headers.get('content-type');
  let data;
  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    const errorMsg = data?.message || (typeof data === 'string' ? data : 'API Request Failed');
    const error = new Error(errorMsg);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};

// --- PUBLIC APIS ---

// Register new participant
export const registerParticipant = (formData) => {
  return request('/participants', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
};

// Search ticket by ID, phone, or email
export const searchTicket = (ticketIdOrQuery) => {
  return request(`/participants/ticket/${encodeURIComponent(ticketIdOrQuery)}`);
};

// --- ADMIN APIS ---

// Admin login
export const adminLogin = (credentials) => {
  return request('/admin/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
};

// Get current admin user
export const getAdminProfile = () => {
  return request('/admin/me');
};

// Get dashboard statistics
export const getAdminStats = () => {
  return request('/admin/stats');
};

// Get paginated / filtered participants
export const getAdminParticipants = (params = {}) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, val]) => {
    if (val !== undefined && val !== null && val !== '') {
      query.append(key, val);
    }
  });
  const queryString = query.toString() ? `?${query.toString()}` : '';
  return request(`/admin/participants${queryString}`);
};

// Create participant manually
export const createParticipantAdmin = (data) => {
  return request('/admin/participants', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

// Update participant
export const updateParticipantAdmin = (id, data) => {
  return request(`/admin/participants/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

// Delete participant
export const deleteParticipantAdmin = (id) => {
  return request(`/admin/participants/${id}`, {
    method: 'DELETE',
  });
};

// Toggle attendance check-in
export const toggleCheckInAdmin = (id) => {
  return request(`/admin/participants/${id}/checkin`, {
    method: 'PATCH',
  });
};

// Toggle or complete payment status
export const togglePaymentAdmin = (id) => {
  return request(`/admin/participants/${id}/payment`, {
    method: 'PATCH',
  });
};

// Get CSV Export URL
export const getExportCSVUrl = () => {
  return `${API_BASE}/admin/export`;
};
