import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Search, Filter, Plus, TrendingUp, TrendingDown, Clock, Calendar, Plane, MapPin, User, BarChart, Target, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const PerformanceManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [metricFilter, setMetricFilter] = useState("all");
  const [periodFilter, setPeriodFilter] = useState("all");

  const performanceMetrics = [
    {
      id: "PERF001",
      name: "Pontualidade",
      category: "operational",
      status: "on_track",
      current: 85.5,
      target: 90,
      previous: 82.3,
      trend: "up",
      period: "monthly",
      lastUpdate: new Date(2024, 2, 1),
      nextUpdate: new Date(2024, 3, 1),
      details: {
        totalFlights: 1250,
        onTime: 1069,
        delayed: 181,
        averageDelay: 15,
      },
      breakdown: {
        byAircraft: [
          { type: "A320", value: 87.2 },
          { type: "B737", value: 84.8 },
          { type: "A350", value: 86.5 },
        ],
        byRoute: [
          { route: "GRU-JFK", value: 88.5 },
          { route: "SDU-BSB", value: 83.2 },
          { route: "CNF-MIA", value: 85.8 },
        ],
      },
    },
    {
      id: "PERF002",
      name: "Satisfação do Cliente",
      category: "customer",
      status: "below_target",
      current: 4.2,
      target: 4.5,
      previous: 4.3,
      trend: "down",
      period: "monthly",
      lastUpdate: new Date(2024, 2, 1),
      nextUpdate: new Date(2024, 3, 1),
      details: {
        totalSurveys: 850,
        positive: 714,
        neutral: 102,
        negative: 34,
      },
      breakdown: {
        byClass: [
          { class: "First", value: 4.8 },
          { class: "Business", value: 4.5 },
          { class: "Economy", value: 4.0 },
        ],
        byService: [
          { service: "Check-in", value: 4.3 },
          { service: "In-flight", value: 4.4 },
          { service: "Baggage", value: 3.9 },
        ],
      },
    },
    {
      id: "PERF003",
      name: "Eficiência de Combustível",
      category: "operational",
      status: "exceeding",
      current: 2.8,
      target: 3.0,
      previous: 2.7,
      trend: "up",
      period: "monthly",
      lastUpdate: new Date(2024, 2, 1),
      nextUpdate: new Date(2024, 3, 1),
      details: {
        totalFlights: 1250,
        averageConsumption: 2.8,
        savings: 5.2,
        optimizationRate: 92,
      },
      breakdown: {
        byAircraft: [
          { type: "A320", value: 2.9 },
          { type: "B737", value: 2.7 },
          { type: "A350", value: 2.8 },
        ],
        byRoute: [
          { route: "GRU-JFK", value: 2.9 },
          { route: "SDU-BSB", value: 2.7 },
          { route: "CNF-MIA", value: 2.8 },
        ],
      },
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "exceeding":
        return "text-green-600 bg-green-50";
      case "on_track":
        return "text-blue-600 bg-blue-50";
      case "below_target":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "exceeding":
        return <TrendingUp className="h-4 w-4" />;
      case "on_track":
        return <Target className="h-4 w-4" />;
      case "below_target":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Gestão de Performance</h1>
        <p className="text-gray-500">Monitore métricas operacionais e de negócio</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Pesquisar métricas..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-[300px]"
                    />
                  </div>
                  <Select value={metricFilter} onValueChange={setMetricFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="operational">Operacional</SelectItem>
                      <SelectItem value="customer">Cliente</SelectItem>
                      <SelectItem value="financial">Financeiro</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={periodFilter} onValueChange={setPeriodFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="daily">Diário</SelectItem>
                      <SelectItem value="weekly">Semanal</SelectItem>
                      <SelectItem value="monthly">Mensal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Métrica
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Atual</TableHead>
                    <TableHead>Meta</TableHead>
                    <TableHead>Anterior</TableHead>
                    <TableHead>Tendência</TableHead>
                    <TableHead>Período</TableHead>
                    <TableHead>Última Atualização</TableHead>
                    <TableHead>Próxima Atualização</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {performanceMetrics.map((metric) => (
                    <TableRow key={metric.id}>
                      <TableCell className="font-medium">{metric.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <BarChart className="h-4 w-4 mr-2 text-gray-500" />
                          {metric.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="capitalize">
                          {metric.category === "operational" ? "Operacional" : metric.category === "customer" ? "Cliente" : "Financeiro"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            metric.status
                          )}`}
                        >
                          {getStatusIcon(metric.status)}
                          <span className="ml-1 capitalize">
                            {metric.status === "exceeding" ? "Excedendo" : metric.status === "on_track" ? "No Alvo" : "Abaixo do Alvo"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">
                          {typeof metric.current === "number" && metric.current % 1 !== 0
                            ? metric.current.toFixed(1)
                            : metric.current}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">
                          {typeof metric.target === "number" && metric.target % 1 !== 0
                            ? metric.target.toFixed(1)
                            : metric.target}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">
                          {typeof metric.previous === "number" && metric.previous % 1 !== 0
                            ? metric.previous.toFixed(1)
                            : metric.previous}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {getTrendIcon(metric.trend)}
                          <span className="ml-1 text-sm text-gray-500">
                            {metric.trend === "up" ? "↑" : "↓"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="capitalize">
                          {metric.period === "daily" ? "Diário" : metric.period === "weekly" ? "Semanal" : "Mensal"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Calendar className="h-3 w-3 mr-1" />
                          {format(metric.lastUpdate, "dd/MM/yyyy", { locale: ptBR })}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Calendar className="h-3 w-3 mr-1" />
                          {format(metric.nextUpdate, "dd/MM/yyyy", { locale: ptBR })}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          Detalhes
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Resumo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Total de Métricas</span>
                  <span className="font-semibold">{performanceMetrics.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Excedendo Meta</span>
                  <span className="font-semibold text-green-600">
                    {performanceMetrics.filter((m) => m.status === "exceeding").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">No Alvo</span>
                  <span className="font-semibold text-blue-600">
                    {performanceMetrics.filter((m) => m.status === "on_track").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Abaixo do Alvo</span>
                  <span className="font-semibold text-red-600">
                    {performanceMetrics.filter((m) => m.status === "below_target").length}
                  </span>
                </div>
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between">
                  <span className="text-gray-500">Operacional</span>
                  <span className="font-semibold text-blue-600">
                    {performanceMetrics.filter((m) => m.category === "operational").length}
                  </span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-500">Cliente</span>
                  <span className="font-semibold text-purple-600">
                    {performanceMetrics.filter((m) => m.category === "customer").length}
                  </span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-500">Financeiro</span>
                  <span className="font-semibold text-orange-600">
                    {performanceMetrics.filter((m) => m.category === "financial").length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium">Melhor Performance</p>
                    <p className="text-xs text-gray-500">
                      Eficiência de Combustível excedendo meta
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <AlertCircle className="h-4 w-4 text-red-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium">Atenção Necessária</p>
                    <p className="text-xs text-gray-500">
                      Satisfação do cliente abaixo do alvo
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Target className="h-4 w-4 text-blue-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium">No Alvo</p>
                    <p className="text-xs text-gray-500">
                      Pontualidade atingindo meta
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PerformanceManagement; 