import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Checkbox } from "../ui/checkbox";
import { Calendar as CalendarIcon, Mail, Phone, Clock, MapPin, Globe, Users, Database, AlertCircle, Info, CheckCircle, XCircle, Plane, Ticket, CreditCard, User, Shield, Search, Plus, ChevronLeft, ChevronRight, MoreVertical, Star, Tag, Calendar } from "lucide-react";

const Tasks = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("priority");

  const tasks = [
    {
      id: 1,
      title: "Revisar Relatório Mensal",
      description: "Analisar e aprovar relatório de desempenho do mês",
      priority: "high",
      status: "pending",
      dueDate: "2024-03-20",
      assignee: "João Silva",
      tags: ["relatório", "financeiro"],
      starred: true,
      completed: false,
    },
    {
      id: 2,
      title: "Atualizar Documentação",
      description: "Atualizar documentação técnica do sistema",
      priority: "medium",
      status: "in_progress",
      dueDate: "2024-03-18",
      assignee: "Maria Santos",
      tags: ["documentação", "técnico"],
      starred: false,
      completed: false,
    },
    {
      id: 3,
      title: "Treinamento de Equipe",
      description: "Realizar treinamento sobre novas funcionalidades",
      priority: "high",
      status: "completed",
      dueDate: "2024-03-15",
      assignee: "Pedro Oliveira",
      tags: ["treinamento", "equipe"],
      starred: true,
      completed: true,
    },
    {
      id: 4,
      title: "Manutenção do Sistema",
      description: "Realizar manutenção preventiva do servidor",
      priority: "low",
      status: "pending",
      dueDate: "2024-03-22",
      assignee: "Ana Costa",
      tags: ["manutenção", "sistema"],
      starred: false,
      completed: false,
    },
    {
      id: 5,
      title: "Reunião de Projeto",
      description: "Apresentar progresso do projeto aos stakeholders",
      priority: "medium",
      status: "in_progress",
      dueDate: "2024-03-19",
      assignee: "Carlos Lima",
      tags: ["reunião", "projeto"],
      starred: false,
      completed: false,
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-yellow-500";
      case "low":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || task.status === filter;
    return matchesSearch && matchesFilter;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sort === "priority") {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    if (sort === "dueDate") {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    return 0;
  });

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Tarefas</h1>
        <p className="text-gray-500">
          Gerencie suas tarefas e responsabilidades
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div>
                    <CardTitle>Minhas Tarefas</CardTitle>
                    <CardDescription>
                      Visualize e gerencie suas tarefas
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Input
                    placeholder="Buscar tarefas..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64"
                  />
                  <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filtrar por" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="pending">Pendentes</SelectItem>
                      <SelectItem value="in_progress">Em Andamento</SelectItem>
                      <SelectItem value="completed">Concluídas</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={sort} onValueChange={setSort}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Ordenar por" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="priority">Prioridade</SelectItem>
                      <SelectItem value="dueDate">Data de Entrega</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Nova Tarefa
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sortedTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-start space-x-4 p-4 rounded-lg border"
                  >
                    <Checkbox
                      checked={task.completed}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <h3 className={`font-medium ${
                            task.completed ? "line-through text-gray-500" : ""
                          }`}>
                            {task.title}
                          </h3>
                          {task.starred && (
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(task.status)}`}>
                            {task.status === "completed" ? "Concluída" :
                             task.status === "in_progress" ? "Em Andamento" : "Pendente"}
                          </span>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {task.description}
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm">{task.dueDate}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4" />
                          <span className="text-sm">{task.assignee}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Tag className="h-4 w-4" />
                          <span className="text-sm">{task.tags.join(", ")}</span>
                        </div>
                        <div className={`flex items-center space-x-2 ${getPriorityColor(task.priority)}`}>
                          <AlertCircle className="h-4 w-4" />
                          <span className="text-sm capitalize">{task.priority}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Resumo</CardTitle>
              <CardDescription>
                Visão geral das suas tarefas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total de Tarefas</span>
                  <span className="text-sm text-gray-500">{tasks.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Pendentes</span>
                  <span className="text-sm text-yellow-500">
                    {tasks.filter((task) => task.status === "pending").length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Em Andamento</span>
                  <span className="text-sm text-blue-500">
                    {tasks.filter((task) => task.status === "in_progress").length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Concluídas</span>
                  <span className="text-sm text-green-500">
                    {tasks.filter((task) => task.status === "completed").length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Prioridade Alta</span>
                  <span className="text-sm text-red-500">
                    {tasks.filter((task) => task.priority === "high").length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Prioridade Média</span>
                  <span className="text-sm text-yellow-500">
                    {tasks.filter((task) => task.priority === "medium").length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Prioridade Baixa</span>
                  <span className="text-sm text-green-500">
                    {tasks.filter((task) => task.priority === "low").length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Tags</CardTitle>
              <CardDescription>
                Categorize suas tarefas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {["relatório", "financeiro", "documentação", "técnico", "treinamento", "equipe", "manutenção", "sistema", "reunião", "projeto"].map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <Tag className="h-4 w-4" />
                    <span className="text-sm capitalize">{tag}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Tasks; 