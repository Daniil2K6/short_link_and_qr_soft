const API_URL = 'http://localhost:3000/api';

export const authService = {
  register: async (username, password) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Registration failed');
    }
    
    const data = await response.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data.user;
  },

  login: async (username, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Login failed');
    }
    
    const data = await response.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data.user;
  },

  verify: async () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    const response = await fetch(`${API_URL}/auth/verify`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (!response.ok) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return null;
    }
    
    return JSON.parse(localStorage.getItem('user'));
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  isAdmin: () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.role === 'admin';
  },

  changePassword: async (currentPassword, newPassword) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/auth/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ currentPassword, newPassword })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to change password');
    }
    
    const data = await response.json();
    return data;
  }
};

export default authService;
