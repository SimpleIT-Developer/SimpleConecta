
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
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

interface AuthContextType {
  user: Profile | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, userData: { name: string; role: string }) => Promise<{ error?: string }>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async (userId: string, retryCount = 0): Promise<Profile | null> => {
    try {
      console.log(`Tentando buscar perfil do usuário ${userId}, tentativa ${retryCount + 1}`);
      
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (profile && !error) {
        console.log('Perfil encontrado:', profile);
        return profile;
      } else if (error) {
        console.error('Erro ao buscar perfil:', error);
        
        // Se perfil não existe (PGRST116), tenta criar manualmente
        if (error.code === 'PGRST116' && retryCount < 3) {
          console.log('Perfil não encontrado, tentando criar...');
          
          // Busca dados do usuário do auth
          const { data: authUser } = await supabase.auth.getUser();
          if (authUser.user) {
            const userData = authUser.user.user_metadata;
            
            const { data: newProfile, error: createError } = await supabase
              .from('profiles')
              .insert({
                id: userId,
                email: authUser.user.email || '',
                name: userData.name || authUser.user.email || 'Usuário',
                role: userData.role || 'cidadao'
              })
              .select()
              .single();
              
            if (newProfile && !createError) {
              console.log('Perfil criado manualmente:', newProfile);
              return newProfile;
            } else {
              console.error('Erro ao criar perfil manualmente:', createError);
            }
          }
          
          // Retry após um tempo
          if (retryCount < 3) {
            await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)));
            return fetchUserProfile(userId, retryCount + 1);
          }
        }
        
        return null;
      }
      
      return null;
    } catch (profileError) {
      console.error('Erro ao buscar perfil:', profileError);
      return null;
    }
  };

  useEffect(() => {
    console.log('Configurando AuthContext...');
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth event:', event, 'Session:', session?.user?.id);
        setSession(session);
        
        if (session?.user) {
          const profile = await fetchUserProfile(session.user.id);
          setUser(profile);
        } else {
          setUser(null);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      console.log('Sessão inicial:', session?.user?.id);
      setSession(session);
      
      if (session?.user) {
        const profile = await fetchUserProfile(session.user.id);
        setUser(profile);
      }
      
      setLoading(false);
    });

    return () => {
      console.log('Limpando subscription AuthContext');
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<{ error?: string }> => {
    try {
      console.log('Tentando fazer login...');
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Erro no login:', error.message);
        return { error: error.message };
      }

      console.log('Login realizado com sucesso');
      return {};
    } catch (err) {
      console.error('Erro no login:', err);
      return { error: 'Erro ao fazer login. Tente novamente.' };
    }
  };

  const signup = async (email: string, password: string, userData: { name: string; role: string }): Promise<{ error?: string }> => {
    try {
      console.log('Tentando criar conta...', { email, userData });
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: userData.name,
            role: userData.role,
          },
          emailRedirectTo: `${window.location.origin}/dashboard`
        }
      });

      if (error) {
        console.error('Erro no signup:', error.message);
        return { error: error.message };
      }

      if (data.user) {
        console.log('Usuário criado:', data.user.id);
        
        // Aguarda um pouco e tenta buscar o perfil
        setTimeout(async () => {
          const profile = await fetchUserProfile(data.user!.id);
          if (profile) {
            console.log('Perfil encontrado após signup:', profile);
          }
        }, 2000);
      }

      return {};
    } catch (err) {
      console.error('Erro no signup:', err);
      return { error: 'Erro ao criar conta. Tente novamente.' };
    }
  };

  const logout = async () => {
    try {
      console.log('Fazendo logout...');
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      window.location.href = '/login';
    } catch (error) {
      console.error('Erro no logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, login, logout, signup, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
