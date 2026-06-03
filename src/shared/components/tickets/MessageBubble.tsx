import { User, ShieldCheck, Zap } from "lucide-react";

export default function MessageBubble({
  message,
  sender,
  createdAt,
}: {
  message: string;
  sender: "user" | "agent" | "ai";
  createdAt: string;
}) {
  const isAgent = sender === "agent";
  const isAI = sender === "ai";

  return (
    <div
      className={`flex flex-col mb-4 ${
        isAgent ? "items-end" : "items-start"
      }`}
    >
      <div className="flex items-center gap-2 mb-1.5 px-1">
        {!isAgent && (
          <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${isAI ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-500'}`}>
            {isAI ? <Zap className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
          </div>
        )}
        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
          {sender} • {new Date(createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
        {isAgent && (
          <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
        )}
      </div>

      <div
        className={`max-w-[85%] md:max-w-lg px-5 py-3.5 rounded-2xl shadow-sm text-sm leading-relaxed transition-all hover:shadow-md
          ${isAgent
            ? "bg-blue-600 text-white rounded-tr-none font-medium"
            : isAI 
              ? "bg-indigo-50 border border-indigo-100 text-indigo-900 rounded-tl-none"
              : "bg-white border border-gray-200 text-gray-800 rounded-tl-none"
          }`}
      >
        <p className="whitespace-pre-wrap">{message}</p>
      </div>
    </div>
  );
}
