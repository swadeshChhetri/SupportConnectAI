import { useState } from "react";
import { useUpdateOrg } from "../hooks/useUpdateOrg";
import { useOrgQuery } from './../hooks/useOrgQuery';
import OrgLogoUploader from "../components/OrgLogoUploader";

export default function GeneralSettingsPage() {
  const { data: org, isLoading } = useOrgQuery();
  const updateOrg = useUpdateOrg();

  const [name, setName] = useState("");

  if (isLoading) return <p>Loading...</p>;

  const handleSave = () => {
    const newName = name.trim() || org.name;
    updateOrg.mutate({ name: newName });
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold mb-6">Organization Settings</h1>

      <div className="bg-white p-6 rounded-lg shadow max-w-2xl space-y-6">
        {/* Logo Uploader */}
        <OrgLogoUploader />

        {/* Organization Name */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Organization Name</label>
          <input
            className="border p-2 w-full rounded"
            value={name || org.name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Slug (read only) */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Organization URL Slug</label>
          <input
            className="border p-2 w-full rounded bg-gray-100 text-gray-500"
            value={org.slug}
            readOnly
          />
          <p className="text-xs text-gray-500">
            Used in your public widget & API routes. Cannot be changed.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
