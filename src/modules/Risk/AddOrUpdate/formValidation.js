import translations from '../../../helpers/translations';

export default function (data) {
  let error = {};

  if (data.name === '') error.name = translations.es.requiredField;
  if (data.code === '') error.code = translations.es.requiredField;
  if (data.category === '') error.category = translations.es.requiredField;
  if (data.type === '') error.type = translations.es.requiredField;
  if (data.owner === '') error.owner = translations.es.requiredField;
  if (data.phase === '') error.phase = translations.es.requiredField;
  if (data.manageability === '')
    error.manageability = translations.es.requiredField;
  if (data.treatment === '') error.treatment = translations.es.requiredField;
  if (data.dateFrom === '') error.dateFrom = translations.es.requiredField;
  if (data.dateTo === '') error.dateTo = translations.es.requiredField;

  return error;
}
