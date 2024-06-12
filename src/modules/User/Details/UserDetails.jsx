import React from 'react';
import { getById } from '../../../services/userService';
import EntityDetails from '../../../components/contoso-university/entity/Details/EntityDetails';

const UserDetails = () => {
  const fields = [
    { label: 'Usuario', key: 'userName' },
    { label: 'Nombre', key: 'firstName' },
    { label: 'Apellido', key: 'lastName' },
    { label: 'Nombre a mostrar', key: 'displayName' },
    { label: 'Roles', key: 'roles', render: (roles) => roles.map(role => role.name).join(', ') },
  ];

  return <EntityDetails entityName="Usuario" entityPath="users" getById={getById} fields={fields} />;
};

export default UserDetails;
