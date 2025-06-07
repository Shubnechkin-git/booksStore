import { Link } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="nav-link">
          Главная
        </Link>
        <Link to="/about" className="nav-link">
          О нас
        </Link>
        <Link to="/contacts" className="nav-link">
          Контакты
        </Link>
      </div>
    </nav>
  );
}
