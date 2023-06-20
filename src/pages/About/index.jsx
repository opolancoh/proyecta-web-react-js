import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import httpClient from '../../services/httpInterceptor';

function About() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [requestHasError, setRequestHasError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDotNetInfo() {
      const { data } = await httpClient.get('/info', { isAnonymous: true });

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

  if (isLoading) return null;

  if (requestHasError) {
    navigate('/error');
    return null;
  }

  return (
    <>
      <h1>Acerca de</h1>
      <p>Información general de la aplicación.</p>
      <br />

      <div className="row">
        <h3>React App:</h3>
        <table className="table table-striped table-hover">
          <tbody>
            <tr>
              <td>REACT_APP_VERSION:</td>
              <td> {process.env.REACT_APP_VERSION}</td>
            </tr>
            <tr>
              <td>REACT_APP_API_URL:</td>
              <td>{process.env.REACT_APP_API_URL}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="row">
        <h3>.NET App:</h3>
        <table className="table table-striped table-hover">
          <tbody>
            <tr>
              <td>.NET version</td>
              <td>{data.dotnetVersion}</td>
            </tr>
            <tr>
              <td>Operating system</td>
              <td>{data.operatingSystem}</td>
            </tr>
            <tr>
              <td>Runtime Identifier</td>
              <td>{data.runtimeIdentifier}</td>
            </tr>
            <tr>
              <td>Processor architecture</td>
              <td>{data.processorArchitecture}</td>
            </tr>
            <tr>
              <td>CPU cores</td>
              <td>{data.cpuCores}</td>
            </tr>
            <tr>
              <td>User</td>
              <td>{data.user}</td>
            </tr>
            <tr>
              <td>Memory, total available GC memory</td>
              <td>{data.memory}</td>
            </tr>
            <tr>
              <td>Host name</td>
              <td>{data.hostName}</td>
            </tr>
            <tr>
              <td style={{ verticalAlign: 'top' }}>Server IP address</td>
              <td>
                {data.ipList.map((x, index) => {
                  return <span key={index}>{x} </span>;
                })}
              </td>
            </tr>
            <tr>
              <td>DOTNET_RUNNING_IN_CONTAINER</td>
              <td>{String(data.containerized)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default About;
