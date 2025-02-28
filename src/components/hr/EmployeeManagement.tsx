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
  Calendar,
  Clock,
  Award,
  FileText,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  status: "active" | "on-leave" | "training";
  joinDate: string;
  certifications: Certification[];
  schedule: {
    currentShift?: string;
    nextShift?: string;
  };
}

interface Certification {
  id: string;
  name: string;
  issuedDate: string;
  expiryDate: string;
  status: "valid" | "expiring-soon" | "expired";
}

interface EmployeeManagementProps {
  employees?: Employee[];
}

const EmployeeManagement = ({
  employees = [
    {
      id: "1",
      name: "Carlos Rodriguez",
      position: "Captain",
      department: "Flight Operations",
      email: "carlos.rodriguez@latam.com",
      phone: "+55 11 98765-4321",
      status: "active",
      joinDate: "2015-06-15",
      certifications: [
        {
          id: "cert1",
          name: "Boeing 787 Type Rating",
          issuedDate: "2020-03-10",
          expiryDate: "2024-03-10",
          status: "valid",
        },
        {
          id: "cert2",
          name: "First Aid Certification",
          issuedDate: "2022-01-15",
          expiryDate: "2024-01-15",
          status: "expiring-soon",
        },
      ],
      schedule: {
        currentShift: "Flight LA1234 (SCL-LIM) - Dec 15, 08:30",
        nextShift: "Flight LA5678 (LIM-BOG) - Dec 18, 14:15",
      },
    },
    {
      id: "2",
      name: "Maria Gonzalez",
      position: "First Officer",
      department: "Flight Operations",
      email: "maria.gonzalez@latam.com",
      phone: "+55 11 97654-3210",
      status: "active",
      joinDate: "2018-09-22",
      certifications: [
        {
          id: "cert3",
          name: "Airbus A320 Type Rating",
          issuedDate: "2018-10-05",
          expiryDate: "2024-10-05",
          status: "valid",
        },
      ],
      schedule: {
        currentShift: "Flight LA5678 (LIM-BOG) - Dec 15, 14:15",
        nextShift: "Flight LA9012 (BOG-SCL) - Dec 20, 10:20",
      },
    },
    {
      id: "3",
      name: "Juan Perez",
      position: "Flight Attendant",
      department: "Cabin Crew",
      email: "juan.perez@latam.com",
      phone: "+55 11 96543-2109",
      status: "on-leave",
      joinDate: "2019-03-15",
      certifications: [
        {
          id: "cert4",
          name: "Emergency Procedures",
          issuedDate: "2022-05-20",
          expiryDate: "2023-11-20",
          status: "expired",
        },
      ],
      schedule: {},
    },
    {
      id: "4",
      name: "Ana Silva",
      position: "Maintenance Technician",
      department: "Aircraft Maintenance",
      email: "ana.silva@latam.com",
      phone: "+55 11 95432-1098",
      status: "training",
      joinDate: "2021-11-10",
      certifications: [
        {
          id: "cert5",
          name: "Aircraft Maintenance License",
          issuedDate: "2021-12-05",
          expiryDate: "2024-12-05",
          status: "valid",
        },
      ],
      schedule: {
        currentShift: "Training: Advanced Avionics - Dec 10-17",
      },
    },
  ],
}: EmployeeManagementProps) => {
  const [activeTab, setActiveTab] = useState("employees");
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null,
  );
  const [isEmployeeDialogOpen, setIsEmployeeDialogOpen] = useState(false);
  const [isCertificationDialogOpen, setIsCertificationDialogOpen] =
    useState(false);

  // Filter employees based on search and filters
  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      departmentFilter === "all" || employee.department === departmentFilter;
    const matchesStatus =
      statusFilter === "all" || employee.status === statusFilter;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // Get all departments for filter
  const departments = [
    ...new Set(employees.map((employee) => employee.department)),
  ];

  // Get all expiring certifications
  const expiringCertifications = employees
    .flatMap((employee) =>
      employee.certifications
        .filter(
          (cert) =>
            cert.status === "expiring-soon" || cert.status === "expired",
        )
        .map((cert) => ({
          ...cert,
          employeeName: employee.name,
          employeeId: employee.id,
        })),
    )
    .sort((a, b) => {
      if (a.status === "expired" && b.status !== "expired") return -1;
      if (a.status !== "expired" && b.status === "expired") return 1;
      return (
        new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime()
      );
    });

  const handleViewEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsEmployeeDialogOpen(true);
  };

  const getStatusBadge = (status: Employee["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "on-leave":
        return <Badge className="bg-amber-100 text-amber-800">On Leave</Badge>;
      case "training":
        return <Badge className="bg-blue-100 text-blue-800">Training</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getCertificationStatusBadge = (status: Certification["status"]) => {
    switch (status) {
      case "valid":
        return <Badge className="bg-green-100 text-green-800">Valid</Badge>;
      case "expiring-soon":
        return (
          <Badge className="bg-amber-100 text-amber-800">Expiring Soon</Badge>
        );
      case "expired":
        return <Badge className="bg-red-100 text-red-800">Expired</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <div className="w-full h-full bg-background p-6 pt-0">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">
            Employee Management
          </h1>
          <p className="text-muted-foreground">
            Manage staff information, certifications, and work schedules
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <UserPlus size={16} />
                New Employee
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Employee</DialogTitle>
                <DialogDescription>
                  Enter the employee details to create a new profile.
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
                      placeholder="john.doe@latam.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="position">Position</Label>
                    <Input id="position" placeholder="Captain" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="department">Department</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="flight-operations">
                          Flight Operations
                        </SelectItem>
                        <SelectItem value="cabin-crew">Cabin Crew</SelectItem>
                        <SelectItem value="aircraft-maintenance">
                          Aircraft Maintenance
                        </SelectItem>
                        <SelectItem value="ground-operations">
                          Ground Operations
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="+55 11 98765-4321" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="joinDate">Join Date</Label>
                    <Input id="joinDate" type="date" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button type="submit">Create Employee</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="employees" className="gap-2">
              <User size={16} />
              Employees
            </TabsTrigger>
            <TabsTrigger value="certifications" className="gap-2">
              <Award size={16} />
              Certifications
            </TabsTrigger>
            <TabsTrigger value="schedules" className="gap-2">
              <Calendar size={16} />
              Shift Management
            </TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search employees..."
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

        <TabsContent value="employees" className="mt-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Employee Directory</CardTitle>
              <div className="flex gap-2">
                <Select
                  value={departmentFilter}
                  onValueChange={setDepartmentFilter}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="on-leave">On Leave</SelectItem>
                    <SelectItem value="training">Training</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell className="font-medium">
                          {employee.name}
                        </TableCell>
                        <TableCell>{employee.position}</TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell>{getStatusBadge(employee.status)}</TableCell>
                        <TableCell>{employee.email}</TableCell>
                        <TableCell>{employee.joinDate}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewEmployee(employee)}
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
                                <DropdownMenuItem className="gap-2">
                                  <Award size={14} />
                                  Add Certification
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
                      <TableCell colSpan={7} className="text-center py-4">
                        No employees found matching your criteria.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certifications" className="mt-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Certification Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Employee</TableHead>
                        <TableHead>Certification</TableHead>
                        <TableHead>Issued Date</TableHead>
                        <TableHead>Expiry Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {employees
                        .flatMap((employee) =>
                          employee.certifications.map((cert) => ({
                            employeeId: employee.id,
                            employeeName: employee.name,
                            ...cert,
                          })),
                        )
                        .filter(
                          (cert) =>
                            cert.name
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase()) ||
                            cert.employeeName
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase()),
                        )
                        .map((cert) => (
                          <TableRow key={cert.id}>
                            <TableCell className="font-medium">
                              {cert.employeeName}
                            </TableCell>
                            <TableCell>{cert.name}</TableCell>
                            <TableCell>{cert.issuedDate}</TableCell>
                            <TableCell>{cert.expiryDate}</TableCell>
                            <TableCell>
                              {getCertificationStatusBadge(cert.status)}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm">
                                  View
                                </Button>
                                <Button variant="ghost" size="sm">
                                  Renew
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    Expiring Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {expiringCertifications.length > 0 ? (
                      expiringCertifications.map((cert) => (
                        <div
                          key={cert.id}
                          className={`border rounded-lg p-3 ${cert.status === "expired" ? "border-red-200 bg-red-50" : "border-amber-200 bg-amber-50"}`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium">{cert.name}</div>
                              <div className="text-sm text-gray-600">
                                {cert.employeeName}
                              </div>
                              <div className="text-sm text-gray-600 mt-1">
                                Expires: {cert.expiryDate}
                              </div>
                            </div>
                            <div>
                              {getCertificationStatusBadge(cert.status)}
                            </div>
                          </div>
                          <div className="mt-2 pt-2 border-t border-gray-200 flex justify-end">
                            <Button size="sm" variant="outline">
                              Schedule Renewal
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6">
                        <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-2" />
                        <p className="text-gray-600">
                          No expiring certifications
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Add New Certification</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="employee">Employee</Label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select employee" />
                        </SelectTrigger>
                        <SelectContent>
                          {employees.map((employee) => (
                            <SelectItem key={employee.id} value={employee.id}>
                              {employee.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="certification">Certification Type</Label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select certification" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="type-rating">
                            Aircraft Type Rating
                          </SelectItem>
                          <SelectItem value="first-aid">First Aid</SelectItem>
                          <SelectItem value="emergency">
                            Emergency Procedures
                          </SelectItem>
                          <SelectItem value="maintenance">
                            Maintenance License
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="issuedDate">Issue Date</Label>
                        <Input id="issuedDate" type="date" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input id="expiryDate" type="date" className="mt-1" />
                      </div>
                    </div>
                    <Button className="w-full">Add Certification</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="schedules" className="mt-2">
          <Card>
            <CardHeader>
              <CardTitle>Shift Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-8 text-center bg-muted/20 mb-6">
                <Calendar className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Interactive shift calendar would be displayed here, allowing
                  drag-and-drop scheduling and conflict resolution.
                </p>
              </div>

              <h3 className="text-lg font-medium mb-4">Current Shifts</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Current Assignment</TableHead>
                    <TableHead>Next Assignment</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees
                    .filter((employee) => employee.status === "active")
                    .map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell className="font-medium">
                          {employee.name}
                        </TableCell>
                        <TableCell>{employee.position}</TableCell>
                        <TableCell>
                          {employee.schedule.currentShift ? (
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-blue-500" />
                              {employee.schedule.currentShift}
                            </div>
                          ) : (
                            <span className="text-gray-500">
                              No current assignment
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          {employee.schedule.nextShift ? (
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-green-500" />
                              {employee.schedule.nextShift}
                            </div>
                          ) : (
                            <span className="text-gray-500">
                              No upcoming assignment
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            Assign Shift
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Employee Details Dialog */}
      <Dialog
        open={isEmployeeDialogOpen}
        onOpenChange={setIsEmployeeDialogOpen}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Employee Details</DialogTitle>
          </DialogHeader>
          {selectedEmployee && (
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary animate-float">
                  <User size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{selectedEmployee.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className="bg-blue-100 text-blue-800">
                      {selectedEmployee.position}
                    </Badge>
                    {getStatusBadge(selectedEmployee.status)}
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
                    <span>{selectedEmployee.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedEmployee.phone}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">
                    Employment Information
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedEmployee.department}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Joined: {selectedEmployee.joinDate}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-2">Current Schedule</h4>
                {selectedEmployee.schedule.currentShift ? (
                  <div className="border rounded-md p-3 bg-blue-50">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-blue-500" />
                      <span className="font-medium">Current Assignment</span>
                    </div>
                    <div className="mt-1 ml-7">
                      {selectedEmployee.schedule.currentShift}
                    </div>
                  </div>
                ) : (
                  <div className="border rounded-md p-3 bg-gray-50">
                    <div className="text-gray-500">No current assignment</div>
                  </div>
                )}

                {selectedEmployee.schedule.nextShift && (
                  <div className="border rounded-md p-3 bg-green-50 mt-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-green-500" />
                      <span className="font-medium">Next Assignment</span>
                    </div>
                    <div className="mt-1 ml-7">
                      {selectedEmployee.schedule.nextShift}
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-2">Certifications</h4>
                {selectedEmployee.certifications.length > 0 ? (
                  <div className="space-y-3">
                    {selectedEmployee.certifications.map((cert) => (
                      <div key={cert.id} className="border rounded-md p-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">{cert.name}</div>
                            <div className="text-sm text-gray-600 mt-1">
                              Issued: {cert.issuedDate} • Expires:{" "}
                              {cert.expiryDate}
                            </div>
                          </div>
                          <div>{getCertificationStatusBadge(cert.status)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-500">No certifications found</div>
                )}
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsEmployeeDialogOpen(false)}
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
    </div>
  );
};

export default EmployeeManagement;
