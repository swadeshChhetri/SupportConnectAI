import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc] font-sans px-4">
      {/* Branded Logo Link back to Landing page */}
      <a href="/home.html" className="flex items-center gap-2.5 mb-6 group transition-opacity duration-200 hover:opacity-90">
        <img
          src="/logo.png"
          alt="SupportConnectAI Logo"
          className="w-8 h-8 rounded-lg object-cover shadow-sm"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        <span className="text-lg font-medium text-slate-800 tracking-tight">
          SupportConnectAI
        </span>
      </a>

      {/* Main Light Panel */}
      <div className="w-full max-w-md p-8 bg-white border border-slate-100 shadow-xl shadow-slate-100/50 rounded-2xl">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
