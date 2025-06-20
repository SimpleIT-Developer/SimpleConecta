import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Video, Phone, Building2, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface Entrevista {
  id: string;
  candidatura_id: string;
  data_entrevista: string;
  tipo: string;
  status: string;
  link_reuniao?: string;
  endereco?: string;
  observacoes?: string;
  candidaturas: {
    vagas: {
      title: string;
      empresas: {
        company_name: string;
      };
    };
  };
}

const Entrevistas: React.FC = () => {
  const { user } = useAuth();
  const [entrevistas, setEntrevistas] = useState<Entrevista[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntrevistas = async () => {
      if (!user) return;

      try {
        // Primeiro buscar as candidaturas do usuário
        const { data: candidaturas } = await supabase
          .from('candidaturas')
          .select('id')
          .eq('cidadao_id', user.id);

        const candidaturaIds = candidaturas?.map(c => c.id) || [];

        if (candidaturaIds.length === 0) {
          setEntrevistas([]);
          setLoading(false);
          return;
        }

        // Depois buscar as entrevistas relacionadas
        const { data, error } = await supabase
          .from('entrevistas')
          .select(`
            *,
            candidaturas (
              vagas (
                title,
                empresas (
                  company_name
                )
              )
            )
          `)
          .in('candidatura_id', candidaturaIds)
          .order('data_entrevista', { ascending: true });

        if (error) {
          console.error('Erro ao buscar entrevistas:', error);
        } else {
          setEntrevistas(data || []);
        }
      } catch (error) {
        console.error('Erro ao buscar entrevistas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEntrevistas();
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'agendada': return 'default';
      case 'realizada': return 'secondary';
      case 'pendente_confirmacao': return 'destructive';
      case 'cancelada': return 'outline';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'agendada': return 'Agendada';
      case 'realizada': return 'Realizada';
      case 'pendente_confirmacao': return 'Pendente';
      case 'cancelada': return 'Cancelada';
      default: return status;
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('pt-BR'),
      time: date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };
  };

  const handleJoinMeeting = (link: string) => {
    window.open(link, '_blank');
  };

  const handleConfirmInterview = async (id: string) => {
    try {
      const { error } = await supabase
        .from('entrevistas')
        .update({ status: 'agendada' })
        .eq('id', id);

      if (error) {
        console.error('Erro ao confirmar entrevista:', error);
      } else {
        // Atualizar o estado local
        setEntrevistas(prev => 
          prev.map(e => e.id === id ? { ...e, status: 'agendada' } : e)
        );
      }
    } catch (error) {
      console.error('Erro ao confirmar entrevista:', error);
    }
  };

  const handleCancelInterview = async (id: string) => {
    try {
      const { error } = await supabase
        .from('entrevistas')
        .update({ status: 'cancelada' })
        .eq('id', id);

      if (error) {
        console.error('Erro ao cancelar entrevista:', error);
      } else {
        // Atualizar o estado local
        setEntrevistas(prev => 
          prev.map(e => e.id === id ? { ...e, status: 'cancelada' } : e)
        );
      }
    } catch (error) {
      console.error('Erro ao cancelar entrevista:', error);
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

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Entrevistas</h1>
          <p className="text-gray-600 mt-2">Gerencie suas entrevistas agendadas</p>
        </div>

        {entrevistas.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhuma entrevista agendada
              </h3>
              <p className="text-gray-600">
                Quando você receber convites para entrevistas, elas aparecerão aqui.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {entrevistas.map((entrevista) => {
              const dateTime = formatDateTime(entrevista.data_entrevista);
              const isUpcoming = new Date(entrevista.data_entrevista) > new Date();
              
              return (
                <Card key={entrevista.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <Building2 className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            {entrevista.candidaturas?.vagas?.empresas?.company_name || 'Empresa'}
                          </CardTitle>
                          <CardDescription>
                            {entrevista.candidaturas?.vagas?.title || 'Vaga'}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant={getStatusColor(entrevista.status)}>
                        {getStatusLabel(entrevista.status)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{dateTime.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{dateTime.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {entrevista.tipo === 'video' ? (
                          <Video className="w-4 h-4 text-gray-500" />
                        ) : (
                          <Phone className="w-4 h-4 text-gray-500" />
                        )}
                        <span className="text-sm capitalize">{entrevista.tipo}</span>
                      </div>
                    </div>

                    {entrevista.observacoes && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-700">{entrevista.observacoes}</p>
                      </div>
                    )}

                    {entrevista.endereco && (
                      <div className="text-sm text-gray-600">
                        <strong>Endereço:</strong> {entrevista.endereco}
                      </div>
                    )}

                    <div className="flex space-x-2 pt-4">
                      {entrevista.status === 'agendada' && isUpcoming && entrevista.link_reuniao && (
                        <Button 
                          onClick={() => handleJoinMeeting(entrevista.link_reuniao!)}
                          className="flex items-center space-x-2"
                        >
                          <Video className="w-4 h-4" />
                          <span>Entrar na Reunião</span>
                        </Button>
                      )}
                      
                      {entrevista.status === 'pendente_confirmacao' && (
                        <>
                          <Button 
                            onClick={() => handleConfirmInterview(entrevista.id)}
                            variant="outline"
                            className="flex items-center space-x-2"
                          >
                            <CheckCircle className="w-4 h-4" />
                            <span>Confirmar</span>
                          </Button>
                          <Button 
                            onClick={() => handleCancelInterview(entrevista.id)}
                            variant="outline"
                            className="flex items-center space-x-2"
                          >
                            <XCircle className="w-4 h-4" />
                            <span>Recusar</span>
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Entrevistas;
