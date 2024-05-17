import translations from '../../../helpers/translations';

const getRequiredFieldText = () => translations.es.requiredField;

export default function (data) {
  let errors = {};

  if (data.firstName === '') errors.firstName = [getRequiredFieldText()];
  if (data.lastName === '') errors.lastName = [getRequiredFieldText()];
  if (data.displayName === '') errors.lastName = [getRequiredFieldText()];
  if (data.username === '') errors.username = [getRequiredFieldText()];
  if (data.password === '') errors.password = [getRequiredFieldText()];

  return errors;
}
