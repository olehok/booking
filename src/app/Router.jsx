import { createBrowserRouter, Navigate } from "react-router-dom";

import Layout from "../components/Layout";
import Home from "../pages/Home";
import Search from "../pages/Search";
import About from "../pages/About";
import Hotels from "../pages/Hotels";
import Favorites from "../pages/Favorites";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import PrivateRoute from "../components/PrivateRoute";
import { hotelsLoader, featuredHotelsLoader } from "../loaders/loaders";
import { Spin } from "antd";
import { useTranslation } from "react-i18next";

const ErrorPage = () => {
  const { t } = useTranslation();
  return <h2>{t("common.error")}</h2>;
};

const NotFoundPage = () => {
  const { t } = useTranslation();
  return <h2>{t("common.notFound")}</h2>;
};

const Router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Navigate to="/en" replace />,
    },
    {
      path: "/:lng",
      element: <Layout />,
      errorElement: <ErrorPage />,
      HydrateFallback: () => <Spin fullscreen size="large" />,
      children: [
        {
          index: true,
          element: <Home />,
          loader: featuredHotelsLoader,
        },
        {
          path: "search",
          element: <Search />,
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
          element: <NotFoundPage />,
        },
      ],
    },
  ],
  { basename: "/booking/" },
);

export default Router;
