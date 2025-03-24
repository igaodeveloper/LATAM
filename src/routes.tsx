import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
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
import WelcomeScreen from "./components/welcome/WelcomeScreen";
import PageTransition from "./components/PageTransition";

const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition>
            <WelcomeScreen />
          </PageTransition>
        } />
        <Route path="/dashboard" element={
          <PageTransition>
            <Home />
          </PageTransition>
        } />
        <Route path="/dashboard-administrativo" element={
          <PageTransition>
            <Home />
          </PageTransition>
        } />
        <Route path="/gerenciamento-de-voos" element={
          <PageTransition>
            <FlightManagement />
          </PageTransition>
        } />
        <Route path="/alocacao-tripulacao" element={
          <PageTransition>
            <CrewAllocation />
          </PageTransition>
        } />
        <Route path="/monitoramento-aeronaves" element={
          <PageTransition>
            <AircraftMonitoring />
          </PageTransition>
        } />
        <Route path="/gestao-funcionarios" element={
          <PageTransition>
            <EmployeeManagement />
          </PageTransition>
        } />
        <Route path="/relatorios-desempenho" element={
          <PageTransition>
            <PerformanceReports />
          </PageTransition>
        } />
        <Route path="/gestao-passageiros" element={
          <PageTransition>
            <PassengerManagement />
          </PageTransition>
        } />
        <Route path="/portal-cliente" element={
          <PageTransition>
            <PortalCliente />
          </PageTransition>
        } />
        <Route path="/checkin-online" element={
          <PageTransition>
            <CheckinOnline />
          </PageTransition>
        } />
        <Route path="/rastreamento-bagagem" element={
          <PageTransition>
            <BaggageTracking />
          </PageTransition>
        } />
        <Route path="/flights" element={
          <PageTransition>
            <FlightManagement />
          </PageTransition>
        } />
        <Route path="/crew" element={
          <PageTransition>
            <CrewAllocation />
          </PageTransition>
        } />
        <Route path="/aircraft" element={
          <PageTransition>
            <AircraftMonitoring />
          </PageTransition>
        } />
        <Route path="/employees" element={
          <PageTransition>
            <EmployeeManagement />
          </PageTransition>
        } />
        <Route path="/reports" element={
          <PageTransition>
            <PerformanceReports />
          </PageTransition>
        } />
        <Route path="/passengers" element={
          <PageTransition>
            <PassengerManagement />
          </PageTransition>
        } />
        <Route path="/customer-portal" element={
          <PageTransition>
            <PortalCliente />
          </PageTransition>
        } />
        <Route path="/online-checkin" element={
          <PageTransition>
            <CheckinOnline />
          </PageTransition>
        } />
        <Route path="/baggage-tracking" element={
          <PageTransition>
            <BaggageTracking />
          </PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
