import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Search, Filter, Plus, TrendingUp, TrendingDown, Clock, Calendar, Plane, MapPin, User, DollarSign, Wallet, CreditCard, Receipt, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const FinancialManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const financialTransactions = [
    {
      id: "FIN001",
      type: "revenue",
      category: "ticket_sales",
      status: "completed",
      amount: 125000.00,
      currency: "BRL",
      date: new Date(2024, 2, 1),
      description: "Vendas de passagens - LA123",
      reference: "TKT-123456",
      paymentMethod: "credit_card",
      customer: {
        name: "João Silva",
        id: "CUST001",
        email: "joao.silva@email.com",
      },
      details: {
        tickets: 85,
        averagePrice: 1470.59,
        taxes: 18750.00,
        fees: 2500.00,
      },
    },
    {
      id: "FIN002",
      type: "expense",
      category: "fuel",
      status: "pending",
      amount: 75000.00,
      currency: "BRL",
      date: new Date(2024, 2, 5),
      description: "Abastecimento - PT-XAB",
      reference: "FUEL-789012",
      paymentMethod: "bank_transfer",
      supplier: {
        name: "Shell Aviation",
        id: "SUPP001",
        contact: "contato@shell.com",
      },
      details: {
        liters: 25000,
        pricePerLiter: 3.00,
        taxes: 11250.00,
        fees: 1500.00,
      },
    },
    {
      id: "FIN003",
      type: "revenue",
      category: "ancillary",
      status: "completed",
      amount: 25000.00,
      currency: "BRL",
      date: new Date(2024, 2, 10),
      description: "Serviços adicionais - LA456",
      reference: "ANC-345678",
      paymentMethod: "credit_card",
      customer: {
        name: "Maria Santos",
        id: "CUST002",
        email: "maria.santos@email.com",
      },
      details: {
        services: [
          { name: "Bagagem Extra", amount: 15000.00 },
          { name: "Refeição Premium", amount: 10000.00 },
        ],
        taxes: 3750.00,
        fees: 500.00,
      },
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-50";
      case "pending":
        return "text-yellow-600 bg-yellow-50";
      case "failed":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "failed":
        return <XCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "revenue":
        return "text-green-600 bg-green-50";
      case "expense":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Gestão Financeira</h1>
        <p className="text-gray-500">Gerencie transações e métricas financeiras</p>
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
                      placeholder="Pesquisar transações..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-[300px]"
                    />
                  </div>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="revenue">Receita</SelectItem>
                      <SelectItem value="expense">Despesa</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="completed">Concluído</SelectItem>
                      <SelectItem value="pending">Pendente</SelectItem>
                      <SelectItem value="failed">Falhou</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Transação
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Referência</TableHead>
                    <TableHead>Método</TableHead>
                    <TableHead>Cliente/Fornecedor</TableHead>
                    <TableHead>Detalhes</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {financialTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{transaction.id}</TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                            transaction.type
                          )}`}
                        >
                          {transaction.type === "revenue" ? (
                            <TrendingUp className="h-4 w-4 mr-1" />
                          ) : (
                            <TrendingDown className="h-4 w-4 mr-1" />
                          )}
                          <span className="capitalize">
                            {transaction.type === "revenue" ? "Receita" : "Despesa"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="capitalize">
                          {transaction.category === "ticket_sales" ? "Vendas de Passagens" : transaction.category === "fuel" ? "Combustível" : "Serviços Adicionais"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            transaction.status
                          )}`}
                        >
                          {getStatusIcon(transaction.status)}
                          <span className="ml-1 capitalize">
                            {transaction.status === "completed" ? "Concluído" : transaction.status === "pending" ? "Pendente" : "Falhou"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">
                          {formatCurrency(transaction.amount, transaction.currency)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Calendar className="h-3 w-3 mr-1" />
                          {format(transaction.date, "dd/MM/yyyy", { locale: ptBR })}
                        </div>
                      </TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>{transaction.reference}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {transaction.paymentMethod === "credit_card" ? (
                            <CreditCard className="h-4 w-4 mr-1" />
                          ) : (
                            <Wallet className="h-4 w-4 mr-1" />
                          )}
                          <span className="capitalize">
                            {transaction.paymentMethod === "credit_card" ? "Cartão de Crédito" : "Transferência"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="font-medium">
                            {transaction.customer?.name || transaction.supplier?.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {transaction.customer?.email || transaction.supplier?.contact}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          {transaction.details.tickets && (
                            <div className="text-sm">
                              {transaction.details.tickets} passagens
                            </div>
                          )}
                          {transaction.details.liters && (
                            <div className="text-sm">
                              {transaction.details.liters}L
                            </div>
                          )}
                          {transaction.details.services && (
                            <div className="text-sm">
                              {transaction.details.services.length} serviços
                            </div>
                          )}
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
                  <span className="text-gray-500">Total de Transações</span>
                  <span className="font-semibold">{financialTransactions.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Receitas</span>
                  <span className="font-semibold text-green-600">
                    {formatCurrency(
                      financialTransactions
                        .filter((t) => t.type === "revenue")
                        .reduce((sum, t) => sum + t.amount, 0),
                      "BRL"
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Despesas</span>
                  <span className="font-semibold text-red-600">
                    {formatCurrency(
                      financialTransactions
                        .filter((t) => t.type === "expense")
                        .reduce((sum, t) => sum + t.amount, 0),
                      "BRL"
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Saldo</span>
                  <span className="font-semibold text-blue-600">
                    {formatCurrency(
                      financialTransactions.reduce((sum, t) => sum + (t.type === "revenue" ? t.amount : -t.amount), 0),
                      "BRL"
                    )}
                  </span>
                </div>
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between">
                  <span className="text-gray-500">Concluídas</span>
                  <span className="font-semibold text-green-600">
                    {financialTransactions.filter((t) => t.status === "completed").length}
                  </span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-500">Pendentes</span>
                  <span className="font-semibold text-yellow-600">
                    {financialTransactions.filter((t) => t.status === "pending").length}
                  </span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-500">Falhas</span>
                  <span className="font-semibold text-red-600">
                    {financialTransactions.filter((t) => t.status === "failed").length}
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
                  <TrendingUp className="h-4 w-4 text-green-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium">Receitas</p>
                    <p className="text-xs text-gray-500">
                      Aumento de 15% nas vendas
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <TrendingDown className="h-4 w-4 text-red-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium">Despesas</p>
                    <p className="text-xs text-gray-500">
                      Aumento de 8% nos custos
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <AlertCircle className="h-4 w-4 text-yellow-500 mt-1" />
                  <div>
                    <p className="text-sm font-medium">Pendências</p>
                    <p className="text-xs text-gray-500">
                      2 transações pendentes
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

export default FinancialManagement; 