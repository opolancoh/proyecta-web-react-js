export const dateToLocaleString = (dateString) => {
  if (typeof dateString !== 'string')
    throw Error(`[dateToLocaleString] The parameter must be a string. Current type: '${typeof dateString}'`);

  const dateNumber = Date.parse(dateString);

  if (isNaN(dateNumber)) throw Error('[dateToLocaleString] The parameter is not a valid Date');

  return new Date(dateNumber).toLocaleString('es-co', {
    dateStyle: 'long',
    timeStyle: 'long',
  });
};
