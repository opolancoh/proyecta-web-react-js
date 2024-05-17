import { useState, useContext } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import { login } from '../../../services/authService';
import formValidation from './formValidation';

const Login = () => {
  const [data, setData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { loginContext } = useContext(AuthContext);

  const handleSubmit = async () => {
    const formErrors = formValidation(data);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // Send request
    const { username, password } = data;
    const result = await login(username, password);

    if (result.success) {
      loginContext(result.data);
      let navigateUrl = searchParams.get('returnUrl');
      if (!navigateUrl) navigateUrl = '/';
      navigate(navigateUrl);
    } else {
      setErrors(result.errors);
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
      {errors._ && (
        <ul>
          {errors._.map((x) => (
            <li key={x} className="text-danger">
              {x}
            </li>
          ))}
        </ul>
      )}
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
    </>
  );
};

export default Login;
