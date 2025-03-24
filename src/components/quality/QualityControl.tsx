import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Search, Filter, Plus, Plane, AlertCircle, CheckCircle, Clock, Calendar, Wrench, Box, ArrowUp, ArrowDown, ClipboardCheck, FileCheck, ShieldCheck } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const QualityControl = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const inspections = [
    {
      id: "QC001",
      aircraft: {
        id: "AC001",
        type: "Boeing 737",
        registration: "PT-ABC",
      },
      type: "routine",
      status: "completed",
      inspector: {
        name: "Carlos Silva",
        id: "INS001",
        certification: "A&P",
      },
      date: new Date(2024, 2, 15),
      nextInspection: new Date(2024, 3, 15),
      findings: {
        total: 3,
        critical: 0,
        major: 1,
        minor: 2,
      },
      checklist: {
        total: 150,
        completed: 150,
        passed: 148,
        failed: 2,
      },
      notes: "Manutenção preventiva realizada com sucesso",
      attachments: ["relatorio.pdf", "fotos.zip"],
    },
    {
      id: "QC002",
      aircraft: {
        id: "AC002",
        type: "Airbus A320",
        registration: "PT-DEF",
      },
      type: "special",
      status: "in_progress",
      inspector: {
        name: "Ana Santos",
        id: "INS002",
        certification: "IA",
      },
      date: new Date(2024, 2, 18),
      nextInspection: new Date(2024, 4, 18),
      findings: {
        total: 5,
        critical: 1,
        major: 2,
        minor: 2,
      },
      checklist: {
        total: 200,
        completed: 120,
        passed: 115,
        failed: 5,
      },
      notes: "Inspeção especial em andamento - aguardando peças",
      attachments: ["inspecao.pdf"],
    },
    {
      id: "QC003",
      aircraft: {
        id: "AC003",
        type: "Embraer E190",
        registration: "PT-GHI",
      },
      type: "pre_delivery",
      status: "scheduled",
      inspector: {
        name: "Pedro Oliveira",
        id: "INS003",
        certification: "A&P",
      },
      date: new Date(2024, 2, 20),
      nextInspection: null,
      findings: {
        total: 0,
        critical: 0,
        major: 0,
        minor: 0,
      },
      checklist: {
        total: 180,
        completed: 0,
        passed: 0,
        failed: 0,
      },
      notes: "Inspeção pré-entrega agendada",
      attachments: [],
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
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "in_progress":
        return <Clock className="h-4 w-4" />;
      case "scheduled":
        return <Calendar className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "routine":
        return "text-blue-600 bg-blue-50";
      case "special":
        return "text-purple-600 bg-purple-50";
      case "pre_delivery":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Controle de Qualidade</h1>
        <p className="text-gray-500">Gerencie inspeções e manutenção</p>
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
                      placeholder="Pesquisar inspeções..."
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
                    </SelectContent>
                  </Select>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="routine">Rotina</SelectItem>
                      <SelectItem value="special">Especial</SelectItem>
                      <SelectItem value="pre_delivery">Pré-Entrega</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Inspeção
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
                    <TableHead>Status</TableHead>
                    <TableHead>Inspetor</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Próxima</TableHead>
                    <TableHead>Checklist</TableHead>
                    <TableHead>Findings</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inspections.map((inspection) => (
                    <TableRow key={inspection.id}>
                      <TableCell className="font-medium">{inspection.id}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            <Plane className="h-4 w-4 mr-2 text-gray-500" />
                            {inspection.aircraft.type}
                          </div>
                          <div className="text-sm text-gray-500">
                            {inspection.aircraft.registration}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                            inspection.type
                          )}`}
                        >
                          <ClipboardCheck className="h-4 w-4 mr-1" />
                          <span className="capitalize">
                            {inspection.type === "routine" ? "Rotina" : inspection.type === "special" ? "Especial" : "Pré-Entrega"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            inspection.status
                          )}`}
                        >
                          {getStatusIcon(inspection.status)}
                          <span className="ml-1 capitalize">
                            {inspection.status === "completed" ? "Concluída" : inspection.status === "in_progress" ? "Em Andamento" : "Agendada"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="text-sm">{inspection.inspector.name}</div>
                          <div className="text-sm text-gray-500">
                            {inspection.inspector.certification}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Calendar className="h-3 w-3 mr-1" />
                          {format(inspection.date, "dd/MM/yyyy", { locale: ptBR })}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Calendar className="h-3 w-3 mr-1" />
                          {inspection.nextInspection
                            ? format(inspection.nextInspection, "dd/MM/yyyy", { locale: ptBR })
                            : "N/A"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="text-sm">
                            {inspection.checklist.completed}/{inspection.checklist.total}
                          </div>
                          <div className="text-sm text-gray-500">
                            {inspection.checklist.passed} passaram
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="text-sm">
                            {inspection.findings.total} total
                          </div>
                          <div className="text-sm text-gray-500">
                            {inspection.findings.critical} críticos
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
                  <span className="text-gray-500">Total de Inspeções</span>
                  <span className="font-semibold">{inspections.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Concluídas</span>
                  <span className="font-semibold text-green-600">
                    {inspections.filter((i) => i.status === "completed").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Em Andamento</span>
                  <span className="font-semibold text-yellow-600">
                    {inspections.filter((i) => i.status === "in_progress").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Agendadas</span>
                  <span className="font-semibold text-blue-600">
                    {inspections.filter((i) => i.status === "scheduled").length}
                  </span>
                </div>
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between">
                  <span className="text-gray-500">Rotina</span>
                  <span className="font-semibold text-blue-600">
                    {inspections.filter((i) => i.type === "routine").length}
                  </span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-500">Especial</span>
                  <span className="font-semibold text-purple-600">
                    {inspections.filter((i) => i.type === "special").length}
                  </span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-500">Pré-Entrega</span>
                  <span className="font-semibold text-green-600">
                    {inspections.filter((i) => i.type === "pre_delivery").length}
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
                  <AlertCircle className="h-4 w-4 text-red-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium">Findings Críticos</p>
                    <p className="text-xs text-gray-500">
                      1 finding crítico em inspeção especial
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Clock className="h-4 w-4 text-blue-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium">Próximas Inspeções</p>
                    <p className="text-xs text-gray-500">
                      2 inspeções agendadas para esta semana
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

export default QualityControl; 