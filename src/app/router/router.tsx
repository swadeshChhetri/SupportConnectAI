import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../../features/auth/pages/LoginPage";
import RegisterPage from "../../features/auth/pages/RegisterPage";
import ForgotPasswordPage from "../../features/auth/pages/ForgotPasswordPage";
import AgentRoutes from "../../surfaces/agent/routes";
import CompanyAdminRoutes from "../../surfaces/company-admin/routes";
import PlatformAdminRoutes from "../../surfaces/platform-admin/routes";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* Surfaces */}
      <Route path="/agent/*" element={<AgentRoutes />} />
      <Route path="/company/*" element={<CompanyAdminRoutes />} />
      <Route path="/platform/*" element={<PlatformAdminRoutes />} />
    </Routes>
  );
}
