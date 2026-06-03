import { useEffect, useState } from "react";
import { fetchInvoices, type Invoice } from "../../../features/billing/billingApi";
import InvoiceRow from "../../../shared/components/ui/InvoiceRow";
// import InvoiceRow from "../../components/ui/InvoiceRow";

export default function PaymentHistoryPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    const data = await fetchInvoices();
    setInvoices(data);
    setLoading(false);
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Payment History</h1>

      <div className="bg-white shadow rounded-lg p-4">
        {loading ? (
          <p className="text-center text-gray-500 py-6">Loading...</p>
        ) : invoices.length === 0 ? (
          <p className="text-center text-gray-500 py-6">
            No invoices found.
          </p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-gray-600 border-b">
                <th className="py-2">Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Invoice</th>
              </tr>
            </thead>

            <tbody>
              {invoices.map((inv) => (
                <InvoiceRow key={inv.id} inv={inv} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
