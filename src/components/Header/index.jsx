/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

function Header() {
  const { isAuthenticated, user, logout} = useContext(AuthContext);
  console.log('context Header', user);

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
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/about">
                  Acerca de
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav">
              {isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-dark" to="/">
                      Bienvenido, {user.username}!
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={logout}>
                      Cerrar sesión
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-dark" to="/register">
                      Registro
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-dark" to="/login">
                      Acceder
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
