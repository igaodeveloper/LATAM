import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Search, Filter, Plus, Plane, Calendar, Clock, MapPin, Users, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const FlightSchedule = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [routeFilter, setRouteFilter] = useState("all");

  const flights = [
    {
      id: "FL001",
      number: "LA1234",
      origin: "São Paulo (GRU)",
      destination: "Rio de Janeiro (GIG)",
      departure: new Date(2024, 2, 15, 10, 30),
      arrival: new Date(2024, 2, 15, 11, 45),
      status: "scheduled",
      aircraft: {
        type: "Boeing 737-800",
        registration: "PT-XPK",
      },
      crew: {
        captain: "João Silva",
        firstOfficer: "Maria Santos",
        cabinCrew: ["Ana Oliveira", "Pedro Costa"],
      },
      passengers: {
        total: 180,
        business: 20,
        economy: 160,
      },
      gate: "A12",
      terminal: "1",
      delay: 0,
    },
    {
      id: "FL002",
      number: "LA5678",
      origin: "Rio de Janeiro (GIG)",
      destination: "Brasília (BSB)",
      departure: new Date(2024, 2, 15, 14, 20),
      arrival: new Date(2024, 2, 15, 15, 50),
      status: "in_progress",
      aircraft: {
        type: "Airbus A320",
        registration: "PT-XPL",
      },
      crew: {
        captain: "Carlos Lima",
        firstOfficer: "Beatriz Silva",
        cabinCrew: ["Mariana Santos", "Rafael Costa"],
      },
      passengers: {
        total: 150,
        business: 15,
        economy: 135,
      },
      gate: "B15",
      terminal: "2",
      delay: 15,
    },
    {
      id: "FL003",
      number: "LA9012",
      origin: "Brasília (BSB)",
      destination: "São Paulo (GRU)",
      departure: new Date(2024, 2, 15, 8, 15),
      arrival: new Date(2024, 2, 15, 9, 30),
      status: "delayed",
      aircraft: {
        type: "Boeing 737-800",
        registration: "PT-XPM",
      },
      crew: {
        captain: "Roberto Santos",
        firstOfficer: "Carla Lima",
        cabinCrew: ["Paulo Silva", "Julia Costa"],
      },
      passengers: {
        total: 170,
        business: 18,
        economy: 152,
      },
      gate: "C08",
      terminal: "1",
      delay: 45,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "text-blue-600 bg-blue-50";
      case "in_progress":
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
        return <Calendar className="h-4 w-4" />;
      case "in_progress":
        return <CheckCircle className="h-4 w-4" />;
      case "delayed":
        return <AlertCircle className="h-4 w-4" />;
      case "cancelled":
        return <XCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Grade de Voos</h1>
        <p className="text-gray-500">Gerencie horários e rotas de voos</p>
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
                      <SelectItem value="in_progress">Em Andamento</SelectItem>
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
                      <SelectItem value="gru-gig">GRU → GIG</SelectItem>
                      <SelectItem value="gig-bsb">GIG → BSB</SelectItem>
                      <SelectItem value="bsb-gru">BSB → GRU</SelectItem>
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
                    <TableHead>ID</TableHead>
                    <TableHead>Número</TableHead>
                    <TableHead>Rota</TableHead>
                    <TableHead>Horário</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Aeronave</TableHead>
                    <TableHead>Tripulação</TableHead>
                    <TableHead>Passageiros</TableHead>
                    <TableHead>Portão</TableHead>
                    <TableHead>Atraso</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {flights.map((flight) => (
                    <TableRow key={flight.id}>
                      <TableCell className="font-medium">{flight.id}</TableCell>
                      <TableCell>{flight.number}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="flex items-center text-sm">
                            <MapPin className="h-3 w-3 mr-1" />
                            {flight.origin}
                          </div>
                          <div className="flex items-center text-sm">
                            <MapPin className="h-3 w-3 mr-1" />
                            {flight.destination}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="flex items-center text-sm">
                            <Clock className="h-3 w-3 mr-1" />
                            {format(flight.departure, "HH:mm", { locale: ptBR })}
                          </div>
                          <div className="flex items-center text-sm">
                            <Clock className="h-3 w-3 mr-1" />
                            {format(flight.arrival, "HH:mm", { locale: ptBR })}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            flight.status
                          )}`}
                        >
                          {getStatusIcon(flight.status)}
                          <span className="ml-1 capitalize">
                            {flight.status === "scheduled" ? "Agendado" : flight.status === "in_progress" ? "Em Andamento" : flight.status === "delayed" ? "Atrasado" : "Cancelado"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="font-medium">{flight.aircraft.type}</div>
                          <div className="text-sm text-gray-500">{flight.aircraft.registration}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="text-sm">
                            <span className="font-medium">Capitão:</span> {flight.crew.captain}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Co-Piloto:</span> {flight.crew.firstOfficer}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Comissários:</span> {flight.crew.cabinCrew.join(", ")}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="flex items-center text-sm">
                            <Users className="h-3 w-3 mr-1" />
                            Total: {flight.passengers.total}
                          </div>
                          <div className="text-sm">
                            Business: {flight.passengers.business}
                          </div>
                          <div className="text-sm">
                            Economy: {flight.passengers.economy}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className="font-medium">{flight.gate}</span>
                          <span className="text-sm text-gray-500 ml-1">(Terminal {flight.terminal})</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {flight.delay > 0 ? (
                          <div className="text-yellow-600 font-medium">{flight.delay} min</div>
                        ) : (
                          <div className="text-green-600 font-medium">No horário</div>
                        )}
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
                  <span className="text-gray-500">Total de Voos</span>
                  <span className="font-semibold">{flights.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Agendados</span>
                  <span className="font-semibold text-blue-600">
                    {flights.filter((f) => f.status === "scheduled").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Em Andamento</span>
                  <span className="font-semibold text-green-600">
                    {flights.filter((f) => f.status === "in_progress").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Atrasados</span>
                  <span className="font-semibold text-yellow-600">
                    {flights.filter((f) => f.status === "delayed").length}
                  </span>
                </div>
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between">
                  <span className="text-gray-500">Total de Passageiros</span>
                  <span className="font-semibold">
                    {flights.reduce((acc, flight) => acc + flight.passengers.total, 0)}
                  </span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-500">Atraso Médio</span>
                  <span className="font-semibold text-yellow-600">
                    {Math.round(
                      flights.reduce((acc, flight) => acc + flight.delay, 0) / flights.length
                    )}{" "}
                    min
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
                  <AlertCircle className="h-4 w-4 text-yellow-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium">Atrasos</p>
                    <p className="text-xs text-gray-500">
                      1 voo com atraso significativo
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Users className="h-4 w-4 text-blue-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium">Ocupação</p>
                    <p className="text-xs text-gray-500">
                      2 voos com alta ocupação
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

export default FlightSchedule; 