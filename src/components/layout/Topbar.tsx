import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plane,
  Users,
  Wrench,
  BarChart3,
  User,
  UserCircle,
  CheckSquare,
  Luggage,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  Search,
  Menu,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

interface TopbarProps {
  onToggleSidebar?: () => void;
  notificationCount?: number;
  userName?: string;
  userAvatar?: string;
}

const Topbar = ({
  onToggleSidebar = () => {},
  notificationCount = 3,
  userName = "John Doe",
  userAvatar = "",
}: TopbarProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm animate-slide-in-down">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Left section - Logo and toggle */}
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="mr-4 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="animate-pulse"
            >
              <rect width="40" height="40" rx="4" fill="#005DAA" />
              <path d="M8 12H32V16H8V12Z" fill="white" />
              <path d="M8 18H32V22H8V18Z" fill="white" />
              <path d="M8 24H32V28H8V24Z" fill="#E30613" />
            </svg>
            <span className="ml-2 font-bold text-lg text-gray-800 hidden md:inline-block">
              LATAM Airlines
            </span>
          </div>
        </div>

        {/* Center section - Navigation */}
        <div className="hidden lg:flex items-center space-x-1">
          <Link to="/">
            <Button variant="ghost" size="sm" className="text-sm font-medium hover:scale-105 transition-transform">
              Dashboard
            </Button>
          </Link>
          <Link to="/gerenciamento-de-voos">
            <Button variant="ghost" size="sm" className="text-sm font-medium hover:scale-105 transition-transform">
              <Plane className="h-4 w-4 mr-1" />
              Voos
            </Button>
          </Link>
          <Link to="/alocacao-tripulacao">
            <Button variant="ghost" size="sm" className="text-sm font-medium hover:scale-105 transition-transform">
              <Users className="h-4 w-4 mr-1" />
              Tripulação
            </Button>
          </Link>
          <Link to="/monitoramento-aeronaves">
            <Button variant="ghost" size="sm" className="text-sm font-medium hover:scale-105 transition-transform">
              <Wrench className="h-4 w-4 mr-1" />
              Aeronaves
            </Button>
          </Link>
          <Link to="/relatorios-desempenho">
            <Button variant="ghost" size="sm" className="text-sm font-medium hover:scale-105 transition-transform">
              <BarChart3 className="h-4 w-4 mr-1" />
              Relatórios
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-sm font-medium hover:scale-105 transition-transform">
                <UserCircle className="h-4 w-4 mr-1" />
                Passageiros
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 animate-scale-in">
              <Link to="/gestao-passageiros">
                <DropdownMenuItem className="hover:scale-105 transition-transform">
                  <User className="h-4 w-4 mr-2" />
                  Gestão de Passageiros
                </DropdownMenuItem>
              </Link>
              <Link to="/portal-cliente">
                <DropdownMenuItem className="hover:scale-105 transition-transform">
                  <UserCircle className="h-4 w-4 mr-2" />
                  Portal do Cliente
                </DropdownMenuItem>
              </Link>
              <Link to="/checkin-online">
                <DropdownMenuItem className="hover:scale-105 transition-transform">
                  <CheckSquare className="h-4 w-4 mr-2" />
                  Check-in Online
                </DropdownMenuItem>
              </Link>
              <Link to="/rastreamento-bagagem">
                <DropdownMenuItem className="hover:scale-105 transition-transform">
                  <Luggage className="h-4 w-4 mr-2" />
                  Rastreamento de Bagagem
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Right section - Search, notifications, profile */}
        <div className="flex items-center space-x-2">
          {/* Search */}
          <div className="relative hidden md:block">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="lg:hidden"
            >
              {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            </Button>
            <div
              className={`
                absolute right-0 top-0 w-64 bg-white border rounded-lg shadow-lg transition-all duration-300
                ${isSearchOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}
              `}
            >
              <div className="p-2">
                <Input
                  type="search"
                  placeholder="Buscar..."
                  className="w-full pl-8 h-9 rounded-full bg-gray-50"
                />
              </div>
            </div>
          </div>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative animate-float"
          >
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center animate-pulse">
                {notificationCount}
              </span>
            )}
          </Button>

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-8 w-8 rounded-full hover:bg-gray-100 hover:scale-105 transition-transform"
              >
                <Avatar className="h-8 w-8 border border-gray-200">
                  <AvatarImage
                    src={
                      userAvatar ||
                      "https://api.dicebear.com/7.x/avataaars/svg?seed=latam"
                    }
                    alt={userName}
                  />
                  <AvatarFallback className="bg-blue-100 text-blue-800">
                    {userName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 animate-scale-in">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userName}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    admin@latam.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="hover:scale-105 transition-transform">
                <User className="mr-2 h-4 w-4" />
                <span>Meu Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:scale-105 transition-transform">
                <Settings className="mr-2 h-4 w-4" />
                <span>Configurações</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:scale-105 transition-transform">
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Ajuda & Suporte</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 hover:scale-105 transition-transform">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile navigation */}
      <div
        className={`
          lg:hidden flex overflow-x-auto scrollbar-hide border-t border-gray-100 bg-white
          transition-all duration-300 ease-in-out
          ${isMobileMenuOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="flex space-x-4 p-4">
          <Link to="/" className="flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs rounded-none h-10 px-3 hover:bg-transparent hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 hover:scale-105 transition-transform"
            >
              Dashboard
            </Button>
          </Link>
          <Link to="/gerenciamento-de-voos" className="flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs rounded-none h-10 px-3 hover:bg-transparent hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 hover:scale-105 transition-transform"
            >
              <Plane className="h-3 w-3 mr-1" />
              Voos
            </Button>
          </Link>
          <Link to="/alocacao-tripulacao" className="flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs rounded-none h-10 px-3 hover:bg-transparent hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 hover:scale-105 transition-transform"
            >
              <Users className="h-3 w-3 mr-1" />
              Tripulação
            </Button>
          </Link>
          <Link to="/monitoramento-aeronaves" className="flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs rounded-none h-10 px-3 hover:bg-transparent hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 hover:scale-105 transition-transform"
            >
              <Wrench className="h-3 w-3 mr-1" />
              Aeronaves
            </Button>
          </Link>
          <Link to="/relatorios-desempenho" className="flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs rounded-none h-10 px-3 hover:bg-transparent hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 hover:scale-105 transition-transform"
            >
              <BarChart3 className="h-3 w-3 mr-1" />
              Relatórios
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
