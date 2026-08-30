import axios from 'axios';

// Safely determine base API URL for Vercel production and local environments
const getBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim() !== '' && envUrl !== 'undefined') {
    const cleanUrl = envUrl.replace(/\/+$/, '');
    return cleanUrl.endsWith('/api') ? cleanUrl : `${cleanUrl}/api`;
  }
  // Production fallback API URL (Render live backend)
  return 'https://pravxnstudio-api.onrender.com/api';
};

const api = axios.create({
  baseURL: getBaseUrl(),
  timeout: 60000, // 60s timeout to accommodate Render free-tier cold starts
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('pravxnstudio_token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Auto-retry once if Render free-tier backend is sleeping or encounters cold-start delays
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;
    if (!config || config._retry) {
      return Promise.reject(error);
    }
    if (error.code === 'ECONNABORTED' || error.response?.status >= 500 || !error.response) {
      config._retry = true;
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return api(config);
    }
    return Promise.reject(error);
  }
);

export default api;