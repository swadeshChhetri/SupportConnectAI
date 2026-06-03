import { Routes, Route, Navigate } from "react-router-dom";
import PlatformAdminLayout from "./layout";
import PlatformOrgListPage from "../../features/org/pages/PlatformOrgListPage";
import PlatformOrgDetailPage from "../../features/org/pages/PlatformOrgDetailPage";
import { RequireRole } from "../../app/guards";

// Placeholder components for platform admin
const PlatformDashboardPlaceholder = () => (
  <div className="p-10 flex flex-col items-center justify-center h-full text-gray-400 gap-4">
    <div className="w-16 h-16 rounded-3xl bg-indigo-50 text-indigo-500 flex items-center justify-center text-2xl shadow-sm border border-indigo-100">📊</div>
    <h2 className="text-xl font-black text-gray-900">Platform Overview</h2>
    <p className="max-w-xs text-center text-sm font-medium">Real-time health monitoring and global system statistics will be displayed here.</p>
  </div>
);

const PlatformUsersPlaceholder = () => (
  <div className="p-10 flex flex-col items-center justify-center h-full text-gray-400 gap-4">
    <div className="w-16 h-16 rounded-3xl bg-indigo-50 text-indigo-500 flex items-center justify-center text-2xl shadow-sm border border-indigo-100">👥</div>
    <h2 className="text-xl font-black text-gray-900">System Users</h2>
    <p className="max-w-xs text-center text-sm font-medium">Manage all registered users and their platform-wide permissions.</p>
  </div>
);

const PlatformLogsPlaceholder = () => (
  <div className="p-10 flex flex-col items-center justify-center h-full text-gray-400 gap-4">
    <div className="w-16 h-16 rounded-3xl bg-indigo-50 text-indigo-500 flex items-center justify-center text-2xl shadow-sm border border-indigo-100">🛡️</div>
    <h2 className="text-xl font-black text-gray-900">Security Logs</h2>
    <p className="max-w-xs text-center text-sm font-medium">Audit trail for all platform-wide administrative actions and security events.</p>
  </div>
);

const PlatformSettingsPlaceholder = () => (
  <div className="p-10 flex flex-col items-center justify-center h-full text-gray-400 gap-4">
    <div className="w-16 h-16 rounded-3xl bg-indigo-50 text-indigo-500 flex items-center justify-center text-2xl shadow-sm border border-indigo-100">⚙️</div>
    <h2 className="text-xl font-black text-gray-900">Global Settings</h2>
    <p className="max-w-xs text-center text-sm font-medium">Configure global system parameters, API limits, and infrastructure settings.</p>
  </div>
);

export default function PlatformAdminRoutes() {
  return (
    <RequireRole roles={["SUPER_ADMIN"]}>
      <Routes>
        <Route element={<PlatformAdminLayout />}>
          <Route index element={<Navigate to="orgs" />} />
          <Route path="dashboard" element={<PlatformDashboardPlaceholder />} />
          <Route path="orgs" element={<PlatformOrgListPage />} />
          <Route path="orgs/:orgId" element={<PlatformOrgDetailPage />} />
          <Route path="users" element={<PlatformUsersPlaceholder />} />
          <Route path="logs" element={<PlatformLogsPlaceholder />} />
          <Route path="settings" element={<PlatformSettingsPlaceholder />} />
        </Route>
      </Routes>
    </RequireRole>
  );
}
