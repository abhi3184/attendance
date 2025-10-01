import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  CalendarDaysIcon,
  ClockIcon,
  CheckCircleIcon,
  ChartBarIcon
} from "@heroicons/react/24/outline";
import * as jwtDecode from "jwt-decode";

const roleMap = {
  1: "hr",
  2: "manager",
  3: "employee",
};

const allTabs = [
  { key: "home", label: "Home", paths: ["/home/ppreview", "/home/leave-preview", "/home/attendance-preview"], roles: ["admin", "hr", "employee"], icon: HomeIcon },
  { key: "leave", label: "Leave Tracker", paths: ["/leave"], roles: ["manager", "hr", "employee"], icon: CalendarDaysIcon },
  { key: "manager-leave", label: "Leave Tracker", paths: ["/manager-leave"], roles: ["manager"], icon: CalendarDaysIcon },
  { key: "time", label: "Time Tracker", paths: ["/home/attendance"], roles: ["manager", "hr", "employee"], icon: ClockIcon },
  { key: "attendance", label: "Attendance", paths: ["/home/attendance"], roles: ["manager", "hr", "employee"], icon: CheckCircleIcon },
];

export default function Sidebar({ isOpen, onClose }) {
  const [userRole, setUserRole] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode.default(token);
        const mappedRole = roleMap[decoded.role] || null;
        setUserRole(mappedRole);
      } catch (err) {
        console.error("Invalid token", err);
        setUserRole(null);
      }
    }
  }, []);

  const filteredTabs = allTabs.filter(tab => userRole && tab.roles.includes(userRole));

  return (
    <aside
      className={`fixed md:static top-0 left-0 h-screen w-20 z-20
        bg-white border-r shadow-md transform transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
    >
      <div className="flex flex-col h-full justify-start py-4">
        <div className="flex flex-col items-center mb-4">
          <span className="font-bold text-lg">Logo</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          {filteredTabs.map(({ key, label, icon: Icon, paths }) => {
            // ✅ Active if current location matches any of tab paths
            const isActive = location.pathname.includes(key);

            return (
              <button
                type="button"
                key={key}
                onClick={() => {
                  navigate(`/dashboard${paths[0]}`); // navigate to first path
                  if (onClose) onClose();
                }}
                className="flex flex-col items-center gap-1 w-full py-1.5 transition-all"
              >
                <div
                  className={`h-10 w-10 flex items-center justify-center rounded-xl transition-all
                    ${isActive ? "bg-purple-600 shadow-md" : "hover:bg-purple-100 hover:shadow"}`}
                >
                  <Icon className={`h-6 w-6 ${isActive ? "text-white" : "text-gray-500"}`} />
                </div>
                <span
                  className={`text-[10px] ${isActive ? "font-bold text-gray-800" : "font-medium text-gray-500"}`}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-col items-center mt-auto mb-4 gap-3">
          <button
            type="button"
            onClick={() => navigate("/dashboard/report")}
            className="flex flex-col items-center gap-1 w-full py-1.5 transition-all"
          >
            <div
              className={`h-10 w-10 flex items-center justify-center rounded-xl transition-all
        ${location.pathname.endsWith("/report") ? "bg-purple-600 shadow-md" : "hover:bg-purple-100 hover:shadow"}`}
            >
              <ChartBarIcon
                className={`h-6 w-6 ${location.pathname.endsWith("/report") ? "text-white" : "text-gray-500"
                  }`}
              />
            </div>
            <span
              className={`text-[10px] ${location.pathname.endsWith("/report") ? "font-bold text-gray-800" : "font-medium text-gray-500"
                }`}
            >
              Reports
            </span>
          </button>
        </div>

      </div>
    </aside>
  );
}