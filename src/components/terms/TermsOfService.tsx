import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { FileText, Book, Scale, Shield, Lock, Globe, Calendar, Users, Database, Mail, Phone, AlertCircle, Info, CheckCircle, XCircle } from "lucide-react";

const TermsOfService = () => {
  const sections = [
    {
      id: "introduction",
      title: "Introdução",
      content: `Bem-vindo aos Termos de Serviço da LATAM Airlines ("nós", "nosso" ou "LATAM"). Ao acessar ou usar nossos serviços, você concorda em cumprir estes termos.

      Estes termos regem sua relação com a LATAM e o uso de nossos serviços, incluindo reservas, voos, programas de fidelidade e outros serviços relacionados.`,
    },
    {
      id: "definitions",
      title: "Definições",
      content: `Para os fins destes termos:

      • "Serviços" refere-se a todos os serviços oferecidos pela LATAM
      • "Usuário" refere-se a qualquer pessoa que utilize nossos serviços
      • "Conta" refere-se à sua conta LATAM
      • "Conteúdo" refere-se a todo o material disponível em nossos serviços
      • "Propriedade Intelectual" refere-se a todas as marcas, logos e direitos autorais`,
    },
    {
      id: "account-terms",
      title: "Termos da Conta",
      content: `Para usar nossos serviços, você deve:

      • Ter pelo menos 18 anos de idade
      • Fornecer informações precisas e completas
      • Manter suas credenciais seguras
      • Notificar-nos sobre qualquer uso não autorizado
      • Cumprir todas as leis aplicáveis`,
    },
    {
      id: "booking-terms",
      title: "Termos de Reserva",
      content: `Ao fazer uma reserva, você concorda em:

      • Fornecer informações precisas
      • Pagar todas as taxas aplicáveis
      • Seguir as políticas de bagagem
      • Cumprir os requisitos de documentação
      • Respeitar as regras de cancelamento`,
    },
    {
      id: "payment-terms",
      title: "Termos de Pagamento",
      content: `Em relação aos pagamentos:

      • Aceitamos vários métodos de pagamento
      • Os preços podem ser alterados sem aviso prévio
      • As taxas são calculadas no momento da reserva
      • Reembolsos seguem nossa política específica
      • Podemos recusar pagamentos por razões de segurança`,
    },
    {
      id: "cancellation-terms",
      title: "Termos de Cancelamento",
      content: `Para cancelamentos:

      • As políticas variam por tipo de tarifa
      • Taxas de cancelamento podem ser aplicadas
      • Reembolsos podem levar até 30 dias
      • Algumas tarifas são não reembolsáveis
      • Consulte a política específica da sua reserva`,
    },
    {
      id: "baggage-terms",
      title: "Termos de Bagagem",
      content: `Em relação à bagagem:

      • Limites variam por classe de serviço
      • Restrições de tamanho e peso aplicam-se
      • Itens proibidos devem ser declarados
      • Responsabilidade limitada aplica-se
      • Seguro adicional disponível`,
    },
    {
      id: "loyalty-terms",
      title: "Termos do Programa de Fidelidade",
      content: `Para o programa de fidelidade:

      • Pontos têm validade
      • Regras de acumulação aplicam-se
      • Benefícios podem ser alterados
      • Transferências têm restrições
      • Fraude resulta em cancelamento`,
    },
    {
      id: "intellectual-property",
      title: "Propriedade Intelectual",
      content: `Sobre propriedade intelectual:

      • Todo o conteúdo é protegido
      • Uso não autorizado é proibido
      • Marcas registradas devem ser respeitadas
      • Reprodução requer permissão
      • Penalidades podem ser aplicadas`,
    },
    {
      id: "limitation-of-liability",
      title: "Limitação de Responsabilidade",
      content: `Nossa responsabilidade é limitada a:

      • Danos diretos comprovados
      • Limites estabelecidos por lei
      • Exclusões específicas aplicam-se
      • Força maior não é coberta
      • Seguro adicional recomendado`,
    },
    {
      id: "dispute-resolution",
      title: "Resolução de Disputas",
      content: `Para resolver disputas:

      • Mediação é o primeiro passo
      • Arbitragem pode ser necessária
      • Jurisdição específica aplica-se
      • Prazos devem ser respeitados
      • Custos podem ser compartilhados`,
    },
    {
      id: "changes-to-terms",
      title: "Alterações nos Termos",
      content: `Sobre alterações nos termos:

      • Podemos modificar a qualquer momento
      • Notificação será fornecida
      • Uso continuado indica aceitação
      • Versões anteriores disponíveis
      • Direito de recusar alterações`,
    },
    {
      id: "contact",
      title: "Contato",
      content: `Para questões sobre os termos:

      • Email: juridico@latam.com
      • Telefone: +56 2 565-1234
      • Endereço: Av. Presidente Riesco 5711, Las Condes, Santiago, Chile
      
      Entre em contato para esclarecimentos.`,
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Termos de Serviço</h1>
        <p className="text-gray-500">
          Condições e regras para uso dos nossos serviços
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Termos de Serviço da LATAM</CardTitle>
              <CardDescription>
                Última atualização: 15 de março de 2024
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {sections.map((section) => (
                  <div key={section.id} className="space-y-4">
                    <h2 className="text-xl font-semibold">{section.title}</h2>
                    <div className="prose prose-sm max-w-none">
                      {section.content.split("\n").map((paragraph, index) => (
                        <p key={index} className="text-gray-600">
                          {paragraph.trim()}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Navegação Rápida</CardTitle>
              <CardDescription>
                Acesse seções específicas dos termos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {sections.map((section) => (
                  <Button
                    key={section.id}
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {
                      document
                        .getElementById(section.id)
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    {section.title}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Recursos Legais</CardTitle>
              <CardDescription>
                Documentos e informações adicionais
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Documentos Legais
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Book className="h-4 w-4 mr-2" />
                  Guias e Manuais
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Scale className="h-4 w-4 mr-2" />
                  Políticas e Regras
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  Proteção Legal
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Lock className="h-4 w-4 mr-2" />
                  Segurança Jurídica
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Globe className="h-4 w-4 mr-2" />
                  Jurisdições
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Prazos Legais
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Partes Interessadas
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Database className="h-4 w-4 mr-2" />
                  Registros Legais
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="h-4 w-4 mr-2" />
                  Comunicação Legal
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="h-4 w-4 mr-2" />
                  Suporte Jurídico
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Avisos Legais
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Info className="h-4 w-4 mr-2" />
                  Informações Jurídicas
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Conformidade Legal
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <XCircle className="h-4 w-4 mr-2" />
                  Violações
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService; 