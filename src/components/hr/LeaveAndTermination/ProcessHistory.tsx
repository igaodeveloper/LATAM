import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ProcessHistory = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Histórico de Processos</h1>

      {/* Filtros */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tipoProcesso">Tipo de Processo</Label>
              <select className="w-full p-2 border rounded-md" id="tipoProcesso">
                <option value="todos">Todos</option>
                <option value="rescisao">Rescisão</option>
                <option value="afastamento">Afastamento</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dataInicio">Data Inicial</Label>
              <Input type="date" id="dataInicio" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dataFim">Data Final</Label>
              <Input type="date" id="dataFim" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Processos */}
      <div className="space-y-4">
        {/* Rescisão */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold">Rescisão de Contrato</h3>
                <p className="text-gray-600">Data: 20/12/2024</p>
                <p className="text-gray-600">Status: Concluído</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-600">R$ 6.300,00</p>
                <Button variant="outline" className="mt-2">Ver Detalhes</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Afastamento */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold">Afastamento por Acidente</h3>
                <p className="text-gray-600">Data: 15/11/2024</p>
                <p className="text-gray-600">Status: Em Andamento</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">R$ 2.500,00</p>
                <Button variant="outline" className="mt-2">Ver Detalhes</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Licença Maternidade */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold">Licença Maternidade</h3>
                <p className="text-gray-600">Data: 01/10/2024</p>
                <p className="text-gray-600">Status: Concluído</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-600">R$ 4.500,00</p>
                <Button variant="outline" className="mt-2">Ver Detalhes</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Paginação */}
      <div className="flex justify-center mt-6 space-x-2">
        <Button variant="outline">Anterior</Button>
        <Button>1</Button>
        <Button variant="outline">2</Button>
        <Button variant="outline">3</Button>
        <Button variant="outline">Próximo</Button>
      </div>
    </div>
  );
};

export default ProcessHistory; 