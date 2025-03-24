import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Search, Filter, Plus, FileCheck, AlertCircle, CheckCircle, Clock, Calendar, Shield, FileText, ClipboardCheck, AlertTriangle } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const ComplianceManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const requirements = [
    {
      id: "COMP001",
      name: "Regulamento ANAC 61",
      type: "regulatory",
      status: "compliant",
      description: "Regulamento de Certificação de Pilotos",
      regulator: "ANAC",
      lastAudit: new Date(2024, 2, 1),
      nextAudit: new Date(2024, 8, 1),
      findings: {
        total: 0,
        critical: 0,
        major: 0,
        minor: 0,
      },
      documents: [
        {
          name: "Manual de Operações",
          type: "pdf",
          lastUpdated: new Date(2024, 2, 1),
          status: "approved",
        },
        {
          name: "Checklist de Verificação",
          type: "doc",
          lastUpdated: new Date(2024, 2, 1),
          status: "approved",
        },
      ],
      responsible: {
        name: "Carlos Silva",
        department: "Operações",
        email: "carlos@company.com",
      },
      notes: "Em conformidade com todos os requisitos",
    },
    {
      id: "COMP002",
      name: "ISO 9001:2015",
      type: "certification",
      status: "pending",
      description: "Sistema de Gestão da Qualidade",
      regulator: "ISO",
      lastAudit: new Date(2024, 1, 15),
      nextAudit: new Date(2024, 7, 15),
      findings: {
        total: 3,
        critical: 0,
        major: 1,
        minor: 2,
      },
      documents: [
        {
          name: "Manual da Qualidade",
          type: "pdf",
          lastUpdated: new Date(2024, 2, 10),
          status: "review",
        },
        {
          name: "Procedimentos Operacionais",
          type: "doc",
          lastUpdated: new Date(2024, 2, 10),
          status: "review",
        },
      ],
      responsible: {
        name: "Ana Santos",
        department: "Qualidade",
        email: "ana@company.com",
      },
      notes: "Aguardando revisão final dos documentos",
    },
    {
      id: "COMP003",
      name: "Regulamento ANAC 121",
      type: "regulatory",
      status: "non_compliant",
      description: "Regulamento de Operações Aéreas",
      regulator: "ANAC",
      lastAudit: new Date(2024, 2, 5),
      nextAudit: new Date(2024, 5, 5),
      findings: {
        total: 5,
        critical: 1,
        major: 2,
        minor: 2,
      },
      documents: [
        {
          name: "Manual de Manutenção",
          type: "pdf",
          lastUpdated: new Date(2024, 2, 15),
          status: "rejected",
        },
        {
          name: "Programa de Manutenção",
          type: "doc",
          lastUpdated: new Date(2024, 2, 15),
          status: "rejected",
        },
      ],
      responsible: {
        name: "Pedro Oliveira",
        department: "Manutenção",
        email: "pedro@company.com",
      },
      notes: "Ações corretivas em andamento",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "compliant":
        return "text-green-600 bg-green-50";
      case "pending":
        return "text-yellow-600 bg-yellow-50";
      case "non_compliant":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "compliant":
        return <CheckCircle className="h-4 w-4" />;
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "non_compliant":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "regulatory":
        return "text-blue-600 bg-blue-50";
      case "certification":
        return "text-purple-600 bg-purple-50";
      case "internal":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Gestão de Conformidade</h1>
        <p className="text-gray-500">Gerencie requisitos e auditorias</p>
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
                      placeholder="Pesquisar requisitos..."
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
                      <SelectItem value="compliant">Conforme</SelectItem>
                      <SelectItem value="pending">Pendente</SelectItem>
                      <SelectItem value="non_compliant">Não Conforme</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="regulatory">Regulatório</SelectItem>
                      <SelectItem value="certification">Certificação</SelectItem>
                      <SelectItem value="internal">Interno</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Requisito
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
                    <TableHead>Regulador</TableHead>
                    <TableHead>Responsável</TableHead>
                    <TableHead>Última Auditoria</TableHead>
                    <TableHead>Próxima Auditoria</TableHead>
                    <TableHead>Findings</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requirements.map((requirement) => (
                    <TableRow key={requirement.id}>
                      <TableCell className="font-medium">{requirement.id}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            <Shield className="h-4 w-4 mr-2 text-gray-500" />
                            {requirement.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {requirement.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                            requirement.type
                          )}`}
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          <span className="capitalize">
                            {requirement.type === "regulatory" ? "Regulatório" : requirement.type === "certification" ? "Certificação" : "Interno"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            requirement.status
                          )}`}
                        >
                          {getStatusIcon(requirement.status)}
                          <span className="ml-1 capitalize">
                            {requirement.status === "compliant" ? "Conforme" : requirement.status === "pending" ? "Pendente" : "Não Conforme"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <ClipboardCheck className="h-4 w-4 mr-1 text-gray-500" />
                          {requirement.regulator}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="text-sm">{requirement.responsible.name}</div>
                          <div className="text-sm text-gray-500">
                            {requirement.responsible.department}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Calendar className="h-3 w-3 mr-1" />
                          {format(requirement.lastAudit, "dd/MM/yyyy", { locale: ptBR })}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Calendar className="h-3 w-3 mr-1" />
                          {format(requirement.nextAudit, "dd/MM/yyyy", { locale: ptBR })}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="text-sm">
                            {requirement.findings.total} total
                          </div>
                          <div className="text-sm text-gray-500">
                            {requirement.findings.critical} críticos
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
                  <span className="text-gray-500">Total de Requisitos</span>
                  <span className="font-semibold">{requirements.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Conformes</span>
                  <span className="font-semibold text-green-600">
                    {requirements.filter((r) => r.status === "compliant").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Pendentes</span>
                  <span className="font-semibold text-yellow-600">
                    {requirements.filter((r) => r.status === "pending").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Não Conformes</span>
                  <span className="font-semibold text-red-600">
                    {requirements.filter((r) => r.status === "non_compliant").length}
                  </span>
                </div>
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between">
                  <span className="text-gray-500">Regulatório</span>
                  <span className="font-semibold text-blue-600">
                    {requirements.filter((r) => r.type === "regulatory").length}
                  </span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-500">Certificação</span>
                  <span className="font-semibold text-purple-600">
                    {requirements.filter((r) => r.type === "certification").length}
                  </span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-500">Interno</span>
                  <span className="font-semibold text-green-600">
                    {requirements.filter((r) => r.type === "internal").length}
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
                    <p className="text-sm font-medium">Findings Críticos</p>
                    <p className="text-xs text-gray-500">
                      1 finding crítico em requisito regulatório
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Clock className="h-4 w-4 text-blue-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium">Próximas Auditorias</p>
                    <p className="text-xs text-gray-500">
                      2 auditorias agendadas para este mês
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

export default ComplianceManagement; 