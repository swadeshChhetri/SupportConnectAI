import { FileText } from "lucide-react";

export default function InvoiceRow({ inv }: { inv: any }) {
  return (
    <tr className="border-b text-sm">
      <td className="py-2">{inv.date}</td>
      <td>${inv.amount}</td>
      <td
        className={`${
          inv.status === "paid"
            ? "text-green-600"
            : inv.status === "failed"
            ? "text-red-600"
            : "text-yellow-600"
        }`}
      >
        {inv.status}
      </td>
      <td>
        <a
          href={inv.pdfUrl}
          className="text-blue-600 hover:underline flex items-center gap-1"
        >
          <FileText className="w-4 h-4" /> PDF
        </a>
      </td>
    </tr>
  );
}
