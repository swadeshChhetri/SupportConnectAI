// src/api/kbApi.ts

export type KBDocument = {
  id: string;
  title: string;
  category: string;
  fileType: "pdf" | "txt" | "docx";
  sizeKB: number;
  uploadedAt: string;
  status: "processing" | "ready" | "error";
};

let mockDocs: KBDocument[] = [
  {
    id: "1",
    title: "Refund Policy",
    category: "Policies",
    fileType: "pdf",
    sizeKB: 230,
    uploadedAt: new Date().toISOString(),
    status: "ready",
  },
  {
    id: "2",
    title: "Shipping Guide",
    category: "Guides",
    fileType: "docx",
    sizeKB: 180,
    uploadedAt: new Date().toISOString(),
    status: "processing",
  },
];

const wait = (ms = 300) => new Promise((r) => setTimeout(r, ms));

export const fetchDocuments = async (): Promise<KBDocument[]> => {
  await wait();
  return mockDocs;
};

export const uploadDocument = async (
  file: File,
  category: string
): Promise<KBDocument> => {
  await wait(500);

  const ext = file.name.split(".").pop()?.toLowerCase() || "txt";

  const doc: KBDocument = {
    id: Math.random().toString(36).slice(2),
    title: file.name,
    category,
    fileType: ext as any,
    sizeKB: Math.round(file.size / 1024),
    uploadedAt: new Date().toISOString(),
    status: "processing",
  };

  mockDocs.push(doc);

  // simulate AI ingestion completing after 2 seconds
  setTimeout(() => {
    const found = mockDocs.find((d) => d.id === doc.id);
    if (found) found.status = "ready";
  }, 2000);

  return doc;
};

export const deleteDocument = async (id: string): Promise<boolean> => {
  await wait(200);
  mockDocs = mockDocs.filter((d) => d.id !== id);
  return true;
};
