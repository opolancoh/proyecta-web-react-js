import httpClient from './httpInterceptor';

const basePath = '/api/auth';

export const register = async (formData) => {
  const { data } = await httpClient.post(`${basePath}/register`, formData);

  return data;
};

export const login = async (username, password) => {
  const { data } = await httpClient.post(`${basePath}/login`, {
    username,
    password,
  });

  return data;
};

export const logout = async (accessToken, refreshToken) => {
  const { data } = await httpClient.post(`${basePath}/logout`, {
    accessToken,
    refreshToken,
  });

  return data;
};

export const refreshAccessToken = async (accessToken, refreshToken) => {
    const { data } = await httpClient.post(`${basePath}/refresh-token`, {
      accessToken,
      refreshToken,
    });
  
    return data;
  };
