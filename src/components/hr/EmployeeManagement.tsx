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

interface Employee {
  id: string;
  name: string;
  department: "flight" | "ground" | "maintenance" | "administrative";
  position: string;
  status: "active" | "on-leave" | "training" | "inactive";
  email: string;
  phone: string;
  hireDate: string;
  location: string;
}

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: "1",
      name: "João Silva",
      department: "flight",
      position: "Piloto",
      status: "active",
      email: "joao.silva@latam.com",
      phone: "(11) 99999-9999",
      hireDate: "2020-01-15",
      location: "São Paulo (GRU)",
    },
    {
      id: "2",
      name: "Maria Santos",
      department: "ground",
      position: "Agente de Aeroporto",
      status: "active",
      email: "maria.santos@latam.com",
      phone: "(11) 98888-8888",
      hireDate: "2021-03-20",
      location: "Rio de Janeiro (GIG)",
    },
    // Add more sample employees as needed
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showAddDialog, setShowAddDialog] = useState(false);

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      departmentFilter === "all" || employee.department === departmentFilter;
    const matchesStatus = statusFilter === "all" || employee.status === statusFilter;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusColor = (status: Employee["status"]) => {
    const colors = {
      active: "bg-green-100 text-green-800",
      "on-leave": "bg-yellow-100 text-yellow-800",
      training: "bg-blue-100 text-blue-800",
      inactive: "bg-gray-100 text-gray-800",
    };
    return colors[status];
  };

  const getStatusLabel = (status: Employee["status"]) => {
    const labels = {
      active: "Ativo",
      "on-leave": "Em Licença",
      training: "Em Treinamento",
      inactive: "Inativo",
    };
    return labels[status];
  };

  const getDepartmentLabel = (department: Employee["department"]) => {
    const labels = {
      flight: "Operações de Voo",
      ground: "Operações Terrestres",
      maintenance: "Manutenção",
      administrative: "Administrativo",
    };
    return labels[department];
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Gestão de Funcionários</h1>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <UserPlus className="w-4 h-4 mr-2" />
              Novo Funcionário
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Novo Funcionário</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" placeholder="Nome completo" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="department">Departamento</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flight">Operações de Voo</SelectItem>
                    <SelectItem value="ground">Operações Terrestres</SelectItem>
                    <SelectItem value="maintenance">Manutenção</SelectItem>
                    <SelectItem value="administrative">Administrativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="position">Cargo</Label>
                <Input id="position" placeholder="Cargo do funcionário" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Ativo</SelectItem>
                    <SelectItem value="on-leave">Em Licença</SelectItem>
                    <SelectItem value="training">Em Treinamento</SelectItem>
                    <SelectItem value="inactive">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" placeholder="email@latam.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" placeholder="(00) 00000-0000" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="hireDate">Data de Admissão</Label>
                <Input id="hireDate" type="date" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Localização</Label>
                <Input id="location" placeholder="Cidade (Aeroporto)" />
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
              placeholder="Buscar funcionários..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filtrar por departamento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Departamentos</SelectItem>
            <SelectItem value="flight">Operações de Voo</SelectItem>
            <SelectItem value="ground">Operações Terrestres</SelectItem>
            <SelectItem value="maintenance">Manutenção</SelectItem>
            <SelectItem value="administrative">Administrativo</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Status</SelectItem>
            <SelectItem value="active">Ativo</SelectItem>
            <SelectItem value="on-leave">Em Licença</SelectItem>
            <SelectItem value="training">Em Treinamento</SelectItem>
            <SelectItem value="inactive">Inativo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Departamento</TableHead>
              <TableHead>Cargo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Data de Admissão</TableHead>
              <TableHead>Localização</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell className="font-medium">{employee.name}</TableCell>
                <TableCell>{getDepartmentLabel(employee.department)}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      employee.status
                    )}`}
                  >
                    {getStatusLabel(employee.status)}
                  </span>
                </TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.phone}</TableCell>
                <TableCell>{employee.hireDate}</TableCell>
                <TableCell>{employee.location}</TableCell>
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

export default EmployeeManagement;
