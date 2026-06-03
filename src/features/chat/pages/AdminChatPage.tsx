// src/admin/pages/chat/AdminChatPage.tsx
import { useParams } from "react-router-dom";
import ChatSidebar from "./ChatSidebar";
import ChatWindow from "./ChatWindow";

export default function AdminChatPage() {
  const { sessionId } = useParams();

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-white rounded shadow">
      <ChatSidebar activeId={sessionId || null} />

      <div className="flex-1">
        <ChatWindow sessionId={sessionId || null} />
      </div>
    </div>
  );
}
