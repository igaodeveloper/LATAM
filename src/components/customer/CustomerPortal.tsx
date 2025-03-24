import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Search, Filter, Plus, User, Mail, Phone, Calendar, Plane, Tag, Star, CreditCard, Gift } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const CustomerPortal = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [tierFilter, setTierFilter] = useState("all");

  const customers = [
    {
      id: "CUS001",
      name: "João Silva",
      email: "joao.silva@email.com",
      phone: "(11) 99999-9999",
      status: "active",
      tier: "gold",
      points: 25000,
      totalFlights: 48,
      lastFlight: new Date(2024, 2, 10),
      nextFlight: new Date(2024, 3, 15),
      preferences: {
        seat: "window",
        meal: "vegetarian",
        newsletter: true,
      },
      paymentMethods: [
        {
          type: "credit",
          last4: "1234",
          expiry: "12/25",
        },
      ],
    },
    {
      id: "CUS002",
      name: "Maria Santos",
      email: "maria.santos@email.com",
      phone: "(11) 98888-8888",
      status: "active",
      tier: "platinum",
      points: 45000,
      totalFlights: 87,
      lastFlight: new Date(2024, 2, 5),
      nextFlight: new Date(2024, 3, 20),
      preferences: {
        seat: "aisle",
        meal: "regular",
        newsletter: false,
      },
      paymentMethods: [
        {
          type: "credit",
          last4: "5678",
          expiry: "06/26",
        },
      ],
    },
    {
      id: "CUS003",
      name: "Pedro Oliveira",
      email: "pedro.oliveira@email.com",
      phone: "(11) 97777-7777",
      status: "inactive",
      tier: "silver",
      points: 12000,
      totalFlights: 12,
      lastFlight: new Date(2024, 1, 15),
      nextFlight: null,
      preferences: {
        seat: "no-preference",
        meal: "kosher",
        newsletter: true,
      },
      paymentMethods: [],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-600 bg-green-50";
      case "inactive":
        return "text-red-600 bg-red-50";
      case "pending":
        return "text-yellow-600 bg-yellow-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "platinum":
        return "text-purple-600 bg-purple-50";
      case "gold":
        return "text-yellow-600 bg-yellow-50";
      case "silver":
        return "text-gray-600 bg-gray-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Portal do Cliente</h1>
        <p className="text-gray-500">Gerencie contas e serviços de clientes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Pesquisar clientes..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-[300px]"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="active">Ativos</SelectItem>
                      <SelectItem value="inactive">Inativos</SelectItem>
                      <SelectItem value="pending">Pendentes</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={tierFilter} onValueChange={setTierFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Tier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="platinum">Platinum</SelectItem>
                      <SelectItem value="gold">Gold</SelectItem>
                      <SelectItem value="silver">Silver</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Cliente
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Contato</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead>Pontos</TableHead>
                    <TableHead>Voos</TableHead>
                    <TableHead>Último Voo</TableHead>
                    <TableHead>Próximo Voo</TableHead>
                    <TableHead>Preferências</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">{customer.id}</TableCell>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="flex items-center text-sm">
                            <Mail className="h-3 w-3 mr-1" />
                            {customer.email}
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="h-3 w-3 mr-1" />
                            {customer.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            customer.status
                          )}`}
                        >
                          <User className="h-4 w-4" />
                          <span className="ml-1">
                            {customer.status === "active" ? "Ativo" : "Inativo"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTierColor(
                            customer.tier
                          )}`}
                        >
                          <Star className="h-4 w-4" />
                          <span className="ml-1 capitalize">{customer.tier}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Gift className="h-4 w-4 mr-1 text-blue-600" />
                          {customer.points.toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell>{customer.totalFlights}</TableCell>
                      <TableCell>
                        {customer.lastFlight
                          ? format(customer.lastFlight, "dd/MM/yyyy", { locale: ptBR })
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {customer.nextFlight
                          ? format(customer.nextFlight, "dd/MM/yyyy", { locale: ptBR })
                          : "-"}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600">
                            <Tag className="h-3 w-3 mr-1" />
                            {customer.preferences.seat}
                          </div>
                          <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-600">
                            <Tag className="h-3 w-3 mr-1" />
                            {customer.preferences.meal}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          Detalhes
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Resumo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Total de Clientes</span>
                  <span className="font-semibold">{customers.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Ativos</span>
                  <span className="font-semibold text-green-600">
                    {customers.filter((c) => c.status === "active").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Inativos</span>
                  <span className="font-semibold text-red-600">
                    {customers.filter((c) => c.status === "inactive").length}
                  </span>
                </div>
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between">
                  <span className="text-gray-500">Platinum</span>
                  <span className="font-semibold text-purple-600">
                    {customers.filter((c) => c.tier === "platinum").length}
                  </span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-500">Gold</span>
                  <span className="font-semibold text-yellow-600">
                    {customers.filter((c) => c.tier === "gold").length}
                  </span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-500">Silver</span>
                  <span className="font-semibold text-gray-600">
                    {customers.filter((c) => c.tier === "silver").length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Star className="h-4 w-4 text-yellow-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium">Tier Upgrade</p>
                    <p className="text-xs text-gray-500">
                      3 clientes próximos do upgrade
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Plane className="h-4 w-4 text-blue-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium">Voos Próximos</p>
                    <p className="text-xs text-gray-500">
                      5 clientes com voos esta semana
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomerPortal; 