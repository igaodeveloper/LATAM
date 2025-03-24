import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  User,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  MoreVertical,
  UserPlus,
  FileText,
  BarChart3,
  MessageSquare,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Tag,
  Star,
  CheckCircle,
  Clock,
  AlertCircle,
  Plane,
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Passenger {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "active" | "inactive" | "pending" | "cancelled" | "confirmed" | "checked_in";
  membershipLevel: "standard" | "silver" | "gold" | "platinum";
  totalFlights: number;
  lastFlight?: string;
  preferences?: {
    seatPreference?: string;
    mealPreference?: string;
    specialAssistance?: boolean;
  };
  booking: string;
  flight: string;
  class: string;
  departure: Date;
  arrival: Date;
  origin: string;
  destination: string;
  specialNeeds: string[];
}

interface Complaint {
  id: string;
  passengerId: string;
  date: string;
  subject: string;
  description: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "critical";
}

interface PassengerManagementProps {
  passengers?: Passenger[];
  complaints?: Complaint[];
}

const PassengerManagement = ({
  passengers = [
    {
      id: "PAS001",
      name: "João Silva",
      booking: "BK123456",
      flight: "LA1234",
      class: "Business",
      status: "confirmed",
      email: "joao.silva@email.com",
      phone: "(11) 99999-9999",
      departure: new Date(2024, 2, 15, 14, 0),
      arrival: new Date(2024, 2, 15, 16, 30),
      origin: "São Paulo",
      destination: "Rio de Janeiro",
      specialNeeds: ["Wheelchair", "Special Meal"],
    },
    {
      id: "PAS002",
      name: "Maria Santos",
      booking: "BK123457",
      flight: "LA1234",
      class: "Economy",
      status: "checked_in",
      email: "maria.santos@email.com",
      phone: "(11) 98888-8888",
      departure: new Date(2024, 2, 15, 14, 0),
      arrival: new Date(2024, 2, 15, 16, 30),
      origin: "São Paulo",
      destination: "Rio de Janeiro",
      specialNeeds: ["Special Meal"],
    },
    {
      id: "PAS003",
      name: "Pedro Oliveira",
      booking: "BK123458",
      flight: "LA5678",
      class: "Premium",
      status: "pending",
      email: "pedro.oliveira@email.com",
      phone: "(11) 97777-7777",
      departure: new Date(2024, 2, 15, 16, 30),
      arrival: new Date(2024, 2, 15, 19, 0),
      origin: "Rio de Janeiro",
      destination: "Brasília",
      specialNeeds: [],
    },
    {
      id: "PAS004",
      name: "Ana Costa",
      booking: "BK123459",
      flight: "LA5678",
      class: "Economy",
      status: "cancelled",
      email: "ana.costa@email.com",
      phone: "(11) 96666-6666",
      departure: new Date(2024, 2, 15, 16, 30),
      arrival: new Date(2024, 2, 15, 19, 0),
      origin: "Rio de Janeiro",
      destination: "Brasília",
      specialNeeds: ["Wheelchair"],
    },
  ],
  complaints = [
    {
      id: "1",
      passengerId: "2",
      date: "2023-11-30",
      subject: "Baggage Delay",
      description: "Baggage was delayed by 24 hours on flight LA1234.",
      status: "resolved",
      priority: "high",
    },
    {
      id: "2",
      passengerId: "1",
      date: "2023-11-25",
      subject: "In-flight Service",
      description: "Unsatisfactory meal service on flight LA5678.",
      status: "closed",
      priority: "medium",
    },
    {
      id: "3",
      passengerId: "4",
      date: "2023-12-01",
      subject: "Flight Cancellation",
      description:
        "No proper assistance provided after flight LA9012 was cancelled.",
      status: "open",
      priority: "critical",
    },
    {
      id: "4",
      passengerId: "3",
      date: "2023-11-28",
      subject: "Special Assistance",
      description: "Requested wheelchair was not provided at boarding.",
      status: "in-progress",
      priority: "high",
    },
  ],
}: PassengerManagementProps) => {
  const [activeTab, setActiveTab] = useState("passengers");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [classFilter, setClassFilter] = useState("all");
  const [selectedPassenger, setSelectedPassenger] = useState<Passenger | null>(
    null,
  );
  const [isPassengerDialogOpen, setIsPassengerDialogOpen] = useState(false);
  const [isComplaintDialogOpen, setIsComplaintDialogOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(
    null,
  );

  // Filter passengers based on search and filters
  const filteredPassengers = passengers.filter((passenger) => {
    const matchesSearch =
      passenger.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      passenger.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || passenger.status === statusFilter;
    const matchesClass =
      classFilter === "all" || passenger.class === classFilter;
    return matchesSearch && matchesStatus && matchesClass;
  });

  // Filter complaints based on search
  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleViewPassenger = (passenger: Passenger) => {
    setSelectedPassenger(passenger);
    setIsPassengerDialogOpen(true);
  };

  const handleViewComplaint = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    setIsComplaintDialogOpen(true);
  };

  const getMembershipBadge = (level: Passenger["membershipLevel"]) => {
    switch (level) {
      case "standard":
        return <Badge className="bg-gray-100 text-gray-800">Standard</Badge>;
      case "silver":
        return <Badge className="bg-gray-200 text-gray-800">Silver</Badge>;
      case "gold":
        return <Badge className="bg-amber-100 text-amber-800">Gold</Badge>;
      case "platinum":
        return (
          <Badge className="bg-indigo-100 text-indigo-800">Platinum</Badge>
        );
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getComplaintStatusBadge = (status: Complaint["status"]) => {
    switch (status) {
      case "open":
        return <Badge className="bg-blue-100 text-blue-800">Open</Badge>;
      case "in-progress":
        return (
          <Badge className="bg-amber-100 text-amber-800">In Progress</Badge>
        );
      case "resolved":
        return <Badge className="bg-green-100 text-green-800">Resolved</Badge>;
      case "closed":
        return <Badge className="bg-gray-100 text-gray-800">Closed</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getComplaintPriorityBadge = (priority: Complaint["priority"]) => {
    switch (priority) {
      case "low":
        return <Badge className="bg-green-100 text-green-800">Low</Badge>;
      case "medium":
        return <Badge className="bg-blue-100 text-blue-800">Medium</Badge>;
      case "high":
        return <Badge className="bg-amber-100 text-amber-800">High</Badge>;
      case "critical":
        return <Badge className="bg-red-100 text-red-800">Critical</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "text-green-600 bg-green-50";
      case "checked_in":
        return "text-blue-600 bg-blue-50";
      case "pending":
        return "text-yellow-600 bg-yellow-50";
      case "cancelled":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4" />;
      case "checked_in":
        return <User className="h-4 w-4" />;
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "cancelled":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Gestão de Passageiros</h1>
        <p className="text-gray-500">Gerencie reservas e informações de passageiros</p>
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
                      placeholder="Pesquisar passageiros..."
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
                      <SelectItem value="confirmed">Confirmado</SelectItem>
                      <SelectItem value="checked_in">Check-in</SelectItem>
                      <SelectItem value="pending">Pendente</SelectItem>
                      <SelectItem value="cancelled">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={classFilter} onValueChange={setClassFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Classe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="economy">Economy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Reserva
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Reserva</TableHead>
                    <TableHead>Voo</TableHead>
                    <TableHead>Classe</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Contato</TableHead>
                    <TableHead>Horário</TableHead>
                    <TableHead>Rota</TableHead>
                    <TableHead>Necessidades Especiais</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPassengers.map((passenger) => (
                    <TableRow key={passenger.id}>
                      <TableCell className="font-medium">{passenger.id}</TableCell>
                      <TableCell>{passenger.name}</TableCell>
                      <TableCell>{passenger.booking}</TableCell>
                      <TableCell>{passenger.flight}</TableCell>
                      <TableCell>{passenger.class}</TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            passenger.status
                          )}`}
                        >
                          {getStatusIcon(passenger.status)}
                          <span className="ml-1">
                            {passenger.status === "confirmed"
                              ? "Confirmado"
                              : passenger.status === "checked_in"
                              ? "Check-in"
                              : passenger.status === "pending"
                              ? "Pendente"
                              : "Cancelado"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="flex items-center text-sm">
                            <Mail className="h-3 w-3 mr-1" />
                            {passenger.email}
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="h-3 w-3 mr-1" />
                            {passenger.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="flex items-center text-sm">
                            <Calendar className="h-3 w-3 mr-1" />
                            {format(passenger.departure, "HH:mm", { locale: ptBR })}
                          </div>
                          <div className="flex items-center text-sm">
                            <Plane className="h-3 w-3 mr-1" />
                            {format(passenger.arrival, "HH:mm", { locale: ptBR })}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {passenger.origin} → {passenger.destination}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {passenger.specialNeeds.map((need, index) => (
                            <div
                              key={index}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600"
                            >
                              <Tag className="h-3 w-3 mr-1" />
                              {need}
                            </div>
                          ))}
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
                  <span className="text-gray-500">Total de Passageiros</span>
                  <span className="font-semibold">{passengers.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Confirmados</span>
                  <span className="font-semibold text-green-600">
                    {passengers.filter((p) => p.status === "confirmed").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Check-in</span>
                  <span className="font-semibold text-blue-600">
                    {passengers.filter((p) => p.status === "checked_in").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Pendentes</span>
                  <span className="font-semibold text-yellow-600">
                    {passengers.filter((p) => p.status === "pending").length}
                  </span>
                </div>
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between">
                  <span className="text-gray-500">Necessidades Especiais</span>
                  <span className="font-semibold text-blue-600">
                    {passengers.filter((p) => p.specialNeeds.length > 0).length}
                  </span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-500">Cancelados</span>
                  <span className="font-semibold text-red-600">
                    {passengers.filter((p) => p.status === "cancelled").length}
                  </span>
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
                    <p className="text-sm font-medium">Check-in Pendente</p>
                    <p className="text-xs text-gray-500">
                      5 passageiros próximos do horário
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <AlertCircle className="h-4 w-4 text-red-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium">Cancelamentos</p>
                    <p className="text-xs text-gray-500">
                      2 reservas canceladas hoje
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Passenger Details Dialog */}
      <Dialog
        open={isPassengerDialogOpen}
        onOpenChange={setIsPassengerDialogOpen}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Passenger Details</DialogTitle>
          </DialogHeader>
          {selectedPassenger && (
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary animate-float">
                  <User size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">
                    {selectedPassenger.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    {getMembershipBadge(selectedPassenger.membershipLevel)}
                    <Badge
                      className={`${selectedPassenger.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                    >
                      {selectedPassenger.status === "active"
                        ? "Active"
                        : "Inactive"}
                    </Badge>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">
                    Contact Information
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedPassenger.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedPassenger.phone}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">
                    Flight Information
                  </div>
                  <div className="flex items-center gap-2">
                    <Plane className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedPassenger.totalFlights} total flights</span>
                  </div>
                  {selectedPassenger.lastFlight && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Last flight: {selectedPassenger.lastFlight}</span>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-2">Preferences</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="border rounded-md p-3">
                    <div className="text-sm text-muted-foreground mb-1">
                      Seat Preference
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="capitalize">
                        {selectedPassenger.preferences?.seatPreference ||
                          "No preference"}
                      </span>
                    </div>
                  </div>
                  <div className="border rounded-md p-3">
                    <div className="text-sm text-muted-foreground mb-1">
                      Meal Preference
                    </div>
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-muted-foreground" />
                      <span className="capitalize">
                        {selectedPassenger.preferences?.mealPreference ||
                          "No preference"}
                      </span>
                    </div>
                  </div>
                  <div className="border rounded-md p-3">
                    <div className="text-sm text-muted-foreground mb-1">
                      Special Assistance
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {selectedPassenger.preferences?.specialAssistance
                          ? "Required"
                          : "Not required"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsPassengerDialogOpen(false)}
                >
                  Close
                </Button>
                <Button>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Complaint Details Dialog */}
      <Dialog
        open={isComplaintDialogOpen}
        onOpenChange={setIsComplaintDialogOpen}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Complaint Details</DialogTitle>
          </DialogHeader>
          {selectedComplaint && (
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold">
                    {selectedComplaint.subject}
                  </h3>
                  <div className="text-sm text-muted-foreground mt-1">
                    {selectedComplaint.date}
                  </div>
                </div>
                <div className="flex gap-2">
                  {getComplaintStatusBadge(selectedComplaint.status)}
                  {getComplaintPriorityBadge(selectedComplaint.priority)}
                </div>
              </div>

              <Separator />

              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  Passenger
                </div>
                <div className="font-medium">
                  {passengers.find(
                    (p) => p.id === selectedComplaint.passengerId,
                  )?.name || "Unknown"}
                </div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  Description
                </div>
                <div className="border rounded-md p-3 bg-muted/20">
                  {selectedComplaint.description}
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-2">Resolution Actions</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="status">Update Status</Label>
                    <Select defaultValue={selectedComplaint.status}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="comment">Add Comment</Label>
                    <Input
                      id="comment"
                      placeholder="Add a comment or resolution note"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsComplaintDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button>Save Changes</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PassengerManagement;
