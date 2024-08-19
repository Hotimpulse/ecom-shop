/* eslint-disable react-refresh/only-export-components */
import { Route } from "react-router";
import { Suspense, lazy } from "react";
import Spinner from "@src/ui/Spinner/Spinner";

const LazyHome = lazy(() => import("@src/pages/Home/Home"));
const LazyCart = lazy(() => import("@src/pages/Cart/Cart"));
const LazyProduct = lazy(() => import("@src/pages/Product/Product"));
const LazyLogin = lazy(() => import("@src/pages/Login/Login"));

export const customRoutes: JSX.Element[] = [
  <Route
    key={"0"}
    path="/"
    element={
      <Suspense fallback={<Spinner />}>
        <LazyHome />
      </Suspense>
    }
  />,
  <Route
    key={"1"}
    path="/product/:id"
    element={
      <Suspense fallback={<Spinner />}>
        <LazyProduct />
      </Suspense>
    }
  />,
  <Route
    key={"2"}
    path="/cart"
    element={
      <Suspense fallback={<Spinner />}>
        <LazyCart />
      </Suspense>
    }
  />,
  <Route
    key={"3"}
    path="/login"
    element={
      <Suspense fallback={<Spinner />}>
        <LazyLogin />
      </Suspense>
    }
  />,
];
