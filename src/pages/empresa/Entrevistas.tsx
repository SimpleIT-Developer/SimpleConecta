
import React, { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Video, Phone, User, CheckCircle, XCircle, Edit } from 'lucide-react';

const EntrevistasEmpresa: React.FC = () => {
  // Mock data para entrevistas da empresa
  const [entrevistas] = useState([
    {
      id: '1',
      candidato_nome: 'João Silva',
      vaga_titulo: 'Desenvolvedor Frontend React',
      data_entrevista: '2024-01-20T14:00:00Z',
      tipo: 'video',
      status: 'agendada',
      link_reuniao: 'https://meet.google.com/abc-def-ghi',
      observacoes: 'Candidato com ótimo perfil técnico - preparar perguntas sobre React e TypeScript'
    },
    {
      id: '2',
      candidato_nome: 'Maria Santos',
      vaga_titulo: 'Designer UX/UI',
      data_entrevista: '2024-01-18T10:30:00Z',
      tipo: 'presencial',
      status: 'realizada',
      endereco: 'Rua das Flores, 123 - São Paulo/SP',
      observacoes: 'Entrevista realizada com sucesso. Candidata demonstrou conhecimento em Figma.',
      avaliacao: 'Aprovada para próxima fase'
    },
    {
      id: '3',
      candidato_nome: 'Pedro Costa',
      vaga_titulo: 'Desenvolvedor Frontend React',
      data_entrevista: '2024-01-22T16:00:00Z',
      tipo: 'video',
      status: 'pendente_confirmacao',
      link_reuniao: 'https://zoom.us/j/123456789',
      observacoes: 'Aguardando confirmação do candidato'
    }
  ]);

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

  const handleStartInterview = (link: string) => {
    window.open(link, '_blank');
  };

  const handleScheduleInterview = (id: string) => {
    console.log('Agendando entrevista:', id);
  };

  const handleCancelInterview = (id: string) => {
    console.log('Cancelando entrevista:', id);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Entrevistas</h1>
          <p className="text-gray-600 mt-2">Gerencie suas entrevistas com candidatos</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {entrevistas.map((entrevista) => {
            const dateTime = formatDateTime(entrevista.data_entrevista);
            const isUpcoming = new Date(entrevista.data_entrevista) > new Date();
            
            return (
              <Card key={entrevista.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-50 rounded-lg">
                        <User className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{entrevista.candidato_nome}</CardTitle>
                        <CardDescription>{entrevista.vaga_titulo}</CardDescription>
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

                  {entrevista.avaliacao && (
                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                      <p className="text-sm font-medium text-green-800">Avaliação:</p>
                      <p className="text-sm text-green-700">{entrevista.avaliacao}</p>
                    </div>
                  )}

                  <div className="flex space-x-2 pt-4">
                    {entrevista.status === 'agendada' && isUpcoming && entrevista.link_reuniao && (
                      <Button 
                        onClick={() => handleStartInterview(entrevista.link_reuniao!)}
                        className="flex items-center space-x-2"
                      >
                        <Video className="w-4 h-4" />
                        <span>Iniciar Entrevista</span>
                      </Button>
                    )}
                    
                    {entrevista.status === 'pendente_confirmacao' && (
                      <Button 
                        onClick={() => handleScheduleInterview(entrevista.id)}
                        variant="outline"
                        className="flex items-center space-x-2"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>Reagendar</span>
                      </Button>
                    )}

                    <Button 
                      onClick={() => handleCancelInterview(entrevista.id)}
                      variant="outline"
                      className="flex items-center space-x-2"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Cancelar</span>
                    </Button>

                    {entrevista.status === 'realizada' && (
                      <Button 
                        variant="outline"
                        className="flex items-center space-x-2"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Avaliar</span>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
};

export default EntrevistasEmpresa;
