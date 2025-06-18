
import React, { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Briefcase, Search, CheckCircle, XCircle, MessageCircle, Calendar, Eye } from 'lucide-react';

const Candidatos: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data para candidatos
  const [candidatos] = useState([
    {
      id: '1',
      nome: 'João Silva',
      email: 'joao.silva@email.com',
      cpf: '123.456.789-00',
      telefone: '(11) 99999-9999',
      vaga_titulo: 'Desenvolvedor Frontend React',
      vaga_id: '1',
      status: 'pending',
      applied_at: '2024-01-15T10:00:00Z',
      skills: ['React', 'TypeScript', 'JavaScript', 'CSS'],
      experiencia: '3 anos',
      educacao: 'Superior Completo em Ciência da Computação',
      curriculum_score: 85
    },
    {
      id: '2',
      nome: 'Maria Santos',
      email: 'maria.santos@email.com',
      cpf: '987.654.321-00',
      telefone: '(11) 88888-8888',
      vaga_titulo: 'Designer UX/UI',
      vaga_id: '2',
      status: 'approved',
      applied_at: '2024-01-14T14:30:00Z',
      skills: ['Figma', 'Adobe XD', 'Prototipagem', 'Design System'],
      experiencia: '4 anos',
      educacao: 'Superior Completo em Design',
      curriculum_score: 92
    },
    {
      id: '3',
      nome: 'Pedro Costa',
      email: 'pedro.costa@email.com',
      cpf: '456.789.123-00',
      telefone: '(11) 77777-7777',
      vaga_titulo: 'Desenvolvedor Frontend React',
      vaga_id: '1',
      status: 'interview_scheduled',
      applied_at: '2024-01-13T09:15:00Z',
      skills: ['React', 'Vue.js', 'Node.js', 'MongoDB'],
      experiencia: '2 anos',
      educacao: 'Técnico em Informática',
      curriculum_score: 78
    },
    {
      id: '4',
      nome: 'Ana Oliveira',
      email: 'ana.oliveira@email.com',
      cpf: '789.123.456-00',
      telefone: '(11) 66666-6666',
      vaga_titulo: 'Desenvolvedor Frontend React',
      vaga_id: '1',
      status: 'rejected',
      applied_at: '2024-01-12T16:45:00Z',
      skills: ['HTML', 'CSS', 'JavaScript'],
      experiencia: '1 ano',
      educacao: 'Cursando Superior em Sistemas de Informação',
      curriculum_score: 65,
      rejection_reason: 'Experiência insuficiente para a vaga'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'default';
      case 'approved': return 'secondary';
      case 'interview_scheduled': return 'outline';
      case 'rejected': return 'destructive';
      case 'hired': return 'default';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendente';
      case 'approved': return 'Aprovado';
      case 'interview_scheduled': return 'Entrevista Agendada';
      case 'rejected': return 'Rejeitado';
      case 'hired': return 'Contratado';
      default: return status;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const filteredCandidatos = candidatos.filter(candidato =>
    candidato.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidato.vaga_titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidato.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getCandidatosByStatus = (status: string) => {
    return filteredCandidatos.filter(candidato => candidato.status === status);
  };

  const handleApprove = (id: string) => {
    console.log('Aprovando candidato:', id);
  };

  const handleReject = (id: string) => {
    console.log('Rejeitando candidato:', id);
  };

  const handleScheduleInterview = (id: string) => {
    console.log('Agendando entrevista com candidato:', id);
  };

  const handleChat = (id: string) => {
    console.log('Iniciando chat com candidato:', id);
  };

  const renderCandidatoCard = (candidato: any) => (
    <Card key={candidato.id} className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg">{candidato.nome}</CardTitle>
              <CardDescription>{candidato.vaga_titulo}</CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(candidato.curriculum_score)}`}>
              Score: {candidato.curriculum_score}%
            </div>
            <Badge variant={getStatusColor(candidato.status)}>
              {getStatusLabel(candidato.status)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">Email:</span> {candidato.email}
          </div>
          <div>
            <span className="font-medium">Telefone:</span> {candidato.telefone}
          </div>
          <div>
            <span className="font-medium">Experiência:</span> {candidato.experiencia}
          </div>
          <div>
            <span className="font-medium">Educação:</span> {candidato.educacao}
          </div>
        </div>

        <div>
          <span className="font-medium text-sm">Habilidades:</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {candidato.skills.map((skill, index) => (
              <Badge key={index} variant="secondary">{skill}</Badge>
            ))}
          </div>
        </div>

        {candidato.rejection_reason && (
          <div className="bg-red-50 p-3 rounded-lg border border-red-200">
            <p className="text-sm font-medium text-red-800">Motivo da rejeição:</p>
            <p className="text-sm text-red-700">{candidato.rejection_reason}</p>
          </div>
        )}

        <div className="flex space-x-2 pt-4">
          <Button variant="outline" size="sm" className="flex-1">
            <Eye className="w-4 h-4 mr-2" />
            Ver Currículo
          </Button>
          
          {candidato.status === 'pending' && (
            <>
              <Button 
                onClick={() => handleApprove(candidato.id)}
                size="sm" 
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Aprovar
              </Button>
              <Button 
                onClick={() => handleReject(candidato.id)}
                variant="destructive" 
                size="sm" 
                className="flex-1"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Rejeitar
              </Button>
            </>
          )}

          {candidato.status === 'approved' && (
            <>
              <Button 
                onClick={() => handleScheduleInterview(candidato.id)}
                variant="outline" 
                size="sm" 
                className="flex-1"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Agendar Entrevista
              </Button>
              <Button 
                onClick={() => handleChat(candidato.id)}
                variant="outline" 
                size="sm" 
                className="flex-1"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat
              </Button>
            </>
          )}

          {candidato.status === 'interview_scheduled' && (
            <Button 
              onClick={() => handleChat(candidato.id)}
              variant="outline" 
              size="sm" 
              className="flex-1"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Candidatos</h1>
            <p className="text-gray-600 mt-2">Gerencie os candidatos às suas vagas</p>
          </div>
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-gray-400" />
            <Input
              placeholder="Buscar candidatos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-80"
            />
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">Todos ({filteredCandidatos.length})</TabsTrigger>
            <TabsTrigger value="pending">Pendentes ({getCandidatosByStatus('pending').length})</TabsTrigger>
            <TabsTrigger value="approved">Aprovados ({getCandidatosByStatus('approved').length})</TabsTrigger>
            <TabsTrigger value="interview_scheduled">Entrevistas ({getCandidatosByStatus('interview_scheduled').length})</TabsTrigger>
            <TabsTrigger value="rejected">Rejeitados ({getCandidatosByStatus('rejected').length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredCandidatos.map(renderCandidatoCard)}
            </div>
          </TabsContent>

          <TabsContent value="pending" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {getCandidatosByStatus('pending').map(renderCandidatoCard)}
            </div>
          </TabsContent>

          <TabsContent value="approved" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {getCandidatosByStatus('approved').map(renderCandidatoCard)}
            </div>
          </TabsContent>

          <TabsContent value="interview_scheduled" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {getCandidatosByStatus('interview_scheduled').map(renderCandidatoCard)}
            </div>
          </TabsContent>

          <TabsContent value="rejected" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {getCandidatosByStatus('rejected').map(renderCandidatoCard)}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Candidatos;
