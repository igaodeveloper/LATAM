import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Search, Filter, Plus, Download, FileText, BarChart, PieChart, LineChart, Calendar, Clock, User, FileSpreadsheet, File, FileText as FileWordIcon, Mail, Share2, Eye, Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const Reporting = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const reports = [
    {
      id: "REP001",
      name: "Relatório de Performance Operacional",
      type: "operational",
      status: "completed",
      format: "pdf",
      createdBy: {
        name: "João Silva",
        role: "Analista de Operações",
        id: "USR001",
      },
      createdAt: new Date(2024, 2, 1),
      lastUpdated: new Date(2024, 2, 1),
      schedule: {
        frequency: "monthly",
        lastRun: new Date(2024, 2, 1),
        nextRun: new Date(2024, 3, 1),
      },
      recipients: [
        { name: "Maria Santos", email: "maria.santos@company.com", role: "Gerente" },
        { name: "Pedro Oliveira", email: "pedro.oliveira@company.com", role: "Diretor" },
      ],
      details: {
        pages: 25,
        size: "2.5 MB",
        dataPoints: 1500,
        charts: 8,
      },
    },
    {
      id: "REP002",
      name: "Análise Financeira Mensal",
      type: "financial",
      status: "in_progress",
      format: "excel",
      createdBy: {
        name: "Ana Costa",
        role: "Analista Financeiro",
        id: "USR002",
      },
      createdAt: new Date(2024, 2, 5),
      lastUpdated: new Date(2024, 2, 10),
      schedule: {
        frequency: "monthly",
        lastRun: new Date(2024, 2, 5),
        nextRun: new Date(2024, 3, 5),
      },
      recipients: [
        { name: "Carlos Lima", email: "carlos.lima@company.com", role: "CFO" },
        { name: "Sandra Silva", email: "sandra.silva@company.com", role: "Controller" },
      ],
      details: {
        pages: 15,
        size: "1.8 MB",
        dataPoints: 800,
        charts: 5,
      },
    },
    {
      id: "REP003",
      name: "Dashboard de Segurança",
      type: "safety",
      status: "scheduled",
      format: "dashboard",
      createdBy: {
        name: "Roberto Santos",
        role: "Gerente de Segurança",
        id: "USR003",
      },
      createdAt: new Date(2024, 2, 10),
      lastUpdated: new Date(2024, 2, 10),
      schedule: {
        frequency: "weekly",
        lastRun: new Date(2024, 2, 10),
        nextRun: new Date(2024, 2, 17),
      },
      recipients: [
        { name: "Paulo Mendes", email: "paulo.mendes@company.com", role: "Diretor de Operações" },
        { name: "Laura Costa", email: "laura.costa@company.com", role: "Gerente de Qualidade" },
      ],
      details: {
        pages: 10,
        size: "1.2 MB",
        dataPoints: 600,
        charts: 4,
      },
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

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "pdf":
        return <FilePdf className="h-4 w-4" />;
      case "excel":
        return <FileSpreadsheet className="h-4 w-4" />;
      case "word":
        return <FileWordIcon className="h-4 w-4" />;
      case "dashboard":
        return <BarChart className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Relatórios</h1>
        <p className="text-gray-500">Gerencie e visualize relatórios operacionais</p>
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
                      placeholder="Pesquisar relatórios..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-[300px]"
                    />
                  </div>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="operational">Operacional</SelectItem>
                      <SelectItem value="financial">Financeiro</SelectItem>
                      <SelectItem value="safety">Segurança</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="completed">Concluído</SelectItem>
                      <SelectItem value="in_progress">Em Andamento</SelectItem>
                      <SelectItem value="scheduled">Agendado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Relatório
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Formato</TableHead>
                    <TableHead>Criado Por</TableHead>
                    <TableHead>Data de Criação</TableHead>
                    <TableHead>Última Atualização</TableHead>
                    <TableHead>Agendamento</TableHead>
                    <TableHead>Detalhes</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-gray-500" />
                          {report.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="capitalize">
                          {report.type === "operational" ? "Operacional" : report.type === "financial" ? "Financeiro" : "Segurança"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            report.status
                          )}`}
                        >
                          {getStatusIcon(report.status)}
                          <span className="ml-1 capitalize">
                            {report.status === "completed" ? "Concluído" : report.status === "in_progress" ? "Em Andamento" : "Agendado"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {getFormatIcon(report.format)}
                          <span className="ml-1 capitalize">
                            {report.format === "dashboard" ? "Dashboard" : report.format.toUpperCase()}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="font-medium">{report.createdBy.name}</div>
                          <div className="text-sm text-gray-500">{report.createdBy.role}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Calendar className="h-3 w-3 mr-1" />
                          {format(report.createdAt, "dd/MM/yyyy", { locale: ptBR })}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Clock className="h-3 w-3 mr-1" />
                          {format(report.lastUpdated, "dd/MM/yyyy", { locale: ptBR })}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="text-sm capitalize">
                            {report.schedule.frequency === "daily" ? "Diário" : report.schedule.frequency === "weekly" ? "Semanal" : "Mensal"}
                          </div>
                          <div className="text-sm text-gray-500">
                            Próximo: {format(report.schedule.nextRun, "dd/MM/yyyy", { locale: ptBR })}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="text-sm">
                            {report.details.pages} páginas
                          </div>
                          <div className="text-sm text-gray-500">
                            {report.details.size} • {report.details.charts} gráficos
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
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
                  <span className="text-gray-500">Total de Relatórios</span>
                  <span className="font-semibold">{reports.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Concluídos</span>
                  <span className="font-semibold text-green-600">
                    {reports.filter((r) => r.status === "completed").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Em Andamento</span>
                  <span className="font-semibold text-yellow-600">
                    {reports.filter((r) => r.status === "in_progress").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Agendados</span>
                  <span className="font-semibold text-blue-600">
                    {reports.filter((r) => r.status === "scheduled").length}
                  </span>
                </div>
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between">
                  <span className="text-gray-500">Operacional</span>
                  <span className="font-semibold text-blue-600">
                    {reports.filter((r) => r.type === "operational").length}
                  </span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-500">Financeiro</span>
                  <span className="font-semibold text-purple-600">
                    {reports.filter((r) => r.type === "financial").length}
                  </span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-500">Segurança</span>
                  <span className="font-semibold text-orange-600">
                    {reports.filter((r) => r.type === "safety").length}
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
                  <BarChart className="h-4 w-4 text-blue-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium">Relatórios Ativos</p>
                    <p className="text-xs text-gray-500">
                      8 relatórios em execução
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Calendar className="h-4 w-4 text-green-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium">Próximos Relatórios</p>
                    <p className="text-xs text-gray-500">
                      3 relatórios agendados
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <User className="h-4 w-4 text-purple-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium">Criadores</p>
                    <p className="text-xs text-gray-500">
                      5 usuários ativos
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

export default Reporting; 