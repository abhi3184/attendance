import React from "react";
import { Bars3Icon, BellIcon } from "@heroicons/react/24/outline";
import ProfileImage from "../assets/logo/new_color_logo.png";

export default function Header({ activeTab, onToggleSidebar }) {
  return (
    <header
      className="h-14 w-full bg-white flex items-center justify-between px-6
                 shadow-[0_1px_3px_rgba(0,0,0,0.08)] z-50"
    >
      {/* Toggle button for mobile */}
      <button
        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:scale-105"
        onClick={onToggleSidebar}
      >
        <Bars3Icon className="h-6 w-6 text-gray-700" />
      </button>

      {/* Active tab title */}
      <h1 className="text-md font-medium text-gray-800 capitalize">{activeTab}</h1>

      {/* Right side: notification + profile */}
      <div className="flex items-center gap-4">
        {/* Notification Icon */}
        <button className="p-2 rounded-lg hover:bg-purple-50 transition-all duration-200 hover:scale-105 relative">
          <BellIcon className="h-6 w-6 text-gray-700" />
          {/* Red dot for unread notifications */}
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full animate-ping"></span>
        </button>

        {/* Profile Image */}
        <img
          src={ProfileImage}
          alt="Profile"
          className="h-8 w-8 rounded-full border border-gray-200 shadow-sm hover:ring-2 hover:ring-purple-300 transition-all duration-200"
        />
      </div>
    </header>
  );
}
