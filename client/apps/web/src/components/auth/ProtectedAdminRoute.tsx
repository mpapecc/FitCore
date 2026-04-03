import { Navigate, Outlet, useLocation } from "react-router-dom";
import { session } from "@fit-core/shared";

export function ProtectedAdminRoute() {
  const location = useLocation();

  if (!session.isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (session.getRole() !== "Admin") {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
