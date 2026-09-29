import type { ReactNode } from "react";
import { site } from "@/lib/site";

/** The Grounded mark, as the app's sidebar draws it: a primary tile with a highlight accent. Decorative. */
export function LogoMark({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="7" fill="var(--grounded-primary)" />
      <rect x="18" y="18" width="8" height="8" rx="2" fill="var(--grounded-highlight)" />
    </svg>
  );
}

export function Wordmark() {
  return (
    <a href="/" className="flex items-center gap-2 rounded-md font-semibold text-brand-text">
      <LogoMark />
      <span className="text-[1.05rem] tracking-tight">{site.name}</span>
    </a>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

export function ButtonLink({ href, children, variant = "primary", className = "" }: ButtonProps) {
  const base =
    "inline-flex min-h-10 items-center justify-center gap-2 rounded-control px-4 text-sm font-medium transition-colors";
  const styles = {
    primary: "bg-brand-primary text-brand-primary-contrast shadow-brand-1 hover:bg-brand-primary-hover active:bg-brand-primary-active",
    secondary: "bg-brand-surface text-brand-text shadow-brand-2 hover:bg-brand-surface-raised hover:shadow-brand-3",
    ghost: "text-brand-text hover:bg-brand-surface-hover",
  } as const;
  return (
    <a href={href} className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </a>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-sm font-semibold text-brand-primary-subtle-text">{children}</p>;
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 id={id} className="mt-2 text-3xl font-semibold tracking-tight text-brand-text sm:text-4xl">
        {title}
      </h2>
      {children ? <div className="mt-4 text-lg leading-relaxed text-brand-muted">{children}</div> : null}
    </div>
  );
}

export function CodeBlock({ label, children }: { label: string; children: string }) {
  return (
    <div className="min-w-0 overflow-hidden rounded-card border border-brand-border-emphasis bg-brand-surface-sunken">
      <div className="border-b border-brand-border px-4 py-2 text-xs font-medium text-brand-muted">{label}</div>
      <pre
        tabIndex={0}
        role="region"
        aria-label={label}
        className="overflow-x-auto p-4 font-mono text-[0.8125rem] leading-relaxed text-brand-text"
      >
        <code>{children}</code>
      </pre>
    </div>
  );
}

export function CheckList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="mt-6 space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-brand-muted">
          <svg
            viewBox="0 0 24 24"
            className="mt-1 size-4 shrink-0 text-brand-primary-subtle-text"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Strong({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-brand-text">{children}</strong>;
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="font-medium text-brand-link underline decoration-1 underline-offset-2 hover:text-brand-link-hover">
      {children}
    </a>
  );
}
