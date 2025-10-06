export interface MessageBubbleProps {
  content: string;
  timestamp: string;
  isUser: boolean;
  senderName?: string;
}

export default function MessageBubble({
  content,
  timestamp,
  isUser,
  senderName,
}: MessageBubbleProps) {
  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-150`}
      data-testid={`message-${isUser ? "user" : "client"}`}
    >
      <div className={`max-w-[70%] ${isUser ? "ml-auto" : "mr-auto"}`}>
        {!isUser && senderName && (
          <div className="text-xs text-muted-foreground mb-1 px-3" data-testid="text-sender-name">
            {senderName}
          </div>
        )}
        <div
          className={`rounded-2xl p-3 ${
            isUser
              ? "bg-primary text-primary-foreground rounded-tr-sm"
              : "bg-card text-card-foreground rounded-tl-sm"
          }`}
          data-testid="text-message-content"
        >
          <p className="text-base break-words">{content}</p>
        </div>
        <div
          className={`text-xs text-muted-foreground mt-1 px-3 ${isUser ? "text-right" : "text-left"}`}
          data-testid="text-message-timestamp"
        >
          {timestamp}
        </div>
      </div>
    </div>
  );
}
