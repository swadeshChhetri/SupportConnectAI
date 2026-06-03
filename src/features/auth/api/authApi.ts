// import api from "./axiosClient";

import { api } from "../../../shared/api/axiosClient";

export type Role = "OWNER" | "ADMIN" | "AGENT" | "CUSTOMER" | "SUPER_ADMIN";

export type Org = {
  id: string;
  name: string;
  email: string;
  slug: string;
  widgetApiKey: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
};

// -----------------------------
// Response Types
// -----------------------------
export type LoginResponseData = {
  token: string;
  user: User;
  org: Org | null; // 🔥 FIXED
};

export type LoginApiResponse = {
  success: boolean;
  message: string;
  data: LoginResponseData;
};

export type RegisterApiResponse = {
  success: boolean;
  message: string;
  data: LoginResponseData;
};

export type MeApiResponse = {
  success: boolean;
  user: User;
  org: Org | null;
};

// -----------------------------
// REGISTER
// -----------------------------
export async function registerUser(payload: {
  name: string;
  email: string;
  password: string;
  orgName: string;
}): Promise<LoginResponseData> {
  const res = await api.post<RegisterApiResponse>("/auth/register", payload);
  return res.data.data; // { token, user, org }
}

// -----------------------------
// LOGIN
// -----------------------------
export async function loginUser(payload: {
  email: string;
  password: string;
}): Promise<LoginResponseData> {
  const res = await api.post<LoginApiResponse>("/auth/login", payload);
  return res.data.data;
}

// -----------------------------
// REQUEST PASSWORD RESET
// -----------------------------
export const requestPasswordReset = async (email: string) => {
  return api.post("/auth/forgot-password", { email });
};

// -----------------------------
// SESSION RESTORE (/me)
// -----------------------------
export async function fetchMe(): Promise<{ user: User; org: Org | null; }> {
  const res = await api.get<MeApiResponse>("/auth/me");
  return { user: res.data.user, org: res.data.org };
}
