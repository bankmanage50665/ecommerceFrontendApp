import React, { lazy, useEffect } from "react";
import { Suspense } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./App.css";

import { CartContextProvider } from "./context/CartContext";
import RootLayout from "./shared/Navigation/RootLayout";
import ProductItem, {
  loader as productDetailLoader,
} from "./components/Product/ProductItem";
import EditProducts from "./components/Product/EditProducts";
import { tokenLoader, checkAuthLoader } from "./middleware/getToken";
import UserOrderDetailsForAdmin, {
  loader as userOrderDetailsForAdminLoader,
} from "./components/Admin/UserOrderDetailsForAdmin";
import AdminLayout from "./components/Admin/shared/Navigation/AdminLayout";
import Error from "./shared/component/Error";
import { action as logoutAction } from "./middleware/logout";
import { loginWithOtpAction } from "./components/LoginWithOtp";
import { SignupWithOtpAction } from "./components/SignupWithOtp";
import Loading from "./shared/component/Loading";
import { initFacebookPixel } from "./utils/FacebookPixel";

const SignupWithOtp = React.lazy(() => import("./components/SignupWithOtp"));
const LoginWithOtp = React.lazy(() => import("./components/LoginWithOtp"));
const Cart = React.lazy(() => import("./components/User/Cart"));
const AddProducts = React.lazy(() =>
  import("./components/Product/AddProducts")
);
const Products = lazy(() => import("./components/Product/Products"));
const UserOrders = lazy(() => import("./components/User/UserOrder"));
const GetAllUsers = lazy(() => import("./components/Admin/GetAllUsers"));
const Checkout = lazy(() => import("./components/User/Checkout"));

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    errorElement: <Error />,
    id: "root",
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: <Navigate to="products" replace={true} />,
      },
      {
        path: "signup",
        element: (
          <Suspense fallback={<Loading />}>
            <SignupWithOtp />
          </Suspense>
        ),
        action: SignupWithOtpAction,
      },

      {
        path: "login",
        element: (
          <Suspense fallback={<Loading />}>
            <LoginWithOtp />
          </Suspense>
        ),
        action: loginWithOtpAction,
      },

      {
        path: "products",

        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Loading />}>
                <Products />
              </Suspense>
            ),
            loader: () =>
              import("./components/Product/Products").then((module) =>
                module.loader()
              ),
          },
          {
            path: "cart",
            element: (
              <Suspense fallback={<Loading />}>
                <Cart />
              </Suspense>
            ),
          },

          {
            path: ":id",

            children: [
              {
                index: true,
                element: <ProductItem />,
                loader: productDetailLoader,
              },
              {
                path: "edit",
                element: <EditProducts />,
                loader: productDetailLoader,
              },
            ],
          },
        ],
      },
      {
        path: "checkout",
        element: (
          <Suspense fallback={<Loading />}>
            <Checkout />
          </Suspense>
        ),
        loader: checkAuthLoader,
      },

      {
        path: "orders",
        element: (
          <Suspense fallback={<Loading />}>
            <UserOrders />
          </Suspense>
        ),
        loader: checkAuthLoader,
      },

      {
        path: "admin",
        element: <AdminLayout />,
        loader: checkAuthLoader,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Loading />}>
                <GetAllUsers />
              </Suspense>
            ),
            loader: () =>
              import("./components/Admin/GetAllUsers").then((module) =>
                module.loader()
              ),
          },
          {
            path: "add",
            element: (
              <Suspense fallback={<Loading />}>
                <AddProducts />
              </Suspense>
            ),
          },
          {
            path: ":id",
            children: [
              {
                index: true,
                element: <UserOrderDetailsForAdmin />,
                loader: userOrderDetailsForAdminLoader,
              },
            ],
          },
        ],
      },
      { path: "logout", action: logoutAction },
    ],
  },
]);

function App() {
  useEffect(() => {
    initFacebookPixel();
  }, []);

  return (
    <>
      <CartContextProvider>
        <RouterProvider router={router} />
      </CartContextProvider>
    </>
  );
}

export default App;
