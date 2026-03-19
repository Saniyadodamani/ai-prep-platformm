import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  // if not logged in → go login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // if logged in → show page
  return children;
}

export default ProtectedRoute;
