import httpClient from './httpInterceptor';

const basePath = '/api/risk-treatments';

export const getAll = async () => {
  const { data } = await httpClient.get(`${basePath}`);

  return data;
};
