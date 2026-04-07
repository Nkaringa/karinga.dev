# SYSTEM_ARCHITECTURE.md — Technical Blueprint

> The definitive technical reference for the "Karinga.dev" project. All implementation decisions must align with this document.

---

## 1. Project Overview

**Name:** Karinga.dev
**Type:** Personal portfolio with real-time AI integration
**Goal:** A high-performance, visually distinctive portfolio that showcases engineering identity through motion, 3D, and interactive AI elements.

---

## 2. Tech Stack

| Layer | Technology | Version | Role |
|-------|-----------|---------|------|
| Framework | Next.js | 16.x (App Router) | Routing, SSR, RSC, ISR |
| Language | TypeScript | 6.x | Type safety across all layers |
| Styling | Tailwind CSS | v4 | Utility-first design system |
| Animation | GSAP | 3.x | Scroll-driven timelines, stagger sequences |
| Animation | Framer Motion | 12.x | React component transitions, gestures, layout |
| Scroll | Lenis | 1.x | Virtual smooth scroll, synchronized with GSAP ScrollTrigger |
| 3D | Three.js | 0.x | WebGL rendering |
| 3D | React Three Fiber | 9.x | Declarative Three.js in React |
| 3D Helpers | Drei | latest | R3F abstractions (Camera, Environment, etc.) |
| AI | Vercel AI SDK (`ai`) | 6.x | Streaming chat, `UIMessage`, `sendMessage` |
| AI | `@ai-sdk/anthropic` | 3.x | Anthropic Claude model provider |
| State | Zustand | 5.x | Global UI state (chat open, scroll progress) |
| UI Primitives | Radix UI | latest | Headless accessible component base |
| Validation | Zod | 4.x | Schema validation for API boundaries |
| Fonts | next/font | — | Self-hosted, zero-CLS font loading |
| Deployment | Vercel | — | Edge network, preview deployments |

---

## 3. Directory Structure

```
/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout (fonts, metadata, global providers)
│   ├── page.tsx                # Home — all sections composed here
│   ├── work/
│   │   ├── page.tsx            # Work index
│   │   └── [slug]/
│   │       └── page.tsx        # Individual project detail page
│   ├── about/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── api/
│   │   └── chat/
│   │       └── route.ts        # AI chat streaming endpoint (Anthropic Claude)
│   ├── robots.ts               # Crawler rules (blocks /api/*)
│   ├── sitemap.ts              # Auto-generated sitemap (static + dynamic routes)
│   └── globals.css             # CSS custom properties, @layer base resets
│
├── components/
│   ├── ui/                     # Headless, reusable primitives
│   │   ├── Button.tsx
│   │   ├── Tag.tsx
│   │   ├── Reveal.tsx          # Framer Motion scroll-reveal wrapper
│   │   ├── BackToHome.tsx
│   │   └── chat/
│   │       ├── AIChatWidget.tsx  # Chat toggle + useChat hook
│   │       ├── ChatPanel.tsx     # Message list + input UI
│   │       └── ChatMessage.tsx   # Individual message renderer
│   ├── layout/
│   │   ├── Nav.tsx
│   │   ├── Footer.tsx
│   │   ├── SmoothScroll.tsx    # Lenis init + ScrollTrigger sync
│   │   └── PageTransition.tsx  # Framer Motion route transitions
│   ├── sections/               # Page-level section components
│   │   ├── Hero.tsx
│   │   ├── Work.tsx
│   │   ├── About.tsx
│   │   └── Contact.tsx
│   └── canvas/                 # All Three.js / R3F components
│       ├── Scene.tsx           # Root R3F Canvas wrapper (global singleton)
│       ├── HeroMesh.tsx        # Hero 3D element
│       └── ParticleField.tsx
│
├── lib/
│   ├── gsap/
│   │   ├── config.ts           # GSAP + ScrollTrigger singleton registration
│   │   └── animations.ts       # Reusable animation presets
│   ├── three/
│   │   ├── materials.ts        # Shared Three.js materials/shaders
│   │   └── colors.ts           # Shared color constants for 3D
│   ├── animations.ts           # SCROLL_CONFIG constants (Lenis tuning)
│   ├── projects.ts             # Project data + WORK_ANIMATION constants
│   └── utils.ts                # General utilities (cn, clamp, etc.)
│
├── hooks/
│   ├── useScrollProgress.ts
│   ├── useReducedMotion.ts
│   └── useTheme.ts
│
├── store/
│   └── useUIStore.ts           # Zustand store (chat open, scroll state)
│
├── public/
│   ├── images/                 # Project screenshots, OG image
│   ├── fonts/
│   ├── models/                 # .glb / .gltf 3D assets
│   └── resume/                 # Downloadable resume PDF
│
├── SYSTEM_ARCHITECTURE.md      # This file
├── README.md                   # Public-facing project documentation
├── .env.local.example          # Environment variable template
├── package.json
└── tsconfig.json
```

