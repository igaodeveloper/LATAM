import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Plane,
  Check,
  AlertTriangle,
  WrenchIcon,
  RefreshCw,
} from "lucide-react";

interface Aircraft {
  id: string;
  tailNumber: string;
  model: string;
  status: "available" | "in-flight" | "maintenance";
  location: string;
  nextMaintenance?: string;
  flightHours: number;
}

interface AircraftAvailabilityProps {
  aircraft?: Aircraft[];
  title?: string;
}

const AircraftAvailability = ({
  aircraft = [
    {
      id: "1",
      tailNumber: "LA-1234",
      model: "Boeing 787-9",
      status: "available",
      location: "Santiago (SCL)",
      nextMaintenance: "2023-12-15",
      flightHours: 3450,
    },
    {
      id: "2",
      tailNumber: "LA-5678",
      model: "Airbus A320",
      status: "in-flight",
      location: "En route: SCL → LIM",
      flightHours: 12560,
    },
    {
      id: "3",
      tailNumber: "LA-9012",
      model: "Boeing 777-300ER",
      status: "maintenance",
      location: "São Paulo (GRU)",
      nextMaintenance: "In progress",
      flightHours: 8920,
    },
    {
      id: "4",
      tailNumber: "LA-3456",
      model: "Airbus A350-900",
      status: "available",
      location: "Buenos Aires (EZE)",
      nextMaintenance: "2023-12-28",
      flightHours: 5670,
    },
    {
      id: "5",
      tailNumber: "LA-7890",
      model: "Boeing 787-8",
      status: "in-flight",
      location: "En route: BOG → MIA",
      flightHours: 9340,
    },
  ],
  title = "Aircraft Availability",
}: AircraftAvailabilityProps) => {
  const [filter, setFilter] = useState<string>("all");
  const [view, setView] = useState<string>("grid");

  const filteredAircraft =
    filter === "all" ? aircraft : aircraft.filter((a) => a.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800";
      case "in-flight":
        return "bg-blue-100 text-blue-800";
      case "maintenance":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available":
        return <Check className="h-4 w-4 mr-1" />;
      case "in-flight":
        return <Plane className="h-4 w-4 mr-1" />;
      case "maintenance":
        return <WrenchIcon className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full h-full bg-white overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold text-gray-800">
          {title}
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Aircraft</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="in-flight">In Flight</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
            </SelectContent>
          </Select>

          <div className="ml-2">
            <Tabs value={view} onValueChange={setView}>
              <TabsList className="grid w-[120px] grid-cols-2">
                <TabsTrigger value="grid" className="text-xs">
                  Grid
                </TabsTrigger>
                <TabsTrigger value="list" className="text-xs">
                  List
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <Button variant="ghost" size="icon" className="ml-2">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs value={view}>
          <TabsContent value="grid" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
              {filteredAircraft.map((aircraft) => (
                <Card
                  key={aircraft.id}
                  className="overflow-hidden border-l-4 hover:shadow-md transition-all hover-lift animate-flip-in-y stagger-item"
                  style={{
                    borderLeftColor:
                      aircraft.status === "available"
                        ? "#10b981"
                        : aircraft.status === "in-flight"
                          ? "#3b82f6"
                          : "#f59e0b",
                    animationDelay: `${parseInt(aircraft.id) * 0.1}s`,
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">
                          {aircraft.tailNumber}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {aircraft.model}
                        </p>
                      </div>
                      <Badge
                        className={`flex items-center ${getStatusColor(aircraft.status)}`}
                      >
                        {getStatusIcon(aircraft.status)}
                        {aircraft.status === "available"
                          ? "Available"
                          : aircraft.status === "in-flight"
                            ? "In Flight"
                            : "Maintenance"}
                      </Badge>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Location:</span>
                        <span className="font-medium">{aircraft.location}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Flight Hours:</span>
                        <span className="font-medium">
                          {aircraft.flightHours.toLocaleString()}
                        </span>
                      </div>
                      {aircraft.nextMaintenance && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">
                            Next Maintenance:
                          </span>
                          <span className="font-medium">
                            {aircraft.nextMaintenance}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
                      <Button variant="outline" size="sm" className="text-xs">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="list" className="mt-0">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse mt-2">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tail Number
                    </th>
                    <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Model
                    </th>
                    <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Flight Hours
                    </th>
                    <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Next Maintenance
                    </th>
                    <th className="text-left p-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAircraft.map((aircraft) => (
                    <tr key={aircraft.id} className="hover:bg-gray-50">
                      <td className="p-3 text-sm font-medium text-gray-900">
                        {aircraft.tailNumber}
                      </td>
                      <td className="p-3 text-sm text-gray-500">
                        {aircraft.model}
                      </td>
                      <td className="p-3 text-sm">
                        <Badge
                          className={`flex items-center ${getStatusColor(aircraft.status)}`}
                        >
                          {getStatusIcon(aircraft.status)}
                          {aircraft.status === "available"
                            ? "Available"
                            : aircraft.status === "in-flight"
                              ? "In Flight"
                              : "Maintenance"}
                        </Badge>
                      </td>
                      <td className="p-3 text-sm text-gray-500">
                        {aircraft.location}
                      </td>
                      <td className="p-3 text-sm text-gray-500">
                        {aircraft.flightHours.toLocaleString()}
                      </td>
                      <td className="p-3 text-sm text-gray-500">
                        {aircraft.nextMaintenance || "-"}
                      </td>
                      <td className="p-3 text-sm text-gray-500">
                        <Button variant="ghost" size="sm" className="text-xs">
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AircraftAvailability;
