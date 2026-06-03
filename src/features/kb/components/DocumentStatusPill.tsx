import { Loader2 } from "lucide-react";

export default function DocumentStatusPill({ status }: { status: string }) {
  const base =
    "px-2 py-1 rounded text-xs font-medium inline-flex items-center gap-1";

  switch (status) {
    case "processing":
      return (
        <span className={`${base} bg-yellow-100 text-yellow-700`}>
          <Loader2 className="w-3 h-3 animate-spin" />
          Processing
        </span>
      );

    case "pending":
      return <span className={`${base} bg-gray-100 text-gray-600`}>Pending</span>;

    case "indexed":
      return <span className={`${base} bg-green-100 text-green-700`}>Indexed</span>;

    case "failed":
      return <span className={`${base} bg-red-100 text-red-700`}>Failed</span>;

    default:
      return <span className={`${base} bg-gray-100 text-gray-600`}>Unknown</span>;
  }
}
