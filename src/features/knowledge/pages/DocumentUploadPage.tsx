// src/pages/knowledge/DocumentUploadPage.tsx

import { useState } from "react";
import { useCreateDocumentMutation } from "../../kb/hooks/useCreateDocumentMutation";
import { useNavigate } from "react-router-dom";

export default function DocumentUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const mutation = useCreateDocumentMutation();

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title.trim()) return;

    mutation.mutate(
      { title, file },
      {
        onSuccess: () => {
          navigate("/company/knowledge");
        },
      }
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Upload Document</h1>

      <form
        onSubmit={handleUpload}
        className="bg-white p-6 shadow rounded-lg max-w-lg space-y-4"
      >
        {/* Document Title */}
        <div>
          <label className="block mb-1 text-sm font-medium">Title</label>
          <input
            type="text"
            placeholder="Enter document title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block mb-1 text-sm font-medium">Document File</label>
          <input
            type="file"
            accept=".pdf,.txt,.docx"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!file || !title || mutation.isPending}
          className="bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
        >
          {mutation.isPending ? "Uploading…" : "Upload"}
        </button>

        {/* Feedback */}
        {mutation.isError && (
          <p className="text-sm text-red-600">Upload failed. Try again.</p>
        )}
      </form>
    </div>
  );
}
