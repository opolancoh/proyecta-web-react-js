import "./index.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-top footer text-muted">
      <div className="container">
        &copy; 2023 - Proyecta - <Link to="/">Privacidad</Link>
      </div>
    </footer>
  );
}

export default Footer;
