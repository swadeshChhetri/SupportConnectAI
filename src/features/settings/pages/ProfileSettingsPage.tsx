// import { useProfileQuery } from "../../features/settings/hooks/useProfileQuery";
// import { useUpdateProfile } from "../../features/settings/hooks/useUpdateProfile";
import { useState } from "react";
import { useProfileQuery } from "../hooks/useProfileQuery";
import { useUpdateProfile } from "../hooks/useUpdateProfile";

export default function ProfileSettingsPage() {
  const { data: profile, isLoading } = useProfileQuery();
  const updateProfile = useUpdateProfile();

  const [name, setName] = useState("");

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-xl font-bold mb-6">Profile Settings</h1>

      <div className="bg-white p-4 rounded shadow max-w-md">
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          className="border p-2 w-full rounded"
          value={name || profile.name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => updateProfile.mutate({ name })}
        >
          Save
        </button>
      </div>
    </div>
  );
}
