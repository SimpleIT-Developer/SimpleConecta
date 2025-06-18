
import React, { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Search, MapPin, Building2, Clock, DollarSign } from 'lucide-react';
import { Vaga } from '@/types';

const VagasDisponiveis: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data para vagas disponíveis
  const [vagas] = useState<Vaga[]>([
    {
      id: '1',
      empresa_id: '1',
      title: 'Desenvolvedor Frontend React',
      description: 'Procuramos desenvolvedor experiente em React, TypeScript e Tailwind CSS para integrar nossa equipe e trabalhar em projetos inovadores de grande impacto.',
      requirements: ['React', 'TypeScript', 'Tailwind CSS', '2+ anos experiência'],
      benefits: 'Vale refeição, plano de saúde, home office flexível, plano odontológico',
      salary_range: 'R$ 6.000 - R$ 9.000',
      work_type: 'hibrido',
      contract_type: 'clt',
      location: 'São Paulo/SP',
      status: 'active',
      created_at: new Date().toISOString(),
      candidates_count: 12,
    },
    {
      id: '2',
      empresa_id: '1',
      title: 'Designer UX/UI',
      description: 'Designer criativo para desenvolvimento de interfaces modernas e funcionais, trabalhando com equipes multidisciplinares.',
      requirements: ['Figma', 'Adobe XD', 'Prototipagem', 'Design System'],
      benefits: 'Vale refeição, plano de saúde, curso online, ambiente descontraído',
      salary_range: 'R$ 4.500 - R$ 7.000',
      work_type: 'presencial',
      contract_type: 'clt',
      location: 'São Paulo/SP',
      status: 'active',
      created_at: new Date().toISOString(),
      candidates_count: 8,
    },
    {
      id: '4',
      empresa_id: '2',
      title: 'Vendedor Interno',
      description: 'Profissional para atendimento ao cliente e vendas internas, com foco em relacionamento e resultados.',
      requirements: ['Experiência em vendas', 'Boa comunicação', 'Pacote Office'],
      benefits: 'Vale refeição, vale transporte, comissão sobre vendas',
      salary_range: 'R$ 2.500 - R$ 3.800',
      work_type: 'presencial',
      contract_type: 'clt',
      location: 'São Paulo/SP',
      status: 'active',
      created_at: new Date().toISOString(),
      candidates_count: 15,
    },
    {
      id: '5',
      empresa_id: '2',
      title: 'Auxiliar Administrativo',
      description: 'Auxiliar administrativo para apoio nas atividades gerais do escritório e atendimento ao público.',
      requirements: ['Ensino médio completo', 'Informática básica', 'Organização'],
      benefits: 'Vale refeição, vale transporte, plano de saúde',
      salary_range: 'R$ 1.800 - R$ 2.400',
      work_type: 'presencial',
      contract_type: 'clt',
      location: 'São Paulo/SP',
      status: 'active',
      created_at: new Date().toISOString(),
      candidates_count: 22,
    },
  ]);

  const filteredVagas = vagas.filter(vaga =>
    vaga.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vaga.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vaga.requirements.some(req => req.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getWorkTypeLabel = (type: string) => {
    switch (type) {
      case 'presencial': return 'Presencial';
      case 'remoto': return 'Remoto';
      case 'hibrido': return 'Híbrido';
      default: return type;
    }
  };

  const getWorkTypeColor = (type: string) => {
    switch (type) {
      case 'presencial': return 'default';
      case 'remoto': return 'secondary';
      case 'hibrido': return 'outline';
      default: return 'default';
    }
  };

  const getTimeSince = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Hoje';
    if (diffDays <= 7) return `${diffDays} dias atrás`;
    if (diffDays <= 30) return `${Math.floor(diffDays / 7)} semanas atrás`;
    return `${Math.floor(diffDays / 30)} meses atrás`;
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Vagas Disponíveis</h1>
            <p className="text-gray-600 mt-2">Encontre oportunidades que combinam com seu perfil</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Oportunidades para Você</CardTitle>
                <CardDescription>
                  {filteredVagas.length} vagas encontradas
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Search className="w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Buscar por cargo, empresa ou habilidade..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-80"
                />
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredVagas.map((vaga) => (
            <Card key={vaga.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <Briefcase className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{vaga.title}</CardTitle>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                        <div className="flex items-center">
                          <Building2 className="w-4 h-4 mr-1" />
                          <span>Tech Solutions</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{vaga.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{getTimeSince(vaga.created_at)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  {vaga.description}
                </p>
                
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="font-semibold text-green-700">{vaga.salary_range}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant={getWorkTypeColor(vaga.work_type)}>
                    {getWorkTypeLabel(vaga.work_type)}
                  </Badge>
                  <Badge variant="outline">{vaga.contract_type.toUpperCase()}</Badge>
                  {vaga.requirements.slice(0, 3).map((req, index) => (
                    <Badge key={index} variant="secondary">{req}</Badge>
                  ))}
                  {vaga.requirements.length > 3 && (
                    <Badge variant="secondary">+{vaga.requirements.length - 3} mais</Badge>
                  )}
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-1">Benefícios:</p>
                  <p className="text-sm text-gray-600">{vaga.benefits}</p>
                </div>

                <div className="flex justify-between items-center pt-4">
                  <div className="text-sm text-gray-500">
                    {vaga.candidates_count} candidatos
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline">
                      Ver Detalhes
                    </Button>
                    <Button>
                      Candidatar-se
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredVagas.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma vaga encontrada</h3>
              <p className="text-gray-600">
                Tente ajustar seus filtros de busca ou verifique novamente mais tarde.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default VagasDisponiveis;
