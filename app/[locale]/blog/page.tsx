import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui";
import { getI18n, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const { t } = getI18n(params.locale);
  return pageMetadata(params.locale, t("nav.blog"), t("blog.title"), "/blog");
}

export default function BlogPage({ params }: { params: { locale: Locale } }) {
  const { t, list } = getI18n(params.locale);
  return (
    <main className="section">
      <SectionHeading eyebrow={t("blog.eyebrow")} title={t("blog.title")} />
      <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
        {list<string>("blog.posts").map((title) => (
          <article key={title} className="glass rounded-2xl p-5">
            <div className="aspect-video rounded-xl bg-gradient-to-br from-white/18 to-royal/30" />
            <p className="mt-5 text-xs uppercase tracking-[0.18em] text-silver">{t("blog.meta")}</p>
            <h2 className="mt-2 text-2xl font-semibold">{title}</h2>
            <p className="mt-3 text-sm text-white/56">{t("blog.body")}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
