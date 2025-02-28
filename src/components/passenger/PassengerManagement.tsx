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
} from "lucide-react";

interface Passenger {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "active" | "inactive";
  membershipLevel: "standard" | "silver" | "gold" | "platinum";
  totalFlights: number;
  lastFlight?: string;
  preferences?: {
    seatPreference?: string;
    mealPreference?: string;
    specialAssistance?: boolean;
  };
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
      id: "1",
      name: "Maria Silva",
      email: "maria.silva@email.com",
      phone: "+55 11 98765-4321",
      status: "active",
      membershipLevel: "gold",
      totalFlights: 48,
      lastFlight: "2023-11-15",
      preferences: {
        seatPreference: "window",
        mealPreference: "vegetarian",
        specialAssistance: false,
      },
    },
    {
      id: "2",
      name: "João Santos",
      email: "joao.santos@email.com",
      phone: "+55 21 99876-5432",
      status: "active",
      membershipLevel: "platinum",
      totalFlights: 87,
      lastFlight: "2023-11-28",
      preferences: {
        seatPreference: "aisle",
        mealPreference: "regular",
        specialAssistance: false,
      },
    },
    {
      id: "3",
      name: "Ana Oliveira",
      email: "ana.oliveira@email.com",
      phone: "+55 31 97654-3210",
      status: "inactive",
      membershipLevel: "standard",
      totalFlights: 12,
      lastFlight: "2023-08-05",
      preferences: {
        seatPreference: "no-preference",
        mealPreference: "kosher",
        specialAssistance: true,
      },
    },
    {
      id: "4",
      name: "Carlos Pereira",
      email: "carlos.pereira@email.com",
      phone: "+55 41 96543-2109",
      status: "active",
      membershipLevel: "silver",
      totalFlights: 23,
      lastFlight: "2023-10-20",
      preferences: {
        seatPreference: "window",
        mealPreference: "regular",
        specialAssistance: false,
      },
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
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [membershipFilter, setMembershipFilter] = useState("all");
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
      passenger.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      passenger.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || passenger.status === statusFilter;
    const matchesMembership =
      membershipFilter === "all" ||
      passenger.membershipLevel === membershipFilter;
    return matchesSearch && matchesStatus && matchesMembership;
  });

  // Filter complaints based on search
  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.description.toLowerCase().includes(searchTerm.toLowerCase());
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

  return (
    <div className="w-full h-full bg-background p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">
            Passenger Management
          </h1>
          <p className="text-muted-foreground">
            Manage passenger profiles, analyze behavior, and handle support
            requests
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <UserPlus size={16} />
                New Passenger
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Passenger</DialogTitle>
                <DialogDescription>
                  Enter the passenger details to create a new profile.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john.doe@example.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="+55 11 98765-4321" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="membership">Membership Level</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="silver">Silver</SelectItem>
                        <SelectItem value="gold">Gold</SelectItem>
                        <SelectItem value="platinum">Platinum</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="preferences">Preferences</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="seatPreference" className="text-sm">
                        Seat Preference
                      </Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select preference" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="window">Window</SelectItem>
                          <SelectItem value="aisle">Aisle</SelectItem>
                          <SelectItem value="middle">Middle</SelectItem>
                          <SelectItem value="no-preference">
                            No Preference
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="mealPreference" className="text-sm">
                        Meal Preference
                      </Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select preference" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="regular">Regular</SelectItem>
                          <SelectItem value="vegetarian">Vegetarian</SelectItem>
                          <SelectItem value="vegan">Vegan</SelectItem>
                          <SelectItem value="kosher">Kosher</SelectItem>
                          <SelectItem value="halal">Halal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button type="submit">Create Passenger</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="passengers" className="gap-2">
              <User size={16} />
              Passengers
            </TabsTrigger>
            <TabsTrigger value="behavior" className="gap-2">
              <BarChart3 size={16} />
              Behavior Analysis
            </TabsTrigger>
            <TabsTrigger value="complaints" className="gap-2">
              <MessageSquare size={16} />
              Complaints & Support
            </TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-[250px] pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter size={16} />
            </Button>
          </div>
        </div>

        <TabsContent value="passengers" className="mt-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Passenger Directory</CardTitle>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={membershipFilter}
                  onValueChange={setMembershipFilter}
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Membership" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="silver">Silver</SelectItem>
                    <SelectItem value="gold">Gold</SelectItem>
                    <SelectItem value="platinum">Platinum</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Membership</TableHead>
                    <TableHead>Total Flights</TableHead>
                    <TableHead>Last Flight</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPassengers.length > 0 ? (
                    filteredPassengers.map((passenger) => (
                      <TableRow key={passenger.id}>
                        <TableCell className="font-medium">
                          {passenger.name}
                        </TableCell>
                        <TableCell>{passenger.email}</TableCell>
                        <TableCell>{passenger.phone}</TableCell>
                        <TableCell>
                          <Badge
                            className={`${passenger.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                          >
                            {passenger.status === "active"
                              ? "Active"
                              : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {getMembershipBadge(passenger.membershipLevel)}
                        </TableCell>
                        <TableCell>{passenger.totalFlights}</TableCell>
                        <TableCell>{passenger.lastFlight || "N/A"}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewPassenger(passenger)}
                            >
                              View
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical size={16} />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem className="gap-2">
                                  <Edit size={14} />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2 text-destructive">
                                  <Trash2 size={14} />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-4">
                        No passengers found matching your criteria.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="behavior" className="mt-2">
          <Card>
            <CardHeader>
              <CardTitle>Passenger Behavior Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Travel Patterns</h3>
                  <div className="border rounded-lg p-8 text-center bg-muted/20">
                    <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      Travel pattern visualization would be displayed here,
                      showing frequency, preferred routes, and seasonal trends.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Purchase History</h3>
                  <div className="border rounded-lg p-8 text-center bg-muted/20">
                    <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      Purchase history analysis would be displayed here, showing
                      spending patterns, preferred classes, and add-on services.
                    </p>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <h3 className="text-lg font-medium mb-4">
                    Passenger Segmentation
                  </h3>
                  <div className="border rounded-lg p-8 text-center bg-muted/20">
                    <p className="text-muted-foreground">
                      Passenger segmentation visualization would be displayed
                      here, grouping customers by behavior, preferences, and
                      value.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="complaints" className="mt-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Complaints & Support Requests</CardTitle>
              <Button className="gap-2">
                <Plus size={16} />
                New Complaint
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Passenger</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredComplaints.length > 0 ? (
                    filteredComplaints.map((complaint) => {
                      const passenger = passengers.find(
                        (p) => p.id === complaint.passengerId,
                      );
                      return (
                        <TableRow key={complaint.id}>
                          <TableCell>{complaint.date}</TableCell>
                          <TableCell className="font-medium">
                            {passenger?.name || "Unknown"}
                          </TableCell>
                          <TableCell>{complaint.subject}</TableCell>
                          <TableCell>
                            {getComplaintStatusBadge(complaint.status)}
                          </TableCell>
                          <TableCell>
                            {getComplaintPriorityBadge(complaint.priority)}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleViewComplaint(complaint)}
                              >
                                View
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical size={16} />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem className="gap-2">
                                    <Edit size={14} />
                                    Update Status
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="gap-2">
                                    <MessageSquare size={14} />
                                    Add Comment
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4">
                        No complaints found matching your criteria.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

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
