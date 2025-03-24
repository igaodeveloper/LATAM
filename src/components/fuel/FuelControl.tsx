import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Fuel,
  Plane,
  BarChart,
  TrendingUp,
  TrendingDown,
  Calendar,
  Filter,
  Search,
  Download,
  AlertTriangle,
  Check,
  Clock,
  DollarSign,
  CheckCircle,
} from "lucide-react";

interface FuelData {
  id: string;
  airport: string;
  code: string;
  currentPrice: number;
  previousPrice: number;
  availableVolume: number;
  lastUpdated: string;
  supplier: string;
  status: "available" | "limited" | "unavailable";
}

interface AircraftFuelData {
  id: string;
  registration: string;
  model: string;
  currentFuel: number;
  capacity: number;
  averageConsumption: number;
  lastRefueled: string;
  nextRefueling: string;
  status: "optimal" | "refueling-recommended" | "refueling-required";
}

interface FuelControlProps {
  fuelData?: FuelData[];
  aircraftFuelData?: AircraftFuelData[];
}

const FuelControl = ({
  fuelData = [
    {
      id: "1",
      airport: "Santiago International Airport",
      code: "SCL",
      currentPrice: 2.45,
      previousPrice: 2.38,
      availableVolume: 450000,
      lastUpdated: "2023-11-15",
      supplier: "PetroCL",
      status: "available",
    },
    {
      id: "2",
      airport: "Jorge Chávez International Airport",
      code: "LIM",
      currentPrice: 2.62,
      previousPrice: 2.70,
      availableVolume: 320000,
      lastUpdated: "2023-11-14",
      supplier: "PeruPetrol",
      status: "available",
    },
    {
      id: "3",
      airport: "El Dorado International Airport",
      code: "BOG",
      currentPrice: 2.58,
      previousPrice: 2.55,
      availableVolume: 280000,
      lastUpdated: "2023-11-15",
      supplier: "ColFuel",
      status: "limited",
    },
    {
      id: "4",
      airport: "Ministro Pistarini International Airport",
      code: "EZE",
      currentPrice: 2.75,
      previousPrice: 2.82,
      availableVolume: 390000,
      lastUpdated: "2023-11-13",
      supplier: "ArgFuels",
      status: "available",
    },
    {
      id: "5",
      airport: "São Paulo–Guarulhos International Airport",
      code: "GRU",
      currentPrice: 2.68,
      previousPrice: 2.72,
      availableVolume: 520000,
      lastUpdated: "2023-11-15",
      supplier: "BrasilPetro",
      status: "available",
    },
  ],
  aircraftFuelData = [
    {
      id: "1",
      registration: "CC-BAW",
      model: "Boeing 787-9",
      currentFuel: 75000,
      capacity: 126000,
      averageConsumption: 5400,
      lastRefueled: "2023-11-15",
      nextRefueling: "2023-11-16",
      status: "optimal",
    },
    {
      id: "2",
      registration: "CC-BGO",
      model: "Airbus A320neo",
      currentFuel: 12500,
      capacity: 24000,
      averageConsumption: 2800,
      lastRefueled: "2023-11-14",
      nextRefueling: "2023-11-16",
      status: "refueling-recommended",
    },
    {
      id: "3",
      registration: "CC-COP",
      model: "Boeing 777-300ER",
      currentFuel: 45000,
      capacity: 145000,
      averageConsumption: 7800,
      lastRefueled: "2023-11-13",
      nextRefueling: "2023-11-15",
      status: "refueling-required",
    },
    {
      id: "4",
      registration: "CC-DEM",
      model: "Airbus A350-900",
      currentFuel: 82000,
      capacity: 124000,
      averageConsumption: 6200,
      lastRefueled: "2023-11-15",
      nextRefueling: "2023-11-17",
      status: "optimal",
    },
  ],
}: FuelControlProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("monitoring");

  const filteredFuelData = fuelData.filter((data) => {
    const matchesSearch =
      data.airport.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || data.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredAircraftData = aircraftFuelData.filter((data) => {
    const matchesSearch =
      data.registration.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || data.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: FuelData["status"]) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-100 text-green-800">Available</Badge>;
      case "limited":
        return <Badge className="bg-amber-100 text-amber-800">Limited</Badge>;
      case "unavailable":
        return <Badge className="bg-red-100 text-red-800">Unavailable</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getAircraftStatusBadge = (status: AircraftFuelData["status"]) => {
    switch (status) {
      case "optimal":
        return <Badge className="bg-green-100 text-green-800">Optimal</Badge>;
      case "refueling-recommended":
        return (
          <Badge className="bg-amber-100 text-amber-800">
            Refueling Recommended
          </Badge>
        );
      case "refueling-required":
        return (
          <Badge className="bg-red-100 text-red-800">Refueling Required</Badge>
        );
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getPriceChange = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    const isIncrease = change > 0;

    return (
      <div
        className={`flex items-center ${isIncrease ? "text-red-500" : "text-green-500"}`}
      >
        {isIncrease ? (
          <TrendingUp className="h-4 w-4 mr-1" />
        ) : (
          <TrendingDown className="h-4 w-4 mr-1" />
        )}
        {Math.abs(change).toFixed(2)}%
      </div>
    );
  };

  return (
    <div className="w-full h-full bg-background p-6 pt-0">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">Fuel Control</h1>
          <p className="text-muted-foreground">
            Monitor fuel consumption, prices, and manage refueling operations
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button size="sm" className="gap-2">
            <Fuel className="h-4 w-4" />
            Schedule Refueling
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="monitoring" className="gap-2">
            <Fuel size={16} />
            Fuel Monitoring
          </TabsTrigger>
          <TabsTrigger value="prices" className="gap-2">
            <DollarSign size={16} />
            Fuel Prices
          </TabsTrigger>
          <TabsTrigger value="consumption" className="gap-2">
            <BarChart size={16} />
            Consumption Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Aircraft
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {aircraftFuelData.length}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Require Refueling
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {aircraftFuelData.filter(
                    (a) => a.status === "refueling-required"
                  ).length}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Fuel Level
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(
                    (aircraftFuelData.reduce(
                      (acc, aircraft) =>
                        acc +
                        (aircraft.currentFuel / aircraft.capacity) * 100,
                      0
                    ) /
                      aircraftFuelData.length) *
                      10
                  ) / 10}%
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Avg. Daily Consumption
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(
                    aircraftFuelData.reduce(
                      (acc, aircraft) => acc + aircraft.averageConsumption,
                      0
                    ) / aircraftFuelData.length
                  ).toLocaleString()}{" "}
                  kg
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Aircraft Fuel Status</CardTitle>
              <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by registration or model..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Select
                    value={statusFilter}
                    onValueChange={setStatusFilter}
                  >
                    <SelectTrigger className="w-[180px]">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="optimal">Optimal</SelectItem>
                      <SelectItem value="refueling-recommended">
                        Refueling Recommended
                      </SelectItem>
                      <SelectItem value="refueling-required">
                        Refueling Required
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Aircraft</TableHead>
                    <TableHead>Model</TableHead>
                    <TableHead>Current Fuel</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Fuel Level</TableHead>
                    <TableHead>Last Refueled</TableHead>
                    <TableHead>Next Refueling</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAircraftData.length > 0 ? (
                    filteredAircraftData.map((aircraft) => (
                      <TableRow
                        key={aircraft.id}
                        className="animate-slide-in-up stagger-item"
                        style={{
                          animationDelay: `${parseInt(aircraft.id) * 0.1}s`,
                        }}
                      >
                        <TableCell className="font-medium">
                          {aircraft.registration}
                        </TableCell>
                        <TableCell>{aircraft.model}</TableCell>
                        <TableCell>
                          {aircraft.currentFuel.toLocaleString()} kg
                        </TableCell>
                        <TableCell>
                          {aircraft.capacity.toLocaleString()} kg
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-24 h-2 bg-gray-200 rounded-full mr-2">
                              <div
                                className={`h-full rounded-full ${aircraft.status === "optimal" ? "bg-green-500" : aircraft.status === "refueling-recommended" ? "bg-amber-500" : "bg-red-500"}`}
                                style={{
                                  width: `${(aircraft.currentFuel / aircraft.capacity) * 100}%`,
                                }}
                              ></div>
                            </div>
                            <span>
                              {Math.round(
                                (aircraft.currentFuel / aircraft.capacity) * 100
                              )}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{aircraft.lastRefueled}</TableCell>
                        <TableCell>{aircraft.nextRefueling}</TableCell>
                        <TableCell>
                          {getAircraftStatusBadge(aircraft.status)}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            Schedule Refueling
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-4">
                        No aircraft found matching your criteria.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Refueling Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 border rounded-lg bg-red-50">
                    <div className="rounded-full bg-red-100 p-2">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">
                        CC-COP - Boeing 777-300ER
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Scheduled for refueling today at SCL
                      </div>
                      <div className="flex items-center mt-2">
                        <Badge className="bg-red-100 text-red-800">
                          Urgent
                        </Badge>
                        <span className="text-xs text-gray-500 ml-2">
                          <Clock className="inline h-3 w-3 mr-1" />
                          Due in 2 hours
                        </span>
                      </div>
                    </div>
                    <Button size="sm">Confirm</Button>
                  </div>

                  <div className="flex items-start space-x-4 p-4 border rounded-lg bg-amber-50">
                    <div className="rounded-full bg-amber-100 p-2">
                      <Clock className="h-5 w-5 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">
                        CC-BGO - Airbus A320neo
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Scheduled for refueling tomorrow at LIM
                      </div>
                      <div className="flex items-center mt-2">
                        <Badge className="bg-amber-100 text-amber-800">
                          Scheduled
                        </Badge>
                        <span className="text-xs text-gray-500 ml-2">
                          <Calendar className="inline h-3 w-3 mr-1" />
                          Nov 16, 2023 - 10:30
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Modify
                    </Button>
                  </div>

                  <div className="flex items-start space-x-4 p-4 border rounded-lg">
                    <div className="rounded-full bg-green-100 p-2">
                      <Check className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">
                        CC-DEM - Airbus A350-900
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Scheduled for refueling on Nov 17 at SCL
                      </div>
                      <div className="flex items-center mt-2">
                        <Badge className="bg-blue-100 text-blue-800">
                          Planned
                        </Badge>
                        <span className="text-xs text-gray-500 ml-2">
                          <Calendar className="inline h-3 w-3 mr-1" />
                          Nov 17, 2023 - 14:45
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Modify
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Refueling Operations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 border rounded-lg">
                    <div className="rounded-full bg-green-100 p-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">
                        CC-BAW - Boeing 787-9
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Refueled at SCL
                      </div>
                      <div className="flex items-center mt-2">
                        <Badge className="bg-green-100 text-green-800">
                          Completed
                        </Badge>
                        <span className="text-xs text-gray-500 ml-2">
                          <Clock className="inline h-3 w-3 mr-1" />
                          1 hour ago
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="prices" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Price
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  $
                  {(
                    fuelData.reduce(
                      (acc, data) => acc + data.currentPrice,
                      0
                    ) / fuelData.length
                  ).toFixed(2)}
                </div>
                <div className="text-xs text-gray-500">per kg</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Lowest Price
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  $
                  {Math.min(...fuelData.map((data) => data.currentPrice)).toFixed(2)}
                </div>
                <div className="text-xs text-gray-500">SCL</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Highest Price
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  $
                  {Math.max(...fuelData.map((data) => data.currentPrice)).toFixed(2)}
                </div>
                <div className="text-xs text-gray-500">EZE</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Price Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-600">+1.2%</div>
                <div className="text-xs text-gray-500">Last 7 days</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Fuel Prices by Airport</CardTitle>
              <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by airport code or name..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Select
                    value={statusFilter}
                    onValueChange={setStatusFilter}
                  >
                    <SelectTrigger className="w-[180px]">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="limited">Limited</SelectItem>
                      <SelectItem value="unavailable">Unavailable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Airport</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Current Price</TableHead>
                    <TableHead>Previous Price</TableHead>
                    <TableHead>Change</TableHead>
                    <TableHead>Available Volume</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFuelData.length > 0 ? (
                    filteredFuelData.map((fuel) => (
                      <TableRow
                        key={fuel.id}
                        className="animate-slide-in-up stagger-item"
                        style={{
                          animationDelay: `${parseInt(fuel.id) * 0.1}s`,
                        }}
                      >
                        <TableCell className="font-medium">
                          {fuel.airport}
                        </TableCell>
                        <TableCell>{fuel.code}</TableCell>
                        <TableCell>
                          ${fuel.currentPrice.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          ${fuel.previousPrice.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {getPriceChange(fuel.currentPrice, fuel.previousPrice)}
                        </TableCell>
                        <TableCell>
                          {fuel.availableVolume.toLocaleString()} L
                        </TableCell>
                        <TableCell>{fuel.lastUpdated}</TableCell>
                        <TableCell>
                          {getStatusBadge(fuel.status)}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-4">
                        No fuel data found matching your criteria.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="consumption" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Fuel Consumption Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  {/* Add your chart component here */}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  {/* Add your chart component here */}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FuelControl;
