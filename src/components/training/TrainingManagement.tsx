import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Search, Filter, Plus, User, AlertCircle, CheckCircle, Clock, Calendar, GraduationCap, Award, BookOpen, Users } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const TrainingManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const trainings = [
    {
      id: "TR001",
      name: "Manutenção de Motor",
      type: "technical",
      status: "completed",
      instructor: {
        name: "João Santos",
        id: "INS001",
        department: "Manutenção",
      },
      participants: [
        {
          name: "Carlos Silva",
          id: "EMP001",
          department: "Manutenção",
          status: "completed",
          score: 95,
        },
        {
          name: "Ana Oliveira",
          id: "EMP002",
          department: "Manutenção",
          status: "completed",
          score: 88,
        },
      ],
      startDate: new Date(2024, 2, 1),
      endDate: new Date(2024, 2, 5),
      nextSession: new Date(2024, 3, 1),
      location: "Sala de Treinamento A",
      duration: "40 horas",
      materials: ["manual.pdf", "slides.pptx"],
      prerequisites: ["Manutenção Básica", "Segurança"],
      certification: "A&P",
    },
    {
      id: "TR002",
      name: "Segurança de Voo",
      type: "safety",
      status: "in_progress",
      instructor: {
        name: "Maria Costa",
        id: "INS002",
        department: "Segurança",
      },
      participants: [
        {
          name: "Pedro Lima",
          id: "EMP003",
          department: "Operações",
          status: "in_progress",
          score: null,
        },
        {
          name: "Laura Santos",
          id: "EMP004",
          department: "Operações",
          status: "in_progress",
          score: null,
        },
      ],
      startDate: new Date(2024, 2, 15),
      endDate: new Date(2024, 2, 20),
      nextSession: null,
      location: "Sala de Treinamento B",
      duration: "20 horas",
      materials: ["manual.pdf", "videos.zip"],
      prerequisites: ["Introdução à Aviação"],
      certification: "Safety Management",
    },
    {
      id: "TR003",
      name: "Gestão de Equipe",
      type: "leadership",
      status: "scheduled",
      instructor: {
        name: "Roberto Alves",
        id: "INS003",
        department: "RH",
      },
      participants: [
        {
          name: "Marcos Silva",
          id: "EMP005",
          department: "Manutenção",
          status: "registered",
          score: null,
        },
        {
          name: "Carla Lima",
          id: "EMP006",
          department: "Operações",
          status: "registered",
          score: null,
        },
      ],
      startDate: new Date(2024, 3, 1),
      endDate: new Date(2024, 3, 3),
      nextSession: new Date(2024, 3, 1),
      location: "Sala de Treinamento C",
      duration: "16 horas",
      materials: ["manual.pdf", "exercicios.pdf"],
      prerequisites: ["Experiência em Gestão"],
      certification: "Leadership Development",
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
      case "technical":
        return "text-blue-600 bg-blue-50";
      case "safety":
        return "text-purple-600 bg-purple-50";
      case "leadership":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Gestão de Treinamentos</h1>
        <p className="text-gray-500">Gerencie treinamentos e certificações</p>
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
                      placeholder="Pesquisar treinamentos..."
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
                      <SelectItem value="completed">Concluídos</SelectItem>
                      <SelectItem value="in_progress">Em Andamento</SelectItem>
                      <SelectItem value="scheduled">Agendados</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="technical">Técnico</SelectItem>
                      <SelectItem value="safety">Segurança</SelectItem>
                      <SelectItem value="leadership">Liderança</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Treinamento
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
                    <TableHead>Instrutor</TableHead>
                    <TableHead>Participantes</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Duração</TableHead>
                    <TableHead>Certificação</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trainings.map((training) => (
                    <TableRow key={training.id}>
                      <TableCell className="font-medium">{training.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <GraduationCap className="h-4 w-4 mr-2 text-gray-500" />
                          {training.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                            training.type
                          )}`}
                        >
                          <BookOpen className="h-4 w-4 mr-1" />
                          <span className="capitalize">
                            {training.type === "technical" ? "Técnico" : training.type === "safety" ? "Segurança" : "Liderança"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            training.status
                          )}`}
                        >
                          {getStatusIcon(training.status)}
                          <span className="ml-1 capitalize">
                            {training.status === "completed" ? "Concluído" : training.status === "in_progress" ? "Em Andamento" : "Agendado"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="text-sm">{training.instructor.name}</div>
                          <div className="text-sm text-gray-500">
                            {training.instructor.department}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="text-sm">
                            {training.participants.length} participantes
                          </div>
                          <div className="text-sm text-gray-500">
                            {training.participants.filter((p) => p.status === "completed").length} concluíram
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="text-sm">
                            {format(training.startDate, "dd/MM/yyyy", { locale: ptBR })}
                          </div>
                          <div className="text-sm text-gray-500">
                            até {format(training.endDate, "dd/MM/yyyy", { locale: ptBR })}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-gray-500" />
                          {training.duration}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Award className="h-4 w-4 mr-1 text-gray-500" />
                          {training.certification}
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
                  <span className="text-gray-500">Total de Treinamentos</span>
                  <span className="font-semibold">{trainings.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Concluídos</span>
                  <span className="font-semibold text-green-600">
                    {trainings.filter((t) => t.status === "completed").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Em Andamento</span>
                  <span className="font-semibold text-yellow-600">
                    {trainings.filter((t) => t.status === "in_progress").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Agendados</span>
                  <span className="font-semibold text-blue-600">
                    {trainings.filter((t) => t.status === "scheduled").length}
                  </span>
                </div>
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between">
                  <span className="text-gray-500">Técnico</span>
                  <span className="font-semibold text-blue-600">
                    {trainings.filter((t) => t.type === "technical").length}
                  </span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-500">Segurança</span>
                  <span className="font-semibold text-purple-600">
                    {trainings.filter((t) => t.type === "safety").length}
                  </span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-500">Liderança</span>
                  <span className="font-semibold text-green-600">
                    {trainings.filter((t) => t.type === "leadership").length}
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
                  <Users className="h-4 w-4 text-blue-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium">Participação</p>
                    <p className="text-xs text-gray-500">
                      12 participantes ativos esta semana
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Clock className="h-4 w-4 text-yellow-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium">Próximos Treinamentos</p>
                    <p className="text-xs text-gray-500">
                      2 treinamentos começando em breve
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

export default TrainingManagement; 