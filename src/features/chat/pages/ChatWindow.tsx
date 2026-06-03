// src/admin/pages/chat/ChatWindow.tsx
import { useEffect, useRef, useState } from "react";
// import { useAdminChatSocket } from "../../features/chat/hooks/useAdminChatSocket";
import { Loader2 } from "lucide-react";
import { useAdminChatSocket } from "../hooks/useAdminChatSocket";

export default function ChatWindow({ sessionId }: { sessionId: string | null }) {
  const {
    messages,
    sendMessage,
    connected,
    typing,
    loadingHistory,
  } = useAdminChatSocket(sessionId);

  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  if (!sessionId) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        Select a chat
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">

      {/* HEADER (connection status) */}
      <div className="border-b p-3 text-xs text-gray-500 flex items-center gap-2">
        {connected ? (
          <span className="text-green-600">🟢 Connected</span>
        ) : (
          <span className="text-red-500">🔴 Connecting...</span>
        )}
      </div>

      {/* MESSAGES LIST */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4">

        {/* Loading previous history */}
        {loadingHistory && (
          <div className="flex justify-center py-4 text-gray-400">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="ml-2 text-xs">Loading history...</span>
          </div>
        )}

        {messages.map((m: any) => (
          <div
            key={m.id}
            className={`mb-3 flex ${
              m.sender === "agent" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 rounded-lg max-w-[70%] ${
                m.sender === "agent"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
              <div className="text-sm">{m.text}</div>
              <div className="text-[10px] opacity-70 mt-1">
                {new Date(m.createdAt).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}

        {/* TYPING INDICATOR */}
        {typing && (
          <div className="text-xs text-gray-500 italic pl-2">
            User is typing…
          </div>
        )}
      </div>

      {/* INPUT BOX */}
      <div className="border-t p-3 flex gap-3 items-center">
        <textarea
          rows={1}
          className="border p-2 rounded flex-1 resize-none text-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (input.trim()) {
                sendMessage(input.trim());
                setInput("");
              }
            }
          }}
        />

        <button
          onClick={() => {
            if (!input.trim()) return;
            sendMessage(input);
            setInput("");
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={!connected || !input.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
}


