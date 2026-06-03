import { Routes, Route, Navigate } from "react-router-dom";

import TicketListPage from './../../features/tickets/pages/TicketListPage';
import TicketDetailPage from '../../features/tickets/pages/TicketDetailsPage';
import AgentLayout from "./layout";
import { RequireRole } from "../../app/guards";

// Placeholder components for other routes
const DashboardPlaceholder = () => (
  <div className="p-10 flex flex-col items-center justify-center h-full text-gray-400 gap-4">
    <div className="w-16 h-16 rounded-3xl bg-gray-100 flex items-center justify-center text-2xl">📊</div>
    <h2 className="text-xl font-bold text-gray-800">Agent Dashboard</h2>
    <p>Live analytics and performance metrics are coming soon.</p>
  </div>
);

const KBPlaceholder = () => (
  <div className="p-10 flex flex-col items-center justify-center h-full text-gray-400 gap-4">
     <div className="w-16 h-16 rounded-3xl bg-gray-100 flex items-center justify-center text-2xl">📚</div>
     <h2 className="text-xl font-bold text-gray-800">Knowledge Base</h2>
     <p>Search and manage support articles here.</p>
  </div>
);

const AnalyticsPlaceholder = () => (
  <div className="p-10 flex flex-col items-center justify-center h-full text-gray-400 gap-4">
     <div className="w-16 h-16 rounded-3xl bg-gray-100 flex items-center justify-center text-2xl">📈</div>
     <h2 className="text-xl font-bold text-gray-800">Support Analytics</h2>
     <p>Deep insights into ticket resolution times and customer satisfaction.</p>
  </div>
);

const SettingsPlaceholder = () => (
  <div className="p-10 flex flex-col items-center justify-center h-full text-gray-400 gap-4">
     <div className="w-16 h-16 rounded-3xl bg-gray-100 flex items-center justify-center text-2xl">⚙️</div>
     <h2 className="text-xl font-bold text-gray-800">Agent Settings</h2>
     <p>Manage your profile, notifications, and working hours.</p>
  </div>
);

export default function AgentRoutes() {
  return (
    <RequireRole roles={["AGENT"]}>
      <Routes>
        <Route element={<AgentLayout />}>
          <Route index element={<Navigate to="tickets" />} />
          <Route path="dashboard" element={<DashboardPlaceholder />} />
          <Route path="tickets" element={<TicketListPage />} />
          <Route path="tickets/:ticketId" element={<TicketDetailPage />} />
          <Route path="kb" element={<KBPlaceholder />} />
          <Route path="analytics" element={<AnalyticsPlaceholder />} />
          <Route path="settings" element={<SettingsPlaceholder />} />
        </Route>
      </Routes>
    </RequireRole>
  );
}
