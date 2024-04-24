import httpClient from './httpInterceptor';

const basePath = '/api/risks';

export const getAll = async () => {
  const { data } = await httpClient.get(`${basePath}`);

  return data;
};

export const getById = async (id) => {
  const { data } = await httpClient.get(`${basePath}/${id}`);

  return data;
};

export const add = async (item) => {
  const { data } = await httpClient.post(`${basePath}/`, item);

  return data;
};

export const update = async (id, item) => {
  const { data } = await httpClient.put(`${basePath}/${id}`, item);

  return data;
};

export const remove = async (id) => {
  const { data } = await httpClient.delete(`${basePath}/${id}`);

  return data;
};