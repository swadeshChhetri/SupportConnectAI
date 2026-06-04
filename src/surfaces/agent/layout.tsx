import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { 
  Inbox, 
  BarChart3, 
  BookOpen, 
  Settings, 
  LogOut, 
  User,
  ShieldCheck,
  LayoutDashboard
} from "lucide-react";
import { useAuthStore } from "../../features/auth/hooks/useAuthStore";

export default function AgentLayout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", to: "/agent/dashboard", end: true },
    { icon: Inbox, label: "Tickets", to: "/agent/tickets" },
    { icon: BookOpen, label: "Knowledge Base", to: "/agent/kb" },
    { icon: BarChart3, label: "Analytics", to: "/agent/analytics" },
    { icon: Settings, label: "Settings", to: "/agent/settings" },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      
      {/* --- Sidebar --- */}
      <aside className="w-72 bg-white border-r border-gray-200 flex flex-col shadow-sm">
        
        {/* Brand/Logo */}
        <div className="px-8 py-8">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="SupportConnectAI Logo"
              className="w-10 h-10 rounded-xl object-cover shadow-lg shadow-blue-500/20"
            />
            <div>
              <h1 className="text-xl font-black text-gray-900 tracking-tight">SupportConnectAI</h1>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Agent Portal</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto mt-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200
                ${isActive 
                  ? "bg-blue-50 text-blue-600 shadow-sm" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }
              `}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3 px-2 py-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-400 shadow-sm overflow-hidden">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <User className="w-5 h-5" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate">{user?.name || "Support Agent"}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="w-full mt-2 flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group"
          >
            <LogOut className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            Logout Account
          </button>
        </div>
      </aside>

      {/* --- Main Content Area --- */}
      <main className="flex-1 overflow-hidden flex flex-col relative">
        {/* Subtle decorative elements for the background */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-50/50 rounded-full blur-[100px] pointer-events-none -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-purple-50/50 rounded-full blur-[100px] pointer-events-none -ml-32 -mb-32" />
        
        <div className="flex-1 relative z-10 overflow-y-auto">
          <Outlet />
        </div>
      </main>

    </div>
  );
}
