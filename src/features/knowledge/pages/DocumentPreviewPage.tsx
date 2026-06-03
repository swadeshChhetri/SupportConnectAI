import { useParams } from "react-router-dom";
import { useDocumentQuery } from "../../kb/hooks/useDocumentQuery";
import DocumentStatusPill from "../../kb/components/DocumentStatusPill";

export default function DocumentPreviewPage() {
  const { id } = useParams();
  const { data: doc, isLoading, isError } = useDocumentQuery(id!);

  if (isLoading)
    return <p className="text-center mt-10 text-gray-500">Loading…</p>;

  if (isError || !doc)
    return <p className="text-center mt-10 text-red-500">Document not found.</p>;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">{doc.title}</h1>

      <div className="bg-white p-6 rounded shadow space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p><strong>Type:</strong> {doc.mimeType ?? "Unknown"}</p>
            <p><strong>Size:</strong> {doc.fileSize ? `${Math.round(doc.fileSize / 1024)} KB` : "-"}</p>
            <p><strong>Uploaded:</strong> {new Date(doc.createdAt).toLocaleString()}</p>
          </div>
          <DocumentStatusPill status={doc.status} />
        </div>

        {doc.errorMessage && (
          <div className="p-3 bg-red-100 text-red-700 rounded">
            <strong>Indexing Failed:</strong> {doc.errorMessage}
          </div>
        )}

        {/* Optional preview */}
        {doc.previewText && (
          <div>
            <h3 className="font-medium mb-1">Preview</h3>
            <div className="p-3 border rounded bg-gray-50 whitespace-pre-line text-sm">
              {doc.previewText}
            </div>
          </div>
        )}

        {!doc.previewText && (
          <p className="text-gray-500 text-sm">
            No preview available.
          </p>
        )}
      </div>
    </div>
  );
}
