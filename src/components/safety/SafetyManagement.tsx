import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Search, Filter, Plus, AlertTriangle, CheckCircle, Clock, Calendar, Shield, FileText, ClipboardCheck, AlertCircle, TrendingUp, TrendingDown, User, Plane, MapPin, FileWarning } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const SafetyManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const safetyEvents = [
    {
      id: "SAF001",
      title: "Relatório de Turbulência",
      type: "flight",
      status: "investigating",
      description: "Turbulência moderada reportada durante voo LA123",
      severity: "medium",
      location: "São Paulo",
      aircraft: "PT-XAB",
      flight: "LA123",
      date: new Date(2024, 2, 1),
      reporter: {
        name: "João Silva",
        role: "Comandante",
        id: "PIL001",
      },
      affected: {
        passengers: 120,
        crew: 6,
        injuries: 2,
      },
      actions: [
        {
          date: new Date(2024, 2, 1),
          description: "Relatório inicial submetido",
          status: "completed",
        },
        {
          date: new Date(2024, 2, 2),
          description: "Análise de dados iniciada",
          status: "in_progress",
        },
      ],
      notes: "Investigando condições meteorológicas no momento do evento",
    },
    {
      id: "SAF002",
      title: "Falha de Sistema",
      type: "maintenance",
      status: "resolved",
      description: "Falha no sistema de pressurização durante manutenção",
      severity: "high",
      location: "Rio de Janeiro",
      aircraft: "PT-XCD",
      flight: null,
      date: new Date(2024, 2, 5),
      reporter: {
        name: "Pedro Oliveira",
        role: "Técnico de Manutenção",
        id: "MNT001",
      },
      affected: {
        passengers: 0,
        crew: 3,
        injuries: 0,
      },
      actions: [
        {
          date: new Date(2024, 2, 5),
          description: "Sistema isolado",
          status: "completed",
        },
        {
          date: new Date(2024, 2, 6),
          description: "Componente substituído",
          status: "completed",
        },
        {
          date: new Date(2024, 2, 7),
          description: "Testes realizados",
          status: "completed",
        },
      ],
      notes: "Componente defeituoso identificado e substituído",
    },
    {
      id: "SAF003",
      title: "Violação de Procedimento",
      type: "ground",
      status: "monitoring",
      description: "Violação de procedimento de embarque",
      severity: "low",
      location: "Belo Horizonte",
      aircraft: "PT-XEF",
      flight: "LA456",
      date: new Date(2024, 2, 10),
      reporter: {
        name: "Ana Santos",
        role: "Supervisor de Operações",
        id: "OPS001",
      },
      affected: {
        passengers: 80,
        crew: 5,
        injuries: 0,
      },
      actions: [
        {
          date: new Date(2024, 2, 10),
          description: "Treinamento adicional agendado",
          status: "in_progress",
        },
      ],
      notes: "Revisão de procedimentos em andamento",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "text-green-600 bg-green-50";
      case "investigating":
        return "text-yellow-600 bg-yellow-50";
      case "monitoring":
        return "text-blue-600 bg-blue-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved":
        return <CheckCircle className="h-4 w-4" />;
      case "investigating":
        return <Clock className="h-4 w-4" />;
      case "monitoring":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "flight":
        return "text-blue-600 bg-blue-50";
      case "maintenance":
        return "text-purple-600 bg-purple-50";
      case "ground":
        return "text-orange-600 bg-orange-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-red-600";
      case "high":
        return "text-orange-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Gestão de Segurança</h1>
        <p className="text-gray-500">Gerencie eventos de segurança e conformidade</p>
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
                      placeholder="Pesquisar eventos..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-[300px]"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="resolved">Resolvido</SelectItem>
                      <SelectItem value="investigating">Investigando</SelectItem>
                      <SelectItem value="monitoring">Monitorando</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="flight">Voo</SelectItem>
                      <SelectItem value="maintenance">Manutenção</SelectItem>
                      <SelectItem value="ground">Terra</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Evento
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Título</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Severidade</TableHead>
                    <TableHead>Localização</TableHead>
                    <TableHead>Aeronave</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Reporter</TableHead>
                    <TableHead>Afetados</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {safetyEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">{event.id}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            <FileWarning className="h-4 w-4 mr-2 text-gray-500" />
                            {event.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {event.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                            event.type
                          )}`}
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          <span className="capitalize">
                            {event.type === "flight" ? "Voo" : event.type === "maintenance" ? "Manutenção" : "Terra"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            event.status
                          )}`}
                        >
                          {getStatusIcon(event.status)}
                          <span className="ml-1 capitalize">
                            {event.status === "resolved" ? "Resolvido" : event.status === "investigating" ? "Investigando" : "Monitorando"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className={`text-sm font-medium ${getSeverityColor(event.severity)}`}>
                          {event.severity === "critical" ? "Crítico" : event.severity === "high" ? "Alto" : event.severity === "medium" ? "Médio" : "Baixo"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                          {event.location}
                        </div>
                      </TableCell>
                      <TableCell>
                        {event.aircraft ? (
                          <div className="flex items-center">
                            <Plane className="h-4 w-4 mr-1 text-gray-500" />
                            {event.aircraft}
                          </div>
                        ) : (
                          <span className="text-gray-500">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Calendar className="h-3 w-3 mr-1" />
                          {format(event.date, "dd/MM/yyyy", { locale: ptBR })}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-1 text-gray-500" />
                            {event.reporter.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {event.reporter.role}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="text-sm">
                            {event.affected.passengers + event.affected.crew} pessoas
                          </div>
                          <div className="text-sm text-gray-500">
                            {event.affected.injuries} feridos
                          </div>
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
                  <span className="text-gray-500">Total de Eventos</span>
                  <span className="font-semibold">{safetyEvents.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Resolvidos</span>
                  <span className="font-semibold text-green-600">
                    {safetyEvents.filter((e) => e.status === "resolved").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Investigando</span>
                  <span className="font-semibold text-yellow-600">
                    {safetyEvents.filter((e) => e.status === "investigating").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Monitorando</span>
                  <span className="font-semibold text-blue-600">
                    {safetyEvents.filter((e) => e.status === "monitoring").length}
                  </span>
                </div>
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between">
                  <span className="text-gray-500">Voo</span>
                  <span className="font-semibold text-blue-600">
                    {safetyEvents.filter((e) => e.type === "flight").length}
                  </span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-500">Manutenção</span>
                  <span className="font-semibold text-purple-600">
                    {safetyEvents.filter((e) => e.type === "maintenance").length}
                  </span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-500">Terra</span>
                  <span className="font-semibold text-orange-600">
                    {safetyEvents.filter((e) => e.type === "ground").length}
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
                  <AlertTriangle className="h-4 w-4 text-red-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium">Eventos Críticos</p>
                    <p className="text-xs text-gray-500">
                      1 evento crítico em investigação
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium">Resolução</p>
                    <p className="text-xs text-gray-500">
                      1 evento resolvido esta semana
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <TrendingDown className="h-4 w-4 text-orange-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium">Feridos</p>
                    <p className="text-xs text-gray-500">
                      2 pessoas feridas em eventos
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

export default SafetyManagement; 