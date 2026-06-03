import React from "react";
import type { ChatSession } from "../api/chatApi";
import { useNavigate } from "react-router-dom";

export default function ChatList({ sessions }: { sessions: ChatSession[] }) {
  const navigate = useNavigate();

  return (
    <div className="h-full border-r">
      <div className="p-4 border-b">
        <input placeholder="Search chats..." className="w-full border rounded-md px-3 py-2 text-sm" />
      </div>

      <div className="overflow-y-auto h-[calc(100vh-6rem)]">
        {sessions.map((s) => (
          <div
            key={s.id}
            onClick={() => navigate(`/dashboard/chat/${s.id}`)}
            className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center justify-between"
          >
            <div>
              <div className="font-medium">{s.customer}</div>
              <div className="text-xs text-gray-500 truncate max-w-[220px]">{s.lastMessage}</div>
            </div>

            <div className="text-right">
              <div className="text-xs text-gray-400">{new Date(s.updatedAt).toLocaleTimeString()}</div>
              {s.unreadCount > 0 && (
                <div className="mt-2 inline-flex items-center gap-1 bg-blue-600 text-white text-xs px-2 py-0.5 rounded">
                  {s.unreadCount}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
