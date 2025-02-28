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
} from "lucide-react";

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
    },
  ];

  const [flights] = useState<Flight[]>(propFlights || defaultFlights);
  const [searchTerm, setSearchTerm] = useState("");
  const [isNewFlightDialogOpen, setIsNewFlightDialogOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("schedule");

  // Filter flights based on search term
  const filteredFlights = flights.filter(
    (flight) =>
      flight.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.destination.toLowerCase().includes(searchTerm.toLowerCase()),
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

  return (
    <div className="w-full h-full bg-background p-6 pt-0">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">Flight Management</h1>
          <p className="text-muted-foreground">
            Schedule, modify, and monitor LATAM flights
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog
            open={isNewFlightDialogOpen}
            onOpenChange={setIsNewFlightDialogOpen}
          >
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus size={16} />
                New Flight
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Flight</DialogTitle>
                <DialogDescription>
                  Enter the details for the new flight. All fields are required.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="flightNumber"
                      className="text-sm font-medium"
                    >
                      Flight Number
                    </label>
                    <Input id="flightNumber" placeholder="LA1234" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="aircraft" className="text-sm font-medium">
                      Aircraft
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select aircraft" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="b787-9">Boeing 787-9</SelectItem>
                        <SelectItem value="a320">Airbus A320</SelectItem>
                        <SelectItem value="a319">Airbus A319</SelectItem>
                        <SelectItem value="a321">Airbus A321</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="origin" className="text-sm font-medium">
                      Origin
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select origin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="scl">Santiago (SCL)</SelectItem>
                        <SelectItem value="lim">Lima (LIM)</SelectItem>
                        <SelectItem value="gru">São Paulo (GRU)</SelectItem>
                        <SelectItem value="eze">Buenos Aires (EZE)</SelectItem>
                        <SelectItem value="bog">Bogotá (BOG)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="destination"
                      className="text-sm font-medium"
                    >
                      Destination
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select destination" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="scl">Santiago (SCL)</SelectItem>
                        <SelectItem value="lim">Lima (LIM)</SelectItem>
                        <SelectItem value="gru">São Paulo (GRU)</SelectItem>
                        <SelectItem value="eze">Buenos Aires (EZE)</SelectItem>
                        <SelectItem value="bog">Bogotá (BOG)</SelectItem>
                        <SelectItem value="mia">Miami (MIA)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="departureTime"
                      className="text-sm font-medium"
                    >
                      Departure Time
                    </label>
                    <Input id="departureTime" type="datetime-local" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="arrivalTime"
                      className="text-sm font-medium"
                    >
                      Arrival Time
                    </label>
                    <Input id="arrivalTime" type="datetime-local" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsNewFlightDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Create Flight</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="w-full"
      >
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="schedule" className="gap-2">
              <Calendar size={16} />
              Schedule View
            </TabsTrigger>
            <TabsTrigger value="list" className="gap-2">
              <Clock size={16} />
              List View
            </TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search flights..."
                className="w-[250px] pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  className="absolute right-2.5 top-2.5"
                  onClick={() => setSearchTerm("")}
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>All Flights</DropdownMenuItem>
                <DropdownMenuItem>Scheduled</DropdownMenuItem>
                <DropdownMenuItem>In-Flight</DropdownMenuItem>
                <DropdownMenuItem>Delayed</DropdownMenuItem>
                <DropdownMenuItem>Cancelled</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <TabsContent value="schedule" className="mt-2">
          <Card>
            <CardHeader>
              <CardTitle>Flight Schedule</CardTitle>
              <CardDescription>
                Drag and drop flights to reschedule
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[500px] overflow-auto p-4 bg-muted/20 rounded-md">
                <div className="flex flex-col gap-4">
                  {/* This would be a drag-and-drop calendar view in a real implementation */}
                  <div className="text-center p-8 border border-dashed rounded-md">
                    <p className="text-muted-foreground">
                      Drag and drop calendar view would be implemented here
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Showing {filteredFlights.length} flights
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="list" className="mt-2">
          <Card>
            <CardHeader>
              <CardTitle>Flight List</CardTitle>
              <CardDescription>View and manage all flights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-[1fr_1.5fr_1.5fr_1fr_1fr_0.5fr] gap-4 p-4 font-medium border-b">
                  <div>Flight</div>
                  <div>Origin</div>
                  <div>Destination</div>
                  <div>Departure</div>
                  <div>Status</div>
                  <div></div>
                </div>
                <div className="divide-y">
                  {filteredFlights.length > 0 ? (
                    filteredFlights.map((flight) => (
                      <div
                        key={flight.id}
                        className="grid grid-cols-[1fr_1.5fr_1.5fr_1fr_1fr_0.5fr] gap-4 p-4 items-center hover:bg-muted/50 transition-colors animate-slide-in-right stagger-item"
                        style={{
                          animationDelay: `${parseInt(flight.id) * 0.1}s`,
                        }}
                      >
                        <div className="font-medium">{flight.flightNumber}</div>
                        <div>{flight.origin}</div>
                        <div>{flight.destination}</div>
                        <div>{formatDate(flight.departureTime)}</div>
                        <div>
                          <Badge variant={getStatusBadgeVariant(flight.status)}>
                            {flight.status.charAt(0).toUpperCase() +
                              flight.status.slice(1)}
                          </Badge>
                        </div>
                        <div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem className="gap-2">
                                <Edit size={14} />
                                Edit Flight
                              </DropdownMenuItem>
                              <DropdownMenuItem className="gap-2">
                                <AlertTriangle size={14} />
                                Mark as Delayed
                              </DropdownMenuItem>
                              <DropdownMenuItem className="gap-2 text-destructive">
                                <Trash2 size={14} />
                                Cancel Flight
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center">
                      <p className="text-muted-foreground">
                        No flights found matching your search criteria
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {filteredFlights.length} of {flights.length} flights
              </div>
              <Button variant="outline" size="sm">
                Export Schedule
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FlightManagement;
