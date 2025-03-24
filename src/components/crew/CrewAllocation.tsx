import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Plus, Search, Filter, Edit, Trash2, UserPlus } from "lucide-react";

interface CrewMember {
  id: string;
  name: string;
  role: "pilot" | "copilot" | "flight-attendant" | "ground-crew";
  status: "available" | "assigned" | "off-duty" | "training";
  currentFlight?: string;
  nextDuty?: string;
  qualifications: string[];
}

const CrewAllocation = () => {
  const [crewMembers, setCrewMembers] = useState<CrewMember[]>([
    {
      id: "1",
      name: "João Silva",
      role: "pilot",
      status: "available",
      qualifications: ["Boeing 737", "Airbus A320"],
    },
    {
      id: "2",
      name: "Maria Santos",
      role: "copilot",
      status: "assigned",
      currentFlight: "LA1234",
      nextDuty: "2024-03-26 08:00",
      qualifications: ["Boeing 737", "Airbus A320"],
    },
    // Add more sample crew members as needed
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showAddDialog, setShowAddDialog] = useState(false);

  const filteredCrew = crewMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || member.role === roleFilter;
    const matchesStatus = statusFilter === "all" || member.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusColor = (status: CrewMember["status"]) => {
    const colors = {
      available: "bg-green-100 text-green-800",
      assigned: "bg-blue-100 text-blue-800",
      "off-duty": "bg-gray-100 text-gray-800",
      training: "bg-yellow-100 text-yellow-800",
    };
    return colors[status];
  };

  const getRoleLabel = (role: CrewMember["role"]) => {
    const labels = {
      pilot: "Piloto",
      copilot: "Copiloto",
      "flight-attendant": "Comissário(a)",
      "ground-crew": "Equipe de Solo",
    };
    return labels[role];
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Alocação de Tripulação</h1>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <UserPlus className="w-4 h-4 mr-2" />
              Novo Membro
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Novo Membro da Tripulação</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" placeholder="Nome completo" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Função</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a função" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pilot">Piloto</SelectItem>
                    <SelectItem value="copilot">Copiloto</SelectItem>
                    <SelectItem value="flight-attendant">Comissário(a)</SelectItem>
                    <SelectItem value="ground-crew">Equipe de Solo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Disponível</SelectItem>
                    <SelectItem value="assigned">Alocado</SelectItem>
                    <SelectItem value="off-duty">Fora de Serviço</SelectItem>
                    <SelectItem value="training">Em Treinamento</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="qualifications">Qualificações</Label>
                <Input
                  id="qualifications"
                  placeholder="Ex: Boeing 737, Airbus A320"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setShowAddDialog(false)}>Salvar</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar tripulantes..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filtrar por função" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as Funções</SelectItem>
            <SelectItem value="pilot">Piloto</SelectItem>
            <SelectItem value="copilot">Copiloto</SelectItem>
            <SelectItem value="flight-attendant">Comissário(a)</SelectItem>
            <SelectItem value="ground-crew">Equipe de Solo</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Status</SelectItem>
            <SelectItem value="available">Disponível</SelectItem>
            <SelectItem value="assigned">Alocado</SelectItem>
            <SelectItem value="off-duty">Fora de Serviço</SelectItem>
            <SelectItem value="training">Em Treinamento</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Função</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Voo Atual</TableHead>
              <TableHead>Próxima Escala</TableHead>
              <TableHead>Qualificações</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCrew.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="font-medium">{member.name}</TableCell>
                <TableCell>{getRoleLabel(member.role)}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      member.status
                    )}`}
                  >
                    {member.status === "available"
                      ? "Disponível"
                      : member.status === "assigned"
                      ? "Alocado"
                      : member.status === "off-duty"
                      ? "Fora de Serviço"
                      : "Em Treinamento"}
                  </span>
                </TableCell>
                <TableCell>{member.currentFlight || "-"}</TableCell>
                <TableCell>{member.nextDuty || "-"}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {member.qualifications.map((qual, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs"
                      >
                        {qual}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CrewAllocation;
