import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Bell,
  Lock,
  Key,
  LogOut,
  Edit,
  Save,
  Upload,
  Trash,
  Clock,
  Award,
  Briefcase,
  FileText,
  CheckCircle,
  AlertTriangle,
  Plane,
  Camera,
  Download,
  Settings,
  CreditCard,
  Languages,
  BookOpen,
  Headphones,
  MessageSquare,
  Activity,
  Heart,
  Star,
  Zap,
  Clipboard,
  PieChart,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const ModernProfile = () => {
  const { user, profile, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(
    "https://api.dicebear.com/7.x/avataaars/svg?seed=latam-pilot"
  );

  const [userData, setUserData] = useState({
    name: "Carlos Oliveira",
    role: "Piloto Sênior",
    email: "carlos.oliveira@latam.com",
    phone: "+55 11 98765-4321",
    location: "São Paulo, Brasil",
    birthDate: "15/05/1985",
    joinDate: "10/03/2012",
    bio: "Piloto experiente com mais de 10.000 horas de voo. Especializado em Boeing 787 e Airbus A350.",
    emergencyContact: "Maria Oliveira - +55 11 91234-5678",
    languages: ["Português", "Inglês", "Espanhol"],
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
    licenses: [
      {
        type: "ATPL",
        number: "BR-ATPL-12345",
        issueDate: "05/06/2010",
        expiryDate: "05/06/2025",
        status: "active",
      },
      {
        type: "Type Rating B787",
        number: "TR-B787-5678",
        issueDate: "12/08/2015",
        expiryDate: "12/08/2023",
        status: "expiring",
      },
    ],
    certifications: [
      {
        name: "CRM Training",
        date: "15/01/2023",
        expiryDate: "15/01/2024",
        status: "active",
      },
      {
        name: "Emergency Procedures",
        date: "20/03/2023",
        expiryDate: "20/03/2024",
        status: "active",
      },
    ],
    flightHours: {
      total: 12450,
      b787: 5200,
      a350: 3800,
      a320: 3450,
    },
    recentFlights: [
      {
        flightNumber: "LA8084",
        route: "GRU → MAD",
        date: "10/10/2023",
        aircraft: "Boeing 787-9",
        duration: "11h 20m",
        role: "Captain",
      },
      {
        flightNumber: "LA8085",
        route: "MAD → GRU",
        date: "12/10/2023",
        aircraft: "Boeing 787-9",
        duration: "10h 45m",
        role: "Captain",
      },
      {
        flightNumber: "LA8112",
        route: "GRU → MIA",
        date: "15/10/2023",
        aircraft: "Boeing 777-300ER",
        duration: "8h 30m",
        role: "First Officer",
      },
    ],
    performance: [
      { month: "Jan", flights: 18, onTime: 17, rating: 4.8 },
      { month: "Feb", flights: 16, onTime: 15, rating: 4.9 },
      { month: "Mar", flights: 20, onTime: 18, rating: 4.7 },
      { month: "Apr", flights: 15, onTime: 14, rating: 4.8 },
      { month: "May", flights: 22, onTime: 20, rating: 4.9 },
      { month: "Jun", flights: 18, onTime: 17, rating: 4.8 },
    ],
    preferences: {
      theme: "light",
      language: "pt-BR",
      notifications: true,
      twoFactorAuth: true,
    },
    documents: [
      { name: "Passport", number: "FD5432109", expiryDate: "15/08/2028" },
      { name: "ID Card", number: "12345678-9", expiryDate: "20/05/2030" },
      {
        name: "Medical Certificate",
        number: "MED-BR-98765",
        expiryDate: "10/04/2024",
      },
    ],
    training: [
      {
        course: "Annual Recurrent Training",
        completionDate: "05/02/2023",
        score: 98,
      },
      {
        course: "Emergency Procedures",
        completionDate: "15/03/2023",
        score: 95,
      },
      { course: "CRM Advanced", completionDate: "22/04/2023", score: 97 },
    ],
  });

  const handleSaveProfile = async () => {
    setIsEditing(false);
    try {
      await updateProfile({
        name: userData.name,
        bio: userData.bio,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 animate-pulse">
            <CheckCircle className="w-3 h-3 mr-1" /> Ativo
          </Badge>
        );
      case "expiring":
        return (
          <Badge className="bg-amber-100 text-amber-800 animate-pulse">
            <AlertTriangle className="w-3 h-3 mr-1" /> Expirando
          </Badge>
        );
      case "expired":
        return (
          <Badge className="bg-red-100 text-red-800">
            <AlertTriangle className="w-3 h-3 mr-1" /> Expirado
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                  <AvatarImage src={profileImage} alt={userData.name} />
                  <AvatarFallback>
                    {userData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-lg cursor-pointer hover:bg-gray-100">
                    <Camera className="h-4 w-4 text-gray-600" />
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{userData.name}</h2>
                <p className="text-gray-600">{userData.role}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    <Star className="w-3 h-3 mr-1" />
                    {userData.flightHours.total.toLocaleString()} horas de voo
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              {isEditing ? (
                <Button onClick={handleSaveProfile}>
                  <Save className="w-4 h-4 mr-2" />
                  Salvar
                </Button>
              ) : (
                <Button onClick={() => setIsEditing(true)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
          <TabsTrigger value="personal">
            <User className="w-4 h-4 mr-2" />
            Pessoal
          </TabsTrigger>
          <TabsTrigger value="professional">
            <Briefcase className="w-4 h-4 mr-2" />
            Profissional
          </TabsTrigger>
          <TabsTrigger value="documents">
            <FileText className="w-4 h-4 mr-2" />
            Documentos
          </TabsTrigger>
          <TabsTrigger value="preferences">
            <Settings className="w-4 h-4 mr-2" />
            Preferências
          </TabsTrigger>
        </TabsList>

        {/* Personal Information Tab */}
        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
              <CardDescription>Atualize suas informações pessoais</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    value={userData.name}
                    onChange={(e) =>
                      setUserData({ ...userData, name: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userData.email}
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={userData.phone}
                    onChange={(e) =>
                      setUserData({ ...userData, phone: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Localização</Label>
                  <Input
                    id="location"
                    value={userData.location}
                    onChange={(e) =>
                      setUserData({ ...userData, location: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Biografia</Label>
                <Textarea
                  id="bio"
                  value={userData.bio}
                  onChange={(e) =>
                    setUserData({ ...userData, bio: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contato de Emergência</CardTitle>
              <CardDescription>Informações de contato em caso de emergência</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Contato de Emergência</Label>
                <Input
                  id="emergencyContact"
                  value={userData.emergencyContact}
                  onChange={(e) =>
                    setUserData({ ...userData, emergencyContact: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Professional Information Tab */}
        <TabsContent value="professional" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Licenças e Certificações</CardTitle>
              <CardDescription>Suas licenças e certificações profissionais</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userData.licenses.map((license, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-blue-500" />
                        <span className="font-medium">{license.type}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Número: {license.number}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Emissão: {license.issueDate} | Expiração: {license.expiryDate}
                      </p>
                    </div>
                    {getStatusBadge(license.status)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Horas de Voo</CardTitle>
              <CardDescription>Suas horas de voo por aeronave</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Total</Label>
                  <div className="flex items-center space-x-2">
                    <Plane className="h-4 w-4 text-blue-500" />
                    <span className="text-2xl font-bold">
                      {userData.flightHours.total.toLocaleString()}
                    </span>
                    <span className="text-sm text-muted-foreground">horas</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Boeing 787</Label>
                  <div className="flex items-center space-x-2">
                    <Plane className="h-4 w-4 text-blue-500" />
                    <span className="text-2xl font-bold">
                      {userData.flightHours.b787.toLocaleString()}
                    </span>
                    <span className="text-sm text-muted-foreground">horas</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Airbus A350</Label>
                  <div className="flex items-center space-x-2">
                    <Plane className="h-4 w-4 text-blue-500" />
                    <span className="text-2xl font-bold">
                      {userData.flightHours.a350.toLocaleString()}
                    </span>
                    <span className="text-sm text-muted-foreground">horas</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Airbus A320</Label>
                  <div className="flex items-center space-x-2">
                    <Plane className="h-4 w-4 text-blue-500" />
                    <span className="text-2xl font-bold">
                      {userData.flightHours.a320.toLocaleString()}
                    </span>
                    <span className="text-sm text-muted-foreground">horas</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Voos Recentes</CardTitle>
              <CardDescription>Seus últimos voos realizados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userData.recentFlights.map((flight, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Plane className="h-4 w-4 text-blue-500" />
                        <span className="font-medium">{flight.flightNumber}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {flight.route} | {flight.aircraft}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {flight.date} | {flight.duration} | {flight.role}
                      </p>
                    </div>
                    <Badge variant="secondary">{flight.role}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Documentos</CardTitle>
              <CardDescription>Seus documentos pessoais e profissionais</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userData.documents.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-blue-500" />
                        <span className="font-medium">{doc.name}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Número: {doc.number}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Expiração: {doc.expiryDate}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Conta</CardTitle>
              <CardDescription>Configure suas preferências de conta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Autenticação em Dois Fatores</Label>
                  <p className="text-sm text-muted-foreground">
                    Adicione uma camada extra de segurança à sua conta
                  </p>
                </div>
                <Switch checked={userData.preferences.twoFactorAuth} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificações por Email</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba atualizações sobre sua conta
                  </p>
                </div>
                <Switch checked={userData.notifications.email} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificações Push</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba notificações em tempo real
                  </p>
                </div>
                <Switch checked={userData.notifications.push} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificações por SMS</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba notificações via mensagem de texto
                  </p>
                </div>
                <Switch checked={userData.notifications.sms} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ModernProfile; 