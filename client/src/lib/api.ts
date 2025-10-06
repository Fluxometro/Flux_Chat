// TODO: Implement backend API integration
// This file contains placeholder functions for backend API calls

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    username: string;
  };
}

export interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
  lastMessageTime: Date;
}

export interface Message {
  id: string;
  chatId: string;
  content: string;
  timestamp: string;
  isUser: boolean;
  senderName?: string;
}

export interface SendMessagePayload {
  chatId: string;
  content: string;
}

// Authentication API
export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  // TODO: Implement actual API call to /api/auth/login
  console.log('API call: login', credentials);
  throw new Error('Backend API not implemented');
}

export async function logout(): Promise<void> {
  // TODO: Implement actual API call to /api/auth/logout
  console.log('API call: logout');
  throw new Error('Backend API not implemented');
}

// Chat API
export async function getChats(): Promise<Chat[]> {
  // TODO: Implement actual API call to /api/chats
  console.log('API call: getChats');
  throw new Error('Backend API not implemented');
}

export async function getMessages(chatId: string): Promise<Message[]> {
  // TODO: Implement actual API call to /api/chats/:chatId/messages
  console.log('API call: getMessages', chatId);
  throw new Error('Backend API not implemented');
}

export async function sendMessage(payload: SendMessagePayload): Promise<Message> {
  // TODO: Implement actual API call to /api/messages
  console.log('API call: sendMessage', payload);
  throw new Error('Backend API not implemented');
}

export async function searchMessages(query: string): Promise<Message[]> {
  // TODO: Implement actual API call to /api/messages/search?q=query
  console.log('API call: searchMessages', query);
  throw new Error('Backend API not implemented');
}

// Agent Chat API
export async function getAgentMessages(chatId: string): Promise<Message[]> {
  // TODO: Implement actual API call to /api/chats/:chatId/agent-messages
  console.log('API call: getAgentMessages', chatId);
  throw new Error('Backend API not implemented');
}

export async function sendAgentMessage(payload: SendMessagePayload): Promise<Message> {
  // TODO: Implement actual API call to /api/agent-messages
  console.log('API call: sendAgentMessage', payload);
  throw new Error('Backend API not implemented');
}
