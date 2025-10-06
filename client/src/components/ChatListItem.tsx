import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export interface ChatListItemProps {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
  avatarUrl?: string;
  isActive?: boolean;
  onClick?: () => void;
}

export default function ChatListItem({
  name,
  lastMessage,
  timestamp,
  unreadCount,
  avatarUrl,
  isActive,
  onClick,
}: ChatListItemProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={`relative rounded-md p-3 cursor-pointer hover-elevate active-elevate-2 transition-colors ${
        isActive ? "bg-secondary border-l-4 border-primary" : ""
      }`}
      onClick={onClick}
      data-testid={`chat-item-${name.toLowerCase().replace(/\s/g, "-")}`}
    >
      <div className="flex items-start gap-3">
        <Avatar className="w-12 h-12 flex-shrink-0">
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-2 mb-1">
            <h3 className="font-semibold text-base truncate" data-testid={`text-chat-name-${name.toLowerCase().replace(/\s/g, "-")}`}>
              {name}
            </h3>
            <span className="text-xs text-muted-foreground flex-shrink-0" data-testid="text-timestamp">
              {timestamp}
            </span>
          </div>
          <p className="text-sm text-muted-foreground truncate" data-testid="text-last-message">
            {lastMessage}
          </p>
        </div>

        {unreadCount !== undefined && unreadCount > 0 && (
          <Badge
            className="absolute top-3 right-3 bg-chart-3 text-primary-foreground px-2 py-0.5 text-xs"
            data-testid="badge-unread-count"
          >
            {unreadCount}
          </Badge>
        )}
      </div>
    </div>
  );
}
