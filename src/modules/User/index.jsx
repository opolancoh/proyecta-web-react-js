import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAll } from '../../services/userService.js';
import MinimalActionToast from '../../components/MinimalActionToast';
import Table from './Table';

import Loading from '../../components/Loading';

export const entityPath = 'users';

function UserIndex() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [requestHasError, setRequestHasError] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const result = await getAll();
      if (result.success) {
        setData(result.data);
      } else if (result.code === '404') setData(null);
      else {
        setRequestHasError(true);
      }
      setIsLoading(false);
    }

    if (state && state.notification) {
      setNotification(state.notification);
      navigate(location.pathname, { replace: true, state: null });
    }
    fetchData();
  }, [navigate, state]);

  const handleOnCloseNotification = () => {
    setNotification(null);
  };

  if (isLoading) return <Loading />;

  if (requestHasError) {
    navigate('/error');
    return null;
  }

  return (
    <>
      <h1>Usuarios</h1>
      <p>
        <Link to={`/${entityPath}/new`}>Crear Nuevo</Link>
      </p>

      <Table entityPath={entityPath} data={data} isLoading={isLoading} />

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

export default UserIndex;
