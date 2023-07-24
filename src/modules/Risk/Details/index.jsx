/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { entityPath } from "..";
import { dateToLocaleString } from '../../../helpers/date-helper';
import NotFound from '../../../pages/NotFound';
import httpClient from '../../../services/httpInterceptor';

function RiskDetails() {
  const { entityId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [requestHasError, setRequestHasError] = useState(false);

  useEffect(() => {
    async function fetchRisk() {
      const result = await httpClient.get(`/api/${entityPath}/${entityId}`);
      if (result.data.status === 200) {
        setData(result.data.d);
      } else if (result.data.status === 404) setData(null);
      else {
        setRequestHasError(true);
      }
      setIsLoading(false);
    }

    fetchRisk();
  }, [entityId]);

  if (isLoading) return null;

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
        <div className="col-md-12">
          <label className="form-label">Nombre</label>
          <label className="form-control">{data.name}</label>
        </div>
        <div className="col-md-4">
          <label className="form-label">Código</label>
          <label className="form-control">{data.code}</label>
        </div>
        <div className="col-md-4">
          <label className="form-label">Categoría</label>
          <label className="form-control">{data.category}</label>
        </div>
        <div className="col-md-4">
          <label className="form-label">Tipo</label>
          <label className="form-control">{data.type}</label>
        </div>
        <div className="col-md-6">
          <label className="form-label">Dueño</label>
          <label className="form-control">{data.owner}</label>
        </div>
        <div className="col-md-6">
          <label className="form-label">Fase</label>
          <label className="form-control">{data.phase}</label>
        </div>
        <div className="col-md-6">
          <label className="form-label">Manejabilidad</label>
          <label className="form-control">{data.manageability}</label>
        </div>
        <div className="col-md-6">
          <label className="form-label">Tratamiento</label>
          <label className="form-control">{data.treatment}</label>
        </div>
        <div className="col-md-6">
          <label className="form-label">Fecha Inicial</label>
          <label className="form-control">{data.dateFrom}</label>
        </div>
        <div className="col-md-6">
          <label className="form-label">Fecha Final</label>
          <label className="form-control">{data.dateTo}</label>
        </div>
        <div className="col-12">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={data.state}
              readOnly
            />
            <label className="">
              Estado ({data.state ? 'Activo' : 'Inactivo'})
            </label>
          </div>
        </div>
      </div>
      <br />
      <dl className="row">
        <dt className="col-sm-1">Creado:</dt>
        <dd className="col-sm-11">{dateToLocaleString(data.createdAt)}</dd>
        <dt className="col-sm-1">Modificado:</dt>
        <dd className="col-sm-11">{dateToLocaleString(data.updatedAt)}</dd>
      </dl>
    </>
  );
}

export default RiskDetails;
