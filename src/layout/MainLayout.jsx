import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Determine active tab from current route
  const activeTab = location.pathname.split("/")[1] || "home";

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onChangeTab={(tab) => navigate(`/${tab}`)}
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          activeTab={activeTab}
          onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
        />

        {/* Main scrollable area */}
        <main className="flex-1 overflow-hidden p-1 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
