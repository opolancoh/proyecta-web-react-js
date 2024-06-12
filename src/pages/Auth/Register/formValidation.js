import translations from '../../../helpers/translations';

const t = translations.es;

export default function (data) {
  let errors = {};

  if (data.firstName === '') errors.firstName = t.requiredField;
  if (data.lastName === '') errors.lastName = t.requiredField;
  if (data.displayName === '') errors.lastName = t.requiredField;
  if (data.username === '') errors.username = t.requiredField;
  if (data.password === '') errors.password = t.requiredField;

  return errors;
}
