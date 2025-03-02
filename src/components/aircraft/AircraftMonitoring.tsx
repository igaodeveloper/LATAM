import React, { useState } from "react";
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
  Plane, // Importação do ícone Plane
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

interface Aircraft {
  id: string;
  registration: string;
  type: string;
  status: "available" | "in-flight" | "maintenance" | "scheduled-maintenance";
  lastMaintenance: string;
  nextMaintenance: string;
  flightHours: number;
  location: string;
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

interface AircraftMonitoringProps {
  aircraft?: Aircraft[];
  maintenanceRecords?: MaintenanceRecord[];
  isOpen?: boolean;
}

const AircraftMonitoring = ({
  aircraft = [
    {
      id: "1",
      registration: "CC-BAW",
      type: "Boeing 787-9",
      status: "available",
      lastMaintenance: "2023-10-15",
      nextMaintenance: "2023-12-15",
      flightHours: 3450,
      location: "Santiago (SCL)",
    },
    {
      id: "2",
      registration: "CC-BGO",
      type: "Airbus A320neo",
      status: "in-flight",
      lastMaintenance: "2023-09-22",
      nextMaintenance: "2023-11-22",
      flightHours: 2780,
      location: "In flight: SCL → LIM",
    },
    {
      id: "3",
      registration: "CC-COP",
      type: "Boeing 777-300ER",
      status: "maintenance",
      lastMaintenance: "2023-10-28",
      nextMaintenance: "2024-01-28",
      flightHours: 5120,
      location: "Maintenance Hangar (SCL)",
    },
    {
      id: "4",
      registration: "CC-DEM",
      type: "Airbus A350-900",
      status: "scheduled-maintenance",
      lastMaintenance: "2023-08-10",
      nextMaintenance: "2023-11-05",
      flightHours: 4230,
      location: "São Paulo (GRU)",
    },
  ],
  maintenanceRecords = [
    {
      id: "m1",
      aircraftId: "3",
      type: "C-Check",
      date: "2023-10-28",
      description:
        "Comprehensive structural inspection and component replacement",
      technician: "Carlos Mendoza",
      status: "in-progress",
    },
    {
      id: "m2",
      aircraftId: "4",
      type: "A-Check",
      date: "2023-11-05",
      description: "Routine inspection and minor repairs",
      technician: "Ana Silva",
      status: "scheduled",
    },
    {
      id: "m3",
      aircraftId: "1",
      type: "A-Check",
      date: "2023-12-15",
      description: "Routine inspection and fluid checks",
      technician: "Miguel Rodriguez",
      status: "scheduled",
    },
    {
      id: "m4",
      aircraftId: "2",
      type: "B-Check",
      date: "2023-09-22",
      description: "Detailed inspection of critical systems",
      technician: "Sofia Vargas",
      status: "completed",
    },
  ],
  isOpen = true,
}: AircraftMonitoringProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [maintenanceDialog, setMaintenanceDialog] = useState(false);
  const [selectedAircraft, setSelectedAircraft] = useState<Aircraft | null>(
    null,
  );

  const filteredAircraft = aircraft.filter((a) => {
    const matchesSearch =
      a.registration.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Aircraft["status"]) => {
    switch (status) {
      case "available":
        return (
          <Badge className="bg-green-500">
            <Check className="w-3 h-3 mr-1" /> Available
          </Badge>
        );
      case "in-flight":
        return (
          <Badge className="bg-blue-500">
            <Clock className="w-3 h-3 mr-1" /> In Flight
          </Badge>
        );
      case "maintenance":
        return (
          <Badge className="bg-amber-500">
            <Wrench className="w-3 h-3 mr-1" /> In Maintenance
          </Badge>
        );
      case "scheduled-maintenance":
        return (
          <Badge className="bg-purple-500">
            <Calendar className="w-3 h-3 mr-1" /> Scheduled Maintenance
          </Badge>
        );
      default:
        return (
          <Badge>
            <Info className="w-3 h-3 mr-1" /> Unknown
          </Badge>
        );
    }
  };

  const getMaintenanceStatusBadge = (status: MaintenanceRecord["status"]) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-500">
            <Check className="w-3 h-3 mr-1" /> Completed
          </Badge>
        );
      case "scheduled":
        return (
          <Badge className="bg-blue-500">
            <Clock className="w-3 h-3 mr-1" /> Scheduled
          </Badge>
        );
      case "in-progress":
        return (
          <Badge className="bg-amber-500">
            <Wrench className="w-3 h-3 mr-1" /> In Progress
          </Badge>
        );
      default:
        return (
          <Badge>
            <Info className="w-3 h-3 mr-1" /> Unknown
          </Badge>
        );
    }
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

