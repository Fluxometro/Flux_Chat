"use client";

import { useState, useEffect, useRef } from "react";
import ChatListItem from "@/components/ChatListItem";
import MessageBubble from "@/components/MessageBubble";
import SearchBar from "@/components/SearchBar";
import MessageInput from "@/components/MessageInput";
import ChatTabs from "@/components/ChatTabs";
import { touch } from "@/lib/functions";
import { Chat, Message } from "@/lib/types";
import useSWR from 'swr'

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
  const [selectedChatId, setSelectedChatId] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [agentMessages, setAgentMessages] = useState(mockAgentMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const agentMessagesEndRef = useRef<HTMLDivElement>(null);
  const [chats, setChats] = useState<Chat[]>([])

  // Auto-scroll to bottom when new messages arrive
  function scrollToBottom(ref: React.RefObject<HTMLDivElement>){
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  useSWR('autoRefresh', getMessages, {refreshInterval:5000})

  useEffect(()=>{
    async function getChats(){
      await touch(async ()=>{
        const response = await fetch('http://127.0.0.1:8000/flux_wa/multichat/chats', {
          method:'GET'
          ,headers: {
            "Content-Type": "application/json"
            ,Authorization: `Bearer ${localStorage.getItem('access')}`
          }
        })
        const response_json = await response.json()
        if(!response.ok){
          alert(response_json)
        }else{
          setChats(response_json)
        }
      })
    }

    getChats()
  }, [])

  useEffect(() => {
    scrollToBottom(messagesEndRef);
  }, [messages]);

  useEffect(() => {
    scrollToBottom(agentMessagesEndRef);
  }, [agentMessages]);  

  useEffect(()=>{
    getMessages()
  }, [selectedChatId])

  async function getMessages() {
    if(selectedChatId>0){
      await touch(async ()=>{
        const response = await fetch(`http://127.0.0.1:8000/flux_wa/multichat/messages?chat_id=${selectedChatId}`, {
          method:'GET'
          ,headers: {
            "Content-Type": "application/json"
            ,Authorization: `Bearer ${localStorage.getItem('access')}`
          }
        })
        const response_json:Message[] = await response.json()
        console.log(response_json)
        if(!response.ok){
          alert(response_json)
        }else {
          const new_data = response_json.map(mensaje=>{return {...mensaje, timestamp:mensaje.timestamp.slice(0,16).replace('T', ' ')}})
          if(new_data.length !== messages.length){
            setMessages(new_data)
          }
        }
      })
    }
  }

  async function handleSendMessage(message: string){
    const newMessage = {
      id: String(messages.length + 1),
      content: message,
      timestamp: new Date().toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isUser: true,
    };

    await touch(async ()=>{
      const response = await fetch(`http://127.0.0.1:8000/flux_wa/multichat/messages`, {
        method:'POST'
        ,headers: {
          "Content-Type": "application/json"
          ,Authorization: `Bearer ${localStorage.getItem('access')}`
        }
        ,body:JSON.stringify({
          payload:{
            payload_type:'text'
            ,text:message
          }
          ,chat_id:selectedChatId
        })
      })
      const response_json:Message[] = await response.json()
      if(!response.ok){
        alert(response_json)
      }else await getMessages()
    })
  };

  function handleSendAgentMessage(message: string){
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

  const selectedChat = chats.find((chat) => chat.id === selectedChatId);

  const filteredChats = chats.filter(
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
              id={chat.id.toString()}
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
              {selectedChatId>0&&<MessageInput onSend={handleSendMessage} />}
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


/**
 * // TODO: remove mock data
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
 */