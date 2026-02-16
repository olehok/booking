import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Hotels from "./pages/Hotels";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import { hotelsLoader } from "./loaders/loaders";
import { Spin } from "antd";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      errorElement: <h2>error</h2>,
      HydrateFallback: () => <Spin fullscreen size="large" />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "search",
          element: <Home />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "hotels",
          element: <Hotels />,
          loader: hotelsLoader,
          shouldRevalidate: ({ currentUrl, nextUrl, actionType }) => {
            if (actionType === "POP") {
              return false;
            }
            return currentUrl.search !== nextUrl.search;
          },
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "*",
          element: <h2>Not Found</h2>,
        },
      ],
    },
  ],
  { basename: "/booking/" },
);

export default function App() {
  return <RouterProvider router={router} />;
}
