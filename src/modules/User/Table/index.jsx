import { Link } from "react-router-dom";

function UserTable({ entityPath, data }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Usuario</th>
          <th scope="col">Nombre</th>
          <th scope="col">Apellido</th>
          <th scope="col">Roles</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody className="table-group-divider">
        {data.map((x) => (
          <tr key={x.id}>
            <th scope="row">{x.userName}</th>
            <td>{x.firstName}</td>
            <td>{x.lastName}</td>
            <td>{x.Roles}</td>
            <td>
              <div className="d-flex gap-2 mb-3">
                <Link to={`/${entityPath}/edit/${x.id}`}>Editar</Link> |
                <Link to={`/${entityPath}/details/${x.id}`}>Detalle</Link> |
                <Link to={`/${entityPath}/delete/${x.id}`}>Eliminar</Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;
