import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Search, Filter, Plus, Plane, Wrench, AlertCircle, CheckCircle, Clock, Calendar, User, FileText } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const MaintenanceManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const maintenanceTasks = [
    {
      id: "MT001",
      aircraft: {
        type: "Boeing 737-800",
        registration: "PT-XPK",
      },
      type: "routine",
      status: "in_progress",
      description: "Manutenção programada A-Check",
      priority: "high",
      startDate: new Date(2024, 2, 15),
      endDate: new Date(2024, 2, 20),
      assignedTo: {
        lead: "João Silva",
        team: ["Maria Santos", "Pedro Costa"],
      },
      parts: [
        {
          name: "Filtro de Óleo",
          partNumber: "OIL-123",
          quantity: 2,
          status: "ordered",
        },
        {
          name: "Pastilhas de Freio",
          partNumber: "BRAKE-456",
          quantity: 4,
          status: "in_stock",
        },
      ],
      checklist: [
        {
          item: "Inspeção do Motor",
          status: "completed",
        },
        {
          item: "Troca de Óleo",
          status: "in_progress",
        },
        {
          item: "Teste de Sistemas",
          status: "pending",
        },
      ],
      notes: "Aguardando chegada de peças",
    },
    {
      id: "MT002",
      aircraft: {
        type: "Airbus A320",
        registration: "PT-XPL",
      },
      type: "corrective",
      status: "scheduled",
      description: "Reparo no Sistema de Pouso",
      priority: "medium",
      startDate: new Date(2024, 2, 18),
      endDate: new Date(2024, 2, 22),
      assignedTo: {
        lead: "Carlos Lima",
        team: ["Beatriz Silva", "Rafael Costa"],
      },
      parts: [
        {
          name: "Sistema de Pouso",
          partNumber: "LAND-789",
          quantity: 1,
          status: "ordered",
        },
      ],
      checklist: [
        {
          item: "Diagnóstico",
          status: "pending",
        },
        {
          item: "Remoção do Sistema",
          status: "pending",
        },
        {
          item: "Instalação",
          status: "pending",
        },
      ],
      notes: "Aguardando autorização",
    },
    {
      id: "MT003",
      aircraft: {
        type: "Boeing 737-800",
        registration: "PT-XPM",
      },
      type: "preventive",
      status: "completed",
      description: "Inspeção de Rotina",
      priority: "low",
      startDate: new Date(2024, 2, 10),
      endDate: new Date(2024, 2, 12),
      assignedTo: {
        lead: "Roberto Santos",
        team: ["Carla Lima", "Paulo Silva"],
      },
      parts: [],
      checklist: [
        {
          item: "Inspeção Visual",
          status: "completed",
        },
        {
          item: "Teste de Sistemas",
          status: "completed",
        },
        {
          item: "Documentação",
          status: "completed",
        },
      ],
      notes: "Todas as verificações OK",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-50";
      case "in_progress":
        return "text-yellow-600 bg-yellow-50";
      case "scheduled":
        return "text-blue-600 bg-blue-50";
      case "cancelled":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "in_progress":
        return <Wrench className="h-4 w-4" />;
      case "scheduled":
        return <Calendar className="h-4 w-4" />;
      case "cancelled":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50";
      case "medium":
        return "text-yellow-600 bg-yellow-50";
      case "low":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Gestão de Manutenção</h1>
        <p className="text-gray-500">Gerencie manutenções e reparos de aeronaves</p>
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
                      placeholder="Pesquisar manutenções..."
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
                      <SelectItem value="completed">Concluídas</SelectItem>
                      <SelectItem value="in_progress">Em Andamento</SelectItem>
                      <SelectItem value="scheduled">Agendadas</SelectItem>
                      <SelectItem value="cancelled">Canceladas</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="routine">Rotina</SelectItem>
                      <SelectItem value="corrective">Corretiva</SelectItem>
                      <SelectItem value="preventive">Preventiva</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Manutenção
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Aeronave</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Prioridade</TableHead>
                    <TableHead>Datas</TableHead>
                    <TableHead>Equipe</TableHead>
                    <TableHead>Peças</TableHead>
                    <TableHead>Checklist</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {maintenanceTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">{task.id}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="font-medium">{task.aircraft.type}</div>
                          <div className="text-sm text-gray-500">{task.aircraft.registration}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Wrench className="h-4 w-4 mr-1 text-blue-600" />
                          <span className="capitalize">{task.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>{task.description}</TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            task.status
                          )}`}
                        >
                          {getStatusIcon(task.status)}
                          <span className="ml-1 capitalize">
                            {task.status === "completed" ? "Concluída" : task.status === "in_progress" ? "Em Andamento" : task.status === "scheduled" ? "Agendada" : "Cancelada"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                            task.priority
                          )}`}
                        >
                          <AlertCircle className="h-4 w-4" />
                          <span className="ml-1 capitalize">{task.priority}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="flex items-center text-sm">
                            <Calendar className="h-3 w-3 mr-1" />
                            {format(task.startDate, "dd/MM/yyyy", { locale: ptBR })}
                          </div>
                          <div className="flex items-center text-sm">
                            <Calendar className="h-3 w-3 mr-1" />
                            {format(task.endDate, "dd/MM/yyyy", { locale: ptBR })}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="text-sm">
                            <span className="font-medium">Líder:</span> {task.assignedTo.lead}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Equipe:</span> {task.assignedTo.team.join(", ")}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          {task.parts.map((part, index) => (
                            <div key={index} className="text-sm">
                              <span className="font-medium">{part.name}</span> ({part.quantity}x)
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          {task.checklist.map((item, index) => (
                            <div
                              key={index}
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                item.status === "completed"
                                  ? "bg-green-50 text-green-600"
                                  : item.status === "in_progress"
                                  ? "bg-yellow-50 text-yellow-600"
                                  : "bg-gray-50 text-gray-600"
                              }`}
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              {item.item}
                            </div>
                          ))}
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
                  <span className="text-gray-500">Total de Manutenções</span>
                  <span className="font-semibold">{maintenanceTasks.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Concluídas</span>
                  <span className="font-semibold text-green-600">
                    {maintenanceTasks.filter((t) => t.status === "completed").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Em Andamento</span>
                  <span className="font-semibold text-yellow-600">
                    {maintenanceTasks.filter((t) => t.status === "in_progress").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Agendadas</span>
                  <span className="font-semibold text-blue-600">
                    {maintenanceTasks.filter((t) => t.status === "scheduled").length}
                  </span>
                </div>
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between">
                  <span className="text-gray-500">Rotina</span>
                  <span className="font-semibold text-blue-600">
                    {maintenanceTasks.filter((t) => t.type === "routine").length}
                  </span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-500">Corretiva</span>
                  <span className="font-semibold text-red-600">
                    {maintenanceTasks.filter((t) => t.type === "corrective").length}
                  </span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-500">Preventiva</span>
                  <span className="font-semibold text-green-600">
                    {maintenanceTasks.filter((t) => t.type === "preventive").length}
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
                  <AlertCircle className="h-4 w-4 text-yellow-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium">Peças Pendentes</p>
                    <p className="text-xs text-gray-500">
                      3 peças aguardando entrega
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Clock className="h-4 w-4 text-blue-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium">Próximas Manutenções</p>
                    <p className="text-xs text-gray-500">
                      2 manutenções programadas
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

export default MaintenanceManagement; 