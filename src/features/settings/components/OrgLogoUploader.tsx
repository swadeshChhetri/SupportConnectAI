import { useState, useRef } from "react";
import { useUploadOrgLogo } from "../hooks/useUploadOrgLogo";
import { useOrgQuery } from "../hooks/useOrgQuery";
import { Upload, Loader2, X } from "lucide-react";

export default function OrgLogoUploader() {
  const { data: org } = useOrgQuery();
  const uploadLogo = useUploadOrgLogo();

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const logoUrl = previewUrl || org?.logoUrl || null;

  const handleFileSelect = (file: File) => {
    if (!file) return;

    // Preview
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    // Upload
    uploadLogo.mutate(file, {
      onError: () => {
        URL.revokeObjectURL(url);
        setPreviewUrl(null);
      },
    });
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) handleFileSelect(file);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium">Organization Logo</label>

      <div
        className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition
          ${dragActive ? "border-blue-600 bg-blue-50" : "border-gray-300"}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
      >
        {uploadLogo.isPending ? (
          <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
        ) : logoUrl ? (
          <div className="relative">
            <img
              src={logoUrl}
              alt="Logo preview"
              className="w-24 h-24 object-cover rounded-lg shadow"
            />

            <button
              onClick={(e) => {
                e.stopPropagation();
                setPreviewUrl(null);
              }}
              className="absolute -top-2 -right-2 bg-white border rounded-full p-1 shadow"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center text-gray-500">
            <Upload className="w-6 h-6 mb-2" />
            <p className="text-sm">Click or drag a file to upload</p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG — Max 2MB</p>
          </div>
        )}

        <input
          type="file"
          ref={inputRef}
          className="hidden"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileSelect(file);
          }}
        />
      </div>

      {uploadLogo.isError && (
        <p className="text-red-500 text-sm">Failed to upload logo.</p>
      )}
    </div>
  );
}
