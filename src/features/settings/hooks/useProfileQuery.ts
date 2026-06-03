import { useQuery } from "@tanstack/react-query";
import { fetchProfile } from "../api/profileApi";

export function useProfileQuery() {
  return useQuery({
    queryKey: ["settings", "profile"],
    queryFn: fetchProfile,
  });
}
