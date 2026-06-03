import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../auth/hooks/useAuthStore";
import { fetchTickets, type TicketQueryParams } from "../api/ticketApi";

export function useTicketsQuery(filters: TicketQueryParams) {
  const orgId = useAuthStore((s) => s.org?.id);

  return useQuery({
    queryKey: ["tickets", orgId, filters],
    queryFn: () => fetchTickets(filters),
    enabled: Boolean(orgId), // 🔐 wait for auth bootstrap
    staleTime: 10_000,
  });
}
