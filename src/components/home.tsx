import React, { useState, useEffect } from "react";
import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import Topbar from "./layout/Topbar";
import AlertsPanel from "./dashboard/AlertsPanel";
import FlightStatusOverview from "./dashboard/FlightStatusOverview";
import AircraftAvailability from "./dashboard/AircraftAvailability";
import OperationalKPIs from "./dashboard/OperationalKPIs";
import { Calendar } from "lucide-react";

const Home = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Topbar onToggleSidebar={toggleSidebar} />

      <div className="flex flex-1 overflow-hidden pt-16 lg:pt-[6.5rem]">
        <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />

        <main className="flex-1 overflow-auto p-6">
          <div
            className={`grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 ${isLoaded ? "animate-slide-in-up" : "opacity-0"}`}
          >
            <div className="lg:col-span-2 stagger-item">
              <FlightStatusOverview />
            </div>
            <div className="stagger-item">
              <AlertsPanel />
            </div>
          </div>

          <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 ${isLoaded ? "animate-slide-in-right" : "opacity-0"}`}
            style={{ animationDelay: "0.2s" }}
          >
            <div className="stagger-item">
              <AircraftAvailability />
            </div>
            <div className="stagger-item">
              <OperationalKPIs />
            </div>
          </div>

          <div
            className={`bg-white rounded-lg p-6 shadow-sm card-hover ${isLoaded ? "animate-slide-in-left" : "opacity-0"}`}
            style={{ animationDelay: "0.4s" }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Upcoming Schedule
              </h2>
              <div className="flex items-center text-blue-600 hover-scale transition-transform cursor-pointer">
                <Calendar className="h-5 w-5 mr-2" />
                <span className="font-medium">View Full Calendar</span>
              </div>
            </div>

            <div className="border rounded-md p-8 text-center transition-all hover:border-blue-300">
              <p className="text-gray-500">
                The detailed schedule calendar would be displayed here
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Showing upcoming flights, crew assignments, and maintenance
                events
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
