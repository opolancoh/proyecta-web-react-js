/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { entityPath } from '..';
import NotFound from '../../../pages/NotFound';
import httpClient from '../../../services/httpInterceptor';

function UserAddOrUpdate() {
  const { entityId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    userName: '',
    firstName: '',
    lastName: '',
    password: '',
    roleIsAdmin: false,
    roleIsManager: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [requestHasError, setRequestHasError] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      const result = await httpClient.get(`/api/${entityPath}/${entityId}`);
      if (result.data.status === 200) {
        const data = result.data.d;
        data.roleIsAdmin = data.roles.includes('Administrator');
        data.roleIsManager = data.roles.includes('Manager');
        setData(data);
      } else if (result.data.status === 404) setData(null);
      else {
        setRequestHasError(true);
      }
      setIsLoading(false);
    }

    if (entityId) fetchUser();
    else setIsLoading(false);
  }, [entityId]);

  const handleSubmit = async () => {
    // Transform data
    const roles = [];
    if (data.roleIsAdmin) roles.push('Administrator');
    if (data.roleIsManager) roles.push('Manager');

    const body = {
      userName: data.userName,
      firstName: data.firstName,
      lastName: data.lastName,
      roles,
    };
    if (!entityId) body.password = data.password;

    // Send request
    if (entityId) {
      const result = await httpClient.put(
        `/api/${entityPath}/${entityId}`,
        body
      );
      if (result.data.status === 200) {
        navigate(`/${entityPath}`);
      } else {
        setRequestHasError(true);
      }
    } else {
      const result = await httpClient.post(`/api/${entityPath}`, body);
      // eslint-disable-next-line no-debugger
      debugger;
      if (result.data.status === 201) {
        navigate(`/${entityPath}`);
      } else {
        setRequestHasError(true);
      }
    }
  };

  const handleOnChange = (e) => {
    // setData({ ...data, [e.target.id]: e.target.value });
    setData({
      ...data,
      [e.target.id]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    });
  };

  if (isLoading) return null;

  if (requestHasError) {
    navigate('/error');
    return null;
  }

  if (entityId && data === null) {
    return <NotFound />;
  }

  return (
    <>
      <h1>{entityId ? 'Editar' : 'Agregar'}</h1>
      <h4>Usuario</h4>
      <div className="d-flex gap-2 mb-3">
        <Link to={`/${entityPath}`}>Volver a la lista</Link>
      </div>
      <hr />

      <div className="row g-3">
        <div className="col-md-6">
          <label htmlFor="firstName" className="form-label">
            Nombre
          </label>
          <input
            id="firstName"
            type="text"
            className="form-control"
            value={data.firstName}
            onChange={handleOnChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="lastName" className="form-label">
            Apellido
          </label>
          <input
            id="lastName"
            type="text"
            className="form-control"
            value={data.lastName}
            onChange={handleOnChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="userName" className="form-label">
            Usuario
          </label>
          <input
            id="userName"
            type="text"
            className="form-control"
            value={data.userName}
            onChange={handleOnChange}
          />
        </div>
        {!entityId && (
          <div className="col-md-6">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              className="form-control"
              value={data.password}
              onChange={handleOnChange}
            />
          </div>
        )}
        <div className="col-md-12">
          <label className="form-label">Roles</label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="roleIsAdmin"
              checked={data.roleIsAdmin}
              onChange={handleOnChange}
            />
            <label className="form-check-label" htmlFor="roleIsAdmin">
              Administrador
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="roleIsManager"
              checked={data.roleIsManager}
              onChange={handleOnChange}
            />
            <label className="form-check-label" htmlFor="roleIsManager">
              Gerente
            </label>
          </div>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-md-2">
          <button className="btn btn-primary" onClick={handleSubmit}>
            Guardar
          </button>
        </div>
      </div>
    </>
  );
}

export default UserAddOrUpdate;
