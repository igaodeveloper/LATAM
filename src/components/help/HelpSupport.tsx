import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  HelpCircle,
  Search,
  FileText,
  MessageSquare,
  Phone,
  Mail,
  Video,
  BookOpen,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react";

const HelpSupport = () => {
  const [activeTab, setActiveTab] = useState("faq");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock ticket data
  const supportTickets = [
    {
      id: "T-12345",
      title: "Problema ao acessar relatórios de voo",
      status: "open",
      priority: "high",
      created: "10/09/2023",
      lastUpdate: "11/09/2023",
    },
    {
      id: "T-12344",
      title: "Dúvida sobre alocação de tripulação",
      status: "in-progress",
      priority: "medium",
      created: "05/09/2023",
      lastUpdate: "09/09/2023",
    },
    {
      id: "T-12343",
      title: "Erro ao gerar relatório de manutenção",
      status: "resolved",
      priority: "high",
      created: "01/09/2023",
      lastUpdate: "03/09/2023",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-blue-100 text-blue-800">Aberto</Badge>;
      case "in-progress":
        return (
          <Badge className="bg-amber-100 text-amber-800">Em Andamento</Badge>
        );
      case "resolved":
        return <Badge className="bg-green-100 text-green-800">Resolvido</Badge>;
      default:
        return <Badge>Desconhecido</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "low":
        return (
          <Badge variant="outline" className="border-green-500 text-green-700">
            Baixa
          </Badge>
        );
      case "medium":
        return (
          <Badge variant="outline" className="border-amber-500 text-amber-700">
            Média
          </Badge>
        );
      case "high":
        return (
          <Badge variant="outline" className="border-red-500 text-red-700">
            Alta
          </Badge>
        );
      default:
        return <Badge variant="outline">Desconhecida</Badge>;
    }
  };

  return (
    <div className="w-full h-full bg-background p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">Ajuda e Suporte</h1>
          <p className="text-muted-foreground">
            Encontre respostas para suas dúvidas ou entre em contato com nossa
            equipe
          </p>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Buscar por tópicos, perguntas ou palavras-chave..."
            className="pl-10 py-6 text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="faq" className="gap-2">
            <HelpCircle size={16} />
            Perguntas Frequentes
          </TabsTrigger>
          <TabsTrigger value="documentation" className="gap-2">
            <FileText size={16} />
            Documentação
          </TabsTrigger>
          <TabsTrigger value="contact" className="gap-2">
            <MessageSquare size={16} />
            Contato
          </TabsTrigger>
          <TabsTrigger value="tickets" className="gap-2">
            <Clock size={16} />
            Meus Chamados
          </TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Perguntas Frequentes</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    Como faço para acessar o painel de controle de voos?
                  </AccordionTrigger>
                  <AccordionContent>
                    Para acessar o painel de controle de voos, navegue até a
                    seção "Voos" no menu lateral e selecione "Painel de
                    Controle". Lá você encontrará uma visão geral de todos os
                    voos ativos, programados e concluídos. Você pode filtrar por
                    data, rota ou status para encontrar informações específicas.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    Como alocar tripulação para um voo específico?
                  </AccordionTrigger>
                  <AccordionContent>
                    Para alocar tripulação, acesse a seção "Tripulação" no menu
                    lateral e clique em "Alocação". Selecione o voo desejado na
                    lista ou use a busca para encontrá-lo. Clique em "Editar
                    Alocação" e você poderá adicionar ou remover membros da
                    tripulação conforme necessário. Lembre-se de verificar as
                    qualificações e horas de descanso de cada membro antes de
                    confirmar a alocação.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    Como gerar relatórios de performance operacional?
                  </AccordionTrigger>
                  <AccordionContent>
                    Para gerar relatórios, acesse a seção "Relatórios" no menu
                    lateral. Selecione "Performance Operacional" na lista de
                    modelos disponíveis. Configure os parâmetros desejados, como
                    período, rotas e métricas a serem incluídas. Clique em
                    "Gerar Relatório" e escolha o formato de saída (PDF, Excel,
                    etc.). O sistema processará a solicitação e disponibilizará
                    o relatório para download quando estiver pronto.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    Como programar manutenção para uma aeronave?
                  </AccordionTrigger>
                  <AccordionContent>
                    Para programar manutenção, acesse a seção "Aeronaves" e
                    selecione a aeronave específica. Na página de detalhes,
                    clique na aba "Manutenção" e depois em "Programar Nova
                    Manutenção". Preencha o formulário com o tipo de manutenção,
                    data, duração estimada e detalhes adicionais. Verifique se
                    não há conflitos com voos programados antes de confirmar. O
                    sistema notificará automaticamente as equipes relevantes
                    sobre a nova manutenção programada.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>
                    Como atualizar o status de um voo?
                  </AccordionTrigger>
                  <AccordionContent>
                    Para atualizar o status de um voo, acesse a seção "Voos" e
                    localize o voo desejado na lista. Clique no voo para abrir
                    os detalhes ou use o menu de ações rápidas (três pontos) e
                    selecione "Atualizar Status". Escolha o novo status na lista
                    suspensa (programado, embarque, em voo, concluído,
                    cancelado, etc.) e adicione qualquer observação necessária.
                    Confirme a alteração e o sistema atualizará o status e
                    notificará as partes interessadas conforme configurado.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                  <AccordionTrigger>
                    Como configurar alertas personalizados?
                  </AccordionTrigger>
                  <AccordionContent>
                    Para configurar alertas personalizados, acesse
                    "Configurações" no menu do usuário e selecione "Notificações
                    e Alertas". Clique em "Adicionar Novo Alerta" e defina os
                    critérios, como tipo de evento (atraso, cancelamento,
                    manutenção, etc.), condições específicas e limites. Escolha
                    como deseja ser notificado (email, SMS, notificação no
                    sistema) e a frequência. Salve suas configurações e o
                    sistema começará a monitorar e alertar conforme
                    especificado.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Categorias Populares</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  className="h-auto py-6 justify-start text-left flex flex-col items-start"
                >
                  <div className="flex items-center mb-2">
                    <Plane className="h-5 w-5 mr-2 text-blue-500" />
                    <span className="font-medium">Operações de Voo</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Gerenciamento de voos, rotas e status
                  </p>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto py-6 justify-start text-left flex flex-col items-start"
                >
                  <div className="flex items-center mb-2">
                    <Users className="h-5 w-5 mr-2 text-purple-500" />
                    <span className="font-medium">Gestão de Tripulação</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Alocação, escalas e qualificações
                  </p>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto py-6 justify-start text-left flex flex-col items-start"
                >
                  <div className="flex items-center mb-2">
                    <Wrench className="h-5 w-5 mr-2 text-amber-500" />
                    <span className="font-medium">Manutenção</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Programação e acompanhamento
                  </p>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto py-6 justify-start text-left flex flex-col items-start"
                >
                  <div className="flex items-center mb-2">
                    <BarChart className="h-5 w-5 mr-2 text-green-500" />
                    <span className="font-medium">Relatórios</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Geração e análise de dados
                  </p>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto py-6 justify-start text-left flex flex-col items-start"
                >
                  <div className="flex items-center mb-2">
                    <Settings className="h-5 w-5 mr-2 text-gray-500" />
                    <span className="font-medium">Configurações</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Personalização do sistema
                  </p>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto py-6 justify-start text-left flex flex-col items-start"
                >
                  <div className="flex items-center mb-2">
                    <Shield className="h-5 w-5 mr-2 text-red-500" />
                    <span className="font-medium">Segurança</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Acesso e permissões
                  </p>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documentation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Documentação do Sistema</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-blue-500" />
                    Guias de Usuário
                  </h3>
                  <div className="space-y-3">
                    <Button
                      variant="link"
                      className="h-auto p-0 justify-start text-primary"
                    >
                      Manual Completo do Sistema (PDF)
                    </Button>
                    <Button
                      variant="link"
                      className="h-auto p-0 justify-start text-primary"
                    >
                      Guia Rápido para Novos Usuários
                    </Button>
                    <Button
                      variant="link"
                      className="h-auto p-0 justify-start text-primary"
                    >
                      Operações de Voo - Manual do Usuário
                    </Button>
                    <Button
                      variant="link"
                      className="h-auto p-0 justify-start text-primary"
                    >
                      Gestão de Tripulação - Manual do Usuário
                    </Button>
                    <Button
                      variant="link"
                      className="h-auto p-0 justify-start text-primary"
                    >
                      Manutenção de Aeronaves - Manual do Usuário
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Video className="h-5 w-5 mr-2 text-red-500" />
                    Tutoriais em Vídeo
                  </h3>
                  <div className="space-y-3">
                    <Button
                      variant="link"
                      className="h-auto p-0 justify-start text-primary"
                    >
                      Introdução ao Sistema
                    </Button>
                    <Button
                      variant="link"
                      className="h-auto p-0 justify-start text-primary"
                    >
                      Como Gerenciar Voos
                    </Button>
                    <Button
                      variant="link"
                      className="h-auto p-0 justify-start text-primary"
                    >
                      Alocação Eficiente de Tripulação
                    </Button>
                    <Button
                      variant="link"
                      className="h-auto p-0 justify-start text-primary"
                    >
                      Programação de Manutenção
                    </Button>
                    <Button
                      variant="link"
                      className="h-auto p-0 justify-start text-primary"
                    >
                      Geração e Análise de Relatórios
                    </Button>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Documentos Recentes
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <FileText className="h-5 w-5 mr-2 text-blue-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">
                        Atualização do Sistema v2.5 - Notas de Lançamento
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Publicado em 05/09/2023
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FileText className="h-5 w-5 mr-2 text-blue-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">
                        Guia de Melhores Práticas - Otimização de Rotas
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Publicado em 01/09/2023
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FileText className="h-5 w-5 mr-2 text-blue-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">
                        Procedimentos de Emergência - Atualização 2023
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Publicado em 15/08/2023
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Base de Conhecimento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Artigos Populares</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li>
                        <Button
                          variant="link"
                          className="h-auto p-0 justify-start text-primary"
                        >
                          Otimizando a eficiência de combustível
                        </Button>
                      </li>
                      <li>
                        <Button
                          variant="link"
                          className="h-auto p-0 justify-start text-primary"
                        >
                          Gerenciamento de atrasos em cascata
                        </Button>
                      </li>
                      <li>
                        <Button
                          variant="link"
                          className="h-auto p-0 justify-start text-primary"
                        >
                          Melhores práticas para alocação de tripulação
                        </Button>
                      </li>
                      <li>
                        <Button
                          variant="link"
                          className="h-auto p-0 justify-start text-primary"
                        >
                          Análise de dados para otimização de rotas
                        </Button>
                      </li>
                      <li>
                        <Button
                          variant="link"
                          className="h-auto p-0 justify-start text-primary"
                        >
                          Planejamento de manutenção preventiva
                        </Button>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Procedimentos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li>
                        <Button
                          variant="link"
                          className="h-auto p-0 justify-start text-primary"
                        >
                          Procedimento para alteração de rota
                        </Button>
                      </li>
                      <li>
                        <Button
                          variant="link"
                          className="h-auto p-0 justify-start text-primary"
                        >
                          Protocolo de resposta a incidentes
                        </Button>
                      </li>
                      <li>
                        <Button
                          variant="link"
                          className="h-auto p-0 justify-start text-primary"
                        >
                          Processo de aprovação de manutenção não programada
                        </Button>
                      </li>
                      <li>
                        <Button
                          variant="link"
                          className="h-auto p-0 justify-start text-primary"
                        >
                          Fluxo de trabalho para substituição de tripulação
                        </Button>
                      </li>
                      <li>
                        <Button
                          variant="link"
                          className="h-auto p-0 justify-start text-primary"
                        >
                          Procedimento para cancelamento de voo
                        </Button>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Recursos Técnicos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li>
                        <Button
                          variant="link"
                          className="h-auto p-0 justify-start text-primary"
                        >
                          Especificações técnicas das aeronaves
                        </Button>
                      </li>
                      <li>
                        <Button
                          variant="link"
                          className="h-auto p-0 justify-start text-primary"
                        >
                          Requisitos de qualificação da tripulação
                        </Button>
                      </li>
                      <li>
                        <Button
                          variant="link"
                          className="h-auto p-0 justify-start text-primary"
                        >
                          Guia de referência para códigos de aeroportos
                        </Button>
                      </li>
                      <li>
                        <Button
                          variant="link"
                          className="h-auto p-0 justify-start text-primary"
                        >
                          Glossário de termos técnicos
                        </Button>
                      </li>
                      <li>
                        <Button
                          variant="link"
                          className="h-auto p-0 justify-start text-primary"
                        >
                          Referência de APIs do sistema
                        </Button>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-blue-500" />
                  Chat ao Vivo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Converse com um especialista em tempo real para obter ajuda
                  imediata.
                </p>
                <div className="flex items-center text-sm mb-4">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  <span className="text-green-600">Disponível agora</span>
                </div>
                <p className="text-xs text-muted-foreground mb-4">
                  Tempo médio de resposta: &lt; 2 minutos
                </p>
                <Button className="w-full">Iniciar Chat</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-blue-500" />
                  Suporte por Telefone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Entre em contato com nossa equipe de suporte por telefone.
                </p>
                <div className="flex items-center text-sm mb-2">
                  <Clock className="h-4 w-4 mr-2 text-blue-500" />
                  <span>Seg-Sex: 8h às 20h</span>
                </div>
                <div className="text-lg font-medium mb-4">+55 11 4000-1234</div>
                <Button variant="outline" className="w-full">
                  Solicitar Ligação
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-blue-500" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Envie sua dúvida por email e receba uma resposta detalhada.
                </p>
                <div className="flex items-center text-sm mb-4">
                  <Clock className="h-4 w-4 mr-2 text-amber-500" />
                  <span>Tempo de resposta: até 24 horas</span>
                </div>
                <div className="text-medium mb-4">
                  suporte@latamairlines.com
                </div>
                <Button variant="outline" className="w-full">
                  Enviar Email
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Enviar uma Solicitação</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input id="name" placeholder="Seu nome" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu.email@exemplo.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Assunto</Label>
                  <Input id="subject" placeholder="Resumo da sua solicitação" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Select defaultValue="operations">
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="operations">
                        Operações de Voo
                      </SelectItem>
                      <SelectItem value="crew">Gestão de Tripulação</SelectItem>
                      <SelectItem value="maintenance">Manutenção</SelectItem>
                      <SelectItem value="reports">Relatórios</SelectItem>
                      <SelectItem value="system">
                        Problemas do Sistema
                      </SelectItem>
                      <SelectItem value="other">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Prioridade</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Selecione a prioridade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Baixa</SelectItem>
                      <SelectItem value="medium">Média</SelectItem>
                      <SelectItem value="high">Alta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea
                    id="message"
                    placeholder="Descreva sua solicitação em detalhes"
                    rows={5}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="attachments">Anexos (opcional)</Label>
                  <Input id="attachments" type="file" multiple />
                </div>

                <Button type="submit" className="w-full md:w-auto">
                  Enviar Solicitação
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tickets" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Meus Chamados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supportTickets.length > 0 ? (
                  supportTickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm text-muted-foreground">
                              {ticket.id}
                            </span>
                            {getStatusBadge(ticket.status)}
                            {getPriorityBadge(ticket.priority)}
                          </div>
                          <h3 className="font-semibold">{ticket.title}</h3>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>Criado: {ticket.created}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>Atualizado: {ticket.lastUpdate}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Ver Detalhes
                          </Button>
                          {ticket.status !== "resolved" && (
                            <Button size="sm">Atualizar</Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      Nenhum chamado encontrado
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Você ainda não abriu nenhum chamado de suporte.
                    </p>
                    <Button>Criar Novo Chamado</Button>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Novo Chamado
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Status do Sistema</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                    <span className="font-medium">Painel de Operações</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    Operacional
                  </Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                    <span className="font-medium">Sistema de Tripulação</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    Operacional
                  </Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2 text-amber-500" />
                    <span className="font-medium">Geração de Relatórios</span>
                  </div>
                  <Badge className="bg-amber-100 text-amber-800">
                    Degradado
                  </Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                    <span className="font-medium">Sistema de Manutenção</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    Operacional
                  </Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                    <span className="font-medium">API e Integrações</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    Operacional
                  </Badge>
                </div>
              </div>

              <div className="mt-6 text-sm text-muted-foreground">
                <p>Última atualização: Hoje, 15:30</p>
                <Button variant="link" className="p-0 h-auto">
                  Ver histórico de incidentes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Import missing components
const Plane = ({ className, size }: { className?: string; size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
  </svg>
);

const Users = ({ className, size }: { className?: string; size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const Wrench = ({ className, size }: { className?: string; size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

const Settings = ({
  className,
  size,
}: {
  className?: string;
  size?: number;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const Shield = ({ className, size }: { className?: string; size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

export default HelpSupport;
