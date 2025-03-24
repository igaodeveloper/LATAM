import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Switch } from "../ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { 
  Search, Save, Bell, Globe, Lock, User, Mail, Database, Shield, 
  BellRing, BellOff, DollarSign, Palette, Sliders, Zap, Cloud, Key, 
  History, Trash2, AlertCircle, CheckCircle2, XCircle, Info, 
  ChevronRight, ChevronDown, Bug, Activity, Beaker,
  Wrench,
  Fingerprint
} from "lucide-react";
import { toast } from "sonner";
import { Progress } from "../ui/progress";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

// Types for settings
interface SettingsState {
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    maintenance: boolean;
    safety: boolean;
    financial: boolean;
    marketing: boolean;
    updates: boolean;
    alerts: boolean;
  };
  preferences: {
    language: string;
    timezone: string;
    dateFormat: string;
    timeFormat: string;
    theme: string;
    fontSize: string;
    contrast: string;
    animations: boolean;
  };
  security: {
    twoFactor: boolean;
    sessionTimeout: number;
    passwordExpiry: number;
    loginAttempts: number;
    biometric: boolean;
    encryption: boolean;
    auditLog: boolean;
    backupFrequency: string;
  };
  integrations: {
    maintenance: boolean;
    inventory: boolean;
    financial: boolean;
    safety: boolean;
    analytics: boolean;
    reporting: boolean;
    api: boolean;
    webhooks: boolean;
  };
  advanced: {
    debugMode: boolean;
    performanceMode: boolean;
    cacheSize: number;
    logLevel: string;
    autoUpdate: boolean;
    telemetry: boolean;
    experimental: boolean;
  };
}

