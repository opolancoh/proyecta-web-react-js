/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getById } from '../../../services/userService';
import { entityPath } from '..';
import { dateToLocaleString } from '../../../helpers/date-helper';
import NotFound from '../../../pages/NotFound';
import Loading from '../../../components/Loading';

function UserDetails() {
  const { entityId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [requestHasError, setRequestHasError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const result = await getById(entityId);
      if (result.success) {
        setData(result.data);
      } else if (result.code === '404') setData(null);
      else {
        setRequestHasError(true);
      }
      setIsLoading(false);
    }

    fetchData();
  }, [entityId]);

  if (isLoading) return <Loading />;

  if (data === null) {
    return <NotFound />;
  }

  if (requestHasError) {
    console.log('requestHasError');
    navigate('/error');
    return null;
  }

  return (
    <>
      <h1>Detalle</h1>
      <h4>Usuario</h4>
      <div className="d-flex gap-2 mb-3">
        <Link to={`/${entityPath}/${entityId}/edit`}>Editar</Link> |
        <Link to={`/${entityPath}`}>Volver a la lista</Link>
      </div>
      <hr />

      <dl className="row">
        <dt className="col-sm-1">Usuario:</dt>
        <dd className="col-sm-11">{data.userName}</dd>
        <dt className="col-sm-1">Nombre:</dt>
        <dd className="col-sm-11">{data.firstName}</dd>
        <dt className="col-sm-1">Apellido:</dt>
        <dd className="col-sm-11">{data.lastName}</dd>
        <dt className="col-sm-1">Nombre a mostrar:</dt>
        <dd className="col-sm-11">{data.displayName}</dd>
        <dt className="col-sm-1">Roles:</dt>
        <dd className="col-sm-11">
          {data.roles.map((x) => x.name).join(', ')}
        </dd>
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
    </>
  );
}

export default UserDetails;
