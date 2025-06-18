
import React, { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Search, Eye, FileX, Calendar, AlertTriangle } from 'lucide-react';

const Cidadaos: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data para cidadãos
  const [cidadaos] = useState([
    {
      id: '1',
      nome: 'João Silva',
      email: 'joao.silva@email.com',
      cpf: '123.456.789-00',
      telefone: '(11) 99999-9999',
      birth_date: '1990-05-15',
      address: 'Rua das Flores, 123 - São Paulo/SP',
      education: 'Superior Completo em Ciência da Computação',
      experience: '3 anos como Desenvolvedor Frontend',
      skills: ['React', 'TypeScript', 'JavaScript', 'CSS'],
      curriculum_validity: '2024-12-31',
      status: 'active',
      created_at: '2024-01-10T08:00:00Z',
      candidaturas_ativas: 3
    },
    {
      id: '2',
      nome: 'Maria Santos',
      email: 'maria.santos@email.com',
      cpf: '987.654.321-00',
      telefone: '(11) 88888-8888',
      birth_date: '1988-03-22',
      address: 'Av. Principal, 456 - São Paulo/SP',
      education: 'Superior Completo em Design',
      experience: '4 anos como Designer UX/UI',
      skills: ['Figma', 'Adobe XD', 'Prototipagem', 'Design System'],
      curriculum_validity: '2024-11-30',
      status: 'active',
      created_at: '2024-01-08T14:30:00Z',
      candidaturas_ativas: 2
    },
    {
      id: '3',
      nome: 'Pedro Costa',
      email: 'pedro.costa@email.com',
      cpf: '456.789.123-00',
      telefone: '(11) 77777-7777',
      birth_date: '1995-07-10',
      address: 'Rua Central, 789 - São Paulo/SP',
      education: 'Técnico em Informática',
      experience: '2 anos como Desenvolvedor Junior',
      skills: ['React', 'Vue.js', 'Node.js', 'MongoDB'],
      curriculum_validity: '2024-06-15',
      status: 'active',
      created_at: '2024-01-05T09:15:00Z',
      candidaturas_ativas: 1
    },
    {
      id: '4',
      nome: 'Ana Oliveira',
      email: 'ana.oliveira@email.com',
      cpf: '789.123.456-00',
      telefone: '(11) 66666-6666',
      birth_date: '1992-12-03',
      address: 'Rua Nova, 321 - São Paulo/SP',
      education: 'Cursando Superior em Sistemas de Informação',
      experience: '1 ano como Estagiária de Desenvolvimento',
      skills: ['HTML', 'CSS', 'JavaScript'],
      curriculum_validity: '2024-02-28',
      status: 'inactive',
      created_at: '2024-01-03T16:45:00Z',
      candidaturas_ativas: 0
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'inactive': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'inactive': return 'Inativo';
      default: return status;
    }
  };

  const isValidityExpiring = (validityDate: string) => {
    const validity = new Date(validityDate);
    const now = new Date();
    const diffTime = validity.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays > 0;
  };

  const isValidityExpired = (validityDate: string) => {
    const validity = new Date(validityDate);
    const now = new Date();
    return validity < now;
  };

  const filteredCidadaos = cidadaos.filter(cidadao =>
    cidadao.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cidadao.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cidadao.cpf.includes(searchTerm) ||
    cidadao.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getCidadaosByStatus = (status: string) => {
    if (status === 'expiring') {
      return filteredCidadaos.filter(cidadao => isValidityExpiring(cidadao.curriculum_validity));
    }
    if (status === 'expired') {
      return filteredCidadaos.filter(cidadao => isValidityExpired(cidadao.curriculum_validity));
    }
    return filteredCidadaos.filter(cidadao => cidadao.status === status);
  };

  const handleViewCurriculum = (id: string) => {
    console.log('Visualizando currículo do cidadão:', id);
  };

  const handleDeactivate = (id: string) => {
    console.log('Desativando cidadão:', id);
  };

  const handleExtendValidity = (id: string) => {
    console.log('Estendendo validade do currículo:', id);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getAge = (birthDate: string) => {
    const birth = new Date(birthDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - birth.getTime());
    return Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365.25));
  };

  const renderCidadaoCard = (cidadao: any) => (
    <Card key={cidadao.id} className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <User className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <CardTitle className="text-lg">{cidadao.nome}</CardTitle>
              <CardDescription>
                {getAge(cidadao.birth_date)} anos • CPF: {cidadao.cpf}
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {isValidityExpiring(cidadao.curriculum_validity) && (
              <AlertTriangle className="w-4 h-4 text-yellow-500" />
            )}
            {isValidityExpired(cidadao.curriculum_validity) && (
              <FileX className="w-4 h-4 text-red-500" />
            )}
            <Badge variant={getStatusColor(cidadao.status)}>
              {getStatusLabel(cidadao.status)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">Email:</span> {cidadao.email}
          </div>
          <div>
            <span className="font-medium">Telefone:</span> {cidadao.telefone}
          </div>
          <div>
            <span className="font-medium">Educação:</span> {cidadao.education}
          </div>
          <div>
            <span className="font-medium">Candidaturas Ativas:</span> {cidadao.candidaturas_ativas}
          </div>
        </div>

        <div>
          <span className="font-medium text-sm">Endereço:</span>
          <p className="text-sm text-gray-600 mt-1">{cidadao.address}</p>
        </div>

        <div>
          <span className="font-medium text-sm">Habilidades:</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {cidadao.skills.slice(0, 4).map((skill, index) => (
              <Badge key={index} variant="secondary">{skill}</Badge>
            ))}
            {cidadao.skills.length > 4 && (
              <Badge variant="secondary">+{cidadao.skills.length - 4} mais</Badge>
            )}
          </div>
        </div>

        <div className={`p-3 rounded-lg border ${
          isValidityExpired(cidadao.curriculum_validity) 
            ? 'bg-red-50 border-red-200' 
            : isValidityExpiring(cidadao.curriculum_validity)
            ? 'bg-yellow-50 border-yellow-200'
            : 'bg-green-50 border-green-200'
        }`}>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">Validade do Currículo</p>
              <p className="text-sm">{formatDate(cidadao.curriculum_validity)}</p>
            </div>
            <Calendar className={`w-4 h-4 ${
              isValidityExpired(cidadao.curriculum_validity) 
                ? 'text-red-500' 
                : isValidityExpiring(cidadao.curriculum_validity)
                ? 'text-yellow-500'
                : 'text-green-500'
            }`} />
          </div>
        </div>

        <div className="flex space-x-2 pt-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => handleViewCurriculum(cidadao.id)}
          >
            <Eye className="w-4 h-4 mr-2" />
            Ver Currículo
          </Button>
          
          {isValidityExpiring(cidadao.curriculum_validity) || isValidityExpired(cidadao.curriculum_validity) ? (
            <Button 
              size="sm" 
              className="flex-1"
              onClick={() => handleExtendValidity(cidadao.id)}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Renovar Validade
            </Button>
          ) : (
            <Button 
              variant="destructive" 
              size="sm" 
              className="flex-1"
              onClick={() => handleDeactivate(cidadao.id)}
            >
              <FileX className="w-4 h-4 mr-2" />
              Desativar
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
            <h1 className="text-3xl font-bold text-gray-900">Cidadãos Cadastrados</h1>
            <p className="text-gray-600 mt-2">Gerencie os currículos dos cidadãos</p>
          </div>
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-gray-400" />
            <Input
              placeholder="Buscar cidadãos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-80"
            />
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">Todos ({filteredCidadaos.length})</TabsTrigger>
            <TabsTrigger value="active">Ativos ({getCidadaosByStatus('active').length})</TabsTrigger>
            <TabsTrigger value="expiring">Vencendo ({getCidadaosByStatus('expiring').length})</TabsTrigger>
            <TabsTrigger value="expired">Vencidos ({getCidadaosByStatus('expired').length})</TabsTrigger>
            <TabsTrigger value="inactive">Inativos ({getCidadaosByStatus('inactive').length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredCidadaos.map(renderCidadaoCard)}
            </div>
          </TabsContent>

          <TabsContent value="active" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {getCidadaosByStatus('active').map(renderCidadaoCard)}
            </div>
          </TabsContent>

          <TabsContent value="expiring" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {getCidadaosByStatus('expiring').map(renderCidadaoCard)}
            </div>
          </TabsContent>

          <TabsContent value="expired" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {getCidadaosByStatus('expired').map(renderCidadaoCard)}
            </div>
          </TabsContent>

          <TabsContent value="inactive" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {getCidadaosByStatus('inactive').map(renderCidadaoCard)}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Cidadaos;