  return (
    <div className="bg-gray-100 p-6 pt-0 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-900">
          Aircraft Monitoring
        </h1>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Search className="h-4 w-4 mr-2" />
            Search Aircraft
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Schedule Maintenance
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-1 h-[calc(100vh-180px)] overflow-y-auto">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Aircraft Fleet</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative p-2 mb-2">
              <Search className="absolute left-4 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search aircraft..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="space-y-1 p-2">
              {filteredAircraft.map((aircraft) => (
                <Button
                  key={aircraft.id}
                  variant={
                    selectedAircraft?.id === aircraft.id ? "default" : "ghost"
                  }
                  className="w-full justify-start text-left h-auto py-3"
                  onClick={() => setSelectedAircraft(aircraft)}
                >
                  <div className="flex items-center w-full">
                    <Plane className="h-5 w-5 mr-3" />
                    <div className="flex-1">
                      <div className="font-medium">{aircraft.registration}</div>
                      <div className="text-xs text-muted-foreground">
                        {aircraft.type}
                      </div>
                    </div>
                    {getStatusBadge(aircraft.status)}
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3 h-[calc(100vh-180px)] overflow-y-auto">
          {selectedAircraft ? (
            <>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg flex items-center">
                    <Plane className="h-5 w-5 mr-2 text-blue-500" />
                    {selectedAircraft.registration} - {selectedAircraft.type}
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(selectedAircraft.status)}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewMaintenance(selectedAircraft)}
                    >
                      View Maintenance History
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview">
                  <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
                    <TabsTrigger value="flights">Flight History</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div className="space-y-1">
                              <p className="text-sm text-muted-foreground">
                                Total Flight Hours
                              </p>
                              <p className="text-2xl font-bold">
                                {selectedAircraft.flightHours.toLocaleString()}
                              </p>
                            </div>
                            <Clock className="h-8 w-8 text-blue-500" />
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div className="space-y-1">
                              <p className="text-sm text-muted-foreground">
                                Current Location
                              </p>
                              <p className="text-2xl font-bold">
                                {selectedAircraft.location}
                              </p>
                            </div>
                            <MapPin className="h-8 w-8 text-green-500" />
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div className="space-y-1">
                              <p className="text-sm text-muted-foreground">
                                Next Maintenance
                              </p>
                              <p className="text-2xl font-bold">
                                {selectedAircraft.nextMaintenance}
                              </p>
                            </div>
                            <Wrench className="h-8 w-8 text-amber-500" />
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">
                          Maintenance Alerts
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {selectedAircraft.status === "maintenance" ? (
                          <div className="flex items-start space-x-4 p-4 border rounded-lg bg-amber-50">
                            <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                            <div>
                              <div className="font-medium">
                                Currently Under Maintenance
                              </div>
                              <div className="text-sm text-gray-600 mt-1">
                                This aircraft is currently undergoing
                                maintenance at {selectedAircraft.location}.
                              </div>
                            </div>
                          </div>
                        ) : selectedAircraft.status ===
                          "scheduled-maintenance" ? (
                          <div className="flex items-start space-x-4 p-4 border rounded-lg bg-blue-50">
                            <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                            <div>
                              <div className="font-medium">
                                Maintenance Scheduled
                              </div>
                              <div className="text-sm text-gray-600 mt-1">
                                Maintenance scheduled for{" "}
                                {selectedAircraft.nextMaintenance}.
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-start space-x-4 p-4 border rounded-lg bg-green-50">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                              <div className="font-medium">
                                No Immediate Maintenance Required
                              </div>
                              <div className="text-sm text-gray-600 mt-1">
                                Next scheduled maintenance:{" "}
                                {selectedAircraft.nextMaintenance}
                              </div>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="maintenance" className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">
                        Maintenance History
                      </h3>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Schedule New Maintenance
                      </Button>
                    </div>

                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Technician</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {aircraftMaintenanceRecords.length > 0 ? (
                            aircraftMaintenanceRecords.map((record) => (
                              <TableRow key={record.id}>
                                <TableCell className="font-medium">
                                  {record.id}
                                </TableCell>
                                <TableCell>{record.type}</TableCell>
                                <TableCell>{record.date}</TableCell>
                                <TableCell>
                                  {getMaintenanceStatusBadge(record.status)}
                                </TableCell>
                                <TableCell>{record.technician}</TableCell>
                                <TableCell>
                                  <Button variant="ghost" size="sm">
                                    View Details
                                  </Button>
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
                  </TabsContent>

                  <TabsContent value="flights" className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Recent Flights</h3>
                      <Select defaultValue="30">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Time period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7">Last 7 days</SelectItem>
                          <SelectItem value="30">Last 30 days</SelectItem>
                          <SelectItem value="90">Last 90 days</SelectItem>
                          <SelectItem value="all">All time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Flight</TableHead>
                            <TableHead>Route</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">
                              LA1234
                            </TableCell>
                            <TableCell>SCL → LIM</TableCell>
                            <TableCell>2023-10-15</TableCell>
                            <TableCell>3h 45m</TableCell>
                            <TableCell>
                              <Badge className="bg-green-100 text-green-800">
                                Completed
                              </Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              LA5678
                            </TableCell>
                            <TableCell>LIM → BOG</TableCell>
                            <TableCell>2023-10-16</TableCell>
                            <TableCell>2h 30m</TableCell>
                            <TableCell>
                              <Badge className="bg-green-100 text-green-800">
                                Completed
                              </Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              LA9012
                            </TableCell>
                            <TableCell>BOG → SCL</TableCell>
                            <TableCell>2023-10-17</TableCell>
                            <TableCell>5h 15m</TableCell>
                            <TableCell>
                              <Badge className="bg-green-100 text-green-800">
                                Completed
                              </Badge>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Plane className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900">
                  Select an Aircraft
                </h3>
                <p className="text-gray-500 mt-2">
                  Choose an aircraft from the list to view details
                </p>
              </div>
            </div>
          )}
        </Card>
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
                      <TableCell>{record.date}</TableCell>
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
