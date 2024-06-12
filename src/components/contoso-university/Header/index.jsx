/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import { logout } from '../../../services/authService';

function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logoutContext } = useContext(AuthContext);

  const logoutHandler = async () => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    const result = await logout(accessToken, refreshToken);
    if (!result.success) {
      console.error(`[logoutHandler] ${result.message}`);
    }
    logoutContext();
    navigate('/login');
  };

  return (
    <header>
      <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Proyecta
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target=".navbar-collapse"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
            <ul className="navbar-nav flex-grow-1">
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/">
                  Inicio
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/risks">
                  Riesgos
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/users">
                  Usuarios
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-dark"
                  data-bs-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-expanded="false"
                >
                  Ayuda
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/about">
                      Acerca de
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/app-info">
                      Información de la aplicación (React)
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/api-server-info">
                      Información del servidor (API)
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/api-system-info">
                      Información del sistema (API)
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
            <ul className="navbar-nav">
              {isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-dark" to="/">
                      Bienvenido, {user.name}!
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link text-dark"
                      href="#"
                      onClick={logoutHandler}
                    >
                      Cerrar sesión
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-dark" to="/login">
                      Iniciar sesión
                    </Link>
                  </li>
                </>
              )}
              {}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
