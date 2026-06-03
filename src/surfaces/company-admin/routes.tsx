import { Routes, Route, Navigate } from "react-router-dom";
import CompanyAdminLayout from "./layout";
// import { RequireRole } from "@/app/guards";

// import TicketListPage from "@/features/tickets/pages/TicketListPage";
// import TicketDetailPage from "@/features/tickets/pages/TicketDetailPage";
// import MembersPage from "@/features/members/pages/MembersPage";
// import OrgSettingsPage from "@/features/settings/pages/OrgSettingsPage";
import WidgetSettingsPage from "../../features/org/pages/WidgetSettingsPage";
// import { fetchTicketDetail } from "../../features/tickets/ticketDetailApi";
// import MembersPage from "../../features/settings/pages/MembersPage";

import OrgSettingsPage from "../../features/settings/pages/OrgSettingsPage";
import AgentsPage from "../../features/members/pages/AgentsPage";
import { RequireRole } from "../../app/guards";
// import WidgetSettingsPage from "@/features/org/pages/WidgetSettingsPage";
// import TicketDetailPage from './../../features/tickets/pages/TicketDetailPage';
// import TicketListPage from './../../features/tickets/pages/TicketListPage';
import CompanyTicketListPage from './../../features/tickets/pages/CompanyTicketListPage';
import KnowledgeBaseListPage from "../../features/knowledge/pages/KnowledgeBaseListPage";
import DocumentUploadPage from "../../features/knowledge/pages/DocumentUploadPage";
import DocumentPreviewPage from "../../features/knowledge/pages/DocumentPreviewPage";
import SearchKnowledgePage from "../../features/knowledge/pages/SearchKnowledgePage";




export default function CompanyAdminRoutes() {
  return (
    <RequireRole roles={["OWNER", "ADMIN"]}>
      <Routes>
        <Route element={<CompanyAdminLayout />}>
          <Route index element={<Navigate to="tickets" />} />
          <Route path="tickets" element={<CompanyTicketListPage />} />
          <Route path="agents" element={<AgentsPage />} />
          <Route path="knowledge" element={<KnowledgeBaseListPage />} />
          <Route path="knowledge/upload" element={<DocumentUploadPage />} />
          <Route path="knowledge/:id" element={<DocumentPreviewPage />} />
          <Route path="knowledge/search" element={<SearchKnowledgePage />} />
          <Route path="widget" element={<WidgetSettingsPage />} />
          <Route path="settings" element={<OrgSettingsPage />} />
        </Route>
      </Routes>
    // </RequireRole>
  );
}
