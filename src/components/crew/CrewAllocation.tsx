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
    <div className="w-full h-full bg-white p-6 pt-0">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Crew Allocation Module
        </h1>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule View
          </Button>
          <Button variant="outline" size="sm">
            <Clock className="mr-2 h-4 w-4" />
            Rest Period Tracker
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Flight Selection Panel */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-blue-600" />
              Flight Selection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Input
                placeholder="Search flights..."
                className="w-full"
                icon={<Search className="h-4 w-4" />}
              />
            </div>
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {flights.map((flight) => (
                <div
                  key={flight.id}
                  className={`p-3 border rounded-md cursor-pointer transition-colors ${selectedFlight?.id === flight.id ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"}`}
                  onClick={() => setSelectedFlight(flight)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{flight.flightNumber}</span>
                    <Badge
                      variant={
                        flight.status === "cancelled"
                          ? "destructive"
                          : "default"
                      }
                    >
                      {flight.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {flight.origin} → {flight.destination}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {flight.departureTime} • {flight.aircraft}
                  </div>
                  <div className="flex items-center mt-2 text-xs text-gray-500">
                    <Users className="h-3 w-3 mr-1" />
                    {flight.crew.length} crew assigned
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content Area */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>
              {selectedFlight ? (
                <div className="flex justify-between items-center">
                  <span>
                    Flight {selectedFlight.flightNumber} Crew Assignment
                  </span>
                  <Badge
                    variant={
                      selectedFlight.status === "cancelled"
                        ? "destructive"
                        : "default"
                    }
                  >
                    {selectedFlight.status}
                  </Badge>
                </div>
              ) : (
                "Select a flight to manage crew"
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedFlight ? (
              <Tabs defaultValue="assigned">
                <TabsList className="mb-4">
                  <TabsTrigger value="assigned">Assigned Crew</TabsTrigger>
                  <TabsTrigger value="available">Available Crew</TabsTrigger>
                </TabsList>

                <TabsContent value="assigned">
                  {selectedFlight.crew.length > 0 ? (
                    <div className="space-y-4">
                      {selectedFlight.crew.map((crew) => (
                        <div
                          key={crew.id}
                          className="flex items-center justify-between p-3 border rounded-md hover-lift transition-all animate-flip-in-x stagger-item"
                          style={{
                            animationDelay: `${parseInt(crew.id) * 0.1}s`,
                          }}
                        >
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                              <img
                                src={crew.image}
                                alt={crew.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-medium">{crew.name}</div>
                              <div className="text-sm text-gray-500">
                                {crew.position}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge
                              className={getAvailabilityColor(
                                crew.availability,
                              )}
                            >
                              {crew.availability}
                            </Badge>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Edit assignment</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                      <Users className="h-12 w-12 text-gray-300 mb-3" />
                      <h3 className="text-lg font-medium text-gray-900">
                        No crew assigned
                      </h3>
                      <p className="text-sm text-gray-500 mt-1 max-w-md">
                        This flight doesn't have any crew members assigned yet.
                        Switch to the Available Crew tab to assign crew members.
                      </p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="available">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex space-x-2">
                      <Select
                        value={filterPosition}
                        onValueChange={setFilterPosition}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Position" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Positions</SelectItem>
                          <SelectItem value="Captain">Captain</SelectItem>
                          <SelectItem value="First Officer">
                            First Officer
                          </SelectItem>
                          <SelectItem value="Flight Attendant">
                            Flight Attendant
                          </SelectItem>
                          <SelectItem value="Purser">Purser</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select
                        value={filterAvailability}
                        onValueChange={setFilterAvailability}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Availability" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="available">Available</SelectItem>
                          <SelectItem value="on-duty">On Duty</SelectItem>
                          <SelectItem value="rest-period">
                            Rest Period
                          </SelectItem>
                          <SelectItem value="leave">On Leave</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search crew members..."
                        className="pl-9 w-[250px]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto">
                    {filteredCrewMembers.map((crew) => (
                      <div
                        key={crew.id}
                        className="border rounded-md p-4 hover-lift transition-all animate-zoom-in stagger-item"
                        style={{
                          animationDelay: `${parseInt(crew.id) * 0.1}s`,
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                              <img
                                src={crew.image}
                                alt={crew.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-medium">{crew.name}</div>
                              <div className="text-sm text-gray-500">
                                {crew.position}
                              </div>
                            </div>
                          </div>
                          <Badge
                            className={getAvailabilityColor(crew.availability)}
                          >
                            {crew.availability}
                          </Badge>
                        </div>

                        <div className="mt-3">
                          <div className="text-xs text-gray-500 mb-1">
                            Qualifications:
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {crew.qualifications.map((qual, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs"
                              >
                                {qual}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <div className="text-xs text-gray-500">
                            <Clock className="inline h-3 w-3 mr-1" />
                            {crew.hoursWorked} hours this week
                          </div>
                          <Button
                            size="sm"
                            disabled={crew.availability !== "available"}
                            onClick={() => handleAssignCrew(crew)}
                          >
                            Assign
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Calendar className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900">
                  No flight selected
                </h3>
                <p className="text-sm text-gray-500 mt-2 max-w-md">
                  Select a flight from the list to view and manage crew
                  assignments.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
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
