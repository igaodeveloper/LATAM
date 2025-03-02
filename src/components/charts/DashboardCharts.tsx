import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChartComponent,
  BarChartComponent,
  LineChartComponent,
  PieChartComponent,
  RadarChartComponent,
  ComposedChartComponent,
  ScatterChartComponent,
  SankeyChartComponent,
  TreemapChartComponent,
} from "./ChartComponents";

// Sample data for charts
const flightData = [
  { name: "Jan", flights: 1200, onTime: 1020, delayed: 150, cancelled: 30 },
  { name: "Feb", flights: 1100, onTime: 950, delayed: 130, cancelled: 20 },
  { name: "Mar", flights: 1300, onTime: 1100, delayed: 170, cancelled: 30 },
  { name: "Apr", flights: 1150, onTime: 980, delayed: 150, cancelled: 20 },
  { name: "May", flights: 1250, onTime: 1080, delayed: 140, cancelled: 30 },
  { name: "Jun", flights: 1400, onTime: 1200, delayed: 180, cancelled: 20 },
  { name: "Jul", flights: 1500, onTime: 1300, delayed: 170, cancelled: 30 },
  { name: "Aug", flights: 1450, onTime: 1250, delayed: 160, cancelled: 40 },
  { name: "Sep", flights: 1350, onTime: 1150, delayed: 170, cancelled: 30 },
  { name: "Oct", flights: 1300, onTime: 1100, delayed: 160, cancelled: 40 },
  { name: "Nov", flights: 1200, onTime: 1000, delayed: 170, cancelled: 30 },
  { name: "Dec", flights: 1400, onTime: 1200, delayed: 160, cancelled: 40 },
];

const aircraftUtilizationData = [
  { name: "Boeing 787-9", value: 85 },
  { name: "Airbus A320", value: 78 },
  { name: "Boeing 777-300ER", value: 92 },
  { name: "Airbus A350-900", value: 88 },
  { name: "Boeing 787-8", value: 82 },
];

const routePerformanceData = [
  { name: "SCL-LIM", onTimePerformance: 92, loadFactor: 85, revenue: 12500 },
  { name: "SCL-EZE", onTimePerformance: 88, loadFactor: 82, revenue: 9800 },
  { name: "SCL-BOG", onTimePerformance: 85, loadFactor: 78, revenue: 11200 },
  { name: "SCL-GRU", onTimePerformance: 90, loadFactor: 88, revenue: 13500 },
  { name: "SCL-MIA", onTimePerformance: 82, loadFactor: 90, revenue: 18200 },
  { name: "SCL-MAD", onTimePerformance: 78, loadFactor: 92, revenue: 22500 },
];

const crewAllocationData = [
  { subject: "Pilots", allocated: 120, required: 110 },
  { subject: "Co-Pilots", allocated: 98, required: 130 },
  { subject: "Flight Attendants", allocated: 86, required: 130 },
  { subject: "Ground Crew", allocated: 99, required: 100 },
  { subject: "Maintenance", allocated: 85, required: 90 },
];

const maintenanceData = [
  { x: 100, y: 200, z: 200, name: "Boeing 787-9", status: "On Schedule" },
  { x: 120, y: 100, z: 260, name: "Airbus A320", status: "Delayed" },
  { x: 170, y: 300, z: 400, name: "Boeing 777-300ER", status: "On Schedule" },
  { x: 140, y: 250, z: 280, name: "Airbus A350-900", status: "Urgent" },
  { x: 150, y: 400, z: 500, name: "Boeing 787-8", status: "On Schedule" },
  { x: 110, y: 280, z: 200, name: "Airbus A320neo", status: "Delayed" },
];

const financialData = [
  { name: "Jan", revenue: 4000, expenses: 2400, profit: 1600 },
  { name: "Feb", revenue: 3000, expenses: 1398, profit: 1602 },
  { name: "Mar", revenue: 2000, expenses: 1800, profit: 200 },
  { name: "Apr", revenue: 2780, expenses: 1908, profit: 872 },
  { name: "May", revenue: 1890, expenses: 1800, profit: 90 },
  { name: "Jun", revenue: 2390, expenses: 1800, profit: 590 },
  { name: "Jul", revenue: 3490, expenses: 2300, profit: 1190 },
  { name: "Aug", revenue: 4000, expenses: 2400, profit: 1600 },
  { name: "Sep", revenue: 5000, expenses: 3398, profit: 1602 },
  { name: "Oct", revenue: 6000, expenses: 4800, profit: 1200 },
  { name: "Nov", revenue: 7000, expenses: 4300, profit: 2700 },
  { name: "Dec", revenue: 9000, expenses: 5800, profit: 3200 },
];

