import httpClient from './httpInterceptor';

const basePath = '/info';

export const getServerInfo = async () => {
  const { data } = await httpClient.get(`${basePath}/server`);

  return data;
};

export const getSystemInfo = async () => {
  const { data } = await httpClient.get(`${basePath}/system`);

  return data;
};
