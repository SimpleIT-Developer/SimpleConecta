
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

// Páginas da Prefeitura
import Empresas from "./pages/prefeitura/Empresas";
import CadastrarEmpresa from "./pages/prefeitura/CadastrarEmpresa";
import Cidadaos from "./pages/prefeitura/Cidadaos";
import Relatorios from "./pages/prefeitura/Relatorios";

// Páginas da Empresa
import Vagas from "./pages/empresa/Vagas";
import ChatEmpresa from "./pages/empresa/Chat";
import EntrevistasEmpresa from "./pages/empresa/Entrevistas";
import Candidatos from "./pages/empresa/Candidatos";

// Páginas do Cidadão
import Curriculo from "./pages/cidadao/Curriculo";
import VagasDisponiveis from "./pages/cidadao/VagasDisponiveis";
import Candidaturas from "./pages/cidadao/Candidaturas";
import ChatCidadao from "./pages/cidadao/Chat";
import Entrevistas from "./pages/cidadao/Entrevistas";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route 
        path="/" 
        element={user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} 
      />
      <Route 
        path="/login" 
        element={user ? <Navigate to="/dashboard" replace /> : <Login />} 
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Rotas da Prefeitura */}
      <Route
        path="/prefeitura/empresas"
        element={
          <ProtectedRoute allowedRoles={['prefeitura']}>
            <Empresas />
          </ProtectedRoute>
        }
      />
      <Route
        path="/prefeitura/cidadaos"
        element={
          <ProtectedRoute allowedRoles={['prefeitura']}>
            <Cidadaos />
          </ProtectedRoute>
        }
      />

      {/* Rotas da Empresa */}
      <Route
        path="/empresa/vagas"
        element={
          <ProtectedRoute allowedRoles={['empresa']}>
            <Vagas />
          </ProtectedRoute>
        }
      />
      <Route
        path="/empresa/candidatos"
        element={
          <ProtectedRoute allowedRoles={['empresa']}>
            <Candidatos />
          </ProtectedRoute>
        }
      />
      <Route
        path="/empresa/chat"
        element={
          <ProtectedRoute allowedRoles={['empresa']}>
            <ChatEmpresa />
          </ProtectedRoute>
        }
      />
      <Route
        path="/empresa/entrevistas"
        element={
          <ProtectedRoute allowedRoles={['empresa']}>
            <EntrevistasEmpresa />
          </ProtectedRoute>
        }
      />

      {/* Rotas do Cidadão */}
      <Route
        path="/cidadao/curriculo"
        element={
          <ProtectedRoute allowedRoles={['cidadao']}>
            <Curriculo />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cidadao/vagas"
        element={
          <ProtectedRoute allowedRoles={['cidadao']}>
            <VagasDisponiveis />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cidadao/candidaturas"
        element={
          <ProtectedRoute allowedRoles={['cidadao']}>
            <Candidaturas />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cidadao/chat"
        element={
          <ProtectedRoute allowedRoles={['cidadao']}>
            <ChatCidadao />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cidadao/entrevistas"
        element={
          <ProtectedRoute allowedRoles={['cidadao']}>
            <Entrevistas />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
