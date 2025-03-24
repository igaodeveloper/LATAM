import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Shield, Lock, Eye, FileText, Mail, Phone, Globe, Calendar, Users, Database } from "lucide-react";

const PrivacyPolicy = () => {
  const sections = [
    {
      id: "introduction",
      title: "Introdução",
      content: `Esta Política de Privacidade descreve como a LATAM Airlines ("nós", "nosso" ou "LATAM") coleta, usa, compartilha e protege suas informações pessoais quando você utiliza nossos serviços.

      Estamos comprometidos em proteger sua privacidade e garantir a segurança de seus dados pessoais. Esta política foi desenvolvida em conformidade com as leis de proteção de dados aplicáveis, incluindo a Lei Geral de Proteção de Dados (LGPD).`,
    },
    {
      id: "data-collection",
      title: "Coleta de Dados",
      content: `Coletamos diferentes tipos de informações pessoais, incluindo:

      • Informações de identificação (nome, CPF, RG, data de nascimento)
      • Informações de contato (email, telefone, endereço)
      • Informações de viagem (histórico de voos, preferências)
      • Informações de pagamento (dados de cartão de crédito, histórico de transações)
      • Informações de uso (dados de acesso, interações com o site)
      • Informações de localização (dados de GPS, histórico de localização)`,
    },
    {
      id: "data-usage",
      title: "Uso dos Dados",
      content: `Utilizamos suas informações pessoais para:

      • Processar suas reservas e pagamentos
      • Enviar confirmações e atualizações de viagem
      • Fornecer suporte ao cliente
      • Melhorar nossos serviços
      • Personalizar sua experiência
      • Enviar comunicações de marketing (com seu consentimento)
      • Cumprir obrigações legais
      • Prevenir fraudes e garantir segurança`,
    },
    {
      id: "data-sharing",
      title: "Compartilhamento de Dados",
      content: `Podemos compartilhar suas informações com:

      • Parceiros de negócios (hotéis, seguradoras)
      • Provedores de serviços (processamento de pagamentos, análise de dados)
      • Autoridades governamentais (quando exigido por lei)
      • Empresas do grupo LATAM
      
      Não vendemos suas informações pessoais para terceiros.`,
    },
    {
      id: "data-security",
      title: "Segurança dos Dados",
      content: `Implementamos medidas de segurança robustas para proteger suas informações:

      • Criptografia de dados
      • Controles de acesso
      • Monitoramento de segurança
      • Backup regular
      • Treinamento de funcionários
      • Auditorias de segurança`,
    },
    {
      id: "data-retention",
      title: "Retenção de Dados",
      content: `Mantemos suas informações pessoais apenas pelo tempo necessário para:

      • Cumprir nossas obrigações legais
      • Fornecer nossos serviços
      • Resolver disputas
      • Prevenir fraudes
      
      Após esse período, os dados são excluídos ou anonimizados.`,
    },
    {
      id: "user-rights",
      title: "Seus Direitos",
      content: `Você tem direito a:

      • Acessar seus dados pessoais
      • Corrigir informações imprecisas
      • Solicitar exclusão de dados
      • Revogar consentimento
      • Exportar seus dados
      • Obter informações sobre o tratamento
      • Solicitar portabilidade de dados`,
    },
    {
      id: "cookies",
      title: "Cookies e Tecnologias Similares",
      content: `Utilizamos cookies e tecnologias similares para:

      • Melhorar a experiência do usuário
      • Analisar o uso do site
      • Personalizar conteúdo
      • Lembrar suas preferências
      
      Você pode controlar o uso de cookies através das configurações do navegador.`,
    },
    {
      id: "children-privacy",
      title: "Privacidade de Crianças",
      content: `Nossos serviços não são destinados a crianças menores de 13 anos.

      • Não coletamos intencionalmente dados de crianças
      • Se você é pai/mãe e descobre que seu filho nos forneceu dados, entre em contato
      • Removeremos as informações de crianças de nossos sistemas`,
    },
    {
      id: "updates",
      title: "Atualizações da Política",
      content: `Podemos atualizar esta política periodicamente:

      • Notificaremos sobre mudanças significativas
      • Manteremos versões anteriores disponíveis
      • Continuar usando nossos serviços após mudanças indica aceitação`,
    },
    {
      id: "contact",
      title: "Contato",
      content: `Para questões sobre privacidade:

      • Email: privacidade@latam.com
      • Telefone: +56 2 565-1234
      • Endereço: Av. Presidente Riesco 5711, Las Condes, Santiago, Chile
      
      Você pode exercer seus direitos através desses canais.`,
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Política de Privacidade</h1>
        <p className="text-gray-500">
          Como protegemos e tratamos suas informações pessoais
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Política de Privacidade da LATAM</CardTitle>
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
                Acesse seções específicas da política
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
              <CardTitle>Recursos de Privacidade</CardTitle>
              <CardDescription>
                Ferramentas e informações adicionais
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  Configurações de Privacidade
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Lock className="h-4 w-4 mr-2" />
                  Gerenciar Consentimento
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Eye className="h-4 w-4 mr-2" />
                  Visualizar Dados
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Solicitar Relatório
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="h-4 w-4 mr-2" />
                  Contato DPO
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="h-4 w-4 mr-2" />
                  Suporte de Privacidade
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Globe className="h-4 w-4 mr-2" />
                  Versões Regionais
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Histórico de Atualizações
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Direitos do Usuário
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Database className="h-4 w-4 mr-2" />
                  Portabilidade de Dados
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  Segurança de Dados
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Lock className="h-4 w-4 mr-2" />
                  Criptografia
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Eye className="h-4 w-4 mr-2" />
                  Monitoramento
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Documentação
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="h-4 w-4 mr-2" />
                  Notificações
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="h-4 w-4 mr-2" />
                  Emergências
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Globe className="h-4 w-4 mr-2" />
                  Jurisdições
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
                  Armazenamento
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  Proteção
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Lock className="h-4 w-4 mr-2" />
                  Acesso
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Eye className="h-4 w-4 mr-2" />
                  Auditoria
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Relatórios
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="h-4 w-4 mr-2" />
                  Comunicação
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="h-4 w-4 mr-2" />
                  Contato
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Globe className="h-4 w-4 mr-2" />
                  Internacional
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Cronograma
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Equipe
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Database className="h-4 w-4 mr-2" />
                  Backup
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 