import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMessage, type ChatMessage } from "../api/chatApi";
import type { ChatSession } from "../api/chatApi";

export function useSendMessageMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ sessionId, text }: { sessionId: string; text: string }) =>
      sendMessage(sessionId, text),

    // Optimistic update: add message locally, increment session unread/lastMessage
    onMutate: async ({ sessionId, text }) => {
      await qc.cancelQueries({ queryKey: ["chat-messages"] });
      // snapshot
      const prevMessages = qc.getQueryData<ChatMessage[]>(["chat-messages", undefined, sessionId]);
      // optimistic message
      const optimistic: ChatMessage = {
        id: `optim-${Date.now()}`,
        sessionId,
        sender: "agent", // agent sending from admin UI
        text,
        createdAt: new Date().toISOString(),
      };

      // update messages cache for this session
      const msgKey = qc.getQueryData(["chat-messages"]);
      qc.setQueryData(["chat-messages", undefined, sessionId], (old: ChatMessage[] | undefined) => {
        return old ? [...old, optimistic] : [optimistic];
      });

      // update session list: lastMessage + updatedAt
      qc.setQueryData<ChatSession[] | undefined>(["chat-sessions"], (old) => {
        if (!old) return old;
        return old.map((s) =>
          s.id === sessionId ? { ...s, lastMessage: text, updatedAt: new Date().toISOString() } : s
        );
      });

      return { prevMessages };
    },

    onError: (_err, { sessionId }, context: any) => {
      // rollback
      qc.setQueryData(["chat-messages", undefined, sessionId], context?.prevMessages);
    },

    onSettled: (_data, _err, { sessionId }) => {
      // refetch messages + sessions to sync real state
      qc.invalidateQueries({ queryKey: ["chat-messages"] });
      qc.invalidateQueries({ queryKey: ["chat-sessions"] });
    },
  });
}
