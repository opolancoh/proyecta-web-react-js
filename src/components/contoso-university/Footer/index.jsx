import './index.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="border-top footer text-muted">
      <div className="container">
        &copy; 2024 - <Link to="/">Proyecta</Link>
        {process.env.NODE_ENV !== 'production' && (` - v${process.env.REACT_APP_VERSION}`)}
      </div>
    </footer>
  );
}

export default Footer;
