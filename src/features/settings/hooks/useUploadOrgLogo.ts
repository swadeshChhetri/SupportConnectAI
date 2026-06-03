import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadOrgLogo } from "../api/orgApi";

export function useUploadOrgLogo() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: uploadOrgLogo,

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["settings", "org"] });
      qc.invalidateQueries({ queryKey: ["auth", "me"] });
    },
  });
}
