export const accessToken = localStorage.getItem('access_token');

export const isAuthenticated = accessToken !== null;

export const decodeJWT = () => {
  if (accessToken === null) return null;

  const parts = accessToken.split('.');
  const tokenHeader = parts[0];
  const tokenPayload = parts[1];
  const tokenSignature = parts[2];

  const decodedHeader = atob(tokenHeader);
  const decodedPayload = atob(tokenPayload);

  const parsedHeader = JSON.parse(decodedHeader);
  const parsedPayload = JSON.parse(decodedPayload);

  return {
    header: parsedHeader,
    payload: parsedPayload,
    signature: tokenSignature,
  };
};

export const authContext = {
  isAuthenticated,
  jwt: decodeJWT(),
};

export const login = (token) => {
    localStorage.setItem('access_token', token);
  };

export const logout = () => {
  localStorage.removeItem('access_token');
};
