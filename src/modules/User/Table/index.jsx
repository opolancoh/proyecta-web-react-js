import { Link } from 'react-router-dom';

function Table({ children }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Usuario</th>
          <th scope="col">Nombre</th>
          <th scope="col">Apellido</th>
          <th scope="col">Nombre a mostrar</th>
          <th scope="col">Roles</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody className="table-group-divider">{children}</tbody>
    </table>
  );
}

function TableIsLoading() {
  return (
    <Table>
      <tr>
        <td colSpan="5">
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </td>
      </tr>
    </Table>
  );
}

function TableNoData() {
  return (
    <Table>
      <tr>
        <td colSpan="5" className="text-center">
          No hay datos
        </td>
      </tr>
    </Table>
  );
}

function UserTable({ entityPath, data, isLoading }) {
  if (isLoading) return <TableIsLoading />;

  if (data.length === 0) return <TableNoData />;

  return (
    <Table>
      {data.map((x) => (
        <tr key={x.id}>
          <th scope="row">{x.userName}</th>
          <td>{x.firstName}</td>
          <td>{x.lastName}</td>
          <td>{x.displayName}</td>
          <td>
            {x.roles.map((role) => (
              <span key={role} className="badge text-bg-secondary me-1">
                {role}
              </span>
            ))}
          </td>
          <td>
            <div className="d-flex gap-2 mb-3">
              <Link to={`/${entityPath}/${x.id}`}>Detalle</Link> |
              <Link to={`/${entityPath}/${x.id}/edit`}>Editar</Link> |
              <Link to={`/${entityPath}/${x.id}/remove`}>Eliminar</Link>
            </div>
          </td>
        </tr>
      ))}
    </Table>
  );
}

export default UserTable;
