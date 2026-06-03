import { api } from "../../../shared/api/axiosClient";

export async function fetchProfile() {
  const res = await api.get("/settings/profile");
  return res.data.data;
}

export async function updateProfile(payload: { name: string }) {
  const res = await api.put("/settings/profile", payload);
  return res.data.data;
}

export async function changePassword(payload: {
  oldPassword: string;
  newPassword: string;
}) {
  return api.put("/settings/change-password", payload);
}
