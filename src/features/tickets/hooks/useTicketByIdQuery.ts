import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../auth/hooks/useAuthStore";
import { fetchTicketById } from "../api/ticketApi";

export function useTicketByIdQuery(id?: string) {
  const orgId = useAuthStore((s) => s.org?.id);

  return useQuery({
    queryKey: ["ticket", orgId, id],
    queryFn: () => fetchTicketById(id!),
    enabled: Boolean(id && orgId),
  });
}
