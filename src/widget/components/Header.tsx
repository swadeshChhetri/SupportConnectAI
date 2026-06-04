import React from "react";
import { useTheme } from "../context/ThemeContext";

export default function Header() {
  const { orgLogo, aiAvatar, primaryColor, welcomeMessage } = useTheme();

  return (
    <div
      className="flex items-center gap-4 px-5 py-4 border-b border-gray-200 shadow-sm"
      style={{ backgroundColor: primaryColor }}
    >
      {/* Left Section */}
      <div className="flex items-center gap-3">
        {orgLogo ? (
          <img
            src={orgLogo}
            alt="Organization"
            className="w-9 h-9 rounded-xl object-cover bg-white/20 backdrop-blur-sm"
          />
        ) : (
          <img
            src="/logo.png"
            alt="SupportConnectAI Logo"
            className="w-9 h-9 rounded-xl object-cover bg-white/20 backdrop-blur-sm"
          />
        )}

        <div className="flex flex-col text-white">
          <span className="font-semibold text-sm leading-tight">
            SupportConnectAI
          </span>

          <div className="flex items-center gap-2 text-xs opacity-90">
            <span className="w-2 h-2 rounded-full bg-green-400" />
            <span>
              {welcomeMessage ?? "Typically replies within a minute"}
            </span>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="ml-auto flex items-center gap-3">
        {aiAvatar && (
          <img
            src={aiAvatar}
            alt="AI"
            className="w-9 h-9 rounded-full object-cover border border-white/40 shadow-sm"
          />
        )}
      </div>
    </div>
  );
}
