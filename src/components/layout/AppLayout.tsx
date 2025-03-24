import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const AppLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setSidebarCollapsed(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Topbar onToggleSidebar={toggleSidebar} />

      <div className="flex flex-1 overflow-hidden pt-16 lg:pt-[6.5rem]">
        {/* Sidebar with responsive behavior */}
        <div
          className={`
            fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
            ${sidebarCollapsed ? "-translate-x-full" : "translate-x-0"}
          `}
        >
          <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
        </div>

        {/* Overlay for mobile */}
        {isMobile && sidebarCollapsed && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setSidebarCollapsed(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6 animate-fade-in">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
