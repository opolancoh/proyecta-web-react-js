import httpClient from './httpInterceptor';

const basePath = '/api/risk-owners';

export const getAll = async () => {
  const { data } = await httpClient.get(`${basePath}`);

  return data;
};
