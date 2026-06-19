import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink, SectionHeading } from "@/components/ui";
import { getI18n, locales, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  const services = getI18n("en").list<{ slug: string }>("services.items");
  return services.flatMap((service) => locales.map((locale) => ({ locale, slug: service.slug })));
}

export function generateMetadata({ params }: { params: { locale: Locale; slug: string } }): Metadata {
  const { list } = getI18n(params.locale);
  const service = list<{ slug: string; title: string; summary: string }>("services.items").find((item) => item.slug === params.slug);
  return pageMetadata(params.locale, service?.title ?? "Service", service?.summary ?? "SHOTPHOO service page.", `/services/${params.slug}`);
}

export default function ServiceLandingPage({ params }: { params: { locale: Locale; slug: string } }) {
  const { t, list } = getI18n(params.locale);
  const service = list<{ slug: string; title: string; summary: string; packages: string[] }>("services.items").find((item) => item.slug === params.slug);
  if (!service) notFound();
  const included = list<string>("services.includedItems");

  return (
    <main className="section">
      <SectionHeading eyebrow={t("services.landingEyebrow")} title={service.title} body={service.summary} />
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="glass rounded-2xl p-6">
          <h2 className="font-display text-4xl text-white">{t("services.included")}</h2>
          <ul className="mt-5 space-y-3 text-white/66">
            {included.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <div className="mt-8">
            <ButtonLink href={`/${params.locale}/request-project`}>{t("services.request")}</ButtonLink>
          </div>
        </section>
        <section className="grid gap-4">
          {service.packages.map((pkg, index) => (
            <article key={pkg} className="rounded-2xl border border-silver/15 bg-white/[0.04] p-5">
              <p className="text-sm text-silver">{t("services.package")} {index + 1}</p>
              <h3 className="mt-2 text-2xl font-semibold">{pkg}</h3>
              <p className="mt-2 text-sm leading-6 text-white/58">{t("services.packageBody")}</p>
            </article>
          ))}
          <article className="rounded-2xl border border-silver/15 bg-ink/60 p-5">
            <h3 className="text-xl font-semibold">{t("services.faq")}</h3>
            <p className="mt-3 text-sm text-white/58">{t("services.faqBody")}</p>
          </article>
        </section>
      </div>
    </main>
  );
}
