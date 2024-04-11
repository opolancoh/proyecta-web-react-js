import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import httpClient from '../../services/httpInterceptor';
import Loading from '../../components/Loading';

function ApiInfo() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [requestHasError, setRequestHasError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDotNetInfo() {
      const { data } = await httpClient.get('/system-info', {
        withoutToken: false,
      });

      if (data.status === 200) {
        setData(data.d);
      } else if (data.status === 404) setData(null);
      else {
        setRequestHasError(true);
      }
      setIsLoading(false);
    }

    fetchDotNetInfo();
  }, []);

  if (isLoading) return <Loading />;

  if (requestHasError) {
    navigate('/error');
    return null;
  }

  return (
    <>
      <h1>Información de la API</h1>
      <p>Detalles técnicos de la API.</p>
      <br />

      <div className="row">
        <h3>Información del servidor:</h3>
        <table className="table table-striped table-hover">
          <tbody>
            {data.serverInfo.map((x) => (
              <tr key={x.id}>
                <td>{x.key}</td>
                <td>{x.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br />
      <div className="row">
        <h3>Variables de entorno:</h3>
        <table className="table table-striped table-hover">
          <tbody>
            {data.envVarsInfo.map((x) => (
              <tr key={x.id}>
                <td>{x.key}</td>
                <td>{x.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ApiInfo;
