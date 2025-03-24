import React from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Scatter,
  ScatterChart,
  ZAxis,
  ComposedChart,
  Treemap,
  Sankey,
  Brush,
  ReferenceLine,
} from "recharts";
import { Card } from "../ui/card";

// Flight Status Data
const flightStatusData = [
  { name: "Jan", onTime: 420, delayed: 45, cancelled: 12 },
  { name: "Feb", onTime: 380, delayed: 38, cancelled: 8 },
  { name: "Mar", onTime: 450, delayed: 52, cancelled: 15 },
  { name: "Apr", onTime: 410, delayed: 40, cancelled: 10 },
  { name: "May", onTime: 440, delayed: 35, cancelled: 7 },
  { name: "Jun", onTime: 470, delayed: 48, cancelled: 14 },
  { name: "Jul", onTime: 490, delayed: 55, cancelled: 18 },
  { name: "Aug", onTime: 520, delayed: 42, cancelled: 11 },
  { name: "Sep", onTime: 480, delayed: 38, cancelled: 9 },
  { name: "Oct", onTime: 460, delayed: 44, cancelled: 13 },
  { name: "Nov", onTime: 430, delayed: 36, cancelled: 8 },
  { name: "Dec", onTime: 500, delayed: 50, cancelled: 16 },
];

// Aircraft Utilization Data
const aircraftUtilizationData = [
  { name: "Boeing 787-9", value: 85 },
  { name: "Airbus A320", value: 78 },
  { name: "Boeing 777-300ER", value: 92 },
  { name: "Airbus A350-900", value: 88 },
  { name: "Boeing 787-8", value: 82 },
];

// Route Performance Data
const routePerformanceData = [
  { name: "SCL-LIM", onTimePerformance: 92, loadFactor: 85, revenue: 12500 },
  { name: "SCL-EZE", onTimePerformance: 88, loadFactor: 82, revenue: 9800 },
  { name: "SCL-BOG", onTimePerformance: 85, loadFactor: 78, revenue: 11200 },
  { name: "SCL-GRU", onTimePerformance: 90, loadFactor: 88, revenue: 13500 },
  { name: "SCL-MIA", onTimePerformance: 82, loadFactor: 90, revenue: 18200 },
  { name: "SCL-MAD", onTimePerformance: 78, loadFactor: 92, revenue: 22500 },
];

// Crew Allocation Data
const crewAllocationData = [
  { subject: "Pilots", A: 120, B: 110, fullMark: 150 },
  { subject: "Co-Pilots", A: 98, B: 130, fullMark: 150 },
  { subject: "Flight Attendants", A: 86, B: 130, fullMark: 150 },
  { subject: "Ground Crew", A: 99, B: 100, fullMark: 150 },
  { subject: "Maintenance", A: 85, B: 90, fullMark: 150 },
];

// Maintenance Data
const maintenanceData = [
  { x: 100, y: 200, z: 200, name: "Boeing 787-9", status: "On Schedule" },
  { x: 120, y: 100, z: 260, name: "Airbus A320", status: "Delayed" },
  { x: 170, y: 300, z: 400, name: "Boeing 777-300ER", status: "On Schedule" },
  { x: 140, y: 250, z: 280, name: "Airbus A350-900", status: "Urgent" },
  { x: 150, y: 400, z: 500, name: "Boeing 787-8", status: "On Schedule" },
  { x: 110, y: 280, z: 200, name: "Airbus A320neo", status: "Delayed" },
];

// Financial Performance Data
const financialData = [
  { name: "Jan", revenue: 4000, expenses: 2400, profit: 1600 },
  { name: "Feb", revenue: 3000, expenses: 1398, profit: 1602 },
  { name: "Mar", revenue: 2000, expenses: 9800, profit: -7800 },
  { name: "Apr", revenue: 2780, expenses: 3908, profit: -1128 },
  { name: "May", revenue: 1890, expenses: 4800, profit: -2910 },
  { name: "Jun", revenue: 2390, expenses: 3800, profit: -1410 },
  { name: "Jul", revenue: 3490, expenses: 4300, profit: -810 },
  { name: "Aug", revenue: 4000, expenses: 2400, profit: 1600 },
  { name: "Sep", revenue: 5000, expenses: 3398, profit: 1602 },
  { name: "Oct", revenue: 6000, expenses: 4800, profit: 1200 },
  { name: "Nov", revenue: 7000, expenses: 4300, profit: 2700 },
  { name: "Dec", revenue: 9000, expenses: 5800, profit: 3200 },
];

// Passenger Demographics Data
const passengerDemographicsData = [
  { name: "Business", value: 35 },
  { name: "Economy Premium", value: 25 },
  { name: "Economy", value: 40 },
];

