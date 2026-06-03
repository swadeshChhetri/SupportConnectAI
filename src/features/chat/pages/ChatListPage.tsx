import React from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { useChatSessionsQuery } from "../hooks/useChatSessionsQuery";
import ChatWindow from "./ChatWindow";
import ChatList from "./ChatList";
// import ChatWindow from "../../features/chat/components/ChatWindow";
// import { useChatMessagesQuery } from './../hooks/useChatMessagesQuery';
import { useChatSessionsQuery } from './../hooks/useChatSessionsQuery';

export default function ChatListPage() {
  const { sessionId: routeSessionId } = useParams<{ sessionId?: string }>();
  const navigate = useNavigate();

  const { data: sessions = [], isLoading } = useChatSessionsQuery();

  // Auto-select first session if none in route and sessions exist
  React.useEffect(() => {
    if (!routeSessionId && sessions.length > 0) {
      navigate(`/dashboard/chat/${sessions[0].id}`, { replace: false });
    }
  }, [routeSessionId, sessions, navigate]);

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-white rounded-lg overflow-hidden shadow-sm">
      <div className="w-96">
        <ChatList sessions={sessions} />
      </div>

      <div className="flex-1">
        <ChatWindow sessionId={routeSessionId ?? (sessions[0]?.id ?? null)} />
      </div>
    </div>
  );
}
