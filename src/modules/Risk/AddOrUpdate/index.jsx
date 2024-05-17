/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { add, update, getById } from '../../../services/riskService';
import { getAll as getAllCategories } from '../../../services/riskCategoryService';
import { getAll as getAllOwners } from '../../../services/riskOwnerService';
import { getAll as getAllTreatments } from '../../../services/riskTreatmentService';
import MinimalActionToast from '../../../components/MinimalActionToast';
import { entityPath } from '..';
import NotFound from '../../../pages/NotFound';
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
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [requestHasError, setRequestHasError] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchSelectData = async () => {
      try {
        const categoryResult = await getAllCategories();
        const ownerResult = await getAllOwners();
        const treatmentResult = await getAllTreatments();

        setSelectData({
          ...selectData,
          category: categoryResult.data,
          owner: ownerResult.data,
          treatment: treatmentResult.data,
        });

        if (entityId) {
          const entityResult = await getById(entityId);
          const { data } = entityResult;
          setData({
            name: data.name,
            code: data.code,
            category: data.category.id,
            type: data.type,
            owner: data.owner.id,
            phase: data.phase,
            manageability: data.manageability,
            treatment: data.treatment.id,
            dateFrom: data.dateFrom,
            dateTo: data.dateTo,
            state: data.state,
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
    const formErrors = formValidation(data);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // Send request
    const resultPromise = entityId ? update(entityId, data) : add(data);
    const result = await resultPromise;

    if (result.success) {
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
    } else if (result.code === '400') {
      setNotification({
        action: 'error',
        message: result.message,
      });
      setErrors(result.errors);
    } else {
      setNotification({
        action: 'error',
        message: result.message,
      });

      setRequestHasError(true);
    }
  };

  const handleOnChange = (event) => {
    const { id, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    setData((prevData) => ({
      ...prevData,
      [id]: newValue,
    }));

    // Validate the specific field
    const fieldError = formValidation({ [id]: newValue });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: fieldError[id],
    }));
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
        errors={errors}
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
