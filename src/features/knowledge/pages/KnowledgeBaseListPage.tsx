// src/pages/knowledge/KnowledgeBaseListPage.tsx

import { Link } from "react-router-dom";
import { Trash2, FileText, Loader2 } from "lucide-react";
import { useDocumentsQuery } from "../../kb/hooks/useDocumentsQuery";
import { deleteDocument } from "../../kb/api/kbApi";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../../auth/hooks/useAuthStore";

export default function KnowledgeBaseListPage() {
  const orgId = useAuthStore((s) => s.org?.id);
  const qc = useQueryClient();

  const {
    data,
    isLoading,
    isError,
  } = useDocumentsQuery({ page: 1, pageSize: 50 });

  const docs = data?.items ?? [];

  const handleDelete = async (id: string) => {
    await deleteDocument(id);
    toast.success("Document deleted");
    qc.invalidateQueries({ queryKey: ["documents", orgId] });
  };

  if (isLoading)
    return (
      <p className="text-center mt-10 text-gray-500">Loading documents…</p>
    );

  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">
        Failed to load documents.
      </p>
    );

    console.log("Documents:", docs); // Debug log to check document data  

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Knowledge Base</h1>

        <div className="flex gap-2">
          <Link
            to="/company/knowledge/search"
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200"
          >
            Search Knowledge
          </Link>
          <Link
            to="/company/knowledge/upload"
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Upload Document
          </Link>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-4 overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-gray-600 text-sm">
              <th className="py-2">Title</th>
              {/* <th>Type</th>
              <th>Size</th> */}
              <th>Status</th>
              <th>Uploaded</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {docs.map((doc) => (
              <tr key={doc.id} className="border-b text-sm">
                <td className="py-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <Link
                    to={`/company/knowledge/${doc.id}`}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    {doc.title}
                  </Link>
                </td>
{/* 
                <td>{doc.mimeType ?? "-"}</td>
                <td>{doc.fileSize ? `${Math.round(doc.fileSize / 1024)} KB` : "-"}</td> */}

                <td>
                  {doc.status === "processing" && (
                    <span className="flex items-center gap-1 text-yellow-600">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing
                    </span>
                  )}
                  {doc.status === "pending" && (
                    <span className="text-gray-500">Pending</span>
                  )}
                  {doc.status === "completed" && (
                    <span className="text-green-600">Completed</span>
                  )}
                  {doc.status === "failed" && (
                    <span className="text-red-600">Failed</span>
                  )}
                </td>

                <td>{new Date(doc.createdAt).toLocaleString()}</td>

                <td>
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {docs.length === 0 && (
          <p className="text-center py-10 text-gray-500">
            No documents uploaded yet.
          </p>
        )}
      </div>
    </div>
  );
}
