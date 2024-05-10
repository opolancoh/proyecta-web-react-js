/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getById } from '../../../services/riskService';
import { entityPath } from '..';
import { dateToLocaleString } from '../../../helpers/date-helper';
import NotFound from '../../../pages/NotFound';
import {
  getRiskManageabilityName,
  getRiskPhaseName,
  getRiskTypeName,
} from '../Utilities/translations';
import Loading from '../../../components/Loading';

function RiskDetails() {
  const { entityId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [requestHasError, setRequestHasError] = useState(false);

  useEffect(() => {
    async function fetchItem(itemId) {
      const result = await getById(itemId);

      if (result.success) {
        setData(result.data);
      } else {
        if (result.data.code === '404') setData(null);
        else {
          setRequestHasError(true);
        }
      }
      setIsLoading(false);
    }

    fetchItem(entityId);
  }, [entityId]);

  if (isLoading) return <Loading />;

  if (data === null) {
    return <NotFound />;
  }

  if (requestHasError) {
    navigate('/error');
    return null;
  }

  return (
    <>
      <h1>Detalle</h1>
      <h4>Riesgo</h4>
      <div className="d-flex gap-2 mb-3">
        <Link to={`/${entityPath}/${entityId}/edit`}>Editar</Link> |
        <Link to={`/${entityPath}`}>Volver a la lista</Link>
      </div>
      <hr />

      <div className="row g-3">
        <div className="col-md-6">
          <div className="d-block">
            <strong className="d-block h5 mb-0">Nombre</strong>
            <span className="text-secondary">{data.name}</span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="d-block">
            <strong className="d-block h5 mb-0">Código</strong>
            <span className="text-secondary">{data.code}</span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="d-block">
            <strong className="d-block h5 mb-0">Categoría</strong>
            <span className="text-secondary">{data.category.name}</span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="d-block">
            <strong className="d-block h5 mb-0">Tipo</strong>
            <span className="text-secondary">{getRiskTypeName(data.type)}</span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="d-block">
            <strong className="d-block h5 mb-0">Dueño</strong>
            <span className="text-secondary">{data.owner.name}</span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="d-block">
            <strong className="d-block h5 mb-0">Fase</strong>
            <span className="text-secondary">
              {getRiskPhaseName(data.phase)}
            </span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="d-block">
            <strong className="d-block h5 mb-0">Manejabilidad</strong>
            <span className="text-secondary">
              {getRiskManageabilityName(data.manageability)}
            </span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="d-block">
            <strong className="d-block h5 mb-0">Tratamiento</strong>
            <span className="text-secondary">{data.treatment.name}</span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="d-block">
            <strong className="d-block h5 mb-0">Fecha inicial</strong>
            <span className="text-secondary">{data.dateFrom}</span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="d-block">
            <strong className="d-block h5 mb-0">Fecha final</strong>
            <span className="text-secondary">{data.dateTo}</span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="d-block">
            <strong className="d-block h5 mb-0">Estado</strong>
            <span
              className={`badge text-bg-${
                data.state ? 'primary' : 'secondary'
              }`}
            >
              {data.state ? 'Activo' : 'Inactivo'}
            </span>
          </div>
        </div>
      </div>
      <br />
      <dl className="row">
        <dt className="col-sm-1">Creado:</dt>
        <dd className="col-sm-11">
          {dateToLocaleString(data.createdAt)} por{' '}
          {data.createdBy.name || 'No definido'}
        </dd>
        <dt className="col-sm-1">Modificado:</dt>
        <dd className="col-sm-11">
          {`${dateToLocaleString(data.updatedAt)} por ${
            data.updatedBy.name || 'No definido'
          }`}
        </dd>
      </dl>
    </>
  );
}

export default RiskDetails;
