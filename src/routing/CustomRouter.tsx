import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { customRoutes } from "./routes";
import Error404 from "@src/pages/Error404/Error404";
import Layout from "@src/components/Layout/Layout";
import ProtectedRoute from "./ProtectedRoute";

export default function useCustomRouter() {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
        errorElement={<Error404 />}
      >
        {customRoutes}
        <Route path="*" element={<Error404 />} />
      </Route>
    )
  );

  return routes;
}
