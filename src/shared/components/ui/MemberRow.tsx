import { Trash2, Shield } from "lucide-react";

export default function MemberRow({
  member,
  onRoleChange,
  onRemove,
}: {
  member: any;
  onRoleChange: (role: "ADMIN" | "AGENT") => void;
  onRemove: () => void;
}) {
  return (
    <tr className="border-b text-sm">
      <td className="py-2">{member.name}</td>
      <td>{member.email}</td>
      <td>
        <select
          className="border p-1 rounded"
          value={member.role}
          onChange={(e) => onRoleChange(e.target.value as any)}
        >
          <option value="ADMIN">Admin</option>
          <option value="AGENT">Agent</option>
        </select>
      </td>
      <td>
        <span
          className={`px-2 py-1 rounded text-xs ${
            member.status === "active"
              ? "bg-green-100 text-green-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {member.status}
        </span>
      </td>
      <td>
        <button
          className="text-red-600 hover:text-red-800"
          onClick={onRemove}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
}
