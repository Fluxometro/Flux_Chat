import MessageBubble from '../MessageBubble';

export default function MessageBubbleExample() {
  return (
    <div className="w-full bg-background p-4 space-y-4">
      <MessageBubble
        content="Hola, necesito ayuda con mi pedido"
        timestamp="10:30"
        isUser={false}
        senderName="Cliente"
      />
      <MessageBubble
        content="Por supuesto, ¿en qué puedo ayudarte?"
        timestamp="10:31"
        isUser={true}
      />
      <MessageBubble
        content="No he recibido la confirmación del envío"
        timestamp="10:32"
        isUser={false}
        senderName="Cliente"
      />
    </div>
  );
}
