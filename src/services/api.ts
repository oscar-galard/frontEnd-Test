import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

// Request interceptor to include JWT token in Authorization header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle 401 errors (redirect to login)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Remove invalid token and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Helper function to check if token is valid
export const isTokenValid = (token: string): boolean => {
  if (!token) return false;
  try {
    const decoded: { exp?: number } = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp !== undefined && decoded.exp > currentTime;
  } catch (error) {
    return false;
  }
};

export default api;