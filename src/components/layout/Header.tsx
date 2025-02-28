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
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="40" height="40" rx="4" fill="#005DAA" />
              <path d="M8 12H32V16H8V12Z" fill="white" />
              <path d="M8 18H32V22H8V18Z" fill="white" />
              <path d="M8 24H32V28H8V24Z" fill="#E30613" />
            </svg>
            <span className="ml-2 font-bold text-lg text-gray-800">
              LATAM Airlines
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Notifications */}
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
              <p>Notifications</p>
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
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
