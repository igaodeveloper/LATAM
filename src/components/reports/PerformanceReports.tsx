import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Search, Filter, Download, TrendingUp, TrendingDown, Clock, Plane, Users } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const PerformanceReports = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [periodFilter, setPeriodFilter] = useState("month");
  const [metricFilter, setMetricFilter] = useState("all");

  const metrics = [
    {
      id: "MET001",
      name: "Punctuality Rate",
      value: "92.5%",
      change: "+2.3%",
      trend: "up",
      target: "95%",
      period: "This Month",
      details: "Based on 1,234 flights",
    },
    {
      id: "MET002",
      name: "Customer Satisfaction",
      value: "4.8/5",
      change: "+0.2",
      trend: "up",
      target: "4.9/5",
      period: "This Month",
      details: "Based on 5,678 surveys",
    },
    {
      id: "MET003",
      name: "Aircraft Utilization",
      value: "85.2%",
      change: "-1.5%",
      trend: "down",
      target: "88%",
      period: "This Month",
      details: "Based on 12 aircraft",
    },
    {
      id: "MET004",
      name: "Load Factor",
      value: "78.5%",
      change: "+3.2%",
      trend: "up",
      target: "80%",
      period: "This Month",
      details: "Based on 45,678 passengers",
    },
  ];

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-600";
      case "down":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4" />;
      case "down":
        return <TrendingDown className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Relatórios de Performance</h1>
        <p className="text-gray-500">Analise métricas e KPIs operacionais</p>
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
                  <Select value={periodFilter} onValueChange={setPeriodFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="day">Hoje</SelectItem>
                      <SelectItem value="week">Esta Semana</SelectItem>
                      <SelectItem value="month">Este Mês</SelectItem>
                      <SelectItem value="quarter">Este Trimestre</SelectItem>
                      <SelectItem value="year">Este Ano</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={metricFilter} onValueChange={setMetricFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Métrica" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="operational">Operacional</SelectItem>
                      <SelectItem value="financial">Financeiro</SelectItem>
                      <SelectItem value="customer">Cliente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Exportar Relatório
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {metrics.map((metric) => (
                  <Card key={metric.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{metric.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-bold">{metric.value}</span>
                          <div className={`flex items-center ${getTrendColor(metric.trend)}`}>
                            {getTrendIcon(metric.trend)}
                            <span className="ml-1">{metric.change}</span>
                          </div>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>Meta: {metric.target}</span>
                          <span>{metric.period}</span>
                        </div>
                        <div className="text-sm text-gray-500">{metric.details}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
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
                  <span className="font-semibold">{metrics.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Em Tendência Positiva</span>
                  <span className="font-semibold text-green-600">
                    {metrics.filter((m) => m.trend === "up").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Em Tendência Negativa</span>
                  <span className="font-semibold text-red-600">
                    {metrics.filter((m) => m.trend === "down").length}
                  </span>
                </div>
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between">
                  <span className="text-gray-500">Métricas Acima da Meta</span>
                  <span className="font-semibold text-green-600">
                    {metrics.filter(
                      (m) =>
                        parseFloat(m.value) > parseFloat(m.target)
                    ).length}
                  </span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-500">Métricas Abaixo da Meta</span>
                  <span className="font-semibold text-red-600">
                    {metrics.filter(
                      (m) =>
                        parseFloat(m.value) < parseFloat(m.target)
                    ).length}
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
                      Taxa de Pontualidade (+2.3%)
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <TrendingDown className="h-4 w-4 text-red-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium">Necessita Atenção</p>
                    <p className="text-xs text-gray-500">
                      Utilização de Aeronaves (-1.5%)
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

export default PerformanceReports; 