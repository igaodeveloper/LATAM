import React, { useState, useCallback } from "react";
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
  Sector,
  Brush,
  ReferenceLine,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data
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

const routeData = [
  { name: "SCL-LIM", flights: 450, revenue: 1250000, loadFactor: 85 },
  { name: "SCL-EZE", flights: 380, revenue: 980000, loadFactor: 82 },
  { name: "SCL-BOG", flights: 320, revenue: 1120000, loadFactor: 78 },
  { name: "SCL-GRU", flights: 410, revenue: 1350000, loadFactor: 88 },
  { name: "SCL-MIA", flights: 280, revenue: 1820000, loadFactor: 90 },
  { name: "SCL-MAD", flights: 180, revenue: 2250000, loadFactor: 92 },
];

const aircraftData = [
  { name: "Boeing 787-9", value: 85, count: 12 },
  { name: "Airbus A320", value: 78, count: 24 },
  { name: "Boeing 777-300ER", value: 92, count: 8 },
  { name: "Airbus A350-900", value: 88, count: 10 },
  { name: "Boeing 787-8", value: 82, count: 6 },
];

const yearlyData = {
  "2021": [
    { name: "Jan", flights: 1000, onTime: 850, delayed: 130, cancelled: 20 },
    { name: "Feb", flights: 950, onTime: 800, delayed: 130, cancelled: 20 },
    { name: "Mar", flights: 1100, onTime: 920, delayed: 150, cancelled: 30 },
    { name: "Apr", flights: 1050, onTime: 880, delayed: 150, cancelled: 20 },
    { name: "May", flights: 1150, onTime: 980, delayed: 140, cancelled: 30 },
    { name: "Jun", flights: 1300, onTime: 1100, delayed: 180, cancelled: 20 },
    { name: "Jul", flights: 1400, onTime: 1200, delayed: 170, cancelled: 30 },
    { name: "Aug", flights: 1350, onTime: 1150, delayed: 160, cancelled: 40 },
    { name: "Sep", flights: 1250, onTime: 1050, delayed: 170, cancelled: 30 },
    { name: "Oct", flights: 1200, onTime: 1000, delayed: 160, cancelled: 40 },
    { name: "Nov", flights: 1100, onTime: 900, delayed: 170, cancelled: 30 },
    { name: "Dec", flights: 1300, onTime: 1100, delayed: 160, cancelled: 40 },
  ],
  "2022": [
    { name: "Jan", flights: 1100, onTime: 920, delayed: 150, cancelled: 30 },
    { name: "Feb", flights: 1000, onTime: 850, delayed: 130, cancelled: 20 },
    { name: "Mar", flights: 1200, onTime: 1000, delayed: 170, cancelled: 30 },
    { name: "Apr", flights: 1100, onTime: 920, delayed: 160, cancelled: 20 },
    { name: "May", flights: 1200, onTime: 1020, delayed: 150, cancelled: 30 },
    { name: "Jun", flights: 1350, onTime: 1150, delayed: 180, cancelled: 20 },
    { name: "Jul", flights: 1450, onTime: 1250, delayed: 170, cancelled: 30 },
    { name: "Aug", flights: 1400, onTime: 1200, delayed: 160, cancelled: 40 },
    { name: "Sep", flights: 1300, onTime: 1100, delayed: 170, cancelled: 30 },
    { name: "Oct", flights: 1250, onTime: 1050, delayed: 160, cancelled: 40 },
    { name: "Nov", flights: 1150, onTime: 950, delayed: 170, cancelled: 30 },
    { name: "Dec", flights: 1350, onTime: 1150, delayed: 160, cancelled: 40 },
  ],
  "2023": flightData,
};

