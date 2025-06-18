
import React, { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageCircle, Send, Building2, Video, Phone } from 'lucide-react';
import { ChatMessage } from '@/types';

const Chat: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');

  // Mock data para conversas
  const conversas = [
    {
      id: '1',
      empresa_nome: 'Tech Solutions Ltda',
      vaga_titulo: 'Desenvolvedor Frontend React',
      last_message: 'Gostaríamos de agendar uma entrevista com você.',
      last_message_time: '2024-01-15T10:30:00Z',
      unread_count: 2,
      status: 'active'
    },
    {
      id: '2',
      empresa_nome: 'Marketing Digital Corp',
      vaga_titulo: 'Analista de Marketing Digital',
      last_message: 'Obrigado pelo interesse na nossa vaga.',
      last_message_time: '2024-01-14T15:20:00Z',
      unread_count: 0,
      status: 'active'
    }
  ];

  // Mock data para mensagens
  const mensagens: ChatMessage[] = [
    {
      id: '1',
      candidatura_id: '1',
      sender_id: '1',
      sender_type: 'empresa',
      message: 'Olá! Ficamos interessados no seu perfil para a vaga de Desenvolvedor Frontend.',
      message_type: 'text',
      sent_at: '2024-01-15T09:00:00Z'
    },
    {
      id: '2',
      candidatura_id: '1',
      sender_id: '2',
      sender_type: 'cidadao',
      message: 'Obrigado pelo interesse! Estou muito empolgado com a oportunidade.',
      message_type: 'text',
      sent_at: '2024-01-15T09:15:00Z'
    },
    {
      id: '3',
      candidatura_id: '1',
      sender_id: '1',
      sender_type: 'empresa',
      message: 'Gostaríamos de agendar uma entrevista com você. Você está disponível esta semana?',
      message_type: 'interview_request',
      sent_at: '2024-01-15T10:30:00Z'
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Enviando mensagem:', newMessage);
      setNewMessage('');
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Conversas</h1>
          <p className="text-gray-600 mt-2">Converse com as empresas sobre suas candidaturas</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Lista de Conversas */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageCircle className="w-5 h-5" />
                <span>Conversas Ativas</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-2">
                {conversas.map((conversa) => (
                  <div
                    key={conversa.id}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedConversation === conversa.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                    }`}
                    onClick={() => setSelectedConversation(conversa.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback>
                            <Building2 className="w-5 h-5" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{conversa.empresa_nome}</p>
                          <p className="text-xs text-gray-600 truncate">{conversa.vaga_titulo}</p>
                          <p className="text-xs text-gray-500 truncate mt-1">{conversa.last_message}</p>
                        </div>
                      </div>
                      {conversa.unread_count > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {conversa.unread_count}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Área de Chat */}
          <Card className="lg:col-span-2">
            {selectedConversation ? (
              <>
                <CardHeader className="border-b">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Tech Solutions Ltda</CardTitle>
                      <CardDescription>Desenvolvedor Frontend React</CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Phone className="w-4 h-4 mr-2" />
                        Ligar
                      </Button>
                      <Button variant="outline" size="sm">
                        <Video className="w-4 h-4 mr-2" />
                        Vídeo
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col h-96">
                  {/* Mensagens */}
                  <div className="flex-1 overflow-y-auto space-y-4 p-4">
                    {mensagens.map((mensagem) => (
                      <div
                        key={mensagem.id}
                        className={`flex ${
                          mensagem.sender_type === 'cidadao' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            mensagem.sender_type === 'cidadao'
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{mensagem.message}</p>
                          <p className={`text-xs mt-1 ${
                            mensagem.sender_type === 'cidadao' ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {formatTime(mensagem.sent_at)}
                          </p>
                          {mensagem.message_type === 'interview_request' && (
                            <div className="mt-2 space-x-2">
                              <Button size="sm" variant="outline" className="text-xs">
                                Aceitar
                              </Button>
                              <Button size="sm" variant="outline" className="text-xs">
                                Recusar
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Input de mensagem */}
                  <div className="border-t pt-4">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Digite sua mensagem..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1"
                      />
                      <Button onClick={handleSendMessage}>
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </>
            ) : (
              <CardContent className="flex items-center justify-center h-96">
                <div className="text-center text-gray-500">
                  <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Selecione uma conversa para começar</p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Chat;
