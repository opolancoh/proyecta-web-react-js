import translations from '../../../helpers/translations';

const t = translations.es;

export default function (data) {
  let error = {};

  if (data.name === '') error.name = [t.requiredField];
  if (data.code === '') error.code = [t.requiredField];
  if (data.category === '') error.category = [t.requiredField];
  if (data.type === '') error.type = [t.requiredField];
  if (data.owner === '') error.owner = [t.requiredField];
  if (data.phase === '') error.phase = [t.requiredField];
  if (data.manageability === '')
    error.manageability = [t.requiredField];
  if (data.treatment === '') error.treatment = [t.requiredField];
  if (data.dateFrom === '') error.dateFrom = [t.requiredField];
  if (data.dateTo === '') error.dateTo = [t.requiredField];

  return error;
}
