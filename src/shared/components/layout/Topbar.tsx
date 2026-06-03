import { useAuthStore } from "../../store/auth.store";

export default function Topbar() {
  const org = useAuthStore((s) => s.org);
  const user = useAuthStore((s) => s.user);

  return (
    <div className="h-14 border-b flex items-center justify-between px-4 bg-white">
      <div className="font-semibold">{org?.name}</div>

      <div className="text-sm text-gray-600">
        {user?.name}
      </div>
    </div>
  );
}
