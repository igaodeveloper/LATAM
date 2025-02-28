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
  Map,
  Cloud,
  Plane,
  Route,
  Wind,
  Thermometer,
  AlertTriangle,
  Clock,
  Calendar,
  Filter,
  Search,
  Plus,
  Download,
  BarChart,
} from "lucide-react";

interface RouteData {
  id: string;
  origin: string;
  destination: string;
  distance: number;
  estimatedTime: string;
  weatherCondition: "good" | "moderate" | "poor";
  alternateRoutes: number;
  fuelConsumption: number;
  status: "active" | "inactive" | "seasonal";
}

interface RoutePlanningProps {
  routes?: RouteData[];
}

const RoutePlanning = ({
  routes = [
    {
      id: "1",
      origin: "Santiago (SCL)",
      destination: "Lima (LIM)",
      distance: 2453,
      estimatedTime: "3h 15m",
      weatherCondition: "good",
      alternateRoutes: 2,
      fuelConsumption: 5200,
      status: "active",
    },
    {
      id: "2",
      origin: "Santiago (SCL)",
      destination: "Buenos Aires (EZE)",
      distance: 1138,
      estimatedTime: "2h 10m",
      weatherCondition: "moderate",
      alternateRoutes: 1,
      fuelConsumption: 3800,
      status: "active",
    },
    {
      id: "3",
      origin: "Lima (LIM)",
      destination: "Bogotá (BOG)",
      distance: 1879,
      estimatedTime: "3h 05m",
      weatherCondition: "poor",
      alternateRoutes: 3,
      fuelConsumption: 4900,
      status: "active",
    },
    {
      id: "4",
      origin: "Santiago (SCL)",
      destination: "São Paulo (GRU)",
      distance: 2617,
      estimatedTime: "3h 45m",
      weatherCondition: "good",
      alternateRoutes: 2,
      fuelConsumption: 5600,
      status: "active",
    },
    {
      id: "5",
      origin: "Santiago (SCL)",
      destination: "Punta Cana (PUJ)",
      distance: 5268,
      estimatedTime: "7h 20m",
      weatherCondition: "moderate",
      alternateRoutes: 2,
      fuelConsumption: 12400,
      status: "seasonal",
    },
  ],
}: RoutePlanningProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("routes");

  const filteredRoutes = routes.filter((route) => {
    const matchesSearch =
      route.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || route.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getWeatherBadge = (condition: RouteData["weatherCondition"]) => {
    switch (condition) {
      case "good":
        return <Badge className="bg-green-100 text-green-800">Good</Badge>;
      case "moderate":
        return <Badge className="bg-amber-100 text-amber-800">Moderate</Badge>;
      case "poor":
        return <Badge className="bg-red-100 text-red-800">Poor</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getStatusBadge = (status: RouteData["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
      case "seasonal":
        return <Badge className="bg-blue-100 text-blue-800">Seasonal</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <div className="w-full h-full bg-background p-6 pt-0">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">Route Planning</h1>
          <p className="text-muted-foreground">
            Optimize flight routes, analyze weather conditions, and plan
            alternatives
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            New Route
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="routes" className="gap-2">
            <Route size={16} />
            Flight Routes
          </TabsTrigger>
          <TabsTrigger value="weather" className="gap-2">
            <Cloud size={16} />
            Weather Analysis
          </TabsTrigger>
          <TabsTrigger value="alternatives" className="gap-2">
            <Map size={16} />
            Alternative Plans
          </TabsTrigger>
        </TabsList>

        <TabsContent value="routes" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Routes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{routes.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Distance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(
                    routes.reduce((acc, route) => acc + route.distance, 0) /
                      routes.length,
                  ).toLocaleString()}{" "}
                  km
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Weather Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-600">
                  {routes.filter((r) => r.weatherCondition === "poor").length}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Fuel Efficiency
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">87%</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Flight Routes</CardTitle>
              <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by origin or destination..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[150px]">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="seasonal">Seasonal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Route</TableHead>
                    <TableHead>Distance</TableHead>
                    <TableHead>Est. Time</TableHead>
                    <TableHead>Weather</TableHead>
                    <TableHead>Alternates</TableHead>
                    <TableHead>Fuel</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRoutes.length > 0 ? (
                    filteredRoutes.map((route) => (
                      <TableRow
                        key={route.id}
                        className="animate-slide-in-up stagger-item"
                        style={{
                          animationDelay: `${parseInt(route.id) * 0.1}s`,
                        }}
                      >
                        <TableCell className="font-medium">
                          {route.origin} → {route.destination}
                        </TableCell>
                        <TableCell>
                          {route.distance.toLocaleString()} km
                        </TableCell>
                        <TableCell>{route.estimatedTime}</TableCell>
                        <TableCell>
                          {getWeatherBadge(route.weatherCondition)}
                        </TableCell>
                        <TableCell>{route.alternateRoutes}</TableCell>
                        <TableCell>
                          {route.fuelConsumption.toLocaleString()} kg
                        </TableCell>
                        <TableCell>{getStatusBadge(route.status)}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-4">
                        No routes found matching your criteria.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weather" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Weather Conditions Map</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] border rounded-lg p-8 text-center bg-muted/20">
                  <Map className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    Interactive weather map would be displayed here, showing
                    current conditions along flight routes.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Weather Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 border rounded-lg bg-red-50">
                    <div className="rounded-full bg-red-100 p-2">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">
                        Severe Turbulence - Lima to Bogotá
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Strong turbulence expected at 30,000-35,000 feet.
                        Consider altitude adjustments.
                      </div>
                      <div className="flex items-center mt-2">
                        <Badge className="bg-red-100 text-red-800">
                          High Risk
                        </Badge>
                        <span className="text-xs text-gray-500 ml-2">
                          <Clock className="inline h-3 w-3 mr-1" />
                          Updated 30 minutes ago
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 border rounded-lg bg-amber-50">
                    <div className="rounded-full bg-amber-100 p-2">
                      <Cloud className="h-5 w-5 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">
                        Low Visibility - Santiago to Buenos Aires
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Fog expected at EZE airport during arrival time.
                        Visibility below 1000m.
                      </div>
                      <div className="flex items-center mt-2">
                        <Badge className="bg-amber-100 text-amber-800">
                          Medium Risk
                        </Badge>
                        <span className="text-xs text-gray-500 ml-2">
                          <Clock className="inline h-3 w-3 mr-1" />
                          Updated 1 hour ago
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 border rounded-lg bg-blue-50">
                    <div className="rounded-full bg-blue-100 p-2">
                      <Wind className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">
                        Strong Crosswinds - Santiago to São Paulo
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Crosswinds of 25-30 knots expected during approach to
                        GRU.
                      </div>
                      <div className="flex items-center mt-2">
                        <Badge className="bg-blue-100 text-blue-800">
                          Advisory
                        </Badge>
                        <span className="text-xs text-gray-500 ml-2">
                          <Clock className="inline h-3 w-3 mr-1" />
                          Updated 2 hours ago
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>5-Day Weather Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {["Today", "Tomorrow", "Day 3", "Day 4", "Day 5"].map(
                  (day, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <div className="font-medium">{day}</div>
                          <div className="text-xs text-gray-500">
                            {new Date(
                              Date.now() + index * 24 * 60 * 60 * 1000,
                            ).toLocaleDateString()}
                          </div>
                          <div className="my-3">
                            {index === 0 ? (
                              <Cloud className="h-10 w-10 mx-auto text-blue-500" />
                            ) : index === 1 ? (
                              <Cloud className="h-10 w-10 mx-auto text-gray-500" />
                            ) : index === 2 ? (
                              <Sun className="h-10 w-10 mx-auto text-amber-500" />
                            ) : index === 3 ? (
                              <Sun className="h-10 w-10 mx-auto text-amber-500" />
                            ) : (
                              <Cloud className="h-10 w-10 mx-auto text-blue-500" />
                            )}
                          </div>
                          <div className="font-bold text-lg">
                            {index === 0
                              ? "18°C"
                              : index === 1
                                ? "16°C"
                                : index === 2
                                  ? "22°C"
                                  : index === 3
                                    ? "24°C"
                                    : "19°C"}
                          </div>
                          <div className="text-xs text-gray-500">
                            {index === 0
                              ? "Partly Cloudy"
                              : index === 1
                                ? "Overcast"
                                : index === 2
                                  ? "Sunny"
                                  : index === 3
                                    ? "Clear"
                                    : "Scattered Clouds"}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ),
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alternatives" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Alternative Routes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-lg p-4">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <div>
                      <h3 className="text-lg font-medium">
                        Lima (LIM) → Bogotá (BOG)
                      </h3>
                      <div className="text-sm text-gray-500">
                        Primary route affected by severe weather
                      </div>
                    </div>
                    <Badge className="mt-2 md:mt-0 bg-red-100 text-red-800">
                      Alternative Required
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-md p-3 bg-blue-50">
                      <div className="font-medium">Alternative 1</div>
                      <div className="text-sm mt-1">
                        LIM → GYE → BOG
                        <br />
                        Distance: 2,145 km
                        <br />
                        Est. Time: 3h 45m
                        <br />
                        Weather: Good
                      </div>
                      <Button size="sm" className="w-full mt-2">
                        Select
                      </Button>
                    </div>

                    <div className="border rounded-md p-3">
                      <div className="font-medium">Alternative 2</div>
                      <div className="text-sm mt-1">
                        LIM → UIO → BOG
                        <br />
                        Distance: 2,310 km
                        <br />
                        Est. Time: 4h 10m
                        <br />
                        Weather: Moderate
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-2"
                      >
                        Select
                      </Button>
                    </div>

                    <div className="border rounded-md p-3">
                      <div className="font-medium">Alternative 3</div>
                      <div className="text-sm mt-1">
                        LIM → PTY → BOG
                        <br />
                        Distance: 2,580 km
                        <br />
                        Est. Time: 4h 35m
                        <br />
                        Weather: Good
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-2"
                      >
                        Select
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <div>
                      <h3 className="text-lg font-medium">
                        Santiago (SCL) → Buenos Aires (EZE)
                      </h3>
                      <div className="text-sm text-gray-500">
                        Low visibility at destination
                      </div>
                    </div>
                    <Badge className="mt-2 md:mt-0 bg-amber-100 text-amber-800">
                      Caution Advised
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-md p-3">
                      <div className="font-medium">Alternative 1</div>
                      <div className="text-sm mt-1">
                        SCL → MDZ → EZE
                        <br />
                        Distance: 1,285 km
                        <br />
                        Est. Time: 2h 40m
                        <br />
                        Weather: Good
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-2"
                      >
                        Select
                      </Button>
                    </div>

                    <div className="border rounded-md p-3">
                      <div className="font-medium">Delay Option</div>
                      <div className="text-sm mt-1">
                        Delay departure by 3 hours
                        <br />
                        Expected visibility improvement
                        <br />
                        Original route usable
                        <br />
                        Weather: Improving
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-2"
                      >
                        Select
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Diversion Airports</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Airport</TableHead>
                    <TableHead>IATA Code</TableHead>
                    <TableHead>Runway Length</TableHead>
                    <TableHead>Services</TableHead>
                    <TableHead>Weather</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                      Jorge Chávez International Airport
                    </TableCell>
                    <TableCell>LIM</TableCell>
                    <TableCell>3,500m</TableCell>
                    <TableCell>Full</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">
                        Good
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">
                        Open
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      El Dorado International Airport
                    </TableCell>
                    <TableCell>BOG</TableCell>
                    <TableCell>3,800m</TableCell>
                    <TableCell>Full</TableCell>
                    <TableCell>
                      <Badge className="bg-amber-100 text-amber-800">
                        Moderate
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">
                        Open
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Mariscal Sucre International Airport
                    </TableCell>
                    <TableCell>UIO</TableCell>
                    <TableCell>4,100m</TableCell>
                    <TableCell>Full</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">
                        Good
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">
                        Open
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      José María Córdova International Airport
                    </TableCell>
                    <TableCell>MDE</TableCell>
                    <TableCell>3,500m</TableCell>
                    <TableCell>Limited</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">
                        Good
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">
                        Open
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Tocumen International Airport
                    </TableCell>
                    <TableCell>PTY</TableCell>
                    <TableCell>3,050m</TableCell>
                    <TableCell>Full</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">
                        Good
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">
                        Open
                      </Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Placeholder components for icons not imported
const Sun = ({ className }: { className?: string }) => (
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
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

export default RoutePlanning;
