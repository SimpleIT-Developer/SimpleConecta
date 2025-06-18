
import React, { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Building2, Plus, Search, Eye, CheckCircle, XCircle } from 'lucide-react';
import { Empresa } from '@/types';

const Empresas: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data para empresas
  const [empresas] = useState<Empresa[]>([
    {
      id: '1',
      name: 'Tech Solutions Ltda',
      email: 'contato@techsolutions.com',
      role: 'empresa',
      cnpj: '12.345.678/0001-90',
      company_name: 'Tech Solutions Ltda',
      company_description: 'Empresa de desenvolvimento de software',
      industry: 'Tecnologia',
      size: '50-100',
      phone: '(11) 99999-9999',
      address: 'Rua das Flores, 123 - São Paulo/SP',
      approved_by_prefeitura: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Comércio Central',
      email: 'rh@comerciocentral.com',
      role: 'empresa',
      cnpj: '98.765.432/0001-10',
      company_name: 'Comércio Central',
      company_description: 'Rede de supermercados',
      industry: 'Varejo',
      size: '100-500',
      phone: '(11) 88888-8888',
      address: 'Av. Principal, 456 - São Paulo/SP',
      approved_by_prefeitura: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]);

  const filteredEmpresas = empresas.filter(empresa =>
    empresa.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    empresa.cnpj.includes(searchTerm)
  );

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Empresas Cadastradas</h1>
            <p className="text-gray-600 mt-2">Gerencie as empresas parceiras do município</p>
          </div>
          <Button className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Nova Empresa</span>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Lista de Empresas</CardTitle>
                <CardDescription>
                  {empresas.length} empresas cadastradas
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Search className="w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Buscar por nome ou CNPJ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Empresa</TableHead>
                  <TableHead>CNPJ</TableHead>
                  <TableHead>Setor</TableHead>
                  <TableHead>Porte</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmpresas.map((empresa) => (
                  <TableRow key={empresa.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <Building2 className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium">{empresa.company_name}</div>
                          <div className="text-sm text-gray-500">{empresa.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono">{empresa.cnpj}</TableCell>
                    <TableCell>{empresa.industry}</TableCell>
                    <TableCell>{empresa.size} funcionários</TableCell>
                    <TableCell>
                      <Badge variant={empresa.approved_by_prefeitura ? "default" : "secondary"}>
                        {empresa.approved_by_prefeitura ? (
                          <><CheckCircle className="w-3 h-3 mr-1" /> Aprovada</>
                        ) : (
                          <><XCircle className="w-3 h-3 mr-1" /> Pendente</>
                        )}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Ver Detalhes
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Empresas;
