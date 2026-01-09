import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <h1>
          <NavLink to="/">Booking</NavLink>
        </h1>
        <nav className="nav">
          <h3>
            <NavLink to="/about">About</NavLink>
          </h3>
          <h3>
            <NavLink to="/hotels">Hotels</NavLink>
          </h3>
          {/* <ThemeToggle /> */}
        </nav>
      </div>
    </header>
  );
}
