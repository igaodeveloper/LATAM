import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  LineChart,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Download,
} from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  trend: "up" | "down";
}

const KPICard = ({
  title = "Metric",
  value = "0%",
  change = 0,
  trend = "up",
}: KPICardProps) => {
  return (
    <Card className="bg-white hover-lift transition-all animate-zoom-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <span className="text-2xl font-bold animate-slide-in-right">
            {value}
          </span>
          <div className="flex items-center mt-1">
            <span
              className={`text-xs ${trend === "up" ? "text-green-500" : "text-red-500"} flex items-center`}
            >
              {trend === "up" ? (
                <ArrowUpRight className="h-3 w-3 mr-1 animate-pulse" />
              ) : (
                <ArrowDownRight className="h-3 w-3 mr-1 animate-pulse" />
              )}
              {change}%
            </span>
            <span className="text-xs text-gray-500 ml-1">vs last period</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface OperationalKPIsProps {
  timeframe?: string;
}

const OperationalKPIs = ({ timeframe = "week" }: OperationalKPIsProps) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState(timeframe);
  const [activeChart, setActiveChart] = useState("performance");

  // Mock data for KPI cards
  const kpiData = {
    onTimePerformance: {
      title: "On-Time Performance",
      value: "87%",
      change: 2.5,
      trend: "up" as const,
    },
    cancellationRate: {
      title: "Cancellation Rate",
      value: "3.2%",
      change: 1.1,
      trend: "down" as const,
    },
    utilizationRate: {
      title: "Aircraft Utilization",
      value: "92%",
      change: 3.7,
      trend: "up" as const,
    },
    loadFactor: {
      title: "Passenger Load Factor",
      value: "78%",
      change: 0.8,
      trend: "down" as const,
    },
  };

  return (
    <div className="w-full h-full bg-gray-50 rounded-lg p-4 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Operational KPIs</h2>
        <div className="flex items-center space-x-2">
          <Select
            value={selectedTimeframe}
            onValueChange={setSelectedTimeframe}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <KPICard {...kpiData.onTimePerformance} />
        <KPICard {...kpiData.cancellationRate} />
        <KPICard {...kpiData.utilizationRate} />
        <KPICard {...kpiData.loadFactor} />
      </div>

      <Card className="flex-1 bg-white">
        <CardHeader className="pb-0">
          <div className="w-full">
            <Tabs value={activeChart} onValueChange={setActiveChart}>
              <div className="flex justify-between items-center">
                <TabsList>
                  <TabsTrigger
                    value="performance"
                    className="flex items-center"
                  >
                    <LineChart className="h-4 w-4 mr-2" />
                    Performance
                  </TabsTrigger>
                  <TabsTrigger
                    value="cancellations"
                    className="flex items-center"
                  >
                    <BarChart className="h-4 w-4 mr-2" />
                    Cancellations
                  </TabsTrigger>
                  <TabsTrigger
                    value="utilization"
                    className="flex items-center"
                  >
                    <PieChart className="h-4 w-4 mr-2" />
                    Utilization
                  </TabsTrigger>
                </TabsList>
              </div>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <Tabs value={activeChart}>
            <TabsContent
              value="performance"
              className="h-[200px] flex items-center justify-center"
            >
              <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center">
                <p className="text-gray-500">On-Time Performance Chart</p>
                {/* Chart would be rendered here with a charting library */}
              </div>
            </TabsContent>
            <TabsContent
              value="cancellations"
              className="h-[200px] flex items-center justify-center"
            >
              <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center">
                <p className="text-gray-500">Cancellation Rates Chart</p>
                {/* Chart would be rendered here with a charting library */}
              </div>
            </TabsContent>
            <TabsContent
              value="utilization"
              className="h-[200px] flex items-center justify-center"
            >
              <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center">
                <p className="text-gray-500">Aircraft Utilization Chart</p>
                {/* Chart would be rendered here with a charting library */}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default OperationalKPIs;
