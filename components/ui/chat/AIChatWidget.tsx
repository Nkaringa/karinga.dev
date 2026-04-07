"use client";

import React from "react";
import { useChat } from "@ai-sdk/react";
import { motion, AnimatePresence } from "framer-motion";
import { useUIStore } from "@/store/useUIStore";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import ChatPanel from "./ChatPanel";

const AIChatWidget = () => {
  const { isChatOpen, setChatOpen, toggleChat } = useUIStore();
  const prefersReducedMotion = useReducedMotion();

  const { messages, status, error, sendMessage } = useChat();

  const isLoading = status === 'submitted' || status === 'streaming';

  const animationProps = prefersReducedMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, scale: 0.9, y: 20 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.9, y: 20 },
        transition: { type: "spring", damping: 25, stiffness: 300 },
      };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isChatOpen && (
          <ChatPanel
            messages={messages}
            onSend={(text) => sendMessage({ text })}
            error={error}
            isLoading={isLoading}
            onClose={() => setChatOpen(false)}
            animationProps={animationProps}
            prefersReducedMotion={prefersReducedMotion}
          />
        )}
      </AnimatePresence>

      {/* Floating Action Button (FAB) */}
      <motion.button
        onClick={toggleChat}
        whileHover={!prefersReducedMotion ? { scale: 1.05 } : {}}
        whileTap={!prefersReducedMotion ? { scale: 0.95 } : {}}
        className="pointer-events-auto h-14 w-14 rounded-full bg-accent flex items-center justify-center shadow-lg shadow-accent/20 border border-white/20 hover:brightness-110 transition-all"
        aria-label={isChatOpen ? "Close AI Assistant" : "Open AI Assistant"}
        aria-expanded={isChatOpen}
      >
        <div className="relative">
          <AnimatePresence mode="wait">
            {isChatOpen ? (
              <motion.svg
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </motion.svg>
            ) : (
              <motion.svg
                key="chat"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </motion.svg>
            )}
          </AnimatePresence>
        </div>
      </motion.button>
    </div>
  );
};

export default AIChatWidget;
