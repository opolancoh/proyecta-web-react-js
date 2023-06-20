import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RiskTable from './Table';
import httpClient from '../../services/httpInterceptor.js';

function RiskIndex() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRisks() {
      const result = await httpClient.get('/api/risks');
      setData(result.data.d);
      setIsLoading(false);
    }

    fetchRisks();
  }, []);

  if (isLoading) return null;

  return (
    <>
      <h1>Riesgos</h1>
      <p>
        <Link to="/">Crear Nuevo</Link>
      </p>

      <RiskTable data={data} />
    </>
  );
}

export default RiskIndex;
