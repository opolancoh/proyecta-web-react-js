import { useState, useEffect } from "react";
import RiskTable from "./Table";

function Risk() {
  const [risks, setRisks] = useState([]);

  useEffect(() => {
    async function fetchRisks() {
      const response = await fetch("http://localhost:5260/api/risks");
      const risksFetched = await response.json();
      setRisks(risksFetched);
    }

    fetchRisks();
  }, []);

  return (
    <>
      <div className="row justify-content-between align-items-center">
        <div className="col-11">
          <div className="row">
            <h1>Riesgos</h1>
            <p>Gestión de riesgos</p>
          </div>
        </div>
        <div className="col-1">
          <button type="button" className="btn btn-primary">
            Nuevo
          </button>
        </div>
      </div>

      <RiskTable data={risks} />
    </>
  );
}

export default Risk;
