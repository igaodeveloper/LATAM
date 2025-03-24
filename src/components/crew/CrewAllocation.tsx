import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  UserCircle,
  Users,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
  Filter,
  Search,
  Plus,
  Edit,
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface CrewMember {
  id: string;
  name: string;
  position: string;
  qualifications: string[];
  availability: "available" | "on-duty" | "rest-period" | "leave";
  hoursWorked: number;
  nextAvailable?: string;
  image: string;
}

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
  crew: CrewMember[];
}

const CrewAllocation = ({
  flights = defaultFlights,
  crewMembers = defaultCrewMembers,
}: {
  flights?: Flight[];
  crewMembers?: CrewMember[];
}) => {
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [selectedCrewMember, setSelectedCrewMember] =
    useState<CrewMember | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPosition, setFilterPosition] = useState("all");
  const [filterAvailability, setFilterAvailability] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);

  // Filter crew members based on search and filters
  const filteredCrewMembers = crewMembers.filter((crew) => {
    const matchesSearch = crew.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesPosition =
      filterPosition === "all" || crew.position === filterPosition;
    const matchesAvailability =
      filterAvailability === "all" || crew.availability === filterAvailability;
    return matchesSearch && matchesPosition && matchesAvailability;
  });

  const handleAssignCrew = (crewMember: CrewMember) => {
    setSelectedCrewMember(crewMember);
    setDialogOpen(true);
  };

  const confirmAssignment = () => {
    // In a real implementation, this would update the flight's crew list
    setDialogOpen(false);
    setSelectedCrewMember(null);
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "available":
        return "bg-green-100 text-green-800";
      case "on-duty":
        return "bg-blue-100 text-blue-800";
      case "rest-period":
        return "bg-orange-100 text-orange-800";
      case "leave":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Alocação de Tripulação</h1>
        <p className="text-gray-500">Gerencie tripulantes e escalas de voo</p>
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
                      placeholder="Pesquisar tripulantes..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-[300px]"
                    />
                  </div>
                  <Select value={filterPosition} onValueChange={setFilterPosition}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Função" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="Captain">Comandante</SelectItem>
                      <SelectItem value="First Officer">Copiloto</SelectItem>
                      <SelectItem value="Flight Attendant">Comissário</SelectItem>
                      <SelectItem value="Purser">Purser</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterAvailability} onValueChange={setFilterAvailability}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="available">Disponíveis</SelectItem>
                      <SelectItem value="on-duty">Em Serviço</SelectItem>
                      <SelectItem value="rest-period">Descanso</SelectItem>
                      <SelectItem value="leave">Folga</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Alocação
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Função</TableHead>
                    <TableHead>Voo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Próximo Voo</TableHead>
                    <TableHead>Horas</TableHead>
                    <TableHead>Base</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {crewMembers.map((crew) => (
                    <TableRow key={crew.id}>
                      <TableCell className="font-medium">{crew.id}</TableCell>
                      <TableCell>{crew.name}</TableCell>
                      <TableCell>{crew.position}</TableCell>
                      <TableCell>{selectedFlight?.flightNumber}</TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(
                            crew.availability
                          )}`}
                        >
                          {crew.availability === "available" ? (
                            <Clock className="h-4 w-4" />
                          ) : crew.availability === "on-duty" ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : crew.availability === "rest-period" ? (
                            <AlertCircle className="h-4 w-4" />
                          ) : (
                            <AlertCircle className="h-4 w-4" />
                          )}
                          <span className="ml-1">
                            {crew.availability === "available" ? "Disponível" :
                              crew.availability === "on-duty" ? "Em Serviço" :
                              crew.availability === "rest-period" ? "Descanso" : "Folga"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {selectedFlight ? format(new Date(selectedFlight.departureTime), "HH:mm", { locale: ptBR }) : "Não alocado"}
                      </TableCell>
                      <TableCell>{selectedFlight?.origin} → {selectedFlight?.destination}</TableCell>
                      <TableCell>{selectedFlight?.aircraft}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => handleAssignCrew(crew)}>
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
                  <span className="text-gray-500">Total de Tripulantes</span>
                  <span className="font-semibold">{crewMembers.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Alocados</span>
                  <span className="font-semibold text-green-600">{selectedFlight?.crew.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Disponíveis</span>
                  <span className="font-semibold text-blue-600">{crewMembers.length - (selectedFlight?.crew.length || 0)}</span>
                </div>
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between">
                  <span className="text-gray-500">Média de Horas</span>
                  <span className="font-semibold">{selectedFlight ? (selectedFlight.crew.reduce((total, crew) => total + crew.hoursWorked, 0) / selectedFlight.crew.length).toFixed(2) : "Não alocado"}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-500">Voos Sem Tripulação</span>
                  <span className="font-semibold text-red-600">{flights.length - selectedFlight?.crew.length || 0}</span>
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
                    <p className="text-sm font-medium">Voo {selectedFlight?.flightNumber} Sem Tripulação</p>
                    <p className="text-xs text-gray-500">
                      Necessário alocar tripulação
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <AlertCircle className="h-4 w-4 text-red-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium">Excesso de Horas</p>
                    <p className="text-xs text-gray-500">
                      3 tripulantes próximos do limite
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Assignment Confirmation Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Crew Assignment</DialogTitle>
          </DialogHeader>
          {selectedCrewMember && selectedFlight && (
            <div className="py-4">
              <p className="mb-4">
                Are you sure you want to assign{" "}
                <strong>{selectedCrewMember.name}</strong> to flight{" "}
                <strong>{selectedFlight.flightNumber}</strong>?
              </p>

              <div className="bg-blue-50 p-3 rounded-md mb-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                    <img
                      src={selectedCrewMember.image}
                      alt={selectedCrewMember.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium">{selectedCrewMember.name}</div>
                    <div className="text-sm text-gray-500">
                      {selectedCrewMember.position}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-md mb-4">
                <div className="text-sm">
                  <div>
                    <strong>Flight:</strong> {selectedFlight.flightNumber}
                  </div>
                  <div>
                    <strong>Route:</strong> {selectedFlight.origin} →{" "}
                    {selectedFlight.destination}
                  </div>
                  <div>
                    <strong>Departure:</strong> {selectedFlight.departureTime}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2 mt-6">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={confirmAssignment}>Confirm Assignment</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Default mock data
const defaultCrewMembers: CrewMember[] = [
  {
    id: "1",
    name: "Carlos Rodriguez",
    position: "Captain",
    qualifications: ["A320", "B737", "International"],
    availability: "available",
    hoursWorked: 32,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
  },
  {
    id: "2",
    name: "Maria Gonzalez",
    position: "First Officer",
    qualifications: ["A320", "Night Operations"],
    availability: "on-duty",
    hoursWorked: 45,
    nextAvailable: "Tomorrow, 08:00",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
  },
  {
    id: "3",
    name: "Juan Perez",
    position: "Flight Attendant",
    qualifications: ["First Aid", "Emergency Procedures"],
    availability: "available",
    hoursWorked: 28,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Juan",
  },
  {
    id: "4",
    name: "Ana Silva",
    position: "Purser",
    qualifications: ["Customer Service", "Leadership"],
    availability: "rest-period",
    hoursWorked: 52,
    nextAvailable: "Tomorrow, 14:00",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
  },
  {
    id: "5",
    name: "Diego Morales",
    position: "Captain",
    qualifications: ["B737", "Mountain Operations"],
    availability: "leave",
    hoursWorked: 0,
    nextAvailable: "Next week",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Diego",
  },
  {
    id: "6",
    name: "Sofia Ramirez",
    position: "Flight Attendant",
    qualifications: ["First Aid", "Multiple Languages"],
    availability: "available",
    hoursWorked: 36,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia",
  },
];

const defaultFlights: Flight[] = [
  {
    id: "1",
    flightNumber: "LA1234",
    origin: "Santiago (SCL)",
    destination: "Lima (LIM)",
    departureTime: "Today, 14:30",
    arrivalTime: "Today, 16:45",
    aircraft: "Airbus A320",
    status: "scheduled",
    crew: [defaultCrewMembers[1], defaultCrewMembers[2]],
  },
  {
    id: "2",
    flightNumber: "LA2468",
    origin: "Buenos Aires (EZE)",
    destination: "Santiago (SCL)",
    departureTime: "Today, 16:15",
    arrivalTime: "Today, 18:20",
    aircraft: "Boeing 787",
    status: "boarding",
    crew: [],
  },
  {
    id: "3",
    flightNumber: "LA3579",
    origin: "Sao Paulo (GRU)",
    destination: "Bogota (BOG)",
    departureTime: "Tomorrow, 08:45",
    arrivalTime: "Tomorrow, 12:30",
    aircraft: "Boeing 737",
    status: "scheduled",
    crew: [defaultCrewMembers[0]],
  },
  {
    id: "4",
    flightNumber: "LA4680",
    origin: "Santiago (SCL)",
    destination: "Miami (MIA)",
    departureTime: "Tomorrow, 23:30",
    arrivalTime: "Next day, 06:45",
    aircraft: "Boeing 787",
    status: "scheduled",
    crew: [],
  },
  {
    id: "5",
    flightNumber: "LA5792",
    origin: "Lima (LIM)",
    destination: "Quito (UIO)",
    departureTime: "Today, 18:20",
    arrivalTime: "Today, 20:15",
    aircraft: "Airbus A320",
    status: "delayed",
    crew: [defaultCrewMembers[3], defaultCrewMembers[5]],
  },
];

export default CrewAllocation;
