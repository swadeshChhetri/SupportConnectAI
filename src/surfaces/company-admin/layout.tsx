import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { 
  Ticket, 
  Users, 
  Settings, 
  LogOut, 
  User,
  LayoutDashboard,
  Code2,
  Building2,
  FileText
} from "lucide-react";
import { useAuthStore } from "../../features/auth/hooks/useAuthStore";

export default function CompanyAdminLayout() {
  const { user, org, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { icon: Ticket, label: "Tickets", to: "/company/tickets" },
    { icon: Users, label: "Agents", to: "/company/agents" },
    { icon: FileText, label: "Knowledge Base", to: "/company/knowledge" },
    { icon: Code2, label: "Widget", to: "/company/widget" },
    { icon: Settings, label: "Settings", to: "/company/settings" },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden text-gray-900">
      
      {/* --- Sidebar --- */}
      <aside className="w-72 bg-slate-900 text-white flex flex-col shadow-2xl z-20">
        
        {/* Brand/Logo */}
        <div className="px-8 py-10">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="SupportConnectAI Logo"
              className="w-10 h-10 rounded-xl object-cover shadow-lg shadow-emerald-950/40 transform -rotate-3"
            />
            <div>
              <h1 className="text-xl font-semibold tracking-tight">SupportConnectAI</h1>
              <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-[0.2em]">Company Admin</span>
            </div>
          </div>
        </div>

        {/* Organization Info */}
        <div className="px-6 mb-6">
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-1">Active Organization</p>
            <p className="text-sm font-semibold text-white truncate">{org?.name || "My Company"}</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1 mt-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 group
                ${isActive 
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20" 
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }
              `}
            >
              {({ isActive }) => (
                <>
                  <item.icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                  {item.label}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User Profile & Logout Section */}
        <div className="p-6 bg-slate-950/50 border-t border-slate-800">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 shadow-inner overflow-hidden">
              <User className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{user?.name || "Admin User"}</p>
              <p className="text-[10px] font-semibold text-emerald-400 uppercase tracking-tighter truncate opacity-70">{user?.role || "OWNER"}</p>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-300 group border border-transparent hover:border-red-500/20"
          >
            <LogOut className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* --- Main Content Area --- */}
      <main className="flex-1 overflow-hidden flex flex-col relative bg-[#f8fafc]">
        {/* Abstract background shapes for depth */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-100/30 rounded-full blur-[120px] pointer-events-none -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-100/20 rounded-full blur-[100px] pointer-events-none -ml-32 -mb-32" />
        
        <div className="flex-1 relative z-10 overflow-y-auto custom-scrollbar p-8">
          <Outlet />
        </div>
      </main>

    </div>
  );
}
