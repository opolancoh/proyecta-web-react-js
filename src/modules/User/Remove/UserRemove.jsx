import EntityRemove from '../../../components/contoso-university/entity/Remove/EntityRemove';
import { getById, remove } from '../../../services/userService';

const RiskRemove = () => {
  const fields = [
    { label: 'Nombre', key: 'displayName' },
    { label: 'Usuario', key: 'userName' },
  ];

  return <EntityRemove entityName="Usuario" entityPath="users" getById={getById} remove={remove} fields={fields} />;
};

export default RiskRemove;
