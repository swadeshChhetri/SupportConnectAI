// src/components/layout/Header.tsx

import { useAuthStore } from "../../../features/auth/auth.store";

// import { useAuthStore } from "../../features/auth/hooks/useAuthStore";

export default function Header() {
  const { user, org, logout } = useAuthStore();

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-gray-900">
          {org?.name ?? "Organization"}
        </span>
        <span className="text-xs text-gray-500">
          {org?.slug}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-700">{user?.name}</span>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
