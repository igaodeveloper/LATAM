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

  return (
    <div className="w-full h-full bg-gray-50 p-6 pt-0">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-900 animate-fade-in">
            Dashboard Operacional
          </h1>
          <p
            className="text-gray-600 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            Visão geral das operações da LATAM Airlines
          </p>
        </div>
        <div
          className="flex items-center space-x-2 animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[150px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hoje</SelectItem>
              <SelectItem value="yesterday">Ontem</SelectItem>
              <SelectItem value="week">Esta Semana</SelectItem>
              <SelectItem value="month">Este Mês</SelectItem>
              <SelectItem value="quarter">Este Trimestre</SelectItem>
              <SelectItem value="year">Este Ano</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Atualizar
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8 bg-white shadow-sm">
          <TabsTrigger value="overview" className="gap-2 py-3">
            <BarChart size={16} />
            Visão Geral
          </TabsTrigger>
          <TabsTrigger value="flights" className="gap-2 py-3">
            <Plane size={16} />
            Voos
          </TabsTrigger>
          <TabsTrigger value="fleet" className="gap-2 py-3">
            <Wrench size={16} />
            Frota
          </TabsTrigger>
          <TabsTrigger value="crew" className="gap-2 py-3">
            <Users size={16} />
            Tripulação
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard
              title="Voos Hoje"
              value="328"
              change={5.2}
              trend="up"
              icon={<Plane size={24} />}
              color="blue"
            />
            <KPICard
              title="Pontualidade"
              value="92.7%"
              change={3.5}
              trend="up"
              icon={<Clock size={24} />}
              color="green"
            />
            <KPICard
              title="Aeronaves Disponíveis"
              value="85"
              change={-2.3}
              trend="down"
              icon={<Wrench size={24} />}
              color="amber"
            />
            <KPICard
              title="Ocupação Média"
              value="87.4%"
              change={1.8}
              trend="up"
              icon={<Users size={24} />}
              color="purple"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 shadow-md hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>Status dos Voos</CardTitle>
                <div className="flex items-center gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Filtrar por rota" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as Rotas</SelectItem>
                      <SelectItem value="domestic">Domésticas</SelectItem>
                      <SelectItem value="international">
                        Internacionais
                      </SelectItem>
                      <SelectItem value="regional">Regionais</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Filter size={16} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[350px] border rounded-lg p-8 text-center bg-muted/10 relative overflow-hidden">
                  {isLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                      <div className="flex flex-col items-center">
                        <RefreshCw className="h-8 w-8 text-blue-500 animate-spin" />
                        <p className="mt-2 text-sm text-gray-500">
                          Carregando dados...
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <BarChart className="h-16 w-16 mx-auto text-blue-500 mb-4" />
                      <p className="text-gray-500">
                        Gráfico interativo mostrando o status dos voos em tempo
                        real seria exibido aqui.
                      </p>
                    </>
                  )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div className="flex flex-col items-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">285</div>
                    <div className="text-sm text-gray-500">No Horário</div>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-amber-50 rounded-lg">
                    <div className="text-2xl font-bold text-amber-600">32</div>
                    <div className="text-sm text-gray-500">Atrasados</div>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">8</div>
                    <div className="text-sm text-gray-500">Cancelados</div>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">3</div>
                    <div className="text-sm text-gray-500">Desviados</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle>Alertas Operacionais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 border rounded-lg bg-red-50 animate-pulse hover:animate-none transition-all">
                    <div className="rounded-full bg-red-100 p-2">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <div className="font-medium">Manutenção Urgente</div>
                      <div className="text-sm text-gray-600">
                        Aeronave CC-COP requer inspeção imediata
                      </div>
                      <div className="mt-2">
                        <Button size="sm" variant="destructive">
                          Verificar
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 border rounded-lg bg-amber-50">
                    <div className="rounded-full bg-amber-100 p-2">
                      <Clock className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <div className="font-medium">Atrasos em Cascata</div>
                      <div className="text-sm text-gray-600">
                        Possíveis atrasos em 5 voos conectados
                      </div>
                      <div className="mt-2">
                        <Button size="sm" variant="outline">
                          Revisar
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 border rounded-lg">
                    <div className="rounded-full bg-blue-100 p-2">
                      <MapPin className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">Condições Climáticas</div>
                      <div className="text-sm text-gray-600">
                        Neblina em SCL pode afetar chegadas
                      </div>
                      <div className="mt-2">
                        <Button size="sm" variant="outline">
                          Monitorar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-md hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle>Desempenho por Rota</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-800">1</Badge>
                      <span>Santiago - Lima</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">96.2%</span>
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
                      <span className="font-medium">94.8%</span>
                      <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                        <TrendingUp size={12} /> 1.7%
                      </Badge>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-800">3</Badge>
                      <span>Santiago - São Paulo</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">93.5%</span>
                      <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                        <TrendingUp size={12} /> 0.8%
                      </Badge>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-red-100 text-red-800">8</Badge>
                      <span>Santiago - Miami</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">78.3%</span>
                      <Badge className="bg-red-100 text-red-800 flex items-center gap-1">
                        <TrendingDown size={12} /> 4.2%
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle>Métricas Financeiras</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-sm text-gray-500">Receita Diária</div>
                    <div className="text-2xl font-bold text-blue-700 mt-1">
                      $3.2M
                    </div>
                    <div className="flex items-center mt-1 text-green-600 text-xs">
                      <TrendingUp size={12} className="mr-1" /> +5.2%
                    </div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-sm text-gray-500">Ocupação Média</div>
                    <div className="text-2xl font-bold text-green-700 mt-1">
                      87.4%
                    </div>
                    <div className="flex items-center mt-1 text-green-600 text-xs">
                      <TrendingUp size={12} className="mr-1" /> +1.8%
                    </div>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="text-sm text-gray-500">
                      Receita/Passageiro
                    </div>
                    <div className="text-2xl font-bold text-purple-700 mt-1">
                      $215
                    </div>
                    <div className="flex items-center mt-1 text-green-600 text-xs">
                      <TrendingUp size={12} className="mr-1" /> +2.3%
                    </div>
                  </div>
                  <div className="p-4 bg-amber-50 rounded-lg">
                    <div className="text-sm text-gray-500">
                      Custo/Assento-Km
                    </div>
                    <div className="text-2xl font-bold text-amber-700 mt-1">
                      $0.082
                    </div>
                    <div className="flex items-center mt-1 text-red-600 text-xs">
                      <TrendingDown size={12} className="mr-1" /> -1.5%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="flights" className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard
              title="Total de Voos"
              value="328"
              change={5.2}
              trend="up"
              icon={<Plane size={24} />}
              color="blue"
            />
            <KPICard
              title="Pontualidade"
              value="92.7%"
              change={3.5}
              trend="up"
              icon={<Clock size={24} />}
              color="green"
            />
            <KPICard
              title="Taxa de Cancelamento"
              value="2.4%"
              change={-0.8}
              trend="down"
              icon={<AlertTriangle size={24} />}
              color="red"
            />
            <KPICard
              title="Atraso Médio"
              value="18 min"
              change={-2.5}
              trend="down"
              icon={<Clock size={24} />}
              color="amber"
            />
          </div>

          <Card className="shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle>Status dos Voos em Tempo Real</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] border rounded-lg p-8 text-center bg-muted/10 relative overflow-hidden">
                {isLoading ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                    <div className="flex flex-col items-center">
                      <RefreshCw className="h-8 w-8 text-blue-500 animate-spin" />
                      <p className="mt-2 text-sm text-gray-500">
                        Carregando dados...
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <BarChart className="h-16 w-16 mx-auto text-blue-500 mb-4" />
                    <p className="text-gray-500">
                      Mapa interativo mostrando voos em tempo real seria exibido
                      aqui.
                    </p>
                  </>
                )}
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Próximos Voos</h3>
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div>
                      <div className="flex items-center">
                        <span className="font-bold text-lg mr-2">LA1234</span>
                        <Badge className="bg-green-100 text-green-800">
                          No Horário
                        </Badge>
                      </div>
                      <div className="flex items-center mt-2">
                        <MapPin size={16} className="mr-1 text-gray-400" />
                        <span>Santiago (SCL) → Lima (LIM)</span>
                      </div>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <div className="flex items-center">
                        <Clock size={16} className="mr-1 text-gray-400" />
                        <span>08:30 - 10:45</span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        Boeing 787-9 • Portão A12
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div>
                      <div className="flex items-center">
                        <span className="font-bold text-lg mr-2">LA2156</span>
                        <Badge className="bg-amber-100 text-amber-800">
                          Atrasado
                        </Badge>
                      </div>
                      <div className="flex items-center mt-2">
                        <MapPin size={16} className="mr-1 text-gray-400" />
                        <span>Buenos Aires (EZE) → Santiago (SCL)</span>
                      </div>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <div className="flex items-center">
                        <Clock size={16} className="mr-1 text-gray-400" />
                        <span>09:15 - 11:00</span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        Airbus A320 • Portão B05
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div>
                      <div className="flex items-center">
                        <span className="font-bold text-lg mr-2">LA3421</span>
                        <Badge className="bg-blue-100 text-blue-800">
                          Embarque
                        </Badge>
                      </div>
                      <div className="flex items-center mt-2">
                        <MapPin size={16} className="mr-1 text-gray-400" />
                        <span>São Paulo (GRU) → Bogotá (BOG)</span>
                      </div>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <div className="flex items-center">
                        <Clock size={16} className="mr-1 text-gray-400" />
                        <span>10:00 - 14:30</span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        Boeing 787-8 • Portão C22
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fleet" className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard
              title="Total de Aeronaves"
              value="142"
              change={2.1}
              trend="up"
              icon={<Plane size={24} />}
              color="blue"
            />
            <KPICard
              title="Disponíveis"
              value="85"
              change={-2.3}
              trend="down"
              icon={<CheckCircle size={24} />}
              color="green"
            />
            <KPICard
              title="Em Manutenção"
              value="12"
              change={5.0}
              trend="up"
              icon={<Wrench size={24} />}
              color="amber"
            />
            <KPICard
              title="Utilização Diária"
              value="11.2h"
              change={0.8}
              trend="up"
              icon={<Clock size={24} />}
              color="purple"
            />
          </div>

          <Card className="shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle>Status da Frota</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] border rounded-lg p-8 text-center bg-muted/10 relative overflow-hidden">
                {isLoading ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                    <div className="flex flex-col items-center">
                      <RefreshCw className="h-8 w-8 text-blue-500 animate-spin" />
                      <p className="mt-2 text-sm text-gray-500">
                        Carregando dados...
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <BarChart className="h-16 w-16 mx-auto text-blue-500 mb-4" />
                    <p className="text-gray-500">
                      Gráfico interativo mostrando o status da frota seria
                      exibido aqui.
                    </p>
                  </>
                )}
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">
                  Alertas de Manutenção
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 border rounded-lg bg-red-50">
                    <div className="rounded-full bg-red-100 p-2">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">
                        CC-COP - Boeing 777-300ER
                      </div>
                      <div className="text-sm text-gray-600">
                        Manutenção programada vencida desde 20/07/2023
                      </div>
                    </div>
                    <Button size="sm">Agendar</Button>
                  </div>

                  <div className="flex items-start space-x-4 p-4 border rounded-lg bg-amber-50">
                    <div className="rounded-full bg-amber-100 p-2">
                      <Clock className="h-5 w-5 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">CC-EFG - Airbus A320neo</div>
                      <div className="text-sm text-gray-600">
                        Manutenção programada para 12/09/2023
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Detalhes
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="crew" className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard
              title="Total de Tripulantes"
              value="1,245"
              change={3.2}
              trend="up"
              icon={<Users size={24} />}
              color="blue"
            />
            <KPICard
              title="Disponíveis"
              value="865"
              change={-1.5}
              trend="down"
              icon={<CheckCircle size={24} />}
              color="green"
            />
            <KPICard
              title="Em Serviço"
              value="320"
              change={4.8}
              trend="up"
              icon={<Plane size={24} />}
              color="purple"
            />
            <KPICard
              title="Em Descanso"
              value="60"
              change={2.3}
              trend="up"
              icon={<Clock size={24} />}
              color="amber"
            />
          </div>

          <Card className="shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle>Alocação de Tripulação</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] border rounded-lg p-8 text-center bg-muted/10 relative overflow-hidden">
                {isLoading ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                    <div className="flex flex-col items-center">
                      <RefreshCw className="h-8 w-8 text-blue-500 animate-spin" />
                      <p className="mt-2 text-sm text-gray-500">
                        Carregando dados...
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <BarChart className="h-16 w-16 mx-auto text-blue-500 mb-4" />
                    <p className="text-gray-500">
                      Gráfico interativo mostrando a alocação de tripulação
                      seria exibido aqui.
                    </p>
                  </>
                )}
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">
                  Alertas de Tripulação
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 border rounded-lg bg-red-50">
                    <div className="rounded-full bg-red-100 p-2">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">
                        LA5678 - Falta de Piloto
                      </div>
                      <div className="text-sm text-gray-600">
                        Voo para Buenos Aires precisa de 1 piloto adicional
                      </div>
                    </div>
                    <Button size="sm">Alocar</Button>
                  </div>

                  <div className="flex items-start space-x-4 p-4 border rounded-lg bg-amber-50">
                    <div className="rounded-full bg-amber-100 p-2">
                      <Clock className="h-5 w-5 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">
                        LA1234 - Tripulação Incompleta
                      </div>
                      <div className="text-sm text-gray-600">
                        Voo para Lima precisa de 2 comissários adicionais
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Alocar
                    </Button>
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

export default Dashboard;
