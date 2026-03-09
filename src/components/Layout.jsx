import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import useAutoHideHeader from "../hooks/useAutoHideHeader";

export default function Layout() {
  const hidden = useAutoHideHeader();

  return (
    <div className="layout">
      <div className={`header ${hidden ? "header--hidden" : ""} container`}>
        <Header />
      </div>
      <main className="container">
        <Outlet />
      </main>
      <div className="footer container">
        <Footer />
      </div>
    </div>
  );
}