const Settings = () => {
  // State management
  const [settings, setSettings] = useState<SettingsState>({
    notifications: {
      email: true,
      push: true,
      sms: false,
      maintenance: true,
      safety: true,
      financial: false,
      marketing: false,
      updates: true,
      alerts: true,
    },
    preferences: {
      language: "pt-BR",
      timezone: "America/Sao_Paulo",
      dateFormat: "dd/MM/yyyy",
      timeFormat: "24h",
      theme: "light",
      fontSize: "medium",
      contrast: "normal",
      animations: true,
    },
    security: {
      twoFactor: true,
      sessionTimeout: 30,
      passwordExpiry: 90,
      loginAttempts: 5,
      biometric: false,
      encryption: true,
      auditLog: true,
      backupFrequency: "daily",
    },
    integrations: {
      maintenance: true,
      inventory: true,
      financial: false,
      safety: true,
      analytics: true,
      reporting: true,
      api: false,
      webhooks: false,
    },
    advanced: {
      debugMode: false,
      performanceMode: false,
      cacheSize: 100,
      logLevel: "info",
      autoUpdate: true,
      telemetry: false,
      experimental: false,
    },
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("notifications");
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Load settings from localStorage on component mount
  useEffect(() => {
    const loadSettings = () => {
      try {
        const savedSettings = localStorage.getItem("appSettings");
        if (savedSettings) {
          setSettings(JSON.parse(savedSettings));
        }
      } catch (error) {
        console.error("Error loading settings:", error);
        toast.error("Erro ao carregar configurações");
      }
    };
    loadSettings();
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("appSettings", JSON.stringify(settings));
      setHasChanges(true);
    } catch (error) {
      console.error("Error saving settings:", error);
    }
  }, [settings]);

  // Handle settings updates
  const updateSettings = (section: keyof SettingsState, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // Handle save
  const handleSave = async () => {
    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem("appSettings", JSON.stringify(settings));
      setHasChanges(false);
      toast.success("Configurações salvas com sucesso!");
    } catch (error) {
      toast.error("Erro ao salvar configurações");
    } finally {
      setSaving(false);
    }
  };

  // Handle reset
  const handleReset = () => {
    setShowResetDialog(true);
  };

  const confirmReset = () => {
    const defaultSettings: SettingsState = {
      notifications: {
        email: true,
        push: true,
        sms: false,
        maintenance: true,
        safety: true,
        financial: false,
        marketing: false,
        updates: true,
        alerts: true,
      },
      preferences: {
        language: "pt-BR",
        timezone: "America/Sao_Paulo",
        dateFormat: "dd/MM/yyyy",
        timeFormat: "24h",
        theme: "light",
        fontSize: "medium",
        contrast: "normal",
        animations: true,
      },
      security: {
        twoFactor: true,
        sessionTimeout: 30,
        passwordExpiry: 90,
        loginAttempts: 5,
        biometric: false,
        encryption: true,
        auditLog: true,
        backupFrequency: "daily",
      },
      integrations: {
        maintenance: true,
        inventory: true,
        financial: false,
        safety: true,
        analytics: true,
        reporting: true,
        api: false,
        webhooks: false,
      },
      advanced: {
        debugMode: false,
        performanceMode: false,
        cacheSize: 100,
        logLevel: "info",
        autoUpdate: true,
        telemetry: false,
        experimental: false,
      },
    };

    setSettings(defaultSettings);
    localStorage.setItem("appSettings", JSON.stringify(defaultSettings));
    setHasChanges(false);
    setShowResetDialog(false);
    toast.success("Configurações redefinidas com sucesso!");
  };

  // Apply theme changes
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", settings.preferences.theme);
  }, [settings.preferences.theme]);

  // Apply font size changes
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-font-size", settings.preferences.fontSize);
  }, [settings.preferences.fontSize]);

  // Apply contrast changes
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-contrast", settings.preferences.contrast);
  }, [settings.preferences.contrast]);

  return (
    <div className="w-full h-full bg-background">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">Configurações</h1>
          <p className="text-muted-foreground">Gerencie suas preferências e configurações do sistema</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset}>
            <Trash2 className="h-4 w-4 mr-2" />
            Redefinir
          </Button>
          <Button onClick={handleSave} disabled={saving || !hasChanges}>
            {saving ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                Salvando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Salvar Alterações
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="notifications" className="space-y-6" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="notifications" className="flex items-center space-x-2">
            <Bell className="h-4 w-4" />
            <span>Notificações</span>
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center space-x-2">
            <Globe className="h-4 w-4" />
            <span>Preferências</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center space-x-2">
            <Lock className="h-4 w-4" />
            <span>Segurança</span>
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center space-x-2">
            <Database className="h-4 w-4" />
            <span>Integrações</span>
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center space-x-2">
            <Sliders className="h-4 w-4" />
            <span>Avançado</span>
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="h-[calc(100vh-300px)]">
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Notificação</CardTitle>
                <CardDescription>
                  Gerencie como e quando você recebe notificações
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <Label>Notificações por Email</Label>
                    </div>
                    <Switch
                      checked={settings.notifications.email}
                      onCheckedChange={(checked) =>
                        updateSettings("notifications", "email", checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <BellRing className="h-4 w-4" />
                      <Label>Notificações Push</Label>
                    </div>
                    <Switch
                      checked={settings.notifications.push}
                      onCheckedChange={(checked) =>
                        updateSettings("notifications", "push", checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <BellOff className="h-4 w-4" />
                      <Label>Notificações por SMS</Label>
                    </div>
                    <Switch
                      checked={settings.notifications.sms}
                      onCheckedChange={(checked) =>
                        updateSettings("notifications", "sms", checked)
                      }
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Tipos de Notificação</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center space-x-2">
                        <Wrench className="h-4 w-4" />
                        <Label>Manutenção</Label>
                      </div>
                      <Switch
                        checked={settings.notifications.maintenance}
                        onCheckedChange={(checked) =>
                          updateSettings("notifications", "maintenance", checked)
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4" />
                        <Label>Segurança</Label>
                      </div>
                      <Switch
                        checked={settings.notifications.safety}
                        onCheckedChange={(checked) =>
                          updateSettings("notifications", "safety", checked)
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4" />
                        <Label>Financeiro</Label>
                      </div>
                      <Switch
                        checked={settings.notifications.financial}
                        onCheckedChange={(checked) =>
                          updateSettings("notifications", "financial", checked)
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center space-x-2">
                        <Zap className="h-4 w-4" />
                        <Label>Atualizações</Label>
                      </div>
                      <Switch
                        checked={settings.notifications.updates}
                        onCheckedChange={(checked) =>
                          updateSettings("notifications", "updates", checked)
                        }
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Preferências do Sistema</CardTitle>
                <CardDescription>
                  Configure suas preferências de idioma, fuso horário e aparência
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Idioma</Label>
                      <Select
                        value={settings.preferences.language}
                        onValueChange={(value) =>
                          updateSettings("preferences", "language", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o idioma" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                          <SelectItem value="en-US">English (US)</SelectItem>
                          <SelectItem value="es-ES">Español</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Fuso Horário</Label>
                      <Select
                        value={settings.preferences.timezone}
                        onValueChange={(value) =>
                          updateSettings("preferences", "timezone", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o fuso horário" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="America/Sao_Paulo">São Paulo (GMT-3)</SelectItem>
                          <SelectItem value="America/New_York">New York (GMT-4)</SelectItem>
                          <SelectItem value="Europe/London">London (GMT+1)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Formato de Data</Label>
                      <Select
                        value={settings.preferences.dateFormat}
                        onValueChange={(value) =>
                          updateSettings("preferences", "dateFormat", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o formato" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dd/MM/yyyy">DD/MM/YYYY</SelectItem>
                          <SelectItem value="MM/dd/yyyy">MM/DD/YYYY</SelectItem>
                          <SelectItem value="yyyy-MM-dd">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Formato de Hora</Label>
                      <Select
                        value={settings.preferences.timeFormat}
                        onValueChange={(value) =>
                          updateSettings("preferences", "timeFormat", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o formato" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="24h">24 horas</SelectItem>
                          <SelectItem value="12h">12 horas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Tema</Label>
                      <Select
                        value={settings.preferences.theme}
                        onValueChange={(value) =>
                          updateSettings("preferences", "theme", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tema" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Claro</SelectItem>
                          <SelectItem value="dark">Escuro</SelectItem>
                          <SelectItem value="system">Sistema</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Tamanho da Fonte</Label>
                      <Select
                        value={settings.preferences.fontSize}
                        onValueChange={(value) =>
                          updateSettings("preferences", "fontSize", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tamanho" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Pequeno</SelectItem>
                          <SelectItem value="medium">Médio</SelectItem>
                          <SelectItem value="large">Grande</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Acessibilidade</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Contraste</Label>
                      <Select
                        value={settings.preferences.contrast}
                        onValueChange={(value) =>
                          updateSettings("preferences", "contrast", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o contraste" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="high">Alto</SelectItem>
                          <SelectItem value="inverted">Invertido</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Segurança</CardTitle>
                <CardDescription>
                  Gerencie suas configurações de segurança e privacidade
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center space-x-2">
                      <Key className="h-4 w-4" />
                      <Label>Autenticação em Dois Fatores</Label>
                    </div>
                    <Switch
                      checked={settings.security.twoFactor}
                      onCheckedChange={(checked) =>
                        updateSettings("security", "twoFactor", checked)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Timeout da Sessão (minutos)</Label>
                    <Input
                      type="number"
                      value={settings.security.sessionTimeout}
                      onChange={(e) =>
                        updateSettings("security", "sessionTimeout", parseInt(e.target.value))
                      }
                      min={1}
                      max={120}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Expiração da Senha (dias)</Label>
                    <Input
                      type="number"
                      value={settings.security.passwordExpiry}
                      onChange={(e) =>
                        updateSettings("security", "passwordExpiry", parseInt(e.target.value))
                      }
                      min={1}
                      max={365}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Tentativas de Login</Label>
                    <Input
                      type="number"
                      value={settings.security.loginAttempts}
                      onChange={(e) =>
                        updateSettings("security", "loginAttempts", parseInt(e.target.value))
                      }
                      min={1}
                      max={10}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Recursos Avançados de Segurança</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center space-x-2">
                        <Fingerprint className="h-4 w-4" />
                        <Label>Autenticação Biométrica</Label>
                      </div>
                      <Switch
                        checked={settings.security.biometric}
                        onCheckedChange={(checked) =>
                          updateSettings("security", "biometric", checked)
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center space-x-2">
                        <Lock className="h-4 w-4" />
                        <Label>Criptografia de Dados</Label>
                      </div>
                      <Switch
                        checked={settings.security.encryption}
                        onCheckedChange={(checked) =>
                          updateSettings("security", "encryption", checked)
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center space-x-2">
                        <History className="h-4 w-4" />
                        <Label>Log de Auditoria</Label>
                      </div>
                      <Switch
                        checked={settings.security.auditLog}
                        onCheckedChange={(checked) =>
                          updateSettings("security", "auditLog", checked)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Frequência de Backup</Label>
                      <Select
                        value={settings.security.backupFrequency}
                        onValueChange={(value) =>
                          updateSettings("security", "backupFrequency", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a frequência" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Diário</SelectItem>
                          <SelectItem value="weekly">Semanal</SelectItem>
                          <SelectItem value="monthly">Mensal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Integrações do Sistema</CardTitle>
                <CardDescription>
                  Gerencie as integrações com outros sistemas e serviços
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center space-x-2">
                      <Wrench className="h-4 w-4" />
                      <Label>Manutenção</Label>
                    </div>
                    <Switch
                      checked={settings.integrations.maintenance}
                      onCheckedChange={(checked) =>
                        updateSettings("integrations", "maintenance", checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center space-x-2">
                      <Database className="h-4 w-4" />
                      <Label>Inventário</Label>
                    </div>
                    <Switch
                      checked={settings.integrations.inventory}
                      onCheckedChange={(checked) =>
                        updateSettings("integrations", "inventory", checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4" />
                      <Label>Financeiro</Label>
                    </div>
                    <Switch
                      checked={settings.integrations.financial}
                      onCheckedChange={(checked) =>
                        updateSettings("integrations", "financial", checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4" />
                      <Label>Segurança</Label>
                    </div>
                    <Switch
                      checked={settings.integrations.safety}
                      onCheckedChange={(checked) =>
                        updateSettings("integrations", "safety", checked)
                      }
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">APIs e Webhooks</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center space-x-2">
                        <Cloud className="h-4 w-4" />
                        <Label>API REST</Label>
                      </div>
                      <Switch
                        checked={settings.integrations.api}
                        onCheckedChange={(checked) =>
                          updateSettings("integrations", "api", checked)
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center space-x-2">
                        <Zap className="h-4 w-4" />
                        <Label>Webhooks</Label>
                      </div>
                      <Switch
                        checked={settings.integrations.webhooks}
                        onCheckedChange={(checked) =>
                          updateSettings("integrations", "webhooks", checked)
                        }
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações Avançadas</CardTitle>
                <CardDescription>
                  Ajustes avançados do sistema para usuários experientes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Atenção</AlertTitle>
                  <AlertDescription>
                    As configurações avançadas podem afetar o desempenho e a estabilidade do sistema.
                    Use com cautela.
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center space-x-2">
                      <Bug className="h-4 w-4" />
                      <Label>Modo Debug</Label>
                    </div>
                    <Switch
                      checked={settings.advanced.debugMode}
                      onCheckedChange={(checked) =>
                        updateSettings("advanced", "debugMode", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center space-x-2">
                      <Zap className="h-4 w-4" />
                      <Label>Modo de Alto Desempenho</Label>
                    </div>
                    <Switch
                      checked={settings.advanced.performanceMode}
                      onCheckedChange={(checked) =>
                        updateSettings("advanced", "performanceMode", checked)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Tamanho do Cache (MB)</Label>
                    <Input
                      type="number"
                      value={settings.advanced.cacheSize}
                      onChange={(e) =>
                        updateSettings("advanced", "cacheSize", parseInt(e.target.value))
                      }
                      min={50}
                      max={1000}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Nível de Log</Label>
                    <Select
                      value={settings.advanced.logLevel}
                      onValueChange={(value) =>
                        updateSettings("advanced", "logLevel", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o nível" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="debug">Debug</SelectItem>
                        <SelectItem value="info">Info</SelectItem>
                        <SelectItem value="warn">Warn</SelectItem>
                        <SelectItem value="error">Error</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center space-x-2">
                      <Cloud className="h-4 w-4" />
                      <Label>Atualização Automática</Label>
                    </div>
                    <Switch
                      checked={settings.advanced.autoUpdate}
                      onCheckedChange={(checked) =>
                        updateSettings("advanced", "autoUpdate", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center space-x-2">
                      <Activity className="h-4 w-4" />
                      <Label>Telemetria</Label>
                    </div>
                    <Switch
                      checked={settings.advanced.telemetry}
                      onCheckedChange={(checked) =>
                        updateSettings("advanced", "telemetry", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center space-x-2">
                      <Beaker className="h-4 w-4" />
                      <Label>Recursos Experimentais</Label>
                    </div>
                    <Switch
                      checked={settings.advanced.experimental}
                      onCheckedChange={(checked) =>
                        updateSettings("advanced", "experimental", checked)
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </ScrollArea>
      </Tabs>

      <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Redefinição</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja redefinir todas as configurações para os valores padrão?
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmReset}>Confirmar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Settings;
