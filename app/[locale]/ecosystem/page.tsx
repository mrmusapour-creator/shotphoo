import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/ui";
import { getI18n, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const { t } = getI18n(params.locale);
  return pageMetadata(params.locale, t("ecosystem.title"), t("brand.tagline"), "/ecosystem");
}

export default function EcosystemPage({ params }: { params: { locale: Locale } }) {
  const { t, list } = getI18n(params.locale);
  return (
    <main className="section">
      <SectionHeading eyebrow={t("ecosystem.eyebrow")} title={t("ecosystem.title")} />
      <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
        {list<{ name: string; status: string; body: string }>("ecosystem.items").map((item) => (
          <article key={item.name} className="glass rounded-2xl p-6">
            <h2 className="text-3xl font-semibold">{item.name}</h2>
            <p className="mt-2 text-silver">{item.status}</p>
            <p className="mt-4 text-white/58">{item.body}</p>
            <button className="mt-6 inline-flex items-center gap-2 rounded-full border border-silver/20 px-4 py-2 text-sm text-white/72"><ExternalLink className="size-4" /> {t("ecosystem.website")}</button>
          </article>
        ))}
      </div>
    </main>
  );
}
