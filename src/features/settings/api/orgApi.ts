import { api } from "../../../shared/api/axiosClient";

export async function fetchOrgSettings() {
  const res = await api.get("/settings/org");
  return res.data.data;
}

export async function updateOrgSettings(payload: { name: string }) {
  const res = await api.put("/settings/org", payload);
  return res.data.data;
}

export async function uploadOrgLogo(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await api.post("/settings/org/logo", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data.data;
}

