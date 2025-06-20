import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import MainLayout from '@/components/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
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

interface DashboardStats {
  totalUsuarios: number;
  totalEmpresas: number;
  totalVagas: number;
  totalCandidaturas: number;
  entrevistasAgendadas: number;
  vagasEfetivadas: number;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalUsuarios: 0,
    totalEmpresas: 0,
    totalVagas: 0,
    totalCandidaturas: 0,
    entrevistasAgendadas: 0,
    vagasEfetivadas: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const statsPromises = [];

        if (user?.role === 'admin' || user?.role === 'prefeitura') {
          // Stats para admin e prefeitura
          statsPromises.push(
            supabase.from('profiles').select('id', { count: 'exact', head: true }),
            supabase.from('empresas').select('id', { count: 'exact', head: true }),
            supabase.from('vagas').select('id', { count: 'exact', head: true }),
            supabase.from('candidaturas').select('id', { count: 'exact', head: true }),
            supabase.from('entrevistas').select('id', { count: 'exact', head: true }).eq('status', 'agendada'),
            supabase.from('candidaturas').select('id', { count: 'exact', head: true }).eq('status', 'hired')
          );
        } else if (user?.role === 'empresa') {
          // Stats para empresa - corrigir a consulta aninhada
          const { data: empresaVagas } = await supabase
            .from('vagas')
            .select('id')
            .eq('empresa_id', user.id);
          
          const vagaIds = empresaVagas?.map(v => v.id) || [];
          
          statsPromises.push(
            supabase.from('vagas').select('id', { count: 'exact', head: true }).eq('empresa_id', user.id),
            vagaIds.length > 0 
              ? supabase.from('candidaturas').select('id', { count: 'exact', head: true }).in('vaga_id', vagaIds)
              : Promise.resolve({ count: 0 }),
            supabase.from('entrevistas').select('id', { count: 'exact', head: true }).eq('status', 'agendada')
          );
        } else if (user?.role === 'cidadao') {
          // Stats para cidadão
          statsPromises.push(
            supabase.from('candidaturas').select('id', { count: 'exact', head: true }).eq('cidadao_id', user.id),
            supabase.from('entrevistas').select('id', { count: 'exact', head: true }).eq('status', 'agendada')
          );
        }

        const results = await Promise.all(statsPromises);
        
        if (user?.role === 'admin' || user?.role === 'prefeitura') {
          setStats({
            totalUsuarios: results[0]?.count || 0,
            totalEmpresas: results[1]?.count || 0,
            totalVagas: results[2]?.count || 0,
            totalCandidaturas: results[3]?.count || 0,
            entrevistasAgendadas: results[4]?.count || 0,
            vagasEfetivadas: results[5]?.count || 0
          });
        } else if (user?.role === 'empresa') {
          setStats({
            totalUsuarios: 0,
            totalEmpresas: 0,
            totalVagas: results[0]?.count || 0,
            totalCandidaturas: results[1]?.count || 0,
            entrevistasAgendadas: results[2]?.count || 0,
            vagasEfetivadas: 0
          });
        } else if (user?.role === 'cidadao') {
          setStats({
            totalUsuarios: 0,
            totalEmpresas: 0,
            totalVagas: 0,
            totalCandidaturas: results[0]?.count || 0,
            entrevistasAgendadas: results[1]?.count || 0,
            vagasEfetivadas: 0
          });
        }
      } catch (error) {
        console.error('Erro ao buscar estatísticas:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchStats();
    }
  }, [user]);

  const getStatsForRole = () => {
    switch (user?.role) {
      case 'admin':
      case 'prefeitura':
        return [
          { title: 'Total de Usuários', value: stats.totalUsuarios.toString(), icon: Users, color: 'text-blue-600' },
          { title: 'Empresas Cadastradas', value: stats.totalEmpresas.toString(), icon: Building2, color: 'text-green-600' },
          { title: 'Vagas Abertas', value: stats.totalVagas.toString(), icon: Briefcase, color: 'text-purple-600' },
          { title: 'Entrevistas Agendadas', value: stats.entrevistasAgendadas.toString(), icon: Calendar, color: 'text-orange-600' },
        ];
      case 'empresa':
        return [
          { title: 'Minhas Vagas', value: stats.totalVagas.toString(), icon: Briefcase, color: 'text-blue-600' },
          { title: 'Candidaturas Recebidas', value: stats.totalCandidaturas.toString(), icon: Users, color: 'text-green-600' },
          { title: 'Entrevistas Agendadas', value: stats.entrevistasAgendadas.toString(), icon: Calendar, color: 'text-purple-600' },
          { title: 'Contratações', value: '0', icon: UserCheck, color: 'text-orange-600' },
        ];
      case 'cidadao':
        return [
          { title: 'Candidaturas Enviadas', value: stats.totalCandidaturas.toString(), icon: Briefcase, color: 'text-blue-600' },
          { title: 'Entrevistas Agendadas', value: stats.entrevistasAgendadas.toString(), icon: Calendar, color: 'text-green-600' },
          { title: 'Empresas Interessadas', value: '0', icon: Building2, color: 'text-purple-600' },
          { title: 'Perfil Visualizado', value: '0', icon: TrendingUp, color: 'text-orange-600' },
        ];
      default:
        return [];
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </MainLayout>
    );
  }

  const currentStats = getStatsForRole();

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
          {currentStats.map((stat, index) => (
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
                <div className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700">Sistema conectado ao banco de dados</p>
                </div>
                <div className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700">Autenticação configurada</p>
                </div>
                <div className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700">Políticas de segurança ativadas</p>
                </div>
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

                {(user?.role === 'prefeitura' || user?.role === 'admin') && (
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
