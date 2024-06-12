import { useState, useContext } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import { login } from '../../../services/authService';
import formValidation from './formValidation';
import MinimalActionToast from '../../../components/contoso-university/MinimalActionToast';

const Login = () => {
  const [data, setData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);

  const { loginContext } = useContext(AuthContext);

  const handleSubmit = async () => {
    const formErrors = formValidation(data);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const { username, password } = data;
    try {
      const response = await login(username, password);

      loginContext(response.data);
      let navigateUrl = searchParams.get('returnUrl');
      if (!navigateUrl) navigateUrl = '/';
      navigate(navigateUrl);
    } catch (error) {
      if (error.response && error.response.errors) {
        setErrors(error.response.errors);
      } else {
        setNotification({ action: 'error', message: error.response.message });
      }
    }
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

  return (
    <>
      <h1>Inicio de sesión</h1>
      <p>Usa tu cuenta.</p>
      <br />
      <form>
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Usuario
          </label>
          <input
            id="username"
            type="text"
            className={`form-control ${errors.username && 'is-invalid'}`}
            onChange={handleOnChange}
            value={data.username}
          />
          {errors.username &&
            errors.username.map((x, index) => (
              <div className="invalid-feedback" key={index}>
                {x}
              </div>
            ))}
        </div>

        <div className="form-group">
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
        <br />
        {/* <div className="form-group form-check">
          <input type="checkbox" className="form-check-input" id="rememberMe" />
          <label className="form-check-label" htmlFor="rememberMe">
            Recordarme
          </label>
        </div> */}

        <button
          type="button"
          onClick={handleSubmit}
          className="btn btn-primary"
        >
          Iniciar Sesión
        </button>
      </form>

      <br />
      <Link to="/register">Crear una cuenta</Link>

      {errors._ && (
        <ul>
          {errors._.map((x) => (
            <li key={x} className="text-danger">
              {x}
            </li>
          ))}
        </ul>
      )}

      {notification && (
        <MinimalActionToast
          action={notification.action}
          message={notification.message}
        />
      )}
    </>
  );
};

export default Login;
