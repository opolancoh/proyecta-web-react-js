import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { dateToLocaleString } from '../../../../helpers/date-helper';
import Loading from '../../Loading';

const EntityRemove = ({ entityName, entityPath, getById, remove, fields }) => {
  const { entityId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    async function fetchData() {
      const response = await getById(entityId);

      setData(response.data);
      setIsLoading(false);
    }

    fetchData();
  }, [entityId, getById]);

  const handleSubmit = async () => {
    // Send request
    await remove(entityId);

    navigate(`/${entityPath}`, {
      state: {
        notification: {
          action: 'success',
          message: `Elemento eliminado correctamente.`,
        },
      },
    });
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <h2>Eliminar</h2>
      <h4>{entityName}</h4>
      <h5>Está seguro de eliminar este elemento?</h5>
      <div className="d-flex gap-2 mb-3">
        <Link to={`/${entityPath}`}>Volver a la lista</Link>
      </div>
      <hr />

      <dl className="row">
        {fields.map((field, index) => (
          <React.Fragment key={index}>
            <div className="col-2">
              <dt>{field.label}:</dt>
            </div>
            <div className="col-10">
              <dd>{field.render ? field.render(data[field.key]) : data[field.key]}</dd>
            </div>
          </React.Fragment>
        ))}
      </dl>

      <dl className="row">
        <div className="col-2">
          <dt>Creado:</dt>
        </div>
        <div className="col-10">
          <dd>
            {dateToLocaleString(data.createdAt)} por {data.createdBy?.name || 'No definido'}
          </dd>
        </div>
        <div className="col-2">
          <dt>Modificado:</dt>
        </div>
        <div className="col-10">
          <dd>
            {dateToLocaleString(data.updatedAt)} por {data.updatedBy?.name || 'No definido'}
          </dd>
        </div>
      </dl>

      <div className="row">
        <div className="col-md-2">
          <button className="btn btn-primary" onClick={handleSubmit}>
            Eliminar
          </button>
        </div>
      </div>
    </>
  );
};

export default EntityRemove;
