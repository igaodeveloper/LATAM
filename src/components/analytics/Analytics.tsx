import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Search, Filter, Plus, Download, BarChart, PieChart, LineChart, Calendar, Clock, User, ArrowUp, ArrowDown, TrendingUp, TrendingDown, DollarSign, Users, Plane, Tool, AlertTriangle, CheckCircle, XCircle, Ticket, CreditCard, Database, AlertCircle, Info, Shield, MapPin, Globe, ChevronLeft, ChevronRight, MoreVertical, Star, Tag } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("month");
  const [metric, setMetric] = useState("overview");

  const metrics = {
    overview: {
      title: "Visão Geral",
      description: "Métricas principais do sistema",
      stats: [
        {
          title: "Total de Usuários",
          value: "1,234",
          change: "+12.5%",
          trend: "up",
          icon: Users,
        },
        {
          title: "Voos Realizados",
          value: "856",
          change: "+8.2%",
          trend: "up",
          icon: Plane,
        },
        {
          title: "Vendas Totais",
          value: "R$ 2.5M",
          change: "+15.3%",
          trend: "up",
          icon: CreditCard,
        },
        {
          title: "Taxa de Satisfação",
          value: "94%",
          change: "+2.1%",
          trend: "up",
          icon: Star,
        },
      ],
    },
    performance: {
      title: "Desempenho",
      description: "Métricas de desempenho do sistema",
      stats: [
        {
          title: "Tempo Médio de Resposta",
          value: "245ms",
          change: "-18%",
          trend: "down",
          icon: Clock,
        },
        {
          title: "Uso de CPU",
          value: "65%",
          change: "+5%",
          trend: "up",
          icon: Database,
        },
        {
          title: "Memória Utilizada",
          value: "4.2GB",
          change: "+2.1GB",
          trend: "up",
          icon: Database,
        },
        {
          title: "Erros por Minuto",
          value: "0.3",
          change: "-45%",
          trend: "down",
          icon: AlertCircle,
        },
      ],
    },
    business: {
      title: "Negócios",
      description: "Métricas de negócios",
      stats: [
        {
          title: "Receita Mensal",
          value: "R$ 1.8M",
          change: "+12.3%",
          trend: "up",
          icon: DollarSign,
        },
        {
          title: "Novos Clientes",
          value: "156",
          change: "+8.7%",
          trend: "up",
          icon: Users,
        },
        {
          title: "Taxa de Conversão",
          value: "32%",
          change: "+3.2%",
          trend: "up",
          icon: TrendingUp,
        },
        {
          title: "Ticket Médio",
          value: "R$ 1,245",
          change: "+5.6%",
          trend: "up",
          icon: Ticket,
        },
      ],
    },
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-500";
      case "down":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <ArrowUp className="h-4 w-4" />;
      case "down":
        return <ArrowDown className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "operational":
        return <Plane className="h-4 w-4" />;
      case "financial":
        return <DollarSign className="h-4 w-4" />;
      case "safety":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <BarChart className="h-4 w-4" />;
    }
  };

  const formatValue = (value: number, unit: string) => {
    if (unit === "R$") {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value);
    }
    return `${value}${unit}`;
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-500">
          Visualize métricas e estatísticas do sistema
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div>
                    <CardTitle>{metrics[metric].title}</CardTitle>
                    <CardDescription>
                      {metrics[metric].description}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="day">Hoje</SelectItem>
                      <SelectItem value="week">Esta Semana</SelectItem>
                      <SelectItem value="month">Este Mês</SelectItem>
                      <SelectItem value="year">Este Ano</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={metric} onValueChange={setMetric}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Métrica" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="overview">Visão Geral</SelectItem>
                      <SelectItem value="performance">Desempenho</SelectItem>
                      <SelectItem value="business">Negócios</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {metrics[metric].stats.map((stat, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <stat.icon className="h-6 w-6 text-gray-600" />
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
                        <div className={`flex items-center space-x-1 ${getTrendColor(stat.trend)}`}>
                          {stat.trend === "up" ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : (
                            <TrendingUp className="h-4 w-4 transform rotate-180" />
                          )}
                          <span className="text-sm font-medium">
                            {stat.change}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Gráficos</CardTitle>
              <CardDescription>
                Visualize tendências e padrões
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">Vendas por Período</h3>
                      <Select defaultValue="week">
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Período" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="day">Diário</SelectItem>
                          <SelectItem value="week">Semanal</SelectItem>
                          <SelectItem value="month">Mensal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                      <LineChart className="h-8 w-8 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">Distribuição de Vendas</h3>
                      <Select defaultValue="month">
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Período" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="week">Semanal</SelectItem>
                          <SelectItem value="month">Mensal</SelectItem>
                          <SelectItem value="year">Anual</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                      <PieChart className="h-8 w-8 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Insights</CardTitle>
              <CardDescription>
                Análises e recomendações
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Aumento nas Vendas</p>
                    <p className="text-sm text-gray-500">
                      As vendas aumentaram 15.3% em relação ao mês anterior
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Performance</p>
                    <p className="text-sm text-gray-500">
                      O tempo de resposta aumentou 5% nos últimos 7 dias
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Satisfação</p>
                    <p className="text-sm text-gray-500">
                      A taxa de satisfação do cliente atingiu 94%
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Métricas Principais</CardTitle>
              <CardDescription>
                KPIs do sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Taxa de Conversão</span>
                  <span className="text-sm text-green-500">32%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Tempo Médio de Resposta</span>
                  <span className="text-sm text-red-500">245ms</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Uso de CPU</span>
                  <span className="text-sm text-yellow-500">65%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Erros por Minuto</span>
                  <span className="text-sm text-green-500">0.3</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 