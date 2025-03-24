import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";
import {
  LayoutDashboard,
  Plane,
  Users,
  Wrench,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  HelpCircle,
  User,
  UserCircle,
  CheckSquare,
  Luggage,
  BarChart3,
  FileText,
  Calculator,
  Bell,
  History,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { AnimatedLogo } from "../ui/animated-logo";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const location = useLocation();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navItems = [
    { name: "Dashboard", path: "/", icon: <LayoutDashboard size={20} /> },
    {
      name: "Gestão de Voos",
      path: "/gerenciamento-de-voos",
      icon: <Plane size={20} />,
    },
    {
      name: "Alocação de Tripulação",
      path: "/alocacao-tripulacao",
      icon: <Users size={20} />,
    },
    {
      name: "Monitoramento de Aeronaves",
      path: "/monitoramento-aeronaves",
      icon: <Wrench size={20} />,
    },
    {
      name: "Gestão de Funcionários",
      path: "/gestao-funcionarios",
      icon: <Users size={20} />,
    },
    {
      name: "Relatórios de Desempenho",
      path: "/relatorios-desempenho",
      icon: <BarChart3 size={20} />,
    },
    {
      name: "Gestão de Passageiros",
      path: "/gestao-passageiros",
      icon: <User size={20} />,
    },
    {
      name: "Portal do Cliente",
      path: "/portal-cliente",
      icon: <UserCircle size={20} />,
    },
    {
      name: "Check-in Online",
      path: "/checkin-online",
      icon: <CheckSquare size={20} />,
    },
    {
      name: "Rastreamento de Bagagem",
      path: "/rastreamento-bagagem",
      icon: <Luggage size={20} />,
    },
    {
      name: "Processos RH",
      path: "/hr/dashboard",
      icon: <FileText size={20} />,
      subItems: [
        { name: "Dashboard RH", path: "/hr/dashboard", icon: <LayoutDashboard size={20} /> },
        { name: "Rescisão", path: "/hr/rescisao", icon: <Calculator size={20} /> },
        { name: "Afastamento", path: "/hr/afastamento", icon: <FileText size={20} /> },
        { name: "Histórico", path: "/hr/processos", icon: <History size={20} /> },
        { name: "Notificações", path: "/hr/notificacoes", icon: <Bell size={20} /> },
        { name: "Simulador", path: "/hr/simulador", icon: <Calculator size={20} /> },
        { name: "Documentos", path: "/hr/documentos", icon: <FileText size={20} /> },
      ],
    },
  ];

  const bottomNavItems = [
    { name: "Configurações", path: "/settings", icon: <Settings size={20} /> },
    {
      name: "Ajuda",
      path: "/help",
      icon: <HelpCircle size={20} />,
      onClick: () => setShowHelpDialog(true),
    },
    { name: "Perfil", path: "/profile", icon: <User size={20} /> },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleSidebar = () => {
    onToggle();
  };

  return (
    <div className="relative">
      <aside className={cn(
        "h-[94%] mx-auto mt-2 mb-1 bg-slate-900 text-white flex flex-col justify-between transition-all duration-300 animate-slide-in-left rounded-2xl min-w-[64px] overflow-y-auto shadow-lg",
        collapsed ? "w-16" : "w-full md:w-64"
      )}>
        <div>
          {/* Logo */}
          <div className="flex items-center justify-center h-12 border-b border-slate-700 px-4 mx-auto">
            <div className="flex items-center justify-center animate-scale-in w-full">
              <AnimatedLogo size="sm" color="white" className="mr-2" />
              {!collapsed && (
                <div className="text-xl font-bold text-blue-500 whitespace-nowrap">
                  LATAM Airlines
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="mt-2 px-3">
            <ul className="space-y-1">
              {navItems.map((item, index) => (
                <li key={item.path}>
                  {item.subItems ? (
                    <div>
                      <TooltipProvider delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              onClick={() => item.name === "Processos RH" && setShowUserMenu(true)}
                              className={cn(
                                "w-full flex items-center p-2 rounded-md hover:bg-slate-800 transition-all duration-200",
                                isActive(item.path) ? "bg-slate-800 text-blue-400" : "text-slate-300",
                                "animate-fade-in"
                              )}
                              style={{ animationDelay: `${index * 50}ms` }}
                            >
                              <span className="mr-3 flex-shrink-0">{item.icon}</span>
                              {!collapsed && <span className="truncate">{item.name}</span>}
                            </button>
                          </TooltipTrigger>
                          {collapsed && (
                            <TooltipContent side="right">
                              <p>{item.name}</p>
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                      {!collapsed && item.name === "Processos RH" && showUserMenu && (
                        <ul className="ml-6 mt-1 space-y-1">
                          {item.subItems.map((subItem) => (
                            <li key={subItem.path}>
                              <Link
                                to={subItem.path}
                                className={cn(
                                  "flex items-center p-2 rounded-md hover:bg-slate-800 transition-all duration-200",
                                  isActive(subItem.path) ? "bg-slate-800 text-blue-400" : "text-slate-300"
                                )}
                              >
                                <span className="mr-3 flex-shrink-0">{subItem.icon}</span>
                                <span className="truncate">{subItem.name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link
                            to={item.path}
                            className={cn(
                              "flex items-center p-2 rounded-md hover:bg-slate-800 transition-all duration-200",
                              isActive(item.path) ? "bg-slate-800 text-blue-400" : "text-slate-300",
                              "animate-fade-in"
                            )}
                            style={{ animationDelay: `${index * 50}ms` }}
                          >
                            <span className="mr-3 flex-shrink-0">{item.icon}</span>
                            {!collapsed && <span className="truncate">{item.name}</span>}
                          </Link>
                        </TooltipTrigger>
                        {collapsed && (
                          <TooltipContent side="right">
                            <p>{item.name}</p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom section */}
        <div className="mt-auto px-2 py-4 border-t border-slate-700">
          <ul className="space-y-1">
            {bottomNavItems.map((item) => (
              <li key={item.path}>
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      {item.onClick ? (
                        <button
                          onClick={item.onClick}
                          className={cn(
                            "w-full flex items-center p-2 rounded-md hover:bg-slate-800 transition-all duration-200",
                            isActive(item.path) ? "bg-slate-800 text-blue-400" : "text-slate-300"
                          )}
                        >
                          <span className="mr-3 flex-shrink-0">{item.icon}</span>
                          {!collapsed && <span className="truncate">{item.name}</span>}
                        </button>
                      ) : (
                        <Link
                          to={item.path}
                          className={cn(
                            "flex items-center p-2 rounded-md hover:bg-slate-800 transition-all duration-200",
                            isActive(item.path) ? "bg-slate-800 text-blue-400" : "text-slate-300"
                          )}
                        >
                          <span className="mr-3 flex-shrink-0">{item.icon}</span>
                          {!collapsed && <span className="truncate">{item.name}</span>}
                        </Link>
                      )}
                    </TooltipTrigger>
                    {collapsed && (
                      <TooltipContent side="right">
                        <p>{item.name}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              </li>
            ))}
            <li>
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setShowLogoutDialog(true)}
                      className="w-full flex items-center p-2 rounded-md hover:bg-slate-800 transition-all duration-200 text-slate-300"
                    >
                      <span className="mr-3 flex-shrink-0">
                        <LogOut size={20} />
                      </span>
                      {!collapsed && <span className="truncate">Sair</span>}
                    </button>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right">
                      <p>Sair</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </li>
          </ul>
        </div>

        {/* Dialogs */}
        <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
          <DialogContent className="animate-scale-in">
            <DialogHeader>
              <DialogTitle>Confirmar Saída</DialogTitle>
              <DialogDescription>
                Tem certeza que deseja sair do sistema?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowLogoutDialog(false)}
                className="animate-fade-in"
              >
                Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  // Handle logout
                  setShowLogoutDialog(false);
                }}
                className="animate-fade-in"
              >
                Sair
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={showHelpDialog} onOpenChange={setShowHelpDialog}>
          <DialogContent className="animate-scale-in">
            <DialogHeader>
              <DialogTitle>Ajuda & Suporte</DialogTitle>
              <DialogDescription>
                Como podemos ajudar você hoje?
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full justify-start animate-fade-in"
              >
                <HelpCircle className="mr-2 h-4 w-4" />
                Central de Ajuda
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start animate-fade-in"
              >
                <User className="mr-2 h-4 w-4" />
                Suporte ao Usuário
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </aside>

      {/* Toggle button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-1/2 transform -translate-y-1/2 bg-slate-900 text-white p-1 rounded-full hover:bg-slate-800 transition-all duration-200 shadow-lg"
      >
        {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>
    </div>
  );
};

export default Sidebar;
