import { riskTypes, riskPhases, riskManageabilities } from './data';

export const getRiskTypeName = (id) => {
  switch (id) {
    case 1:
      return 'Comúm';
    case 2:
      return 'Específico';
    default:
      return '[Unknown]';
  }
};

export const getRiskPhaseName = (id) => {
  switch (id) {
    case 1:
      return 'F1';
    case 2:
      return 'F2';
    case 3:
      return 'F3';
    case 4:
      return 'F4';
    default:
      return '[Unknown]';
  }
};

export const getRiskManageabilityName = (id) => {
  switch (id) {
    case 1:
      return 'Baja';
    case 2:
      return 'Media';
    case 3:
      return 'Alta';
    default:
      return '[Unknown]';
  }
};

export const getRiskTypeNames = () =>
  riskTypes.map((item) => ({ id: item.id, name: getRiskTypeName(item.id) }));

export const getRiskPhaseNames = () =>
  riskPhases.map((item) => ({ id: item.id, name: getRiskPhaseName(item.id) }));

export const getRiskManageabilityNames = () =>
  riskManageabilities.map((item) => ({
    id: item.id,
    name: getRiskManageabilityName(item.id),
  }));
