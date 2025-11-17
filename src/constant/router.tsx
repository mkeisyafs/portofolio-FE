import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import Form from "../pages/form";
import Landing from "../pages/landing";

const Route = createBrowserRouter([
  {
    path: "/",
    element: <Landing/>
  },
  {
    path: "/portfolio/:portfolio_id",
    element: <Dashboard/>
  },
  {
    path: "/p",
    element: <Form />,
  },
]);

export default Route;
