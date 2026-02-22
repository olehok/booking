import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Hotels from "./pages/Hotels";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import { hotelsLoader } from "./loaders/loaders";
import { Spin, ConfigProvider, theme as antdTheme } from "antd";

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
          path: "favorites",
          element: <Favorites />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "profile",
          element: (
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          ),
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
  const mode = useSelector((state) => state.theme.mode);
  const isDarkMode = mode === "dark";

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode
          ? antdTheme.darkAlgorithm
          : antdTheme.defaultAlgorithm,
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}
