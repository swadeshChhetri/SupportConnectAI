import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Send, Clock, User, Hash, AlertCircle, CheckCircle2 } from "lucide-react";

import Badge from "../../../shared/components/ui/Badge";
import MessageBubble from "../../../shared/components/tickets/MessageBubble";
import { useTicketByIdQuery } from "../hooks/useTicketByIdQuery";
import { useAdminChatSocket } from "../../chat/hooks/useAdminChatSocket";
import { useUpdateTicketStatus } from "../hooks/useUpdateTicketStatus";

export default function TicketDetailPage() {
  const { ticketId } = useParams<{ ticketId: string }>();
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: ticket, isLoading, isError } =
    useTicketByIdQuery(ticketId);

  const [reply, setReply] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  const {
    messages: liveMessages,
    sendMessage,
    connected,
  } = useAdminChatSocket(ticket?.sessionId ?? null);

  const { mutate: updateStatus } = useUpdateTicketStatus();

  /* --------------------------------------------------
     1️⃣ Initialize from REST when ticket loads
  -------------------------------------------------- */
  useEffect(() => {
    if (!ticket?.messages) return;
    setMessages(ticket.messages);
  }, [ticket]);

  /* --------------------------------------------------
     2️⃣ Merge incoming realtime messages
  -------------------------------------------------- */
  useEffect(() => {
    if (!liveMessages.length) return;

    setMessages((prev) => {
      const map = new Map(prev.map((m) => [m.id, m]));

      for (const msg of liveMessages) {
        map.set(msg.id, msg);
      }

      return Array.from(map.values()).sort(
        (a, b) =>
          new Date(a.createdAt).getTime() -
          new Date(b.createdAt).getTime()
      );
    });
  }, [liveMessages]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!reply.trim()) return;
    if (ticket?.status === "CLOSED") return;

    sendMessage(reply.trim());
    setReply("");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 animate-pulse">
        Loading ticket details...
      </div>
    );
  }
  
  if (isError || !ticket) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500">
        <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
        <h2 className="text-xl font-semibold text-gray-800">Ticket Not Found</h2>
        <p className="mt-2 text-sm">The ticket you're looking for doesn't exist or you don't have access.</p>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "OPEN": return "text-blue-600 bg-blue-50 border-blue-100";
      case "IN_PROGRESS": return "text-amber-600 bg-amber-50 border-amber-100";
      case "RESOLVED": return "text-emerald-600 bg-emerald-50 border-emerald-100";
      case "CLOSED": return "text-gray-600 bg-gray-50 border-gray-100";
      default: return "text-gray-600 bg-gray-50 border-gray-100";
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50/50">
      
      {/* --- Top Header & Info Bar --- */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Hash className="w-4 h-4 text-gray-400" />
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket {ticket.id}</span>
              <Badge color={ticket.priority === "LOW" ? "green" : "red"}>
                {ticket.priority} priority
              </Badge>
            </div>
            <h1 className="text-xl font-bold text-gray-900 leading-tight">{ticket.subject}</h1>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                <span className="font-medium text-gray-700">{ticket.customer}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>Opened {new Date(ticket.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end mr-2">
               <span className="text-[10px] font-bold text-gray-400 uppercase mb-1">Current Status</span>
               <select
                value={ticket.status}
                onChange={(e) =>
                  updateStatus({
                    ticketId: ticket.id,
                    status: e.target.value,
                  })
                }
                className={`text-sm font-semibold rounded-lg border px-3 py-1.5 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all cursor-pointer ${getStatusColor(ticket.status)}`}
              >
                <option value="OPEN">OPEN</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="RESOLVED">RESOLVED</option>
                <option value="CLOSED">CLOSED</option>
              </select>
            </div>
            {ticket.assignedToMe && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold border border-emerald-100">
                <CheckCircle2 className="w-3.5 h-3.5" />
                MY TICKET
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- Messages Feed --- */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-6 py-8 space-y-6 scroll-smooth custom-scrollbar"
      >
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <Clock className="w-8 h-8 opacity-20" />
              </div>
              <p className="text-sm font-medium">Waitng for the first message...</p>
            </div>
          ) : (
            messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                sender={msg.sender}
                message={msg.message ?? msg.text}
                createdAt={msg.createdAt}
              />
            ))
          )}
        </div>
      </div>

      {/* --- Composer Section --- */}
      <div className="bg-white border-t border-gray-200 p-6 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
        <div className="max-w-4xl mx-auto">
          <div className="relative group">
            <textarea
              className={`w-full resize-none border border-gray-200 rounded-xl p-4 pr-16 text-sm transition-all focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 outline-none min-h-[110px]
                ${ticket.status === "CLOSED" ? "bg-gray-50 opacity-60 cursor-not-allowed" : "bg-white"}
                ${!connected && ticket.status !== "CLOSED" ? "border-amber-200 bg-amber-50/30" : ""}
              `}
              placeholder={
                ticket.status === "CLOSED"
                  ? "This ticket is closed and cannot be replied to."
                  : connected
                  ? "Write your response here..."
                  : "Reconnecting to real-time chat..."
              }
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              disabled={!connected || ticket.status === "CLOSED"}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.ctrlKey) {
                  handleSend();
                }
              }}
            />
            
            <div className="absolute bottom-4 right-4 flex items-center gap-3">
              <span className="text-[10px] text-gray-400 font-medium hidden sm:block">Ctrl + Enter to send</span>
              <button
                disabled={!reply.trim() || ticket.status === "CLOSED" || !connected}
                onClick={handleSend}
                className={`flex items-center justify-center w-10 h-10 rounded-xl shadow-lg transition-all transform active:scale-95
                  ${reply.trim() && connected && ticket.status !== "CLOSED"
                    ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-500/20"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
                  }`}
                title="Send Reply"
              >
                <Send className={`w-5 h-5 ${reply.trim() ? "translate-x-0.5 -translate-y-0.5" : ""}`} />
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-3 px-1">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500 animate-pulse' : 'bg-amber-500'}`} />
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-tighter">
                {connected ? 'Real-time Connected' : 'Connecting...'}
              </span>
            </div>
            {ticket.status !== "CLOSED" && (
              <p className="text-[11px] text-gray-400">
                The customer will see this message immediately.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
