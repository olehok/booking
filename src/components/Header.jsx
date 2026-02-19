import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <div className="header-wrapper">
        <h1>
          <NavLink to="/">Booking</NavLink>
        </h1>
        <nav className="header-nav">
          <h3>
            <NavLink to="/search">Stay</NavLink>
          </h3>
          <h3>
            <NavLink to="/about">About</NavLink>
          </h3>
          <h3>
            <NavLink to="/hotels">Hotels</NavLink>
          </h3>

          <h3>
            <NavLink to="/favorites">Favorites</NavLink>
          </h3>
          <h3>
            <NavLink to="/login">Login</NavLink>
          </h3>
        </nav>
      </div>
    </header>
  );
}