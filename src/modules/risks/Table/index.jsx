function RiskTable({ data }) {
  return (
    <table className="table table-striped">
      <thead className="table-light">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Código</th>
          <th scope="col">Nombre</th>
          <th scope="col">Categoría</th>
          <th scope="col">Tipo</th>
          <th scope="col">Dueño</th>
          <th scope="col">Fase</th>
          <th scope="col">Fecha Desde</th>
          <th scope="col">Fecha Hasta</th>
          <th scope="col">Estado</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody className="table-group-divider">
        {data.map((x) => (
          <tr key={x.id}>
            <th scope="row">{x.id}</th>
            <td>{x.code}</td>
            <td>{x.name}</td>
            <td>{x.category}</td>
            <td>{x.type}</td>
            <td>{x.owner}</td>
            <td>{x.phase}</td>
            <td>{x.dateFrom}</td>
            <td>{x.dateTo}</td>
            <td>
              {x.state === 1 ? (
                <i
                  class="bi bi-check-circle"
                  style={{ color: "cornflowerblue", fontSize: "1.5rem" }}
                ></i>
              ) : (
                <i
                  class="bi bi-x-circle"
                  style={{ color: "red", fontSize: "1.5rem" }}
                ></i>
              )}
            </td>
            <td>
              <div className="d-flex gap-2 mb-3">
                <i class="bi bi-eye" style={{ fontSize: "1.5rem" }}></i>
                <i class="bi bi-pencil" style={{ fontSize: "1.5rem" }}></i>
                <i class="bi bi-trash3" style={{ fontSize: "1.5rem" }}></i>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default RiskTable;
