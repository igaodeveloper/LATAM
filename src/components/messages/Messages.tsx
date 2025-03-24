import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { MessageSquare, Mail, Phone, Clock, MapPin, Globe, Calendar, Users, Database, AlertCircle, Info, CheckCircle, XCircle, Plane, Ticket, CreditCard, User, Shield, Search, Send, Paperclip, Smile, MoreVertical } from "lucide-react";

const Messages = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChat, setSelectedChat] = useState("1");
  const [messageInput, setMessageInput] = useState("");

  const chats = [
    {
      id: "1",
      name: "Suporte Geral",
      lastMessage: "Como posso ajudar você hoje?",
      timestamp: "10:30",
      unread: 2,
      status: "online",
      avatar: "SG",
    },
    {
      id: "2",
      name: "Reservas",
      lastMessage: "Sua reserva foi confirmada",
      timestamp: "09:15",
      unread: 0,
      status: "offline",
      avatar: "RS",
    },
    {
      id: "3",
      name: "Bagagem",
      lastMessage: "Sua bagagem foi localizada",
      timestamp: "08:45",
      unread: 1,
      status: "online",
      avatar: "BG",
    },
    {
      id: "4",
      name: "Faturamento",
      lastMessage: "Pagamento processado com sucesso",
      timestamp: "07:30",
      unread: 0,
      status: "offline",
      avatar: "FT",
    },
    {
      id: "5",
      name: "Programa de Fidelidade",
      lastMessage: "Pontos adicionados à sua conta",
      timestamp: "06:15",
      unread: 0,
      status: "online",
      avatar: "PF",
    },
    {
      id: "6",
      name: "Segurança",
      lastMessage: "Novas medidas implementadas",
      timestamp: "05:45",
      unread: 3,
      status: "offline",
      avatar: "SG",
    },
    {
      id: "7",
      name: "Manutenção",
      lastMessage: "Manutenção programada",
      timestamp: "04:30",
      unread: 0,
      status: "online",
      avatar: "MT",
    },
    {
      id: "8",
      name: "Rotas",
      lastMessage: "Nova rota disponível",
      timestamp: "03:15",
      unread: 0,
      status: "offline",
      avatar: "RT",
    },
  ];

  const messages = [
    {
      id: 1,
      sender: "Suporte Geral",
      content: "Olá! Como posso ajudar você hoje?",
      timestamp: "10:30",
      type: "received",
    },
    {
      id: 2,
      sender: "Você",
      content: "Preciso de ajuda com minha reserva",
      timestamp: "10:31",
      type: "sent",
    },
    {
      id: 3,
      sender: "Suporte Geral",
      content: "Claro! Por favor, me informe o número da sua reserva",
      timestamp: "10:32",
      type: "received",
    },
    {
      id: 4,
      sender: "Você",
      content: "LA123456",
      timestamp: "10:33",
      type: "sent",
    },
    {
      id: 5,
      sender: "Suporte Geral",
      content: "Encontrei sua reserva. O que você gostaria de saber?",
      timestamp: "10:34",
      type: "received",
    },
  ];

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Mensagens</h1>
        <p className="text-gray-500">
          Gerencie suas comunicações internas
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4" />
                <Input
                  placeholder="Buscar conversas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {filteredChats.map((chat) => (
                  <div
                    key={chat.id}
                    className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer ${
                      selectedChat === chat.id
                        ? "bg-blue-50 border-blue-200"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedChat(chat.id)}
                  >
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                        {chat.avatar}
                      </div>
                      <div
                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                          chat.status === "online"
                            ? "bg-green-500"
                            : "bg-gray-400"
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium truncate">{chat.name}</h3>
                        <span className="text-sm text-gray-500">
                          {chat.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 truncate">
                        {chat.lastMessage}
                      </p>
                    </div>
                    {chat.unread > 0 && (
                      <div className="w-5 h-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center">
                        {chat.unread}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                      {chats.find((chat) => chat.id === selectedChat)?.avatar}
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white bg-green-500" />
                  </div>
                  <div>
                    <CardTitle>
                      {chats.find((chat) => chat.id === selectedChat)?.name}
                    </CardTitle>
                    <CardDescription>
                      {chats.find((chat) => chat.id === selectedChat)?.status === "online"
                        ? "Online"
                        : "Offline"}
                    </CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] overflow-y-auto space-y-4 mb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.type === "sent" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.type === "sent"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <span
                        className={`text-xs mt-1 block ${
                          message.type === "sent"
                            ? "text-blue-100"
                            : "text-gray-500"
                        }`}
                      >
                        {message.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Smile className="h-4 w-4" />
                </Button>
                <Textarea
                  placeholder="Digite sua mensagem..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  className="flex-1"
                />
                <Button>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Messages; 