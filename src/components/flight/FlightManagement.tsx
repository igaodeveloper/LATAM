import React, { useState } from "react";
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

interface Flight {
  id: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  aircraft: string;
  status:
    | "scheduled"
    | "boarding"
    | "in-flight"
    | "arrived"
    | "delayed"
    | "cancelled";
  crew: string;
  passengers: number;
}

interface FlightManagementProps {
  flights?: Flight[];
}

const FlightManagement = ({ flights: propFlights }: FlightManagementProps) => {
  // Default flights data if none provided
  const defaultFlights: Flight[] = [
    {
      id: "1",
      flightNumber: "LA1234",
      origin: "Santiago (SCL)",
      destination: "Lima (LIM)",
      departureTime: "2023-06-15T08:30:00",
      arrivalTime: "2023-06-15T10:45:00",
      aircraft: "Boeing 787-9",
      status: "scheduled",
      crew: "Assigned",
      passengers: 150,
    },
    {
      id: "2",
      flightNumber: "LA2156",
      origin: "Buenos Aires (EZE)",
      destination: "São Paulo (GRU)",
      departureTime: "2023-06-15T14:15:00",
      arrivalTime: "2023-06-15T16:30:00",
      aircraft: "Airbus A320",
      status: "in-flight",
      crew: "Assigned",
      passengers: 120,
    },
    {
      id: "3",
      flightNumber: "LA7890",
      origin: "Lima (LIM)",
      destination: "Bogotá (BOG)",
      departureTime: "2023-06-15T18:45:00",
      arrivalTime: "2023-06-15T21:00:00",
      aircraft: "Airbus A319",
      status: "delayed",
      crew: "Pending",
      passengers: 160,
    },
    {
      id: "4",
      flightNumber: "LA5432",
      origin: "Santiago (SCL)",
      destination: "Miami (MIA)",
      departureTime: "2023-06-16T01:20:00",
      arrivalTime: "2023-06-16T09:45:00",
      aircraft: "Boeing 787-9",
      status: "scheduled",
      crew: "Assigned",
      passengers: 150,
    },
    {
      id: "5",
      flightNumber: "LA3210",
      origin: "São Paulo (GRU)",
      destination: "Santiago (SCL)",
      departureTime: "2023-06-16T11:30:00",
      arrivalTime: "2023-06-16T14:15:00",
      aircraft: "Airbus A320",
      status: "scheduled",
      crew: "Assigned",
      passengers: 120,
    },
  ];

  const [flights] = useState<Flight[]>(propFlights || defaultFlights);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [routeFilter, setRouteFilter] = useState("all");
  const [isNewFlightDialogOpen, setIsNewFlightDialogOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("schedule");

  // Filter flights based on search term
  const filteredFlights = flights.filter(
    (flight) =>
      flight.flightNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flight.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flight.destination.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get status badge color
  const getStatusBadgeVariant = (status: Flight["status"]) => {
    switch (status) {
      case "scheduled":
        return "secondary";
      case "boarding":
        return "default";
      case "in-flight":
        return "default";
      case "arrived":
        return "secondary";
      case "delayed":
        return "destructive";
      case "cancelled":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "text-blue-600 bg-blue-50";
      case "in-flight":
        return "text-green-600 bg-green-50";
      case "delayed":
        return "text-yellow-600 bg-yellow-50";
      case "cancelled":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Clock className="h-4 w-4" />;
      case "in-flight":
        return <CheckCircle className="h-4 w-4" />;
      case "delayed":
        return <AlertCircle className="h-4 w-4" />;
      case "cancelled":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Gerenciamento de Voos</h1>
        <p className="text-gray-500">Gerencie voos, escalas e operações</p>
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
                      <SelectItem value="scheduled">Agendados</SelectItem>
                      <SelectItem value="in-flight">Em Andamento</SelectItem>
                      <SelectItem value="delayed">Atrasados</SelectItem>
                      <SelectItem value="cancelled">Cancelados</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={routeFilter} onValueChange={setRouteFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Rota" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="scl-lim">SCL - LIM</SelectItem>
                      <SelectItem value="eze-gru">EZE - GRU</SelectItem>
                      <SelectItem value="gru-scl">GRU - SCL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Voo
                </Button>
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
                    <TableHead>Passageiros</TableHead>
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
                          {getStatusIcon(flight.status)}
                          <span className="ml-1">
                            {flight.status === "scheduled"
                              ? "Agendado"
                              : flight.status === "in-flight"
                              ? "Em Andamento"
                              : flight.status === "delayed"
                              ? "Atrasado"
                              : "Cancelado"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{flight.crew}</TableCell>
                      <TableCell>{flight.passengers}</TableCell>
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
