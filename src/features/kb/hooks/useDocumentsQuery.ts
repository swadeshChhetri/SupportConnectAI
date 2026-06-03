import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../auth/hooks/useAuthStore";
import { fetchDocuments } from "../api/kbApi";

export function useDocumentsQuery(params: {
  page?: number;
  pageSize?: number;
  status?: string;
  q?: string;
}) {
  const orgId = useAuthStore((s) => s.org?.id);

  return useQuery({
    queryKey: ["documents", orgId, params],
    queryFn: () => fetchDocuments(params),
    enabled: !!orgId,
    staleTime: 10_000,
  });
}
