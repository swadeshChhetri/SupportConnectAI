// src/admin/pages/chat/ChatWindow.tsx
import { useEffect, useRef, useState } from "react";
import { useAdminChatSocket } from "../hooks/useAdminChatSocket";

export default function ChatWindow({ sessionId }: { sessionId: string | null }) {
  const {
    messages,
    connected,
    typing,
    loadingHistory,
    sendMessage,
    sendTyping,
    presence,
  } = useAdminChatSocket(sessionId);

  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 80);
  }, [messages.length]);

  if (!sessionId) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        Select a chat
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">

      {/* HEADER BAR */}
      <div className="border-b p-3 text-sm flex justify-between text-gray-600">
        <div>
          {connected ? "🟢 Live" : "🔴 Connecting..."}
        </div>

        <div>
          Agents Online: {presence.count}
        </div>
      </div>

      {/* MESSAGES */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 bg-gray-50">

        {loadingHistory && (
          <div className="text-center text-gray-500 text-sm mb-4">
            Loading chat…
          </div>
        )}

        {messages.map((m) => (
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
                  : m.sender === "user"
                  ? "bg-gray-200 text-gray-800"
                  : "bg-purple-200 text-purple-900" // AI bubble
              }`}
            >
              <div className="text-sm">{m.text}</div>
              <div className="text-[10px] opacity-70 mt-1">
                {new Date(m.createdAt).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}

        {typing.who && (
          <div className="text-xs text-gray-500 italic mt-2">
            {typing.who} is typing…
          </div>
        )}

      </div>

      {/* INPUT BAR */}
      <div className="border-t p-3 flex gap-3">
        <textarea
          rows={1}
          className="border p-2 rounded flex-1 resize-none text-sm"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            sendTyping();
          }}
          placeholder="Type message..."
        />

        <button
          onClick={() => {
            sendMessage(input);
            setInput("");
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={!connected}
        >
          Send
        </button>
      </div>
    </div>
  );
}
