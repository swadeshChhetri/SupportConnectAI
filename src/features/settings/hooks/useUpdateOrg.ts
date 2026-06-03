import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrgSettings } from "../api/orgApi";

export function useUpdateOrg() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateOrgSettings,

    onSuccess: () => {
      // Refresh org settings
      queryClient.invalidateQueries({ queryKey: ["settings", "org"] });
      // Also refresh session state (org name in topbar)
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
    },
  });
}
