import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Building2, Users, Target, Award, Globe, MapPin, Phone, Mail, Clock, Calendar, Briefcase, GraduationCap, Leaf, Shield, CheckCircle, DollarSign, Lightbulb } from "lucide-react";

const About = () => {
  const companyInfo = {
    name: "LATAM Airlines",
    description: "Líder em aviação na América Latina, oferecendo serviços de alta qualidade e conectividade global.",
    founded: "2016",
    headquarters: "Santiago, Chile",
    employees: "27,000+",
    destinations: "140+",
    aircraft: "300+",
    certifications: [
      "ISO 9001:2015",
      "ISO 14001:2015",
      "IATA Operational Safety Audit (IOSA)",
      "SMS - Safety Management System",
    ],
    values: [
      {
        title: "Segurança",
        description: "Compromisso com a segurança em todas as operações",
        icon: Shield,
      },
      {
        title: "Excelência",
        description: "Busca constante pela excelência em serviços",
        icon: Award,
      },
      {
        title: "Inovação",
        description: "Investimento em tecnologia e processos inovadores",
        icon: Lightbulb,
      },
      {
        title: "Sustentabilidade",
        description: "Compromisso com o meio ambiente e responsabilidade social",
        icon: Leaf,
      },
    ],
  };

  const team = [
    {
      id: 1,
      name: "Roberto Alves",
      role: "CEO",
      department: "Executivo",
      image: "https://github.com/shadcn.png",
      bio: "Mais de 20 anos de experiência na indústria de aviação",
    },
    {
      id: 2,
      name: "Maria Silva",
      role: "COO",
      department: "Operações",
      image: "https://github.com/shadcn.png",
      bio: "Especialista em operações aeronáuticas",
    },
    {
      id: 3,
      name: "Carlos Santos",
      role: "CFO",
      department: "Financeiro",
      image: "https://github.com/shadcn.png",
      bio: "Experiência em gestão financeira global",
    },
    {
      id: 4,
      name: "Ana Costa",
      role: "CTO",
      department: "Tecnologia",
      image: "https://github.com/shadcn.png",
      bio: "Líder em transformação digital",
    },
    {
      id: 5,
      name: "Pedro Lima",
      role: "CHRO",
      department: "Recursos Humanos",
      image: "https://github.com/shadcn.png",
      bio: "Especialista em gestão de talentos",
    },
    {
      id: 6,
      name: "Laura Mendes",
      role: "CSO",
      department: "Segurança",
      image: "https://github.com/shadcn.png",
      bio: "Experiência em segurança operacional",
    },
  ];

  const milestones = [
    {
      year: "2016",
      title: "Fusão LATAM",
      description: "Criação da LATAM Airlines através da fusão entre LAN e TAM",
    },
    {
      year: "2018",
      title: "Expansão Global",
      description: "Abertura de novas rotas internacionais",
    },
    {
      year: "2020",
      title: "Sustentabilidade",
      description: "Compromisso com carbono neutro até 2050",
    },
    {
      year: "2022",
      title: "Inovação Digital",
      description: "Lançamento de plataforma digital integrada",
    },
    {
      year: "2024",
      title: "Frota Moderna",
      description: "Renovação da frota com aeronaves mais eficientes",
    },
  ];

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

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Sobre a LATAM</h1>
        <p className="text-gray-500">Conheça nossa história, valores e equipe</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Nossa História</CardTitle>
              <CardDescription>
                Uma trajetória de excelência e inovação na aviação
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Building2 className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold">{companyInfo.name}</h3>
                    <p className="text-gray-500">{companyInfo.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-gray-500">Fundada em</p>
                      <p className="font-semibold">{companyInfo.founded}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-gray-500">Sede</p>
                      <p className="font-semibold">{companyInfo.headquarters}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-gray-500">Funcionários</p>
                      <p className="font-semibold">{companyInfo.employees}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Globe className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-gray-500">Destinos</p>
                      <p className="font-semibold">{companyInfo.destinations}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="text-lg font-semibold mb-4">Nossos Valores</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {companyInfo.values.map((value, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="p-2 bg-primary/10 rounded-full">
                          <value.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{value.title}</h4>
                          <p className="text-sm text-gray-500">{value.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="text-lg font-semibold mb-4">Certificações</h3>
                  <div className="flex flex-wrap gap-2">
                    {companyInfo.certifications.map((cert, index) => (
                      <div
                        key={index}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                      >
                        {cert}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Nossa Equipe</CardTitle>
              <CardDescription>
                Conheça os líderes que guiam nossa empresa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {team.map((member) => (
                  <div key={member.id} className="flex items-start space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={member.image} />
                      <AvatarFallback>
                        {member.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{member.name}</h3>
                      <p className="text-sm text-primary">{member.role}</p>
                      <p className="text-sm text-gray-500">{member.department}</p>
                      <p className="text-sm text-gray-500 mt-1">{member.bio}</p>
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
              <CardTitle>Marcos Históricos</CardTitle>
              <CardDescription>
                Momentos importantes em nossa trajetória
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{milestone.year}</p>
                      <p className="text-sm text-gray-500">{milestone.title}</p>
                      <p className="text-xs text-gray-400">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Contato</CardTitle>
              <CardDescription>
                Entre em contato conosco
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

                <div className="pt-4 border-t">
                  <h3 className="text-sm font-medium mb-2">Redes Sociais</h3>
                  <div className="flex space-x-4">
                    <Button variant="outline" size="icon">
                      <Globe className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Globe className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Globe className="h-4 w-4" />
                    </Button>
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

export default About; 