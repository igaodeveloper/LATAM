import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  Plane,
  Calendar,
  Clock,
  Wrench,
  AlertTriangle,
  CheckCircle,
  FileText,
  BarChart,
  MapPin,
  Info,
} from "lucide-react";

interface Aircraft {
  id: string;
  registration: string;
  model: string;
  manufacturer: string;
  manufactureYear: number;
  status: "available" | "in-flight" | "maintenance" | "scheduled-maintenance";
  location: string;
  flightHours: number;
  cycles: number;
  lastMaintenance: string;
  nextMaintenance: string;
  maintenanceHistory: MaintenanceRecord[];
  specifications: {
    seatingCapacity: number;
    range: string;
    engines: string;
    maxTakeoffWeight: string;
  };
  currentFlight?: {
    flightNumber: string;
    origin: string;
    destination: string;
    departureTime: string;
    arrivalTime: string;
  };
}

interface MaintenanceRecord {
  id: string;
  type: string;
  date: string;
  description: string;
  technician: string;
  status: "completed" | "scheduled" | "in-progress";
  hours: number;
}

interface AircraftDetailsProps {
  aircraft?: Aircraft;
}

const AircraftDetails = ({
  aircraft = {
    id: "1",
    registration: "CC-BAW",
    model: "Boeing 787-9 Dreamliner",
    manufacturer: "Boeing",
    manufactureYear: 2016,
    status: "available",
    location: "Santiago (SCL)",