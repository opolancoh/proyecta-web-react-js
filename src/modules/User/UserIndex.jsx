import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAll } from '../../services/userService.js';
import MinimalActionToast from '../../components/contoso-university/MinimalActionToast/index.jsx';
import Table from './Table/UserTable.jsx';

import Loading from '../../components/contoso-university/Loading/index.jsx';

export const entityPath = 'users';

function UserIndex() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [localState, setLocalState] = useState({ isLoading: true, data: [] });
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await getAll();
      setLocalState({ isLoading: false, data: response.data });
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

  const { isLoading, data } = localState;

  if (isLoading) return <Loading />;

  return (
    <>
      <h1>Usuarios</h1>
      <p>
        <Link to={`/${entityPath}/new`}>Crear Nuevo</Link>
      </p>

      <Table entityPath={entityPath} data={data} isLoading={isLoading} />

      {notification && (
        <MinimalActionToast
          action={notification.action}
          message={notification.message}
          onClose={handleOnCloseNotification}
        />
      )}
    </>
  );
}

export default UserIndex;
