import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Plane,
  Calendar,
  Luggage,
  Bell,
  User,
  CreditCard,
  Gift,
  Clock,
  Search,
  MapPin,
  ChevronRight,
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
  status: "scheduled" | "completed" | "cancelled" | "delayed";
}

interface PortalClienteProps {
  userName?: string;
  userPoints?: number;
  upcomingFlights?: Flight[];
  pastFlights?: Flight[];
}

const PortalCliente = ({
  userName = "Carlos Mendoza",
  userPoints = 12450,
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
  pastFlights = [
    {
      id: "3",
      flightNumber: "LA9012",
      origin: "Bogotá (BOG)",
      destination: "Santiago (SCL)",
      departureDate: "2023-11-05",
      departureTime: "10:20",
      arrivalDate: "2023-11-05",
      arrivalTime: "14:45",
      status: "completed",
    },
    {
      id: "4",
      flightNumber: "LA3456",
      origin: "Santiago (SCL)",
      destination: "Buenos Aires (EZE)",
      departureDate: "2023-10-18",
      departureTime: "07:30",
      arrivalDate: "2023-10-18",
      arrivalTime: "09:45",
      status: "completed",
    },
    {
      id: "5",
      flightNumber: "LA7890",
      origin: "Buenos Aires (EZE)",
      destination: "Santiago (SCL)",
      departureDate: "2023-10-25",
      departureTime: "16:15",
      arrivalDate: "2023-10-25",
      arrivalTime: "18:30",
      status: "completed",
    },
  ],
}: PortalClienteProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusBadge = (status: Flight["status"]) => {
    switch (status) {
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-800">Agendado</Badge>;
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Concluído</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Cancelado</Badge>;
      case "delayed":
        return <Badge className="bg-amber-100 text-amber-800">Atrasado</Badge>;
      default:
        return <Badge>Desconhecido</Badge>;
    }
  };

  const filteredUpcomingFlights = upcomingFlights.filter(
    (flight) =>
      flight.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.destination.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredPastFlights = pastFlights.filter(
    (flight) =>
      flight.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.destination.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Portal do Cliente
            </h1>
            <p className="text-gray-600">Bem-vindo de volta, {userName}</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Bell size={16} />
              Notificações
            </Button>
            <Button className="flex items-center gap-2">
              <Plane size={16} />
              Reservar Voo
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Próximo Voo
              </CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingFlights.length > 0 ? (
                <div>
                  <div className="text-lg font-bold">
                    {upcomingFlights[0].flightNumber}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {upcomingFlights[0].departureDate}
                  </div>
                  <div className="flex items-center mt-2 text-sm">
                    <MapPin size={14} className="mr-1 text-gray-400" />
                    {upcomingFlights[0].origin} →{" "}
                    {upcomingFlights[0].destination}
                  </div>
                </div>
              ) : (
                <div className="text-gray-500">Nenhum voo agendado</div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Pontos LATAM Pass
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold animate-slide-in-right">
                {userPoints.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                pontos disponíveis
              </div>
              <Button variant="link" className="text-blue-600 p-0 mt-2 h-auto">
                Ver detalhes
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Check-in Online
              </CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingFlights.length > 0 ? (
                <div>
                  <div className="text-sm text-gray-600">
                    Disponível para seu próximo voo
                  </div>
                  <Button className="w-full mt-2">Fazer Check-in</Button>
                </div>
              ) : (
                <div className="text-gray-500">Nenhum voo elegível</div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Rastreamento de Bagagem
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-600">
                Acompanhe sua bagagem em tempo real
              </div>
              <Button variant="outline" className="w-full mt-2">
                Rastrear Bagagem
              </Button>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <User size={16} />
              Visão Geral
            </TabsTrigger>
            <TabsTrigger value="flights" className="flex items-center gap-2">
              <Plane size={16} />
              Meus Voos
            </TabsTrigger>
            <TabsTrigger value="points" className="flex items-center gap-2">
              <Gift size={16} />
              Programa de Pontos
            </TabsTrigger>
            <TabsTrigger
              value="preferences"
              className="flex items-center gap-2"
            >
              <CreditCard size={16} />
              Preferências
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Próximos Voos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {upcomingFlights.length > 0 ? (
                      <div className="space-y-4">
                        {upcomingFlights.map((flight) => (
                          <div
                            key={flight.id}
                            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center">
                                  <span className="font-bold text-lg mr-2">
                                    {flight.flightNumber}
                                  </span>
                                  {getStatusBadge(flight.status)}
                                </div>
                                <div className="text-sm text-gray-600 mt-1">
                                  {flight.departureDate} •{" "}
                                  {flight.departureTime} - {flight.arrivalTime}
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
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  Detalhes
                                </Button>
                                <Button size="sm">Check-in</Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Plane className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                        <h3 className="text-lg font-medium text-gray-900">
                          Nenhum voo agendado
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Você não tem voos agendados no momento.
                        </p>
                        <Button className="mt-4">Reservar um Voo</Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-xl">Meu Perfil</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg mr-4">
                          {userName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <div className="font-medium">{userName}</div>
                          <div className="text-sm text-gray-500">
                            Membro desde 2020
                          </div>
                        </div>
                      </div>
                      <div className="pt-4 border-t">
                        <div className="text-sm font-medium text-gray-500 mb-2">
                          Informações de Contato
                        </div>
                        <div className="text-sm">carlos.mendoza@email.com</div>
                        <div className="text-sm">+55 11 98765-4321</div>
                      </div>
                      <Button variant="outline" className="w-full">
                        Editar Perfil
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Ofertas Especiais</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4 bg-blue-50">
                        <div className="font-medium">Desconto de 20%</div>
                        <div className="text-sm text-gray-600 mt-1">
                          Em voos para destinos na América do Sul
                        </div>
                        <Button
                          variant="link"
                          className="text-blue-600 p-0 mt-2 h-auto"
                        >
                          Ver oferta
                        </Button>
                      </div>
                      <div className="border rounded-lg p-4 bg-green-50">
                        <div className="font-medium">Pontos em dobro</div>
                        <div className="text-sm text-gray-600 mt-1">
                          Em reservas feitas até 31/12/2023
                        </div>
                        <Button
                          variant="link"
                          className="text-blue-600 p-0 mt-2 h-auto"
                        >
                          Ver oferta
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="flights">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">Meus Voos</CardTitle>
                  <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Buscar voos..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="upcoming" className="w-full">
                  <TabsList className="w-full grid grid-cols-2 mb-6">
                    <TabsTrigger value="upcoming">
                      Próximos ({filteredUpcomingFlights.length})
                    </TabsTrigger>
                    <TabsTrigger value="past">
                      Histórico ({filteredPastFlights.length})
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="upcoming">
                    {filteredUpcomingFlights.length > 0 ? (
                      <div className="space-y-4">
                        {filteredUpcomingFlights.map((flight) => (
                          <div
                            key={flight.id}
                            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
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
                                  {flight.departureDate} •{" "}
                                  {flight.departureTime} - {flight.arrivalTime}
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
                              <div className="flex space-x-2 mt-4 md:mt-0">
                                <Button variant="outline" size="sm">
                                  Detalhes
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Luggage size={16} className="mr-1" />
                                  Bagagem
                                </Button>
                                <Button size="sm">Check-in</Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Calendar className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                        <h3 className="text-lg font-medium text-gray-900">
                          Nenhum voo encontrado
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Você não tem voos agendados que correspondam à sua
                          busca.
                        </p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="past">
                    {filteredPastFlights.length > 0 ? (
                      <div className="space-y-4">
                        {filteredPastFlights.map((flight) => (
                          <div
                            key={flight.id}
                            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
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
                                  {flight.departureDate} •{" "}
                                  {flight.departureTime} - {flight.arrivalTime}
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
                              <div className="flex space-x-2 mt-4 md:mt-0">
                                <Button variant="outline" size="sm">
                                  Detalhes
                                </Button>
                                <Button variant="outline" size="sm">
                                  Recibo
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Clock className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                        <h3 className="text-lg font-medium text-gray-900">
                          Nenhum voo encontrado
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Você não tem voos passados que correspondam à sua
                          busca.
                        </p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="points">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">LATAM Pass</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gradient-to-r from-blue-600 to-red-600 rounded-lg p-6 text-white mb-6 animate-pulse hover-lift">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-sm opacity-80">
                            Saldo de Pontos
                          </div>
                          <div className="text-3xl font-bold mt-1 animate-slide-in-right">
                            {userPoints.toLocaleString()}
                          </div>
                          <div className="text-sm opacity-80 mt-1">
                            Categoria: Gold
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm opacity-80">Validade</div>
                          <div className="font-medium mt-1">31/12/2024</div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <Button className="w-full">Resgatar Pontos</Button>
                      <Button variant="outline" className="w-full">
                        Transferir Pontos
                      </Button>
                    </div>

                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-gray-50 px-4 py-3 font-medium">
                        Histórico de Transações
                      </div>
                      <div className="divide-y">
                        <div className="px-4 py-3 flex justify-between items-center">
                          <div>
                            <div className="font-medium">Voo LA9012</div>
                            <div className="text-sm text-gray-500">
                              05/11/2023
                            </div>
                          </div>
                          <div className="text-green-600 font-medium">
                            +1,250 pts
                          </div>
                        </div>
                        <div className="px-4 py-3 flex justify-between items-center">
                          <div>
                            <div className="font-medium">Voo LA3456</div>
                            <div className="text-sm text-gray-500">
                              18/10/2023
                            </div>
                          </div>
                          <div className="text-green-600 font-medium">
                            +850 pts
                          </div>
                        </div>
                        <div className="px-4 py-3 flex justify-between items-center">
                          <div>
                            <div className="font-medium">Resgate - Upgrade</div>
                            <div className="text-sm text-gray-500">
                              10/10/2023
                            </div>
                          </div>
                          <div className="text-red-600 font-medium">
                            -2,000 pts
                          </div>
                        </div>
                        <div className="px-4 py-3 flex justify-between items-center">
                          <div>
                            <div className="font-medium">Voo LA7890</div>
                            <div className="text-sm text-gray-500">
                              25/09/2023
                            </div>
                          </div>
                          <div className="text-green-600 font-medium">
                            +1,100 pts
                          </div>
                        </div>
                      </div>
                      <div className="px-4 py-3 bg-gray-50 text-center">
                        <Button variant="link" className="text-blue-600">
                          Ver Histórico Completo
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-xl">
                      Ofertas com Pontos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="font-medium">Passagem para Miami</div>
                        <div className="text-sm text-gray-600 mt-1">
                          A partir de 25.000 pontos
                        </div>
                        <Button
                          variant="link"
                          className="text-blue-600 p-0 mt-2 h-auto flex items-center"
                        >
                          Ver detalhes
                          <ChevronRight size={14} className="ml-1" />
                        </Button>
                      </div>
                      <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="font-medium">
                          Upgrade para Classe Executiva
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          A partir de 10.000 pontos
                        </div>
                        <Button
                          variant="link"
                          className="text-blue-600 p-0 mt-2 h-auto flex items-center"
                        >
                          Ver detalhes
                          <ChevronRight size={14} className="ml-1" />
                        </Button>
                      </div>
                      <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="font-medium">Produtos Exclusivos</div>
                        <div className="text-sm text-gray-600 mt-1">
                          Troque seus pontos por produtos
                        </div>
                        <Button
                          variant="link"
                          className="text-blue-600 p-0 mt-2 h-auto flex items-center"
                        >
                          Ver detalhes
                          <ChevronRight size={14} className="ml-1" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">
                      Dicas para Acumular
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="bg-blue-100 rounded-full p-2 mr-3">
                          <CreditCard className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium">
                            Cartão de Crédito LATAM
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            Acumule pontos em todas as suas compras
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-blue-100 rounded-full p-2 mr-3">
                          <Plane className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium">Voe mais</div>
                          <div className="text-sm text-gray-600 mt-1">
                            Ganhe pontos em cada voo realizado
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-blue-100 rounded-full p-2 mr-3">
                          <Gift className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium">Parceiros</div>
                          <div className="text-sm text-gray-600 mt-1">
                            Acumule pontos com nossos parceiros
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Preferências</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">
                      Informações Pessoais
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Nome Completo
                        </label>
                        <Input value={userName} disabled />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <Input value="carlos.mendoza@email.com" disabled />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Telefone</label>
                        <Input value="+55 11 98765-4321" disabled />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Data de Nascimento
                        </label>
                        <Input value="15/05/1985" disabled />
                      </div>
                    </div>
                    <Button className="mt-4">Editar Informações</Button>
                  </div>

                  <div className="pt-6 border-t">
                    <h3 className="text-lg font-medium mb-4">
                      Preferências de Viagem
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Assento Preferido</div>
                          <div className="text-sm text-gray-600">Janela</div>
                        </div>
                        <Button variant="outline" size="sm">
                          Alterar
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Refeição Especial</div>
                          <div className="text-sm text-gray-600">
                            Vegetariana
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Alterar
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Idioma Preferido</div>
                          <div className="text-sm text-gray-600">Português</div>
                        </div>
                        <Button variant="outline" size="sm">
                          Alterar
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t">
                    <h3 className="text-lg font-medium mb-4">Notificações</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Atualizações de Voo</div>
                          <div className="text-sm text-gray-600">
                            Receba notificações sobre alterações no seu voo
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Ativado
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Ofertas Especiais</div>
                          <div className="text-sm text-gray-600">
                            Receba ofertas exclusivas e promoções
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Ativado
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">
                            Programa de Fidelidade
                          </div>
                          <div className="text-sm text-gray-600">
                            Atualizações sobre seus pontos e benefícios
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Ativado
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PortalCliente;
