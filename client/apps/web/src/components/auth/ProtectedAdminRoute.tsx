import { Navigate, Outlet } from "react-router-dom";
import { session } from "@fit-core/shared";

export function ProtectedAdminRoute() {
  if (!session.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (session.getRole() !== "Admin") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
