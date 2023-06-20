import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RiskTable from "./Table";

const entityPath = "auth/users";

function UserIndex() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/${entityPath}`
      );
      const json = await response.json();
      setData(json.data);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  if (isLoading) return null;

  return (
    <>
      <h1>Usuarios</h1>
      <p>
        <Link to="/">Crear Nuevo</Link>
      </p>

      <RiskTable data={(entityPath, data)} />
    </>
  );
}

export default UserIndex;
