import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, RefreshCw, Clock, Plane, MapPin } from "lucide-react";

interface Flight {
  id: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  status:
    | "on-time"
    | "delayed"
    | "boarding"
    | "in-flight"
    | "landed"
    | "cancelled";
  aircraft: string;
  gate: string;
}

interface FlightStatusOverviewProps {
  flights?: Flight[];
}

const getStatusColor = (status: Flight["status"]) => {
  switch (status) {
    case "on-time":
      return "bg-green-100 text-green-800";
    case "delayed":
      return "bg-amber-100 text-amber-800";
    case "boarding":
      return "bg-blue-100 text-blue-800";
    case "in-flight":
      return "bg-indigo-100 text-indigo-800";
    case "landed":
      return "bg-green-100 text-green-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const mockFlights: Flight[] = [
  {
    id: "1",
    flightNumber: "LA1234",
    origin: "Santiago (SCL)",
    destination: "Lima (LIM)",
    departureTime: "2023-06-15T08:30:00",
    arrivalTime: "2023-06-15T10:45:00",
    status: "on-time",
    aircraft: "Boeing 787-9",
    gate: "A12",
  },
  {
    id: "2",
    flightNumber: "LA2156",
    origin: "Buenos Aires (EZE)",
    destination: "Santiago (SCL)",
    departureTime: "2023-06-15T09:15:00",
    arrivalTime: "2023-06-15T11:00:00",
    status: "delayed",
    aircraft: "Airbus A320",
    gate: "B05",
  },
  {
    id: "3",
    flightNumber: "LA3421",
    origin: "São Paulo (GRU)",
    destination: "Bogotá (BOG)",
    departureTime: "2023-06-15T10:00:00",
    arrivalTime: "2023-06-15T14:30:00",
    status: "boarding",
    aircraft: "Boeing 787-8",
    gate: "C22",
  },
  {
    id: "4",
    flightNumber: "LA5678",
    origin: "Miami (MIA)",
    destination: "Santiago (SCL)",
    departureTime: "2023-06-15T07:45:00",
    arrivalTime: "2023-06-15T17:30:00",
    status: "in-flight",
    aircraft: "Boeing 787-9",
    gate: "D08",
  },
  {
    id: "5",
    flightNumber: "LA7890",
    origin: "Madrid (MAD)",
    destination: "Santiago (SCL)",
    departureTime: "2023-06-14T23:30:00",
    arrivalTime: "2023-06-15T08:15:00",
    status: "landed",
    aircraft: "Boeing 787-9",
    gate: "A04",
  },
  {
    id: "6",
    flightNumber: "LA4321",
    origin: "Santiago (SCL)",
    destination: "Punta Cana (PUJ)",
    departureTime: "2023-06-15T12:30:00",
    arrivalTime: "2023-06-15T19:45:00",
    status: "cancelled",
    aircraft: "Airbus A320",
    gate: "B10",
  },
];

const FlightStatusOverview: React.FC<FlightStatusOverviewProps> = ({
  flights = mockFlights,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredFlights = flights.filter((flight) => {
    const matchesSearch =
      flight.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.destination.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || flight.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const formatTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString([], { month: "short", day: "numeric" });
  };

  return (
    <Card className="w-full h-full bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold text-gray-800 animate-fade-in">
          Flight Status Overview
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 animate-pulse hover:animate-none"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between animate-slide-in-down">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by flight number, origin or destination"
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="on-time">On Time</SelectItem>
                  <SelectItem value="delayed">Delayed</SelectItem>
                  <SelectItem value="boarding">Boarding</SelectItem>
                  <SelectItem value="in-flight">In Flight</SelectItem>
                  <SelectItem value="landed">Landed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Tabs
            defaultValue="departures"
            className="w-full animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="departures">Departures</TabsTrigger>
              <TabsTrigger value="arrivals">Arrivals</TabsTrigger>
            </TabsList>

            <TabsContent value="departures" className="space-y-4">
              <div className="rounded-md border">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="px-4 py-3 text-left font-medium text-gray-500">
                          Flight
                        </th>
                        <th className="px-4 py-3 text-left font-medium text-gray-500">
                          Destination
                        </th>
                        <th className="px-4 py-3 text-left font-medium text-gray-500">
                          Departure
                        </th>
                        <th className="px-4 py-3 text-left font-medium text-gray-500">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left font-medium text-gray-500">
                          Aircraft
                        </th>
                        <th className="px-4 py-3 text-left font-medium text-gray-500">
                          Gate
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredFlights
                        .filter((flight) => flight.origin.includes("SCL"))
                        .map((flight) => (
                          <tr
                            key={flight.id}
                            className="border-b hover:bg-gray-50 transition-colors animate-slide-in-left stagger-item"
                            style={{
                              animationDelay: `${parseInt(flight.id) * 0.1}s`,
                            }}
                          >
                            <td className="px-4 py-3 font-medium">
                              {flight.flightNumber}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3.5 w-3.5 text-gray-400" />
                                {flight.destination}
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex flex-col">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3.5 w-3.5 text-gray-400" />
                                  {formatTime(flight.departureTime)}
                                </div>
                                <span className="text-xs text-gray-500">
                                  {formatDate(flight.departureTime)}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <Badge
                                className={`${getStatusColor(flight.status)} animate-pulse`}
                              >
                                {flight.status.replace("-", " ").toUpperCase()}
                              </Badge>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-1">
                                <Plane className="h-3.5 w-3.5 text-gray-400" />
                                {flight.aircraft}
                              </div>
                            </td>
                            <td className="px-4 py-3 font-medium">
                              {flight.gate}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="arrivals" className="space-y-4">
              <div className="rounded-md border">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="px-4 py-3 text-left font-medium text-gray-500">
                          Flight
                        </th>
                        <th className="px-4 py-3 text-left font-medium text-gray-500">
                          Origin
                        </th>
                        <th className="px-4 py-3 text-left font-medium text-gray-500">
                          Arrival
                        </th>
                        <th className="px-4 py-3 text-left font-medium text-gray-500">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left font-medium text-gray-500">
                          Aircraft
                        </th>
                        <th className="px-4 py-3 text-left font-medium text-gray-500">
                          Gate
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredFlights
                        .filter((flight) => flight.destination.includes("SCL"))
                        .map((flight) => (
                          <tr
                            key={flight.id}
                            className="border-b hover:bg-gray-50 transition-colors animate-slide-in-right stagger-item"
                            style={{
                              animationDelay: `${parseInt(flight.id) * 0.1}s`,
                            }}
                          >
                            <td className="px-4 py-3 font-medium">
                              {flight.flightNumber}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3.5 w-3.5 text-gray-400" />
                                {flight.origin}
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex flex-col">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3.5 w-3.5 text-gray-400" />
                                  {formatTime(flight.arrivalTime)}
                                </div>
                                <span className="text-xs text-gray-500">
                                  {formatDate(flight.arrivalTime)}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <Badge
                                className={`${getStatusColor(flight.status)} animate-pulse`}
                              >
                                {flight.status.replace("-", " ").toUpperCase()}
                              </Badge>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-1">
                                <Plane className="h-3.5 w-3.5 text-gray-400 animate-float" />
                                {flight.aircraft}
                              </div>
                            </td>
                            <td className="px-4 py-3 font-medium">
                              {flight.gate}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightStatusOverview;
