import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Bell, Calculator, FileText, History, Settings } from "lucide-react";

const LeaveAndTermination = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Sistema de Gestão de Processos de Afastamento e Rescisão</h1>
      
      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="rescisao">Rescisão</TabsTrigger>
          <TabsTrigger value="afastamento">Afastamento</TabsTrigger>
          <TabsTrigger value="historico">Histórico</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notificações
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm">Seu pedido de afastamento foi aprovado!</p>
                  <p className="text-sm">A rescisão foi finalizada!</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Simulações
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Simular Rescisão
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Documentos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Ver Documentos
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="rescisao" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resumo de Rescisão</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Saldo de Salário:</span>
                  <span>R$ 2.500</span>
                </div>
                <div className="flex justify-between">
                  <span>Férias Proporcionais:</span>
                  <span>R$ 1.000</span>
                </div>
                <div className="flex justify-between">
                  <span>13º Salário Proporcional:</span>
                  <span>R$ 800</span>
                </div>
                <div className="flex justify-between">
                  <span>Aviso Prévio:</span>
                  <span>R$ 2.000</span>
                </div>
                <div className="flex justify-between">
                  <span>Multa do FGTS:</span>
                  <span>R$ 500</span>
                </div>
                <div className="flex justify-between">
                  <span>Outros Benefícios:</span>
                  <span>R$ 300</span>
                </div>
                <div className="flex justify-between">
                  <span>Descontos (INSS, IR):</span>
                  <span>-R$ 400</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total da Rescisão:</span>
                  <span>R$ 6.300</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="afastamento" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resumo de Afastamento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Tipo de Afastamento:</span>
                  <span>Acidente de Trabalho (100% do salário)</span>
                </div>
                <div className="flex justify-between">
                  <span>Período de Afastamento:</span>
                  <span>30 dias</span>
                </div>
                <div className="flex justify-between">
                  <span>Valor Diária:</span>
                  <span>R$ 100</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total a Receber:</span>
                  <span>R$ 3.000</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="historico" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Processos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-b pb-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Rescisão - 20/12/2024</span>
                    <span>Total: R$ 6.300</span>
                  </div>
                </div>
                <div className="border-b pb-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Afastamento - 15/11/2024</span>
                    <span>Total: R$ 2.500</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LeaveAndTermination; 