---

## 4. Animation Architecture

### 4.1 Responsibility Split
| Tool | Owns | Reasoning |
|------|------|-----------|
| GSAP | Scroll-driven timelines, stagger sequences, page transitions | Imperative control, best-in-class performance for complex sequences |
| Framer Motion | Component mount/unmount, `whileInView` reveals, layout animations | Declarative, React-native, uses IntersectionObserver (immune to Lenis race conditions) |
| Lenis | Virtual smooth scroll engine | Synchronized with GSAP ScrollTrigger via `lenis.on("scroll", ScrollTrigger.update)` |

### 4.2 GSAP Setup
- `ScrollTrigger` registered as singleton in `lib/gsap/config.ts`
- All ScrollTrigger instances use `once: true` to prevent re-triggering
- ScrollTrigger kept in sync with Lenis via the `SmoothScroll` component

### 4.3 Framer Motion Setup
- `<AnimatePresence>` wraps route transitions via `PageTransition` at the layout level
- `motion-safe:` guard on all animation variants via `useReducedMotion()` hook
- `Reveal` component uses `whileInView` + `viewport={{ once: true, margin: "-50px" }}`

---

## 5. 3D Architecture

### 5.1 Canvas Strategy
- Single global `<Canvas>` instance in the root layout (avoids WebGL context limits)
- Sections mount/unmount their mesh contributions via R3F portals
- `Suspense` wraps all asset-heavy 3D components with skeleton fallbacks

### 5.2 Performance Budget
- Max draw calls per scene: 50
- Texture resolution: ≤ 1024px unless hero feature
- All geometries are instanced where count > 3
- `frameloop="demand"` on non-interactive scenes (renders only on state change)

---

## 6. Styling System

### 6.1 CSS Custom Properties (defined in `globals.css`)
```css
:root {
  --color-bg:        #0d0d0f;
  --color-surface:   #18181b;
  --color-border:    rgba(255,255,255,0.08);
  --color-text:      #e4e4e7;
  --color-text-muted:#71717a;
  --color-accent:    #a78bfa;      /* primary accent — violet */
  --color-accent-2:  #38bdf8;      /* secondary accent — sky */

  --font-sans:       'GeistSans', system-ui, sans-serif;
  --font-mono:       'GeistMono', monospace;

  --ease-out-expo:   cubic-bezier(0.19, 1, 0.22, 1);
  --ease-in-out:     cubic-bezier(0.87, 0, 0.13, 1);

  --duration-fast:   150ms;
  --duration-base:   300ms;
  --duration-slow:   600ms;
}
```

### 6.2 Tailwind Theme Extension
All custom properties are exposed as Tailwind tokens via `@theme` in `globals.css` (Tailwind v4 pattern). No arbitrary hex values — all colors consumed via `var()` syntax.

---

## 7. Performance Targets

| Metric | Target |
|--------|--------|
| LCP | < 2.5s |
| FID / INP | < 100ms |
| CLS | < 0.1 |
| Lighthouse Performance | ≥ 95 |
| Lighthouse Accessibility | ≥ 95 |
| Bundle size (JS, initial) | < 150kb gzipped |

---

## 8. Deployment

- **Platform:** Vercel
- **Branch strategy:** `master` → production (karinga.dev), `dev` → preview deployments
- **Environment variables:** Managed via Vercel dashboard, never committed (see `.env.local.example`)
- **Analytics:** Vercel Analytics + Speed Insights enabled
