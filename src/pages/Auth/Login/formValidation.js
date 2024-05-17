import translations from '../../../helpers/translations';

const getRequiredFieldText = () => translations.es.requiredField;

export default function (data) {
  let errors = {};

  if (data.username === '') errors.username = [getRequiredFieldText()];
  if (data.password === '') errors.password = [getRequiredFieldText()];

  return errors;
}
