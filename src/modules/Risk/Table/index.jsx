import { Link } from 'react-router-dom';

function RiskTable({ entityPath, data }) {
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
      <tbody className="table-group-divider">
        {data.map((x) => (
          <tr key={x.id}>
            <th scope="row">{x.name}</th>
            <td>{x.code}</td>
            <td>{x.category}</td>
            <td>{x.type}</td>
            <td>{x.owner}</td>
            <td className="text-center">{x.phase}</td>
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

export default RiskTable;
