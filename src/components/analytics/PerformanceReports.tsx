import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  LineChart,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Plane,
  Package,
  Users,
  Filter,
} from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  trend: "up" | "down";
  icon?: React.ReactNode;
}

const KPICard = ({
  title = "Metric",
  value = "0",
  change = 0,
  trend = "up",
  icon,
}: KPICardProps) => {
  return (
    <Card className="bg-white">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            <div className="flex items-center mt-1">
              <span
                className={`text-xs ${trend === "up" ? "text-green-500" : "text-red-500"} flex items-center`}
              >
                {trend === "up" ? (
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                )}
                {change}%
              </span>
              <span className="text-xs text-gray-500 ml-1">vs last period</span>
            </div>
          </div>
          {icon && (
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary animate-float">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const PerformanceReports = () => {
  const [timeframe, setTimeframe] = useState("month");
  const [activeTab, setActiveTab] = useState("flights");

  return (
    <div className="w-full h-full bg-background p-6 pt-0">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">
            Performance Reports
          </h1>
          <p className="text-muted-foreground">
            Analyze flight operations, cargo performance, and financial metrics
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
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
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="flights" className="gap-2">
            <Plane size={16} />
            Flight Performance
          </TabsTrigger>
          <TabsTrigger value="cargo" className="gap-2">
            <Package size={16} />
            Cargo Operations
          </TabsTrigger>
          <TabsTrigger value="financial" className="gap-2">
            <DollarSign size={16} />
            Financial Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="flights" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <KPICard
              title="On-Time Performance"
              value="87%"
              change={2.5}
              trend="up"
              icon={<Clock size={20} className="animate-pulse" />}
            />
            <KPICard
              title="Flight Completion Rate"
              value="96.8%"
              change={0.3}
              trend="up"
              icon={<CheckCircle size={20} />}
            />
            <KPICard
              title="Average Delay"
              value="18 min"
              change={5.2}
              trend="down"
              icon={<Clock size={20} />}
            />
            <KPICard
              title="Passenger Load Factor"
              value="78%"
              change={1.5}
              trend="down"
              icon={<Users size={20} />}
            />
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Flight Performance Metrics</CardTitle>
              <div className="flex items-center gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Filter by route" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Routes</SelectItem>
                    <SelectItem value="scl-lim">Santiago - Lima</SelectItem>
                    <SelectItem value="scl-bog">Santiago - Bogotá</SelectItem>
                    <SelectItem value="scl-gru">
                      Santiago - São Paulo
                    </SelectItem>
                    <SelectItem value="scl-eze">
                      Santiago - Buenos Aires
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Filter size={16} />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] border rounded-lg p-8 text-center bg-muted/20">
                <LineChart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Interactive flight performance chart would be displayed here,
                  showing on-time performance, delays, and cancellations over
                  time.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Top Performing Routes
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-100 text-green-800">1</Badge>
                        <span>Santiago - Lima</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">94.2%</span>
                        <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                          <TrendingUp size={12} /> 3.1%
                        </Badge>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-100 text-green-800">2</Badge>
                        <span>Santiago - Buenos Aires</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">92.8%</span>
                        <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                          <TrendingUp size={12} /> 1.7%
                        </Badge>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-100 text-green-800">3</Badge>
                        <span>Lima - Bogotá</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">91.5%</span>
                        <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                          <TrendingUp size={12} /> 0.8%
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Underperforming Routes
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-red-100 text-red-800">1</Badge>
                        <span>Santiago - Miami</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">76.3%</span>
                        <Badge className="bg-red-100 text-red-800 flex items-center gap-1">
                          <TrendingDown size={12} /> 4.2%
                        </Badge>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-red-100 text-red-800">2</Badge>
                        <span>São Paulo - Bogotá</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">79.1%</span>
                        <Badge className="bg-red-100 text-red-800 flex items-center gap-1">
                          <TrendingDown size={12} /> 2.5%
                        </Badge>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-red-100 text-red-800">3</Badge>
                        <span>Lima - São Paulo</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">82.4%</span>
                        <Badge className="bg-red-100 text-red-800 flex items-center gap-1">
                          <TrendingDown size={12} /> 1.3%
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cargo" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <KPICard
              title="Cargo Volume"
              value="1,245 tons"
              change={3.8}
              trend="up"
              icon={<Package size={20} />}
            />
            <KPICard
              title="Revenue per Ton"
              value="$1,850"
              change={2.1}
              trend="up"
              icon={<DollarSign size={20} />}
            />
            <KPICard
              title="Capacity Utilization"
              value="83%"
              change={1.5}
              trend="up"
              icon={<BarChart size={20} />}
            />
            <KPICard
              title="On-Time Delivery"
              value="92%"
              change={0.7}
              trend="down"
              icon={<Clock size={20} />}
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Cargo Performance Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] border rounded-lg p-8 text-center bg-muted/20">
                <BarChart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Interactive cargo performance chart would be displayed here,
                  showing volume, revenue, and utilization metrics over time.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Top Cargo Routes</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-blue-100 text-blue-800">1</Badge>
                        <span>Santiago - Miami</span>
                      </div>
                      <div>
                        <span className="font-medium">325 tons</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-blue-100 text-blue-800">2</Badge>
                        <span>São Paulo - Santiago</span>
                      </div>
                      <div>
                        <span className="font-medium">287 tons</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-blue-100 text-blue-800">3</Badge>
                        <span>Lima - Bogotá</span>
                      </div>
                      <div>
                        <span className="font-medium">215 tons</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Cargo Type Distribution
                  </h3>
                  <div className="h-[200px] border rounded-lg p-4 text-center bg-muted/20">
                    <PieChart className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Cargo type distribution chart would be displayed here
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <KPICard
              title="Total Revenue"
              value="$42.5M"
              change={5.2}
              trend="up"
              icon={<DollarSign size={20} />}
            />
            <KPICard
              title="Operating Costs"
              value="$31.8M"
              change={2.3}
              trend="up"
              icon={<DollarSign size={20} />}
            />
            <KPICard
              title="Profit Margin"
              value="25.2%"
              change={1.8}
              trend="up"
              icon={<TrendingUp size={20} />}
            />
            <KPICard
              title="Revenue per Flight"
              value="$32,450"
              change={3.5}
              trend="up"
              icon={<Plane size={20} />}
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Financial Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] border rounded-lg p-8 text-center bg-muted/20">
                <LineChart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Interactive financial performance chart would be displayed
                  here, showing revenue, costs, and profit trends over time.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Revenue by Route</h3>
                  <div className="h-[200px] border rounded-lg p-4 text-center bg-muted/20">
                    <BarChart className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Revenue by route chart would be displayed here
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Cost Breakdown</h3>
                  <div className="h-[200px] border rounded-lg p-4 text-center bg-muted/20">
                    <PieChart className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Cost breakdown chart would be displayed here
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Placeholder components for icons not imported
const Clock = ({ size, className }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const CheckCircle = ({
  size,
  className,
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

export default PerformanceReports;