// Custom active shape for PieChart
const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${value} (${(percent * 100).toFixed(2)}%)`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`${payload.count} aircraft`}
      </text>
    </g>
  );
};

// Interactive Flight Status Chart
const InteractiveFlightStatusChart = () => {
  const [year, setYear] = useState("2023");
  const [chartType, setChartType] = useState("bar");
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex],
  );

  return (
    <Card className="w-full overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">
            Flight Status Overview
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2021">2021</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
              </SelectContent>
            </Select>
            <Tabs value={chartType} onValueChange={setChartType}>
              <TabsList className="grid w-[180px] grid-cols-3">
                <TabsTrigger value="bar">Bar</TabsTrigger>
                <TabsTrigger value="line">Line</TabsTrigger>
                <TabsTrigger value="area">Area</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          {chartType === "bar" ? (
            <BarChart
              data={yearlyData[year]}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                }}
              />
              <Legend />
              <Bar
                dataKey="onTime"
                name="On Time"
                fill="#4caf50"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="delayed"
                name="Delayed"
                fill="#ff9800"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="cancelled"
                name="Cancelled"
                fill="#f44336"
                radius={[4, 4, 0, 0]}
              />
              <Brush dataKey="name" height={30} stroke="#8884d8" />
            </BarChart>
          ) : chartType === "line" ? (
            <LineChart
              data={yearlyData[year]}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="flights"
                name="Total Flights"
                stroke="#2196f3"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="onTime"
                name="On Time"
                stroke="#4caf50"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="delayed"
                name="Delayed"
                stroke="#ff9800"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="cancelled"
                name="Cancelled"
                stroke="#f44336"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Brush dataKey="name" height={30} stroke="#8884d8" />
            </LineChart>
          ) : (
            <AreaChart
              data={yearlyData[year]}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <defs>
                <linearGradient id="colorFlights" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2196f3" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#2196f3" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorOnTime" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4caf50" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#4caf50" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorDelayed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff9800" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ff9800" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorCancelled" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f44336" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#f44336" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="flights"
                name="Total Flights"
                stroke="#2196f3"
                fillOpacity={1}
                fill="url(#colorFlights)"
              />
              <Area
                type="monotone"
                dataKey="onTime"
                name="On Time"
                stroke="#4caf50"
                fillOpacity={1}
                fill="url(#colorOnTime)"
              />
              <Area
                type="monotone"
                dataKey="delayed"
                name="Delayed"
                stroke="#ff9800"
                fillOpacity={1}
                fill="url(#colorDelayed)"
              />
              <Area
                type="monotone"
                dataKey="cancelled"
                name="Cancelled"
                stroke="#f44336"
                fillOpacity={1}
                fill="url(#colorCancelled)"
              />
              <Brush dataKey="name" height={30} stroke="#8884d8" />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

// Interactive Route Performance Chart
const InteractiveRoutePerformanceChart = () => {
  const [metric, setMetric] = useState("flights");

  return (
    <Card className="w-full overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">
            Route Performance Analysis
          </CardTitle>
          <Select value={metric} onValueChange={setMetric}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Metric" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="flights">Flights</SelectItem>
              <SelectItem value="revenue">Revenue</SelectItem>
              <SelectItem value="loadFactor">Load Factor</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={routeData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            layout="vertical"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" scale="band" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}
              formatter={(value) => {
                if (metric === "revenue")
                  return [`$${value.toLocaleString()}`, "Revenue"];
                if (metric === "loadFactor")
                  return [`${value}%`, "Load Factor"];
                return [value, "Flights"];
              }}
            />
            <Legend />
            <Bar
              dataKey={metric}
              name={
                metric === "revenue"
                  ? "Revenue ($)"
                  : metric === "loadFactor"
                    ? "Load Factor (%)"
                    : "Flights"
              }
              fill="#0032A0"
              radius={[0, 4, 4, 0]}
              label={{
                position: "right",
                formatter: (value) =>
                  metric === "revenue"
                    ? `$${(value / 1000).toFixed(0)}k`
                    : value,
              }}
            />
            <ReferenceLine
              x={
                metric === "flights" ? 300 : metric === "revenue" ? 1500000 : 85
              }
              stroke="#E30613"
              strokeDasharray="3 3"
              label={{ value: "Target", position: "top", fill: "#E30613" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

// Interactive Aircraft Utilization Chart
const InteractiveAircraftUtilizationChart = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex],
  );

  return (
    <Card className="w-full overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">
          Aircraft Utilization
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={aircraftData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              fill="#0032A0"
              dataKey="value"
              onMouseEnter={onPieEnter}
            >
              {aircraftData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === activeIndex ? "#E30613" : "#0032A0"}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}
              formatter={(value) => [`${value}%`, "Utilization"]}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

const InteractiveCharts = () => {
  return (
    <div className="p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 text-blue-900">
        Interactive Analytics Dashboard
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <InteractiveFlightStatusChart />
        <InteractiveAircraftUtilizationChart />
      </div>

      <div className="mb-6">
        <InteractiveRoutePerformanceChart />
      </div>

      <div className="flex justify-center mt-8">
        <Button className="bg-blue-700 hover:bg-blue-800">
          Generate Full Report
        </Button>
      </div>
    </div>
  );
};

export default InteractiveCharts;
