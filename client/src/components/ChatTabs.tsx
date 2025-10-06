import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface ChatTabsProps {
  chatContent: React.ReactNode;
  agentChatContent: React.ReactNode;
  defaultTab?: "chat" | "agent";
}

export default function ChatTabs({
  chatContent,
  agentChatContent,
  defaultTab = "chat",
}: ChatTabsProps) {
  return (
    <Tabs defaultValue={defaultTab} className="w-full h-full flex flex-col">
      <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0 h-auto">
        <TabsTrigger
          value="chat"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3 font-medium data-[state=active]:text-primary"
          data-testid="tab-chat"
        >
          Chat
        </TabsTrigger>
        <TabsTrigger
          value="agent"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3 font-medium data-[state=active]:text-primary"
          data-testid="tab-agent-chat"
        >
          Chat de agente
        </TabsTrigger>
      </TabsList>
      <TabsContent value="chat" className="flex-1 overflow-hidden m-0">
        {chatContent}
      </TabsContent>
      <TabsContent value="agent" className="flex-1 overflow-hidden m-0">
        {agentChatContent}
      </TabsContent>
    </Tabs>
  );
}
