import React from "react";
import {
  HomeIcon,
  CalendarDaysIcon,
  ClockIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import LogoImage from "../assets/logo/new_color_logo.png";

const tabs = [
  { key: "home", label: "Home", icon: HomeIcon },
  { key: "leave", label: "Leave", icon: CalendarDaysIcon },
  { key: "time", label: "Time", icon: ClockIcon },
  { key: "attendance", label: "Attendance", icon: CheckCircleIcon },
];

export default function Sidebar({ activeTab, onChangeTab, isOpen, onClose }) {
  return (
    <aside
      className={`fixed md:static top-0 left-0 h-screen w-20
        bg-white border-r shadow-md transform transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
    >
      <div className="flex flex-col h-full justify-start py-4">
        {/* Top Logo */}
        <div className="flex flex-col items-center mb-4">
          {/* <img
            src={LogoImage}
            alt="Logo"
            className="h-12 w-12 rounded-full"
          /> */}
          Logo
        </div>

        {/* Menu */}
        <div className="flex flex-col items-center gap-3">
          {tabs.map(({ key, label, icon: Icon }) => {
            const isActive = activeTab === key;

            return (
              <button
                key={key}
                onClick={() => {
                  onChangeTab(key);
                  if (onClose) onClose();
                }}
                className="flex flex-col items-center gap-1 w-full py-1.5 transition-all"
              >
                {/* Icon container */}
                <div
                  className={`h-10 w-10 flex items-center justify-center rounded-xl transition-all
                    ${isActive ? "bg-purple-600 shadow-md" : "hover:bg-purple-100 hover:shadow"}`}
                >
                  <Icon
                    className={`h-6 w-6 ${isActive ? "text-white" : "text-gray-500"}`}
                  />
                </div>

                {/* Label text bold on selected */}
                <span
                  className={`text-[10px] ${
                    isActive ? "font-bold text-gray-800" : "font-medium text-gray-500"
                  }`}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Bottom Profile */}
        <div className="flex flex-col items-center mt-auto mb-4">
          <div className="h-10 w-10 bg-gray-300 rounded-full border border-gray-200"></div>
        </div>
      </div>
    </aside>
  );
}
