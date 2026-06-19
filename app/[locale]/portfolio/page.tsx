import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui";
import { getI18n, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const { t } = getI18n(params.locale);
  return pageMetadata(params.locale, t("seo.portfolioTitle"), t("seo.portfolioDescription"), "/portfolio");
}

export default function PortfolioPage({ params }: { params: { locale: Locale } }) {
  const { t, list } = getI18n(params.locale);
  const portfolioItems = list<{ title: string; description: string; category: string; tools: string; client: string; tags: string[] }>("portfolio.items");
  const categories = Array.from(new Set(portfolioItems.map((item) => item.category)));

  return (
    <main className="section">
      <SectionHeading eyebrow={t("portfolio.eyebrow")} title={t("portfolio.title")} body={t("portfolio.body")} />
      <div className="mx-auto mb-8 flex max-w-7xl flex-wrap gap-2">
        {categories.map((category) => (
          <button key={category} className="rounded-full border border-silver/20 px-4 py-2 text-sm text-white/70 hover:border-white hover:text-white">
            {category}
          </button>
        ))}
      </div>
      <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-3">
        {portfolioItems.map((item) => (
          <article key={item.title} className="glass rounded-2xl p-5">
            <div className="aspect-video rounded-xl bg-gradient-to-br from-white/18 via-silver/12 to-royal/30" />
            <p className="mt-5 text-xs uppercase tracking-[0.2em] text-silver">{item.category}</p>
            <h2 className="mt-2 text-2xl font-semibold">{item.title}</h2>
            <p className="mt-3 text-sm text-white/58">{item.description}</p>
            <p className="mt-3 text-sm text-white/58">{t("portfolio.tools")}: {item.tools}</p>
            <p className="text-sm text-white/44">{t("portfolio.client")}: {item.client}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
