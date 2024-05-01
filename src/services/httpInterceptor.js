import axios from 'axios';
import { refreshAccessToken } from './authService';

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Helper function to perform token refresh
const refreshAccessTokenHandler = async (accessToken, refreshToken) => {
  try {
    const result = await refreshAccessToken(accessToken, refreshToken);
    return result.data.accessToken;
  } catch (error) {
    console.log(`[refreshAccessToken] Failed to refresh token. ${error}`);
    return null;
  }
};

// Axios request interceptor
httpClient.interceptors.request.use(
  (config) => {
    // Add current location
    config.lastRequestLocation = window.location.pathname;

    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Axios response interceptor
httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    // Handle a 401 status code and try to get a new token
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      const refreshToken = localStorage.getItem('refresh_token');
      const accessToken = localStorage.getItem('access_token');
      if (accessToken && refreshToken) {
        const newAccessToken = await refreshAccessTokenHandler(
          accessToken,
          refreshToken
        );
        if (newAccessToken) {
          localStorage.setItem('access_token', newAccessToken);
          originalRequest._retry = true;
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return httpClient(originalRequest); // Retry the original request with new token
        } else {
          // Token refresh failed, redirect to login
          console.log(
            `[httpClient.interceptors.response] Error: Token refresh failed, redirect to login`
          );
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          const returnUrl = originalRequest.lastRequestLocation || '/';
          window.location = `/login?returnUrl=${encodeURIComponent(returnUrl)}`;
          return Promise.reject(error);
        }
      } else {
        // No refresh token, redirect to login
        console.log(
          `[httpClient.interceptors.response] Error: No refresh token, redirect to login`
        );
        const returnUrl = originalRequest.lastRequestLocation || '/';
        window.location = `/login?returnUrl=${encodeURIComponent(returnUrl)}`;
        return Promise.reject(error);
      }
    } else if (
      error.response &&
      error.response.status === 401 &&
      originalRequest._retry
    ) {
      // If the token was already refreshed and still getting 401
      // const returnUrl = originalRequest.lastRequestLocation || '/';
      // window.location = `/login?returnUrl=${encodeURIComponent(returnUrl)}`;
      return Promise.reject(error);
    } else {
      // Default error handler
      // window.location.assign(`/error`);
      console.log(`Interceptor: ${error}`);
      return Promise.reject(error);
    }
  }
);

export default httpClient;
