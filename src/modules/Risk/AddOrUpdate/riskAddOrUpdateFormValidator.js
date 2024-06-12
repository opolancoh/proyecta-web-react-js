import translations from '../../../helpers/translations';

const t = translations.es;

const requiredFields = [
  'name',
  'code',
  'category',
  'type',
  'owner',
  'phase',
  'manageability',
  'treatment',
  'dateFrom',
  'dateTo',
];

export default function validate(data) {
  const error = {};

  requiredFields.forEach(field => {
    if (!data[field]) {
      error[field] = [t.requiredField];
    }
  });

  return error;
}
