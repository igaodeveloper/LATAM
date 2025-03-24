import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const Leave = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Afastamento Temporário</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulário de Afastamento */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Detalhes do Afastamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tipoAfastamento">Tipo de Afastamento</Label>
                  <select className="w-full p-2 border rounded-md" id="tipoAfastamento">
                    <option value="acidente">Acidente de Trabalho</option>
                    <option value="doenca">Doença</option>
                    <option value="maternidade">Licença Maternidade</option>
                    <option value="paternidade">Licença Paternidade</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dataInicio">Data de Início</Label>
                  <Input type="date" id="dataInicio" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dataFim">Data de Retorno</Label>
                  <Input type="date" id="dataFim" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="diasAfastamento">Dias de Afastamento</Label>
                  <Input type="number" id="diasAfastamento" readOnly value="30" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="motivo">Motivo Detalhado</Label>
                <textarea className="w-full p-2 border rounded-md" id="motivo" rows={3} />
              </div>
              <Button className="w-full">Solicitar Afastamento</Button>
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
                <span>Tipo de Afastamento</span>
                <span className="font-semibold">Acidente de Trabalho</span>
              </div>
              <div className="flex justify-between">
                <span>Período</span>
                <span className="font-semibold">30 dias</span>
              </div>
              <div className="flex justify-between">
                <span>Valor Diária</span>
                <span className="font-semibold">R$ 100,00</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total a Receber</span>
                <span>R$ 3.000,00</span>
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
                  <p className="font-semibold">Atestado Médico</p>
                  <p className="text-sm text-gray-600">Documento comprobatório do afastamento</p>
                </div>
                <Button variant="outline">Enviar</Button>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold">Comunicado de Acidente</p>
                  <p className="text-sm text-gray-600">CAT - Comunicação de Acidente de Trabalho</p>
                </div>
                <Button variant="outline">Enviar</Button>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold">Exames Complementares</p>
                  <p className="text-sm text-gray-600">Resultados de exames médicos</p>
                </div>
                <Button variant="outline">Enviar</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Integração com INSS */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Integração com INSS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold">Status do INSS</p>
                  <p className="text-sm text-gray-600">Processo em análise</p>
                </div>
                <Button variant="outline">Ver Detalhes</Button>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold">Valor do Auxílio-Doença</p>
                  <p className="text-sm text-gray-600">R$ 2.500,00</p>
                </div>
                <Button variant="outline">Ver Cálculo</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Leave; 