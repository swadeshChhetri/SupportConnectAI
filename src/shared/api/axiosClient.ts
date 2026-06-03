// src/api/axiosClient.ts
import axios from "axios";
import { useAuthStore } from "../../features/auth/hooks/useAuthStore";
// import { useAuthStore } from "../features/auth/hooks/useAuthStore";



export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState();

  console.log("➡️ OUTGOING REQUEST", {
    url: config.url,
    method: config.method,
    hasAuthHeader: Boolean(token),
    headers: config.headers,
  });


  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
