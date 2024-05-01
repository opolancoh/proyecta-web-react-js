/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getById, remove } from '../../../services/riskService';
import { entityPath } from '..';
import { dateToLocaleString } from '../../../helpers/date-helper';
import NotFound from '../../../pages/NotFound';
import Loading from '../../../components/Loading';

export default function UserRemove() {
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

  const handleSubmit = async () => {
    // Send request
    const result = await remove(entityId);
    if (result.success) {
      navigate(`/${entityPath}`, {
        state: {
          notification: {
            action: 'success',
            message: `Elemento eliminado correctamente.`,
          },
        },
      });
    } else {
      setRequestHasError(true);
    }
  };

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
      <h1>Eliminar</h1>
      <h4>Riesgo</h4>
      <h4>Está seguro de eliminar este elemento?</h4>
      <div className="d-flex gap-2 mb-3">
        <Link to={`/${entityPath}`}>Volver a la lista</Link>
      </div>
      <hr />

      <dl className="row">
        <dt className="col-sm-1">Nombre:</dt>
        <dd className="col-sm-11">{data.name}</dd>
        <dt className="col-sm-1">Código:</dt>
        <dd className="col-sm-11">{data.code}</dd>
        <dt className="col-sm-1">Dueño:</dt>
        <dd className="col-sm-11">{data.owner.name}</dd>
        <dt className="col-sm-1">Fase:</dt>
        <dd className="col-sm-11"> {data.phase} </dd>
      </dl>
      <dl className="row">
        <dt className="col-sm-1">Creado:</dt>
        <dd className="col-sm-11">
          {dateToLocaleString(data.createdAt)} por{' '}
          {data.createdBy.name || 'No definido'}
        </dd>
        <dt className="col-sm-1">Modificado:</dt>
        <dd className="col-sm-11">
          {dateToLocaleString(data.updatedAt)} por{' '}
          {data.updatedBy.name || 'No definido'}
        </dd>
      </dl>

      <div className="row">
        <div className="col-md-2">
          <button className="btn btn-primary" onClick={handleSubmit}>
            Eliminar
          </button>
        </div>
      </div>
    </>
  );
}
