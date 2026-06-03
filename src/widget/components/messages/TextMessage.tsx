import React from "react";
import type { TextMessage as TextMessageType } from "../../types/widget";
import { useTheme } from "../../context/ThemeContext";

export default function TextMessage({ message }: { message: TextMessageType }) {
  const { primaryColor, aiAvatar } = useTheme();
  const isVisitor = message.sender === "user";


  return (
    <div
      className={`flex items-start gap-2 mb-3 ${isVisitor ? "justify-end" : "justify-start"
        }`}
    >
      {/* AI Avatar */}
      {!isVisitor && aiAvatar && (
        <img
          src={aiAvatar}
          alt="AI"
          className="w-8 h-8 rounded-full object-cover"
        />
      )}

      {/* Bubble */}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2 shadow-sm ${isVisitor
            ? "text-white"
            : "text-gray-900 bg-gray-100"
          }`}
        style={isVisitor ? { backgroundColor: primaryColor } : {}}
      >
        <div className="text-sm whitespace-pre-line">{message.text}</div>

        <div className={`mt-1 flex justify-end text-[10px] ${isVisitor
            ? "text-white/70"
            : "text-gray-500"
          }`}
        >
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
}

