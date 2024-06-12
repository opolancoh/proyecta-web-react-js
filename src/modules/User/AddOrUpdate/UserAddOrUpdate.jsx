/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EntityAddOrUpdate from '../../../components/contoso-university/entity/AddOrUpdate/EntityAddOrUpdate';
import { add, update, getById } from '../../../services/userService';
import MinimalActionToast from '../../../components/contoso-university/MinimalActionToast';
import { entityPath } from '../UserIndex';
import Form from './UserAddOrUpdateForm';
import formValidator from './userAddOrUpdateFormValidator';

function UserAddOrUpdate() {
  const { entityId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({
    userName: '',
    firstName: '',
    lastName: '',
    password: '',
    roleIsAdmin: false,
    roleIsManager: false,
  });
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await getById(entityId);

      const roleChecks = {
        roleIsAdmin: 'ADMINISTRATOR',
        roleIsManager: 'MANAGER',
        roleIsEditor: 'EDITOR',
        roleIsViewer: 'VIEWER',
      };

      Object.keys(roleChecks).forEach((key) => {
        response.data[key] = response.data.roles.some((role) => role.name.toUpperCase() === roleChecks[key]);
      });

      setData(response.data);
      setIsLoading(false);
    }

    if (entityId) fetchData();
    else setIsLoading(false);
  }, [entityId]);

  const isEditMode = entityId != null && entityId !== '';

  const handleOnChange = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    });
  };

  const handleSubmit = async () => {
    const formErrors = formValidator(data);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // Transform data
    const roles = [];
    if (data.roleIsAdmin) roles.push('Administrator');
    if (data.roleIsManager) roles.push('Manager');
    if (data.roleIsEditor) roles.push('Editor');
    if (data.roleIsViewer) roles.push('Viewer');

    const userName = data.userName.trim();
    const firstName = data.firstName.trim();
    const lastName = data.lastName.trim();
    const displayName = data.displayName.trim();

    const body = {
      userName,
      firstName,
      lastName,
      displayName,
      roles,
    };

    if (!entityId) body.password = data.password;

    try {
      if (entityId) {
        await update(entityId, body);
      } else {
        await add(body);
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
  };

  const handleApiError = (error) => {
    const { response } = error;
    const errorMessage = response?.data?.message || 'An error occurred';
    const errorDetails = response?.data?.errors || {};

    setNotification({ action: 'error', message: errorMessage });
    setErrors(errorDetails);
  };

  const handleOnCloseNotification = () => {
    setNotification(null);
  };

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
