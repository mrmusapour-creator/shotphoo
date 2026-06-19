import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { clsx } from "clsx";

export function SectionHeading({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-gold">{eyebrow}</p>
      <h2 className="font-display text-4xl font-semibold text-pearl md:text-6xl">{title}</h2>
      {body ? <p className="mt-4 text-base leading-7 text-pearl/64">{body}</p> : null}
    </div>
  );
}

export function ButtonLink({ href, children, variant = "gold" }: { href: string; children: React.ReactNode; variant?: "gold" | "ghost" }) {
  return (
    <Link
      href={href}
      className={clsx(
        "inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold",
        variant === "gold" ? "bg-gold text-ink" : "border border-pearl/14 text-pearl hover:border-gold hover:text-gold"
      )}
    >
      {children}
      <ArrowRight className="size-4" />
    </Link>
  );
}

export function FeatureCard({ icon: Icon, title, body }: { icon: LucideIcon; title: string; body: string }) {
  return (
    <article className="glass rounded-lg p-6 shadow-halo">
      <div className="mb-5 grid size-12 place-items-center rounded-full bg-gold/12 text-gold">
        <Icon className="size-5" />
      </div>
      <h3 className="text-xl font-semibold text-pearl">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-pearl/62">{body}</p>
    </article>
  );
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm text-pearl/72">
      <span>{label}</span>
      {children}
    </label>
  );
}

export const inputClass =
  "w-full rounded-lg border border-pearl/12 bg-white/5 px-4 py-3 text-pearl outline-none placeholder:text-pearl/36 focus:border-gold";
