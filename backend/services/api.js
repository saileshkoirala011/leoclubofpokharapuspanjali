/**
 * API Service - Centralized HTTP client for all backend API calls
 * Handles: base URL, headers, error handling, authentication
 */

const API_BASE_URL = '/api';

const handleResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    throw {
      status: response.status,
      message: data.message || 'API Error',
      errors: data.errors || [],
      data,
    };
  }

  return data;
};

const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Important: include cookies for authentication
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    return await handleResponse(response);
  } catch (error) {
    console.error(`API Error [${defaultOptions.method} ${endpoint}]:`, error);
    throw error;
  }
};

export const api = {
  // GET requests
  get: (endpoint) => apiCall(endpoint, { method: 'GET' }),

  // POST requests
  post: (endpoint, body) =>
    apiCall(endpoint, { method: 'POST', body: JSON.stringify(body) }),

  // PUT requests
  put: (endpoint, body) =>
    apiCall(endpoint, { method: 'PUT', body: JSON.stringify(body) }),

  // PATCH requests
  patch: (endpoint, body) =>
    apiCall(endpoint, { method: 'PATCH', body: JSON.stringify(body) }),

  // DELETE requests
  delete: (endpoint) => apiCall(endpoint, { method: 'DELETE' }),

  // Specific API endpoints
  contact: {
    create: (data) => api.post('/contacts', data),
    getAll: () => api.get('/contacts'),
    getById: (id) => api.get(`/contacts/${id}`),
    update: (id, data) => api.put(`/contacts/${id}`, data),
    delete: (id) => api.delete(`/contacts/${id}`),
    updateStatus: (id, status) =>
      api.patch(`/contacts/${id}/status`, { status }),
  },

  team: {
    create: (data) => api.post('/team', data),
    getAll: () => api.get('/team'),
    getById: (id) => api.get(`/team/${id}`),
    update: (id, data) => api.put(`/team/${id}`, data),
    delete: (id) => api.delete(`/team/${id}`),
  },

  gallery: {
    create: (data) => api.post('/gallery', data),
    getAll: () => api.get('/gallery'),
    getById: (id) => api.get(`/gallery/${id}`),
    update: (id, data) => api.put(`/gallery/${id}`, data),
    delete: (id) => api.delete(`/gallery/${id}`),
  },

  about: {
    create: (data) => api.post('/about', data),
    getAll: () => api.get('/about'),
    getById: (id) => api.get(`/about/${id}`),
    update: (id, data) => api.put(`/about/${id}`, data),
    delete: (id) => api.delete(`/about/${id}`),
  },

  health: {
    check: () => api.get('/health'),
  },
};

export default api;
