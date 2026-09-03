import { Link } from "react-router-dom";
import { Heart, Pencil } from "lucide-react";

function Header() {
  return (
    <header className="site-header">
      <Link to="/" className="header-logo">
        <h1>M&H Kitchen</h1>
      </Link>

      <div className="header-links">
        <Link to="/favoriter" className="favorites-link">
          <Heart fill="currentColor" />
          Favoriter
        </Link>

        <Link to="/lagg-till-recept" className="add-recipe-link">
          <Pencil />
          Lägg till recept
        </Link>
      </div>
    </header>
  );
}

export default Header;