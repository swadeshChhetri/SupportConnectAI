import { useQuery } from "@tanstack/react-query";
import { fetchMessages, type ChatMessage } from "../api/chatApi";
import { useAuthStore } from "../../auth/hooks/useAuthStore";

export function useChatMessagesQuery(sessionId: string | null, enabled = true) {
  const orgId = useAuthStore((s) => s.org?.id);

  return useQuery({
    queryKey: ["chat-messages", orgId, sessionId],
    queryFn: () => fetchMessages(sessionId!),
    enabled: !!sessionId && enabled,
    staleTime: 5_000,
    refetchInterval: 3000, // short polling for near real-time
    keepPreviousData: false, // v5 note: keepPreviousData removed — but if using v5 you can use placeholderData
    // If using v5, remove keepPreviousData; placeholderData isn't necessary here
  } as any); // cast for cross-version compatibility; remove cast if types align
}
