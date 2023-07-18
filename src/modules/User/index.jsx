import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Table from './Table';
import httpClient from '../../services/httpInterceptor.js';

export const entityPath = 'users';

function UserIndex() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const result = await httpClient.get(`/api/${entityPath}`);
      setData(result.data.d);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  if (isLoading) return null;

  return (
    <>
      <h1>Usuarios</h1>
      <p>
        <Link to={`/${entityPath}/add`}>Crear Nuevo</Link>
      </p>

      <Table entityPath={entityPath} data={data} />
    </>
  );
}

export default UserIndex;
