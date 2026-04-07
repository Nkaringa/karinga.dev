import React from "react";
import { Contact as ContactSection } from "@/components/sections/Contact";
import { BackToHome } from "@/components/ui/BackToHome";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://karinga.dev';

export const metadata = {
  title: "Contact",
  description: "Get in touch with Nagesh Goud Karinga for collaborations, architectural inquiries, or deep dives into creative technology.",
  alternates: {
    canonical: `${baseUrl}/contact`,
  },
  openGraph: {
    title: "Contact | Karinga.dev",
    description: "Get in touch with Nagesh Goud Karinga for collaborations, architectural inquiries, or deep dives into creative technology.",
    url: `${baseUrl}/contact`,
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col justify-center">
      <ContactSection />
      <BackToHome />
    </div>
  );
}
