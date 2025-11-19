import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }: { element: React.ReactNode }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  return element;
};

export default ProtectedRoute;
