import { api } from "../../../shared/api/axiosClient";

// import { api } from "../../../shared/api/axiosClient";

// -------------------------------
// Types
// -------------------------------
export type DocumentItem = {
  id: string;
  title: string;
  fileKey: string;
  mimeType?: string;
  fileSize?: number;
  status: "pending" | "processing" | "indexed" | "failed";
  createdAt: string;
  updatedAt: string;
  errorMessage?: string;
};

export type PaginatedDocuments = {
  items: DocumentItem[];
  total: number;
  page: number;
  pageSize: number;
};

// -------------------------------
// API Calls
// -------------------------------

// 1) Create doc (Legacy/Presigned - Not supported by current backend)
// export async function createDocument(payload: { ... })

// 1) Direct Upload
export async function uploadDocument(file: File, title?: string) {
  const formData = new FormData();
  formData.append("file", file);
  if (title) {
    formData.append("title", title);
  }

  const res = await api.post("/documents/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data.data;
}

// 2) Notify server that upload completed (Not needed for direct upload)
export async function completeDocumentUpload(id: string) {
  // ...
}

// 3) List documents
export async function fetchDocuments(params: {
  page?: number;
  pageSize?: number;
  status?: string;
  q?: string;
}) {
  const res = await api.get("/documents", { params });
  return res.data.data as PaginatedDocuments;
}

// 4) Single document
export async function fetchDocument(id: string) {
  const res = await api.get(`/documents/${id}`);
  return res.data.data as DocumentItem;
}

// 5) Delete
export async function deleteDocument(id: string) {
  const res = await api.delete(`/documents/${id}`);
  return res.data;
}

// 6) Search
export async function searchDocuments(q: string) {
  const res = await api.get("/documents/search", { params: { q } });
  return res.data.data;
}

// 7) RAG Query
export async function ragQuery(query: string) {
  const res = await api.post("/documents/query", { query });
  return res.data.data;
}

// 8) Reindex (optional)
export async function reindexDocument(id: string) {
  const res = await api.post(`/documents/${id}/index`);
  return res.data;
}

// 9) Poll status
export async function fetchDocumentStatus(id: string) {
  const res = await api.get(`/documents/${id}/status`);
  return res.data.data as DocumentItem;
}
