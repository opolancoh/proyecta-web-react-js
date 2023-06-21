export const decodeJWT = (token) => {
  if (!token) return null;

  const parts = token.split('.');
  const encodedHeader = parts[0];
  const encodedPayload = parts[1];
  const encodedSignature = parts[2];

  const decodedHeader = atob(encodedHeader);
  const decodedPayload = atob(encodedPayload);

  const parsedHeader = JSON.parse(decodedHeader);
  const parsedPayload = JSON.parse(decodedPayload);

  return {
    header: parsedHeader,
    payload: parsedPayload,
    signature: encodedSignature,
  };
};
