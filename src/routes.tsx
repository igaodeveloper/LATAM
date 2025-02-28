import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home";
import FlightManagement from "./components/flight/FlightManagement";
import CrewAllocation from "./components/crew/CrewAllocation";
import AircraftMonitoring from "./components/aircraft/AircraftMonitoring";
import EmployeeManagement from "./components/hr/EmployeeManagement";
import PerformanceReports from "./components/analytics/PerformanceReports";
import PassengerManagement from "./components/passenger/PassengerManagement";
import PortalCliente from "./components/passenger/PortalCliente";
import CheckinOnline from "./components/passenger/CheckinOnline";
import BaggageTracking from "./components/passenger/BaggageTracking";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard-administrativo" element={<Home />} />
      <Route path="/gerenciamento-de-voos" element={<FlightManagement />} />
      <Route path="/alocacao-tripulacao" element={<CrewAllocation />} />
      <Route path="/monitoramento-aeronaves" element={<AircraftMonitoring />} />
      <Route path="/gestao-funcionarios" element={<EmployeeManagement />} />
      <Route path="/relatorios-desempenho" element={<PerformanceReports />} />
      <Route path="/gestao-passageiros" element={<PassengerManagement />} />
      <Route path="/portal-cliente" element={<PortalCliente />} />
      <Route path="/checkin-online" element={<CheckinOnline />} />
      <Route path="/rastreamento-bagagem" element={<BaggageTracking />} />
      <Route path="/flights" element={<FlightManagement />} />
      <Route path="/crew" element={<CrewAllocation />} />
      <Route path="/aircraft" element={<AircraftMonitoring />} />
      <Route path="/employees" element={<EmployeeManagement />} />
      <Route path="/reports" element={<PerformanceReports />} />
      <Route path="/passengers" element={<PassengerManagement />} />
      <Route path="/customer-portal" element={<PortalCliente />} />
      <Route path="/online-checkin" element={<CheckinOnline />} />
      <Route path="/baggage-tracking" element={<BaggageTracking />} />
    </Routes>
  );
};

export default AppRoutes;
