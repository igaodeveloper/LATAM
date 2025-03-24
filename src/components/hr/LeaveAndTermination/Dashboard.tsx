import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useHRProcess } from "@/contexts/HRProcessContext";
import { Bell, Calculator, FileText, History, UserX, UserMinus } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { notifications, processes } = useHRProcess();

  const pendingProcesses = processes.filter(p => p.status === 'pendente' || p.status === 'em_andamento');

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard do Funcionário</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Status Atual */}
        <Card>
          <CardHeader>
            <CardTitle>Status Atual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-green-600 font-semibold">Ativo</p>
              <p>Última atualização: 24/03/2024</p>
            </div>
          </CardContent>
        </Card>

        {/* Processos em Andamento */}
        <Card>
          <CardHeader>
            <CardTitle>Processos em Andamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>{pendingProcesses.length} processo(s) em andamento</p>
              <Button variant="outline" onClick={() => navigate('/hr/processos')}>
                <History className="w-4 h-4 mr-2" />
                Ver Histórico
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notificações */}
        <Card>
          <CardHeader>
            <CardTitle>Notificações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>{notifications.length} notificação(ões) não lida(s)</p>
              <Button variant="outline" onClick={() => navigate('/hr/notificacoes')}>
                <Bell className="w-4 h-4 mr-2" />
                Ver Notificações
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Ações Rápidas */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button className="w-full" onClick={() => navigate('/hr/rescisao')}>
                <UserX className="w-4 h-4 mr-2" />
                Solicitar Rescisão
              </Button>
              <Button className="w-full" variant="outline" onClick={() => navigate('/hr/afastamento')}>
                <UserMinus className="w-4 h-4 mr-2" />
                Solicitar Afastamento
              </Button>
              <Button className="w-full" variant="outline" onClick={() => navigate('/hr/simulador')}>
                <Calculator className="w-4 h-4 mr-2" />
                Simular Cálculos
              </Button>
              <Button className="w-full" variant="outline" onClick={() => navigate('/hr/documentos')}>
                <FileText className="w-4 h-4 mr-2" />
                Gerenciar Documentos
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notificações Recentes */}
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Notificações Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.slice(0, 3).map((notification) => (
                <div key={notification.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold">{notification.title}</p>
                    <p className="text-sm text-gray-600">{notification.message}</p>
                  </div>
                  <span className="text-sm text-gray-500">{notification.date}</span>
                </div>
              ))}
              {notifications.length === 0 && (
                <p className="text-center text-gray-500">Nenhuma notificação recente</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard; 