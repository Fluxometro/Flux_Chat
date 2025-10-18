export type Chat = {
    id: number
    name: string
    lastMessage: string 
    timestamp: string
    unreadCount: number
    lastMessageTime: number
}

export type Message = {
    id: number,
    content: string,
    timestamp: string,
    isUser: boolean,
    senderName?: string,
}