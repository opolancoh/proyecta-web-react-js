import httpClient from './httpInterceptor';

const basePath = '/api/risk-categories';

export const getAll = async () => {
  const { data } = await httpClient.get(`${basePath}`);

  return data;
};
