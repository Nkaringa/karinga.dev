import { create } from "zustand";

interface UIState {
  isNavOpen: boolean;
  isChatOpen: boolean;
  theme: "light" | "dark";
  scrollProgress: number;
  scrollVelocity: number;
  scrollDirection: "up" | "down" | null;
  toggleNav: () => void;
  setNavOpen: (isOpen: boolean) => void;
  setChatOpen: (isOpen: boolean) => void;
  toggleChat: () => void;
  setTheme: (theme: "light" | "dark") => void;
  setScrollProgress: (progress: number) => void;
  setScrollState: (progress: number, velocity: number, direction: 1 | -1) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isNavOpen: false,
  isChatOpen: false,
  theme: "dark",
  scrollProgress: 0,
  scrollVelocity: 0,
  scrollDirection: null,
  toggleNav: () => set((state) => ({ isNavOpen: !state.isNavOpen })),
  setNavOpen: (isOpen: boolean) => set({ isNavOpen: isOpen }),
  setChatOpen: (isOpen: boolean) => set({ isChatOpen: isOpen }),
  toggleChat: () => set((state) => ({ isChatOpen: !state.isChatOpen })),
  setTheme: (theme: "light" | "dark") => set({ theme }),
  setScrollProgress: (progress: number) => set({ scrollProgress: progress }),
  setScrollState: (progress, velocity, direction) => set({ 
    scrollProgress: progress,
    scrollVelocity: velocity,
    scrollDirection: direction === 1 ? "down" : "up"
  }),
}));
