import { createBrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import Form from "../pages/form";
import Landing from "../pages/landing";
import Login from "../pages/auth";
import ProtectedRoute from "../lib/protectedroute";

const Route = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/portfolio"} replace />,
  },
  {
    path: "/portfolio",
    element: <ProtectedRoute element={<Landing />} />,
  },
  {
    path: "/portfolio/:portfolio_id",
    element: <ProtectedRoute element={<Dashboard />} />,
  },
  {
    path: "/create",
    element: <ProtectedRoute element={<Form />} />,
  },
  {
    path: "/auth",
    element: <Login />,
  },
]);

export default Route;
