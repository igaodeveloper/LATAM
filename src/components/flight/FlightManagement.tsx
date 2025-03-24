import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Calendar,
  Clock,
  Filter,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  AlertTriangle,
  Search,
  X,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";

interface Flight {
  id: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  status: "scheduled" | "boarding" | "in-flight" | "landed" | "cancelled";
  aircraft: string;
  crew: string;
}

const FlightManagement = () => {
  const [flights, setFlights] = useState<Flight[]>([
    {
      id: "1",
      flightNumber: "LA1234",
      origin: "São Paulo (GRU)",
      destination: "Rio de Janeiro (GIG)",
      departureTime: "2024-03-25 08:00",
      arrivalTime: "2024-03-25 09:30",
      status: "scheduled",
      aircraft: "Boeing 737-800",
      crew: "Crew A",
    },
    // Add more sample flights as needed
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showAddDialog, setShowAddDialog] = useState(false);

  const filteredFlights = flights.filter((flight) => {
    const matchesSearch =
      flight.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || flight.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Flight["status"]) => {
    const colors = {
      scheduled: "bg-blue-100 text-blue-800",
      boarding: "bg-yellow-100 text-yellow-800",
      "in-flight": "bg-green-100 text-green-800",
      landed: "bg-gray-100 text-gray-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status];
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Gerenciamento de Voos</h1>
        <p className="text-gray-500">Gerencie voos, escalas e operações</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Novo Voo
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Novo Voo</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="flightNumber">Número do Voo</Label>
                <Input id="flightNumber" placeholder="LA1234" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="origin">Origem</Label>
                <Input id="origin" placeholder="São Paulo (GRU)" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="destination">Destino</Label>
                <Input id="destination" placeholder="Rio de Janeiro (GIG)" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="departureTime">Horário de Partida</Label>
                <Input id="departureTime" type="datetime-local" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="arrivalTime">Horário de Chegada</Label>
                <Input id="arrivalTime" type="datetime-local" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="aircraft">Aeronave</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a aeronave" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="737-800">Boeing 737-800</SelectItem>
                    <SelectItem value="320">Airbus A320</SelectItem>
                    <SelectItem value="350">Airbus A350</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="crew">Tripulação</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a tripulação" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="crew-a">Crew A</SelectItem>
                    <SelectItem value="crew-b">Crew B</SelectItem>
                    <SelectItem value="crew-c">Crew C</SelectItem>
                  </SelectContent>
                </Select>
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
              placeholder="Buscar voos..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="scheduled">Agendado</SelectItem>
            <SelectItem value="boarding">Embarque</SelectItem>
            <SelectItem value="in-flight">Em Voo</SelectItem>
            <SelectItem value="landed">Pousado</SelectItem>
            <SelectItem value="cancelled">Cancelado</SelectItem>
          </SelectContent>
        </Select>
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
                      placeholder="Pesquisar voos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-[300px]"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="scheduled">Agendados</SelectItem>
                      <SelectItem value="in-flight">Em Andamento</SelectItem>
                      <SelectItem value="landed">Pousados</SelectItem>
                      <SelectItem value="cancelled">Cancelados</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Voo</TableHead>
                    <TableHead>Origem</TableHead>
                    <TableHead>Destino</TableHead>
                    <TableHead>Partida</TableHead>
                    <TableHead>Chegada</TableHead>
                    <TableHead>Aeronave</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Tripulação</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFlights.map((flight) => (
                    <TableRow key={flight.id}>
                      <TableCell className="font-medium">{flight.flightNumber}</TableCell>
                      <TableCell>{flight.origin}</TableCell>
                      <TableCell>{flight.destination}</TableCell>
                      <TableCell>
                        {format(new Date(flight.departureTime), "HH:mm", { locale: ptBR })}
                      </TableCell>
                      <TableCell>
                        {format(new Date(flight.arrivalTime), "HH:mm", { locale: ptBR })}
                      </TableCell>
                      <TableCell>{flight.aircraft}</TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            flight.status
                          )}`}
                        >
                          {flight.status}
                        </div>
                      </TableCell>
                      <TableCell>{flight.crew}</TableCell>
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
                  <span className="text-gray-500">Voos Hoje</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Em Andamento</span>
                  <span className="font-semibold text-green-600">5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Atrasados</span>
                  <span className="font-semibold text-yellow-600">2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Cancelados</span>
                  <span className="font-semibold text-red-600">0</span>
                </div>
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between">
                  <span className="text-gray-500">Total de Passageiros</span>
                  <span className="font-semibold">1,850</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-500">Ocupação Média</span>
                  <span className="font-semibold">85%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Alertas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="h-4 w-4 text-yellow-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium">Voo LA7890 Atrasado</p>
                    <p className="text-xs text-gray-500">
                      Atraso de 30 minutos na partida
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="h-4 w-4 text-red-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium">Tripulação Pendente</p>
                    <p className="text-xs text-gray-500">
                      2 voos aguardando alocação
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

export default FlightManagement;
