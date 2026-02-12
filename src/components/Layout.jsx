import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  const [hidden, setHidden] = useState(false);
  const lastScroll = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      if (current > lastScroll.current && current > 50) {
        // scrolling down
        setHidden(true);
      } else {
        // scrolling up
        setHidden(false);
      }

      lastScroll.current = current;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // show header if mouse near top
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (hidden && e.clientY < 40) {
        setHidden(false);
      } else if (!hidden && e.clientY > 80 && window.scrollY > 80) {
        setHidden(true);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [hidden]);

  return (
    <>
      <div className={`header ${hidden ? "header--hidden" : ""}`}>
        <Header />
      </div>
      <div className="container">
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
