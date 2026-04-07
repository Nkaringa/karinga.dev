export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  tags: string[];
  year: string;
  client: string;
  role: string;
  image?: string;
  links?: {
    live?: string;
    github?: string;
  };
}

/**
 * Shared animation timing constants for Work-related components.
 * 
 * NOTE: We use a faster stagger (0.1s) on the dedicated Work index page
 * compared to the homepage section (0.2s) to facilitate faster scanning 
 * of the full project catalog.
 */
export const WORK_ANIMATION = {
  STAGGER_HOME: 0.2,
  STAGGER_INDEX: 0.1,
  INITIAL_DELAY: 0.2,
  DETAIL_DELAY_INCREMENT: 0.2,
} as const;

export const PROJECTS: Project[] = [
  {
    id: "shiftly",
    title: "Shiftly",
    description: "Full-stack workforce management platform supporting 98 franchise locations across 7 states.",
    fullDescription: "Architected a full-stack workforce management solution managing ~736 active employees across 98 franchise locations in 7 states. Built a dependency-free timezone engine using the Intl API for multi-region UTC offsets, a 3-tier RBAC system secured at Next.js middleware level protecting 15+ REST API routes, and 12-round Bcrypt PIN hashing with mandatory first-login credential rotation. React 19 + Tailwind v4 frontend with live elapsed-time counters and real-time status dashboards, ensuring 99.9% uptime.",
    tags: ["Next.js", "React 19", "Tailwind v4", "PostgreSQL", "RBAC", "Bcrypt"],
    year: "2026",
    client: "Personal Project",
    role: "Full-Stack Engineer",
    image: "/images/Shiftly.png",
    links: {
      live: "https://shiftly-v1.vercel.app/login",
    },
  },
  {
    id: "the-brief",
    title: "The Brief",
    description: "Real-time news and financial market dashboard aggregating live data across Tech, Crypto, and World sectors.",
    fullDescription: "Engineered a responsive SPA aggregating real-time financial data and curated news feeds. Serverless Node.js endpoints use Promise.all() for concurrent XML/RSS parsing with cache-control optimization. Finnhub API powers a live infinite-scrolling stock ticker with debounced autocomplete search. Features client-side category filtering, persistent dark/light theme via localStorage, and mock-data fallbacks for API rate limit resilience.",
    tags: ["React", "Node.js", "TypeScript", "Finnhub API", "Vercel"],
    year: "2026",
    client: "Personal Project",
    role: "Full-Stack Developer",
    image: "/images/The-Brief.png",
    links: {
      live: "https://news.npalakurla.com",
    },
  },
  {
    id: "multi-agent-pipeline",
    title: "Multi-Agent Dev Pipeline",
    description: "Orchestrated AI system using MCP to automate end-to-end development of a production Fintech platform.",
    fullDescription: "Architected a multi-agent 'AI Company' simulation using MCP (Model Context Protocol). Engineered an autonomous feedback loop between Gemini (Engineer) and Claude (Tech Lead) with a 3-iteration optimization cycle that elevated code quality from B+ to production-ready 'A' grade. Integrated Google Stitch via custom MCP server configurations, reducing manual UI implementation time by ~70%. Built a real-time Observability Dashboard parsing Markdown logs to track agent performance, build latency, and success rates.",
    tags: ["MCP", "Claude", "Gemini", "AI Orchestration", "Google Stitch"],
    year: "2026",
    client: "Personal Research",
    role: "AI Systems Architect",
    links: {},
  },
];

export const getProjectById = (id: string) => PROJECTS.find((p) => p.id === id);
