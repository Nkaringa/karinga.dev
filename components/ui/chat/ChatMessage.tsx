import React from "react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: "user" | "assistant" | "system" | "data";
  content: string;
}

const ChatMessage = ({ role, content }: ChatMessageProps) => {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "flex flex-col max-w-[85%]",
        isUser ? "ml-auto items-end" : "mr-auto items-start"
      )}
    >
      <span className="text-2xs uppercase tracking-widest text-glass-muted mb-1">
        {isUser ? "Visitor" : "Architect"}
      </span>
      <div
        className={cn(
          "px-4 py-3 rounded-2xl text-sm leading-relaxed",
          isUser
            ? "bg-accent text-white rounded-tr-none"
            : "bg-glass-bg border border-glass-border text-glass-text rounded-tl-none shadow-inner"
        )}
      >
        {content}
      </div>
    </div>
  );
};

export default ChatMessage;
