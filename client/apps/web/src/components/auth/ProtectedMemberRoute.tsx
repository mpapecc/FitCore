import { Navigate, Outlet, useLocation } from "react-router-dom";
import { session } from "@fit-core/shared";

export function ProtectedMemberRoute() {
  const location = useLocation();

  if (!session.isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (session.getRole() !== "Member") {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
