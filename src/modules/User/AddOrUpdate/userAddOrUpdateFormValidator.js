import translations from '../../../helpers/translations';

const t = translations.es;

export default function (data) {
  let error = {};

  if (data.firstName === '') error.firstName = [t.requiredField];
  if (data.lastName === '') error.lastName = [t.requiredField];
  if (data.displayName === '') error.displayName = [t.requiredField];
  if (data.userName === '') error.userName = [t.requiredField];
  if (data.password === '') error.password = [t.requiredField];

  return error;
}
