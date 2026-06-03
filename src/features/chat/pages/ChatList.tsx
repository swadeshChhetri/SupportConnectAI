import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useChatSessionsQuery } from "../hooks/useChatSessionsQuery";
import { useAdminChatSocket } from "../hooks/useAdminChatSocket";
// import { useAdminChatSocket } from "../../features/chat/hooks/useAdminChatSocket";

export default function ChatList({ activeId }: { activeId: string | null }) {
  const navigate = useNavigate();
  const qc = useQueryClient();

  const [search, setSearch] = useState("");

  // 1. Load chat sessions (React Query)
  const { data: sessions = [] } = useChatSessionsQuery();

  // 2. Socket events (typing, unread, takeover)
  const { typingSessions } = useAdminChatSocket(null, {
    onNewMessage: () => qc.invalidateQueries({ queryKey: ["chat-sessions"] }),
    onUnread: () => qc.invalidateQueries({ queryKey: ["chat-sessions"] }),
    onTakenOver: () => qc.invalidateQueries({ queryKey: ["chat-sessions"] }),
  });

  // 3. Filter sessions by search
  const filtered = sessions.filter((s) =>
    s.customer?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-full border-r w-80 bg-white">
      <div className="p-4 border-b">
        <input
          placeholder="Search chats..."
          className="w-full border rounded-md px-3 py-2 text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-y-auto h-[calc(100vh-6rem)]">
        {filtered.map((s) => {
          const isTyping = typingSessions[s.id] === true;

          return (
            <div
              key={s.id}
              onClick={() => navigate(`/dashboard/chat/${s.id}`)}
              className={`px-4 py-3 cursor-pointer hover:bg-gray-50 flex justify-between ${activeId === s.id ? "bg-gray-100" : ""
                }`}
            >
              <div>
                <div className="font-medium">{s.customer}</div>

                <div className="text-xs text-gray-500 truncate max-w-[220px]">
                  {s.lastMessage || "No messages yet"}
                </div>

                {isTyping && (
                  <div className="text-xs text-blue-500 mt-0.5">
                    typing…
                  </div>
                )}
              </div>

              <div className="text-right">
                <div className="text-xs text-gray-400">
                  {new Date(s.updatedAt).toLocaleTimeString()}
                </div>

                {s.unreadCount > 0 && (
                  <div className="mt-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded">
                    {s.unreadCount}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


