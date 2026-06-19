import type { Metadata } from "next";
import { BarChart3, BriefcaseBusiness, Layers3, MessageSquareText, ShieldCheck, Users } from "lucide-react";
import { ButtonLink, FeatureCard, SectionHeading } from "@/components/ui";
import { productIcons, serviceIcons } from "@/lib/data";
import { getI18n, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const { t } = getI18n(params.locale);
  return pageMetadata(params.locale, t("seo.homeTitle"), t("seo.homeDescription"));
}

export default function Home({ params }: { params: { locale: Locale } }) {
  const { t, list } = getI18n(params.locale);
  const services = list<{ title: string; summary: string }>("services.items");
  const portfolioItems = list<{ title: string; category: string; tools: string }>("portfolio.items");
  const products = list<{ title: string; category: string; price: string }>("marketplace.items");
  const stats = list<{ value: string; label: string }>("stats");
  const internalProjects = list<{ name: string; status: string; progress: number }>("development.items");
  const opsCards = list<{ title: string; body: string }>("opsCards");
  const opsIcons = [Users, MessageSquareText, ShieldCheck, BriefcaseBusiness, Layers3, BarChart3];

  return (
    <main>
      <section className="relative px-4 py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-silver">{t("home.eyebrow")}</p>
            <h1 className="font-display text-6xl font-bold leading-none text-white md:text-8xl">
              {t("home.title")}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68">{t("home.body")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={`/${params.locale}/request-project`}>{t("home.startProject")}</ButtonLink>
              <ButtonLink href={`/${params.locale}/freelance`} variant="ghost">{t("home.hireFreelancer")}</ButtonLink>
              <ButtonLink href={`/${params.locale}/marketplace`} variant="ghost">{t("home.sellProducts")}</ButtonLink>
            </div>
          </div>
          <div className="glass rounded-2xl p-4">
            <div className="grid gap-3">
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-center justify-between rounded-xl border border-silver/15 bg-ink/50 p-5">
                  <span className="font-display text-4xl text-white">{stat.value}</span>
                  <span className="text-sm uppercase tracking-[0.18em] text-white/52">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <SectionHeading eyebrow={t("home.servicesEyebrow")} title={t("home.servicesTitle")} body={t("home.servicesBody")} />
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <FeatureCard key={service.title} icon={serviceIcons[index]} title={service.title} body={service.summary} />
          ))}
        </div>
      </section>

      <section className="section border-y border-silver/15 bg-white/[0.025]">
        <SectionHeading eyebrow={t("home.portfolioEyebrow")} title={t("home.portfolioTitle")} />
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 lg:grid-cols-5">
          {portfolioItems.map((item) => (
            <article key={item.title} className="glass rounded-2xl p-5">
              <div className="mb-5 aspect-[4/3] rounded-xl bg-gradient-to-br from-white/20 via-silver/10 to-royal/30" />
              <p className="text-xs text-silver">{item.category}</p>
              <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-white/54">{item.tools}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeading eyebrow={t("home.commerceEyebrow")} title={t("home.commerceTitle")} body={t("home.commerceBody")} />
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <FeatureCard key={product.title} icon={productIcons[index]} title={product.title} body={`${product.category} · ${t("marketplace.pricePrefix")}${product.price}`} />
          ))}
        </div>
      </section>

      <section className="section border-y border-silver/15 bg-carbon/55">
        <SectionHeading eyebrow={t("home.opsEyebrow")} title={t("home.opsTitle")} />
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {opsCards.map((card, index) => (
            <FeatureCard key={card.title} icon={opsIcons[index]} title={card.title} body={card.body} />
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeading eyebrow={t("home.developmentEyebrow")} title={t("home.developmentTitle")} />
        <div className="mx-auto max-w-5xl space-y-4">
          {internalProjects.map((project) => (
            <article key={project.name} className="glass rounded-2xl p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold">{project.name}</h3>
                  <p className="text-sm text-white/56">{project.status}</p>
                </div>
                <span className="text-silver">{project.progress}%</span>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-white" style={{ width: `${project.progress}%` }} />
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
