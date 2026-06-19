import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui";
import { getI18n, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const { t } = getI18n(params.locale);
  return pageMetadata(params.locale, t("development.title"), t("development.roadmap"), "/development");
}

export default function DevelopmentPage({ params }: { params: { locale: Locale } }) {
  const { t, list } = getI18n(params.locale);
  const internalProjects = list<{ name: string; status: string; progress: number }>("development.items");
  return (
    <main className="section">
      <SectionHeading eyebrow={t("development.eyebrow")} title={t("development.title")} />
      <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">
        {internalProjects.map((project) => (
          <article key={project.name} className="glass rounded-2xl p-6">
            <div className="aspect-video rounded-xl bg-white/[0.04]" />
            <h2 className="mt-5 text-2xl font-semibold">{project.name}</h2>
            <p className="mt-2 text-white/58">{project.status}</p>
            <div className="mt-5 h-2 rounded-full bg-white/10"><div className="h-full rounded-full bg-white" style={{ width: `${project.progress}%` }} /></div>
            <p className="mt-4 text-sm text-white/48">{t("development.roadmap")}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
