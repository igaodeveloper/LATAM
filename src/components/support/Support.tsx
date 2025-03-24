import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { HelpCircle, Phone, Mail, MessageSquare, Clock, MapPin, Globe, Calendar, Users, Database, AlertCircle, Info, CheckCircle, XCircle, Plane, Ticket, Luggage, CreditCard, User, Shield } from "lucide-react";

const Support = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    priority: "normal",
  });

  const supportDepartments = [
    {
      id: "general",
      name: "Suporte Geral",
      description: "Dúvidas gerais e informações",
      email: "suporte@latam.com",
      phone: "+56 2 565-1234",
      hours: "24/7",
      icon: HelpCircle,
    },
    {
      id: "technical",
      name: "Suporte Técnico",
      description: "Problemas com site e aplicativo",
      email: "tecnico@latam.com",
      phone: "+56 2 565-5678",
      hours: "24/7",
      icon: MessageSquare,
    },
    {
      id: "reservations",
      name: "Reservas",
      description: "Ajuda com reservas e pagamentos",
      email: "reservas@latam.com",
      phone: "+56 2 565-9012",
      hours: "24/7",
      icon: Ticket,
    },
    {
      id: "baggage",
      name: "Bagagem",
      description: "Assistência com bagagem",
      email: "bagagem@latam.com",
      phone: "+56 2 565-3456",
      hours: "24/7",
      icon: Luggage,
    },
    {
      id: "billing",
      name: "Faturamento",
      description: "Questões financeiras e reembolsos",
      email: "faturamento@latam.com",
      phone: "+56 2 565-7890",
      hours: "Seg-Sex, 9h-18h",
      icon: CreditCard,
    },
    {
      id: "loyalty",
      name: "Programa de Fidelidade",
      description: "Pontos e benefícios",
      email: "fidelidade@latam.com",
      phone: "+56 2 565-2345",
      hours: "24/7",
      icon: User,
    },
    {
      id: "safety",
      name: "Segurança",
      description: "Relatórios de segurança",
      email: "seguranca@latam.com",
      phone: "+56 2 565-6789",
      hours: "24/7",
      icon: Shield,
    },
    {
      id: "corporate",
      name: "Corporate",
      description: "Contas corporativas",
      email: "corporate@latam.com",
      phone: "+56 2 565-0123",
      hours: "Seg-Sex, 9h-18h",
      icon: Users,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Suporte ao Cliente</h1>
        <p className="text-gray-500">
          Como podemos ajudar você hoje?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3">
          <Tabs defaultValue="contact" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="contact">Contato</TabsTrigger>
              <TabsTrigger value="departments">Departamentos</TabsTrigger>
              <TabsTrigger value="resources">Recursos</TabsTrigger>
            </TabsList>

            <TabsContent value="contact">
              <Card>
                <CardHeader>
                  <CardTitle>Entre em Contato</CardTitle>
                  <CardDescription>
                    Preencha o formulário abaixo para nos enviar sua mensagem
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Nome
                        </label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium">
                          Telefone
                        </label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-medium">
                          Assunto
                        </label>
                        <Input
                          id="subject"
                          value={formData.subject}
                          onChange={(e) =>
                            setFormData({ ...formData, subject: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="priority" className="text-sm font-medium">
                        Prioridade
                      </label>
                      <Select
                        value={formData.priority}
                        onValueChange={(value) =>
                          setFormData({ ...formData, priority: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a prioridade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Baixa</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="high">Alta</SelectItem>
                          <SelectItem value="urgent">Urgente</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Mensagem
                      </label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        required
                        className="min-h-[150px]"
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      Enviar Mensagem
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="departments">
              <Card>
                <CardHeader>
                  <CardTitle>Departamentos de Suporte</CardTitle>
                  <CardDescription>
                    Entre em contato com o departamento específico
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {supportDepartments.map((dept) => (
                      <Card key={dept.id}>
                        <CardHeader>
                          <div className="flex items-center space-x-2">
                            <dept.icon className="h-5 w-5" />
                            <CardTitle className="text-lg">{dept.name}</CardTitle>
                          </div>
                          <CardDescription>{dept.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Mail className="h-4 w-4" />
                              <span>{dept.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Phone className="h-4 w-4" />
                              <span>{dept.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4" />
                              <span>{dept.hours}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resources">
              <Card>
                <CardHeader>
                  <CardTitle>Recursos de Suporte</CardTitle>
                  <CardDescription>
                    Acesse guias, manuais e informações úteis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Informações de Contato</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <Phone className="h-5 w-5" />
                            <div>
                              <p className="font-medium">Call Center</p>
                              <p className="text-sm text-gray-500">+56 2 565-1234</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Mail className="h-5 w-5" />
                            <div>
                              <p className="font-medium">Email</p>
                              <p className="text-sm text-gray-500">suporte@latam.com</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-5 w-5" />
                            <div>
                              <p className="font-medium">Endereço</p>
                              <p className="text-sm text-gray-500">
                                Av. Presidente Riesco 5711, Las Condes, Santiago, Chile
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-5 w-5" />
                            <div>
                              <p className="font-medium">Horário de Atendimento</p>
                              <p className="text-sm text-gray-500">24/7</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Links Úteis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <Button variant="outline" className="w-full justify-start">
                            <HelpCircle className="h-4 w-4 mr-2" />
                            Central de Ajuda
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <Plane className="h-4 w-4 mr-2" />
                            Guia de Viagem
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <Ticket className="h-4 w-4 mr-2" />
                            Políticas de Reserva
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <Luggage className="h-4 w-4 mr-2" />
                            Políticas de Bagagem
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <CreditCard className="h-4 w-4 mr-2" />
                            Formas de Pagamento
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <User className="h-4 w-4 mr-2" />
                            Suporte ao Cliente
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <Shield className="h-4 w-4 mr-2" />
                            Segurança
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <Globe className="h-4 w-4 mr-2" />
                            Destinos
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Suporte Rápido</CardTitle>
              <CardDescription>
                Acesse recursos e informações importantes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Central de Ajuda
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Plane className="h-4 w-4 mr-2" />
                  Guia de Viagem
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Ticket className="h-4 w-4 mr-2" />
                  Políticas de Reserva
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Luggage className="h-4 w-4 mr-2" />
                  Políticas de Bagagem
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Formas de Pagamento
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Clock className="h-4 w-4 mr-2" />
                  Horários de Atendimento
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  Suporte ao Cliente
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  Segurança
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Globe className="h-4 w-4 mr-2" />
                  Destinos
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="h-4 w-4 mr-2" />
                  Contato
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="h-4 w-4 mr-2" />
                  Email de Suporte
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Agendamentos
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Grupos
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Database className="h-4 w-4 mr-2" />
                  Base de Conhecimento
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Avisos
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Info className="h-4 w-4 mr-2" />
                  Informações
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Soluções
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <XCircle className="h-4 w-4 mr-2" />
                  Problemas Comuns
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Support; 