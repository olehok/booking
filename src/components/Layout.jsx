import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
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
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">
        <div className="container">
          <h3>Contacts</h3>
          <p>© 2025 Oleh Kovalenko</p>
        </div>
      </footer>
    </div>
  );
}
