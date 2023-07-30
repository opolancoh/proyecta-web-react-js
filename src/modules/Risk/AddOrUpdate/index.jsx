/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import MinimalActionToast from '../../../components/MinimalActionToast';
import { entityPath } from '..';
import NotFound from '../../../pages/NotFound';
import httpClient from '../../../services/httpInterceptor';
import {
  getRiskTypeNames,
  getRiskPhaseNames,
  getRiskManageabilityNames,
} from '../Utilities/translations';
import RiskForm from './Form';
import formValidation from './formValidation';
import Loading from '../../../components/Loading';

function RiskAddOrUpdate() {
  const { entityId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    code: '',
    category: '',
    type: '',
    owner: '',
    phase: '',
    manageability: '',
    treatment: '',
    dateFrom: '',
    dateTo: '',
    state: false,
  });
  const [selectData, setSelectData] = useState({
    category: [],
    type: getRiskTypeNames(),
    owner: [],
    phase: getRiskPhaseNames(),
    manageability: getRiskManageabilityNames(),
    treatment: [],
  });
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [requestHasError, setRequestHasError] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const SelectDataUrls = [
      '/api/riskcategories',
      '/api/riskowners',
      '/api/risktreatments',
    ];
    if (entityId) SelectDataUrls.push(`/api/${entityPath}/${entityId}`);

    const fetchSelectData = async () => {
      try {
        const [categoryResult, owneryResult, treatmentResult, entityResult] =
          await Promise.all(SelectDataUrls.map((url) => httpClient.get(url)));

        setSelectData({
          ...selectData,
          category: categoryResult.data.d,
          owner: owneryResult.data.d,
          treatment: treatmentResult.data.d,
        });
        if (entityId) {
          console.log(entityResult.data);
          const { d } = entityResult.data;
          setData({
            name: d.name,
            code: d.code,
            category: d.category.id,
            type: d.type,
            owner: d.owner.id,
            phase: d.phase,
            manageability: d.manageability,
            treatment: d.treatment.id,
            dateFrom: d.dateFrom,
            dateTo: d.dateTo,
            state: d.state,
          });
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setRequestHasError(true);
      }
    };

    fetchSelectData();
  }, [entityId]);

  const handleSubmit = async () => {
    const formError = formValidation(data);
    if (Object.keys(formError).length > 0) {
      setError(formError);
      return;
    }

    // Send request
    const resultPromise = entityId
      ? httpClient.put(`/api/${entityPath}/${entityId}`, data)
      : httpClient.post(`/api/${entityPath}`, data);
    const result = await resultPromise;

    if ([200, 201, 204].includes(result.data.status)) {
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
    } else if ([400].includes(result.data.status)) {
      setNotification({
        action: 'error',
        message: result.data.errors[0].description,
      });
    } else {
      setRequestHasError(true);
    }
  };

  const handleOnChange = (event) => {
    const newData = {
      ...data,
      [event.target.id]:
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value,
    };
    setData(newData);

    const formError = formValidation(newData);
    if (Object.keys(formError).length > 0) {
      setError(formError);
    }
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
      <h4>Riesgo</h4>
      <div className="d-flex gap-2 mb-3">
        <Link to={`/${entityPath}`}>Volver a la lista</Link>
      </div>
      <hr />

      <RiskForm
        data={data}
        selectData={selectData}
        handleOnChange={handleOnChange}
        error={error}
      />

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

export default RiskAddOrUpdate;
