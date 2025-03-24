import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const Termination = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Rescisão de Contrato</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulário de Rescisão */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Detalhes da Rescisão</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dataRescisao">Data da Rescisão</Label>
                  <Input type="date" id="dataRescisao" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tipoRescisao">Tipo de Rescisão</Label>
                  <select className="w-full p-2 border rounded-md" id="tipoRescisao">
                    <option value="demissao">Demissão</option>
                    <option value="pedido">Pedido de Demissão</option>
                    <option value="justaCausa">Justa Causa</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="motivo">Motivo (opcional)</Label>
                <textarea className="w-full p-2 border rounded-md" id="motivo" rows={3} />
              </div>
              <Button className="w-full">Solicitar Rescisão</Button>
            </div>
          </CardContent>
        </Card>

        {/* Resumo de Valores */}
        <Card>
          <CardHeader>
            <CardTitle>Resumo de Valores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Saldo de Salário</span>
                <span className="font-semibold">R$ 2.500,00</span>
              </div>
              <div className="flex justify-between">
                <span>Férias Proporcionais</span>
                <span className="font-semibold">R$ 1.000,00</span>
              </div>
              <div className="flex justify-between">
                <span>13º Salário Proporcional</span>
                <span className="font-semibold">R$ 800,00</span>
              </div>
              <div className="flex justify-between">
                <span>Aviso Prévio</span>
                <span className="font-semibold">R$ 2.000,00</span>
              </div>
              <div className="flex justify-between">
                <span>Multa do FGTS</span>
                <span className="font-semibold">R$ 500,00</span>
              </div>
              <div className="flex justify-between">
                <span>Outros Benefícios</span>
                <span className="font-semibold">R$ 300,00</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span>Descontos (INSS, IR)</span>
                <span className="font-semibold text-red-600">-R$ 400,00</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total da Rescisão</span>
                <span>R$ 6.300,00</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documentos Necessários */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Documentos Necessários</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold">Carteira de Trabalho</p>
                  <p className="text-sm text-gray-600">Digitalização da CTPS</p>
                </div>
                <Button variant="outline">Enviar</Button>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold">Comprovante de Residência</p>
                  <p className="text-sm text-gray-600">Últimos 3 meses</p>
                </div>
                <Button variant="outline">Enviar</Button>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold">Documento de Identidade</p>
                  <p className="text-sm text-gray-600">RG e CPF</p>
                </div>
                <Button variant="outline">Enviar</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Termination; 