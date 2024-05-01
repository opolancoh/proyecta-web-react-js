/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { add, update, getById } from '../../../services/userService';
import MinimalActionToast from '../../../components/MinimalActionToast';
import { entityPath } from '..';
import NotFound from '../../../pages/NotFound';
import Loading from '../../../components/Loading';

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
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const result = await getById(entityId);
      if (result.success) {
        const roleChecks = {
          roleIsAdmin: 'ADMINISTRATOR',
          roleIsManager: 'MANAGER',
          roleIsEditor: 'EDITOR',
          roleIsViewer: 'VIEWER'
        };

        Object.keys(roleChecks).forEach(key => {
          result.data[key] = result.data.roles.some(
            role => role.name.toUpperCase() === roleChecks[key]
          );
        });

        setData(result.data);
      } else if (result.code === '404') setData(null);
      else {
        setRequestHasError(true);
      }
      setIsLoading(false);
    }

    if (entityId) fetchData();
    else setIsLoading(false);
  }, [entityId]);

  const handleSubmit = async () => {
    // Transform data
    const roles = [];
    if (data.roleIsAdmin) roles.push('Administrator');
    if (data.roleIsManager) roles.push('Manager');
    if (data.roleIsEditor) roles.push('Editor');
    if (data.roleIsViewer) roles.push('Viewer');

    const userName = data.userName.trim();
    const firstName = data.firstName.trim();
    const lastName = data.lastName.trim();
    const displayName = data.displayName.trim();
    const body = {
      userName,
      firstName,
      lastName,
      displayName,
      roles,
    };
    if (!entityId) body.password = data.password;

    // Send request
    const resultPromise = entityId ? update(entityId, body) : add(body);
    const result = await resultPromise;

    if (result.success) {
      navigate(`/${entityPath}`, {
        state: {
          notification: {
            action: 'success',
            message: `Elemento ${
              entityId ? 'actualizado' : 'creado'
            } correctamente.`,
          },
        },
      });
    } else {
      if (result.code === '400') {
        setNotification({
          action: 'error',
          message: result.errors[0].description,
        });
      } else {
        setRequestHasError(true);
      }
    }
  };

  const handleOnChange = (e) => {
    setData({
      ...data,
      [e.target.id]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    });
  };

  const handleOnCloseNotification = () => {
    setNotification(null);
  };

  if (isLoading) return <Loading />;

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
          <label htmlFor="displayName" className="form-label">
            Nombre a mostrar
          </label>
          <input
            id="displayName"
            type="text"
            className="form-control"
            value={data.displayName}
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
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="roleIsEditor"
              checked={data.roleIsEditor}
              onChange={handleOnChange}
            />
            <label className="form-check-label" htmlFor="roleIsEditor">
              Editor
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="roleIsViewer"
              checked={data.roleIsViewer}
              onChange={handleOnChange}
            />
            <label className="form-check-label" htmlFor="roleIsViewer">
              Visitante
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

      {notification !== null ? (
        <MinimalActionToast
          action={notification.action}
          message={notification.message}
          onClose={handleOnCloseNotification}
        />
      ) : null}
    </>
  );
}

export default UserAddOrUpdate;
