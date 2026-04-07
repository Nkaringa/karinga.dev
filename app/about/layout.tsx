import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://karinga.dev";

export const metadata: Metadata = {
  title: "About | Digital Consciousness",
  description: "Learn about the Architect behind Karinga.dev — a Lead Software Engineer and Creative Technologist focusing on the intersection of code and motion.",
  openGraph: {
    title: "About | Digital Consciousness",
    description: "Learn about the Architect behind Karinga.dev — a Lead Software Engineer and Creative Technologist focusing on the intersection of code and motion.",
  },
  alternates: {
    canonical: `${baseUrl}/about`,
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
