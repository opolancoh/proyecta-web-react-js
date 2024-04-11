import axios from 'axios';

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Axios request interceptor
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

// Axios response interceptor
httpClient.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Check if the error is due to a network problem or the server is unreachable
    if (!error.response) {
      // Handle network errors or server down scenarios
      console.error('Network error or server is unreachable.');
      // Optionally, you can redirect to a custom error page or display a global error message
      window.location = '/error';
    } else {
      // Log the HTTP request error details
      console.error(
        `HTTP request error: ${error.response.status} ${error.response.statusText} ${error.config.url}`
      );
      // Handle specific HTTP status codes
      if (error.response.status === 401) {
        // Handle 401 error (unauthorized)
        let returnUrl = error.config.lastRequestLocation || '/';
        window.location = `/login?returnUrl=${encodeURIComponent(returnUrl)}`;
      } else if (error.response.status === 403) {
        // Handle 403 error (forbidden)
        window.location = '/forbidden';
      }
      // Additional status code handling can be added here

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
    }
    // Pass the error to the next error handler
    return Promise.reject(error);
  }
);

export default httpClient;
