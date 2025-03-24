import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Search, HelpCircle, BookOpen, MessageSquare, Phone, Mail, FileText, Video, Book, FileQuestion, MessageCircle, PhoneCall, Mail2, FileText2, Video2, Book2, FileQuestion2, MessageCircle2, PhoneCall2, Mail3, FileText3, Video3, Book3, FileQuestion3, MessageCircle3, PhoneCall3, Mail4, FileText4, Video4, Book4, FileQuestion4, MessageCircle4, PhoneCall4 } from "lucide-react";

const HelpSupport = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");

  const categories = [
    { id: "all", name: "Todos" },
    { id: "maintenance", name: "Manutenção" },
    { id: "operations", name: "Operações" },
    { id: "safety", name: "Segurança" },
    { id: "compliance", name: "Conformidade" },
    { id: "financial", name: "Financeiro" },
  ];

  const documentation = [
    {
      id: 1,
      title: "Manual do Usuário",
      category: "operations",
      type: "document",
      description: "Guia completo do sistema para usuários",
      lastUpdated: "2024-03-15",
      size: "2.5 MB",
      icon: FileText,
    },
    {
      id: 2,
      title: "Procedimentos de Manutenção",
      category: "maintenance",
      type: "document",
      description: "Procedimentos padrão de manutenção",
      lastUpdated: "2024-03-10",
      size: "1.8 MB",
      icon: FileText,
    },
    {
      id: 3,
      title: "Treinamento de Segurança",
      category: "safety",
      type: "video",
      description: "Vídeo de treinamento em segurança",
      lastUpdated: "2024-03-05",
      size: "45 MB",
      icon: Video,
    },
    {
      id: 4,
      title: "Guia de Conformidade",
      category: "compliance",
      type: "document",
      description: "Guia de conformidade regulatória",
      lastUpdated: "2024-03-01",
      size: "3.2 MB",
      icon: FileText,
    },
    {
      id: 5,
      title: "Relatórios Financeiros",
      category: "financial",
      type: "document",
      description: "Modelos de relatórios financeiros",
      lastUpdated: "2024-02-28",
      size: "1.5 MB",
      icon: FileText,
    },
  ];

  const faqs = [
    {
      id: 1,
      question: "Como criar um novo relatório?",
      answer: "Para criar um novo relatório, acesse a seção 'Relatórios' e clique no botão 'Novo Relatório'. Selecione o tipo de relatório desejado e preencha as informações necessárias.",
      category: "operations",
    },
    {
      id: 2,
      question: "Qual o processo de aprovação de manutenção?",
      answer: "O processo de aprovação de manutenção envolve três etapas: 1) Criação da ordem de serviço, 2) Revisão pelo supervisor, 3) Aprovação final pelo gerente de manutenção.",
      category: "maintenance",
    },
    {
      id: 3,
      question: "Como reportar um incidente de segurança?",
      answer: "Para reportar um incidente de segurança, utilize o formulário 'Reportar Incidente' na seção de Segurança. Preencha todos os campos obrigatórios e anexe evidências quando necessário.",
      category: "safety",
    },
    {
      id: 4,
      question: "Quais são os requisitos de conformidade?",
      answer: "Os requisitos de conformidade incluem documentação completa, registros de auditoria, e aderência às normas regulatórias. Consulte o Guia de Conformidade para mais detalhes.",
      category: "compliance",
    },
    {
      id: 5,
      question: "Como gerar relatórios financeiros?",
      answer: "Os relatórios financeiros podem ser gerados através da seção 'Financeiro'. Selecione o tipo de relatório, período e formato desejado.",
      category: "financial",
    },
  ];

  const supportContacts = [
    {
      id: 1,
      name: "Suporte Técnico",
      type: "technical",
      email: "suporte@company.com",
      phone: "+55 (11) 3333-4444",
      hours: "24/7",
      icon: Phone,
    },
    {
      id: 2,
      name: "Suporte de Manutenção",
      type: "maintenance",
      email: "manutencao@company.com",
      phone: "+55 (11) 3333-5555",
      hours: "8h às 18h",
      icon: Phone,
    },
    {
      id: 3,
      name: "Suporte de Segurança",
      type: "safety",
      email: "seguranca@company.com",
      phone: "+55 (11) 3333-6666",
      hours: "24/7",
      icon: Phone,
    },
    {
      id: 4,
      name: "Suporte de Conformidade",
      type: "compliance",
      email: "conformidade@company.com",
      phone: "+55 (11) 3333-7777",
      hours: "8h às 18h",
      icon: Phone,
    },
    {
      id: 5,
      name: "Suporte Financeiro",
      type: "financial",
      email: "financeiro@company.com",
      phone: "+55 (11) 3333-8888",
      hours: "8h às 18h",
      icon: Phone,
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Ajuda e Suporte</h1>
        <p className="text-gray-500">Encontre respostas e suporte para suas dúvidas</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3">
          <Tabs defaultValue="documentation" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="documentation" className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4" />
                <span>Documentação</span>
              </TabsTrigger>
              <TabsTrigger value="faq" className="flex items-center space-x-2">
                <HelpCircle className="h-4 w-4" />
                <span>FAQ</span>
              </TabsTrigger>
              <TabsTrigger value="support" className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4" />
                <span>Suporte</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="documentation" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Documentação</CardTitle>
                  <CardDescription>
                    Acesse manuais, guias e materiais de treinamento
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex space-x-4">
                      <div className="flex-1">
                        <Input
                          placeholder="Pesquisar documentação..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full"
                        />
                      </div>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {documentation.map((doc) => (
                        <Card key={doc.id}>
                          <CardContent className="pt-6">
                            <div className="flex items-start space-x-4">
                              <div className="p-2 bg-primary/10 rounded-full">
                                <doc.icon className="h-5 w-5 text-primary" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold">{doc.title}</h3>
                                <p className="text-sm text-gray-500">{doc.description}</p>
                                <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                                  <span>Atualizado: {doc.lastUpdated}</span>
                                  <span>•</span>
                                  <span>{doc.size}</span>
                                </div>
                                <Button variant="outline" className="mt-4">
                                  Acessar
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="faq" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Perguntas Frequentes</CardTitle>
                  <CardDescription>
                    Encontre respostas para as dúvidas mais comuns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex space-x-4">
                      <div className="flex-1">
                        <Input
                          placeholder="Pesquisar FAQ..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full"
                        />
                      </div>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-4">
                      {faqs.map((faq) => (
                        <Card key={faq.id}>
                          <CardContent className="pt-6">
                            <div className="space-y-2">
                              <h3 className="font-semibold">{faq.question}</h3>
                              <p className="text-sm text-gray-500">{faq.answer}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="support" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Suporte</CardTitle>
                  <CardDescription>
                    Entre em contato com nossa equipe de suporte
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {supportContacts.map((contact) => (
                        <Card key={contact.id}>
                          <CardContent className="pt-6">
                            <div className="flex items-start space-x-4">
                              <div className="p-2 bg-primary/10 rounded-full">
                                <contact.icon className="h-5 w-5 text-primary" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold">{contact.name}</h3>
                                <div className="mt-2 space-y-1 text-sm text-gray-500">
                                  <p className="flex items-center space-x-2">
                                    <Mail className="h-4 w-4" />
                                    <span>{contact.email}</span>
                                  </p>
                                  <p className="flex items-center space-x-2">
                                    <Phone className="h-4 w-4" />
                                    <span>{contact.phone}</span>
                                  </p>
                                  <p className="flex items-center space-x-2">
                                    <Clock className="h-4 w-4" />
                                    <span>{contact.hours}</span>
                                  </p>
                                </div>
                                <Button variant="outline" className="mt-4">
                                  Contatar
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Recursos Rápidos</CardTitle>
              <CardDescription>
                Acesse recursos e links úteis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <FileQuestion className="h-4 w-4 mr-2" />
                  Criar Ticket
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat ao Vivo
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <PhoneCall className="h-4 w-4 mr-2" />
                  Suporte por Telefone
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail2 className="h-4 w-4 mr-2" />
                  Enviar Email
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText2 className="h-4 w-4 mr-2" />
                  Base de Conhecimento
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Video2 className="h-4 w-4 mr-2" />
                  Tutoriais em Vídeo
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Book2 className="h-4 w-4 mr-2" />
                  Guias do Usuário
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileQuestion2 className="h-4 w-4 mr-2" />
                  FAQ
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageCircle2 className="h-4 w-4 mr-2" />
                  Fórum de Discussão
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <PhoneCall2 className="h-4 w-4 mr-2" />
                  Números de Emergência
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail3 className="h-4 w-4 mr-2" />
                  Newsletter
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText3 className="h-4 w-4 mr-2" />
                  Documentação Técnica
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Video3 className="h-4 w-4 mr-2" />
                  Webinars
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Book3 className="h-4 w-4 mr-2" />
                  Treinamentos
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileQuestion3 className="h-4 w-4 mr-2" />
                  Centro de Ajuda
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageCircle3 className="h-4 w-4 mr-2" />
                  Comunidade
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <PhoneCall3 className="h-4 w-4 mr-2" />
                  Suporte 24/7
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail4 className="h-4 w-4 mr-2" />
                  Feedback
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText4 className="h-4 w-4 mr-2" />
                  Políticas
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Video4 className="h-4 w-4 mr-2" />
                  Vídeos de Treinamento
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Book4 className="h-4 w-4 mr-2" />
                  Manuais
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileQuestion4 className="h-4 w-4 mr-2" />
                  Dúvidas Frequentes
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageCircle4 className="h-4 w-4 mr-2" />
                  Fale Conosco
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <PhoneCall4 className="h-4 w-4 mr-2" />
                  Central de Atendimento
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
