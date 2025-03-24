import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Check,
  Clock,
  Filter,
  Info,
  Plus,
  Search,
  Settings,
  Wrench,
  Calendar,
  MapPin,
  CheckCircle,
  Plane,
  Edit,
  Trash2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";

interface Aircraft {
  id: string;
  registration: string;
  type: string;
  status: "active" | "maintenance" | "grounded" | "in-flight";
  lastMaintenance: string;
  nextMaintenance: string;
  totalFlightHours: number;
  currentLocation: string;
  nextFlight?: string;
}

interface MaintenanceRecord {
  id: string;
  aircraftId: string;
  type: string;
  date: string;
  description: string;
  technician: string;
  status: "completed" | "scheduled" | "in-progress";
}

const AircraftMonitoring = () => {
  const [aircraft, setAircraft] = useState<Aircraft[]>([
    {
      id: "1",
      registration: "PT-XPK",
      type: "Boeing 737-800",
      status: "active",
      lastMaintenance: "2024-03-20",
      nextMaintenance: "2024-04-20",
      totalFlightHours: 12500,
      currentLocation: "São Paulo (GRU)",
      nextFlight: "LA1234",
    },
    {
      id: "2",
      registration: "PT-XPL",
      type: "Airbus A320",
      status: "maintenance",
      lastMaintenance: "2024-03-15",
      nextMaintenance: "2024-04-15",
      totalFlightHours: 9800,
      currentLocation: "Manutenção",
    },
    // Add more sample aircraft as needed
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [maintenanceDialog, setMaintenanceDialog] = useState(false);
  const [selectedAircraft, setSelectedAircraft] = useState<Aircraft | null>(null);

  const maintenanceRecords = [
    {
      id: "MNT001",
      aircraftId: "AC001",
      type: "routine",
      date: new Date(),
      description: "Routine maintenance check",
      technician: "João Silva",
      status: "completed",
    },
    {
      id: "MNT002",
      aircraftId: "AC002",
      type: "repair",
      date: new Date(),
      description: "Engine repair",
      technician: "Maria Santos",
      status: "in_progress",
    },
    {
      id: "MNT003",
      aircraftId: "AC001",
      type: "inspection",
      date: new Date(),
      description: "Annual inspection",
      technician: "Carlos Oliveira",
      status: "scheduled",
    },
  ];

  const filteredAircraft = aircraft.filter((aircraft) => {
    const matchesSearch =
      aircraft.registration.toLowerCase().includes(searchTerm.toLowerCase()) ||
      aircraft.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || aircraft.type === typeFilter;
    const matchesStatus = statusFilter === "all" || aircraft.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: Aircraft["status"]) => {
    const colors = {
      active: "bg-green-100 text-green-800",
      maintenance: "bg-yellow-100 text-yellow-800",
      grounded: "bg-red-100 text-red-800",
      "in-flight": "bg-blue-100 text-blue-800",
    };
    return colors[status];
  };

  const getStatusLabel = (status: Aircraft["status"]) => {
    const labels = {
      active: "Ativo",
      maintenance: "Em Manutenção",
      grounded: "Grounded",
      "in-flight": "Em Voo",
    };
    return labels[status];
  };

  const handleViewMaintenance = (aircraft: Aircraft) => {
    setSelectedAircraft(aircraft);
    setMaintenanceDialog(true);
  };

  const aircraftMaintenanceRecords = selectedAircraft
    ? maintenanceRecords.filter(
        (record) => record.aircraftId === selectedAircraft.id,
      )
    : [];

  const getMaintenanceStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500 hover:bg-green-600">Completo</Badge>;
      case "in_progress":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Em Andamento</Badge>;
      case "scheduled":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Agendado</Badge>;
      default:
        return <Badge className="bg-gray-500 hover:bg-gray-600">Desconhecido</Badge>;
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Monitoramento de Aeronaves</h1>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plane className="w-4 h-4 mr-2" />
              Nova Aeronave
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Nova Aeronave</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="registration">Registro</Label>
                <Input id="registration" placeholder="PT-XPK" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Tipo</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="737-800">Boeing 737-800</SelectItem>
                    <SelectItem value="A320">Airbus A320</SelectItem>
                    <SelectItem value="A350">Airbus A350</SelectItem>
                    <SelectItem value="787">Boeing 787</SelectItem>
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
                    <SelectItem value="active">Ativo</SelectItem>
                    <SelectItem value="maintenance">Em Manutenção</SelectItem>
                    <SelectItem value="grounded">Grounded</SelectItem>
                    <SelectItem value="in-flight">Em Voo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastMaintenance">Última Manutenção</Label>
                <Input id="lastMaintenance" type="date" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="nextMaintenance">Próxima Manutenção</Label>
                <Input id="nextMaintenance" type="date" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="totalFlightHours">Total de Horas de Voo</Label>
                <Input id="totalFlightHours" type="number" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="currentLocation">Localização Atual</Label>
                <Input id="currentLocation" placeholder="São Paulo (GRU)" />
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
              placeholder="Buscar aeronaves..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filtrar por tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Tipos</SelectItem>
            <SelectItem value="737-800">Boeing 737-800</SelectItem>
            <SelectItem value="A320">Airbus A320</SelectItem>
            <SelectItem value="A350">Airbus A350</SelectItem>
            <SelectItem value="787">Boeing 787</SelectItem>
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
            <SelectItem value="maintenance">Em Manutenção</SelectItem>
            <SelectItem value="grounded">Grounded</SelectItem>
            <SelectItem value="in-flight">Em Voo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Registro</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Última Manutenção</TableHead>
              <TableHead>Próxima Manutenção</TableHead>
              <TableHead>Horas de Voo</TableHead>
              <TableHead>Localização</TableHead>
              <TableHead>Próximo Voo</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAircraft.map((aircraft) => (
              <TableRow key={aircraft.id}>
                <TableCell className="font-medium">{aircraft.registration}</TableCell>
                <TableCell>{aircraft.type}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      aircraft.status
                    )}`}
                  >
                    {getStatusLabel(aircraft.status)}
                  </span>
                </TableCell>
                <TableCell>{aircraft.lastMaintenance}</TableCell>
                <TableCell>{aircraft.nextMaintenance}</TableCell>
                <TableCell>{aircraft.totalFlightHours.toLocaleString()}h</TableCell>
                <TableCell>{aircraft.currentLocation}</TableCell>
                <TableCell>{aircraft.nextFlight || "-"}</TableCell>
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

      <Dialog open={maintenanceDialog} onOpenChange={setMaintenanceDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              Maintenance History - {selectedAircraft?.registration}
            </DialogTitle>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Technician</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {aircraftMaintenanceRecords.length > 0 ? (
                  aircraftMaintenanceRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.id}</TableCell>
                      <TableCell>{record.type}</TableCell>
                      <TableCell>{record.date.toLocaleDateString()}</TableCell>
                      <TableCell>{record.description}</TableCell>
                      <TableCell>{record.technician}</TableCell>
                      <TableCell>
                        {getMaintenanceStatusBadge(record.status)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-4 text-muted-foreground"
                    >
                      No maintenance records found for this aircraft.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setMaintenanceDialog(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AircraftMonitoring;
