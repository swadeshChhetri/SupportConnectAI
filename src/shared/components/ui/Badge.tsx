export default function Badge({
  color,
  children,
}: {
  color: "green" | "yellow" | "red" | "gray" | "blue" | "indigo";
  children: React.ReactNode;
}) {
  const colors: Record<string, string> = {
    green: "bg-green-100 text-green-700 border-green-200",
    yellow: "bg-yellow-100 text-yellow-700 border-yellow-200",
    red: "bg-red-100 text-red-700 border-red-200",
    gray: "bg-gray-100 text-gray-700 border-gray-200",
    blue: "bg-blue-100 text-blue-700 border-blue-200",
    indigo: "bg-indigo-100 text-indigo-700 border-indigo-200",
  };

  return (
    <span
      className={`px-2.5 py-0.5 text-[11px] rounded-full font-bold uppercase tracking-wider border ${colors[color]}`}
    >
      {children}
    </span>
  );
}
