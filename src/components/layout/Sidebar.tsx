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
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

const Sidebar = ({ collapsed = false, onToggle = () => {} }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    onToggle();
  };

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
  ];

  const bottomNavItems = [
    { name: "Settings", path: "/settings", icon: <Settings size={20} /> },
    { name: "Help", path: "/help", icon: <HelpCircle size={20} /> },
    { name: "Logout", path: "/logout", icon: <LogOut size={20} /> },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside
      className={cn(
        "h-full bg-slate-900 text-white flex flex-col justify-between transition-all duration-300 animate-slide-in-left",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      <div>
        {/* Logo */}
        <div className="flex items-center justify-center h-16 border-b border-slate-700">
          {!isCollapsed ? (
            <div className="text-xl font-bold text-blue-500">
              LATAM Airlines
            </div>
          ) : (
            <div className="text-xl font-bold text-blue-500">LA</div>
          )}
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-2">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <TooltipProvider delayDuration={300}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        to={item.path}
                        className={cn(
                          "flex items-center p-2 rounded-md hover:bg-slate-800 transition-colors",
                          isActive(item.path)
                            ? "bg-slate-800 text-blue-400"
                            : "text-slate-300",
                        )}
                      >
                        <span className="mr-3">{item.icon}</span>
                        {!isCollapsed && <span>{item.name}</span>}
                      </Link>
                    </TooltipTrigger>
                    {isCollapsed && (
                      <TooltipContent side="right">
                        <p>{item.name}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Bottom section */}
      <div className="mb-6 px-2">
        {/* Collapse button */}
        <button
          onClick={toggleSidebar}
          className="w-full flex items-center justify-center p-2 mb-4 rounded-md hover:bg-slate-800 transition-colors text-slate-300"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          {!isCollapsed && <span className="ml-2">Collapse</span>}
        </button>

        {/* Bottom navigation */}
        <ul className="space-y-2">
          {bottomNavItems.map((item) => (
            <li key={item.path}>
              <TooltipProvider delayDuration={300}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.path}
                      className={cn(
                        "flex items-center p-2 rounded-md hover:bg-slate-800 transition-colors",
                        isActive(item.path)
                          ? "bg-slate-800 text-blue-400"
                          : "text-slate-300",
                      )}
                    >
                      <span className="mr-3">{item.icon}</span>
                      {!isCollapsed && <span>{item.name}</span>}
                    </Link>
                  </TooltipTrigger>
                  {isCollapsed && (
                    <TooltipContent side="right">
                      <p>{item.name}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
