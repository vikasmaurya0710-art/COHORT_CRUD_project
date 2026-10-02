import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import AuthProtect from "../protected/AuthProtect";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MainLayout from "../layout/MainLayout";
import Products from "../pages/products";
import Create from "../pages/Create";
import ProductDetail from "../components/ProductDetail";
import GetMe from "../pages/gETmE.JSX";

const AppRoutes = () => {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <AuthProtect />,
      children: [
        {
          path: "",
          element: <AuthLayout />,
          children: [
            {
              path: "",
              element: <Login />,
            },
            {
              path: "register",
              element: <Register />,
            },
          ],
        },
      ],
    },
    {
      path: "/dashboard",
      element: <MainLayout />,
      children: [
        {
          path: "",
          element: <Products />,
        },
        {
          path: "create",
          element: <Create />,
        },

        {
          path: "getMe",
          element: <GetMe />,
        },
      ],
    },
    {
      path: "single/:id",
      element: <ProductDetail />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
