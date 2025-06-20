export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      candidaturas: {
        Row: {
          applied_at: string | null
          cidadao_approved: boolean | null
          cidadao_id: string
          empresa_approved: boolean | null
          id: string
          rejection_reason: string | null
          reviewed_at: string | null
          status: Database["public"]["Enums"]["candidatura_status"] | null
          vaga_id: string
        }
        Insert: {
          applied_at?: string | null
          cidadao_approved?: boolean | null
          cidadao_id: string
          empresa_approved?: boolean | null
          id?: string
          rejection_reason?: string | null
          reviewed_at?: string | null
          status?: Database["public"]["Enums"]["candidatura_status"] | null
          vaga_id: string
        }
        Update: {
          applied_at?: string | null
          cidadao_approved?: boolean | null
          cidadao_id?: string
          empresa_approved?: boolean | null
          id?: string
          rejection_reason?: string | null
          reviewed_at?: string | null
          status?: Database["public"]["Enums"]["candidatura_status"] | null
          vaga_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "candidaturas_cidadao_id_fkey"
            columns: ["cidadao_id"]
            isOneToOne: false
            referencedRelation: "cidadaos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidaturas_vaga_id_fkey"
            columns: ["vaga_id"]
            isOneToOne: false
            referencedRelation: "vagas"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_messages: {
        Row: {
          candidatura_id: string
          id: string
          message: string
          message_type: Database["public"]["Enums"]["message_type"] | null
          sender_id: string
          sender_type: Database["public"]["Enums"]["sender_type"]
          sent_at: string | null
        }
        Insert: {
          candidatura_id: string
          id?: string
          message: string
          message_type?: Database["public"]["Enums"]["message_type"] | null
          sender_id: string
          sender_type: Database["public"]["Enums"]["sender_type"]
          sent_at?: string | null
        }
        Update: {
          candidatura_id?: string
          id?: string
          message?: string
          message_type?: Database["public"]["Enums"]["message_type"] | null
          sender_id?: string
          sender_type?: Database["public"]["Enums"]["sender_type"]
          sent_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_candidatura_id_fkey"
            columns: ["candidatura_id"]
            isOneToOne: false
            referencedRelation: "candidaturas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      cidadaos: {
        Row: {
          curriculum_validity: string | null
          education: string | null
          experience: string | null
          id: string
          skills: string[] | null
          status: Database["public"]["Enums"]["status_type"] | null
        }
        Insert: {
          curriculum_validity?: string | null
          education?: string | null
          experience?: string | null
          id: string
          skills?: string[] | null
          status?: Database["public"]["Enums"]["status_type"] | null
        }
        Update: {
          curriculum_validity?: string | null
          education?: string | null
          experience?: string | null
          id?: string
          skills?: string[] | null
          status?: Database["public"]["Enums"]["status_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "cidadaos_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      empresas: {
        Row: {
          approved_by_prefeitura: boolean | null
          company_description: string | null
          company_name: string
          id: string
          industry: string | null
          size: string | null
        }
        Insert: {
          approved_by_prefeitura?: boolean | null
          company_description?: string | null
          company_name: string
          id: string
          industry?: string | null
          size?: string | null
        }
        Update: {
          approved_by_prefeitura?: boolean | null
          company_description?: string | null
          company_name?: string
          id?: string
          industry?: string | null
          size?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "empresas_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      entrevistas: {
        Row: {
          avaliacao: string | null
          candidatura_id: string
          created_at: string | null
          data_entrevista: string
          endereco: string | null
          id: string
          link_reuniao: string | null
          observacoes: string | null
          status: string | null
          tipo: string
        }
        Insert: {
          avaliacao?: string | null
          candidatura_id: string
          created_at?: string | null
          data_entrevista: string
          endereco?: string | null
          id?: string
          link_reuniao?: string | null
          observacoes?: string | null
          status?: string | null
          tipo: string
        }
        Update: {
          avaliacao?: string | null
          candidatura_id?: string
          created_at?: string | null
          data_entrevista?: string
          endereco?: string | null
          id?: string
          link_reuniao?: string | null
          observacoes?: string | null
          status?: string | null
          tipo?: string
        }
        Relationships: [
          {
            foreignKeyName: "entrevistas_candidatura_id_fkey"
            columns: ["candidatura_id"]
            isOneToOne: false
            referencedRelation: "candidaturas"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          birth_date: string | null
          cnpj: string | null
          cpf: string | null
          created_at: string | null
          email: string
          id: string
          name: string
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          birth_date?: string | null
          cnpj?: string | null
          cpf?: string | null
          created_at?: string | null
          email: string
          id: string
          name: string
          phone?: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          birth_date?: string | null
          cnpj?: string | null
          cpf?: string | null
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Relationships: []
      }
      vagas: {
        Row: {
          benefits: string | null
          contract_type: Database["public"]["Enums"]["contract_type"]
          created_at: string | null
          description: string
          empresa_id: string
          id: string
          location: string | null
          requirements: string[] | null
          salary_range: string | null
          status: Database["public"]["Enums"]["status_type"] | null
          title: string
          work_type: Database["public"]["Enums"]["work_type"]
        }
        Insert: {
          benefits?: string | null
          contract_type: Database["public"]["Enums"]["contract_type"]
          created_at?: string | null
          description: string
          empresa_id: string
          id?: string
          location?: string | null
          requirements?: string[] | null
          salary_range?: string | null
          status?: Database["public"]["Enums"]["status_type"] | null
          title: string
          work_type: Database["public"]["Enums"]["work_type"]
        }
        Update: {
          benefits?: string | null
          contract_type?: Database["public"]["Enums"]["contract_type"]
          created_at?: string | null
          description?: string
          empresa_id?: string
          id?: string
          location?: string | null
          requirements?: string[] | null
          salary_range?: string | null
          status?: Database["public"]["Enums"]["status_type"] | null
          title?: string
          work_type?: Database["public"]["Enums"]["work_type"]
        }
        Relationships: [
          {
            foreignKeyName: "vagas_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      candidatura_status:
        | "pending"
        | "approved"
        | "rejected"
        | "interview_scheduled"
        | "hired"
        | "eliminated"
      contract_type: "clt" | "pj" | "estagio" | "temporario"
      message_type: "text" | "interview_request" | "system"
      sender_type: "cidadao" | "empresa"
      status_type: "active" | "inactive" | "pending" | "approved" | "rejected"
      user_role: "admin" | "prefeitura" | "cidadao" | "empresa"
      work_type: "presencial" | "remoto" | "hibrido"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      candidatura_status: [
        "pending",
        "approved",
        "rejected",
        "interview_scheduled",
        "hired",
        "eliminated",
      ],
      contract_type: ["clt", "pj", "estagio", "temporario"],
      message_type: ["text", "interview_request", "system"],
      sender_type: ["cidadao", "empresa"],
      status_type: ["active", "inactive", "pending", "approved", "rejected"],
      user_role: ["admin", "prefeitura", "cidadao", "empresa"],
      work_type: ["presencial", "remoto", "hibrido"],
    },
  },
} as const