const passengerFlowData = {
  nodes: [
    { name: "Santiago" },
    { name: "Lima" },
    { name: "Buenos Aires" },
    { name: "São Paulo" },
    { name: "Bogotá" },
    { name: "Miami" },
    { name: "Madrid" },
  ],
  links: [
    { source: 0, target: 1, value: 3500 },
    { source: 0, target: 2, value: 3000 },
    { source: 0, target: 3, value: 2800 },
    { source: 0, target: 4, value: 2200 },
    { source: 0, target: 5, value: 1800 },
    { source: 0, target: 6, value: 1500 },
    { source: 1, target: 2, value: 800 },
    { source: 1, target: 3, value: 600 },
    { source: 2, target: 3, value: 900 },
    { source: 3, target: 4, value: 700 },
    { source: 4, target: 5, value: 500 },
    { source: 5, target: 6, value: 400 },
  ],
};

const marketShareData = [
  { name: "LATAM", size: 4000 },
  { name: "Avianca", size: 3000 },
  { name: "Gol", size: 2800 },
  { name: "Azul", size: 2500 },
  { name: "Copa", size: 1800 },
  { name: "Aerolíneas Argentinas", size: 1500 },
];

const DashboardCharts = () => {
  return (
    <div className="p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 text-blue-900">
        LATAM Airlines Analytics Dashboard
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ComposedChartComponent
          data={flightData}
          barKeys={[
            { dataKey: "onTime", name: "On Time", color: "#4caf50" },
            { dataKey: "delayed", name: "Delayed", color: "#ff9800" },
            { dataKey: "cancelled", name: "Cancelled", color: "#f44336" },
          ]}
          lineKeys={[
            { dataKey: "flights", name: "Total Flights", color: "#2196f3" },
          ]}
          title="Flight Status Overview"
          height={350}
        />

        <PieChartComponent
          data={aircraftUtilizationData}
          dataKey="value"
          nameKey="name"
          title="Aircraft Utilization (%)"
          height={350}
          donut={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <BarChartComponent
          data={routePerformanceData}
          dataKeys={[
            { dataKey: "onTimePerformance", name: "On-Time Performance (%)" },
            { dataKey: "loadFactor", name: "Load Factor (%)" },
          ]}
          title="Route Performance Analysis"
          height={350}
        />

        <RadarChartComponent
          data={crewAllocationData}
          dataKeys={[
            { dataKey: "allocated", name: "Allocated" },
            { dataKey: "required", name: "Required" },
          ]}
          title="Crew Allocation Status"
          height={350}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ScatterChartComponent
          data={maintenanceData}
          xAxis={{ dataKey: "x", name: "Flight Hours", unit: "h" }}
          yAxis={{
            dataKey: "y",
            name: "Days Since Last Maintenance",
            unit: " days",
          }}
          zAxis={{
            dataKey: "z",
            range: [100, 500],
            name: "Maintenance Priority",
          }}
          title="Aircraft Maintenance Status"
          height={350}
        />

        <LineChartComponent
          data={financialData}
          dataKeys={[
            { dataKey: "revenue", name: "Revenue ($)", color: "#4caf50" },
            { dataKey: "expenses", name: "Expenses ($)", color: "#f44336" },
            { dataKey: "profit", name: "Profit ($)", color: "#2196f3" },
          ]}
          title="Financial Performance"
          height={350}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <SankeyChartComponent
          data={passengerFlowData}
          title="Passenger Flow Between Destinations"
          height={400}
        />

        <TreemapChartComponent
          data={marketShareData}
          dataKey="size"
          title="Market Share Analysis"
          height={400}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <AreaChartComponent
          data={flightData}
          dataKey="flights"
          title="Total Flights Trend"
          height={250}
        />

        <AreaChartComponent
          data={financialData}
          dataKey="revenue"
          title="Revenue Trend"
          height={250}
        />

        <AreaChartComponent
          data={financialData}
          dataKey="profit"
          title="Profit Trend"
          height={250}
        />
      </div>
    </div>
  );
};

export default DashboardCharts;
