export const dateToLocaleString = (dateString) => {
  if (typeof dateString !== "string")
    throw Error("The parameter must be a string");

  const dateNumber = Date.parse(dateString);

  if (isNaN(dateNumber)) throw Error("The parameter is not a valid Date");

  return new Date(dateNumber).toLocaleString("es-co", {
    dateStyle: "long",
    timeStyle: "long",
  });
};
