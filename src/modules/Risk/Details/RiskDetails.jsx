import { useEffect, useState, useCallback } from 'react';
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

  const fetchData = useCallback(async () => {
    try {
      const response = await getById(entityId);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [entityId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const renderDataField = (label, value) => (
    <div className="col">
      <div className="d-block">
        <strong className="d-block h5 mb-0">{label}</strong>
        <span className="text-secondary">{value}</span>
      </div>
    </div>
  );

  return (
    <EntityDetailsCustom
      entityName="Riesgo"
      entityPath={entityPath}
      entityId={entityId}
      createdText={
        data.createdAt && data.createdBy
          ? `${dateToLocaleString(data.createdAt)} por ${data.createdBy.name}`
          : ''
      }
      updatedText={
        data.updatedAt && data.updatedBy
          ? `${dateToLocaleString(data.updatedAt)} por ${data.updatedBy.name}`
          : ''
      }
      isLoading={isLoading}
    >
      <div className="row mb-3">
        {renderDataField('Nombre', data.name)}
        {renderDataField('Código', data.code)}
        {renderDataField('Categoría', data.category?.name)}
        {renderDataField('Tipo', t.riskType[data.type])}
      </div>
      <div className="row mb-3">
        {renderDataField('Dueño', data.owner?.name)}
        {renderDataField('Fase', t.riskPhase[data.phase])}
        {renderDataField('Manejabilidad', t.riskManageability[data.manageability])}
        {renderDataField('Tratamiento', data.treatment?.name)}
      </div>
      <div className="row mb-3">
        {renderDataField('Fecha inicial', data.dateFrom)}
        {renderDataField('Fecha final', data.dateTo)}
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
