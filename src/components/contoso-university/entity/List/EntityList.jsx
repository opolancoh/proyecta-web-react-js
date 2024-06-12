import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import TableLoading from './TableLoading';
import TableNoData from './TableNoData';
import TableWithData from './TableWithData';
import MinimalActionToast from '../../MinimalActionToast';

export const entityPath = 'risks';

function EntityList({ entityPluralName, entityPath, columns, renderRow, fetchDataFunction }) {
  const navigate = useNavigate();
  const { state: locationState } = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await fetchDataFunction();
        if (isMounted) {
          setData(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Failed to fetch data:', error);
          setIsLoading(false);
        }
      }
    };

    if (locationState?.notification) {
      setNotification(locationState?.notification);
      navigate(location.pathname, { replace: true, state: null });
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [navigate, locationState?.notification, fetchDataFunction]);

  const handleOnCloseNotification = () => {
    setNotification(null);
  };

  if (isLoading) return <TableLoading columns={columns} />;

  if (data.length === 0) return <TableNoData columns={columns} />;

  return (
    <>
      <h1>{entityPluralName}</h1>
      <p>
        <Link to={`/${entityPath}/new`}>Crear Nuevo</Link>
      </p>

      <TableWithData
        entityPath={entityPath}
        isLoading={isLoading}
        columns={columns}
        renderRow={renderRow}
        data={data}
      />

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

export default EntityList;
