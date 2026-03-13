import { RouterProvider } from "react-router-dom";
import { useTransition } from "react-i18next";
import ThemeProvider from "./app/ThemeProvider";
import Router from "./app/Router";

export default function App() {
  const { ready } = useTransition();
  if (!ready) return null;

  return (
    <ThemeProvider>
      <RouterProvider router={Router} />
    </ThemeProvider>
  );
}