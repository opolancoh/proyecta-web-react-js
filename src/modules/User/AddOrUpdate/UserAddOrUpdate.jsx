import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EntityAddOrUpdate from '../../../components/contoso-university/entity/AddOrUpdate/EntityAddOrUpdate';
import { add, update, getById } from '../../../services/userService';
import MinimalActionToast from '../../../components/contoso-university/MinimalActionToast';
import { entityPath } from '../UserIndex';
import Form from './UserAddOrUpdateForm';
import formValidator from './userAddOrUpdateFormValidator';

const initialData = {
  userName: '',
  firstName: '',
  lastName: '',
  password: '',
  roleIsAdmin: false,
  roleIsManager: false,
  roleIsEditor: false,
  roleIsViewer: false,
};

function UserAddOrUpdate() {
  const { entityId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState(null);

  const fetchData = useCallback(async () => {
    if (!entityId) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await getById(entityId);
      const roleChecks = {
        roleIsAdmin: 'ADMINISTRATOR',
        roleIsManager: 'MANAGER',
        roleIsEditor: 'EDITOR',
        roleIsViewer: 'VIEWER',
      };

      const updatedData = Object.keys(roleChecks).reduce(
        (acc, key) => {
          acc[key] = response.data.roles.some((role) => role.name.toUpperCase() === roleChecks[key]);
          return acc;
        },
        { ...response.data }
      );

      setData(updatedData);
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  }, [entityId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const isEditMode = Boolean(entityId);

  const handleOnChange = useCallback((e) => {
    const { id, type, checked, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value,
    }));
  }, []);

  const handleSubmit = useCallback(async () => {
    const formErrors = formValidator(data);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const roles = [];
    if (data.roleIsAdmin) roles.push('Administrator');
    if (data.roleIsManager) roles.push('Manager');
    if (data.roleIsEditor) roles.push('Editor');
    if (data.roleIsViewer) roles.push('Viewer');

    const body = {
      ...data,
      roles,
      userName: data.userName.trim(),
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
    };

    if (!isEditMode) body.password = data.password;

    try {
      if (isEditMode) {
        await update(entityId, body);
      } else {
        await add(body);
      }

      navigate(`/${entityPath}`, {
        state: {
          notification: {
            action: 'success',
            message: `Elemento ${isEditMode ? 'actualizado' : 'creado'} correctamente.`,
          },
        },
      });
    } catch (error) {
      handleApiError(error);
    }
  }, [data, isEditMode, entityId, navigate]);

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
        entityName="Usuario"
        entityPath={entityPath}
        isEditMode={isEditMode}
        isLoading={isLoading}
        submitHandler={handleSubmit}
      >
        <Form isEditMode={isEditMode} data={data} errors={errors} onChangeHandler={handleOnChange} />
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

export default UserAddOrUpdate;
