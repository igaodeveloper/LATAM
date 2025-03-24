import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Search, Filter, Plus, AlertTriangle, CheckCircle, Clock, Calendar, Shield, FileText, ClipboardCheck, AlertCircle, TrendingUp, TrendingDown } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const RiskManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const risks = [
    {
      id: "RISK001",
      name: "Atraso em Manutenção",
      type: "operational",
      status: "active",
      description: "Risco de atraso na manutenção programada da frota",
      impact: "high",
      probability: "medium",
      mitigation: "Aumentar equipe de manutenção",
      owner: {
        name: "Pedro Oliveira",
        department: "Manutenção",
        email: "pedro@company.com",
      },
      lastUpdate: new Date(2024, 2, 1),
      nextReview: new Date(2024, 3, 1),
      incidents: [
        {
          date: new Date(2024, 2, 1),
          description: "Atraso de 2 horas na manutenção",
          severity: "medium",
          status: "resolved",
        },
      ],
      controls: [
        {
          name: "Plano de Contingência",
          status: "implemented",
          effectiveness: "high",
        },
        {
          name: "Treinamento da Equipe",
          status: "in_progress",
          effectiveness: "medium",
        },
      ],
      notes: "Monitorando indicadores de performance",
    },
    {
      id: "RISK002",
      name: "Interrupção de Serviço",
      type: "technical",
      status: "mitigated",
      description: "Risco de interrupção do sistema de reservas",
      impact: "critical",
      probability: "low",
      mitigation: "Implementar redundância",
      owner: {
        name: "Ana Santos",
        department: "TI",
        email: "ana@company.com",
      },
      lastUpdate: new Date(2024, 2, 5),
      nextReview: new Date(2024, 5, 5),
      incidents: [
        {
          date: new Date(2024, 1, 15),
          description: "Falha no servidor principal",
          severity: "high",
          status: "resolved",
        },
      ],
      controls: [
        {
          name: "Backup Automático",
          status: "implemented",
          effectiveness: "high",
        },
        {
          name: "Monitoramento 24/7",
          status: "implemented",
          effectiveness: "high",
        },
      ],
      notes: "Sistema redundante implementado com sucesso",
    },
    {
      id: "RISK003",
      name: "Condições Climáticas",
      type: "external",
      status: "monitoring",
      description: "Risco de condições climáticas adversas",
      impact: "medium",
      probability: "high",
      mitigation: "Plano de contingência climática",
      owner: {
        name: "Carlos Silva",
        department: "Operações",
        email: "carlos@company.com",
      },
      lastUpdate: new Date(2024, 2, 10),
      nextReview: new Date(2024, 3, 10),
      incidents: [
        {
          date: new Date(2024, 2, 10),
          description: "Temporada de chuvas intensas",
          severity: "low",
          status: "monitoring",
        },
      ],
      controls: [
        {
          name: "Monitoramento Meteorológico",
          status: "implemented",
          effectiveness: "high",
        },
        {
          name: "Procedimentos de Emergência",
          status: "implemented",
          effectiveness: "medium",
        },
      ],
      notes: "Acompanhando previsão do tempo",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-red-600 bg-red-50";
      case "mitigated":
        return "text-green-600 bg-green-50";
      case "monitoring":
        return "text-yellow-600 bg-yellow-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <AlertTriangle className="h-4 w-4" />;
      case "mitigated":
        return <CheckCircle className="h-4 w-4" />;
      case "monitoring":
        return <Clock className="h-4 w-4" />;
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
      case "external":
        return "text-orange-600 bg-orange-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
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
        <h1 className="text-3xl font-bold text-gray-900">Gestão de Riscos</h1>
        <p className="text-gray-500">Gerencie riscos e incidentes</p>
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
                      placeholder="Pesquisar riscos..."
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
                      <SelectItem value="active">Ativo</SelectItem>
                      <SelectItem value="mitigated">Mitigado</SelectItem>
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
                      <SelectItem value="external">Externo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Risco
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
                    <TableHead>Impacto</TableHead>
                    <TableHead>Probabilidade</TableHead>
                    <TableHead>Responsável</TableHead>
                    <TableHead>Última Atualização</TableHead>
                    <TableHead>Próxima Revisão</TableHead>
                    <TableHead>Incidentes</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {risks.map((risk) => (
                    <TableRow key={risk.id}>
                      <TableCell className="font-medium">{risk.id}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            <Shield className="h-4 w-4 mr-2 text-gray-500" />
                            {risk.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {risk.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                            risk.type
                          )}`}
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          <span className="capitalize">
                            {risk.type === "operational" ? "Operacional" : risk.type === "technical" ? "Técnico" : "Externo"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            risk.status
                          )}`}
                        >
                          {getStatusIcon(risk.status)}
                          <span className="ml-1 capitalize">
                            {risk.status === "active" ? "Ativo" : risk.status === "mitigated" ? "Mitigado" : "Monitorando"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className={`text-sm font-medium ${getImpactColor(risk.impact)}`}>
                          {risk.impact === "critical" ? "Crítico" : risk.impact === "high" ? "Alto" : risk.impact === "medium" ? "Médio" : "Baixo"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm font-medium">
                          {risk.probability === "high" ? "Alta" : risk.probability === "medium" ? "Média" : "Baixa"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="text-sm">{risk.owner.name}</div>
                          <div className="text-sm text-gray-500">
                            {risk.owner.department}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Calendar className="h-3 w-3 mr-1" />
                          {format(risk.lastUpdate, "dd/MM/yyyy", { locale: ptBR })}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Calendar className="h-3 w-3 mr-1" />
                          {format(risk.nextReview, "dd/MM/yyyy", { locale: ptBR })}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="text-sm">
                            {risk.incidents.length} incidente(s)
                          </div>
                          <div className="text-sm text-gray-500">
                            {risk.incidents.filter((i) => i.status === "resolved").length} resolvido(s)
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
                  <span className="text-gray-500">Total de Riscos</span>
                  <span className="font-semibold">{risks.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Ativos</span>
                  <span className="font-semibold text-red-600">
                    {risks.filter((r) => r.status === "active").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Mitigados</span>
                  <span className="font-semibold text-green-600">
                    {risks.filter((r) => r.status === "mitigated").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Monitorando</span>
                  <span className="font-semibold text-yellow-600">
                    {risks.filter((r) => r.status === "monitoring").length}
                  </span>
                </div>
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between">
                  <span className="text-gray-500">Operacional</span>
                  <span className="font-semibold text-blue-600">
                    {risks.filter((r) => r.type === "operational").length}
                  </span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-500">Técnico</span>
                  <span className="font-semibold text-purple-600">
                    {risks.filter((r) => r.type === "technical").length}
                  </span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-500">Externo</span>
                  <span className="font-semibold text-orange-600">
                    {risks.filter((r) => r.type === "external").length}
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
                    <p className="text-sm font-medium">Riscos Críticos</p>
                    <p className="text-xs text-gray-500">
                      1 risco crítico ativo
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium">Mitigação</p>
                    <p className="text-xs text-gray-500">
                      2 riscos mitigados este mês
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <TrendingDown className="h-4 w-4 text-orange-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium">Incidentes</p>
                    <p className="text-xs text-gray-500">
                      3 incidentes reportados
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

export default RiskManagement; 