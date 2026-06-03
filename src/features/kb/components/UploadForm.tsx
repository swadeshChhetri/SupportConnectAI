import React, { useState } from "react";
import { useCreateDocumentMutation } from "../hooks/useCreateDocumentMutation";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const mutation = useCreateDocumentMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title.trim()) return;

    mutation.mutate({ title, file });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white rounded-lg shadow-sm space-y-4"
    >
      <h2 className="text-lg font-semibold">Upload Knowledge Document</h2>

      {/* File Input */}
      <input
        type="file"
        className="border p-2 rounded w-full"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />

      {/* Title */}
      <input
        type="text"
        placeholder="Document title"
        className="border p-2 rounded w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button
        type="submit"
        disabled={!file || !title || mutation.isPending}
        className="bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
      >
        {mutation.isPending ? "Uploading..." : "Upload"}
      </button>

      {/* Debug / Status */}
      {mutation.isSuccess && (
        <p className="text-green-600 text-sm">Upload successful!</p>
      )}
      {mutation.isError && (
        <p className="text-red-600 text-sm">Upload failed.</p>
      )}
    </form>
  );
}
