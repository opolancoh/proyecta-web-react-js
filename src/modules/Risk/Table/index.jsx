import { Link } from 'react-router-dom';
import { getRiskTypeName, getRiskPhaseName } from '../Utilities/translations';

function Table({ children }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Código</th>
          <th scope="col">Categoría</th>
          <th scope="col">Tipo</th>
          <th scope="col">Dueño</th>
          <th scope="col">Fase</th>
          <th scope="col">Fecha Inicial</th>
          <th scope="col">Fecha Final</th>
          <th scope="col">Estado</th>
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
        <td colSpan="10" className="text-center">
          No hay datos
        </td>
      </tr>
    </Table>
  );
}

function RiskTable({ entityPath, data, isLoading }) {
  if (isLoading) return <TableIsLoading />;

  if (data.length === 0) return <TableNoData />;

  return (
    <Table>
      {data.map((x) => (
        <tr key={x.id}>
          <th scope="row">{x.name}</th>
          <td>{x.code}</td>
          <td>{x.category.name}</td>
          <td>{getRiskTypeName(x.type)}</td>
          <td>{x.owner.name}</td>
          <td className="text-center">{getRiskPhaseName(x.phase)}</td>
          <td>{x.dateFrom}</td>
          <td>{x.dateTo}</td>
          <td className="text-center">
            <input
              checked={x.state}
              className="check-box"
              type="checkbox"
              readOnly
            ></input>
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

export default RiskTable;
