import { Check } from "lucide-react";

export default function PlanCard({
  plan,
  current,
  onSelect,
}: {
  plan: any;
  current: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      className={`p-6 rounded-lg shadow border transition ${
        current ? "border-blue-600" : "border-gray-200"
      }`}
    >
      <h3 className="text-xl font-semibold">{plan.name}</h3>
      <p className="text-gray-500 mt-1">${plan.price}/month</p>

      <ul className="mt-4 space-y-2 text-sm">
        {plan.features.map((f: string, i: number) => (
          <li key={i} className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-600" />
            {f}
          </li>
        ))}
      </ul>

      {!current ? (
        <button
          onClick={onSelect}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md"
        >
          Upgrade
        </button>
      ) : (
        <div className="mt-4 text-center text-blue-600 font-medium">
          Current Plan
        </div>
      )}
    </div>
  );
}
