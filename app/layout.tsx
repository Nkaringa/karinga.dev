import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Scene } from "@/components/canvas/Scene";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { PageTransition } from "@/components/layout/PageTransition";
import AIChatWidget from "@/components/ui/chat/AIChatWidget";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://karinga.dev";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Karinga.dev | Creative Technologist",
    template: "%s | Karinga.dev",
  },
  description: "A high-performance digital garden where code meets consciousness, motion defines identity, and AI brings interfaces to life.",
  keywords: ["Next.js 15", "React 19", "Three.js", "AI Portfolio", "GSAP", "Creative Technologist", "Vercel AI SDK"],
  authors: [{ name: "Nagesh Goud Karinga" }],
  creator: "Nagesh Goud Karinga",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Karinga.dev",
    title: "Karinga.dev | Crafting Digital Intelligences",
    description: "Personal portfolio with real-time AI integration and scroll-driven 3D experiences.",
    images: [
      {
        url: "/images/OG-Image.png",
        width: 1200,
        height: 630,
        alt: "Karinga.dev Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Karinga.dev | Crafting Digital Intelligences",
    description: "Personal portfolio with real-time AI integration and scroll-driven 3D experiences.",
    images: ["/images/OG-Image.png"],
  },
  alternates: {
    canonical: baseUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased bg-[var(--color-bg)] text-[var(--color-text)] flex flex-col min-h-screen relative overflow-x-hidden">
        {/* Global 3D Background */}
        <Scene />

        <SmoothScroll>
          <Nav />
          <PageTransition>
            <main className="flex-grow relative z-10 pt-16">{children}</main>
            <Footer />
          </PageTransition>
        </SmoothScroll>

        {/* Global AI Assistant */}
        <AIChatWidget />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
