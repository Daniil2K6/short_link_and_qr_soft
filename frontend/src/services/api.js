import axios from 'axios';
import authService from './authService';

const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = authService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apiService = {
  // ===== LINKS =====
  
  // Create a short link (authenticated)
  createLink: (originalUrl) => {
    return api.post('/links', { originalUrl });
  },

  // Get all links (public)
  getLinks: (limit = 20, offset = 0) => {
    return api.get('/links', { params: { limit, offset } });
  },

  // Get user's links (authenticated)
  getUserLinks: (limit = 20, offset = 0) => {
    return api.get('/links/user/my-links', { params: { limit, offset } });
  },

  // Get link statistics
  getLinkStats: (id) => {
    return api.get(`/links/${id}/stats`);
  },

  // Get QR code as data URL
  getQRCode: (id) => {
    return api.get(`/links/${id}/qrcode`);
  },

  // Get QR code as image URL
  getQRCodeImageUrl: (id) => {
    return `${API_BASE_URL}/links/${id}/qrcode/image?token=${authService.getToken()}`;
  },

  // ===== ADMIN =====

  // Get all users (admin only)
  getAllUsers: (limit = 20, offset = 0) => {
    return api.get('/admin/users', { params: { limit, offset } });
  },

  // Get user details (admin only)
  getUserDetails: (userId) => {
    return api.get(`/admin/users/${userId}`);
  },

  // Delete user (admin only)
  deleteUser: (userId) => {
    return api.delete(`/admin/users/${userId}`);
  },

  // Update user role (admin only)
  updateUserRole: (userId, role) => {
    return api.patch(`/admin/users/${userId}/role`, { role });
  },

  // Get all links (admin only)
  getAllLinksAdmin: (limit = 20, offset = 0) => {
    return api.get('/admin/links', { params: { limit, offset } });
  },

  // Delete link (admin only)
  deleteLink: (id) => {
    return api.delete(`/admin/links/${id}`);
  },

  // Update link status (admin only)
  updateLinkStatus: (id, status) => {
    return api.patch(`/admin/links/${id}`, { status });
  }
};

export default api;
