import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { toggleTheme } from "../store/slices/themeSlice";
import { Button, Switch } from "antd";

export default function Header() {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const themeMode = useSelector((state) => state.theme.mode);

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
          {/* <h3>
            <NavLink to="/profile">Profile</NavLink>
          </h3> */}
          {/* <h3>
            <NavLink to="/login">Login</NavLink>
          </h3> */}
          {isAuthenticated ? (
            <>
              <h3>
                <NavLink to="/profile">Profile</NavLink>
              </h3>{" "}
              <Button
                // type="link"
                color="primary"
                variant="outlined"
                onClick={() => dispatch(logout())}
              >
                Logout
              </Button>
            </>
          ) : (
            <h3>
              <NavLink to="/login">Login</NavLink>
            </h3>
          )}
          <Switch
            checked={themeMode === "dark"}
            onChange={() => dispatch(toggleTheme())}
          />
        </nav>
      </div>
    </header>
  );
}
