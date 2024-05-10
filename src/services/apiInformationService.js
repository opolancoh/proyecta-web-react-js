import httpClient from './httpInterceptor';

const basePath = '/system-info';

export const getSystemInfo = async () => {
  const { data } = await httpClient.get(`${basePath}`);

  return data;
};
