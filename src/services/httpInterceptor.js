import axios from 'axios';

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

httpClient.interceptors.request.use(
  (config) => {
    // Add current location
    config.lastRequestLocation = window.location.pathname;

    // Add authorization token if needed
    if (!config.withoutToken) {
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger

    if (error.response.status === 401) {
      // Handle 401 error (unauthorized)
      let returnUrl = error.config.lastRequestLocation;
      if (!returnUrl) returnUrl = '/';
      window.location = `/login?returnUrl=${encodeURI(returnUrl)}`;
    }

    /* if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const refreshToken = localStorageService.getRefreshToken()
      return axios
        .post('/auth/token', {
          refresh_token: refreshToken
        })
        .then(res => {
          if (res.status === 201) {
            localStorageService.setToken(res.data)
            axios.defaults.headers.common['Authorization'] =
              'Bearer ' + localStorageService.getAccessToken()
            return axios(originalRequest)
          }
        })
    } */

    // Pass the error to the next error handler
    return Promise.reject(error);
  }
);

export default httpClient;
