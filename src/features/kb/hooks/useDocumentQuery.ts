import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../auth/hooks/useAuthStore";
import { fetchDocument } from "../api/kbApi";

export function useDocumentQuery(id: string) {
  const orgId = useAuthStore((s) => s.org?.id);

  return useQuery({
    queryKey: ["document", orgId, id],
    queryFn: () => fetchDocument(id),
    enabled: !!id && !!orgId,
  });
}
