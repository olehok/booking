import { Outlet } from "react-router-dom";
import useSyncLanguageFromParams from "../../hooks/useSyncLanguageFromParams";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function Layout() {
  useSyncLanguageFromParams();

  return (
    <div className="layout">
      <Header />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
