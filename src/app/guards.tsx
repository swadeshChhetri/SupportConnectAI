import { Navigate } from "react-router-dom";
import { useAuthStore } from "../features/auth/hooks/useAuthStore";

type Role = "OWNER" | "ADMIN" | "AGENT" | "SUPER_ADMIN";

type RequireRoleProps = {
  roles: Role[];
  children: React.ReactNode;
};

export function RequireRole({ roles, children }: RequireRoleProps) {
  const { isAuthenticated, isBootstrapping, user } = useAuthStore();

  if (isBootstrapping) {
    return null;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (!roles.includes(user.role)) {
    // Redirect to correct surface instead of login
    if (user.role === "SUPER_ADMIN") {
      return <Navigate to="/platform" replace />;
    }

    if (user.role === "AGENT") {
      return <Navigate to="/agent" replace />;
    }

    return <Navigate to="/company" replace />;
  }

  return <>{children}</>;
}