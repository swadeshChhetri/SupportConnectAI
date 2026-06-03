import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadDocument } from "../api/kbApi";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../../auth/hooks/useAuthStore";

export function useCreateDocumentMutation() {
  const orgId = useAuthStore((s) => s.org?.id);
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (payload: {
      title: string;
      file: File;
    }) => {
      const { file, title } = payload;
      return await uploadDocument(file, title);
    },

    onSuccess: () => {
      toast.success("Document uploaded!");
      qc.invalidateQueries({ queryKey: ["documents", orgId] });
    },

    onError: (err: any) => {
      console.error(err);
      toast.error("Upload failed");
    },
  });
}
