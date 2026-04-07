import React, { HTMLAttributes } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const tagVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-mono transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--color-surface)] text-[var(--color-text)]/80 border border-[var(--color-border)] hover:text-[var(--color-text)]",
        accent:
          "bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/20 hover:bg-[var(--color-accent)]/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface TagProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tagVariants> {}

export const Tag = ({ className, variant, ...props }: TagProps) => {
  return (
    <div className={cn(tagVariants({ variant, className }))} {...props} />
  );
};
