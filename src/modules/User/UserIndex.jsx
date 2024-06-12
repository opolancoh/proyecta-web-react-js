import { useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import translations from '../../helpers/translations';
import { getAll } from '../../services/userService';
import EntityList from '../../components/contoso-university/entity/List/EntityList';

const t = translations.es;

export const entityPath = 'users';

function UserIndex() {
  const columns = useMemo(
    () => [
      { label: 'Usuario' },
      { label: 'Nombre' },
      { label: 'Apellido' },
      { label: 'Nombre a mostrar' },
      { label: 'Roles' },
    ],
    []
  );

  const renderRow = useCallback(
    (item) => (
      <tr key={item.id}>
        <th scope="row">{item.userName}</th>
        <td>{item.firstName}</td>
        <td>{item.lastName}</td>
        <td>{item.displayName}</td>
        <td>
          {item.roles.map((role) => (
            <span key={role} className="badge text-bg-secondary me-1">
              {role}
            </span>
          ))}
        </td>
        <td>
          <div className="d-flex gap-2 mb-3">
            <Link to={`/${entityPath}/${item.id}`}>Detalle</Link> |
            <Link to={`/${entityPath}/${item.id}/edit`}>Editar</Link> |
            <Link to={`/${entityPath}/${item.id}/remove`}>Eliminar</Link>
          </div>
        </td>
      </tr>
    ),
    [t]
  );

  return (
    <EntityList
      entityName="Usuarios"
      entityPath={entityPath}
      fetchDataFunction={getAll}
      columns={columns}
      renderRow={renderRow}
    />
  );
}

export default UserIndex;
