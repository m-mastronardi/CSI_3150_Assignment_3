import { Link } from "react-router-dom";

function Navbar({ cartCount, onToggleCart }) {
  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Website Logo */}
        <Link to="/" className="logo">
          VINYL<span>VAULT</span>
        </Link>

        {/* Navigation Links */}
        <nav className="nav-links">
          <Link to="/">Browse Records</Link>
        </nav>

        {/* Shopping Cart Button */}
        <button type="button" className="cart-button" onClick={onToggleCart}>
          <span>Cart</span>
          <span className="cart-count">{cartCount}</span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;
