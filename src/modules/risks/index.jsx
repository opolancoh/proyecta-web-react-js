import { useState, useEffect } from "react";
import RiskTable from "./Table";

function Risk() {
  const [risks, setRisks] = useState([]);

  useEffect(() => {
    async function fetchRisks() {
      const response = await fetch("http://localhost:3030/risks");
      const risksFetched = await response.json();
      setRisks(risksFetched);
    }

    fetchRisks();
  }, []);

  return (
    <>
      <div class="row justify-content-between align-items-center">
        <div class="col-11">
          <div class="row">
            <h1>Riesgos</h1>
            <p>Gestión de riesgos</p>
          </div>
        </div>
        <div class="col-1">
          <button type="button" class="btn btn-primary">
            Nuevo
          </button>
        </div>
      </div>

      <RiskTable data={risks} />
    </>
  );
}

export default Risk;
