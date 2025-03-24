import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CalculationSimulator = () => {
  const [salary, setSalary] = useState('');
  const [monthsWorked, setMonthsWorked] = useState('');
  const [leaveDays, setLeaveDays] = useState('');

  const calculateTermination = () => {
    const baseSalary = parseFloat(salary) || 0;
    const months = parseFloat(monthsWorked) || 0;
    
    const saldoSalario = baseSalary;
    const feriasProporcionais = (baseSalary / 12) * months;
    const decimoTerceiro = (baseSalary / 12) * months;
    const avisoPrevio = baseSalary;
    const multaFGTS = baseSalary * 0.4;
    const outrosBeneficios = baseSalary * 0.1;
    const descontos = baseSalary * 0.2;

    return {
      saldoSalario,
      feriasProporcionais,
      decimoTerceiro,
      avisoPrevio,
      multaFGTS,
      outrosBeneficios,
      descontos,
      total: saldoSalario + feriasProporcionais + decimoTerceiro + avisoPrevio + multaFGTS + outrosBeneficios - descontos
    };
  };

  const calculateLeave = () => {
    const baseSalary = parseFloat(salary) || 0;
    const days = parseFloat(leaveDays) || 0;
    
    const valorDiaria = baseSalary / 30;
    const total = valorDiaria * days;

    return {
      valorDiaria,
      total
    };
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Simulador de Cálculos</h1>

      <Tabs defaultValue="rescisao" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="rescisao">Rescisão</TabsTrigger>
          <TabsTrigger value="afastamento">Afastamento</TabsTrigger>
        </TabsList>

        <TabsContent value="rescisao">
          <Card>
            <CardHeader>
              <CardTitle>Simulador de Rescisão</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="salario">Salário Base</Label>
                    <Input
                      type="number"
                      id="salario"
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                      placeholder="R$ 0,00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mesesTrabalhados">Meses Trabalhados</Label>
                    <Input
                      type="number"
                      id="mesesTrabalhados"
                      value={monthsWorked}
                      onChange={(e) => setMonthsWorked(e.target.value)}
                      placeholder="0"
                    />
                  </div>
                </div>

                <Button className="w-full" onClick={() => {}}>
                  Calcular
                </Button>

                <div className="space-y-4 mt-6">
                  <h3 className="font-semibold text-lg">Resultado da Simulação</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Saldo de Salário</span>
                      <span className="font-semibold">{formatCurrency(calculateTermination().saldoSalario)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Férias Proporcionais</span>
                      <span className="font-semibold">{formatCurrency(calculateTermination().feriasProporcionais)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>13º Salário Proporcional</span>
                      <span className="font-semibold">{formatCurrency(calculateTermination().decimoTerceiro)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Aviso Prévio</span>
                      <span className="font-semibold">{formatCurrency(calculateTermination().avisoPrevio)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Multa do FGTS</span>
                      <span className="font-semibold">{formatCurrency(calculateTermination().multaFGTS)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Outros Benefícios</span>
                      <span className="font-semibold">{formatCurrency(calculateTermination().outrosBeneficios)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span>Descontos (INSS, IR)</span>
                      <span className="font-semibold text-red-600">
                        -{formatCurrency(calculateTermination().descontos)}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total da Rescisão</span>
                      <span>{formatCurrency(calculateTermination().total)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="afastamento">
          <Card>
            <CardHeader>
              <CardTitle>Simulador de Afastamento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="salarioAfastamento">Salário Base</Label>
                    <Input
                      type="number"
                      id="salarioAfastamento"
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                      placeholder="R$ 0,00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="diasAfastamento">Dias de Afastamento</Label>
                    <Input
                      type="number"
                      id="diasAfastamento"
                      value={leaveDays}
                      onChange={(e) => setLeaveDays(e.target.value)}
                      placeholder="0"
                    />
                  </div>
                </div>

                <Button className="w-full" onClick={() => {}}>
                  Calcular
                </Button>

                <div className="space-y-4 mt-6">
                  <h3 className="font-semibold text-lg">Resultado da Simulação</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Valor Diária</span>
                      <span className="font-semibold">{formatCurrency(calculateLeave().valorDiaria)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total a Receber</span>
                      <span>{formatCurrency(calculateLeave().total)}</span>
                    </div>
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

export default CalculationSimulator; 