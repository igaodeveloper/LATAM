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
  Plane,
  Users,
  Wrench,
  BarChart,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  Package,
  DollarSign,
  Filter,
  Download,
  RefreshCw,
  MapPin,
  TrendingUp,
  TrendingDown,
  Bell,
} from "lucide-react";
import AlertsPanel from "./AlertsPanel";
import FlightStatusOverview from "./FlightStatusOverview";
import AircraftAvailability from "./AircraftAvailability";
import OperationalKPIs from "./OperationalKPIs";
import { AnimatedLogo } from "@/components/ui/animated-logo";

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  trend: "up" | "down";
  icon: React.ReactNode;
  color?: string;
}

const KPICard = ({
  title,
  value,
  change,
  trend,
  icon,
  color = "blue",
}: KPICardProps) => {
  return (
    <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300">
      <div className={`h-1 w-full bg-${color}-500`}></div>
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
          <div
            className={`h-12 w-12 rounded-full bg-${color}-100 flex items-center justify-center text-${color}-500 animate-pulse`}
          >
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  const [timeframe, setTimeframe] = useState("today");
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate data loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    {
      title: "Total de Voos",
      value: "856",
      change: "+8.2%",
      trend: "up",
      icon: Plane,
      color: "text-blue-500",
    },
    {
      title: "Vendas Totais",
      value: "R$ 2.5M",
      change: "+15.3%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-500",
    },
    {
      title: "Clientes Ativos",
      value: "1,234",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "text-purple-500",
    },
    {
      title: "Taxa de Satisfação",
      value: "94%",
      change: "+2.1%",
      trend: "up",
      icon: Star,
      color: "text-yellow-500",
    },
  ];

  const recentFlights = [
    {
      id: "FL001",
      flight: "LA1234",
      origin: "São Paulo",
      destination: "Rio de Janeiro",
      status: "completed",
      time: "10:30",
      date: "2024-03-15",
    },
    {
      id: "FL002",
      flight: "LA5678",
      origin: "Brasília",
      destination: "Salvador",
      status: "in_progress",
      time: "11:45",
      date: "2024-03-15",
    },
    {
      id: "FL003",
      flight: "LA9012",
      origin: "Recife",
      destination: "Fortaleza",
      status: "scheduled",
      time: "13:15",
      date: "2024-03-15",
    },
    {
      id: "FL004",
      flight: "LA3456",
      origin: "Manaus",
      destination: "Belém",
      status: "delayed",
      time: "14:30",
      date: "2024-03-15",
    },
  ];

  const notifications = [
    {
      id: "NT001",
      title: "Novo Voo Agendado",
      message: "Voo LA1234 para Rio de Janeiro foi agendado",
      type: "info",
      time: "10:30",
      read: false,
    },
    {
      id: "NT002",
      title: "Manutenção Programada",
      message: "Manutenção preventiva agendada para amanhã",
      type: "warning",
      time: "09:15",
      read: true,
    },
    {
      id: "NT003",
      title: "Novo Cliente",
      message: "Novo cliente registrado no sistema",
      type: "success",
      time: "08:45",
      read: true,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "scheduled":
        return "bg-yellow-100 text-yellow-800";
      case "delayed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "info":
        return "text-blue-500";
      case "warning":
        return "text-yellow-500";
      case "success":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">
          Visão geral do sistema
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold">
                      {stat.value}
                    </p>
                  </div>
                </div>
                <div className={`flex items-center space-x-1 ${
                  stat.trend === "up" ? "text-green-500" : "text-red-500"
                }`}>
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {stat.change}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Voos Recentes</CardTitle>
                  <CardDescription>
                    Últimos voos do sistema
                  </CardDescription>
                </div>
                <Select value={timeframe} onValueChange={setTimeframe}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Hoje</SelectItem>
                    <SelectItem value="week">Esta Semana</SelectItem>
                    <SelectItem value="month">Este Mês</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentFlights.map((flight) => (
                  <div
                    key={flight.id}
                    className="flex items-center justify-between p-4 rounded-lg border"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Plane className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{flight.flight}</h3>
                        <p className="text-sm text-gray-500">
                          {flight.origin} → {flight.destination}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{flight.time}</p>
                        <p className="text-sm text-gray-500">{flight.date}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(flight.status)}`}>
                        {flight.status === "completed" ? "Concluído" :
                         flight.status === "in_progress" ? "Em Andamento" :
                         flight.status === "scheduled" ? "Agendado" : "Atrasado"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Notificações</CardTitle>
                  <CardDescription>
                    Alertas e atualizações
                  </CardDescription>
                </div>
                <Button variant="ghost" size="icon">
                  <Bell className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start space-x-3 p-3 rounded-lg ${
                      notification.read ? "bg-white" : "bg-blue-50"
                    }`}
                  >
                    <div className={`p-1 rounded-full ${
                      notification.read ? "bg-gray-100" : "bg-blue-100"
                    }`}>
                      <Bell className={`h-4 w-4 ${getNotificationColor(notification.type)}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">
                          {notification.title}
                        </p>
                        <span className="text-xs text-gray-500">
                          {notification.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {notification.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Vendas por Período</CardTitle>
            <CardDescription>
              Análise de vendas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <LineChart className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribuição de Vendas</CardTitle>
            <CardDescription>
              Análise de distribuição
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <PieChart className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
