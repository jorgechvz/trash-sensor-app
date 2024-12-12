import { useAuth } from "@/components/login/hooks/use-auth";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();

  // Verifica si el usuario está autenticado
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};
