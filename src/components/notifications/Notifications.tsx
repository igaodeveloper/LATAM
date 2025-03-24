import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Bell, Mail, MessageSquare, AlertCircle, Info, CheckCircle, XCircle, Plane, Ticket, CreditCard, User, Shield, Clock, Calendar, Users, Database, Globe, Phone, MapPin, Luggage } from "lucide-react";

const Notifications = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const notifications = [
    {
      id: 1,
      title: "Voo Confirmado",
      message: "Seu voo LA1234 para São Paulo foi confirmado",
      type: "success",
      category: "flight",
      timestamp: "2024-03-15T10:30:00",
      read: false,
      icon: Plane,
    },
    {
      id: 2,
      title: "Atualização de Bagagem",
      message: "Sua bagagem foi carregada no voo LA1234",
      type: "info",
      category: "baggage",
      timestamp: "2024-03-15T09:15:00",
      read: true,
      icon: Luggage,
    },
    {
      id: 3,
      title: "Pagamento Processado",
      message: "Seu pagamento de $299.99 foi processado com sucesso",
      type: "success",
      category: "payment",
      timestamp: "2024-03-15T08:45:00",
      read: true,
      icon: CreditCard,
    },
    {
      id: 4,
      title: "Aviso de Segurança",
      message: "Novas medidas de segurança implementadas",
      type: "warning",
      category: "safety",
      timestamp: "2024-03-15T07:30:00",
      read: false,
      icon: Shield,
    },
    {
      id: 5,
      title: "Pontos Adicionados",
      message: "500 pontos adicionados à sua conta",
      type: "success",
      category: "loyalty",
      timestamp: "2024-03-15T06:15:00",
      read: true,
      icon: User,
    },
    {
      id: 6,
      title: "Atraso no Voo",
      message: "O voo LA5678 está com atraso de 30 minutos",
      type: "warning",
      category: "flight",
      timestamp: "2024-03-15T05:45:00",
      read: false,
      icon: Plane,
    },
    {
      id: 7,
      title: "Manutenção Programada",
      message: "Manutenção programada para amanhã às 02:00",
      type: "info",
      category: "maintenance",
      timestamp: "2024-03-15T04:30:00",
      read: true,
      icon: AlertCircle,
    },
    {
      id: 8,
      title: "Reembolso Processado",
      message: "Seu reembolso de $150.00 foi processado",
      type: "success",
      category: "payment",
      timestamp: "2024-03-15T03:15:00",
      read: true,
      icon: CreditCard,
    },
    {
      id: 9,
      title: "Atualização de Status",
      message: "Seu status foi atualizado para Gold",
      type: "success",
      category: "loyalty",
      timestamp: "2024-03-15T02:45:00",
      read: false,
      icon: User,
    },
    {
      id: 10,
      title: "Novo Destino",
      message: "Nova rota disponível para Miami",
      type: "info",
      category: "route",
      timestamp: "2024-03-15T01:30:00",
      read: true,
      icon: Globe,
    },
  ];

  const categories = [
    { id: "all", name: "Todos", icon: Bell },
    { id: "flight", name: "Voos", icon: Plane },
    { id: "baggage", name: "Bagagem", icon: Luggage },
    { id: "payment", name: "Pagamentos", icon: CreditCard },
    { id: "safety", name: "Segurança", icon: Shield },
    { id: "loyalty", name: "Fidelidade", icon: User },
    { id: "maintenance", name: "Manutenção", icon: AlertCircle },
    { id: "route", name: "Rotas", icon: Globe },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "success":
        return "text-green-500";
      case "warning":
        return "text-yellow-500";
      case "info":
        return "text-blue-500";
      default:
        return "text-gray-500";
    }
  };

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || notification.category === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Notificações</h1>
        <p className="text-gray-500">
          Gerencie suas notificações e alertas
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Notificações do Sistema</CardTitle>
                  <CardDescription>
                    Visualize e gerencie suas notificações
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-4">
                  <Input
                    placeholder="Buscar notificações..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64"
                  />
                  <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filtrar por" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          <div className="flex items-center space-x-2">
                            <category.icon className="h-4 w-4" />
                            <span>{category.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start space-x-4 p-4 rounded-lg border ${
                      notification.read ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <div className={`${getTypeColor(notification.type)}`}>
                      <notification.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{notification.title}</h3>
                        <span className="text-sm text-gray-500">
                          {new Date(notification.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {notification.message}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={notification.read ? "text-gray-400" : "text-blue-500"}
                    >
                      {notification.read ? "Lida" : "Marcar como lida"}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Preferências</CardTitle>
              <CardDescription>
                Configure suas preferências de notificação
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm">notificacoes@latam.com</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Telefone</label>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span className="text-sm">+56 2 565-1234</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Endereço</label>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">
                      Av. Presidente Riesco 5711, Las Condes, Santiago, Chile
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Horário de Atendimento</label>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">24/7</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Idioma</label>
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4" />
                    <span className="text-sm">Português</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Fuso Horário</label>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">GMT-3</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Grupo</label>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">Administradores</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Base de Dados</label>
                  <div className="flex items-center space-x-2">
                    <Database className="h-4 w-4" />
                    <span className="text-sm">Produção</span>
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

export default Notifications; 