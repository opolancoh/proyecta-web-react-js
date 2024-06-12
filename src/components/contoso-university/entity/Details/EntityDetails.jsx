import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { dateToLocaleString } from '../../../../helpers/date-helper';
import Loading from '../../Loading';

const EntityDetails = ({ entityName, entityPath, getById, fields }) => {
  const { entityId } = useParams();
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

  if (isLoading) return <Loading />;

  return (
    <>
      <h2>Detalle</h2>
      <h4>{entityName}</h4>
      <div className="d-flex gap-2 mb-3">
        <Link to={`/${entityPath}/${entityId}/edit`}>Editar</Link> |{' '}
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
        <div className="col-1">
          <dt>Creado:</dt>
        </div>
        <div className="col-11">
          <dd>
            {dateToLocaleString(data.createdAt)} por {data.createdBy?.name || 'No definido'}
          </dd>
        </div>
        <div className="col-1">
          <dt>Modificado:</dt>
        </div>
        <div className="col-11">
          <dd>
            {dateToLocaleString(data.updatedAt)} por {data.updatedBy?.name || 'No definido'}
          </dd>
        </div>
      </dl>
    </>
  );
};

export default EntityDetails;
