import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Search, HelpCircle, Plane, Ticket, CreditCard, Clock, User, Shield, Globe, Phone, Mail, Calendar, Users, Database, AlertCircle, Info, CheckCircle, XCircle } from "lucide-react";

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");

  const categories = [
    { id: "all", name: "Todas as Categorias" },
    { id: "booking", name: "Reservas" },
    { id: "flights", name: "Voos" },
    { id: "baggage", name: "Bagagem" },
    { id: "payment", name: "Pagamentos" },
    { id: "loyalty", name: "Programa de Fidelidade" },
    { id: "account", name: "Conta" },
    { id: "safety", name: "Segurança" },
    { id: "travel", name: "Viagens" },
    { id: "support", name: "Suporte" },
  ];

  const faqs = [
    {
      id: "booking-1",
      category: "booking",
      question: "Como faço uma reserva?",
      answer: `Para fazer uma reserva, você pode:

      • Acessar nosso site ou aplicativo
      • Escolher origem e destino
      • Selecionar datas
      • Escolher classe de serviço
      • Preencher dados dos passageiros
      • Realizar o pagamento`,
    },
    {
      id: "booking-2",
      category: "booking",
      question: "Posso modificar minha reserva?",
      answer: `Sim, você pode modificar sua reserva:

      • Através do site ou aplicativo
      • Pelo call center
      • Em nossos aeroportos
      
      Taxas podem ser aplicadas dependendo do tipo de tarifa.`,
    },
    {
      id: "flights-1",
      category: "flights",
      question: "Qual é a política de cancelamento?",
      answer: `Nossa política de cancelamento varia por tipo de tarifa:

      • Tarifas Flexíveis: Cancelamento gratuito
      • Tarifas Promocionais: Taxa de cancelamento
      • Tarifas Básicas: Não reembolsáveis
      
      Consulte os termos específicos da sua reserva.`,
    },
    {
      id: "flights-2",
      category: "flights",
      question: "Como faço check-in?",
      answer: `Você pode fazer check-in de várias formas:

      • Online (até 24h antes do voo)
      • Pelo aplicativo
      • Nos quiosques do aeroporto
      • No balcão de atendimento
      
      Recomendamos check-in online para maior comodidade.`,
    },
    {
      id: "baggage-1",
      category: "baggage",
      question: "Quais são as dimensões permitidas para bagagem?",
      answer: `As dimensões variam por classe de serviço:

      • Econômica: 23kg, 158cm (altura + largura + profundidade)
      • Premium Economy: 25kg, 158cm
      • Business: 32kg, 158cm
      
      Consulte nossa política completa de bagagem.`,
    },
    {
      id: "baggage-2",
      category: "baggage",
      question: "Posso despachar bagagem extra?",
      answer: `Sim, você pode despachar bagagem extra:

      • Durante a reserva
      • Até 24h antes do voo
      • No aeroporto (taxa adicional)
      
      Preços variam por rota e temporada.`,
    },
    {
      id: "payment-1",
      category: "payment",
      question: "Quais formas de pagamento são aceitas?",
      answer: `Aceitamos diversos métodos de pagamento:

      • Cartões de crédito e débito
      • Transferência bancária
      • PIX
      • PayPal
      • Vales-presente
      
      Alguns métodos podem ter taxas adicionais.`,
    },
    {
      id: "payment-2",
      category: "payment",
      question: "Como solicito um reembolso?",
      answer: `Para solicitar um reembolso:

      • Acesse sua reserva
      • Selecione a opção de reembolso
      • Preencha o formulário
      • Anexe documentos necessários
      
      O prazo de processamento é de até 30 dias.`,
    },
    {
      id: "loyalty-1",
      category: "loyalty",
      question: "Como acumulo pontos?",
      answer: `Você acumula pontos:

      • Em voos LATAM
      • Com parceiros do programa
      • Em compras com cartão LATAM
      • Em serviços adicionais
      
      A quantidade varia por classe e tarifa.`,
    },
    {
      id: "loyalty-2",
      category: "loyalty",
      question: "Como uso meus pontos?",
      answer: `Você pode usar seus pontos para:

      • Resgatar passagens
      • Upgrade de classe
      • Serviços adicionais
      • Produtos de parceiros
      
      Consulte a disponibilidade no momento da reserva.`,
    },
    {
      id: "account-1",
      category: "account",
      question: "Como recupero minha senha?",
      answer: `Para recuperar sua senha:

      • Clique em "Esqueci minha senha"
      • Digite seu email cadastrado
      • Siga as instruções enviadas
      • Crie uma nova senha
      
      O link expira em 24 horas.`,
    },
    {
      id: "account-2",
      category: "account",
      question: "Como atualizo meus dados?",
      answer: `Você pode atualizar seus dados:

      • No perfil da sua conta
      • Pelo aplicativo
      • Em nossos aeroportos
      • Pelo call center
      
      Mantenha seus dados sempre atualizados.`,
    },
    {
      id: "safety-1",
      category: "safety",
      question: "Quais são as medidas de segurança?",
      answer: `Implementamos várias medidas:

      • Verificação de identidade
      • Inspeção de bagagem
      • Monitoramento de segurança
      • Protocolos sanitários
      • Equipamentos de proteção
      
      Seguimos todas as regulamentações.`,
    },
    {
      id: "safety-2",
      category: "safety",
      question: "Como reporto um incidente?",
      answer: `Para reportar um incidente:

      • Pelo aplicativo
      • No site
      • Pelo call center
      • Em nossos aeroportos
      
      Respondemos em até 24 horas.`,
    },
    {
      id: "travel-1",
      category: "travel",
      question: "Preciso de visto?",
      answer: `A necessidade de visto depende:

      • Do seu país de origem
      • Do destino
      • Do tempo de permanência
      • Do propósito da viagem
      
      Consulte as autoridades locais.`,
    },
    {
      id: "travel-2",
      category: "travel",
      question: "Qual documentação é necessária?",
      answer: `Documentação necessária:

      • Documento de identidade válido
      • Passaporte (quando aplicável)
      • Visto (quando aplicável)
      • Certificado de vacinação
      • Teste de COVID-19 (quando aplicável)`,
    },
    {
      id: "support-1",
      category: "support",
      question: "Como entro em contato com o suporte?",
      answer: `Você pode nos contatar por:

      • Call center 24/7
      • Chat online
      • Email
      • Redes sociais
      • Aeroportos
      
      Tempo médio de resposta: 2 horas.`,
    },
    {
      id: "support-2",
      category: "support",
      question: "Como faço uma reclamação?",
      answer: `Para fazer uma reclamação:

      • Pelo site
      • Pelo aplicativo
      • Pelo call center
      • Por email
      • Em nossos aeroportos
      
      Respondemos em até 48 horas.`,
    },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === "all" || faq.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Perguntas Frequentes</h1>
        <p className="text-gray-500">
          Encontre respostas para as dúvidas mais comuns
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Perguntas Frequentes da LATAM</CardTitle>
              <CardDescription>
                Encontre respostas para suas dúvidas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-6">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Pesquisar perguntas..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="w-[200px]">
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
              </div>

              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="prose prose-sm max-w-none">
                        {faq.answer.split("\n").map((paragraph, index) => (
                          <p key={index} className="text-gray-600">
                            {paragraph.trim()}
                          </p>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Categorias</CardTitle>
              <CardDescription>
                Navegue por tópicos específicos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <Button
                    key={cat.id}
                    variant={category === cat.id ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setCategory(cat.id)}
                  >
                    {cat.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Recursos de Ajuda</CardTitle>
              <CardDescription>
                Ferramentas e informações adicionais
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

export default FAQ; 