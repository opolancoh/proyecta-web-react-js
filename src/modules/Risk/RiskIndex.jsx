import { useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import translations from '../../helpers/translations';
import { getAll } from '../../services/riskService';
import EntityList from '../../components/contoso-university/entity/List/EntityList';

const t = translations.es;

export const entityPath = 'risks';

function RiskList() {
  const columns = useMemo(
    () => [
      { label: 'Nombre' },
      { label: 'Código' },
      { label: 'Categoría' },
      { label: 'Tipo' },
      { label: 'Dueño' },
      { label: 'Fase' },
      { label: 'Fecha Inicial' },
      { label: 'Fecha Final' },
      { label: 'Estado' },
    ],
    []
  );

  const renderRow = useCallback(
    (item) => (
      <tr key={item.id}>
        <th scope="row">{item.name}</th>
        <td>{item.code}</td>
        <td>{item.category.name}</td>
        <td>{t.riskType[item.type]}</td>
        <td>{item.owner.name}</td>
        <td className="text-center">{t.riskPhase[item.phase]}</td>
        <td>{item.dateFrom}</td>
        <td>{item.dateTo}</td>
        <td className="text-center">
          <input checked={item.state} className="check-box" type="checkbox" readOnly />
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
      entityName="Riesgos"
      entityPath={entityPath}
      fetchDataFunction={getAll}
      columns={columns}
      renderRow={renderRow}
    />
  );
}

export default RiskList;
