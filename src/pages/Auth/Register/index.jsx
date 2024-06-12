import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../../services/authService';
import Loading from '../../../components/contoso-university/Loading';
import formValidation from './formValidation';
import { AuthContext } from '../../../contexts/AuthContext';

function Register() {
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    displayName: '',
    username: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const { loginContext } = useContext(AuthContext);

  const handleSubmit = async () => {
    const formErrors = formValidation(data);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsLoading(true);
    const result = await register(data);

    if (result.success) {
      loginContext(result.data);
      navigate('/');
    }

    if (result.errors) setErrors(result.errors);
    setIsLoading(false);
  };

  const handleOnChange = (event) => {
    const { id, value } = event.target;

    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    // Validate the specific field
    const fieldError = formValidation({ [id]: value });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: fieldError[id],
    }));
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <h1>Registro</h1>
      <p>Crear una cuenta.</p>
      <br />
      {errors._ && (
        <ul>
          {errors._.map((x) => (
            <li key={x} className="text-danger">
              {x}
            </li>
          ))}
        </ul>
      )}
      <form className="row g-3 needs-validation">
        <div className="col-md-4">
          <label htmlFor="firstName" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className={`form-control ${errors.firstName && 'is-invalid'}`}
            id="firstName"
            onChange={handleOnChange}
            value={data.firstName}
          />
          {errors.firstName &&
            errors.firstName.map((x, index) => (
              <div className="invalid-feedback" key={index}>
                {x}
              </div>
            ))}
        </div>

        <div className="col-md-4">
          <label htmlFor="lastName" className="form-label">
            Apellido
          </label>
          <input
            type="text"
            className={`form-control ${errors.lastName && 'is-invalid'}`}
            id="lastName"
            onChange={handleOnChange}
            value={data.lastName}
          />
          {errors.lastName &&
            errors.lastName.map((x, index) => (
              <div className="invalid-feedback" key={index}>
                {x}
              </div>
            ))}
        </div>

        <div className="col-md-4">
          <label htmlFor="displayName" className="form-label">
            Nombre a mostrar
          </label>
          <input
            type="text"
            className={`form-control ${errors.displayName && 'is-invalid'}`}
            id="displayName"
            onChange={handleOnChange}
            value={data.displayName}
          />
          {errors.displayName &&
            errors.displayName.map((x, index) => (
              <div className="invalid-feedback" key={index}>
                {x}
              </div>
            ))}
        </div>

        <div className="col-12">
          <label htmlFor="username" className="form-label">
            Usuario
          </label>
          <input
            type="text"
            className={`form-control ${errors.username && 'is-invalid'}`}
            id="username"
            onChange={handleOnChange}
            value={data.userName}
          />
          {errors.username &&
            errors.username.map((x, index) => (
              <div className="invalid-feedback" key={index}>
                {x}
              </div>
            ))}
        </div>

        <div className="col-12">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            className={`form-control ${errors.password && 'is-invalid'}`}
            id="password"
            onChange={handleOnChange}
            value={data.password}
          />
          {errors.password &&
            errors.password.map((x, index) => (
              <div className="invalid-feedback" key={index}>
                {x}
              </div>
            ))}
        </div>

        <div className="col-12">
          <button
            type="button"
            onClick={handleSubmit}
            className="btn btn-primary"
          >
            Crear
          </button>
        </div>
      </form>
    </>
  );
}

export default Register;
