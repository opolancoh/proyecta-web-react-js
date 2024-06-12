import axios from 'axios';
import { refreshAccessToken } from './authService';

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const refreshAccessTokenHandler = async (accessToken, refreshToken) => {
  try {
    const result = await refreshAccessToken(accessToken, refreshToken);
    return result.data.accessToken;
  } catch (error) {
    console.error(`[refreshAccessToken] Failed to refresh token: ${error}`);
    return null;
  }
};

const redirectToLogin = (returnUrl) => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  window.location = `/login?returnUrl=${encodeURIComponent(returnUrl)}`;
};

const handleTokenRefresh = async (originalRequest) => {
  const refreshToken = localStorage.getItem('refresh_token');
  const accessToken = localStorage.getItem('access_token');

  if (accessToken && refreshToken) {
    const newAccessToken = await refreshAccessTokenHandler(accessToken, refreshToken);
    if (newAccessToken) {
      localStorage.setItem('access_token', newAccessToken);
      originalRequest._retry = true;
      originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
      return httpClient(originalRequest);
    } else {
      console.error('[httpClient.interceptors.response] Token refresh failed, redirecting to login');
      redirectToLogin(originalRequest.lastRequestLocation || '/');
    }
  } else {
    console.error('[httpClient.interceptors.response] No refresh token available, redirecting to login');
    redirectToLogin(originalRequest.lastRequestLocation || '/');
  }
};

httpClient.interceptors.request.use(
  (config) => {
    config.lastRequestLocation = window.location.pathname;

    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response) {
      const { status } = error.response;

      if (status === 400) {
        // Handle 400 error status
        return Promise.reject(error);
      }

      if (status === 401) {
        if (!originalRequest._retry) {
          return handleTokenRefresh(originalRequest);
        }
        console.error('[httpClient.interceptors.response] Token refresh did not resolve 401 error');
        return Promise.reject(error);
      }

      if (status === 403) {
        window.location = '/forbidden';
        return Promise.reject(error);
      }

      console.error(`Request error: ${error}`);
      window.location = '/error';
      return Promise.reject(error);
    }

    console.error(`Request error without response: ${error}`);
    return Promise.reject(error);
  }
);

export default httpClient;
