import type { Metadata } from "next";
import Link from "next/link";
import { MessageSquareText, Send, Timer } from "lucide-react";
import { SectionHeading } from "@/components/ui";
import { getI18n, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const { t } = getI18n(params.locale);
  return pageMetadata(params.locale, t("freelance.eyebrow"), t("freelance.title"), "/freelance");
}

export default function FreelancePage({ params }: { params: { locale: Locale } }) {
  const { t, list } = getI18n(params.locale);
  const projects = list<{ title: string; budget: string; status: string }>("freelance.projects");

  return (
    <main className="section">
      <SectionHeading eyebrow={t("freelance.eyebrow")} title={t("freelance.title")} />
      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1fr_0.75fr]">
        <section className="space-y-4">
          {projects.map((project, index) => (
            <article key={project.title} className="glass rounded-2xl p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-2xl font-semibold">{project.title}</h2>
                <span className="rounded-full border border-silver/30 px-3 py-1 text-sm text-white">{project.status}</span>
              </div>
              <p className="mt-3 text-white/58">{project.budget}</p>
              <div className="mt-5 flex gap-3 text-sm">
                <Link href={`/${params.locale}/freelance/proposal?project=${index}`} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-semibold text-ink"><Send className="size-4" /> {t("freelance.apply")}</Link>
                <button className="inline-flex items-center gap-2 rounded-full border border-silver/20 px-4 py-2 text-white/72"><MessageSquareText className="size-4" /> {t("freelance.message")}</button>
              </div>
            </article>
          ))}
        </section>
        <aside className="glass rounded-2xl p-6">
          <Timer className="mb-5 size-8 text-white" />
          <h2 className="text-2xl font-semibold">{t("freelance.statusTitle")}</h2>
          <p className="mt-3 text-sm leading-6 text-white/58">{t("freelance.statusBody")}</p>
        </aside>
      </div>
    </main>
  );
}
