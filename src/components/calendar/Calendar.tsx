import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Calendar as CalendarIcon, Mail, Phone, Clock, MapPin, Globe, Users, Database, AlertCircle, Info, CheckCircle, XCircle, Plane, Ticket, CreditCard, User, Shield, Search, Plus, ChevronLeft, ChevronRight, MoreVertical } from "lucide-react";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState("month");
  const [searchQuery, setSearchQuery] = useState("");

  const events = [
    {
      id: 1,
      title: "Reunião de Equipe",
      description: "Discussão sobre projetos em andamento",
      date: "2024-03-15",
      time: "10:00",
      duration: "1h",
      type: "meeting",
      location: "Sala de Conferência 1",
      attendees: ["João", "Maria", "Pedro"],
      status: "confirmed",
    },
    {
      id: 2,
      title: "Manutenção Programada",
      description: "Manutenção preventiva do sistema",
      date: "2024-03-15",
      time: "14:00",
      duration: "2h",
      type: "maintenance",
      location: "Servidor Principal",
      attendees: ["Equipe de TI"],
      status: "scheduled",
    },
    {
      id: 3,
      title: "Treinamento",
      description: "Treinamento de novos funcionários",
      date: "2024-03-16",
      time: "09:00",
      duration: "4h",
      type: "training",
      location: "Sala de Treinamento",
      attendees: ["Novos Funcionários"],
      status: "confirmed",
    },
    {
      id: 4,
      title: "Apresentação de Projeto",
      description: "Apresentação do novo sistema",
      date: "2024-03-16",
      time: "15:00",
      duration: "1h",
      type: "presentation",
      location: "Auditório",
      attendees: ["Stakeholders", "Equipe de Desenvolvimento"],
      status: "pending",
    },
    {
      id: 5,
      title: "Revisão de Código",
      description: "Revisão de código do novo módulo",
      date: "2024-03-17",
      time: "11:00",
      duration: "2h",
      type: "review",
      location: "Sala de Desenvolvimento",
      attendees: ["Equipe de Desenvolvimento"],
      status: "confirmed",
    },
  ];

  const eventTypes = [
    { id: "all", name: "Todos", icon: CalendarIcon },
    { id: "meeting", name: "Reuniões", icon: Users },
    { id: "maintenance", name: "Manutenção", icon: AlertCircle },
    { id: "training", name: "Treinamentos", icon: Info },
    { id: "presentation", name: "Apresentações", icon: CheckCircle },
    { id: "review", name: "Revisões", icon: XCircle },
  ];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "meeting":
        return "bg-blue-500";
      case "maintenance":
        return "bg-yellow-500";
      case "training":
        return "bg-green-500";
      case "presentation":
        return "bg-purple-500";
      case "review":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Calendário</h1>
        <p className="text-gray-500">
          Gerencie seus compromissos e eventos
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="icon">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <h2 className="text-xl font-semibold">
                    {selectedDate.toLocaleString("pt-BR", {
                      month: "long",
                      year: "numeric",
                    })}
                  </h2>
                </div>
                <div className="flex items-center space-x-4">
                  <Select value={view} onValueChange={setView}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Visualização" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="day">Dia</SelectItem>
                      <SelectItem value="week">Semana</SelectItem>
                      <SelectItem value="month">Mês</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Evento
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-start space-x-4 p-4 rounded-lg border"
                  >
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${getEventTypeColor(
                        event.type
                      )}`}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{event.title}</h3>
                        <span className="text-sm text-gray-500">
                          {event.date} {event.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {event.description}
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span className="text-sm">{event.duration}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm">{event.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4" />
                          <span className="text-sm">
                            {event.attendees.join(", ")}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
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
              <CardTitle>Próximos Eventos</CardTitle>
              <CardDescription>
                Visualize seus próximos compromissos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events
                  .filter((event) => event.status === "confirmed")
                  .map((event) => (
                    <div
                      key={event.id}
                      className="flex items-start space-x-4 p-3 rounded-lg border"
                    >
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${getEventTypeColor(
                          event.type
                        )}`}
                      />
                      <div>
                        <h3 className="font-medium text-sm">{event.title}</h3>
                        <p className="text-xs text-gray-500">
                          {event.date} {event.time}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Tipos de Eventos</CardTitle>
              <CardDescription>
                Categorize seus eventos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {eventTypes.map((type) => (
                  <div
                    key={type.id}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <div className={`w-2 h-2 rounded-full ${getEventTypeColor(type.id)}`} />
                    <span className="text-sm">{type.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Calendar; 