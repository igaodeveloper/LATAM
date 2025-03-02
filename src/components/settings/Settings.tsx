import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Settings as SettingsIcon,
  Bell,
  Globe,
  Lock,
  Moon,
  Sun,
  User,
  Shield,
} from "lucide-react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [language, setLanguage] = useState("pt-BR");
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    flightUpdates: true,
    maintenanceAlerts: true,
    crewChanges: false,
    systemUpdates: true,
  });

  return (
    <div className="w-full h-full bg-background p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">Configurações</h1>
          <p className="text-muted-foreground">
            Gerencie as configurações do sistema
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-1">
          <CardContent className="p-4">
            <Tabs
              orientation="vertical"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="flex flex-col items-start h-auto bg-transparent space-y-1">
                <TabsTrigger
                  value="general"
                  className="w-full justify-start px-2 py-1.5"
                >
                  <SettingsIcon className="h-4 w-4 mr-2" />
                  Geral
                </TabsTrigger>
                <TabsTrigger
                  value="notifications"
                  className="w-full justify-start px-2 py-1.5"
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Notificações
                </TabsTrigger>
                <TabsTrigger
                  value="appearance"
                  className="w-full justify-start px-2 py-1.5"
                >
                  <Sun className="h-4 w-4 mr-2" />
                  Aparência
                </TabsTrigger>
                <TabsTrigger
                  value="language"
                  className="w-full justify-start px-2 py-1.5"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  Idioma
                </TabsTrigger>
                <TabsTrigger
                  value="security"
                  className="w-full justify-start px-2 py-1.5"
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Segurança
                </TabsTrigger>
                <TabsTrigger
                  value="privacy"
                  className="w-full justify-start px-2 py-1.5"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Privacidade
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardContent className="p-6">
            <TabsContent value="general" className="space-y-6 mt-0">
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Configurações Gerais
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-update">
                        Atualizações Automáticas
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Atualizar automaticamente os dados do sistema
                      </p>
                    </div>
                    <Switch id="auto-update" checked={true} />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="data-sync">Sincronização de Dados</Label>
                      <p className="text-sm text-muted-foreground">
                        Sincronizar dados entre dispositivos
                      </p>
                    </div>
                    <Switch id="data-sync" checked={true} />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="analytics">Análise de Uso</Label>
                      <p className="text-sm text-muted-foreground">
                        Permitir coleta de dados anônimos para melhorar o
                        sistema
                      </p>
                    </div>
                    <Switch id="analytics" checked={false} />
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label htmlFor="refresh-rate">
                      Taxa de Atualização (segundos)
                    </Label>
                    <Input
                      id="refresh-rate"
                      type="number"
                      defaultValue="30"
                      min="5"
                      max="300"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6 mt-0">
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Configurações de Notificações
                </h2>
                <div className="space-y-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">
                      Canais de Notificação
                    </h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-notifications">Email</Label>
                        <p className="text-sm text-muted-foreground">
                          Receber notificações por email
                        </p>
                      </div>
                      <Switch
                        id="email-notifications"
                        checked={notifications.email}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, email: checked })
                        }
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="push-notifications">
                          Notificações Push
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Receber notificações no navegador
                        </p>
                      </div>
                      <Switch
                        id="push-notifications"
                        checked={notifications.push}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, push: checked })
                        }
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="sms-notifications">SMS</Label>
                        <p className="text-sm text-muted-foreground">
                          Receber notificações por SMS
                        </p>
                      </div>
                      <Switch
                        id="sms-notifications"
                        checked={notifications.sms}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, sms: checked })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-4 mt-6">
                    <h3 className="text-lg font-medium">
                      Tipos de Notificação
                    </h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="flight-updates">
                          Atualizações de Voo
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Alterações de status, atrasos, cancelamentos
                        </p>
                      </div>
                      <Switch
                        id="flight-updates"
                        checked={notifications.flightUpdates}
                        onCheckedChange={(checked) =>
                          setNotifications({
                            ...notifications,
                            flightUpdates: checked,
                          })
                        }
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="maintenance-alerts">
                          Alertas de Manutenção
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Manutenções programadas e urgentes
                        </p>
                      </div>
                      <Switch
                        id="maintenance-alerts"
                        checked={notifications.maintenanceAlerts}
                        onCheckedChange={(checked) =>
                          setNotifications({
                            ...notifications,
                            maintenanceAlerts: checked,
                          })
                        }
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="crew-changes">
                          Alterações de Tripulação
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Mudanças nas escalas e alocações
                        </p>
                      </div>
                      <Switch
                        id="crew-changes"
                        checked={notifications.crewChanges}
                        onCheckedChange={(checked) =>
                          setNotifications({
                            ...notifications,
                            crewChanges: checked,
                          })
                        }
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="system-updates">
                          Atualizações do Sistema
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Novas funcionalidades e melhorias
                        </p>
                      </div>
                      <Switch
                        id="system-updates"
                        checked={notifications.systemUpdates}
                        onCheckedChange={(checked) =>
                          setNotifications({
                            ...notifications,
                            systemUpdates: checked,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="appearance" className="space-y-6 mt-0">
              <div>
                <h2 className="text-xl font-semibold mb-4">Aparência</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Tema</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant={theme === "light" ? "default" : "outline"}
                        className="justify-start"
                        onClick={() => setTheme("light")}
                      >
                        <Sun className="h-4 w-4 mr-2" />
                        Claro
                      </Button>
                      <Button
                        variant={theme === "dark" ? "default" : "outline"}
                        className="justify-start"
                        onClick={() => setTheme("dark")}
                      >
                        <Moon className="h-4 w-4 mr-2" />
                        Escuro
                      </Button>
                      <Button
                        variant={theme === "system" ? "default" : "outline"}
                        className="justify-start"
                        onClick={() => setTheme("system")}
                      >
                        <SettingsIcon className="h-4 w-4 mr-2" />
                        Sistema
                      </Button>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label htmlFor="font-size">Tamanho da Fonte</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger id="font-size">
                        <SelectValue placeholder="Selecione o tamanho da fonte" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Pequeno</SelectItem>
                        <SelectItem value="medium">Médio</SelectItem>
                        <SelectItem value="large">Grande</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="animations">Animações</Label>
                      <p className="text-sm text-muted-foreground">
                        Ativar animações na interface
                      </p>
                    </div>
                    <Switch id="animations" checked={true} />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="compact-view">Modo Compacto</Label>
                      <p className="text-sm text-muted-foreground">
                        Reduzir espaçamento entre elementos
                      </p>
                    </div>
                    <Switch id="compact-view" checked={false} />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="language" className="space-y-6 mt-0">
              <div>
                <h2 className="text-xl font-semibold mb-4">Idioma e Região</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="language-select">Idioma</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger id="language-select">
                        <SelectValue placeholder="Selecione o idioma" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pt-BR">
                          Português (Brasil)
                        </SelectItem>
                        <SelectItem value="en-US">English (US)</SelectItem>
                        <SelectItem value="es-ES">Español</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label htmlFor="date-format">Formato de Data</Label>
                    <Select defaultValue="dd/mm/yyyy">
                      <SelectTrigger id="date-format">
                        <SelectValue placeholder="Selecione o formato de data" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dd/mm/yyyy">DD/MM/AAAA</SelectItem>
                        <SelectItem value="mm/dd/yyyy">MM/DD/AAAA</SelectItem>
                        <SelectItem value="yyyy-mm-dd">AAAA-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label htmlFor="time-format">Formato de Hora</Label>
                    <Select defaultValue="24h">
                      <SelectTrigger id="time-format">
                        <SelectValue placeholder="Selecione o formato de hora" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="24h">24 horas</SelectItem>
                        <SelectItem value="12h">12 horas (AM/PM)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Fuso Horário</Label>
                    <Select defaultValue="America/Sao_Paulo">
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Selecione o fuso horário" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/Sao_Paulo">
                          Brasília (GMT-3)
                        </SelectItem>
                        <SelectItem value="America/Santiago">
                          Santiago (GMT-4)
                        </SelectItem>
                        <SelectItem value="America/Lima">
                          Lima (GMT-5)
                        </SelectItem>
                        <SelectItem value="America/Bogota">
                          Bogotá (GMT-5)
                        </SelectItem>
                        <SelectItem value="America/New_York">
                          Nova York (GMT-5)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="security" className="space-y-6 mt-0">
              <div>
                <h2 className="text-xl font-semibold mb-4">Segurança</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Senha Atual</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Nova Senha</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">
                      Confirmar Nova Senha
                    </Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  <Button>Alterar Senha</Button>

                  <Separator className="my-4" />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="two-factor">
                        Autenticação de Dois Fatores
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Aumenta a segurança da sua conta
                      </p>
                    </div>
                    <Switch id="two-factor" checked={false} />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="session-timeout">
                        Tempo Limite de Sessão
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Encerrar sessão após período de inatividade
                      </p>
                    </div>
                    <Select defaultValue="30">
                      <SelectTrigger id="session-timeout" className="w-[180px]">
                        <SelectValue placeholder="Selecione o tempo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutos</SelectItem>
                        <SelectItem value="30">30 minutos</SelectItem>
                        <SelectItem value="60">1 hora</SelectItem>
                        <SelectItem value="120">2 horas</SelectItem>
                        <SelectItem value="never">Nunca</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-6 mt-0">
              <div>
                <h2 className="text-xl font-semibold mb-4">Privacidade</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="data-collection">Coleta de Dados</Label>
                      <p className="text-sm text-muted-foreground">
                        Permitir coleta de dados de uso para melhorias
                      </p>
                    </div>
                    <Switch id="data-collection" checked={true} />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="cookies">Cookies</Label>
                      <p className="text-sm text-muted-foreground">
                        Permitir cookies para melhorar a experiência
                      </p>
                    </div>
                    <Switch id="cookies" checked={true} />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="location">Localização</Label>
                      <p className="text-sm text-muted-foreground">
                        Permitir acesso à sua localização
                      </p>
                    </div>
                    <Switch id="location" checked={false} />
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label>Exportar Dados</Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Baixe uma cópia dos seus dados pessoais
                    </p>
                    <Button variant="outline">Exportar Meus Dados</Button>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label>Excluir Conta</Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Esta ação não pode ser desfeita
                    </p>
                    <Button variant="destructive">Excluir Minha Conta</Button>
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

export default Settings;
