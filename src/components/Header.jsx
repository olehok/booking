import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { toggleTheme } from "../store/slices/themeSlice";
import LanguageToggle from "./LanguageToggle";
import { Switch, Badge, Typography } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import useWithLng from "../hooks/useWithLng";

const { Title } = Typography;

export default function Header() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { withLng } = useWithLng();

  const user = useSelector((state) => state.auth.user);
  const themeMode = useSelector((state) => state.theme.mode);
  const favoriteCount = useSelector(
    (state) => state.favorites.favorites.length,
  );

  const isActiveClass = ({ isActive }) => (isActive ? "active" : "");
  return (
    <header>
      <div className="header-wrapper">
        <NavLink to={withLng("")}>
          <Title
            level={1}
            strong
            italic
            style={{
              color: "var(--primary-color)",
              WebkitTextStroke: "1px var(--primary-color)",
              margin: 0,
            }}
          >
            {t("app.name")}
          </Title>
        </NavLink>
        <nav className="header-nav">
          <h3>
            <NavLink className={isActiveClass} to={withLng("/search")}>
              {t("nav.stay")}
            </NavLink>
          </h3>
          <h3>
            <NavLink className={isActiveClass} to={withLng("/about")}>
              {t("nav.aboutUs")}
            </NavLink>
          </h3>
          <h3>
            <NavLink className={isActiveClass} to={withLng("/hotels")}>
              {t("nav.hotels")}
            </NavLink>
          </h3>
          <h3>
            <NavLink className={isActiveClass} to={withLng("/favorites")}>
              {t("nav.favorites")}
              <Badge
                count={favoriteCount}
                style={{ background: "var(--primary-color)" }}
              >
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
                <NavLink className={isActiveClass} to={withLng("/profile")}>
                  {t("nav.profile")}
                </NavLink>
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
                <NavLink
                  className={isActiveClass}
                  to={withLng("")}
                  onClick={() => dispatch(logout())}
                >
                  {t("nav.logout")}
                </NavLink>
              </h3>
            </>
          ) : (
            <h3>
              <NavLink className={isActiveClass} to={withLng("/login")}>
                {t("nav.login")}
              </NavLink>
            </h3>
          )}
          <div>
            <LanguageToggle />
          </div>
          <Switch
            checked={themeMode === "dark"}
            onChange={() => dispatch(toggleTheme())}
          />
        </nav>
      </div>
    </header>
  );
}
