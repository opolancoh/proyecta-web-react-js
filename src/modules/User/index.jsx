import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import MinimalActionToast from '../../components/MinimalActionToast';
import Table from './Table';
import httpClient from '../../services/httpInterceptor.js';

export const entityPath = 'users';

function UserIndex() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const result = await httpClient.get(`/api/${entityPath}`);
      setData(result.data.d);
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

  return (
    <>
      <h1>Usuarios</h1>
      <p>
        <Link to={`/${entityPath}/add`}>Crear Nuevo</Link>
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
