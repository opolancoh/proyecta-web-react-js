import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../Loading';

const EntityDetailsCustom = ({ entityName, entityPath, entityId, createdText, updatedText, isLoading, children }) => {
  return (
    <>
      <h2>Detalle</h2>
      <h4>{entityName}</h4>
      <div className="d-flex gap-2 mb-3">
        <Link to={`/${entityPath}/${entityId}/edit`}>Editar</Link> |{' '}
        <Link to={`/${entityPath}`}>Volver a la lista</Link>
      </div>
      <hr />

      {isLoading ? (
        <Loading />
      ) : (
        <>
          {children}
          <br />
          <dl className="row">
            <div className="col-1">
              <dt>Creado:</dt>
            </div>
            <div className="col-11">
              <dd>{createdText}</dd>
            </div>
            <div className="col-1">
              <dt>Modificado:</dt>
            </div>
            <div className="col-11">
              <dd>{updatedText}</dd>
            </div>
          </dl>
        </>
      )}
    </>
  );
};

export default EntityDetailsCustom;
