function RiskForm({ data, selectData, handleOnChange, errors }) {
  return (
    <div className="row g-3">
      <div className="col-md-6">
        <label htmlFor="name" className="form-label">
          Nombre
        </label>
        <input
          id="name"
          type="text"
          className={`form-control ${errors.name && 'is-invalid'}`}
          value={data.name}
          onChange={handleOnChange}
        />
        {errors.name &&
          errors.name.map((x, index) => (
            <div className="invalid-feedback" key={index}>
              {x}
            </div>
          ))}
      </div>

      <div className="col-md-6">
        <label htmlFor="code" className="form-label">
          Código
        </label>
        <input
          id="code"
          type="text"
          className={`form-control ${errors.code && 'is-invalid'}`}
          value={data.code}
          onChange={handleOnChange}
        />
        {errors.code &&
          errors.code.map((x, index) => (
            <div className="invalid-feedback" key={index}>
              {x}
            </div>
          ))}
      </div>

      <div className="col-md-4">
        <label htmlFor="category" className="form-label">
          Categoría
        </label>
        <select
          id="category"
          className={`form-select ${errors.category && 'is-invalid'}`}
          value={data.category}
          onChange={handleOnChange}
        >
          <option>-- Seleccione una opción --</option>
          {selectData.category.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        {errors.category &&
          errors.category.map((x, index) => (
            <div className="invalid-feedback" key={index}>
              {x}
            </div>
          ))}
      </div>

      <div className="col-md-4">
        <label htmlFor="type" className="form-label">
          Tipo
        </label>
        <select
          id="type"
          className={`form-select ${errors.type && 'is-invalid'}`}
          value={data.type}
          onChange={handleOnChange}
        >
          <option>-- Seleccione una opción --</option>
          {selectData.type.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        {errors.type &&
          errors.type.map((x, index) => (
            <div className="invalid-feedback" key={index}>
              {x}
            </div>
          ))}
      </div>

      <div className="col-md-4">
        <label htmlFor="owner" className="form-label">
          Dueño
        </label>
        <select
          id="owner"
          className={`form-select ${errors.owner && 'is-invalid'}`}
          value={data.owner}
          onChange={handleOnChange}
        >
          <option>-- Seleccione una opción --</option>
          {selectData.owner.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        {errors.owner &&
          errors.owner.map((x, index) => (
            <div className="invalid-feedback" key={index}>
              {x}
            </div>
          ))}
      </div>

      <div className="col-md-4">
        <label htmlFor="phase" className="form-label">
          Fase
        </label>
        <select
          id="phase"
          className={`form-select ${errors.phase && 'is-invalid'}`}
          value={data.phase}
          onChange={handleOnChange}
        >
          <option>-- Seleccione una opción --</option>
          {selectData.phase.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        {errors.phase &&
          errors.phase.map((x, index) => (
            <div className="invalid-feedback" key={index}>
              {x}
            </div>
          ))}
      </div>

      <div className="col-md-4">
        <label htmlFor="manageability" className="form-label">
          Manejabilidad
        </label>
        <select
          id="manageability"
          className={`form-select ${errors.manageability && 'is-invalid'}`}
          value={data.manageability}
          onChange={handleOnChange}
        >
          <option>-- Seleccione una opción --</option>
          {selectData.manageability.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        {errors.manageability &&
          errors.manageability.map((x, index) => (
            <div className="invalid-feedback" key={index}>
              {x}
            </div>
          ))}
      </div>

      <div className="col-md-4">
        <label htmlFor="treatment" className="form-label">
          Tratamiento
        </label>
        <select
          id="treatment"
          className={`form-select ${errors.treatment && 'is-invalid'}`}
          value={data.treatment}
          onChange={handleOnChange}
        >
          <option>-- Seleccione una opción --</option>
          {selectData.treatment.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        {errors.treatment &&
          errors.treatment.map((x, index) => (
            <div className="invalid-feedback" key={index}>
              {x}
            </div>
          ))}
      </div>

      <div className="col-md-6">
        <label htmlFor="dateFrom" className="form-label">
          Fecha inicial
        </label>
        <input
          id="dateFrom"
          type="date"
          className={`form-control ${errors.dateFrom && 'is-invalid'}`}
          value={data.dateFrom}
          onChange={handleOnChange}
        />
        {errors.dateFrom &&
          errors.dateFrom.map((x, index) => (
            <div className="invalid-feedback" key={index}>
              {x}
            </div>
          ))}
      </div>

      <div className="col-md-6">
        <label htmlFor="dateTo" className="form-label">
          Fecha Final
        </label>
        <input
          id="dateTo"
          type="date"
          className={`form-control ${errors.dateTo && 'is-invalid'}`}
          value={data.dateTo}
          onChange={handleOnChange}
        />
        {errors.dateTo &&
          errors.dateTo.map((x, index) => (
            <div className="invalid-feedback" key={index}>
              {x}
            </div>
          ))}
      </div>

      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="state"
          checked={data.state}
          onChange={handleOnChange}
        />
        <label className="form-check-label" htmlFor="state">
          Estado
        </label>
      </div>
    </div>
  );
}

export default RiskForm;
