
import React, { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { FileUser, Edit, Save, Calendar, MapPin, Phone, Mail, User } from 'lucide-react';
import { Cidadao } from '@/types';

const Curriculo: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock data para o currículo do cidadão
  const [cidadao, setCidadao] = useState<Partial<Cidadao>>({
    id: '3',
    name: 'João Silva',
    email: 'joao.silva@email.com',
    role: 'cidadao',
    cpf: '123.456.789-00',
    phone: '(11) 99999-9999',
    birth_date: '1990-05-15',
    address: 'Rua das Palmeiras, 789 - São Paulo/SP',
    education: 'Superior Completo - Ciência da Computação',
    experience: 'Desenvolvedor Frontend com 3 anos de experiência em React, JavaScript e CSS. Trabalhei em projetos de e-commerce e sistemas web.',
    skills: ['React', 'JavaScript', 'TypeScript', 'CSS', 'Node.js', 'Git'],
    curriculum_validity: '2025-12-31',
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });

  const handleSave = () => {
    setIsEditing(false);
    // Aqui seria feita a chamada para salvar no backend
    console.log('Salvando currículo:', cidadao);
  };

  const addSkill = (skill: string) => {
    if (skill && cidadao.skills && !cidadao.skills.includes(skill)) {
      setCidadao(prev => ({
        ...prev,
        skills: [...(prev.skills || []), skill]
      }));
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setCidadao(prev => ({
      ...prev,
      skills: prev.skills?.filter(skill => skill !== skillToRemove) || []
    }));
  };

  const isValidityExpiringSoon = () => {
    if (!cidadao.curriculum_validity) return false;
    const validityDate = new Date(cidadao.curriculum_validity);
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    return validityDate <= thirtyDaysFromNow;
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Meu Currículo</h1>
            <p className="text-gray-600 mt-2">Mantenha suas informações sempre atualizadas</p>
          </div>
          <div className="flex space-x-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  Salvar
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="w-4 h-4 mr-2" />
                Editar
              </Button>
            )}
          </div>
        </div>

        {isValidityExpiringSoon() && (
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="font-medium text-orange-900">Atenção: Currículo próximo do vencimento</p>
                  <p className="text-sm text-orange-700">
                    Válido até: {new Date(cidadao.curriculum_validity!).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Dados Pessoais */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Dados Pessoais</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    value={cidadao.name || ''}
                    onChange={(e) => setCidadao(prev => ({ ...prev, name: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="cpf">CPF</Label>
                  <Input
                    id="cpf"
                    value={cidadao.cpf || ''}
                    disabled={true}
                    className="bg-gray-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={cidadao.email || ''}
                    onChange={(e) => setCidadao(prev => ({ ...prev, email: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={cidadao.phone || ''}
                    onChange={(e) => setCidadao(prev => ({ ...prev, phone: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Endereço</Label>
                <Input
                  id="address"
                  value={cidadao.address || ''}
                  onChange={(e) => setCidadao(prev => ({ ...prev, address: e.target.value }))}
                  disabled={!isEditing}
                />
              </div>

              <div>
                <Label htmlFor="education">Formação</Label>
                <Input
                  id="education"
                  value={cidadao.education || ''}
                  onChange={(e) => setCidadao(prev => ({ ...prev, education: e.target.value }))}
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
          </Card>

          {/* Status */}
          <Card>
            <CardHeader>
              <CardTitle>Status do Currículo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <FileUser className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium">Ativo</p>
                  <p className="text-sm text-gray-600">Participando de processos</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Válido até:</span>
                  <span className="font-medium">
                    {new Date(cidadao.curriculum_validity!).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Última atualização:</span>
                  <span className="font-medium">
                    {new Date(cidadao.updated_at!).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Experiência */}
        <Card>
          <CardHeader>
            <CardTitle>Experiência Profissional</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={cidadao.experience || ''}
              onChange={(e) => setCidadao(prev => ({ ...prev, experience: e.target.value }))}
              disabled={!isEditing}
              rows={4}
              placeholder="Descreva sua experiência profissional..."
            />
          </CardContent>
        </Card>

        {/* Habilidades */}
        <Card>
          <CardHeader>
            <CardTitle>Habilidades</CardTitle>
            <CardDescription>
              {isEditing ? 'Digite uma habilidade e pressione Enter para adicionar' : 'Suas principais competências'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {cidadao.skills?.map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className={isEditing ? 'cursor-pointer hover:bg-red-100' : ''}
                  onClick={() => isEditing && removeSkill(skill)}
                >
                  {skill}
                  {isEditing && <span className="ml-1">×</span>}
                </Badge>
              ))}
            </div>
            
            {isEditing && (
              <Input
                placeholder="Digite uma habilidade e pressione Enter"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    const input = e.target as HTMLInputElement;
                    addSkill(input.value);
                    input.value = '';
                  }
                }}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Curriculo;
