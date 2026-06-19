import type { Metadata } from "next";
import { BarChart3, CheckCircle2, MessageSquare, Package, Users, Workflow } from "lucide-react";
import { FeatureCard, SectionHeading } from "@/components/ui";
import { getI18n, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const { t } = getI18n(params.locale);
  return pageMetadata(params.locale, t("seo.adminTitle"), t("seo.adminDescription"), "/admin");
}

export default function AdminPage({ params }: { params: { locale: Locale } }) {
  const { t, list } = getI18n(params.locale);
  const cards = list<{ title: string; body: string }>("admin.cards");
  const metrics = list<{ value: string; label: string }>("admin.metrics");
  const icons = [Users, Workflow, Package, MessageSquare, BarChart3, CheckCircle2];

  return (
    <main className="section">
      <SectionHeading eyebrow={t("admin.eyebrow")} title={t("admin.title")} />
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, index) => (
          <FeatureCard key={card.title} icon={icons[index]} title={card.title} body={card.body} />
        ))}
      </div>
      <section className="glass mx-auto mt-8 max-w-7xl rounded-2xl p-6">
        <h2 className="font-display text-4xl">{t("admin.today")}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-xl border border-silver/15 bg-ink/50 p-5">
              <p className="font-display text-4xl text-white">{metric.value}</p>
              <p className="mt-2 text-sm text-white/54">{metric.label}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
