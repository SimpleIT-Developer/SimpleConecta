
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import MainLayout from '@/components/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  Building2, 
  Briefcase, 
  Calendar,
  TrendingUp,
  CheckCircle,
  Clock,
  UserCheck
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  // Mock data para demonstração
  const dashboardData = {
    admin: {
      stats: [
        { title: 'Total de Usuários', value: '1,234', icon: Users, color: 'text-blue-600' },
        { title: 'Empresas Ativas', value: '89', icon: Building2, color: 'text-green-600' },
        { title: 'Vagas Abertas', value: '156', icon: Briefcase, color: 'text-purple-600' },
        { title: 'Entrevistas Hoje', value: '23', icon: Calendar, color: 'text-orange-600' },
      ],
      recentActivities: [
        'Nova empresa cadastrada: Tech Solutions',
        'Cidadão João Silva contratado',
        'Vaga de desenvolvedor preenchida',
        '15 novos cadastros de cidadãos hoje',
      ]
    },
    prefeitura: {
      stats: [
        { title: 'Empresas Cadastradas', value: '89', icon: Building2, color: 'text-blue-600' },
        { title: 'Cidadãos Ativos', value: '567', icon: Users, color: 'text-green-600' },
        { title: 'Vagas Efetivadas', value: '45', icon: CheckCircle, color: 'text-purple-600' },
        { title: 'Entrevistas Realizadas', value: '234', icon: Calendar, color: 'text-orange-600' },
      ],
      recentActivities: [
        'Empresa TechCorp aprovada para cadastro',
        'Relatório mensal de colocações gerado',
        'Meta de empregos deste mês: 80% atingida',
        'Workshop de capacitação agendado',
      ]
    },
    empresa: {
      stats: [
        { title: 'Vagas Abertas', value: '12', icon: Briefcase, color: 'text-blue-600' },
        { title: 'Candidatos Ativos', value: '156', icon: Users, color: 'text-green-600' },
        { title: 'Entrevistas Agendadas', value: '8', icon: Calendar, color: 'text-purple-600' },
        { title: 'Contratações Este Mês', value: '3', icon: UserCheck, color: 'text-orange-600' },
      ],
      recentActivities: [
        'Nova candidatura para vaga de Designer',
        'Entrevista com Maria Santos agendada',
        'Vaga de analista preenchida',
        '5 novos candidatos qualificados',
      ]
    },
    cidadao: {
      stats: [
        { title: 'Candidaturas Enviadas', value: '8', icon: Briefcase, color: 'text-blue-600' },
        { title: 'Entrevistas Agendadas', value: '2', icon: Calendar, color: 'text-green-600' },
        { title: 'Empresas Interessadas', value: '5', icon: Building2, color: 'text-purple-600' },
        { title: 'Perfil Visualizado', value: '34', icon: TrendingUp, color: 'text-orange-600' },
      ],
      recentActivities: [
        'Nova vaga compatível encontrada',
        'Empresa TechSolutions visualizou seu perfil',
        'Entrevista com DevCorp confirmada',
        'Currículo atualizado com sucesso',
      ]
    }
  };

  const currentData = dashboardData[user?.role as keyof typeof dashboardData];

  if (!currentData) {
    return (
      <MainLayout>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard não disponível</h1>
          <p className="text-gray-600">Tipo de usuário não reconhecido.</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Bem-vindo, {user?.name}!
          </h1>
          <p className="text-gray-600 mt-2">
            Aqui está um resumo das suas atividades recentes.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentData.stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-50 ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Atividades Recentes</span>
              </CardTitle>
              <CardDescription>
                Últimas atualizações do sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentData.recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">{activity}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Ações Rápidas</span>
              </CardTitle>
              <CardDescription>
                Acesso rápido às principais funcionalidades
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {user?.role === 'empresa' && (
                  <>
                    <button className="w-full text-left p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
                      <div className="font-medium text-blue-900">Criar Nova Vaga</div>
                      <div className="text-sm text-blue-600">Publique uma nova oportunidade</div>
                    </button>
                    <button className="w-full text-left p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
                      <div className="font-medium text-green-900">Ver Candidatos</div>
                      <div className="text-sm text-green-600">Analise os perfis interessados</div>
                    </button>
                  </>
                )}
                
                {user?.role === 'cidadao' && (
                  <>
                    <button className="w-full text-left p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
                      <div className="font-medium text-blue-900">Buscar Vagas</div>
                      <div className="text-sm text-blue-600">Encontre oportunidades ideais</div>
                    </button>
                    <button className="w-full text-left p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
                      <div className="font-medium text-green-900">Atualizar Currículo</div>
                      <div className="text-sm text-green-600">Mantenha seu perfil atualizado</div>
                    </button>
                  </>
                )}

                {user?.role === 'prefeitura' && (
                  <>
                    <button className="w-full text-left p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
                      <div className="font-medium text-blue-900">Cadastrar Empresa</div>
                      <div className="text-sm text-blue-600">Adicione nova empresa parceira</div>
                    </button>
                    <button className="w-full text-left p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
                      <div className="font-medium text-green-900">Ver Relatórios</div>
                      <div className="text-sm text-green-600">Acompanhe as métricas</div>
                    </button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
