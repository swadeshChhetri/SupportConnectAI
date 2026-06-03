import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTicketStatus } from "../api/ticketApi";
import { useAuthStore } from "../../auth/hooks/useAuthStore";

export function useUpdateTicketStatus() {
  const queryClient = useQueryClient();
  const orgId = useAuthStore((s) => s.org?.id);

  return useMutation({
    mutationFn: ({
      ticketId,
      status,
    }: {
      ticketId: string;
      status: string;
    }) => updateTicketStatus(ticketId, status),

    onSuccess: (_, variables) => {
      // Refetch ticket detail
      queryClient.invalidateQueries({
        queryKey: ["ticket", orgId, variables.ticketId],
      });

      // Refetch ticket list
      queryClient.invalidateQueries({
        queryKey: ["tickets", orgId],
      });
    },
  });
}