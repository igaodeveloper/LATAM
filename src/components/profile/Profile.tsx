import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Briefcase,
  Award,
  Clock,
  FileText,
  Shield,
} from "lucide-react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);

  // Mock user data
  const userData = {
    name: "Carlos Oliveira",
    role: "Gerente de Operações",
    email: "carlos.oliveira@latam.com",
    phone: "+55 11 98765-4321",
    location: "São Paulo, Brasil",
    department: "Operações de Voo",
    joinDate: "15/03/2018",
    employeeId: "LAT-78945",
    bio: "Profissional com mais de 10 anos de experiência em operações aéreas, especializado em otimização de rotas e gestão de tripulação.",
    certifications: [
      { name: "Gestão de Operações Aéreas", issuer: "IATA", date: "2020" },
      { name: "Gerenciamento de Crises", issuer: "ANAC", date: "2021" },
      { name: "Liderança em Aviação", issuer: "LATAM Academy", date: "2022" },
    ],
    recentActivity: [
      { action: "Atualizou status do voo LA1234", date: "Hoje, 14:32" },
      {
        action: "Aprovou escala de tripulação para 12/09",
        date: "Ontem, 16:45",
      },
      {
        action: "Gerou relatório de performance operacional",
        date: "10/09/2023, 09:15",
      },
    ],
    permissions: [
      { name: "Gerenciamento de Voos", level: "Administrador" },
      { name: "Alocação de Tripulação", level: "Editor" },
      { name: "Relatórios Financeiros", level: "Visualizador" },
      { name: "Manutenção de Aeronaves", level: "Editor" },
    ],
  };

  return (
    <div className="w-full h-full bg-background p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">Meu Perfil</h1>
          <p className="text-muted-foreground">
            Gerencie suas informações pessoais e preferências
          </p>
        </div>
        <Button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Salvar Alterações" : "Editar Perfil"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-1">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <Avatar className="h-32 w-32 mb-4">
              <AvatarImage
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=latam-carlos"
                alt={userData.name}
              />
              <AvatarFallback>CO</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold">{userData.name}</h2>
            <p className="text-muted-foreground mb-2">{userData.role}</p>
            <Badge className="mb-4">{userData.department}</Badge>

            <div className="w-full space-y-3 mt-4">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">{userData.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">{userData.phone}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">{userData.location}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">Desde {userData.joinDate}</span>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="w-full">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="personal">Perfil</TabsTrigger>
                  <TabsTrigger value="activity">Atividade</TabsTrigger>
                  <TabsTrigger value="access">Acesso</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardContent className="p-6">
            <TabsContent value="personal" className="mt-0 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Informações Pessoais
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="full-name">Nome Completo</Label>
                    <Input
                      id="full-name"
                      defaultValue={userData.name}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={userData.email}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      defaultValue={userData.phone}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Localização</Label>
                    <Input
                      id="location"
                      defaultValue={userData.location}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Informações Profissionais
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">Cargo</Label>
                    <Input
                      id="role"
                      defaultValue={userData.role}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Departamento</Label>
                    <Input
                      id="department"
                      defaultValue={userData.department}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employee-id">ID de Funcionário</Label>
                    <Input
                      id="employee-id"
                      defaultValue={userData.employeeId}
                      disabled
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="join-date">Data de Admissão</Label>
                    <Input
                      id="join-date"
                      defaultValue={userData.joinDate}
                      disabled
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-4">Biografia</h3>
                <div className="space-y-2">
                  <Textarea
                    id="bio"
                    defaultValue={userData.bio}
                    disabled={!isEditing}
                    rows={4}
                  />
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-4">Certificações</h3>
                <div className="space-y-4">
                  {userData.certifications.map((cert, index) => (
                    <div key={index} className="flex items-start">
                      <Award className="h-5 w-5 mr-2 text-blue-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">{cert.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {cert.issuer} • {cert.date}
                        </p>
                      </div>
                    </div>
                  ))}
                  {isEditing && (
                    <Button variant="outline" size="sm" className="mt-2">
                      <Plus className="h-4 w-4 mr-2" /> Adicionar Certificação
                    </Button>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="activity" className="mt-0 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Atividade Recente
                </h3>
                <div className="space-y-4">
                  {userData.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start">
                      <Clock className="h-5 w-5 mr-2 text-blue-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">{activity.action}</h4>
                        <p className="text-sm text-muted-foreground">
                          {activity.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Histórico de Login
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <User className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Login bem-sucedido</h4>
                      <p className="text-sm text-muted-foreground">
                        Hoje, 08:45 • São Paulo, Brasil • Chrome em Windows
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <User className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Login bem-sucedido</h4>
                      <p className="text-sm text-muted-foreground">
                        Ontem, 17:30 • São Paulo, Brasil • Safari em iPhone
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <User className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Login bem-sucedido</h4>
                      <p className="text-sm text-muted-foreground">
                        10/09/2023, 09:12 • São Paulo, Brasil • Chrome em
                        Windows
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Relatórios Gerados
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <FileText className="h-5 w-5 mr-2 text-blue-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">
                        Relatório de Performance Operacional
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        10/09/2023, 09:15
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FileText className="h-5 w-5 mr-2 text-blue-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">
                        Análise de Eficiência de Rotas
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        05/09/2023, 14:22
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FileText className="h-5 w-5 mr-2 text-blue-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">
                        Relatório de Utilização de Aeronaves
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        01/09/2023, 11:05
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="access" className="mt-0 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Permissões e Acesso
                </h3>
                <div className="space-y-4">
                  {userData.permissions.map((permission, index) => (
                    <div
                      key={index}
                      className="flex items-start justify-between"
                    >
                      <div className="flex items-start">
                        <Shield className="h-5 w-5 mr-2 text-blue-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">{permission.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Nível de acesso: {permission.level}
                          </p>
                        </div>
                      </div>
                      {isEditing && (
                        <Button variant="ghost" size="sm">
                          Editar
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Dispositivos Conectados
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start">
                      <Briefcase className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">
                          Windows PC (Este dispositivo)
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          São Paulo, Brasil • Último acesso: Agora
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      Desconectar
                    </Button>
                  </div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start">
                      <Briefcase className="h-5 w-5 mr-2 text-blue-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">iPhone</h4>
                        <p className="text-sm text-muted-foreground">
                          São Paulo, Brasil • Último acesso: Ontem, 17:30
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      Desconectar
                    </Button>
                  </div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start">
                      <Briefcase className="h-5 w-5 mr-2 text-blue-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">MacBook Pro</h4>
                        <p className="text-sm text-muted-foreground">
                          São Paulo, Brasil • Último acesso: 08/09/2023, 10:15
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      Desconectar
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Segurança da Conta
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Alterar Senha</h4>
                      <p className="text-sm text-muted-foreground">
                        Atualize sua senha para maior segurança
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Alterar
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">
                        Autenticação de Dois Fatores
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Adicione uma camada extra de segurança
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Configurar
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Sessões Ativas</h4>
                      <p className="text-sm text-muted-foreground">
                        Gerencie suas sessões ativas
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Visualizar
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
