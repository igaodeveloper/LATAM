import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Search, Filter, Plus, AlertTriangle, CheckCircle, Clock, Calendar, Shield, FileText, ClipboardCheck, AlertCircle, TrendingUp, TrendingDown, User, Plane, MapPin } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const IncidentManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const incidents = [
    {
      id: "INC001",
      title: "Atraso na Decolagem",
      type: "operational",
      status: "resolved",
      description: "Atraso de 45 minutos na decolagem do voo LA123",
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
      },
      impact: {
        financial: "R$ 5.000",
        operational: "45 min delay",
      },
      actions: [
        {
          date: new Date(2024, 2, 1),
          description: "Investigação iniciada",
          status: "completed",
        },
        {
          date: new Date(2024, 2, 2),
          description: "Relatório finalizado",
          status: "completed",
        },
      ],
      notes: "Causa: Falha no sistema de embarque",
    },
    {
      id: "INC002",
      title: "Falha de Sistema",
      type: "technical",
      status: "investigating",
      description: "Falha no sistema de reservas durante pico de demanda",
      severity: "high",
      location: "Rio de Janeiro",
      aircraft: null,
      flight: null,
      date: new Date(2024, 2, 5),
      reporter: {
        name: "Maria Santos",
        role: "Supervisor TI",
        id: "IT001",
      },
      affected: {
        passengers: 500,
        crew: 0,
      },
      impact: {
        financial: "R$ 15.000",
        operational: "2h system outage",
      },
      actions: [
        {
          date: new Date(2024, 2, 5),
          description: "Equipe de suporte acionada",
          status: "completed",
        },
        {
          date: new Date(2024, 2, 5),
          description: "Backup restaurado",
          status: "completed",
        },
        {
          date: new Date(2024, 2, 6),
          description: "Análise de causa raiz",
          status: "in_progress",
        },
      ],
      notes: "Investigando vulnerabilidade no sistema",
    },
    {
      id: "INC003",
      title: "Condições Climáticas",
      type: "weather",
      status: "monitoring",
      description: "Temporada de chuvas intensas afetando operações",
      severity: "low",
      location: "Belo Horizonte",
      aircraft: null,
      flight: "LA456",
      date: new Date(2024, 2, 10),
      reporter: {
        name: "Carlos Oliveira",
        role: "Controlador de Voo",
        id: "ATC001",
      },
      affected: {
        passengers: 80,
        crew: 5,
      },
      impact: {
        financial: "R$ 2.000",
        operational: "30 min delay",
      },
      actions: [
        {
          date: new Date(2024, 2, 10),
          description: "Monitoramento iniciado",
          status: "in_progress",
        },
      ],
      notes: "Acompanhando previsão do tempo",
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
      case "operational":
        return "text-blue-600 bg-blue-50";
      case "technical":
        return "text-purple-600 bg-purple-50";
      case "weather":
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
        <h1 className="text-3xl font-bold text-gray-900">Gestão de Incidentes</h1>
        <p className="text-gray-500">Gerencie incidentes e eventos de segurança</p>
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
                      placeholder="Pesquisar incidentes..."
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
                      <SelectItem value="operational">Operacional</SelectItem>
                      <SelectItem value="technical">Técnico</SelectItem>
                      <SelectItem value="weather">Climático</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Incidente
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
                    <TableHead>Voo</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Reporter</TableHead>
                    <TableHead>Impacto</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {incidents.map((incident) => (
                    <TableRow key={incident.id}>
                      <TableCell className="font-medium">{incident.id}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            <AlertTriangle className="h-4 w-4 mr-2 text-gray-500" />
                            {incident.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {incident.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                            incident.type
                          )}`}
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          <span className="capitalize">
                            {incident.type === "operational" ? "Operacional" : incident.type === "technical" ? "Técnico" : "Climático"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            incident.status
                          )}`}
                        >
                          {getStatusIcon(incident.status)}
                          <span className="ml-1 capitalize">
                            {incident.status === "resolved" ? "Resolvido" : incident.status === "investigating" ? "Investigando" : "Monitorando"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className={`text-sm font-medium ${getSeverityColor(incident.severity)}`}>
                          {incident.severity === "critical" ? "Crítico" : incident.severity === "high" ? "Alto" : incident.severity === "medium" ? "Médio" : "Baixo"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                          {incident.location}
                        </div>
                      </TableCell>
                      <TableCell>
                        {incident.flight ? (
                          <div className="flex items-center">
                            <Plane className="h-4 w-4 mr-1 text-gray-500" />
                            {incident.flight}
                          </div>
                        ) : (
                          <span className="text-gray-500">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Calendar className="h-3 w-3 mr-1" />
                          {format(incident.date, "dd/MM/yyyy", { locale: ptBR })}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-1 text-gray-500" />
                            {incident.reporter.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {incident.reporter.role}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="text-sm">
                            {incident.impact.financial}
                          </div>
                          <div className="text-sm text-gray-500">
                            {incident.impact.operational}
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
                  <span className="text-gray-500">Total de Incidentes</span>
                  <span className="font-semibold">{incidents.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Resolvidos</span>
                  <span className="font-semibold text-green-600">
                    {incidents.filter((i) => i.status === "resolved").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Investigando</span>
                  <span className="font-semibold text-yellow-600">
                    {incidents.filter((i) => i.status === "investigating").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Monitorando</span>
                  <span className="font-semibold text-blue-600">
                    {incidents.filter((i) => i.status === "monitoring").length}
                  </span>
                </div>
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between">
                  <span className="text-gray-500">Operacional</span>
                  <span className="font-semibold text-blue-600">
                    {incidents.filter((i) => i.type === "operational").length}
                  </span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-500">Técnico</span>
                  <span className="font-semibold text-purple-600">
                    {incidents.filter((i) => i.type === "technical").length}
                  </span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-500">Climático</span>
                  <span className="font-semibold text-orange-600">
                    {incidents.filter((i) => i.type === "weather").length}
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
                    <p className="text-sm font-medium">Incidentes Críticos</p>
                    <p className="text-xs text-gray-500">
                      1 incidente crítico em investigação
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium">Resolução</p>
                    <p className="text-xs text-gray-500">
                      2 incidentes resolvidos hoje
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <TrendingDown className="h-4 w-4 text-orange-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium">Impacto</p>
                    <p className="text-xs text-gray-500">
                      R$ 22.000 em impactos financeiros
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

export default IncidentManagement; 