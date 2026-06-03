import React from "react";
import type { FileMessage as FileMessageType } from "../../types/widget";
import { useTheme } from "../../context/ThemeContext";

export default function FileMessage({ message }: { message: FileMessageType }) {
  const { primaryColor, aiAvatar } = useTheme();
  const isVisitor = message.sender === "user";

  const isImage =
    message.fileType?.startsWith("image/") ||
    /\.(png|jpg|jpeg|gif|webp)$/i.test(message.fileUrl);

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

      {/* File Bubble */}
      <div
        className={`max-w-[80%] rounded-2xl p-3 shadow-sm flex flex-col ${
          isVisitor ? "text-white" : "text-gray-900 bg-gray-100"
        }`}
        style={isVisitor ? { backgroundColor: primaryColor } : {}}
      >
        {/* Preview */}
        {isImage ? (
          <img
            src={message.fileUrl}
            alt={message.fileName ?? "file"}
            className="max-w-full max-h-48 rounded-lg mb-2 object-cover"
          />
        ) : (
          <div className="text-4xl mb-2">📄</div>
        )}

        {/* File Name */}
        <div className="text-sm font-medium mb-1">
          {message.fileName ?? "File"}
        </div>

        {/* Download Link */}
        <a
          href={message.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-xs underline ${
            isVisitor ? "text-white/80 hover:text-white" : "text-blue-600"
          }`}
        >
          Download
        </a>

        {/* Timestamp */}
        <div className="text-[10px] text-gray-500 mt-1 text-right">
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
}