// Fuel Consumption Data
const fuelConsumptionData = [
  { name: "Jan", consumption: 4000, efficiency: 80 },
  { name: "Feb", consumption: 3800, efficiency: 82 },
  { name: "Mar", consumption: 4200, efficiency: 78 },
  { name: "Apr", consumption: 3900, efficiency: 81 },
  { name: "May", consumption: 3600, efficiency: 84 },
  { name: "Jun", consumption: 3800, efficiency: 82 },
  { name: "Jul", consumption: 4100, efficiency: 79 },
  { name: "Aug", consumption: 4300, efficiency: 77 },
  { name: "Sep", consumption: 4000, efficiency: 80 },
  { name: "Oct", consumption: 3700, efficiency: 83 },
  { name: "Nov", consumption: 3900, efficiency: 81 },
  { name: "Dec", consumption: 4200, efficiency: 78 },
];

// Sankey Data for Passenger Flow
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

// Colors
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
];
const RED_COLORS = [
  "#ffcdd2",
  "#ef9a9a",
  "#e57373",
  "#ef5350",
  "#f44336",
  "#e53935",
  "#d32f2f",
  "#c62828",
  "#b71c1c",
];
const BLUE_COLORS = [
  "#bbdefb",
  "#90caf9",
  "#64b5f6",
  "#42a5f5",
  "#2196f3",
  "#1e88e5",
  "#1976d2",
  "#1565c0",
  "#0d47a1",
];
const GREEN_COLORS = [
  "#c8e6c9",
  "#a5d6a7",
  "#81c784",
  "#66bb6a",
  "#4caf50",
  "#43a047",
  "#388e3c",
  "#2e7d32",
  "#1b5e20",
];

export const FlightStatusChart = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart
        data={flightStatusData}
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
        <XAxis dataKey="name" scale="band" />
        <YAxis />
        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
          formatter={(value, name) => [
            value,
            name === "onTime"
              ? "On Time"
              : name === "delayed"
                ? "Delayed"
                : "Cancelled",
          ]}
        />
        <Legend />
        <Bar
          dataKey="onTime"
          stackId="a"
          fill="#4caf50"
          name="On Time"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="delayed"
          stackId="a"
          fill="#ff9800"
          name="Delayed"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="cancelled"
          stackId="a"
          fill="#f44336"
          name="Cancelled"
          radius={[4, 4, 0, 0]}
        />
        <Line
          type="monotone"
          dataKey="onTime"
          stroke="#2196f3"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Brush dataKey="name" height={30} stroke="#8884d8" />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export const AircraftUtilizationChart = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={aircraftUtilizationData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={150}
          innerRadius={60}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) =>
            `${name}: ${(percent * 100).toFixed(0)}%`
          }
          animationBegin={0}
          animationDuration={1500}
        >
          {aircraftUtilizationData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => [`${value}%`, "Utilization"]}
          contentStyle={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        />
        <Legend layout="vertical" verticalAlign="middle" align="right" />
      </PieChart>
    </ResponsiveContainer>
  );
};

