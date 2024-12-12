import Home from "@/pages/home/page";
import Login from "@/pages/login/page";
import Register from "@/pages/register/page";
import { Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./private-route";

export const AppRouter = () => {
  return (
    <Routes>
      {/* Redirige a /login si la raíz es accedida */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Rutas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rutas protegidas */}
      <Route element={<PrivateRoute />}>
        <Route path="/app" element={<Home />} />
      </Route>
    </Routes>
  );
};
