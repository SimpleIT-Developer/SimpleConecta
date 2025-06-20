
import React, { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Plus, Users, Eye, Edit, Calendar } from 'lucide-react';
import { Vaga } from '@/types';

const Vagas: React.FC = () => {
  // Mock data para vagas
  const [vagas] = useState<Vaga[]>([
    {
      id: '1',
      empresa_id: '1',
      title: 'Desenvolvedor Frontend React',
      description: 'Desenvolvedor experiente em React, TypeScript e Tailwind CSS para projetos inovadores.',
      requirements: ['React', 'TypeScript', 'Tailwind CSS', '2+ anos experiência'],
      benefits: 'Vale refeição, plano de saúde, home office flexível',
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
      description: 'Designer criativo para desenvolvimento de interfaces modernas e funcionais.',
      requirements: ['Figma', 'Adobe XD', 'Prototipagem', 'Design System'],
      benefits: 'Vale refeição, plano de saúde, curso online',
      salary_range: 'R$ 4.500 - R$ 7.000',
      work_type: 'presencial',
      contract_type: 'clt',
      location: 'São Paulo/SP',
      status: 'active',
      created_at: new Date().toISOString(),
      candidates_count: 8,
    },
    {
      id: '3',
      empresa_id: '1',
      title: 'Analista de Marketing Digital',
      description: 'Profissional para gerenciar campanhas digitais e estratégias de marketing online.',
      requirements: ['Google Ads', 'Facebook Ads', 'Analytics', 'SEO'],
      benefits: 'Vale refeição, plano de saúde',
      salary_range: 'R$ 3.500 - R$ 5.500',
      work_type: 'remoto',
      contract_type: 'clt',
      location: 'São Paulo/SP',
      status: 'inactive', // Mudado de 'paused' para 'inactive'
      created_at: new Date().toISOString(),
      candidates_count: 5,
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'inactive': return 'secondary'; // Mudado de 'paused' para 'inactive'
      case 'rejected': return 'destructive';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Ativa';
      case 'inactive': return 'Inativa'; // Mudado de 'paused' para 'inactive'
      case 'rejected': return 'Fechada';
      default: return status;
    }
  };

  const getWorkTypeLabel = (type: string) => {
    switch (type) {
      case 'presencial': return 'Presencial';
      case 'remoto': return 'Remoto';
      case 'hibrido': return 'Híbrido';
      default: return type;
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Minhas Vagas</h1>
            <p className="text-gray-600 mt-2">Gerencie suas oportunidades de emprego</p>
          </div>
          <Button className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Nova Vaga</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {vagas.map((vaga) => (
            <Card key={vaga.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Briefcase className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{vaga.title}</CardTitle>
                      <CardDescription>{vaga.location}</CardDescription>
                    </div>
                  </div>
                  <Badge variant={getStatusColor(vaga.status)}>
                    {getStatusLabel(vaga.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 line-clamp-3">
                  {vaga.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{getWorkTypeLabel(vaga.work_type)}</Badge>
                  <Badge variant="outline">{vaga.contract_type.toUpperCase()}</Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Salário:</span>
                    <span className="font-medium">{vaga.salary_range}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Candidatos:</span>
                    <span className="font-medium flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {vaga.candidates_count}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-2 pt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-4 h-4 mr-2" />
                    Ver
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Calendar className="w-4 h-4 mr-2" />
                    Candidatos
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Vagas;
