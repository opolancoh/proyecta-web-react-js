import { useState } from 'react';

function Register() {
  // const [isLoading, setIsLoading] = useState(true);
  const [formState, setformState] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    password: '',
  });
  const [formStateError, setformStateError] = useState({});

  console.log(formStateError);

  const handleSubmit = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/auth/users/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      }
    );
    const json = await response.json();
    if (json.status === 400) {
      setformStateError(json.errors);
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
      <h1>Registro</h1>
      <p>Crear una cuenta.</p>
      <br />
      {formStateError._ && (
        <ul>
          {formStateError._.map((x) => (
            <li key={x} className="text-danger">{x}</li>
          ))}
        </ul>
      )}
      <form className="row g-3 needs-validation">
        <div className="col-md-6">
          <label htmlFor="firstName" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className={`form-control ${
              formStateError.firstName ? 'is-invalid' : ''
            }`}
            id="firstName"
            onChange={handleOnChange}
            value={formState.firstName}
          />
          {formStateError.firstName &&
            formStateError.firstName.map((x, index) => (
              <div className="invalid-feedback" key={index}>
                {x}
              </div>
            ))}
        </div>
        <div className="col-md-6">
          <label htmlFor="lastName" className="form-label">
            Apellido
          </label>
          <input
            type="text"
            className={`form-control ${
              formStateError.lastName ? 'is-invalid' : ''
            }`}
            id="lastName"
            onChange={handleOnChange}
            value={formState.lastName}
          />
          {formStateError.lastName &&
            formStateError.lastName.map((x, index) => (
              <div className="invalid-feedback" key={index}>
                {x}
              </div>
            ))}
        </div>
        <div className="col-12">
          <label htmlFor="userName" className="form-label">
            Usuario
          </label>
          <input
            type="text"
            className={`form-control ${
              formStateError.userName ? 'is-invalid' : ''
            }`}
            id="userName"
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
        <div className="col-12">
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
