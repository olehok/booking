import { RouterProvider } from "react-router-dom";

import ThemeProvider from "./app/ThemeProvider";
import Router from "./app/Router";

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={Router} />
    </ThemeProvider>
  );
}