import { useState, useContext } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import { login } from '../../../services/authService';

const Login = () => {
  const [formState, setformState] = useState({
    username: '',
    password: '',
  });
  const [formStateError, setformStateError] = useState({});

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { loginContext } = useContext(AuthContext);

  const handleSubmit = async () => {
    const { username, password } = formState;
    const result = await login(username, password);

    if (result.success) {
      loginContext(result.data);
      let navigateUrl = searchParams.get('returnUrl');
      if (!navigateUrl) navigateUrl = '/';
      navigate(navigateUrl);
    } else if (result.code === '400') {
      setformStateError(result.errors);
    }
  };

  const handleOnChange = (event) => {
    const target = event.currentTarget;
    setformState({
      ...formState,
      [target.id]: target.value,
    });
  };

  return (
    <>
      <h1>Inicio de sesión</h1>
      <p>Usa tu cuenta.</p>
      <br />
      {formStateError._ && (
        <ul>
          {formStateError._.map((x) => (
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
            className={`form-control ${
              formStateError.username ? 'is-invalid' : ''
            }`}
            onChange={handleOnChange}
            value={formState.username}
          />
          {formStateError.username &&
            formStateError.username.map((x, index) => (
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
            className={`form-control ${
              formStateError.password ? 'is-invalid' : ''
            }`}
            id="password"
            onChange={handleOnChange}
            value={formState.password}
          />
          {formStateError.password &&
            formStateError.password.map((x, index) => (
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
