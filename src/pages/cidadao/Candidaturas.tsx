import React, { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Briefcase, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Calendar, 
  MessageCircle, 
  Building2, 
  MapPin,
  Eye
} from 'lucide-react';
import { Candidatura, Vaga } from '@/types';

const Candidaturas: React.FC = () => {
  // Mock data para candidaturas
  const [candidaturas] = useState<(Candidatura & { vaga: Vaga; empresa_name: string })[]>([
    {
      id: '1',
      vaga_id: '1',
      cidadao_id: '3',
      status: 'interview_scheduled',
      applied_at: '2024-01-15T10:00:00Z',
      reviewed_at: '2024-01-16T14:30:00Z',
      empresa_approved: true,
      cidadao_approved: true,
      vaga: {
        id: '1',
        empresa_id: '1',
        title: 'Desenvolvedor Frontend React',
        description: 'Desenvolvedor experiente em React, TypeScript e Tailwind CSS',
        requirements: ['React', 'TypeScript', 'Tailwind CSS'],
        benefits: 'Vale refeição, plano de saúde, home office flexível',
        salary_range: 'R$ 6.000 - R$ 9.000',
        work_type: 'hibrido',
        contract_type: 'clt',
        location: 'São Paulo/SP',
        status: 'active',
        created_at: '2024-01-10T08:00:00Z',
      },
      empresa_name: 'Tech Solutions Ltda'
    },
    {
      id: '2',
      vaga_id: '2',
      cidadao_id: '3',
      status: 'approved',
      applied_at: '2024-01-12T09:00:00Z',
      reviewed_at: '2024-01-14T11:00:00Z',
      empresa_approved: true,
      cidadao_approved: false,
      vaga: {
        id: '2',
        empresa_id: '1',
        title: 'Designer UX/UI',
        description: 'Designer criativo para desenvolvimento de interfaces modernas',
        requirements: ['Figma', 'Adobe XD', 'Prototipagem'],
        benefits: 'Vale refeição, plano de saúde, curso online',
        salary_range: 'R$ 4.500 - R$ 7.000',
        work_type: 'presencial',
        contract_type: 'clt',
        location: 'São Paulo/SP',
        status: 'active',
        created_at: '2024-01-08T08:00:00Z',
      },
      empresa_name: 'Tech Solutions Ltda'
    },
    {
      id: '3',
      vaga_id: '4',
      cidadao_id: '3',
      status: 'pending',
      applied_at: '2024-01-18T16:00:00Z',
      empresa_approved: false,
      cidadao_approved: true,
      vaga: {
        id: '4',
        empresa_id: '2',
        title: 'Vendedor Interno',
        description: 'Profissional para atendimento ao cliente e vendas internas',
        requirements: ['Experiência em vendas', 'Boa comunicação'],
        benefits: 'Vale refeição, vale transporte, comissão',
        salary_range: 'R$ 2.500 - R$ 3.800',
        work_type: 'presencial',
        contract_type: 'clt',
        location: 'São Paulo/SP',
        status: 'active',
        created_at: '2024-01-15T08:00:00Z',
      },
      empresa_name: 'Comércio Central'
    },
    {
      id: '4',
      vaga_id: '3',
      cidadao_id: '3',
      status: 'rejected',
      applied_at: '2024-01-10T14:00:00Z',
      reviewed_at: '2024-01-12T09:00:00Z',
      rejection_reason: 'Perfil não compatível com a vaga no momento',
      empresa_approved: false,
      cidadao_approved: true,
      vaga: {
        id: '3',
        empresa_id: '1',
        title: 'Analista de Marketing Digital',
        description: 'Profissional para gerenciar campanhas digitais',
        requirements: ['Google Ads', 'Facebook Ads', 'Analytics'],
        benefits: 'Vale refeição, plano de saúde',
        salary_range: 'R$ 3.500 - R$ 5.500',
        work_type: 'remoto',
        contract_type: 'clt',
        location: 'São Paulo/SP',
        status: 'inactive', // Mudado de 'paused' para 'inactive'
        created_at: '2024-01-05T08:00:00Z',
      },
      empresa_name: 'Tech Solutions Ltda'
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'secondary';
      case 'approved': return 'default';
      case 'rejected': return 'destructive';
      case 'interview_scheduled': return 'default';
      case 'hired': return 'default';
      case 'eliminated': return 'destructive';
      default: return 'secondary';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Aguardando';
      case 'approved': return 'Aprovada';
      case 'rejected': return 'Rejeitada';
      case 'interview_scheduled': return 'Entrevista Agendada';
      case 'hired': return 'Contratado';
      case 'eliminated': return 'Eliminado';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      case 'interview_scheduled': return <Calendar className="w-4 h-4" />;
      case 'hired': return <CheckCircle className="w-4 h-4" />;
      case 'eliminated': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getTimeSince = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Hoje';
    if (diffDays === 1) return 'Ontem';
    if (diffDays <= 7) return `${diffDays} dias atrás`;
    return `${Math.floor(diffDays / 7)} semanas atrás`;
  };

  const filterByStatus = (status: string) => {
    if (status === 'all') return candidaturas;
    return candidaturas.filter(c => c.status === status);
  };

  const CandidaturaCard = ({ candidatura }: { candidatura: typeof candidaturas[0] }) => (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Briefcase className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg">{candidatura.vaga.title}</CardTitle>
              <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                <div className="flex items-center">
                  <Building2 className="w-4 h-4 mr-1" />
                  <span>{candidatura.empresa_name}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{candidatura.vaga.location}</span>
                </div>
              </div>
            </div>
          </div>
          <Badge variant={getStatusColor(candidatura.status)}>
            {getStatusIcon(candidatura.status)}
            <span className="ml-1">{getStatusLabel(candidatura.status)}</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-600 text-sm line-clamp-2">
          {candidatura.vaga.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Candidatura enviada {getTimeSince(candidatura.applied_at)}</span>
          <span className="font-medium text-green-700">{candidatura.vaga.salary_range}</span>
        </div>

        {candidatura.rejection_reason && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-800">
              <strong>Motivo da rejeição:</strong> {candidatura.rejection_reason}
            </p>
          </div>
        )}

        {candidatura.status === 'approved' && !candidatura.cidadao_approved && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-sm text-green-800 mb-2">
              <strong>Parabéns!</strong> Sua candidatura foi aprovada pela empresa.
            </p>
            <div className="flex space-x-2">
              <Button size="sm" variant="default">
                Aceitar
              </Button>
              <Button size="sm" variant="outline">
                Recusar
              </Button>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center pt-2">
          <div className="text-xs text-gray-400">
            {candidatura.reviewed_at && `Avaliada ${getTimeSince(candidatura.reviewed_at)}`}
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Ver Detalhes
            </Button>
            {(candidatura.status === 'interview_scheduled' || candidatura.status === 'approved') && (
              <Button variant="outline" size="sm">
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Minhas Candidaturas</h1>
          <p className="text-gray-600 mt-2">Acompanhe o status das suas candidaturas</p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">
              Todas ({candidaturas.length})
            </TabsTrigger>
            <TabsTrigger value="pending">
              Aguardando ({filterByStatus('pending').length})
            </TabsTrigger>
            <TabsTrigger value="approved">
              Aprovadas ({filterByStatus('approved').length})
            </TabsTrigger>
            <TabsTrigger value="interview_scheduled">
              Entrevistas ({filterByStatus('interview_scheduled').length})
            </TabsTrigger>
            <TabsTrigger value="rejected">
              Rejeitadas ({filterByStatus('rejected').length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {candidaturas.map((candidatura) => (
                <CandidaturaCard key={candidatura.id} candidatura={candidatura} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filterByStatus('pending').map((candidatura) => (
                <CandidaturaCard key={candidatura.id} candidatura={candidatura} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="approved" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filterByStatus('approved').map((candidatura) => (
                <CandidaturaCard key={candidatura.id} candidatura={candidatura} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="interview_scheduled" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filterByStatus('interview_scheduled').map((candidatura) => (
                <CandidaturaCard key={candidatura.id} candidatura={candidatura} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rejected" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filterByStatus('rejected').map((candidatura) => (
                <CandidaturaCard key={candidatura.id} candidatura={candidatura} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {candidaturas.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma candidatura ainda</h3>
              <p className="text-gray-600 mb-4">
                Comece explorando as vagas disponíveis e candidate-se às oportunidades.
              </p>
              <Button>
                Ver Vagas Disponíveis
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default Candidaturas;
