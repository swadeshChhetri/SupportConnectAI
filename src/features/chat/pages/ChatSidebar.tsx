// src/admin/pages/chat/ChatSidebar.tsx
import { useNavigate } from "react-router-dom";
// import { useChatSessionsQuery } from "../hooks/useChatSessionsQuery";

import { Circle } from "lucide-react";
import { useChatSessionsQuery } from "../hooks/useChatSessionsQuery";
import { useAdminPresence } from "../hooks/useAdminPresence";

export default function ChatSidebar({ activeId }: { activeId?: string }) {
  const navigate = useNavigate();

  // 1) Load sessions (sorted by updatedAt DESC)
  const { data: sessions = [] } = useChatSessionsQuery();

  // 2) Real-time agent presence
  const presence = useAdminPresence();

  return (
    <div className="w-80 border-r h-full bg-white">
      {/* Search Bar */}
      <div className="p-3 border-b">
        <input
          placeholder="Search..."
          className="w-full border p-2 rounded text-sm"
          onChange={() => { }}
        />
      </div>

      {/* Session List */}
      <div className="overflow-y-auto h-[calc(100vh-7rem)]">
        {sessions.map((s: any) => {
          const isActive = activeId === s.id;
          const online = presence[s.id] === true;

          return (
            <div
              key={s.id}
              onClick={() => navigate(`/dashboard/chat/${s.id}`)}
              className={`px-4 py-3 cursor-pointer border-b hover:bg-gray-50 ${isActive ? "bg-gray-100" : ""
                }`}
            >
              {/* Row 1: Name + presence */}
              <div className="flex items-center justify-between">
                <div className="font-semibold text-sm">
                  {s.customerName ?? "Visitor"}
                </div>

                {online && (
                  <Circle className="w-3 h-3 text-green-500 fill-green-500" />
                )}
              </div>

              {/* Row 2: Last message preview */}
              <div className="text-xs text-gray-500 truncate max-w-[220px]">
                {s.lastMessage ?? "No messages yet"}
              </div>

              {/* Row 3: Time + unread */}
              <div className="flex items-center justify-between mt-1">
                <div className="text-[10px] text-gray-400">
                  {new Date(s.updatedAt).toLocaleTimeString()}
                </div>

                {s.unreadCount > 0 && (
                  <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full">
                    {s.unreadCount}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
