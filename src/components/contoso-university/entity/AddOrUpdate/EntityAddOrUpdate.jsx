import { Link } from 'react-router-dom';
import Loading from '../../Loading';

function EntityAddOrUpdate({ entityName, entityPath, isEditMode, isLoading, submitHandler, children }) {
  return (
    <>
      <h2>{isEditMode ? 'Editar' : 'Agregar'}</h2>
      <h4>{entityName}</h4>
      <div className="d-flex gap-2 mb-3">
        <Link to={`/${entityPath}`}>Volver a la lista</Link>
      </div>
      <hr />

      {isLoading ? (
        <Loading />
      ) : (
        <>
          {children}
          <div className="row mt-4">
            <div className="col-md-2">
              <button className="btn btn-primary" onClick={submitHandler}>
                Guardar
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default EntityAddOrUpdate;
