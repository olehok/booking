import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Hotels from "./pages/Hotels";
import { hotelsLoader } from "./loaders/loaders";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      errorElement: <h2>error</h2>,
      HydrateFallback: () => <div>Loading hotels...</div>,
      children: [
        { index: true, element: <Home /> },
        { path: "about", element: <About /> },
        {
          path: "hotels",
          element: <Hotels />,
          loader: hotelsLoader,
        },
        { path: "*", element: <h2>Not Found</h2> },
      ],
    },
  ],
  { basename: "/booking/" },
);

export default function App() {
  return <RouterProvider router={router} />;
}
