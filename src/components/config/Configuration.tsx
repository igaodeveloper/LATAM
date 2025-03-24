import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Settings, Database, Users, Shield, Bell, Globe, Palette, Laptop, Server, Zap, Clock, Cloud } from "lucide-react";

const Configuration = () => {
  const [activeTab, setActiveTab] = useState("system");

  return (
    <div className="w-full h-full bg-background p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">Configurações</h1>
          <p className="text-muted-foreground">Configure o sistema de acordo com as necessidades da sua organização</p>
        </div>
        <Button>Salvar Alterações</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-1">
          <CardContent className="p-4">
            <Tabs orientation="vertical" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="flex flex-col items-start h-auto bg-transparent space-y-1">
                <TabsTrigger value="system" className="w-full justify-start px-2 py-1.5">
                  <Settings className="h-4 w-4 mr-2" />
                  Sistema
                </TabsTrigger>
                <TabsTrigger value="database" className="w-full justify-start px-2 py-1.5">
                  <Database className="h-4 w-4 mr-2" />
                  Banco de Dados
                </TabsTrigger>
                <TabsTrigger value="users" className="w-full justify-start px-2 py-1.5">
                  <Users className="h-4 w-4 mr-2" />
                  Usuários
                </TabsTrigger>
                <TabsTrigger value="permissions" className="w-full justify-start px-2 py-1.5">
                  <Shield className="h-4 w-4 mr-2" />
                  Permissões
                </TabsTrigger>
                <TabsTrigger value="notifications" className="w-full justify-start px-2 py-1.5">
                  <Bell className="h-4 w-4 mr-2" />
                  Notificações
                </TabsTrigger>
                <TabsTrigger value="localization" className="w-full justify-start px-2 py-1.5">
                  <Globe className="h-4 w-4 mr-2" />
                  Localização
                </TabsTrigger>
                <TabsTrigger value="appearance" className="w-full justify-start px-2 py-1.5">
                  <Palette className="h-4 w-4 mr-2" />
                  Aparência
                </TabsTrigger>
                <TabsTrigger value="integrations" className="w-full justify-start px-2 py-1.5">
                  <Zap className="h-4 w-4 mr-2" />
                  Integrações
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardContent className="p-6">
            <TabsContent value="system" className="space-y-6 mt-0">
              <div>
                <h2 className="text-xl font-semibold mb-4">Configurações do Sistema</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="system-name">Nome do Sistema</Label>
                      <Input id="system-name" defaultValue="LATAM Airlines - Sistema Operacional" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="system-version">Versão</Label>
                      <Input id="system-version" defaultValue="2.5.1" disabled />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="maintenance-mode">Modo de Manutenção</Label>
                      <p className="text-sm text-muted-foreground">Ativa o modo de manutenção, bloqueando o acesso ao sistema</p>
                    </div>
                    <Switch id="maintenance-mode" />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Tempo Limite de Sessão (minutos)</Label>
                    <div className="flex items-center gap-4">
                      <Slider defaultValue={[30]} max={120} step={5} className="flex-1" />
                      <Input id="session-timeout" type="number" defaultValue="30" className="w-20" />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label>Logs do Sistema</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="error-logs" />
                        <Label htmlFor="error-logs">Logs de Erro</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="access-logs" />
                        <Label htmlFor="access-logs">Logs de Acesso</Label>
                      </div>
                    </div>
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

export default Configuration;