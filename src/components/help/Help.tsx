import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Search, BookOpen, MessageSquare, Phone, Mail, FileText, Video } from "lucide-react";

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    {
      question: "Como faço para gerenciar meus voos?",
      answer: "Para gerenciar seus voos, acesse a seção 'Gerenciamento de Voos' no menu lateral. Lá você encontrará todas as opções para visualizar, criar e editar voos.",
    },
    {
      question: "Como alocar tripulantes para um voo?",
      answer: "Na seção 'Alocação de Tripulação', você pode visualizar a disponibilidade dos tripulantes e alocá-los para voos específicos. O sistema mostrará automaticamente os conflitos de horário.",
    },
    {
      question: "Como monitorar a frota de aeronaves?",
      answer: "Acesse a seção 'Monitoramento de Aeronaves' para ver o status de cada aeronave, incluindo manutenções programadas e histórico de voos.",
    },
    {
      question: "Como gerar relatórios de desempenho?",
      answer: "Na seção 'Relatórios de Desempenho', você pode selecionar o tipo de relatório desejado e o período, e o sistema gerará automaticamente o relatório com os dados solicitados.",
    },
  ];

  const documentation = [
    {
      title: "Guia do Usuário",
      description: "Manual completo com todas as funcionalidades do sistema",
      icon: BookOpen,
    },
    {
      title: "Tutoriais em Vídeo",
      description: "Vídeos explicativos sobre as principais funcionalidades",
      icon: Video,
    },
    {
      title: "Documentação Técnica",
      description: "Documentação detalhada para desenvolvedores",
      icon: FileText,
    },
  ];

  const supportChannels = [
    {
      title: "Chat ao Vivo",
      description: "Suporte em tempo real via chat",
      icon: MessageSquare,
      action: "Iniciar Chat",
    },
    {
      title: "Telefone",
      description: "Suporte por telefone 24/7",
      icon: Phone,
      action: "Ligar Agora",
    },
    {
      title: "Email",
      description: "Suporte por email",
      icon: Mail,
      action: "Enviar Email",
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Central de Ajuda</h1>
        <p className="text-gray-500">Encontre respostas para suas dúvidas e suporte</p>
      </div>

      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Pesquisar ajuda..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs defaultValue="faq" className="space-y-4">
        <TabsList>
          <TabsTrigger value="faq">Perguntas Frequentes</TabsTrigger>
          <TabsTrigger value="documentation">Documentação</TabsTrigger>
          <TabsTrigger value="support">Suporte</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Perguntas Frequentes</CardTitle>
              <CardDescription>Encontre respostas para as dúvidas mais comuns</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b pb-4 last:border-0">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documentation" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {documentation.map((doc, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <doc.icon className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{doc.title}</CardTitle>
                  </div>
                  <CardDescription>{doc.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Acessar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="support" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {supportChannels.map((channel, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <channel.icon className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{channel.title}</CardTitle>
                  </div>
                  <CardDescription>{channel.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">{channel.action}</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Não encontrou o que procurava?</CardTitle>
            <CardDescription>
              Entre em contato com nossa equipe de suporte para assistência personalizada
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="subject">Assunto</Label>
                <Input id="subject" placeholder="Digite o assunto da sua solicitação" />
              </div>
              <div className="flex-1 space-y-2">
                <Label htmlFor="message">Mensagem</Label>
                <Input id="message" placeholder="Descreva sua dúvida ou problema" />
              </div>
            </div>
            <Button className="mt-4">Enviar Mensagem</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Help; 