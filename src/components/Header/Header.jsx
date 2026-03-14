import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import useWithLng from "../../hooks/useWithLng";
import useAutoHideHeader from "../../hooks/useAutoHideHeader";
import { logout } from "../../store/slices/authSlice";
import { toggleTheme } from "../../store/slices/themeSlice";
import LanguageToggle from "../LanguageToggle/LanguageToggle";
import { Switch, Badge } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import styles from "./Header.module.scss";

export default function Header() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { withLng } = useWithLng();
  const isHidden = useAutoHideHeader();

  const user = useSelector((state) => state.auth.user);
  const themeMode = useSelector((state) => state.theme.mode);
  const favoriteCount = useSelector(
    (state) => state.favorites.favorites.length,
  );

  const isActiveClass = ({ isActive }) => (isActive ? "active" : "");
  return (
    <header
      className={`${styles.header} ${isHidden ? styles.headerHidden : ""}`}
    >
      <div className={`${styles.headerWrapper} container`}>
        <h1 className={styles.headerLogo}>
          <NavLink to={withLng("")} end>
            {t("app.name")}
          </NavLink>
        </h1>

        <nav className={styles.headerNav}>
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
                className={styles.headerFavoriteBadge}
              >
                <HeartOutlined className={styles.headerFavoriteIcon} />
              </Badge>
            </NavLink>
          </h3>
          {user ? (
            <>
              <h3>
                <NavLink className={isActiveClass} to={withLng("/profile")}>
                  {t("nav.profile")}
                </NavLink>
              </h3>
              <h3>
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
