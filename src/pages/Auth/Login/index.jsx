import { useState, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import httpClient from '../../../services/httpInterceptor';
import { login } from '../../../helpers/auth-helper';
import { GlobalContext } from '../../../contexts/isAuthenticatedContext';

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(GlobalContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  // const [isLoading, setIsLoading] = useState(true);
  const [formState, setformState] = useState({
    userName: '',
    password: '',
  });
  const [formStateError, setformStateError] = useState({});

  console.log('context Login', isAuthenticated);

  const handleSubmit = async () => {
    const { data } = await httpClient.post(
      '/api/auth/login',
      JSON.stringify(formState)
    );

    if (data.status === 200) {
      login(data.d.token);
      setIsAuthenticated(true);
      let navigateUrl = searchParams.get('returnUrl');
      if (!navigateUrl) navigateUrl = '/';
      navigate(navigateUrl);      
    } else if (data.status === 400) {
      setformStateError(data.errors);
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
      <h1>Acceder</h1>
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
          <label htmlFor="userName" className="form-label">
            Usuario
          </label>
          <input
            id="userName"
            type="text"
            className={`form-control ${
              formStateError.userName ? 'is-invalid' : ''
            }`}
            onChange={handleOnChange}
            value={formState.userName}
          />
          {formStateError.userName &&
            formStateError.userName.map((x, index) => (
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

        <div className="form-group form-check">
          <input type="checkbox" className="form-check-input" id="rememberMe" />
          <label className="form-check-label" htmlFor="rememberMe">
            Recordarme
          </label>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="btn btn-primary"
        >
          Iniciar Sesión
        </button>
      </form>
    </>
  );
};

export default Login;
