import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import MessageRenderer from "./MessageRenderer";
import InputBar from "./InputBar";
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
    sendTyping,
    isTyping,
  } = useWidgetChat(sessionId, visitorId);

  // Auto-scroll to bottom on new messages or when typing state changes
  useEffect(() => {
    setTimeout(() => {
      if (bodyRef.current) {
        bodyRef.current.scrollTo({
          top: bodyRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 50);
  }, [messages, isTyping]);

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
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-blue-500/20 to-indigo-500/20 flex items-center justify-center mb-5 border border-indigo-500/30 shadow-[0_8px_32px_rgba(99,102,241,0.15)] animate-pulse">
              <svg className="w-8 h-8 text-indigo-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3c-4.97 0-9 3.58-9 8 0 1.83.71 3.51 1.91 4.83L3.5 19.5c-.32.48-.05 1.13.51 1.23.1.02.2.02.3 0l3.87-1.12c1.17.61 2.49.95 3.82.95 4.97 0 9-3.58 9-8s-4.03-8-9-8z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                <circle cx="9" cy="11" r="1" fill="currentColor" />
                <circle cx="12" cy="11" r="1" fill="currentColor" />
                <circle cx="15" cy="11" r="1" fill="currentColor" />
              </svg>
            </div>
            <p className="text-base font-semibold text-white">Start a Conversation</p>
            <p className="text-xs mt-2 max-w-[220px] text-slate-400">Ask us anything, we're here to help.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((m) => (
              <MessageRenderer
                key={getMessageKey(m)}
                message={m}
              />
            ))}
            {isTyping && (
              <MessageRenderer
                message={{
                  id: "typing-indicator",
                  sessionId: sessionId || "",
                  sender: "ai",
                  type: "typing",
                  text: "",
                  createdAt: new Date().toISOString(),
                }}
              />
            )}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="sticky bottom-0 z-20 border-t border-white/10 bg-slate-900/80 backdrop-blur-md flex-shrink-0">
        <InputBar onSend={sendTextMessage} onUpload={sendFile} onTyping={sendTyping} />
      </div>
    </div>
  );
}
