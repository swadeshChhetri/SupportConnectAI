// src/lib/http.ts
import axios from "axios";
import { useAuthStore } from "../../features/auth/auth.store";

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Attach token + orgId before every request
http.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  const org = useAuthStore.getState().org;

  if (token) config.headers.Authorization = `Bearer ${token}`;
  if (org?.id) config.headers["x-org-id"] = org.id;

  return config;
});
