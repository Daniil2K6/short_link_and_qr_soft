import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const apiService = {
  // Create a short link
  createLink: (originalUrl) => {
    return api.post('/links', { originalUrl });
  },

  // Get all links
  getLinks: (limit = 20, offset = 0) => {
    return api.get('/links', { params: { limit, offset } });
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
    return `${API_BASE_URL}/links/${id}/qrcode/image`;
  }
};

export default api;
