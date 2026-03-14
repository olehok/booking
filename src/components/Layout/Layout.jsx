import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import useAutoHideHeader from "../../hooks/useAutoHideHeader";

export default function Layout() {
  const { lng } = useParams();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (lng && i18n.language !== lng) {
      i18n.changeLanguage(lng);
    }
  }, [lng, i18n]);

  const hidden = useAutoHideHeader();

  return (
    <div className="layout">
      <div className={`header ${hidden ? "header--hidden" : ""} container`}>
        <Header />
      </div>
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
