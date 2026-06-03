import React from "react";
import type { ListMessage as ListMessageType } from "../../types/widget";
import { useTheme } from "../../context/ThemeContext";

export default function ListMessage({
  message,
}: {
  message: ListMessageType;
}) {
  const { aiAvatar } = useTheme();
  const isVisitor = message.sender === "user";

  return (
    <div
      className={`flex items-start gap-2 mb-3 ${
        isVisitor ? "justify-end" : "justify-start"
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
        className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm flex flex-col bg-gray-100 text-gray-900`}
      >
        {/* Optional intro text */}
        {message.text && (
          <div className="text-sm mb-2 whitespace-pre-line">
            {message.text}
          </div>
        )}

        {/* List */}
        {message.ordered ? (
          <ol className="list-decimal pl-5 space-y-1 text-sm">
            {message.items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ol>
        ) : (
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {message.items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        )}

        {/* Timestamp */}
        <div className="text-[10px] text-gray-500 mt-2 text-right">
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
}
