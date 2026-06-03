import { useState } from "react";
import { Building2, Save, Globe, Mail, Clock, Info } from "lucide-react";
import { useAuthStore } from "../../auth/hooks/useAuthStore";

export default function OrgSettingsPage() {
  const org = useAuthStore((s) => s.org);

  if (!org) return null;

  const [name, setName] = useState(org.name);
  const [supportEmail, setSupportEmail] = useState("");
  const [timezone, setTimezone] = useState("Asia/Kolkata");

  const handleSave = () => {
    console.log({
      name,
      supportEmail,
      timezone,
    });
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Organization Settings</h1>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Update your organization's core profile</p>
        </div>
        
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl text-sm font-black shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all hover:-translate-y-1 active:translate-y-0"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Main Settings Card */}
        <div className="md:col-span-8 space-y-6">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 transition-all hover:shadow-md">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shadow-sm">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-gray-900 tracking-tight leading-tight">General Profile</h3>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Basic organization details</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Organization Name */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block ml-1">
                  Organization Name
                </label>
                <div className="relative group">
                  <Building2 className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                  <input
                    className="w-full bg-white border border-gray-200 pl-11 pr-4 py-3 rounded-xl text-sm font-medium focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all shadow-sm"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              {/* Support Email */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block ml-1">
                  Support Email
                </label>
                <div className="relative group">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                  <input
                    className="w-full bg-white border border-gray-200 pl-11 pr-4 py-3 rounded-xl text-sm font-medium focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all shadow-sm"
                    placeholder="support@yourcompany.com"
                    value={supportEmail}
                    onChange={(e) => setSupportEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Timezone */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block ml-1">
                  Operational Timezone
                </label>
                <div className="relative group">
                  <Clock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                  <select
                    className="w-full bg-white border border-gray-200 pl-11 pr-4 py-3 rounded-xl text-sm font-medium focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all shadow-sm appearance-none"
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                  >
                    <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                    <option value="UTC">Coordinated Universal Time (UTC)</option>
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="Europe/London">London (GMT/BST)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Info Card */}
        <div className="md:col-span-4 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/20 rounded-full blur-[40px] pointer-events-none -mr-12 -mt-12" />
            
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400 shadow-inner">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black tracking-tight leading-tight">ReadOnly Details</h3>
            </div>

            <div className="space-y-6 relative z-10">
              <div className="space-y-2">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Company Slug</p>
                <code className="block bg-slate-800/50 border border-slate-700/50 text-emerald-400 px-4 py-2.5 rounded-xl text-[11px] font-mono shadow-inner">
                  {org.slug}
                </code>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Registration Email</p>
                <p className="text-sm font-bold text-slate-300 break-all px-1">
                  {org.email}
                </p>
              </div>

              <div className="pt-4 flex items-start gap-3 p-4 bg-slate-800/30 border border-slate-700/50 rounded-xl">
                <div className="w-6 h-6 rounded-lg bg-slate-700 text-slate-400 flex items-center justify-center shrink-0">
                  <Info className="w-3.5 h-3.5" />
                </div>
                <p className="text-[10px] font-medium text-slate-400 leading-relaxed uppercase tracking-tighter">
                  These details were set at registration and cannot be modified directly. Please contact support for changes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}