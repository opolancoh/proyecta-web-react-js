import translations from '../../../helpers/translations';

const getRequiredFieldText = () => translations.es.requiredField;

export default function (data) {
  let error = {};

  if (data.name === '') error.name = [getRequiredFieldText()];
  if (data.code === '') error.code = [getRequiredFieldText()];
  if (data.category === '') error.category = [getRequiredFieldText()];
  if (data.type === '') error.type = [getRequiredFieldText()];
  if (data.owner === '') error.owner = [getRequiredFieldText()];
  if (data.phase === '') error.phase = [getRequiredFieldText()];
  if (data.manageability === '')
    error.manageability = [getRequiredFieldText()];
  if (data.treatment === '') error.treatment = [getRequiredFieldText()];
  if (data.dateFrom === '') error.dateFrom = [getRequiredFieldText()];
  if (data.dateTo === '') error.dateTo = [getRequiredFieldText()];

  return error;
}
