import React from "react";
import type { ButtonsMessage as ButtonsMessageType } from "../../types/widget";
import { useTheme } from "../../context/ThemeContext";

export default function ButtonsMessage({
  message,
}: {
  message: ButtonsMessageType;
}) {
  const { aiAvatar, primaryColor } = useTheme();
  const isVisitor = message.sender === "user";

  // Emit a DOM event so your widget can react without tight coupling
  function handleClick(option: string) {
    const event = new CustomEvent("widget_button_click", {
      detail: {
        option,
        messageId: message.id,
      },
    });
    window.dispatchEvent(event);
  }

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
      <div className="max-w-[80%] rounded-2xl px-4 py-3 shadow-sm flex flex-col bg-gray-100 text-gray-900">
        {/* Optional intro text */}
        {message.text && (
          <div className="text-sm mb-2 whitespace-pre-line">
            {message.text}
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-wrap gap-2 mt-1">
          {message.buttons.map((btn, idx) => (
            <button
              key={idx}
              onClick={() => handleClick(btn)}
              className="px-3 py-1.5 text-sm border rounded-md hover:opacity-80 transition"
              style={{
                borderColor: primaryColor,
                color: primaryColor,
              }}
            >
              {btn}
            </button>
          ))}
        </div>

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
