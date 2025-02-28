import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plane,
  Calendar,
  Search,
  Luggage,
  CreditCard,
  QrCode,
  Printer,
  Mail,
  Check,
  X,
  AlertTriangle,
  Info,
  MapPin,
  Clock,
} from "lucide-react";

interface Flight {
  id: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureDate: string;
  departureTime: string;
  arrivalDate: string;
  arrivalTime: string;
  status: "scheduled" | "boarding" | "delayed" | "cancelled";
  gate?: string;
}

interface Passenger {
  id: string;
  name: string;
  documentType: "passport" | "id";
  documentNumber: string;
  seatPreference?: "window" | "aisle" | "middle" | "no-preference";
  mealPreference?: string;
  specialAssistance?: boolean;
}

interface CheckinOnlineProps {
  upcomingFlights?: Flight[];
  passenger?: Passenger;
}

const CheckinOnline = ({
  upcomingFlights = [
    {
      id: "1",
      flightNumber: "LA1234",
      origin: "Santiago (SCL)",
      destination: "Lima (LIM)",
      departureDate: "2023-12-15",
      departureTime: "08:30",
      arrivalDate: "2023-12-15",
      arrivalTime: "10:45",
      status: "scheduled",
      gate: "A12",
    },
    {
      id: "2",
      flightNumber: "LA5678",
      origin: "Lima (LIM)",
      destination: "Bogotá (BOG)",
      departureDate: "2023-12-22",
      departureTime: "14:15",
      arrivalDate: "2023-12-22",
      arrivalTime: "16:30",
      status: "scheduled",
    },
  ],
  passenger = {
    id: "1",
    name: "Carlos Mendoza",
    documentType: "passport",
    documentNumber: "AB123456",
    seatPreference: "window",
  },
}: CheckinOnlineProps) => {
  const [activeTab, setActiveTab] = useState("search");
  const [searchMethod, setSearchMethod] = useState("reservation");
  const [reservationCode, setReservationCode] = useState("");
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [selectedSeat, setSelectedSeat] = useState("");
  const [extraBaggage, setExtraBaggage] = useState(false);
  const [showBoardingPass, setShowBoardingPass] = useState(false);
  const [checkinComplete, setCheckinComplete] = useState(false);

  const handleSearch = () => {
    // In a real app, this would search for the reservation
    // For demo purposes, we'll just move to the next step
    setActiveTab("select-flight");
  };

  const handleSelectFlight = (flight: Flight) => {
    setSelectedFlight(flight);
    setActiveTab("seat-selection");
  };

  const handleSeatSelection = (seat: string) => {
    setSelectedSeat(seat);
  };

  const handleCompleteCheckin = () => {
    setCheckinComplete(true);
    setActiveTab("confirmation");
  };

  const handleViewBoardingPass = () => {
    setShowBoardingPass(true);
  };

  const getStatusBadge = (status: Flight["status"]) => {
    switch (status) {
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-800">Agendado</Badge>;
      case "boarding":
        return <Badge className="bg-green-100 text-green-800">Embarque</Badge>;
      case "delayed":
        return <Badge className="bg-amber-100 text-amber-800">Atrasado</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Cancelado</Badge>;
      default:
        return <Badge>Desconhecido</Badge>;
    }
  };

  // Mock seat map data
  const seatMap = {
    rows: 30,
    columns: ["A", "B", "C", "D", "E", "F"],
    unavailableSeats: ["5A", "5B", "10C", "10D", "15E", "15F", "20A", "20F"],
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Check-in Online</h1>
          <p className="text-gray-600">
            Faça seu check-in online e evite filas no aeroporto
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger
              value="search"
              disabled={activeTab !== "search" && !checkinComplete}
              className="flex items-center gap-2"
            >
              <Search size={16} />
              Buscar Reserva
            </TabsTrigger>
            <TabsTrigger
              value="select-flight"
              disabled={
                activeTab === "search" ||
                activeTab === "confirmation" ||
                checkinComplete
              }
              className="flex items-center gap-2"
            >
              <Plane size={16} />
              Selecionar Voo
            </TabsTrigger>
            <TabsTrigger
              value="seat-selection"
              disabled={
                activeTab === "search" ||
                activeTab === "select-flight" ||
                activeTab === "confirmation" ||
                checkinComplete
              }
              className="flex items-center gap-2"
            >
              <MapPin size={16} />
              Selecionar Assento
            </TabsTrigger>
            <TabsTrigger
              value="confirmation"
              disabled={
                activeTab === "search" ||
                activeTab === "select-flight" ||
                activeTab === "seat-selection" ||
                !checkinComplete
              }
              className="flex items-center gap-2"
            >
              <Check size={16} />
              Confirmação
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search">
            <Card>
              <CardHeader>
                <CardTitle>Buscar sua Reserva</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex space-x-4">
                      <Button
                        variant={
                          searchMethod === "reservation" ? "default" : "outline"
                        }
                        onClick={() => setSearchMethod("reservation")}
                        className="flex-1"
                      >
                        Código de Reserva
                      </Button>
                      <Button
                        variant={
                          searchMethod === "ticket" ? "default" : "outline"
                        }
                        onClick={() => setSearchMethod("ticket")}
                        className="flex-1"
                      >
                        Número do Bilhete
                      </Button>
                    </div>

                    {searchMethod === "reservation" ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="reservationCode">
                              Código de Reserva
                            </Label>
                            <Input
                              id="reservationCode"
                              placeholder="Ex: ABC123"
                              value={reservationCode}
                              onChange={(e) =>
                                setReservationCode(e.target.value)
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Sobrenome</Label>
                            <Input id="lastName" placeholder="Seu sobrenome" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="ticketNumber">
                              Número do Bilhete
                            </Label>
                            <Input
                              id="ticketNumber"
                              placeholder="Ex: 0741234567890"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Sobrenome</Label>
                            <Input id="lastName" placeholder="Seu sobrenome" />
                          </div>
                        </div>
                      </div>
                    )}

                    <Button
                      onClick={handleSearch}
                      className="w-full"
                      disabled={reservationCode.length < 3}
                    >
                      Buscar
                    </Button>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-4">
                      Informações Importantes
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <Info className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                        <p className="text-sm text-gray-600">
                          O check-in online está disponível de 48 horas até 2
                          horas antes do voo.
                        </p>
                      </div>
                      <div className="flex items-start">
                        <Info className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                        <p className="text-sm text-gray-600">
                          Tenha seu documento de identificação em mãos para o
                          embarque.
                        </p>
                      </div>
                      <div className="flex items-start">
                        <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                        <p className="text-sm text-gray-600">
                          Chegue ao aeroporto com pelo menos 2 horas de
                          antecedência para voos nacionais e 3 horas para voos
                          internacionais.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="select-flight">
            <Card>
              <CardHeader>
                <CardTitle>Selecione seu Voo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingFlights.length > 0 ? (
                    upcomingFlights.map((flight) => (
                      <div
                        key={flight.id}
                        className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => handleSelectFlight(flight)}
                      >
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                          <div>
                            <div className="flex items-center">
                              <span className="font-bold text-lg mr-2">
                                {flight.flightNumber}
                              </span>
                              {getStatusBadge(flight.status)}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                              {flight.departureDate} • {flight.departureTime} -{" "}
                              {flight.arrivalTime}
                            </div>
                            <div className="flex items-center mt-2">
                              <MapPin
                                size={16}
                                className="mr-1 text-gray-400"
                              />
                              <span>
                                {flight.origin} → {flight.destination}
                              </span>
                            </div>
                          </div>
                          <Button className="mt-4 md:mt-0">Selecionar</Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                      <h3 className="text-lg font-medium text-gray-900">
                        Nenhum voo encontrado
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Não encontramos voos elegíveis para check-in com os
                        dados informados.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seat-selection">
            <Card>
              <CardHeader>
                <CardTitle>Selecione seu Assento</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedFlight && (
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                        <div>
                          <div className="flex items-center">
                            <span className="font-bold text-lg mr-2">
                              {selectedFlight.flightNumber}
                            </span>
                            {getStatusBadge(selectedFlight.status)}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            {selectedFlight.departureDate} •{" "}
                            {selectedFlight.departureTime} -{" "}
                            {selectedFlight.arrivalTime}
                          </div>
                          <div className="flex items-center mt-2">
                            <MapPin size={16} className="mr-1 text-gray-400" />
                            <span>
                              {selectedFlight.origin} →{" "}
                              {selectedFlight.destination}
                            </span>
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0 text-right">
                          <div className="text-sm text-gray-600">
                            Passageiro
                          </div>
                          <div className="font-medium">{passenger.name}</div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-2">
                        <div className="border rounded-lg p-4">
                          <h3 className="text-lg font-medium mb-4">
                            Mapa de Assentos
                          </h3>
                          <div className="bg-gray-100 p-4 rounded-lg mb-4">
                            <div className="flex justify-center mb-4">
                              <div className="bg-blue-500 text-white px-6 py-2 rounded-t-lg">
                                Cabine
                              </div>
                            </div>

                            <div className="grid grid-cols-6 gap-2 max-h-[400px] overflow-y-auto">
                              {Array.from({ length: seatMap.rows }).map(
                                (_, rowIndex) => (
                                  <React.Fragment key={rowIndex}>
                                    {seatMap.columns.map((col, colIndex) => {
                                      const seatNumber = `${rowIndex + 1}${col}`;
                                      const isUnavailable =
                                        seatMap.unavailableSeats.includes(
                                          seatNumber,
                                        );
                                      const isSelected =
                                        selectedSeat === seatNumber;

                                      return (
                                        <div
                                          key={`${rowIndex}-${colIndex}`}
                                          className={`
                                          ${colIndex === 2 ? "mr-4" : ""}
                                          ${colIndex === 3 ? "ml-4" : ""}
                                        `}
                                        >
                                          <button
                                            className={`w-10 h-10 rounded-md flex items-center justify-center text-sm ${isUnavailable ? "bg-gray-300 text-gray-500 cursor-not-allowed" : isSelected ? "bg-blue-500 text-white" : "bg-white border hover:bg-blue-100 cursor-pointer"}`}
                                            disabled={isUnavailable}
                                            onClick={() =>
                                              handleSeatSelection(seatNumber)
                                            }
                                          >
                                            {seatNumber}
                                          </button>
                                        </div>
                                      );
                                    })}
                                  </React.Fragment>
                                ),
                              )}
                            </div>

                            <div className="flex justify-center space-x-6 mt-6">
                              <div className="flex items-center">
                                <div className="w-4 h-4 bg-white border rounded mr-2"></div>
                                <span className="text-sm">Disponível</span>
                              </div>
                              <div className="flex items-center">
                                <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                                <span className="text-sm">Selecionado</span>
                              </div>
                              <div className="flex items-center">
                                <div className="w-4 h-4 bg-gray-300 rounded mr-2"></div>
                                <span className="text-sm">Ocupado</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="border rounded-lg p-4 mb-4">
                          <h3 className="text-lg font-medium mb-4">Resumo</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Voo:</span>
                              <span className="font-medium">
                                {selectedFlight.flightNumber}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Data:</span>
                              <span className="font-medium">
                                {selectedFlight.departureDate}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Horário:</span>
                              <span className="font-medium">
                                {selectedFlight.departureTime}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Assento:</span>
                              <span className="font-medium">
                                {selectedSeat || "Não selecionado"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="border rounded-lg p-4 mb-4">
                          <h3 className="text-lg font-medium mb-4">
                            Opções Adicionais
                          </h3>
                          <div className="space-y-4">
                            <div className="flex items-start space-x-2">
                              <Checkbox
                                id="extra-baggage"
                                checked={extraBaggage}
                                onCheckedChange={(checked) =>
                                  setExtraBaggage(checked as boolean)
                                }
                              />
                              <div className="grid gap-1.5">
                                <Label
                                  htmlFor="extra-baggage"
                                  className="font-medium"
                                >
                                  Bagagem Extra
                                </Label>
                                <p className="text-sm text-gray-500">
                                  Adicionar uma mala despachada de 23kg por $50
                                </p>
                              </div>
                            </div>

                            <div className="pt-4">
                              <Label
                                htmlFor="meal-preference"
                                className="font-medium"
                              >
                                Preferência de Refeição
                              </Label>
                              <Select defaultValue="regular">
                                <SelectTrigger className="mt-1">
                                  <SelectValue placeholder="Selecione uma opção" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="regular">
                                    Regular
                                  </SelectItem>
                                  <SelectItem value="vegetarian">
                                    Vegetariana
                                  </SelectItem>
                                  <SelectItem value="vegan">Vegana</SelectItem>
                                  <SelectItem value="kosher">Kosher</SelectItem>
                                  <SelectItem value="halal">Halal</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>

                        <Button
                          className="w-full"
                          disabled={!selectedSeat}
                          onClick={handleCompleteCheckin}
                        >
                          Concluir Check-in
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="confirmation">
            <Card>
              <CardHeader>
                <CardTitle>Check-in Concluído</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedFlight && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4 animate-zoom-in">
                        <Check className="h-8 w-8 text-green-600 animate-jello" />
                      </div>
                      <h2 className="text-2xl font-bold mb-2">
                        Check-in realizado com sucesso!
                      </h2>
                      <p className="text-gray-600">
                        Seu cartão de embarque está pronto. Você pode salvá-lo
                        ou imprimi-lo.
                      </p>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-lg">
                      <div className="flex flex-col md:flex-row justify-between items-center">
                        <div>
                          <div className="text-sm text-gray-600">Voo</div>
                          <div className="text-xl font-bold">
                            {selectedFlight.flightNumber}
                          </div>
                          <div className="text-sm text-gray-600 mt-2">
                            {selectedFlight.departureDate}
                          </div>
                        </div>

                        <div className="my-4 md:my-0">
                          <div className="flex items-center">
                            <div className="text-right mr-3">
                              <div className="font-bold">
                                {selectedFlight.origin}
                              </div>
                              <div className="text-sm text-gray-600">
                                {selectedFlight.departureTime}
                              </div>
                            </div>
                            <Plane className="h-5 w-5 mx-3 text-blue-500" />
                            <div>
                              <div className="font-bold">
                                {selectedFlight.destination}
                              </div>
                              <div className="text-sm text-gray-600">
                                {selectedFlight.arrivalTime}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="text-center">
                          <div className="text-sm text-gray-600">Assento</div>
                          <div className="text-xl font-bold">
                            {selectedSeat}
                          </div>
                          <div className="text-sm text-gray-600 mt-2">
                            {selectedFlight.gate
                              ? `Portão ${selectedFlight.gate}`
                              : ""}
                          </div>
                        </div>
                      </div>

                      <Separator className="my-4" />

                      <div className="flex flex-col md:flex-row justify-between items-center">
                        <div>
                          <div className="text-sm text-gray-600">
                            Passageiro
                          </div>
                          <div className="font-bold">{passenger.name}</div>
                          <div className="text-sm text-gray-600 mt-1">
                            {passenger.documentType === "passport"
                              ? "Passaporte"
                              : "Documento"}
                            : {passenger.documentNumber}
                          </div>
                        </div>

                        <Button
                          variant="outline"
                          className="mt-4 md:mt-0"
                          onClick={handleViewBoardingPass}
                        >
                          Ver Cartão de Embarque
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Button className="flex items-center justify-center gap-2">
                        <QrCode className="h-5 w-5" />
                        Salvar no Celular
                      </Button>
                      <Button
                        variant="outline"
                        className="flex items-center justify-center gap-2"
                      >
                        <Printer className="h-5 w-5" />
                        Imprimir
                      </Button>
                      <Button
                        variant="outline"
                        className="flex items-center justify-center gap-2"
                      >
                        <Mail className="h-5 w-5" />
                        Enviar por Email
                      </Button>
                    </div>

                    <div className="bg-amber-50 p-4 rounded-lg">
                      <div className="flex items-start">
                        <Clock className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">Lembrete Importante</p>
                          <p className="text-sm text-gray-600 mt-1">
                            Chegue ao aeroporto com pelo menos 2 horas de
                            antecedência. Não esqueça de levar seu documento de
                            identificação.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Dialog open={showBoardingPass} onOpenChange={setShowBoardingPass}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Cartão de Embarque</DialogTitle>
              <DialogDescription>
                Apresente este QR code no portão de embarque
              </DialogDescription>
            </DialogHeader>
            {selectedFlight && (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="bg-white p-4 rounded-lg border">
                    <img
                      src={`https://api.dicebear.com/7.x/identicon/svg?seed=${selectedFlight.flightNumber}-${selectedSeat}`}
                      alt="QR Code"
                      className="w-48 h-48"
                    />
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-sm text-gray-600">Voo</div>
                  <div className="text-xl font-bold">
                    {selectedFlight.flightNumber}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {selectedFlight.departureDate} •{" "}
                    {selectedFlight.departureTime}
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-sm text-gray-600">De</div>
                    <div className="font-bold">{selectedFlight.origin}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Assento</div>
                    <div className="font-bold">{selectedSeat}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Para</div>
                    <div className="font-bold">
                      {selectedFlight.destination}
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="text-center">
                  <div className="text-sm text-gray-600">Passageiro</div>
                  <div className="font-bold">{passenger.name}</div>
                </div>
              </div>
            )}
            <DialogFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setShowBoardingPass(false)}
              >
                Fechar
              </Button>
              <Button>
                <Printer className="h-4 w-4 mr-2" />
                Imprimir
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CheckinOnline;
