// components/routes/RoleRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const RoleRoute = ({ allowedRoles }) => {
  const { user } = useAuth();

  // agar login hi nahi hai
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // agar role allowed nahi
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default RoleRoute;
