
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Building2, 
  Briefcase, 
  MessageCircle, 
  BarChart3,
  FileUser,
  UserPlus,
  PlusCircle,
  Calendar
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  const getMenuItems = () => {
    if (!user) return [];

    const baseItems = [
      { icon: Home, label: 'Dashboard', href: '/dashboard' },
    ];

    switch (user.role) {
      case 'admin':
        return [
          ...baseItems,
          { icon: Users, label: 'Usuários', href: '/admin/users' },
          { icon: BarChart3, label: 'Relatórios', href: '/admin/reports' },
        ];

      case 'prefeitura':
        return [
          ...baseItems,
          { icon: Building2, label: 'Empresas', href: '/prefeitura/empresas' },
          { icon: UserPlus, label: 'Cadastrar Empresa', href: '/prefeitura/empresas/nova' },
          { icon: Users, label: 'Cidadãos', href: '/prefeitura/cidadaos' },
          { icon: BarChart3, label: 'Relatórios', href: '/prefeitura/relatorios' },
        ];

      case 'empresa':
        return [
          ...baseItems,
          { icon: Briefcase, label: 'Minhas Vagas', href: '/empresa/vagas' },
          { icon: PlusCircle, label: 'Nova Vaga', href: '/empresa/vagas/nova' },
          { icon: Users, label: 'Candidatos', href: '/empresa/candidatos' },
          { icon: MessageCircle, label: 'Conversas', href: '/empresa/chat' },
          { icon: Calendar, label: 'Entrevistas', href: '/empresa/entrevistas' },
        ];

      case 'cidadao':
        return [
          ...baseItems,
          { icon: FileUser, label: 'Meu Currículo', href: '/cidadao/curriculo' },
          { icon: Briefcase, label: 'Vagas Disponíveis', href: '/cidadao/vagas' },
          { icon: Users, label: 'Minhas Candidaturas', href: '/cidadao/candidaturas' },
          { icon: MessageCircle, label: 'Conversas', href: '/cidadao/chat' },
          { icon: Calendar, label: 'Entrevistas', href: '/cidadao/entrevistas' },
        ];

      default:
        return baseItems;
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="w-64 bg-white shadow-sm h-full border-r border-gray-200">
      <nav className="mt-8 px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    'flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200',
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
