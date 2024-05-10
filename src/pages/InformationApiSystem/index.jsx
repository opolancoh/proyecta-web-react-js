import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSystemInfo } from '../../services/apiInformationService';
import InfoPage from '../../components/InfoPage';
import Loading from '../../components/Loading';

function ApiServerInfo() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [requestHasError, setRequestHasError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const result = await getSystemInfo();

      if (result.success) {
        setData(result.data);
      } else {
        setRequestHasError(true);
      }
      setIsLoading(false);
    }

    fetchData();
  }, []);

  if (isLoading) return <Loading />;

  if (requestHasError) {
    navigate('/error');
    return null;
  }

  return (
    <InfoPage
      title="Información de la API"
      subtitle="Detalles técnicos del systema."
      data={data}
    />
  );
}

export default ApiServerInfo;
