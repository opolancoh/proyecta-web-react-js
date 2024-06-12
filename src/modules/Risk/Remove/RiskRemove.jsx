import React from 'react';
import { getById, remove } from '../../../services/riskService';
import EntityRemove from '../../../components/contoso-university/entity/Remove/EntityRemove';

const RiskRemove = () => {
  const fields = [
    { label: 'Nombre', key: 'name' },
    { label: 'Código', key: 'code' },
    { label: 'Dueño', key: 'owner', render: (x) => x.name },
    { label: 'Fase', key: 'phase' },
  ];

  return <EntityRemove entityName="Riesgo" entityPath="risks" getById={getById} remove={remove} fields={fields} />;
};

export default RiskRemove;
