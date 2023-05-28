function About() {
  return (
    <>
      <h1>Acerca de</h1>
      <p>Información general de la aplicación.</p>
      <br />

      <div className="row">
        <h3>Environment Variables:</h3>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <b>VERSION:</b> {process.env.REACT_APP_VERSION}
          </li>
          <li className="list-group-item">
            <b>API_URL:</b> {process.env.REACT_APP_API_URL}
          </li>
        </ul>
      </div>
    </>
  );
}

export default About;
