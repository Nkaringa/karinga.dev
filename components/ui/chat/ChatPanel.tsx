"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { UIMessage } from "ai";
import ChatMessage from "./ChatMessage";
import { cn } from "@/lib/utils";

interface AnimationProps {
  initial: object;
  animate: object;
  exit: object;
  transition?: object;
}

interface ChatPanelProps {
  messages: UIMessage[];
  onSend: (text: string) => void;
  error?: Error;
  isLoading: boolean;
  onClose: () => void;
  animationProps: AnimationProps;
  prefersReducedMotion: boolean;
}

const ChatPanel = ({
  messages,
  onSend,
  error,
  isLoading,
  onClose,
  animationProps,
  prefersReducedMotion,
}: ChatPanelProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [localInput, setLocalInput] = useState("");

  // Lock background scroll when chat is open (standard overflow)
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Auto-scroll to bottom only if user is already near bottom or AI is responding
  useEffect(() => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      const isNearBottom = scrollHeight - scrollTop <= clientHeight + 150;
      
      if (isNearBottom || isLoading) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }
  }, [messages, isLoading]);

  const onFormSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = localInput.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setLocalInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onFormSubmit();
    }
  };

  return (
    <motion.div
      {...animationProps}
      className="pointer-events-auto mb-4 w-[90vw] max-w-[400px] h-[500px] flex flex-col overflow-hidden rounded-2xl border border-glass-border bg-glass-bg backdrop-blur-xl shadow-2xl z-50"
      role="dialog"
      aria-label="AI Assistant Chat"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-glass-border px-5 py-4 bg-white/5">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-accent motion-safe:animate-pulse" />
          <span className="text-sm font-medium tracking-wider uppercase text-glass-text">
            Architect Assistant
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-glass-muted hover:text-glass-text transition-colors p-1"
          aria-label="Close Chat"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages Area */}
      <div
        ref={scrollRef}
        data-lenis-prevent
        className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-thin scrollbar-thumb-glass-border overscroll-contain"
        aria-live="polite"
      >
        {messages.length === 0 && (
          <div className="text-center py-10 text-glass-muted italic text-sm">
            The digital consciousness is active. How may I assist your exploration?
          </div>
        )}

        {messages.map((m) => {
          const text = m.parts
            .filter((p) => p.type === 'text')
            .map((p) => (p as { type: 'text'; text: string }).text)
            .join('');
          return <ChatMessage key={m.id} role={m.role} content={text} />;
        })}

        {isLoading && (
          <div className="mr-auto flex flex-col items-start max-w-[85%]">
            <span className="text-2xs uppercase tracking-widest text-glass-muted mb-1">
              Architect
            </span>
            <div className="bg-glass-bg border border-glass-border px-4 py-3 rounded-2xl rounded-tl-none flex gap-1">
              <span
                className={cn(
                  "w-1 h-1 bg-glass-muted rounded-full",
                  !prefersReducedMotion && "animate-bounce"
                )}
              />
              <span
                className={cn(
                  "w-1 h-1 bg-glass-muted rounded-full",
                  !prefersReducedMotion && "animate-bounce [animation-delay:0.2s]"
                )}
              />
              <span
                className={cn(
                  "w-1 h-1 bg-glass-muted rounded-full",
                  !prefersReducedMotion && "animate-bounce [animation-delay:0.4s]"
                )}
              />
            </div>
          </div>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="px-4 py-2 text-xs text-red-400/90 bg-red-400/10 border-t border-red-400/20 text-center">
          {error.message || 'Connection failed. Check API configuration.'}
        </div>
      )}

      {/* Input Form */}
      <form
        onSubmit={onFormSubmit}
        className="p-4 bg-white/5 border-t border-glass-border"
      >
        <div className="relative flex items-end gap-2">
          <textarea
            value={localInput}
            onChange={(e) => setLocalInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            rows={1}
            placeholder="Ask about the architect..."
            className="w-full bg-white/5 border border-glass-border rounded-xl px-4 py-3 pr-12 text-sm text-glass-text placeholder:text-glass-muted focus:outline-none focus:border-accent/50 transition-colors pointer-events-auto resize-none max-h-32 overflow-y-auto leading-relaxed"
          />
          <button
            type="submit"
            disabled={isLoading || !localInput.trim()}
            className="absolute right-2 bottom-2 p-2 text-accent disabled:opacity-20 disabled:cursor-not-allowed hover:scale-110 active:scale-95 transition-all"
            aria-label="Send Message"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default ChatPanel;
