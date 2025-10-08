"use client";

import { useState, useEffect, useRef } from "react";
import ChatListItem from "@/components/ChatListItem";
import MessageBubble from "@/components/MessageBubble";
import SearchBar from "@/components/SearchBar";
import MessageInput from "@/components/MessageInput";
import ChatTabs from "@/components/ChatTabs";

// TODO: remove mock data - This mock data will be replaced with real API calls
const mockChats = [
  {
    id: "1",
    name: "María González",
    lastMessage: "Gracias por tu ayuda con el proyecto",
    timestamp: "10:30",
    unreadCount: 3,
    lastMessageTime: new Date("2024-01-15T10:30:00"),
  },
  {
    id: "2",
    name: "Carlos Rodríguez",
    lastMessage: "¿Cuándo podemos agendar la reunión?",
    timestamp: "Ayer",
    unreadCount: 0,
    lastMessageTime: new Date("2024-01-14T15:20:00"),
  },
  {
    id: "3",
    name: "Ana Martínez",
    lastMessage: "Perfecto, nos vemos mañana",
    timestamp: "Mar",
    unreadCount: 1,
    lastMessageTime: new Date("2024-01-13T09:15:00"),
  },
  {
    id: "4",
    name: "Jorge López",
    lastMessage: "El informe está listo",
    timestamp: "Lun",
    unreadCount: 0,
    lastMessageTime: new Date("2024-01-12T14:45:00"),
  },
];

// TODO: remove mock data
const mockMessages = [
  {
    id: "1",
    content: "Hola, necesito ayuda con mi proyecto",
    timestamp: "10:15",
    isUser: false,
    senderName: "María González",
  },
  {
    id: "2",
    content: "¡Hola María! Por supuesto, ¿en qué puedo ayudarte?",
    timestamp: "10:16",
    isUser: true,
  },
  {
    id: "3",
    content: "Necesito actualizar la documentación pero no sé por dónde empezar",
    timestamp: "10:17",
    isUser: false,
    senderName: "María González",
  },
  {
    id: "4",
    content: "Te puedo guiar. Primero, ¿ya tienes acceso al repositorio?",
    timestamp: "10:18",
    isUser: true,
  },
  {
    id: "5",
    content: "Sí, ya tengo acceso. ¿Me podrías compartir un ejemplo?",
    timestamp: "10:20",
    isUser: false,
    senderName: "María González",
  },
];

// TODO: remove mock data
const mockAgentMessages = [
  {
    id: "1",
    content: "Notas internas del agente sobre este caso",
    timestamp: "10:15",
    isUser: true,
  },
  {
    id: "2",
    content: "Cliente parece necesitar asistencia técnica",
    timestamp: "10:16",
    isUser: true,
  },
];

export default function ChatPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChatId, setSelectedChatId] = useState("1");
  const [messages, setMessages] = useState(mockMessages);
  const [agentMessages, setAgentMessages] = useState(mockAgentMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const agentMessagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom(messagesEndRef);
  }, [messages]);

  useEffect(() => {
    scrollToBottom(agentMessagesEndRef);
  }, [agentMessages]);

  const handleSendMessage = (message: string) => {
    const newMessage = {
      id: String(messages.length + 1),
      content: message,
      timestamp: new Date().toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isUser: true,
    };
    setMessages([...messages, newMessage]);
    // TODO: Implement backend API call to send message
  };

  const handleSendAgentMessage = (message: string) => {
    const newMessage = {
      id: String(agentMessages.length + 1),
      content: message,
      timestamp: new Date().toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isUser: true,
    };
    setAgentMessages([...agentMessages, newMessage]);
    // TODO: Implement backend API call to send agent message
  };

  const selectedChat = mockChats.find((chat) => chat.id === selectedChatId);

  const filteredChats = mockChats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-background">
      {/* Left Column - Chat List */}
      <div className="w-80 lg:w-96 border-r border-border flex flex-col bg-card">
        <div className="p-4 border-b border-border bg-card sticky top-0 z-10">
          <h2 className="text-lg font-semibold mb-3" data-testid="text-chats-title">
            Chats
          </h2>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Buscar mensajes..."
          />
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredChats.map((chat) => (
            <ChatListItem
              key={chat.id}
              {...chat}
              isActive={chat.id === selectedChatId}
              onClick={() => setSelectedChatId(chat.id)}
            />
          ))}
        </div>
      </div>

      {/* Right Column - Messages */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border bg-card sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold" data-testid="text-contact-name">
                {selectedChat?.name}
              </h2>
              <p className="text-xs text-chart-2" data-testid="text-status">
                En línea
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <ChatTabs
          chatContent={
            <div className="flex flex-col h-full">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <MessageBubble key={message.id} {...message} />
                ))}
                <div ref={messagesEndRef} />
              </div>
              <MessageInput onSend={handleSendMessage} />
            </div>
          }
          agentChatContent={
            <div className="flex flex-col h-full">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {agentMessages.map((message) => (
                  <MessageBubble key={message.id} {...message} />
                ))}
                <div ref={agentMessagesEndRef} />
              </div>
              <MessageInput
                onSend={handleSendAgentMessage}
                placeholder="Notas internas del agente..."
              />
            </div>
          }
        />
      </div>
    </div>
  );
}