export const RoutePerformanceChart = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={routePerformanceData}
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        />
        <Legend />
        <Bar
          yAxisId="left"
          dataKey="onTimePerformance"
          name="On-Time Performance (%)"
          fill="#8884d8"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          yAxisId="left"
          dataKey="loadFactor"
          name="Load Factor (%)"
          fill="#82ca9d"
          radius={[4, 4, 0, 0]}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="revenue"
          name="Revenue ($)"
          stroke="#ff7300"
          strokeWidth={3}
          dot={{ r: 5 }}
          activeDot={{ r: 8 }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export const CrewAllocationChart = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={crewAllocationData}>
        <PolarGrid stroke="#e0e0e0" />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fill: "#666", fontSize: 14 }}
        />
        <PolarRadiusAxis angle={90} domain={[0, 150]} />
        <Radar
          name="Allocated"
          dataKey="A"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
        <Radar
          name="Required"
          dataKey="B"
          stroke="#82ca9d"
          fill="#82ca9d"
          fillOpacity={0.6}
        />
        <Legend />
        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export const MaintenanceStatusChart = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
        <XAxis type="number" dataKey="x" name="Flight Hours" unit="h" />
        <YAxis
          type="number"
          dataKey="y"
          name="Days Since Last Maintenance"
          unit=" days"
        />
        <ZAxis
          type="number"
          dataKey="z"
          range={[100, 500]}
          name="Maintenance Priority"
        />
        <Tooltip
          cursor={{ strokeDasharray: "3 3" }}
          contentStyle={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
          formatter={(value, name, props) => {
            if (name === "Maintenance Priority") return [value, name];
            if (name === "Flight Hours") return [`${value} hours`, name];
            if (name === "Days Since Last Maintenance")
              return [`${value} days`, name];
            return [value, name];
          }}
          wrapperStyle={{ zIndex: 100 }}
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload;
              return (
                <div
                  className="custom-tooltip"
                  style={{
                    backgroundColor: "#fff",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                  }}
                >
                  <p
                    className="label"
                    style={{ margin: 0, fontWeight: "bold" }}
                  >
                    {data.name}
                  </p>
                  <p className="label" style={{ margin: 0 }}>
                    Status:{" "}
                    <span
                      style={{
                        color:
                          data.status === "Urgent"
                            ? "#f44336"
                            : data.status === "Delayed"
                              ? "#ff9800"
                              : "#4caf50",
                      }}
                    >
                      {data.status}
                    </span>
                  </p>
                  <p className="label" style={{ margin: 0 }}>
                    Flight Hours: {data.x}h
                  </p>
                  <p className="label" style={{ margin: 0 }}>
                    Days Since Maintenance: {data.y}
                  </p>
                  <p className="label" style={{ margin: 0 }}>
                    Priority Score: {data.z}
                  </p>
                </div>
              );
            }
            return null;
          }}
        />
        <Legend />
        <Scatter
          name="Aircraft Maintenance Status"
          data={maintenanceData}
          fill="#8884d8"
          shape={(props) => {
            const { cx, cy, fill } = props;
            const data = props.payload;
            const color =
              data.status === "Urgent"
                ? "#f44336"
                : data.status === "Delayed"
                  ? "#ff9800"
                  : "#4caf50";
            return (
              <circle
                cx={cx}
                cy={cy}
                r={10}
                fill={color}
                stroke="#fff"
                strokeWidth={2}
              />
            );
          }}
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export const FinancialPerformanceChart = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart
        data={financialData}
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
        <XAxis dataKey="name" scale="band" />
        <YAxis />
        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
          formatter={(value) => [`$${value.toLocaleString()}`, ""]}
        />
        <Legend />
        <Bar
          dataKey="revenue"
          name="Revenue"
          fill="#4caf50"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="expenses"
          name="Expenses"
          fill="#f44336"
          radius={[4, 4, 0, 0]}
        />
        <Line
          type="monotone"
          dataKey="profit"
          name="Profit"
          stroke="#2196f3"
          strokeWidth={3}
          dot={{ r: 5 }}
          activeDot={{ r: 8 }}
        />
        <ReferenceLine y={0} stroke="#000" strokeDasharray="3 3" />
        <Brush dataKey="name" height={30} stroke="#8884d8" />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export const PassengerDemographicsChart = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={passengerDemographicsData}
          cx="50%"
          cy="50%"
          labelLine={true}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) =>
            `${name}: ${(percent * 100).toFixed(0)}%`
          }
          animationBegin={0}
          animationDuration={1500}
        >
          {passengerDemographicsData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={BLUE_COLORS[index * 3]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => [`${value}%`, "Percentage"]}
          contentStyle={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export const FuelConsumptionChart = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart
        data={fuelConsumptionData}
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
        <XAxis dataKey="name" scale="band" />
        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        />
        <Legend />
        <Bar
          yAxisId="left"
          dataKey="consumption"
          name="Fuel Consumption (L)"
          fill="#8884d8"
          radius={[4, 4, 0, 0]}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="efficiency"
          name="Fuel Efficiency (%)"
          stroke="#82ca9d"
          strokeWidth={3}
          dot={{ r: 5 }}
          activeDot={{ r: 8 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export const PassengerFlowChart = () => {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <Sankey
        data={passengerFlowData}
        nodePadding={50}
        nodeWidth={10}
        linkCurvature={0.5}
        iterations={64}
        link={{ stroke: "#aaa" }}
        node={{
          stroke: "#fff",
          strokeWidth: 2,
          fill: "#8884d8",
        }}
        margin={{ top: 20, right: 160, bottom: 20, left: 20 }}
      >
        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
          formatter={(value, name) => [value, name]}
        />
      </Sankey>
    </ResponsiveContainer>
  );
};

export const AdvancedChartsDashboard = () => {
  return (
    <div className="p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">
        LATAM Airlines Analytics Dashboard
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Flight Status Overview</h2>
          <FlightStatusChart />
        </Card>

        <Card className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Aircraft Utilization</h2>
          <AircraftUtilizationChart />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">
            Route Performance Analysis
          </h2>
          <RoutePerformanceChart />
        </Card>

        <Card className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Crew Allocation Status</h2>
          <CrewAllocationChart />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Maintenance Status</h2>
          <MaintenanceStatusChart />
        </Card>

        <Card className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Financial Performance</h2>
          <FinancialPerformanceChart />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Passenger Demographics</h2>
          <PassengerDemographicsChart />
        </Card>

        <Card className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">
            Fuel Consumption & Efficiency
          </h2>
          <FuelConsumptionChart />
        </Card>
      </div>

      <div className="mb-6">
        <Card className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">
            Passenger Flow Between Destinations
          </h2>
          <PassengerFlowChart />
        </Card>
      </div>
    </div>
  );
};

export default AdvancedChartsDashboard;
