import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import useWithLng from "../../hooks/useWithLng";
import useAutoHideHeader from "../../hooks/useAutoHideHeader";
import { logout } from "../../store/slices/authSlice";
import { toggleTheme } from "../../store/slices/themeSlice";
import LanguageToggle from "../LanguageToggle/LanguageToggle";
import { Switch, Badge, Button } from "antd";
import { HeartOutlined, MenuOutlined, CloseOutlined } from "@ant-design/icons";
import styles from "./Header.module.scss";

export default function Header() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { withLng } = useWithLng();
  const isHidden = useAutoHideHeader();

  const user = useSelector((state) => state.auth.user);
  const themeMode = useSelector((state) => state.theme.mode);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const favoriteCount = useSelector(
    (state) => state.favorites.favorites.length,
  );

  const isActiveClass = ({ isActive }) => (isActive ? "active" : "");
  const noActiveClass = () => "";
  const toggleMenu = () => setIsMenuOpen((value) => !value);
  const closeMenu = () => setIsMenuOpen(false);
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

        <Button
          type="text"
          className={styles.headerMenuButton}
          icon={isMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
          aria-label="Menu"
          aria-expanded={isMenuOpen}
          aria-controls="header-navigation"
          onClick={toggleMenu}
        />

        <nav
          id="header-navigation"
          className={`${styles.headerNav} ${isMenuOpen ? styles.headerNavOpen : ""}`}
        >
          <h3>
            <NavLink
              className={isActiveClass}
              to={withLng("/search")}
              onClick={closeMenu}
            >
              {t("nav.stay")}
            </NavLink>
          </h3>
          <h3>
            <NavLink
              className={isActiveClass}
              to={withLng("/about")}
              onClick={closeMenu}
            >
              {t("nav.aboutUs")}
            </NavLink>
          </h3>
          <h3>
            <NavLink
              className={isActiveClass}
              to={withLng("/hotels")}
              onClick={closeMenu}
            >
              {t("nav.hotels")}
            </NavLink>
          </h3>
          <h3>
            <NavLink
              className={isActiveClass}
              to={withLng("/favorites")}
              onClick={closeMenu}
            >
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
                <NavLink
                  className={isActiveClass}
                  to={withLng("/profile")}
                  onClick={closeMenu}
                >
                  {t("nav.profile")}
                </NavLink>
              </h3>
              <h3>
                <NavLink
                  className={noActiveClass}
                  to={withLng("")}
                  onClick={() => {
                    dispatch(logout());
                    closeMenu();
                  }}
                >
                  {t("nav.logout")}
                </NavLink>
              </h3>
            </>
          ) : (
            <h3>
              <NavLink
                className={isActiveClass}
                to={withLng("/login")}
                onClick={closeMenu}
              >
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
