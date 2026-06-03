import React, { useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";

type InputBarProps = {
  onSend: (text: string) => Promise<void>;
  onUpload: (file: File) => void;
};

export default function InputBar({ onSend, onUpload }: InputBarProps) {
  const { primaryColor } = useTheme();

  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const canSend = text.trim().length > 0 && !sending;

  async function handleSend() {
    if (!canSend) return;

    setSending(true);
    try {
      await onSend(text.trim());
      setText("");
    } finally {
      setSending(false);
    }
  }

  function handleFileClick() {
    fileInputRef.current?.click();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File too large (max 5MB)");
      return;
    }

    setUploading(true);

    Promise.resolve(onUpload(file))
      .catch(() => { })
      .finally(() => setUploading(false));
    e.target.value = "";
  }

  return (
    <div className="w-full px-4 py-4">
      <div className="relative">

        {/* Glass Container */}
        <div className="flex items-end gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400/30 transition shadow-lg backdrop-blur-md">

          {/* Upload */}
          <button
            type="button"
            onClick={handleFileClick}
            disabled={sending || uploading}
            className="flex-shrink-0 p-2 rounded-xl text-white/50 hover:bg-white/10 hover:text-white transition disabled:opacity-40"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </button>

          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*,.pdf,.doc,.docx,.txt"
            onChange={handleFileChange}
          />

          {/* Textarea */}
          <textarea
            rows={1}
            value={text}
            disabled={sending}
            placeholder="Type a message..."
            className="flex-1 resize-none bg-transparent text-sm text-white placeholder-white/40 outline-none max-h-40 py-2 scrollbar-hide"
            onChange={(e) => {
              setText(e.target.value);

              const el = e.target;
              el.style.height = "auto";
              el.style.height = el.scrollHeight + "px";
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />

          {/* Send */}
          <button
            onClick={handleSend}
            disabled={!canSend}
            className="flex-shrink-0 h-9 w-9 flex items-center justify-center rounded-xl text-white transition disabled:opacity-30 shadow-md"
            style={{
              backgroundColor: canSend ? primaryColor : "rgba(255,255,255,0.1)",
            }}
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M22 2L11 13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>

        </div>

      </div>
    </div>
  );
}
