import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Search, Filter, Plus, Building2, Phone, Mail, Globe, MapPin, Package, AlertCircle, CheckCircle, Clock, Calendar, Tool, Box, ArrowUp, ArrowDown } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const SupplierManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const suppliers = [
    {
      id: "SUP001",
      name: "AeroParts Inc.",
      category: "engine",
      status: "active",
      contact: {
        name: "John Smith",
        position: "Gerente de Vendas",
        email: "john@aeroparts.com",
        phone: "+1 (555) 123-4567",
      },
      address: {
        street: "123 Aviation Ave",
        city: "Miami",
        state: "FL",
        country: "USA",
        zip: "33139",
      },
      website: "www.aeroparts.com",
      rating: 4.8,
      totalOrders: 156,
      activeOrders: 3,
      lastOrder: new Date(2024, 2, 15),
      nextOrder: new Date(2024, 3, 1),
      totalSpent: 250000,
      paymentTerms: "Net 30",
      leadTime: "5-7 days",
      certifications: ["ISO 9001", "AS9100"],
    },
    {
      id: "SUP002",
      name: "BrakeTech Ltd.",
      category: "landing_gear",
      status: "active",
      contact: {
        name: "Sarah Johnson",
        position: "Diretora de Operações",
        email: "sarah@braketech.com",
        phone: "+1 (555) 234-5678",
      },
      address: {
        street: "456 Aerospace Blvd",
        city: "Seattle",
        state: "WA",
        country: "USA",
        zip: "98101",
      },
      website: "www.braketech.com",
      rating: 4.5,
      totalOrders: 89,
      activeOrders: 2,
      lastOrder: new Date(2024, 2, 10),
      nextOrder: new Date(2024, 2, 25),
      totalSpent: 180000,
      paymentTerms: "Net 45",
      leadTime: "7-10 days",
      certifications: ["ISO 9001", "AS9100", "NADCAP"],
    },
    {
      id: "SUP003",
      name: "Landing Systems Co.",
      category: "landing_gear",
      status: "inactive",
      contact: {
        name: "Mike Wilson",
        position: "Vice-Presidente",
        email: "mike@landingsys.com",
        phone: "+1 (555) 345-6789",
      },
      address: {
        street: "789 Aviation Way",
        city: "Dallas",
        state: "TX",
        country: "USA",
        zip: "75201",
      },
      website: "www.landingsys.com",
      rating: 4.2,
      totalOrders: 45,
      activeOrders: 0,
      lastOrder: new Date(2024, 1, 20),
      nextOrder: null,
      totalSpent: 95000,
      paymentTerms: "Net 60",
      leadTime: "10-14 days",
      certifications: ["ISO 9001"],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-600 bg-green-50";
      case "inactive":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4" />;
      case "inactive":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "engine":
        return "text-blue-600 bg-blue-50";
      case "landing_gear":
        return "text-purple-600 bg-purple-50";
      case "avionics":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Gestão de Fornecedores</h1>
        <p className="text-gray-500">Gerencie fornecedores e parceiros</p>
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
                      placeholder="Pesquisar fornecedores..."
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
                    </SelectContent>
                  </Select>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="engine">Motor</SelectItem>
                      <SelectItem value="landing_gear">Trem de Pouso</SelectItem>
                      <SelectItem value="avionics">Aviônicos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Fornecedor
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Contato</TableHead>
                    <TableHead>Localização</TableHead>
                    <TableHead>Avaliação</TableHead>
                    <TableHead>Pedidos</TableHead>
                    <TableHead>Total Gasto</TableHead>
                    <TableHead>Próximo Pedido</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {suppliers.map((supplier) => (
                    <TableRow key={supplier.id}>
                      <TableCell className="font-medium">{supplier.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Building2 className="h-4 w-4 mr-2 text-gray-500" />
                          {supplier.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                            supplier.category
                          )}`}
                        >
                          <Tool className="h-4 w-4 mr-1" />
                          <span className="capitalize">
                            {supplier.category === "engine" ? "Motor" : supplier.category === "landing_gear" ? "Trem de Pouso" : "Aviônicos"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            supplier.status
                          )}`}
                        >
                          {getStatusIcon(supplier.status)}
                          <span className="ml-1 capitalize">
                            {supplier.status === "active" ? "Ativo" : "Inativo"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="text-sm">{supplier.contact.name}</div>
                          <div className="text-sm text-gray-500">{supplier.contact.position}</div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Mail className="h-3 w-3 mr-1" />
                            {supplier.contact.email}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Phone className="h-3 w-3 mr-1" />
                            {supplier.contact.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="flex items-center text-sm">
                            <MapPin className="h-3 w-3 mr-1" />
                            {supplier.address.city}, {supplier.address.state}
                          </div>
                          <div className="text-sm text-gray-500">
                            {supplier.address.country}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className="font-medium">{supplier.rating}</span>
                          <span className="text-sm text-gray-500 ml-1">/ 5.0</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="text-sm">
                            {supplier.activeOrders} ativos
                          </div>
                          <div className="text-sm text-gray-500">
                            {supplier.totalOrders} total
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className="font-medium">
                            R$ {supplier.totalSpent.toLocaleString()}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Calendar className="h-3 w-3 mr-1" />
                          {supplier.nextOrder
                            ? format(supplier.nextOrder, "dd/MM/yyyy", { locale: ptBR })
                            : "N/A"}
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
                  <span className="text-gray-500">Total de Fornecedores</span>
                  <span className="font-semibold">{suppliers.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Ativos</span>
                  <span className="font-semibold text-green-600">
                    {suppliers.filter((s) => s.status === "active").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Inativos</span>
                  <span className="font-semibold text-red-600">
                    {suppliers.filter((s) => s.status === "inactive").length}
                  </span>
                </div>
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between">
                  <span className="text-gray-500">Motor</span>
                  <span className="font-semibold text-blue-600">
                    {suppliers.filter((s) => s.category === "engine").length}
                  </span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-500">Trem de Pouso</span>
                  <span className="font-semibold text-purple-600">
                    {suppliers.filter((s) => s.category === "landing_gear").length}
                  </span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-500">Aviônicos</span>
                  <span className="font-semibold text-green-600">
                    {suppliers.filter((s) => s.category === "avionics").length}
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
                  <Clock className="h-4 w-4 text-blue-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium">Próximos Pedidos</p>
                    <p className="text-xs text-gray-500">
                      2 pedidos pendentes para esta semana
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <AlertCircle className="h-4 w-4 text-yellow-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium">Avaliações Baixas</p>
                    <p className="text-xs text-gray-500">
                      1 fornecedor com avaliação abaixo de 4.0
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

export default SupplierManagement; 