// src/app/router/ProtectedRoute.tsx (or wherever you keep it)
import { Navigate } from "react-router-dom";
import type { JSX } from "react";
import { useAuthStore } from "../../features/auth/auth.store";
// import { useAuthStore } from "../admin/features/auth/hooks/useAuthStore";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isBootstrapping = useAuthStore((s) => s.isBootstrapping);
  const user = useAuthStore((s) => s.user);
  const org = useAuthStore((s) => s.org);


  if (isBootstrapping) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-500">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // Super admins don't need an org; everyone else does.
  if (user.role !== "SUPER_ADMIN" && !org) {
    return <Navigate to="/login" replace />;
  }

  return children;
}