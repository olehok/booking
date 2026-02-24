import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { toggleTheme } from "../store/slices/themeSlice";
import { Switch, Badge, Typography } from "antd";
import { HeartOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

export default function Header() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const themeMode = useSelector((state) => state.theme.mode);

  const favoriteCount = useSelector((state) => state.favorites.favorites.length);

  return (
    <header>
      <div className="header-wrapper">
        <NavLink to="/">
          <Title 
            level={1}
            strong
            italic
            style={{ 
              color: "var(--primary-color)",
              // color: "transparent",
              WebkitTextStroke: "1px var(--primary-color)",
              margin: 0
            }}
          >
            Booking
          </Title>
        </NavLink>
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
            <NavLink to="/favorites">
              Favorites 
              <Badge count={favoriteCount} color="primary">
                <HeartOutlined
                  // key="fav"
                  style={{
                    marginLeft: 8,
                    fontSize: "1.25rem",
                    color: "var(--primary-color)",
                  }}
                />
              </Badge>
            </NavLink>
          </h3>
          {/* <h3>
            <NavLink to="/profile">Profile</NavLink>
          </h3> */}
          {/* <h3>
            <NavLink to="/login">Login</NavLink>
          </h3> */}
          {user ? (
            <>
              <h3>
                <NavLink to="/profile">Profile</NavLink>
              </h3>
              <h3>
                {/* <Button
                  type="link"
                  color="primary"
                  variant="outlined"
                  onClick={() => dispatch(logout())}
                >
                  Logout
                </Button> */}
                <NavLink to="/" onClick={() => dispatch(logout())}>
                  Logout
                </NavLink>
              </h3>
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
