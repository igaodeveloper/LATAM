import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const AppLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Topbar onToggleSidebar={toggleSidebar} />

      <div className="flex flex-1 overflow-hidden pt-16 lg:pt-[6.5rem]">
        <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />

        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
