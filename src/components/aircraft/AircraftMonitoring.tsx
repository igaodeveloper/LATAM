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
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Aircraft
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Aircraft
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{aircraft.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {aircraft.filter((a) => a.status === "available").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              In Maintenance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              {aircraft.filter((a) => a.status === "maintenance").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Maintenance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {
                aircraft.filter((a) => a.status === "scheduled-maintenance")
                  .length
              }
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Aircraft Fleet Status</CardTitle>
          <CardDescription>
            Monitor and manage your aircraft fleet
          </CardDescription>
          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by registration or type..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="in-flight">In Flight</SelectItem>
                  <SelectItem value="maintenance">In Maintenance</SelectItem>
                  <SelectItem value="scheduled-maintenance">
                    Scheduled Maintenance
                  </SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Registration</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Maintenance</TableHead>
                <TableHead>Next Maintenance</TableHead>
                <TableHead>Flight Hours</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAircraft.length > 0 ? (
                filteredAircraft.map((aircraft) => (
                  <TableRow
                    key={aircraft.id}
                    className="hover:bg-gray-50 transition-colors animate-slide-in-up stagger-item"
                    style={{
                      animationDelay: `${parseInt(aircraft.id) * 0.1}s`,
                    }}
                  >
                    <TableCell className="font-medium">
                      {aircraft.registration}
                    </TableCell>
                    <TableCell>{aircraft.type}</TableCell>
                    <TableCell>{getStatusBadge(aircraft.status)}</TableCell>
                    <TableCell>{aircraft.lastMaintenance}</TableCell>
                    <TableCell>
                      {aircraft.status === "scheduled-maintenance" ? (
                        <span className="text-purple-600 font-medium">
                          {aircraft.nextMaintenance}
                        </span>
                      ) : (
                        aircraft.nextMaintenance
                      )}
                    </TableCell>
                    <TableCell>
                      {aircraft.flightHours.toLocaleString()} hrs
                    </TableCell>
                    <TableCell>{aircraft.location}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewMaintenance(aircraft)}
                      >
                        View Maintenance
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4">
                    No aircraft found matching your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Maintenance Alerts</CardTitle>
            <CardDescription>
              Aircraft requiring immediate attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {maintenanceRecords
                .filter(
                  (record) =>
                    record.status === "scheduled" &&
                    new Date(record.date) <=
                      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                )
                .map((record) => {
                  const relatedAircraft = aircraft.find(
                    (a) => a.id === record.aircraftId,
                  );
                  return (
                    <div
                      key={record.id}
                      className="flex items-start space-x-4 p-4 border rounded-lg bg-amber-50"
                    >
                      <div className="rounded-full bg-amber-100 p-2">
                        <AlertTriangle className="h-5 w-5 text-amber-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">
                          {relatedAircraft?.registration} - {record.type}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Scheduled for {record.date} • {record.description}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Schedule
                      </Button>
                    </div>
                  );
                })}
              {maintenanceRecords.filter(
                (record) =>
                  record.status === "scheduled" &&
                  new Date(record.date) <=
                    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
              ).length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Check className="h-12 w-12 mx-auto text-green-500 mb-2" />
                  <p>No urgent maintenance alerts</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Maintenance History</CardTitle>
            <CardDescription>Recent maintenance activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {maintenanceRecords
                .filter((record) => record.status === "completed")
                .slice(0, 3)
                .map((record) => {
                  const relatedAircraft = aircraft.find(
                    (a) => a.id === record.aircraftId,
                  );
                  return (
                    <div
                      key={record.id}
                      className="flex items-start space-x-4 p-4 border rounded-lg"
                    >
                      <div className="rounded-full bg-green-100 p-2">
                        <Check className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">
                          {relatedAircraft?.registration} - {record.type}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Completed on {record.date} • {record.technician}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Details
                      </Button>
                    </div>
                  );
                })}
              {maintenanceRecords.filter(
                (record) => record.status === "completed",
              ).length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Info className="h-12 w-12 mx-auto text-blue-500 mb-2" />
                  <p>No maintenance history available</p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All History
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Dialog open={maintenanceDialog} onOpenChange={setMaintenanceDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              Maintenance Records - {selectedAircraft?.registration} (
              {selectedAircraft?.type})
            </DialogTitle>
            <DialogDescription>
              View and manage maintenance records for this aircraft
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="upcoming">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="current">Current</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Technician</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {aircraftMaintenanceRecords.filter(
                    (r) => r.status === "scheduled",
                  ).length > 0 ? (
                    aircraftMaintenanceRecords
                      .filter((r) => r.status === "scheduled")
                      .map((record) => (
                        <TableRow key={record.id}>
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
                      <TableCell colSpan={5} className="text-center py-4">
                        No upcoming maintenance scheduled.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="current">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Technician</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {aircraftMaintenanceRecords.filter(
                    (r) => r.status === "in-progress",
                  ).length > 0 ? (
                    aircraftMaintenanceRecords
                      .filter((r) => r.status === "in-progress")
                      .map((record) => (
                        <TableRow key={record.id}>
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
                      <TableCell colSpan={5} className="text-center py-4">
                        No maintenance currently in progress.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="history">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Technician</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {aircraftMaintenanceRecords.filter(
                    (r) => r.status === "completed",
                  ).length > 0 ? (
                    aircraftMaintenanceRecords
                      .filter((r) => r.status === "completed")
                      .map((record) => (
                        <TableRow key={record.id}>
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
                      <TableCell colSpan={5} className="text-center py-4">
                        No maintenance history available.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setMaintenanceDialog(false)}
            >
              Close
            </Button>
            <Button>Schedule Maintenance</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// This is a placeholder component for the Calendar icon since it wasn't imported
const Calendar = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);

export default AircraftMonitoring;
