import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Ticket,
  MessageSquare,
  BookText,
  BarChart3,
  Settings,
  Bot,
  CreditCard,
} from "lucide-react";
import { useAuthStore } from "../../../features/auth/auth.store";
// import { useAuthStore } from "../../features/auth/hooks/useAuthStore";

export default function Sidebar() {
  const { user } = useAuthStore();

  const menu = [
    {
      label: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      to: "/dashboard",
    },
    {
      label: "Tickets",
      icon: <Ticket className="w-5 h-5" />,
      to: "/dashboard/tickets",
    },
    {
      label: "Chat",
      icon: <MessageSquare className="w-5 h-5" />,
      to: "/dashboard/chat",
    },
    {
      label: "Knowledge",
      icon: <BookText className="w-5 h-5" />,
      to: "/dashboard/knowledge",
    },
    {
      label: "Analytics",
      icon: <BarChart3 className="w-5 h-5" />,
      to: "/dashboard/analytics",
    },
    {
      label: "AI Settings",
      icon: <Bot className="w-5 h-5" />,
      to: "/dashboard/ai/settings",
    },
    {
      label: "Billing",
      icon: <CreditCard className="w-5 h-5" />,
      to: "/dashboard/billing",
    },
    {
      label: "Settings",
      icon: <Settings className="w-5 h-5" />,
      to: "/dashboard/settings/general",
    },
  ];

  return (
    <aside className="fixed left-0 top-0 w-64 h-full bg-white border-r border-gray-200 shadow-sm">
      {/* Branding */}
      <div className="h-16 px-6 flex items-center gap-3 border-b border-gray-200">
        <img
          src="/logo.png"
          alt="SupportConnectAI Logo"
          className="w-8 h-8 rounded-lg object-cover"
        />
        <h1 className="text-lg font-bold">SupportConnectAI</h1>
      </div>

      {/* User */}
      <div className="px-6 py-4 border-b border-gray-200">
        <p className="text-sm text-gray-600">Logged in as</p>
        <p className="text-md font-semibold">{user?.name ?? "Unknown"}</p>
      </div>

      {/* Nav Menu */}
      <nav className="px-3 py-4">
        <ul className="space-y-1">
          {menu.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === "/dashboard"}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
