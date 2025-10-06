import ChatTabs from '../ChatTabs';

export default function ChatTabsExample() {
  return (
    <div className="w-full h-96 bg-background">
      <ChatTabs
        chatContent={
          <div className="p-4 text-muted-foreground">
            Contenido del chat normal
          </div>
        }
        agentChatContent={
          <div className="p-4 text-muted-foreground">
            Contenido del chat de agente
          </div>
        }
      />
    </div>
  );
}
