import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EntityAddOrUpdate from '../../../components/contoso-university/entity/AddOrUpdate/EntityAddOrUpdate';
import { add, update, getById } from '../../../services/riskService';
import { getAll as getAllCategories } from '../../../services/riskCategoryService';
import { getAll as getAllOwners } from '../../../services/riskOwnerService';
import { getAll as getAllTreatments } from '../../../services/riskTreatmentService';
import MinimalActionToast from '../../../components/contoso-university/MinimalActionToast';
import { entityPath } from '../RiskIndex';
import Form from './RiskAddOrUpdateForm';
import formValidator from './riskAddOrUpdateFormValidator';

const initialItemData = {
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
};

const initialControlsData = {
  categories: [],
  types: [{ id: 1 }, { id: 2 }],
  owners: [],
  phases: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
  manageabilities: [{ id: 1 }, { id: 2 }, { id: 3 }],
  treatments: [],
};

function RiskAddOrUpdate() {
  const { entityId } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(initialItemData);
  const [controlsData, setControlsData] = useState(initialControlsData);
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const [categoryResponse, ownerResponse, treatmentResponse] = await Promise.all([
        getAllCategories(),
        getAllOwners(),
        getAllTreatments(),
      ]);

      if (entityId) {
        const { data } = await getById(entityId);
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

      setControlsData((prevState) => ({
        ...prevState,
        categories: categoryResponse.data,
        owners: ownerResponse.data,
        treatments: treatmentResponse.data,
      }));
    } catch (error) {
      setNotification({ action: 'error', message: 'Failed to fetch data.' });
    } finally {
      setIsLoading(false);
    }
  }, [entityId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const isEditMode = Boolean(entityId);

  const handleOnChange = useCallback((event) => {
    const { id, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    setData((prevData) => ({
      ...prevData,
      [id]: newValue,
    }));

    // Validate the specific field
    const fieldError = formValidator({ [id]: newValue });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: fieldError[id],
    }));
  }, []);

  const handleSubmit = useCallback(async () => {
    const formErrors = formValidator(data);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      if (entityId) {
        await update(entityId, data);
      } else {
        await add(data);
      }

      navigate(`/${entityPath}`, {
        state: {
          notification: {
            action: 'success',
            message: `Elemento ${entityId ? 'actualizado' : 'creado'} correctamente.`,
          },
        },
      });
    } catch (error) {
      handleApiError(error);
    }
  }, [data, entityId, navigate]);

  const handleApiError = useCallback((error) => {
    const { response } = error;
    const errorMessage = response?.data?.message || 'An error occurred';
    const errorDetails = response?.data?.errors || {};

    setNotification({ action: 'error', message: errorMessage });
    setErrors(errorDetails);
  }, []);

  const handleOnCloseNotification = useCallback(() => {
    setNotification(null);
  }, []);

  return (
    <>
      <EntityAddOrUpdate
        entityName="Riesgo"
        entityPath={entityPath}
        isEditMode={isEditMode}
        isLoading={isLoading}
        submitHandler={handleSubmit}
      >
        <Form data={data} controlsData={controlsData} errors={errors} onChangeHandler={handleOnChange} />
      </EntityAddOrUpdate>

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

export default RiskAddOrUpdate;
