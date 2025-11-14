"use client";
import React from "react";
import { Bell, Mail, Settings } from "lucide-react";

const TopNavbar = () => {
  return (
    <header className="max-w-full bg-[#0a1a3a] text-white ">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left section: logo and page name */}
        <div className="flex items-center gap-3">
          <div className="text-sm text-slate-200  border-slate-400 pl-3">
            Wallet 2
          </div>
        </div>

        {/* Right section: icons and settings */}
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-md hover:bg-white/10">
            <Bell size={20} />
          </button>
          <button className="p-2 rounded-md hover:bg-white/10">
            <Mail size={20} />
          </button>
          <button className="p-2 rounded-md hover:bg-white/10">
            <Settings size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
