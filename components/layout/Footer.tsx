import React from "react";
import Link from "next/link";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-[var(--color-border)] bg-[var(--color-bg)] py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Brand & Copyright */}
          <div className="text-center md:text-left">
            <Link
              href="/"
              className="text-lg font-bold tracking-tighter text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded-md"
            >
              Karinga.dev
            </Link>
            <p className="mt-1 text-sm text-[var(--color-text)]/60">
              &copy; {currentYear} Karinga.dev. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
