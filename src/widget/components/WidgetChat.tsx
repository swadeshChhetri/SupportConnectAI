import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import MessageRenderer from "./MessageRenderer";
import InputBar from "./InputBar";
import {
  MessageCircle,
} from "lucide-react";
import { useWidgetSession } from "../hooks/useWidgetSession";
import { useWidgetChat } from "../hooks/useWidgetChat";

// Helper function to generate unique keys for messages
function getMessageKey(message: any): string {
  if (message.id.startsWith("temp-")) {
    return `temp-${message.id}-${message.createdAt || Date.now()}`;
  }
  return `real-${message.id}-${message.createdAt || ""}`;
}

export default function WidgetChat() {
  const bodyRef = useRef<HTMLDivElement | null>(null);

  const {
    sessionId,
    visitorId,
    loading: sessionLoading,
    error: sessionError,
    retrySession,
  } = useWidgetSession();

  const {
    messages,
    sendTextMessage,
    sendFile,
  } = useWidgetChat(sessionId, visitorId);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    setTimeout(() => {
      if (bodyRef.current) {
        bodyRef.current.scrollTo({
          top: bodyRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 50);
  }, [messages]);

  if (sessionLoading) {
    return (
      <div className="flex items-center justify-center h-full bg-slate-900 text-white/50 text-sm">
        <div className="animate-pulse">Connecting…</div>
      </div>
    );
  }

  if (sessionError) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-slate-900 p-6 text-center">
        <p className="text-red-400 text-sm mb-4">{sessionError}</p>
        <button
          onClick={retrySession}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm hover:bg-blue-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full bg-slate-900 text-white overflow-hidden relative">
      
      {/* Decorative Glows */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 border-b border-white/10 flex-shrink-0">
        <Header />
      </div>

      {/* Messages Area */}
      <div
        ref={bodyRef}
        className="relative z-10 flex-1 overflow-y-auto px-4 py-6 scroll-smooth"
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-white/50">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-4 border border-white/10">
              <MessageCircle className="w-6 h-6" />
            </div>
            <p className="text-base font-medium text-white">Start a Conversation</p>
            <p className="text-xs mt-2 max-w-[200px]">Ask us anything, we're here to help.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((m) => (
              <MessageRenderer
                key={getMessageKey(m)}
                message={m}
              />
            ))}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="sticky bottom-0 z-20 border-t border-white/10 bg-slate-900/80 backdrop-blur-md flex-shrink-0">
        <InputBar onSend={sendTextMessage} onUpload={sendFile} />
      </div>
    </div>
  );
}
