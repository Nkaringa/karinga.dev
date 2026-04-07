import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://living-ai-portfolio.vercel.app";

export const metadata: Metadata = {
  title: "Work | Selected Digital Artifacts",
  description: "Explore a curated collection of high-performance digital artifacts, case studies, and creative technology experiments.",
  openGraph: {
    title: "Work | Selected Digital Artifacts",
    description: "Explore a curated collection of high-performance digital artifacts and creative technology experiments.",
  },
  alternates: {
    canonical: `${baseUrl}/work`,
  },
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
