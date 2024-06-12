import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import translations from '../../../helpers/translations';
import { getById } from '../../../services/riskService';
import { entityPath } from '../RiskIndex';
import { dateToLocaleString } from '../../../helpers/date-helper';
import EntityDetailsCustom from '../../../components/contoso-university/entity/DetailsCustom/EntityDetailsCustom';

const t = translations.es;

function RiskDetails() {
  const { entityId } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await getById(entityId);
      setData(response.data);
      setIsLoading(false);
    }

    fetchData();
  }, [entityId]);

  return (
    <EntityDetailsCustom
      entityName="Riesgo"
      entityPath={entityPath}
      entityId={entityId}
      createdText={
        data.createdAt && data.createdBy ? `${dateToLocaleString(data.createdAt)} por ${data.createdBy.name}` : ''
      }
      updatedText={
        data.updatedAt && data.updatedBy ? `${dateToLocaleString(data.updatedAt)} por ${data.updatedBy.name}` : ''
      }
      isLoading={isLoading}
    >
      <div className="row mb-3">
        <div className="col">
          <div className="d-block">
            <strong className="d-block h5 mb-0">Nombre</strong>
            <span className="text-secondary">{data.name}</span>
          </div>
        </div>
        <div className="col">
          <div className="d-block">
            <strong className="d-block h5 mb-0">Código</strong>
            <span className="text-secondary">{data.code}</span>
          </div>
        </div>
        <div className="col">
          <div className="d-block">
            <strong className="d-block h5 mb-0">Categoría</strong>
            <span className="text-secondary">{data.category?.name}</span>
          </div>
        </div>
        <div className="col">
          <div className="d-block">
            <strong className="d-block h5 mb-0">Tipo</strong>
            <span className="text-secondary">{t.riskType[data.type]}</span>
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <div className="d-block">
            <strong className="d-block h5 mb-0">Dueño</strong>
            <span className="text-secondary">{data.owner?.name}</span>
          </div>
        </div>
        <div className="col">
          <div className="d-block">
            <strong className="d-block h5 mb-0">Fase</strong>
            <span className="text-secondary">{t.riskPhase[data.phase]}</span>
          </div>
        </div>
        <div className="col">
          <div className="d-block">
            <strong className="d-block h5 mb-0">Manejabilidad</strong>
            <span className="text-secondary">{t.riskManageability[data.manageability]}</span>
          </div>
        </div>
        <div className="col">
          <div className="d-block">
            <strong className="d-block h5 mb-0">Tratamiento</strong>
            <span className="text-secondary">{data.treatment?.name}</span>
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-3">
          <div className="d-block">
            <strong className="d-block h5 mb-0">Fecha inicial</strong>
            <span className="text-secondary">{data.dateFrom}</span>
          </div>
        </div>
        <div className="col-3">
          <div className="d-block">
            <strong className="d-block h5 mb-0">Fecha final</strong>
            <span className="text-secondary">{data.dateTo}</span>
          </div>
        </div>
        <div className="col-3">
          <div className="d-block">
            <strong className="d-block h5 mb-0">Estado</strong>
            <span className={`badge text-bg-${data.state ? 'primary' : 'secondary'}`}>
              {data.state ? 'Activo' : 'Inactivo'}
            </span>
          </div>
        </div>
      </div>
    </EntityDetailsCustom>
  );
}

export default RiskDetails;
