
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'prefeitura' | 'cidadao' | 'empresa';
  cpf?: string;
  cnpj?: string;
  phone?: string;
  birth_date?: string;
  address?: string;
  created_at: string;
  updated_at: string;
}

export interface Cidadao extends User {
  role: 'cidadao';
  education?: string;
  experience?: string;
  skills?: string[];
  curriculum_validity?: string;
  status?: 'active' | 'inactive';
}

export interface Empresa extends User {
  role: 'empresa';
  company_name: string;
  company_description?: string;
  industry?: string;
  size?: string;
  approved_by_prefeitura?: boolean;
}

export interface Vaga {
  id: string;
  empresa_id: string;
  title: string;
  description: string;
  requirements?: string[];
  benefits?: string;
  salary_range?: string;
  work_type: 'presencial' | 'remoto' | 'hibrido';
  contract_type: 'clt' | 'pj' | 'estagio' | 'temporario';
  location?: string;
  status?: 'active' | 'inactive' | 'pending' | 'approved' | 'rejected';
  created_at: string;
  candidates_count?: number;
}

export interface Candidatura {
  id: string;
  vaga_id: string;
  cidadao_id: string;
  status: 'pending' | 'approved' | 'rejected' | 'interview_scheduled' | 'hired' | 'eliminated';
  applied_at: string;
  reviewed_at?: string;
  rejection_reason?: string;
  empresa_approved: boolean;
  cidadao_approved: boolean;
}

export interface ChatMessage {
  id: string;
  candidatura_id: string;
  sender_id: string;
  sender_type: 'cidadao' | 'empresa';
  message: string;
  message_type: 'text' | 'interview_request' | 'system';
  sent_at: string;
}

export interface Entrevista {
  id: string;
  candidatura_id: string;
  data_entrevista: string;
  tipo: 'video' | 'presencial' | 'telefone';
  status: 'agendada' | 'realizada' | 'cancelada' | 'pendente_confirmacao';
  link_reuniao?: string;
  endereco?: string;
  observacoes?: string;
  avaliacao?: string;
  created_at: string;
}

export interface DashboardStats {
  total_vagas: number;
  total_candidatos: number;
  total_empresas: number;
  entrevistas_realizadas: number;
  vagas_efetivadas: number;
  curriculos_ativos: number;
}
