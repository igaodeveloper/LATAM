import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Luggage,
  Search,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Plane,
  Loader2,
  Info,
  ArrowRight,
  LocateFixed,
} from "lucide-react";

interface BaggageStatus {
  id: string;
  trackingNumber: string;
  passengerName: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureDate: string;
  status:
    | "checked-in"
    | "loaded"
    | "in-transit"
    | "unloaded"
    | "claim-area"
    | "delivered"
    | "delayed";
  lastUpdated: string;
  location: string;
  history: {
    status: string;
    location: string;
    timestamp: string;
  }[];
}

interface BaggageTrackingProps {
  initialBaggage?: BaggageStatus[];
}

const BaggageTracking = ({
  initialBaggage = [
    {
      id: "1",
      trackingNumber: "LATBAG123456",
      passengerName: "Carlos Mendoza",
      flightNumber: "LA1234",
      origin: "Santiago (SCL)",
      destination: "Lima (LIM)",
      departureDate: "2023-12-15",
      status: "in-transit",
      lastUpdated: "2023-12-15T10:30:00",
      location: "Em trânsito",
      history: [
        {
          status: "checked-in",
          location: "Santiago (SCL)",
          timestamp: "2023-12-15T08:15:00",
        },
        {
          status: "loaded",
          location: "Santiago (SCL)",
          timestamp: "2023-12-15T09:20:00",
        },
        {
          status: "in-transit",
          location: "Em trânsito",
          timestamp: "2023-12-15T10:30:00",
        },
      ],
    },
    {
      id: "2",
      trackingNumber: "LATBAG789012",
      passengerName: "Carlos Mendoza",
      flightNumber: "LA5678",
      origin: "Lima (LIM)",
      destination: "Bogotá (BOG)",
      departureDate: "2023-11-22",
      status: "delivered",
      lastUpdated: "2023-11-22T16:45:00",
      location: "Bogotá (BOG)",
      history: [
        {
          status: "checked-in",
          location: "Lima (LIM)",
          timestamp: "2023-11-22T13:10:00",
        },
        {
          status: "loaded",
          location: "Lima (LIM)",
          timestamp: "2023-11-22T14:05:00",
        },
        {
          status: "in-transit",
          location: "Em trânsito",
          timestamp: "2023-11-22T14:30:00",
        },
        {
          status: "unloaded",
          location: "Bogotá (BOG)",
          timestamp: "2023-11-22T16:15:00",
        },
        {
          status: "claim-area",
          location: "Bogotá (BOG)",
          timestamp: "2023-11-22T16:30:00",
        },
        {
          status: "delivered",
          location: "Bogotá (BOG)",
          timestamp: "2023-11-22T16:45:00",
        },
      ],
    },
    {
      id: "3",
      trackingNumber: "LATBAG345678",
      passengerName: "Carlos Mendoza",
      flightNumber: "LA9012",
      origin: "Bogotá (BOG)",
      destination: "Santiago (SCL)",
      departureDate: "2023-10-05",
      status: "delayed",
      lastUpdated: "2023-10-05T15:20:00",
      location: "Santiago (SCL)",
      history: [
        {
          status: "checked-in",
          location: "Bogotá (BOG)",
          timestamp: "2023-10-05T09:30:00",
        },
        {
          status: "loaded",
          location: "Bogotá (BOG)",
          timestamp: "2023-10-05T10:45:00",
        },
        {
          status: "in-transit",
          location: "Em trânsito",
          timestamp: "2023-10-05T11:15:00",
        },
        {
          status: "unloaded",
          location: "Santiago (SCL)",
          timestamp: "2023-10-05T14:50:00",
        },
        {
          status: "delayed",
          location: "Santiago (SCL)",
          timestamp: "2023-10-05T15:20:00",
        },
      ],
    },
  ],
}: BaggageTrackingProps) => {
  const [activeTab, setActiveTab] = useState("search");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [selectedBaggage, setSelectedBaggage] = useState<BaggageStatus | null>(
    null,
  );
  const [recentBaggage, setRecentBaggage] =
    useState<BaggageStatus[]>(initialBaggage);

  const handleSearch = () => {
    // In a real app, this would search for the baggage
    // For demo purposes, we'll just use the first baggage in the list
    if (trackingNumber.trim() !== "") {
      const found = initialBaggage.find(
        (b) => b.trackingNumber.toLowerCase() === trackingNumber.toLowerCase(),
      );
      if (found) {
        setSelectedBaggage(found);
        setActiveTab("details");
      }
      setSearchPerformed(true);
    }
  };

  const handleSelectBaggage = (baggage: BaggageStatus) => {
    setSelectedBaggage(baggage);
    setActiveTab("details");
  };

  const getStatusBadge = (status: BaggageStatus["status"]) => {
    switch (status) {
      case "checked-in":
        return <Badge className="bg-blue-100 text-blue-800">Despachada</Badge>;
      case "loaded":
        return (
          <Badge className="bg-indigo-100 text-indigo-800">Carregada</Badge>
        );
      case "in-transit":
        return (
          <Badge className="bg-purple-100 text-purple-800">Em Trânsito</Badge>
        );
      case "unloaded":
        return (
          <Badge className="bg-amber-100 text-amber-800">Descarregada</Badge>
        );
      case "claim-area":
        return (
          <Badge className="bg-green-100 text-green-800">Na Esteira</Badge>
        );
      case "delivered":
        return <Badge className="bg-green-100 text-green-800">Entregue</Badge>;
      case "delayed":
        return <Badge className="bg-red-100 text-red-800">Atrasada</Badge>;
      default:
        return <Badge>Desconhecido</Badge>;
    }
  };

  const getStatusIcon = (status: BaggageStatus["status"]) => {
    switch (status) {
      case "checked-in":
        return <Luggage className="h-5 w-5 text-blue-500" />;
      case "loaded":
        return <Plane className="h-5 w-5 text-indigo-500" />;
      case "in-transit":
        return <Plane className="h-5 w-5 text-purple-500" />;
      case "unloaded":
        return <Luggage className="h-5 w-5 text-amber-500" />;
      case "claim-area":
        return <LocateFixed className="h-5 w-5 text-green-500" />;
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "delayed":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6 pt-0">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Rastreamento de Bagagem
          </h1>
          <p className="text-gray-600">
            Acompanhe sua bagagem em tempo real durante toda a viagem
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="search" className="flex items-center gap-2">
              <Search size={16} />
              Buscar Bagagem
            </TabsTrigger>
            <TabsTrigger
              value="details"
              disabled={!selectedBaggage}
              className="flex items-center gap-2"
            >
              <Luggage size={16} />
              Detalhes da Bagagem
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search">
            <Card>
              <CardHeader>
                <CardTitle>Rastrear sua Bagagem</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="trackingNumber">
                        Número de Rastreamento da Bagagem
                      </Label>
                      <div className="flex space-x-2">
                        <Input
                          id="trackingNumber"
                          placeholder="Ex: LATBAG123456"
                          value={trackingNumber}
                          onChange={(e) => setTrackingNumber(e.target.value)}
                        />
                        <Button
                          onClick={handleSearch}
                          disabled={!trackingNumber}
                        >
                          Buscar
                        </Button>
                      </div>
                      {searchPerformed && !selectedBaggage && (
                        <p className="text-sm text-red-500 mt-2">
                          Bagagem não encontrada. Verifique o número de
                          rastreamento.
                        </p>
                      )}
                    </div>

                    <div className="text-sm text-gray-600">
                      <p>
                        O número de rastreamento está no seu recibo de bagagem
                        ou no e-mail de confirmação do check-in.
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-4">
                      Bagagens Recentes
                    </h3>
                    {recentBaggage.length > 0 ? (
                      <div className="space-y-4">
                        {recentBaggage.map((baggage) => (
                          <div
                            key={baggage.id}
                            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                            onClick={() => handleSelectBaggage(baggage)}
                          >
                            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                              <div>
                                <div className="flex items-center">
                                  <span className="font-bold text-lg mr-2 animate-fade-in">
                                    {baggage.trackingNumber}
                                  </span>
                                  {getStatusBadge(baggage.status)}
                                </div>
                                <div className="text-sm text-gray-600 mt-1">
                                  Voo {baggage.flightNumber} •{" "}
                                  {baggage.departureDate}
                                </div>
                                <div className="flex items-center mt-2">
                                  <MapPin
                                    size={16}
                                    className="mr-1 text-gray-400"
                                  />
                                  <span>
                                    {baggage.origin} → {baggage.destination}
                                  </span>
                                </div>
                              </div>
                              <Button
                                variant="outline"
                                className="mt-4 md:mt-0 flex items-center gap-2"
                              >
                                Ver Detalhes
                                <ArrowRight size={16} />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Luggage className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                        <h3 className="text-lg font-medium text-gray-900">
                          Nenhuma bagagem recente
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Você não tem bagagens rastreadas recentemente.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details">
            {selectedBaggage && (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Detalhes da Bagagem</CardTitle>
                      <p className="text-sm text-gray-500 mt-1">
                        Número de Rastreamento: {selectedBaggage.trackingNumber}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveTab("search")}
                    >
                      Voltar
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                        <div>
                          <div className="flex items-center">
                            <span className="font-bold text-lg mr-2">
                              Voo {selectedBaggage.flightNumber}
                            </span>
                            {getStatusBadge(selectedBaggage.status)}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            {selectedBaggage.departureDate}
                          </div>
                          <div className="flex items-center mt-2">
                            <MapPin size={16} className="mr-1 text-gray-400" />
                            <span>
                              {selectedBaggage.origin} →{" "}
                              {selectedBaggage.destination}
                            </span>
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0 text-right">
                          <div className="text-sm text-gray-600">
                            Última Atualização
                          </div>
                          <div className="font-medium">
                            {formatDate(selectedBaggage.lastUpdated)}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h3 className="text-lg font-medium mb-4">Status Atual</h3>
                      <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                        <div className="mr-4">
                          {getStatusIcon(selectedBaggage.status)}
                        </div>
                        <div>
                          <div className="font-medium">
                            {selectedBaggage.status === "checked-in"
                              ? "Bagagem Despachada"
                              : selectedBaggage.status === "loaded"
                                ? "Bagagem Carregada na Aeronave"
                                : selectedBaggage.status === "in-transit"
                                  ? "Bagagem em Trânsito"
                                  : selectedBaggage.status === "unloaded"
                                    ? "Bagagem Descarregada da Aeronave"
                                    : selectedBaggage.status === "claim-area"
                                      ? "Bagagem na Esteira de Retirada"
                                      : selectedBaggage.status === "delivered"
                                        ? "Bagagem Entregue"
                                        : "Bagagem com Atraso"}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            {selectedBaggage.location}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h3 className="text-lg font-medium mb-4">
                        Histórico de Rastreamento
                      </h3>
                      <div className="relative">
                        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                        <div className="space-y-8 relative">
                          {selectedBaggage.history.map((event, index) => (
                            <div key={index} className="flex">
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white border-2 border-blue-500 flex items-center justify-center z-10 animate-pulse">
                                {event.status === "checked-in" ? (
                                  <Luggage className="h-4 w-4 text-blue-500" />
                                ) : event.status === "loaded" ? (
                                  <Plane className="h-4 w-4 text-blue-500" />
                                ) : event.status === "in-transit" ? (
                                  <Plane className="h-4 w-4 text-blue-500" />
                                ) : event.status === "unloaded" ? (
                                  <Luggage className="h-4 w-4 text-blue-500" />
                                ) : event.status === "claim-area" ? (
                                  <LocateFixed className="h-4 w-4 text-blue-500" />
                                ) : event.status === "delivered" ? (
                                  <CheckCircle className="h-4 w-4 text-blue-500" />
                                ) : (
                                  <AlertCircle className="h-4 w-4 text-blue-500" />
                                )}
                              </div>
                              <div className="ml-4 flex-1">
                                <div className="font-medium">
                                  {event.status === "checked-in"
                                    ? "Bagagem Despachada"
                                    : event.status === "loaded"
                                      ? "Bagagem Carregada na Aeronave"
                                      : event.status === "in-transit"
                                        ? "Bagagem em Trânsito"
                                        : event.status === "unloaded"
                                          ? "Bagagem Descarregada da Aeronave"
                                          : event.status === "claim-area"
                                            ? "Bagagem na Esteira de Retirada"
                                            : event.status === "delivered"
                                              ? "Bagagem Entregue"
                                              : "Bagagem com Atraso"}
                                </div>
                                <div className="text-sm text-gray-600 mt-1">
                                  {event.location} •{" "}
                                  {formatDate(event.timestamp)}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                      <Button variant="outline">Reportar Problema</Button>
                      <Button>Compartilhar Rastreamento</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BaggageTracking;
