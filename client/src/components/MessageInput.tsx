"use client";

import { useState } from "react";
import { Send, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export interface MessageInputProps {
  onSend: (message: string) => void;
  placeholder?: string;
}

export default function MessageInput({
  onSend,
  placeholder = "Escribe un mensaje...",
}: MessageInputProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleAttachment = () => {
    console.log('Attachment clicked');
  };

  return (
    <div className="flex items-end gap-3 p-4 bg-card border-t border-border">
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="flex-1 resize-none rounded-full bg-secondary border-transparent min-h-[44px] max-h-32 py-3 px-4 focus-visible:ring-2 focus-visible:ring-primary"
        rows={1}
        data-testid="input-message"
      />
      <Button
        onClick={handleAttachment}
        size="icon"
        variant="secondary"
        className="rounded-full flex-shrink-0"
        data-testid="button-attachment"
      >
        <Paperclip className="h-5 w-5" />
      </Button>
      <Button
        onClick={handleSend}
        size="icon"
        className="rounded-full flex-shrink-0"
        disabled={!message.trim()}
        data-testid="button-send"
      >
        <Send className="h-5 w-5" />
      </Button>
    </div>
  );
}
