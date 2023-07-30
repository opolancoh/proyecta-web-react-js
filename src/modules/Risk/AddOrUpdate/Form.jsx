function RiskForm({ data, selectData, handleOnChange, error }) {
  return (
    <div className="row g-3">
      <div className="col-md-6">
        <label htmlFor="name" className="form-label">
          Nombre
        </label>
        <input
          id="name"
          type="text"
          className={`form-control ${error.name && 'is-invalid'}`}
          value={data.name}
          onChange={handleOnChange}
        />
        {error.name && <div className="invalid-feedback">{error.name}</div>}
      </div>
      <div className="col-md-6">
        <label htmlFor="code" className="form-label">
          Código
        </label>
        <input
          id="code"
          type="text"
          className={`form-control ${error.code && 'is-invalid'}`}
          value={data.code}
          onChange={handleOnChange}
        />
        {error.code && <div className="invalid-feedback">{error.code}</div>}
      </div>
      <div className="col-md-4">
        <label htmlFor="category" className="form-label">
          Categoría
        </label>
        <select
          id="category"
          className={`form-select ${error.category && 'is-invalid'}`}
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
        {error.category && (
          <div className="invalid-feedback">{error.category}</div>
        )}
      </div>
      <div className="col-md-4">
        <label htmlFor="type" className="form-label">
          Tipo
        </label>
        <select
          id="type"
          className={`form-select ${error.type && 'is-invalid'}`}
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
        {error.type && <div className="invalid-feedback">{error.type}</div>}
      </div>
      <div className="col-md-4">
        <label htmlFor="owner" className="form-label">
          Dueño
        </label>
        <select
          id="owner"
          className={`form-select ${error.owner && 'is-invalid'}`}
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
        {error.owner && <div className="invalid-feedback">{error.owner}</div>}
      </div>
      <div className="col-md-4">
        <label htmlFor="phase" className="form-label">
          Fase
        </label>
        <select
          id="phase"
          className={`form-select ${error.phase && 'is-invalid'}`}
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
        {error.owner && <div className="invalid-feedback">{error.owner}</div>}
      </div>
      <div className="col-md-4">
        <label htmlFor="manageability" className="form-label">
          Manejabilidad
        </label>
        <select
          id="manageability"
          className={`form-select ${error.manageability && 'is-invalid'}`}
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
        {error.manageability && (
          <div className="invalid-feedback">{error.manageability}</div>
        )}
      </div>
      <div className="col-md-4">
        <label htmlFor="treatment" className="form-label">
          Tratamiento
        </label>
        <select
          id="treatment"
          className={`form-select ${error.treatment && 'is-invalid'}`}
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
        {error.treatment && (
          <div className="invalid-feedback">{error.treatment}</div>
        )}
      </div>
      <div className="col-md-6">
        <label htmlFor="dateFrom" className="form-label">
          Fecha inicial
        </label>
        <input
          id="dateFrom"
          type="date"
          className={`form-control ${error.dateFrom && 'is-invalid'}`}
          value={data.dateFrom}
          onChange={handleOnChange}
        />
        {error.dateFrom && (
          <div className="invalid-feedback">{error.dateFrom}</div>
        )}
      </div>
      <div className="col-md-6">
        <label htmlFor="dateTo" className="form-label">
          Fecha Final
        </label>
        <input
          id="dateTo"
          type="date"
          className={`form-control ${error.dateTo && 'is-invalid'}`}
          value={data.dateTo}
          onChange={handleOnChange}
        />
        {error.dateTo && <div className="invalid-feedback">{error.dateTo}</div>}
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
