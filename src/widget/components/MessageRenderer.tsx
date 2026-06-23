import React from "react";
import type { WidgetMessage } from "../types/widget";

import TextMessage from "./messages/TextMessage";
import FileMessage from "./messages/FileMessage";
import ListMessage from "./messages/ListMessage";
import ButtonsMessage from "./messages/ButtonsMessage";
import FormMessage from "./messages/FormMessage";
import { useTheme } from "../context/ThemeContext";

// Typing Indicator Component
function TypingBubble() {
  const { aiAvatar } = useTheme();
  return (
    <div className="flex items-start gap-2 mb-3 justify-start">
      {aiAvatar && (
        <img
          src={aiAvatar}
          alt="AI"
          className="w-8 h-8 rounded-full object-cover"
        />
      )}
      <div className="max-w-[80%] rounded-2xl px-5 py-3 shadow-sm bg-gray-100 flex items-center gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }} />
        <div className="w-2.5 h-2.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }} />
        <div className="w-2.5 h-2.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  );
}

// Stream message - partial AI output
function StreamMessage({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2 mb-3">
      <div className="bg-gray-100 text-gray-900 rounded-2xl px-4 py-2 shadow-sm max-w-[80%]">
        <div className="text-sm whitespace-pre-line">{text}</div>
      </div>
    </div>
  );
}

export default function MessageRenderer({ message }: { message: WidgetMessage }) {
  // Create a unique key using id + timestamp to prevent duplicates
  const uniqueKey = `${message.id}-${message.createdAt || Date.now()}`;

  // Use a wrapper div with the unique key
  const renderMessage = () => {
    switch (message.type) {
      case "text":
        return <TextMessage message={message} />;

      case "file":
        return <FileMessage message={message} />;

      case "list":
        return <ListMessage message={message} />;

      case "buttons":
        return <ButtonsMessage message={message} />;

      case "form":
        return <FormMessage message={message} />;

      case "error":
        return (
          <div className="flex justify-start mb-6">
            <div className="relative max-w-[70%] group">

              {/* Glass Bubble */}
              <div className="rounded-2xl bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-400/20 backdrop-blur-md px-5 py-4 shadow-lg">

                {/* Header Row */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                    <svg
                      className="h-3.5 w-3.5 text-red-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                  </div>

                  <span className="text-xs font-semibold text-red-400 tracking-wide uppercase">
                    Delivery Failed
                  </span>
                </div>

                {/* Error Message */}
                <p className="text-sm text-gray-800 dark:text-white/90 leading-relaxed">
                  {message.errorText}
                </p>

                {/* Retry */}
                {message.retryable && (
                  <div className="mt-4">
                    <button
                      onClick={() =>
                        window.dispatchEvent(
                          new CustomEvent("widget_retry", {
                            detail: { messageId: message.id },
                          })
                        )
                      }
                      className="text-xs font-medium px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition shadow-sm"
                    >
                      Retry Message
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>
        );

      case "typing":
        return <TypingBubble />;

      case "stream":
        return <StreamMessage text={message.text} />;

      default:
        return null;
    }
  };

  return (
    <div key={uniqueKey}>
      {renderMessage()}
    </div>
  );
}