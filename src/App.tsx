
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

// Páginas da Empresa
import Vagas from "./pages/empresa/Vagas";

// Páginas do Cidadão
import Curriculo from "./pages/cidadao/Curriculo";
import VagasDisponiveis from "./pages/cidadao/VagasDisponiveis";
import Candidaturas from "./pages/cidadao/Candidaturas";

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

      {/* Rotas da Empresa */}
      <Route
        path="/empresa/vagas"
        element={
          <ProtectedRoute allowedRoles={['empresa']}>
            <Vagas />
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
