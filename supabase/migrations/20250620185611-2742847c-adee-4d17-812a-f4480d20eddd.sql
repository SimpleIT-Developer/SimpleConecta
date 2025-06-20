
-- Criar enum para roles de usuário
CREATE TYPE user_role AS ENUM ('admin', 'prefeitura', 'cidadao', 'empresa');

-- Criar enum para status
CREATE TYPE status_type AS ENUM ('active', 'inactive', 'pending', 'approved', 'rejected');

-- Criar enum para tipos de trabalho
CREATE TYPE work_type AS ENUM ('presencial', 'remoto', 'hibrido');

-- Criar enum para tipos de contrato
CREATE TYPE contract_type AS ENUM ('clt', 'pj', 'estagio', 'temporario');

-- Criar enum para status de candidatura
CREATE TYPE candidatura_status AS ENUM ('pending', 'approved', 'rejected', 'interview_scheduled', 'hired', 'eliminated');

-- Criar enum para tipos de mensagem
CREATE TYPE message_type AS ENUM ('text', 'interview_request', 'system');

-- Criar enum para sender type
CREATE TYPE sender_type AS ENUM ('cidadao', 'empresa');

-- Tabela de perfis de usuário
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  role user_role NOT NULL,
  cpf TEXT,
  cnpj TEXT,
  phone TEXT,
  birth_date DATE,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela específica para cidadãos
CREATE TABLE public.cidadaos (
  id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  education TEXT,
  experience TEXT,
  skills TEXT[], -- Array de habilidades
  curriculum_validity DATE,
  status status_type DEFAULT 'active'
);

-- Tabela específica para empresas
CREATE TABLE public.empresas (
  id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  company_description TEXT,
  industry TEXT,
  size TEXT,
  approved_by_prefeitura BOOLEAN DEFAULT false
);

-- Tabela de vagas
CREATE TABLE public.vagas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  empresa_id UUID NOT NULL REFERENCES public.empresas(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT[],
  benefits TEXT,
  salary_range TEXT,
  work_type work_type NOT NULL,
  contract_type contract_type NOT NULL,
  location TEXT,
  status status_type DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de candidaturas
CREATE TABLE public.candidaturas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vaga_id UUID NOT NULL REFERENCES public.vagas(id) ON DELETE CASCADE,
  cidadao_id UUID NOT NULL REFERENCES public.cidadaos(id) ON DELETE CASCADE,
  status candidatura_status DEFAULT 'pending',
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  rejection_reason TEXT,
  empresa_approved BOOLEAN DEFAULT false,
  cidadao_approved BOOLEAN DEFAULT false
);

-- Tabela de entrevistas
CREATE TABLE public.entrevistas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  candidatura_id UUID NOT NULL REFERENCES public.candidaturas(id) ON DELETE CASCADE,
  data_entrevista TIMESTAMP WITH TIME ZONE NOT NULL,
  tipo TEXT NOT NULL CHECK (tipo IN ('video', 'presencial', 'telefone')),
  status TEXT DEFAULT 'agendada' CHECK (status IN ('agendada', 'realizada', 'cancelada', 'pendente_confirmacao')),
  link_reuniao TEXT,
  endereco TEXT,
  observacoes TEXT,
  avaliacao TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de mensagens do chat
CREATE TABLE public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  candidatura_id UUID NOT NULL REFERENCES public.candidaturas(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  sender_type sender_type NOT NULL,
  message TEXT NOT NULL,
  message_type message_type DEFAULT 'text',
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cidadaos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.empresas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vagas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidaturas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.entrevistas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Políticas RLS para cidadaos
CREATE POLICY "Cidadaos can manage their own data" ON public.cidadaos
  FOR ALL USING (auth.uid() = id);

CREATE POLICY "Empresas and prefeitura can view cidadaos" ON public.cidadaos
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role IN ('empresa', 'prefeitura', 'admin')
    )
  );

-- Políticas RLS para empresas
CREATE POLICY "Empresas can manage their own data" ON public.empresas
  FOR ALL USING (auth.uid() = id);

CREATE POLICY "All can view approved empresas" ON public.empresas
  FOR SELECT USING (approved_by_prefeitura = true);

CREATE POLICY "Prefeitura can view all empresas" ON public.empresas
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role IN ('prefeitura', 'admin')
    )
  );

-- Políticas RLS para vagas
CREATE POLICY "Empresas can manage their own vagas" ON public.vagas
  FOR ALL USING (
    empresa_id IN (
      SELECT id FROM public.empresas WHERE id = auth.uid()
    )
  );

CREATE POLICY "All authenticated users can view active vagas" ON public.vagas
  FOR SELECT USING (status = 'active');

-- Políticas RLS para candidaturas
CREATE POLICY "Cidadaos can manage their own candidaturas" ON public.candidaturas
  FOR ALL USING (
    cidadao_id IN (
      SELECT id FROM public.cidadaos WHERE id = auth.uid()
    )
  );

CREATE POLICY "Empresas can view candidaturas for their vagas" ON public.candidaturas
  FOR SELECT USING (
    vaga_id IN (
      SELECT id FROM public.vagas WHERE empresa_id = auth.uid()
    )
  );

CREATE POLICY "Empresas can update candidaturas for their vagas" ON public.candidaturas
  FOR UPDATE USING (
    vaga_id IN (
      SELECT id FROM public.vagas WHERE empresa_id = auth.uid()
    )
  );

-- Políticas RLS para entrevistas
CREATE POLICY "Users can view their own entrevistas" ON public.entrevistas
  FOR SELECT USING (
    candidatura_id IN (
      SELECT id FROM public.candidaturas 
      WHERE cidadao_id = auth.uid() 
      OR vaga_id IN (
        SELECT id FROM public.vagas WHERE empresa_id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can manage their own entrevistas" ON public.entrevistas
  FOR ALL USING (
    candidatura_id IN (
      SELECT id FROM public.candidaturas 
      WHERE cidadao_id = auth.uid() 
      OR vaga_id IN (
        SELECT id FROM public.vagas WHERE empresa_id = auth.uid()
      )
    )
  );

-- Políticas RLS para chat_messages
CREATE POLICY "Users can view messages from their candidaturas" ON public.chat_messages
  FOR SELECT USING (
    candidatura_id IN (
      SELECT id FROM public.candidaturas 
      WHERE cidadao_id = auth.uid() 
      OR vaga_id IN (
        SELECT id FROM public.vagas WHERE empresa_id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can send messages" ON public.chat_messages
  FOR INSERT WITH CHECK (
    sender_id = auth.uid() AND
    candidatura_id IN (
      SELECT id FROM public.candidaturas 
      WHERE cidadao_id = auth.uid() 
      OR vaga_id IN (
        SELECT id FROM public.vagas WHERE empresa_id = auth.uid()
      )
    )
  );

-- Função para criar perfil automaticamente quando usuário se registra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'name', new.email),
    COALESCE((new.raw_user_meta_data->>'role')::user_role, 'cidadao'::user_role)
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para criar perfil automaticamente
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Função para atualizar updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar updated_at em profiles
CREATE TRIGGER handle_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
