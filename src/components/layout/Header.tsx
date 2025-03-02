import React, { useState } from "react";
import { Bell, Menu, Settings, LogOut, User } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface HeaderProps {
  onToggleSidebar?: () => void;
  notificationCount?: number;
  userName?: string;
  userAvatar?: string;
}

const Header = ({
  onToggleSidebar = () => {},
  notificationCount = 3,
  userName = "John Doe",
  userAvatar = "",
}: HeaderProps) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);

  // Mock notifications
  const notifications = [
    {
      id: 1,
      title: "Alerta de manutenção",
      message: "Aeronave LA-2234 requer inspeção urgente",
      time: "5 min atrás",
      read: false,
    },
    {
      id: 2,
      title: "Atraso de voo",
      message: "Voo LA1234 atrasado por 45 minutos",
      time: "20 min atrás",
      read: false,
    },
    {
      id: 3,
      title: "Alteração de tripulação",
      message: "Mudança na escala do voo LA5678",
      time: "1 hora atrás",
      read: true,
    },
  ];

  return (
    <header className="w-full h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 shadow-sm animate-slide-in-down">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="mr-4"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className="flex items-center">
          {/* LATAM Airlines Logo */}
          <div className="flex items-center">
            <AnimatedLogo size="sm" className="mr-2" />
            <span className="ml-2 font-bold text-lg text-gray-800">
              LATAM Airlines
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <Dialog
          open={isNotificationsOpen}
          onOpenChange={setIsNotificationsOpen}
        >
          <DialogTrigger asChild>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative"
                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  >
                    <Bell className="h-5 w-5" />
                    {notificationCount > 0 && (
                      <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        {notificationCount}
                      </span>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Notificações</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Notificações</DialogTitle>
            </DialogHeader>
            <div className="max-h-[60vh] overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 border-b last:border-0 ${notification.read ? "opacity-70" : "bg-blue-50"}`}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-sm">
                      {notification.title}
                    </h4>
                    <span className="text-xs text-gray-500">
                      {notification.time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {notification.message}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex justify-between pt-2">
              <Button variant="link" size="sm">
                Marcar todas como lidas
              </Button>
              <Button variant="link" size="sm">
                Ver todas
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Settings */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSettingsDialog(true)}
              >
                <Settings className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Configurações</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar>
                <AvatarImage
                  src={
                    userAvatar ||
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=latam"
                  }
                  alt={userName}
                />
                <AvatarFallback>
                  {userName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{userName}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setShowProfileDialog(true)}>
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setShowSettingsDialog(true)}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Configurações</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Settings Dialog */}
      {showSettingsDialog && (
        <Dialog open={showSettingsDialog} onOpenChange={setShowSettingsDialog}>
          <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Configurações</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <iframe src="/settings" className="w-full h-[70vh] border-0" />
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Profile Dialog */}
      {showProfileDialog && (
        <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
          <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Meu Perfil</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <iframe src="/profile" className="w-full h-[70vh] border-0" />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </header>
  );
};

export default Header;
