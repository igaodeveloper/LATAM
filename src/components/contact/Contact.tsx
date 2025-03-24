import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { MapPin, Phone, Mail, Clock, MessageSquare, FileText, Video, Book, FileQuestion, MessageCircle, PhoneCall, Mail2, FileText2, Video2, Book2, FileQuestion2, MessageCircle2, PhoneCall2, Mail3, FileText3, Video3, Book3, FileQuestion3, MessageCircle3, PhoneCall3, Mail4, FileText4, Video4, Book4, FileQuestion4, MessageCircle4, PhoneCall4 } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    priority: "normal",
  });

  const contactInfo = {
    address: "Av. Presidente Riesco 5711, Las Condes, Santiago, Chile",
    phone: "+56 2 565-1234",
    email: "contato@latam.com",
    hours: "Segunda a Sexta, 9h às 18h",
    social: {
      linkedin: "https://linkedin.com/company/latam",
      twitter: "https://twitter.com/latam",
      facebook: "https://facebook.com/latam",
      instagram: "https://instagram.com/latam",
    },
  };

  const supportDepartments = [
    {
      id: "technical",
      name: "Suporte Técnico",
      description: "Assistência com problemas técnicos e sistemas",
      email: "suporte@latam.com",
      phone: "+56 2 565-1235",
      hours: "24/7",
      icon: FileText,
    },
    {
      id: "maintenance",
      name: "Manutenção",
      description: "Suporte relacionado a manutenção de aeronaves",
      email: "manutencao@latam.com",
      phone: "+56 2 565-1236",
      hours: "8h às 18h",
      icon: Tool,
    },
    {
      id: "safety",
      name: "Segurança",
      description: "Questões relacionadas à segurança operacional",
      email: "seguranca@latam.com",
      phone: "+56 2 565-1237",
      hours: "24/7",
      icon: Shield,
    },
    {
      id: "compliance",
      name: "Conformidade",
      description: "Assuntos de conformidade regulatória",
      email: "conformidade@latam.com",
      phone: "+56 2 565-1238",
      hours: "8h às 18h",
      icon: CheckCircle,
    },
    {
      id: "financial",
      name: "Financeiro",
      description: "Suporte financeiro e contábil",
      email: "financeiro@latam.com",
      phone: "+56 2 565-1239",
      hours: "8h às 18h",
      icon: DollarSign,
    },
  ];

  const faqs = [
    {
      question: "Como criar um ticket de suporte?",
      answer: "Você pode criar um ticket de suporte através do formulário de contato ou ligando para nossa central de atendimento.",
    },
    {
      question: "Qual o tempo médio de resposta?",
      answer: "O tempo médio de resposta varia de acordo com a prioridade do ticket. Tickets de alta prioridade são atendidos em até 2 horas.",
    },
    {
      question: "Como acompanhar meu ticket?",
      answer: "Você pode acompanhar seu ticket através do número de referência enviado por email após a criação.",
    },
    {
      question: "Quais são os canais de suporte disponíveis?",
      answer: "Oferecemos suporte por email, telefone, chat ao vivo e formulário de contato.",
    },
    {
      question: "Como solicitar suporte fora do horário comercial?",
      answer: "Para suporte de emergência fora do horário comercial, entre em contato com nossa central 24/7.",
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
        <h1 className="text-3xl font-bold text-gray-900">Contato</h1>
        <p className="text-gray-500">Entre em contato conosco para suporte e informações</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Envie uma Mensagem</CardTitle>
              <CardDescription>
                Preencha o formulário abaixo para entrar em contato conosco
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome</Label>
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
                    <Label htmlFor="email">Email</Label>
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
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Assunto</Label>
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
                  <Label htmlFor="priority">Prioridade</Label>
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
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    rows={5}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Enviar Mensagem
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Perguntas Frequentes</CardTitle>
              <CardDescription>
                Encontre respostas para as dúvidas mais comuns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="font-semibold">{faq.question}</h3>
                    <p className="text-sm text-gray-500">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Informações de Contato</CardTitle>
              <CardDescription>
                Entre em contato conosco através dos canais abaixo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Endereço</p>
                    <p className="text-sm text-gray-500">{contactInfo.address}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Telefone</p>
                    <p className="text-sm text-gray-500">{contactInfo.phone}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-gray-500">{contactInfo.email}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Horário</p>
                    <p className="text-sm text-gray-500">{contactInfo.hours}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Departamentos de Suporte</CardTitle>
              <CardDescription>
                Entre em contato com o departamento específico
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supportDepartments.map((dept) => (
                  <div key={dept.id} className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <dept.icon className="h-4 w-4 text-primary" />
                      </div>
                      <h3 className="font-semibold">{dept.name}</h3>
                    </div>
                    <p className="text-sm text-gray-500">{dept.description}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Mail className="h-4 w-4" />
                      <span>{dept.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Phone className="h-4 w-4" />
                      <span>{dept.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>{dept.hours}</span>
                    </div>
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

export default Contact; 