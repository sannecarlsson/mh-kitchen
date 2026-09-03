import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

function Header() {
  return (
    <header className="site-header">
      <Link to="/" className="header-logo">
        <h1>M&H Kitchen</h1>
      </Link>

      <Link to="/favoriter" className="favorites-link">
        <Heart fill="currentColor" />
        Favoriter
      </Link>
    </header>
  );
}

export default Header;