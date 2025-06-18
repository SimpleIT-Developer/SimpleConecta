
import React, { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Users, Building2, Briefcase, TrendingUp, Download, FileText } from 'lucide-react';

const Relatorios: React.FC = () => {
  const [periodoSelecionado, setPeriodoSelecionado] = useState('30');

  // Dados mock para os gráficos
  const dadosGerais = {
    totalCidadaos: 1250,
    totalEmpresas: 87,
    totalVagas: 156,
    candidaturasAtivas: 340,
  };

  const dadosVagasPorSetor = [
    { setor: 'Tecnologia', vagas: 45 },
    { setor: 'Varejo', vagas: 32 },
    { setor: 'Serviços', vagas: 28 },
    { setor: 'Indústria', vagas: 25 },
    { setor: 'Construção', vagas: 15 },
    { setor: 'Saúde', vagas: 11 },
  ];

  const dadosCandidaturasPorMes = [
    { mes: 'Jan', candidaturas: 65 },
    { mes: 'Fev', candidaturas: 78 },
    { mes: 'Mar', candidaturas: 92 },
    { mes: 'Abr', candidaturas: 85 },
    { mes: 'Mai', candidaturas: 110 },
    { mes: 'Jun', candidaturas: 125 },
  ];

  const dadosStatusCandidaturas = [
    { nome: 'Em Análise', valor: 45, cor: '#fbbf24' },
    { nome: 'Aprovadas', valor: 28, cor: '#10b981' },
    { nome: 'Rejeitadas', valor: 27, cor: '#ef4444' },
  ];

  const chartConfig = {
    vagas: {
      label: "Vagas",
      color: "#2563eb",
    },
    candidaturas: {
      label: "Candidaturas",
      color: "#dc2626",
    },
  };

  const gerarRelatorio = (tipo: string) => {
    console.log(`Gerando relatório: ${tipo}`);
    // Aqui seria implementada a lógica para gerar e baixar o relatório
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Relatórios</h1>
            <p className="text-gray-600 mt-2">Acompanhe as estatísticas e métricas do sistema</p>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={periodoSelecionado} onValueChange={setPeriodoSelecionado}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Últimos 7 dias</SelectItem>
                <SelectItem value="30">Últimos 30 dias</SelectItem>
                <SelectItem value="90">Últimos 90 dias</SelectItem>
                <SelectItem value="365">Último ano</SelectItem>
              </SelectContent>
            </Select>
            <Button className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Exportar</span>
            </Button>
          </div>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total de Cidadãos</p>
                  <p className="text-2xl font-bold">{dadosGerais.totalCidadaos}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <Building2 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Empresas Cadastradas</p>
                  <p className="text-2xl font-bold">{dadosGerais.totalEmpresas}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-50 rounded-lg">
                  <Briefcase className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Vagas Ativas</p>
                  <p className="text-2xl font-bold">{dadosGerais.totalVagas}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-orange-50 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Candidaturas Ativas</p>
                  <p className="text-2xl font-bold">{dadosGerais.candidaturasAtivas}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="visao-geral" className="space-y-6">
          <TabsList>
            <TabsTrigger value="visao-geral">Visão Geral</TabsTrigger>
            <TabsTrigger value="empresas">Empresas</TabsTrigger>
            <TabsTrigger value="cidadaos">Cidadãos</TabsTrigger>
            <TabsTrigger value="vagas">Vagas</TabsTrigger>
          </TabsList>

          <TabsContent value="visao-geral">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Vagas por Setor</CardTitle>
                  <CardDescription>Distribuição das vagas disponíveis por setor</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={dadosVagasPorSetor}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="setor" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="vagas" fill="var(--color-vagas)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Status das Candidaturas</CardTitle>
                  <CardDescription>Distribuição atual das candidaturas</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={dadosStatusCandidaturas}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="valor"
                          label={({ nome, valor }) => `${nome}: ${valor}`}
                        >
                          {dadosStatusCandidaturas.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.cor} />
                          ))}
                        </Pie>
                        <ChartTooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Evolução das Candidaturas</CardTitle>
                <CardDescription>Número de candidaturas por mês</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={dadosCandidaturasPorMes}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="mes" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="candidaturas" stroke="var(--color-candidaturas)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="empresas">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Relatórios de Empresas</CardTitle>
                  <CardDescription>Gere relatórios específicos sobre empresas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    onClick={() => gerarRelatorio('empresas-cadastradas')}
                    className="w-full flex items-center justify-center space-x-2"
                    variant="outline"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Empresas Cadastradas</span>
                  </Button>
                  <Button
                    onClick={() => gerarRelatorio('empresas-ativas')}
                    className="w-full flex items-center justify-center space-x-2"
                    variant="outline"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Empresas com Vagas Ativas</span>
                  </Button>
                  <Button
                    onClick={() => gerarRelatorio('empresas-setor')}
                    className="w-full flex items-center justify-center space-x-2"
                    variant="outline"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Empresas por Setor</span>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Métricas de Empresas</CardTitle>
                  <CardDescription>Estatísticas das empresas cadastradas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">Empresas Aprovadas</p>
                      <p className="text-xl font-semibold">72 (82.8%)</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Empresas Pendentes</p>
                      <p className="text-xl font-semibold">15 (17.2%)</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Média de Vagas por Empresa</p>
                      <p className="text-xl font-semibold">1.8</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="cidadaos">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Relatórios de Cidadãos</CardTitle>
                  <CardDescription>Gere relatórios específicos sobre cidadãos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    onClick={() => gerarRelatorio('cidadaos-cadastrados')}
                    className="w-full flex items-center justify-center space-x-2"
                    variant="outline"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Cidadãos Cadastrados</span>
                  </Button>
                  <Button
                    onClick={() => gerarRelatorio('curriculos-validos')}
                    className="w-full flex items-center justify-center space-x-2"
                    variant="outline"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Currículos Válidos</span>
                  </Button>
                  <Button
                    onClick={() => gerarRelatorio('candidaturas-ativas')}
                    className="w-full flex items-center justify-center space-x-2"
                    variant="outline"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Candidaturas por Cidadão</span>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Métricas de Cidadãos</CardTitle>
                  <CardDescription>Estatísticas dos cidadãos cadastrados</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">Currículos Válidos</p>
                      <p className="text-xl font-semibold">1,087 (87%)</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Currículos Vencidos</p>
                      <p className="text-xl font-semibold">163 (13%)</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Média de Candidaturas</p>
                      <p className="text-xl font-semibold">2.7</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="vagas">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Relatórios de Vagas</CardTitle>
                  <CardDescription>Gere relatórios específicos sobre vagas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    onClick={() => gerarRelatorio('vagas-ativas')}
                    className="w-full flex items-center justify-center space-x-2"
                    variant="outline"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Vagas Ativas</span>
                  </Button>
                  <Button
                    onClick={() => gerarRelatorio('vagas-setor')}
                    className="w-full flex items-center justify-center space-x-2"
                    variant="outline"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Vagas por Setor</span>
                  </Button>
                  <Button
                    onClick={() => gerarRelatorio('vagas-preenchidas')}
                    className="w-full flex items-center justify-center space-x-2"
                    variant="outline"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Vagas Preenchidas</span>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Métricas de Vagas</CardTitle>
                  <CardDescription>Estatísticas das vagas disponíveis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">Taxa de Preenchimento</p>
                      <p className="text-xl font-semibold">68%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Tempo Médio para Preenchimento</p>
                      <p className="text-xl font-semibold">18 dias</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Vagas mais Procuradas</p>
                      <p className="text-xl font-semibold">Tecnologia</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Relatorios;
