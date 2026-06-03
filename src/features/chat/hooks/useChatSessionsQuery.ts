import { useQuery } from "@tanstack/react-query";
import { fetchChatSessions, type ChatSession } from "../api/chatApi";
import { useAuthStore } from "../../auth/hooks/useAuthStore";

export function useChatSessionsQuery() {
  const orgId = useAuthStore((s) => s.org?.id);

  return useQuery({
    queryKey: ["chat-sessions", orgId],
    queryFn: fetchChatSessions,
    staleTime: 10_000,
    refetchInterval: 10_000, // refresh list every 10s for new sessions / unread counts
  });
}
