import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
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
import {
  Select as UISelect,
  SelectContent as UISelectContent,
  SelectItem as UISelectItem,
  SelectTrigger as UISelectTrigger,
  SelectValue as UISelectValue,
} from "@/components/ui/select";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(
    "https://api.dicebear.com/7.x/avataaars/svg?seed=latam-pilot",
  );
  const [progress, setProgress] = useState(0);

  // Simulate loading progress
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(100);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Mock user data
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

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Here you would typically save the data to your backend
    console.log("Saving profile data:", userData);
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
    <div className="container mx-auto py-8 px-4 max-w-7xl animate-fade-in bg-gray-50 min-h-screen">
      {/* Profile Header */}
      <div className="relative mb-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white overflow-hidden">
        <div className="absolute inset-0 bg-blue-900 opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80')] bg-cover bg-center opacity-20"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          <div className="relative group animate-float">
            <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
              <AvatarImage src={profileImage} />
              <AvatarFallback>CO</AvatarFallback>
            </Avatar>
            {isEditing && (
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <label htmlFor="profile-image" className="cursor-pointer">
                  <Camera className="h-8 w-8 text-white" />
                  <input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            )}
          </div>

          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold animate-slide-in-down">
              {userData.name}
            </h1>
            <p className="text-xl opacity-90 animate-slide-in-up">
              {userData.role}
            </p>
            <div className="flex flex-wrap gap-2 mt-2 justify-center md:justify-start">
              <Badge
                className="bg-blue-500 hover:bg-blue-600 transition-colors animate-fade-in"
                style={{ animationDelay: "0.2s" }}
              >
                <Plane className="w-3 h-3 mr-1" /> Piloto
              </Badge>
              <Badge
                className="bg-blue-500 hover:bg-blue-600 transition-colors animate-fade-in"
                style={{ animationDelay: "0.3s" }}
              >
                <Clock className="w-3 h-3 mr-1" /> {userData.flightHours.total}+
                horas
              </Badge>
              <Badge
                className="bg-blue-500 hover:bg-blue-600 transition-colors animate-fade-in"
                style={{ animationDelay: "0.4s" }}
              >
                <Star className="w-3 h-3 mr-1" /> Sênior
              </Badge>
            </div>
          </div>

          <div className="ml-auto mt-4 md:mt-0">
            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                className="animate-pulse hover:animate-none bg-white text-blue-700 hover:bg-blue-50"
              >
                <Edit className="h-4 w-4 mr-2" />
                Editar Perfil
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  className="bg-white text-blue-700 hover:bg-blue-50 border-white"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleSaveProfile}
                  className="bg-white text-blue-700 hover:bg-blue-50"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Salvar
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column - Profile Info */}
        <div className="lg:w-1/3 space-y-6">
          <Card className="overflow-hidden hover-lift transition-all duration-300 animate-slide-in-left">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-500" />
                Informações Pessoais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                className="space-y-3 animate-slide-in-right"
                style={{ animationDelay: "0.1s" }}
              >
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <span>{userData.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <span>{userData.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <span>{userData.location}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <span>Nascimento: {userData.birthDate}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Briefcase className="h-5 w-5 text-gray-400" />
                  <span>Na LATAM desde: {userData.joinDate}</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-3">
                <h3 className="font-medium text-sm text-gray-500 flex items-center">
                  <Languages className="h-4 w-4 mr-1" /> Idiomas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {userData.languages.map((language, index) => (
                    <Badge
                      key={index}
                      className="bg-blue-100 text-blue-800 animate-fade-in"
                      style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                    >
                      {language}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-3">
                <h3 className="font-medium text-sm text-gray-500 flex items-center">
                  <Clock className="h-4 w-4 mr-1" /> Horas de Voo
                </h3>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Total</span>
                      <span className="font-medium">
                        {userData.flightHours.total.toLocaleString()} horas
                      </span>
                    </div>
                    <Progress
                      value={100}
                      className="h-2 animate-slide-in-right"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Boeing 787</span>
                      <span className="font-medium">
                        {userData.flightHours.b787.toLocaleString()} horas
                      </span>
                    </div>
                    <Progress
                      value={
                        (userData.flightHours.b787 /
                          userData.flightHours.total) *
                        100
                      }
                      className="h-2 animate-slide-in-right"
                      style={{ animationDelay: "0.1s" }}
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Airbus A350</span>
                      <span className="font-medium">
                        {userData.flightHours.a350.toLocaleString()} horas
                      </span>
                    </div>
                    <Progress
                      value={
                        (userData.flightHours.a350 /
                          userData.flightHours.total) *
                        100
                      }
                      className="h-2 animate-slide-in-right"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Airbus A320</span>
                      <span className="font-medium">
                        {userData.flightHours.a320.toLocaleString()} horas
                      </span>
                    </div>
                    <Progress
                      value={
                        (userData.flightHours.a320 /
                          userData.flightHours.total) *
                        100
                      }
                      className="h-2 animate-slide-in-right"
                      style={{ animationDelay: "0.3s" }}
                    />
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-3">
                <h3 className="font-medium text-sm text-gray-500 flex items-center">
                  <FileText className="h-4 w-4 mr-1" /> Documentos
                </h3>
                <div className="space-y-2">
                  {userData.documents.map((doc, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-2 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors animate-fade-in"
                      style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                    >
                      <div>
                        <div className="font-medium">{doc.name}</div>
                        <div className="text-xs text-gray-500">
                          {doc.number}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        Válido até: {doc.expiryDate}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="overflow-hidden hover-lift transition-all duration-300 animate-slide-in-left"
            style={{ animationDelay: "0.2s" }}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold flex items-center">
                <Award className="h-5 w-5 mr-2 text-blue-500" />
                Certificações e Licenças
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h3 className="font-medium text-sm text-gray-500">Licenças</h3>
                {userData.licenses.map((license, index) => (
                  <div
                    key={index}
                    className="p-3 border rounded-lg hover:shadow-md transition-all animate-slide-in-right"
                    style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{license.type}</h4>
                        <p className="text-sm text-gray-500">
                          Número: {license.number}
                        </p>
                        <div className="flex items-center mt-2 text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>Emissão: {license.issueDate}</span>
                          <span className="mx-2">•</span>
                          <Clock className="h-4 w-4 mr-1" />
                          <span>Validade: {license.expiryDate}</span>
                        </div>
                      </div>
                      <div>{getStatusBadge(license.status)}</div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-3">
                <h3 className="font-medium text-sm text-gray-500">
                  Certificações
                </h3>
                {userData.certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="p-3 border rounded-lg hover:shadow-md transition-all animate-slide-in-right"
                    style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{cert.name}</h4>
                        <div className="flex items-center mt-2 text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>Conclusão: {cert.date}</span>
                          <span className="mx-2">•</span>
                          <Clock className="h-4 w-4 mr-1" />
                          <span>Validade: {cert.expiryDate}</span>
                        </div>
                      </div>
                      <div>{getStatusBadge(cert.status)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Tabs */}
        <div className="lg:w-2/3">
          <Card className="hover-lift transition-all duration-300 animate-slide-in-right">
            <CardHeader>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="personal" className="text-sm">
                    <User className="h-4 w-4 mr-2" />
                    Perfil
                  </TabsTrigger>
                  <TabsTrigger value="flights" className="text-sm">
                    <Plane className="h-4 w-4 mr-2" />
                    Voos
                  </TabsTrigger>
                  <TabsTrigger value="training" className="text-sm">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Treinamentos
                  </TabsTrigger>
                  <TabsTrigger value="performance" className="text-sm">
                    <Activity className="h-4 w-4 mr-2" />
                    Desempenho
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="text-sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Configurações
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <TabsContent
                value="personal"
                className="space-y-6 animate-fade-in"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input
                        id="name"
                        value={userData.name}
                        onChange={(e) =>
                          setUserData({ ...userData, name: e.target.value })
                        }
                        disabled={!isEditing}
                        className="animate-slide-in-left"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={userData.email}
                        onChange={(e) =>
                          setUserData({ ...userData, email: e.target.value })
                        }
                        disabled={!isEditing}
                        className="animate-slide-in-left"
                        style={{ animationDelay: "0.1s" }}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        value={userData.phone}
                        onChange={(e) =>
                          setUserData({ ...userData, phone: e.target.value })
                        }
                        disabled={!isEditing}
                        className="animate-slide-in-left"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="location">Localização</Label>
                      <Input
                        id="location"
                        value={userData.location}
                        onChange={(e) =>
                          setUserData({ ...userData, location: e.target.value })
                        }
                        disabled={!isEditing}
                        className="animate-slide-in-right"
                      />
                    </div>
                    <div>
                      <Label htmlFor="birthDate">Data de Nascimento</Label>
                      <Input
                        id="birthDate"
                        value={userData.birthDate}
                        onChange={(e) =>
                          setUserData({
                            ...userData,
                            birthDate: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        className="animate-slide-in-right"
                        style={{ animationDelay: "0.1s" }}
                      />
                    </div>
                    <div>
                      <Label htmlFor="emergency">Contato de Emergência</Label>
                      <Input
                        id="emergency"
                        value={userData.emergencyContact}
                        onChange={(e) =>
                          setUserData({
                            ...userData,
                            emergencyContact: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        className="animate-slide-in-right"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Biografia</Label>
                  <Textarea
                    id="bio"
                    value={userData.bio}
                    onChange={(e) =>
                      setUserData({ ...userData, bio: e.target.value })
                    }
                    disabled={!isEditing}
                    className="min-h-[120px] animate-fade-in"
                    style={{ animationDelay: "0.3s" }}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Preferências de Notificação</h3>
                  <div className="space-y-2">
                    <div
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg animate-slide-in-up"
                      style={{ animationDelay: "0.1s" }}
                    >
                      <Label
                        htmlFor="email-notifications"
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <Mail className="h-4 w-4" />
                        <span>Notificações por Email</span>
                      </Label>
                      <Switch
                        id="email-notifications"
                        checked={userData.notifications.email}
                        onCheckedChange={(checked) =>
                          setUserData({
                            ...userData,
                            notifications: {
                              ...userData.notifications,
                              email: checked,
                            },
                          })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                    <div
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg animate-slide-in-up"
                      style={{ animationDelay: "0.2s" }}
                    >
                      <Label
                        htmlFor="push-notifications"
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <Bell className="h-4 w-4" />
                        <span>Notificações Push</span>
                      </Label>
                      <Switch
                        id="push-notifications"
                        checked={userData.notifications.push}
                        onCheckedChange={(checked) =>
                          setUserData({
                            ...userData,
                            notifications: {
                              ...userData.notifications,
                              push: checked,
                            },
                          })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                    <div
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg animate-slide-in-up"
                      style={{ animationDelay: "0.3s" }}
                    >
                      <Label
                        htmlFor="sms-notifications"
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <Phone className="h-4 w-4" />
                        <span>Notificações SMS</span>
                      </Label>
                      <Switch
                        id="sms-notifications"
                        checked={userData.notifications.sms}
                        onCheckedChange={(checked) =>
                          setUserData({
                            ...userData,
                            notifications: {
                              ...userData.notifications,
                              sms: checked,
                            },
                          })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent
                value="flights"
                className="space-y-6 animate-fade-in"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Voos Recentes</h3>
                  <div className="flex gap-2">
                    <UISelect defaultValue="recent">
                      <UISelectTrigger className="w-[150px]">
                        <UISelectValue placeholder="Filtrar por" />
                      </UISelectTrigger>
                      <UISelectContent>
                        <UISelectItem value="recent">Mais Recentes</UISelectItem>
                        <UISelectItem value="duration">Maior Duração</UISelectItem>
                        <UISelectItem value="route">Por Rota</UISelectItem>
                      </UISelectContent>
                    </UISelect>
                    <Button variant="outline" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  {userData.recentFlights.map((flight, index) => (
                    <Card
                      key={index}
                      className="animate-slide-in-right hover-lift"
                      style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                    >
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                          <div>
                            <div className="flex items-center">
                              <h4 className="font-medium text-lg">
                                {flight.flightNumber}
                              </h4>
                              <Badge className="ml-2 bg-blue-100 text-blue-800">
                                {flight.role}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                              {flight.route}
                            </p>
                            <div className="flex items-center mt-2 text-sm text-gray-500">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>{flight.date}</span>
                              <span className="mx-2">•</span>
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{flight.duration}</span>
                              <span className="mx-2">•</span>
                              <Plane className="h-4 w-4 mr-1" />
                              <span>{flight.aircraft}</span>
                            </div>
                          </div>
                          <div className="mt-3 md:mt-0 flex gap-2">
                            <Button variant="outline" size="sm">
                              <FileText className="h-4 w-4 mr-2" />
                              Detalhes
                            </Button>
                            <Button variant="outline" size="sm">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Feedback
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-6">
                  <h3 className="text-lg font-semibold">
                    Próximos Voos Agendados
                  </h3>
                  <Button variant="outline" size="sm">
                    Ver Todos
                  </Button>
                </div>

                <div className="space-y-4">
                  <Card className="animate-slide-in-left hover-lift">
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div>
                          <div className="flex items-center">
                            <h4 className="font-medium text-lg">LA8120</h4>
                            <Badge className="ml-2 bg-purple-100 text-purple-800">
                              Captain
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            GRU → LIM
                          </p>
                          <div className="flex items-center mt-2 text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>25/10/2023</span>
                            <span className="mx-2">•</span>
                            <Clock className="h-4 w-4 mr-1" />
                            <span>08:30 - 12:15</span>
                            <span className="mx-2">•</span>
                            <Plane className="h-4 w-4 mr-1" />
                            <span>Boeing 787-9</span>
                          </div>
                        </div>
                        <div className="mt-3 md:mt-0">
                          <Badge className="bg-blue-100 text-blue-800 animate-pulse">
                            <Clock className="w-3 h-3 mr-1" /> Em 5 dias
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card
                    className="animate-slide-in-left hover-lift"
                    style={{ animationDelay: "0.1s" }}
                  >
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div>
                          <div className="flex items-center">
                            <h4 className="font-medium text-lg">LA8121</h4>
                            <Badge className="ml-2 bg-purple-100 text-purple-800">
                              Captain
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            LIM → GRU
                          </p>
                          <div className="flex items-center mt-2 text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>25/10/2023</span>
                            <span className="mx-2">•</span>
                            <Clock className="h-4 w-4 mr-1" />
                            <span>14:30 - 18:15</span>
                            <span className="mx-2">•</span>
                            <Plane className="h-4 w-4 mr-1" />
                            <span>Boeing 787-9</span>
                          </div>
                        </div>
                        <div className="mt-3 md:mt-0">
                          <Badge className="bg-blue-100 text-blue-800 animate-pulse">
                            <Clock className="w-3 h-3 mr-1" /> Em 5 dias
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex justify-center mt-4">
                  <Button variant="outline">Ver Histórico Completo</Button>
                </div>
              </TabsContent>

              <TabsContent
                value="training"
                className="space-y-6 animate-fade-in"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">
                    Treinamentos Concluídos
                  </h3>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar Certificados
                  </Button>
                </div>

                <div className="space-y-4">
                  {userData.training.map((course, index) => (
                    <Card
                      key={index}
                      className="animate-slide-in-right hover-lift"
                      style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                    >
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                          <div>
                            <div className="flex items-center">
                              <h4 className="font-medium text-lg">
                                {course.course}
                              </h4>
                              <Badge className="ml-2 bg-green-100 text-green-800">
                                {course.score}%
                              </Badge>
                            </div>
                            <div className="flex items-center mt-2 text-sm text-gray-500">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>Concluído em: {course.completionDate}</span>
                            </div>
                          </div>
                          <div className="mt-3 md:mt-0 flex gap-2">
                            <Button variant="outline" size="sm">
                              <FileText className="h-4 w-4 mr-2" />
                              Certificado
                            </Button>
                            <Button variant="outline" size="sm">
                              <Clipboard className="h-4 w-4 mr-2" />
                              Detalhes
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-6">
                  <h3 className="text-lg font-semibold">
                    Treinamentos Pendentes
                  </h3>
                  <Button variant="outline" size="sm">
                    Ver Todos
                  </Button>
                </div>

                <div className="space-y-4">
                  <Card className="animate-slide-in-left hover-lift">
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div>
                          <div className="flex items-center">
                            <h4 className="font-medium text-lg">
                              Recurrent Training 2024
                            </h4>
                            <Badge className="ml-2 bg-amber-100 text-amber-800">
                              <Clock className="w-3 h-3 mr-1" /> Pendente
                            </Badge>
                          </div>
                          <div className="flex items-center mt-2 text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>Prazo: 15/01/2024</span>
                          </div>
                        </div>
                        <div className="mt-3 md:mt-0">
                          <Button size="sm">
                            <Zap className="h-4 w-4 mr-2" />
                            Iniciar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card
                    className="animate-slide-in-left hover-lift"
                    style={{ animationDelay: "0.1s" }}
                  >
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div>
                          <div className="flex items-center">
                            <h4 className="font-medium text-lg">
                              Safety Procedures Update
                            </h4>
                            <Badge className="ml-2 bg-amber-100 text-amber-800">
                              <Clock className="w-3 h-3 mr-1" /> Pendente
                            </Badge>
                          </div>
                          <div className="flex items-center mt-2 text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>Prazo: 30/11/2023</span>
                          </div>
                        </div>
                        <div className="mt-3 md:mt-0">
                          <Button size="sm">
                            <Zap className="h-4 w-4 mr-2" />
                            Iniciar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent
                value="performance"
                className="space-y-6 animate-fade-in"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">
                    Métricas de Desempenho
                  </h3>
                  <UISelect defaultValue="6months">
                    <UISelectTrigger className="w-[180px]">
                      <UISelectValue placeholder="Período" />
                    </UISelectTrigger>
                    <UISelectContent>
                      <UISelectItem value="3months">Últimos 3 meses</UISelectItem>
                      <UISelectItem value="6months">Últimos 6 meses</UISelectItem>
                      <UISelectItem value="1year">Último ano</UISelectItem>
                      <UISelectItem value="all">Todo histórico</UISelectItem>
                    </UISelectContent>
                  </UISelect>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="animate-slide-in-up hover-lift">
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center h-40">
                      <PieChart className="h-10 w-10 text-blue-500 mb-2" />
                      <h3 className="text-3xl font-bold text-blue-700">
                        98.2%
                      </h3>
                      <p className="text-gray-500">Pontualidade</p>
                    </CardContent>
                  </Card>

                  <Card
                    className="animate-slide-in-up hover-lift"
                    style={{ animationDelay: "0.1s" }}
                  >
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center h-40">
                      <Activity className="h-10 w-10 text-green-500 mb-2" />
                      <h3 className="text-3xl font-bold text-green-700">
                        4.9/5
                      </h3>
                      <p className="text-gray-500">Avaliação Média</p>
                    </CardContent>
                  </Card>

                  <Card
                    className="animate-slide-in-up hover-lift"
                    style={{ animationDelay: "0.2s" }}
                  >
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center h-40">
                      <Zap className="h-10 w-10 text-amber-500 mb-2" />
                      <h3 className="text-3xl font-bold text-amber-700">109</h3>
                      <p className="text-gray-500">Voos Completados</p>
                    </CardContent>
                  </Card>
                </div>

                <Card
                  className="animate-fade-in"
                  style={{ animationDelay: "0.3s" }}
                >
                  <CardHeader>
                    <CardTitle>Histórico de Desempenho</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 bg-gray-100 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">
                        Gráfico de desempenho seria exibido aqui
                      </p>
                      {/* Aqui seria renderizado um gráfico com biblioteca como Recharts */}
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card
                    className="animate-slide-in-left"
                    style={{ animationDelay: "0.4s" }}
                  >
                    <CardHeader>
                      <CardTitle>Feedback de Passageiros</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-3 border rounded-lg bg-gray-50">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0">
                            <Avatar>
                              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=passenger1" />
                              <AvatarFallback>JP</AvatarFallback>
                            </Avatar>
                          </div>
                          <div>
                            <div className="flex items-center">
                              <h4 className="font-medium">João Paulo</h4>
                              <div className="ml-2 flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className="h-4 w-4 text-yellow-400 fill-yellow-400"
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                              LA8084 • 10/10/2023
                            </p>
                            <p className="mt-2">
                              "Excelente piloto, voo muito tranquilo mesmo com
                              turbulência. Comunicação clara e profissional."
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 border rounded-lg bg-gray-50">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0">
                            <Avatar>
                              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=passenger2" />
                              <AvatarFallback>MC</AvatarFallback>
                            </Avatar>
                          </div>
                          <div>
                            <div className="flex items-center">
                              <h4 className="font-medium">Maria Costa</h4>
                              <div className="ml-2 flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className="h-4 w-4 text-yellow-400 fill-yellow-400"
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                              LA8085 • 12/10/2023
                            </p>
                            <p className="mt-2">
                              "Pouso perfeito, nem senti o avião tocar o solo.
                              Comunicação clara sobre as condições climáticas
                              durante o voo."
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card
                    className="animate-slide-in-right"
                    style={{ animationDelay: "0.4s" }}
                  >
                    <CardHeader>
                      <CardTitle>Reconhecimentos</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 border rounded-lg bg-blue-50 flex items-center gap-4">
                        <div className="bg-blue-100 p-3 rounded-full">
                          <Award className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Piloto do Mês</h4>
                          <p className="text-sm text-gray-600">Setembro 2023</p>
                          <p className="text-sm mt-1">
                            Reconhecido pela excelência operacional e
                            pontualidade.
                          </p>
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg bg-green-50 flex items-center gap-4">
                        <div className="bg-green-100 p-3 rounded-full">
                          <Heart className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">
                            Atendimento Excepcional
                          </h4>
                          <p className="text-sm text-gray-600">Agosto 2023</p>
                          <p className="text-sm mt-1">
                            Assistência a passageiro com necessidades médicas
                            durante o voo.
                          </p>
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg bg-purple-50 flex items-center gap-4">
                        <div className="bg-purple-100 p-3 rounded-full">
                          <Zap className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">10.000 Horas de Voo</h4>
                          <p className="text-sm text-gray-600">Julho 2023</p>
                          <p className="text-sm mt-1">
                            Marco importante na carreira como piloto da LATAM.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent
                value="settings"
                className="space-y-6 animate-fade-in"
              >
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Configurações da Conta
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg animate-slide-in-left">
                        <h4 className="font-medium flex items-center">
                          <Settings className="h-5 w-5 mr-2 text-gray-500" />
                          Preferências Gerais
                        </h4>
                        <div className="mt-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <Label
                              htmlFor="theme"
                              className="flex items-center space-x-2"
                            >
                              <span>Tema da Interface</span>
                            </Label>
                            <UISelect defaultValue="light">
                              <UISelectTrigger className="w-[120px]">
                                <UISelectValue placeholder="Tema" />
                              </UISelectTrigger>
                              <UISelectContent>
                                <UISelectItem value="light">Claro</UISelectItem>
                                <UISelectItem value="dark">Escuro</UISelectItem>
                                <UISelectItem value="system">Sistema</UISelectItem>
                              </UISelectContent>
                            </UISelect>
                          </div>

                          <div className="flex items-center justify-between">
                            <Label
                              htmlFor="language"
                              className="flex items-center space-x-2"
                            >
                              <span>Idioma</span>
                            </Label>
                            <UISelect defaultValue="pt-BR">
                              <UISelectTrigger className="w-[120px]">
                                <UISelectValue placeholder="Idioma" />
                              </UISelectTrigger>
                              <UISelectContent>
                                <UISelectItem value="pt-BR">Português</UISelectItem>
                                <UISelectItem value="en-US">English</UISelectItem>
                                <UISelectItem value="es-ES">Español</UISelectItem>
                              </UISelectContent>
                            </UISelect>
                          </div>
                        </div>
                      </div>

                      <div
                        className="p-4 border rounded-lg animate-slide-in-left"
                        style={{ animationDelay: "0.1s" }}
                      >
                        <h4 className="font-medium flex items-center">
                          <CreditCard className="h-5 w-5 mr-2 text-gray-500" />
                          Informações de Pagamento
                        </h4>
                        <div className="mt-4 space-y-3">
                          <p className="text-sm text-gray-500">
                            Gerencie seus métodos de pagamento e informações
                            fiscais.
                          </p>
                          <Button variant="outline" size="sm">
                            Gerenciar Métodos de Pagamento
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg animate-slide-in-right">
                        <h4 className="font-medium flex items-center">
                          <Shield className="h-5 w-5 mr-2 text-gray-500" />
                          Segurança da Conta
                        </h4>
                        <div className="mt-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <Label
                              htmlFor="2fa"
                              className="flex items-center space-x-2"
                            >
                              <span>Autenticação de Dois Fatores</span>
                            </Label>
                            <Switch
                              id="2fa"
                              checked={userData.preferences.twoFactorAuth}
                            />
                          </div>

                          <div className="pt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full"
                            >
                              <Key className="h-4 w-4 mr-2" />
                              Alterar Senha
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div
                        className="p-4 border rounded-lg animate-slide-in-right"
                        style={{ animationDelay: "0.1s" }}
                      >
                        <h4 className="font-medium flex items-center text-red-600">
                          <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
                          Zona de Perigo
                        </h4>
                        <div className="mt-4 space-y-3">
                          <p className="text-sm text-gray-500">
                            Estas ações são irreversíveis. Por favor, tenha
                            cuidado.
                          </p>
                          <div className="flex space-x-4">
                            <Button
                              variant="outline"
                              className="border-red-200 text-red-600 hover:bg-red-50"
                            >
                              <Trash className="h-4 w-4 mr-2" />
                              Excluir Conta
                            </Button>
                            <Button
                              variant="outline"
                              className="border-red-200 text-red-600 hover:bg-red-50"
                            >
                              <LogOut className="h-4 w-4 mr-2" />
                              Encerrar Sessões
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Suporte e Ajuda</h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card
                      className="animate-slide-in-up hover-lift"
                      style={{ animationDelay: "0.2s" }}
                    >
                      <CardContent className="p-6 flex flex-col items-center text-center">
                        <Headphones className="h-10 w-10 text-blue-500 mb-4" />
                        <h4 className="font-medium">Suporte Técnico</h4>
                        <p className="text-sm text-gray-500 mt-2">
                          Problemas com o sistema ou aplicativo
                        </p>
                        <Button className="mt-4" variant="outline" size="sm">
                          Contatar Suporte
                        </Button>
                      </CardContent>
                    </Card>

                    <Card
                      className="animate-slide-in-up hover-lift"
                      style={{ animationDelay: "0.3s" }}
                    >
                      <CardContent className="p-6 flex flex-col items-center text-center">
                        <BookOpen className="h-10 w-10 text-blue-500 mb-4" />
                        <h4 className="font-medium">Base de Conhecimento</h4>
                        <p className="text-sm text-gray-500 mt-2">
                          Tutoriais e documentação
                        </p>
                        <Button className="mt-4" variant="outline" size="sm">
                          Acessar Artigos
                        </Button>
                      </CardContent>
                    </Card>

                    <Card
                      className="animate-slide-in-up hover-lift"
                      style={{ animationDelay: "0.4s" }}
                    >
                      <CardContent className="p-6 flex flex-col items-center text-center">
                        <MessageSquare className="h-10 w-10 text-blue-500 mb-4" />
                        <h4 className="font-medium">Feedback</h4>
                        <p className="text-sm text-gray-500 mt-2">
                          Sugestões e melhorias
                        </p>
                        <Button className="mt-4" variant="outline" size="sm">
                          Enviar Feedback
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
