import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Search, Filter, Plus, Package, AlertCircle, CheckCircle, Clock, Calendar, Tool, Box, ArrowUp, ArrowDown } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const InventoryManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const inventory = [
    {
      id: "INV001",
      name: "Filtro de Óleo",
      partNumber: "OIL-123",
      category: "engine",
      status: "in_stock",
      quantity: 25,
      minQuantity: 10,
      maxQuantity: 50,
      unit: "unidades",
      location: "Almoxarifado A",
      shelf: "A12",
      lastRestocked: new Date(2024, 2, 10),
      nextRestock: new Date(2024, 3, 10),
      supplier: {
        name: "AeroParts Inc.",
        contact: "John Smith",
        email: "john@aeroparts.com",
      },
      price: 150,
      lastUsed: new Date(2024, 2, 15),
      usageRate: "5/month",
    },
    {
      id: "INV002",
      name: "Pastilhas de Freio",
      partNumber: "BRAKE-456",
      category: "landing_gear",
      status: "low_stock",
      quantity: 8,
      minQuantity: 15,
      maxQuantity: 40,
      unit: "pares",
      location: "Almoxarifado B",
      shelf: "B15",
      lastRestocked: new Date(2024, 2, 5),
      nextRestock: new Date(2024, 2, 25),
      supplier: {
        name: "BrakeTech Ltd.",
        contact: "Sarah Johnson",
        email: "sarah@braketech.com",
      },
      price: 300,
      lastUsed: new Date(2024, 2, 18),
      usageRate: "8/month",
    },
    {
      id: "INV003",
      name: "Sistema de Pouso",
      partNumber: "LAND-789",
      category: "landing_gear",
      status: "out_of_stock",
      quantity: 0,
      minQuantity: 2,
      maxQuantity: 5,
      unit: "unidades",
      location: "Almoxarifado C",
      shelf: "C08",
      lastRestocked: new Date(2024, 1, 15),
      nextRestock: new Date(2024, 3, 1),
      supplier: {
        name: "Landing Systems Co.",
        contact: "Mike Wilson",
        email: "mike@landingsys.com",
      },
      price: 5000,
      lastUsed: new Date(2024, 2, 20),
      usageRate: "1/month",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in_stock":
        return "text-green-600 bg-green-50";
      case "low_stock":
        return "text-yellow-600 bg-yellow-50";
      case "out_of_stock":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "in_stock":
        return <CheckCircle className="h-4 w-4" />;
      case "low_stock":
        return <AlertCircle className="h-4 w-4" />;
      case "out_of_stock":
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
        <h1 className="text-3xl font-bold text-gray-900">Gestão de Estoque</h1>
        <p className="text-gray-500">Gerencie peças e suprimentos</p>
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
                      placeholder="Pesquisar itens..."
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
                      <SelectItem value="in_stock">Em Estoque</SelectItem>
                      <SelectItem value="low_stock">Estoque Baixo</SelectItem>
                      <SelectItem value="out_of_stock">Sem Estoque</SelectItem>
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
                  Novo Item
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Número da Peça</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Quantidade</TableHead>
                    <TableHead>Localização</TableHead>
                    <TableHead>Fornecedor</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead>Último Uso</TableHead>
                    <TableHead>Taxa de Uso</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.partNumber}</TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                            item.category
                          )}`}
                        >
                          <Tool className="h-4 w-4 mr-1" />
                          <span className="capitalize">
                            {item.category === "engine" ? "Motor" : item.category === "landing_gear" ? "Trem de Pouso" : "Aviônicos"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            item.status
                          )}`}
                        >
                          {getStatusIcon(item.status)}
                          <span className="ml-1 capitalize">
                            {item.status === "in_stock" ? "Em Estoque" : item.status === "low_stock" ? "Estoque Baixo" : "Sem Estoque"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Box className="h-4 w-4 mr-1 text-blue-600" />
                          {item.quantity} {item.unit}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="text-sm">{item.location}</div>
                          <div className="text-sm text-gray-500">Prateleira {item.shelf}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="text-sm">{item.supplier.name}</div>
                          <div className="text-sm text-gray-500">{item.supplier.contact}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className="font-medium">R$ {item.price.toLocaleString()}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Calendar className="h-3 w-3 mr-1" />
                          {format(item.lastUsed, "dd/MM/yyyy", { locale: ptBR })}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {item.usageRate.includes("up") ? (
                            <ArrowUp className="h-4 w-4 mr-1 text-green-600" />
                          ) : (
                            <ArrowDown className="h-4 w-4 mr-1 text-red-600" />
                          )}
                          {item.usageRate}
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
                  <span className="text-gray-500">Total de Itens</span>
                  <span className="font-semibold">{inventory.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Em Estoque</span>
                  <span className="font-semibold text-green-600">
                    {inventory.filter((i) => i.status === "in_stock").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Estoque Baixo</span>
                  <span className="font-semibold text-yellow-600">
                    {inventory.filter((i) => i.status === "low_stock").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Sem Estoque</span>
                  <span className="font-semibold text-red-600">
                    {inventory.filter((i) => i.status === "out_of_stock").length}
                  </span>
                </div>
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between">
                  <span className="text-gray-500">Motor</span>
                  <span className="font-semibold text-blue-600">
                    {inventory.filter((i) => i.category === "engine").length}
                  </span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-500">Trem de Pouso</span>
                  <span className="font-semibold text-purple-600">
                    {inventory.filter((i) => i.category === "landing_gear").length}
                  </span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-500">Aviônicos</span>
                  <span className="font-semibold text-green-600">
                    {inventory.filter((i) => i.category === "avionics").length}
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
                  <AlertCircle className="h-4 w-4 text-yellow-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium">Estoque Baixo</p>
                    <p className="text-xs text-gray-500">
                      1 item com estoque crítico
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Clock className="h-4 w-4 text-blue-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium">Próximas Reposições</p>
                    <p className="text-xs text-gray-500">
                      2 itens precisam ser repostos
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

export default InventoryManagement; 