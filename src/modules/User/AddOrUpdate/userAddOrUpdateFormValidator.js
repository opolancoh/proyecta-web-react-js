import translations from '../../../helpers/translations';

const t = translations.es;

const requiredFields = [
  'firstName',
  'lastName',
  'displayName',
  'userName',
  'password'
];

export default function validate(data) {
  const errors = {};

  requiredFields.forEach(field => {
    if (!data[field]) {
      errors[field] = [t.requiredField];
    }
  });

  return errors;
}
