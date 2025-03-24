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
import HelpScreen from "./components/help/HelpScreen";
import PageTransition from "./components/PageTransition";
import Settings from "./components/settings/Settings";
import AppLayout from "./components/layout/AppLayout";

// Import HR process components
import Dashboard from "./components/hr/LeaveAndTermination/Dashboard";
import Termination from "./components/hr/LeaveAndTermination/Termination";
import Leave from "./components/hr/LeaveAndTermination/Leave";
import ProcessHistory from "./components/hr/LeaveAndTermination/ProcessHistory";
import NotificationCenter from "./components/hr/LeaveAndTermination/NotificationCenter";
import CalculationSimulator from "./components/hr/LeaveAndTermination/CalculationSimulator";
import DocumentManager from "./components/hr/LeaveAndTermination/DocumentManager";

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
        
        {/* Protected routes under AppLayout */}
        <Route element={<AppLayout />}>
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
          <Route path="/settings" element={
            <PageTransition>
              <Settings />
            </PageTransition>
          } />

          {/* HR Process Routes */}
          <Route path="/hr/dashboard" element={
            <PageTransition>
              <Dashboard />
            </PageTransition>
          } />
          <Route path="/hr/rescisao" element={
            <PageTransition>
              <Termination />
            </PageTransition>
          } />
          <Route path="/hr/afastamento" element={
            <PageTransition>
              <Leave />
            </PageTransition>
          } />
          <Route path="/hr/processos" element={
            <PageTransition>
              <ProcessHistory />
            </PageTransition>
          } />
          <Route path="/hr/notificacoes" element={
            <PageTransition>
              <NotificationCenter />
            </PageTransition>
          } />
          <Route path="/hr/simulador" element={
            <PageTransition>
              <CalculationSimulator />
            </PageTransition>
          } />
          <Route path="/hr/documentos" element={
            <PageTransition>
              <DocumentManager />
            </PageTransition>
          } />
        </Route>

        {/* Public routes */}
        <Route path="/help" element={
          <PageTransition>
            <HelpScreen />
          </PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
