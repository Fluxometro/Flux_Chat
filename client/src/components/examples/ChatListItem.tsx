import ChatListItem from '../ChatListItem';

export default function ChatListItemExample() {
  return (
    <div className="w-96 bg-background p-4 space-y-2">
      <ChatListItem
        id="1"
        name="María González"
        lastMessage="Gracias por tu ayuda con el proyecto"
        timestamp="10:30"
        unreadCount={3}
        isActive={true}
      />
      <ChatListItem
        id="2"
        name="Carlos Rodríguez"
        lastMessage="¿Cuándo podemos agendar la reunión?"
        timestamp="Ayer"
      />
      <ChatListItem
        id="3"
        name="Ana Martínez"
        lastMessage="Perfecto, nos vemos mañana"
        timestamp="Mar"
        unreadCount={1}
      />
    </div>
  );
}
