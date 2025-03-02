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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Color palettes
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
];
const LATAM_COLORS = [
  "#0032A0",
  "#E30613",
  "#1D1D1B",
  "#4A4A4A",
  "#0066CC",
  "#FF3333",
];

// Reusable chart components with consistent styling
export const AreaChartComponent = ({ data, dataKey, title, height = 300 }) => {
  return (
    <Card className="w-full overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={LATAM_COLORS[0]}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={LATAM_COLORS[0]}
                  stopOpacity={0.1}
                />
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
                border: "none",
              }}
            />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={LATAM_COLORS[0]}
              fillOpacity={1}
              fill="url(#colorGradient)"
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export const BarChartComponent = ({
  data,
  dataKeys,
  title,
  height = 300,
  stacked = false,
}) => {
  return (
    <Card className="w-full overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <BarChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                border: "none",
              }}
            />
            <Legend />
            {dataKeys.map((key, index) => (
              <Bar
                key={key.dataKey}
                dataKey={key.dataKey}
                name={key.name}
                fill={key.color || LATAM_COLORS[index % LATAM_COLORS.length]}
                stackId={stacked ? "a" : undefined}
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
                animationEasing="ease-in-out"
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export const LineChartComponent = ({ data, dataKeys, title, height = 300 }) => {
  return (
    <Card className="w-full overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <LineChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                border: "none",
              }}
            />
            <Legend />
            {dataKeys.map((key, index) => (
              <Line
                key={key.dataKey}
                type="monotone"
                dataKey={key.dataKey}
                name={key.name}
                stroke={key.color || LATAM_COLORS[index % LATAM_COLORS.length]}
                strokeWidth={2}
                dot={{
                  r: 4,
                  strokeWidth: 0,
                  fill: key.color || LATAM_COLORS[index % LATAM_COLORS.length],
                }}
                activeDot={{ r: 6, strokeWidth: 0 }}
                animationDuration={1500}
                animationEasing="ease-in-out"
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export const PieChartComponent = ({
  data,
  dataKey,
  nameKey,
  title,
  height = 300,
  donut = false,
}) => {
  return (
    <Card className="w-full overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={true}
              outerRadius={100}
              innerRadius={donut ? 60 : 0}
              fill="#8884d8"
              dataKey={dataKey}
              nameKey={nameKey}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              animationBegin={0}
              animationDuration={1500}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={LATAM_COLORS[index % LATAM_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`${value}`, ""]}
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                border: "none",
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export const RadarChartComponent = ({
  data,
  dataKeys,
  title,
  height = 300,
}) => {
  return (
    <Card className="w-full overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="#e0e0e0" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: "#666", fontSize: 12 }}
            />
            <PolarRadiusAxis angle={90} domain={[0, 150]} />
            {dataKeys.map((key, index) => (
              <Radar
                key={key.dataKey}
                name={key.name}
                dataKey={key.dataKey}
                stroke={key.color || LATAM_COLORS[index % LATAM_COLORS.length]}
                fill={key.color || LATAM_COLORS[index % LATAM_COLORS.length]}
                fillOpacity={0.6}
                animationDuration={1500}
                animationEasing="ease-in-out"
              />
            ))}
            <Legend />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                border: "none",
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export const ComposedChartComponent = ({
  data,
  barKeys,
  lineKeys,
  title,
  height = 300,
}) => {
  return (
    <Card className="w-full overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <ComposedChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
            <XAxis dataKey="name" scale="band" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                border: "none",
              }}
            />
            <Legend />
            {barKeys.map((key, index) => (
              <Bar
                key={key.dataKey}
                dataKey={key.dataKey}
                name={key.name}
                fill={key.color || LATAM_COLORS[index % LATAM_COLORS.length]}
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
                animationEasing="ease-in-out"
              />
            ))}
            {lineKeys.map((key, index) => (
              <Line
                key={key.dataKey}
                type="monotone"
                dataKey={key.dataKey}
                name={key.name}
                stroke={
                  key.color ||
                  LATAM_COLORS[(index + barKeys.length) % LATAM_COLORS.length]
                }
                strokeWidth={2}
                dot={{
                  r: 4,
                  strokeWidth: 0,
                  fill:
                    key.color ||
                    LATAM_COLORS[
                      (index + barKeys.length) % LATAM_COLORS.length
                    ],
                }}
                activeDot={{ r: 6, strokeWidth: 0 }}
                animationDuration={1500}
                animationEasing="ease-in-out"
              />
            ))}
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export const ScatterChartComponent = ({
  data,
  xAxis,
  yAxis,
  zAxis,
  title,
  height = 300,
}) => {
  return (
    <Card className="w-full overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <ScatterChart margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
            <XAxis
              type="number"
              dataKey={xAxis.dataKey}
              name={xAxis.name}
              unit={xAxis.unit}
            />
            <YAxis
              type="number"
              dataKey={yAxis.dataKey}
              name={yAxis.name}
              unit={yAxis.unit}
            />
            {zAxis && (
              <ZAxis
                type="number"
                dataKey={zAxis.dataKey}
                range={zAxis.range}
                name={zAxis.name}
              />
            )}
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                border: "none",
              }}
            />
            <Legend />
            <Scatter
              name={title}
              data={data}
              fill={LATAM_COLORS[0]}
              animationDuration={1500}
              animationEasing="ease-in-out"
            />
          </ScatterChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export const SankeyChartComponent = ({ data, title, height = 400 }) => {
  return (
    <Card className="w-full overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <Sankey
            data={data}
            nodePadding={50}
            nodeWidth={10}
            linkCurvature={0.5}
            iterations={64}
            link={{ stroke: "#aaa" }}
            node={{
              stroke: "#fff",
              strokeWidth: 2,
              fill: LATAM_COLORS[0],
            }}
            margin={{ top: 10, right: 160, bottom: 0, left: 0 }}
          >
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                border: "none",
              }}
            />
          </Sankey>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export const TreemapChartComponent = ({
  data,
  dataKey,
  title,
  height = 300,
}) => {
  return (
    <Card className="w-full overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <Treemap
            data={data}
            dataKey={dataKey}
            aspectRatio={4 / 3}
            stroke="#fff"
            fill={LATAM_COLORS[0]}
            animationDuration={1500}
            animationEasing="ease-in-out"
          >
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                border: "none",
              }}
            />
          </Treemap>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
