function UserAddOrUpdateForm({ isEditMode, data = {}, errors = {}, onChangeHandler }) {
  return (
    <>
      <div className="row g-3">
        <div className="col-6">
          <label htmlFor="firstName" className="form-label">
            Nombre
          </label>
          <input
            id="firstName"
            type="text"
            className={`form-control ${errors.firstName && 'is-invalid'}`}
            value={data.firstName}
            onChange={onChangeHandler}
          />
          {errors.firstName &&
            errors.firstName.map((x, index) => (
              <div className="invalid-feedback" key={index}>
                {x}
              </div>
            ))}
        </div>

        <div className="col-6">
          <label htmlFor="lastName" className="form-label">
            Apellido
          </label>
          <input
            id="lastName"
            type="text"
            className={`form-control ${errors.lastName && 'is-invalid'}`}
            value={data.lastName}
            onChange={onChangeHandler}
          />
          {errors.lastName &&
            errors.lastName.map((x, index) => (
              <div className="invalid-feedback" key={index}>
                {x}
              </div>
            ))}
        </div>

        <div className="col-6">
          <label htmlFor="displayName" className="form-label">
            Nombre a mostrar
          </label>
          <input
            id="displayName"
            type="text"
            className={`form-control ${errors.displayName && 'is-invalid'}`}
            value={data.displayName}
            onChange={onChangeHandler}
          />
          {errors.displayName &&
            errors.displayName.map((x, index) => (
              <div className="invalid-feedback" key={index}>
                {x}
              </div>
            ))}
        </div>

        <div className="col-6">
          <label htmlFor="userName" className="form-label">
            Usuario
          </label>
          <input
            id="userName"
            type="text"
            className={`form-control ${errors.userName && 'is-invalid'}`}
            value={data.userName}
            onChange={onChangeHandler}
          />
          {errors.userName &&
            errors.userName.map((x, index) => (
              <div className="invalid-feedback" key={index}>
                {x}
              </div>
            ))}
        </div>

        {!isEditMode && (
          <div className="col-6">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              className={`form-control ${errors.password && 'is-invalid'}`}
              value={data.password}
              onChange={onChangeHandler}
            />
            {errors.password &&
              errors.password.map((x, index) => (
                <div className="invalid-feedback" key={index}>
                  {x}
                </div>
              ))}
          </div>
        )}

        {/*<label className="">Roles</label>*/}
        <fieldset>
          <legend>Roles</legend>
          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="roleIsAdmin"
                checked={data.roleIsAdmin}
                onChange={onChangeHandler}
              />
              <label className="form-check-label" htmlFor="roleIsAdmin">
                Administrador
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="roleIsManager"
                checked={data.roleIsManager}
                onChange={onChangeHandler}
              />
              <label className="form-check-label" htmlFor="roleIsManager">
                Gerente
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="roleIsEditor"
                checked={data.roleIsEditor}
                onChange={onChangeHandler}
              />
              <label className="form-check-label" htmlFor="roleIsEditor">
                Editor
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="roleIsViewer"
                checked={data.roleIsViewer}
                onChange={onChangeHandler}
              />
              <label className="form-check-label" htmlFor="roleIsViewer">
                Visitante
              </label>
            </div>
          </div>
        </fieldset>
      </div>
    </>
  );
}

export default UserAddOrUpdateForm;
