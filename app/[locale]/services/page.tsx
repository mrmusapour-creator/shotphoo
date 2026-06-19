import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/ui";
import { serviceIcons } from "@/lib/data";
import { getI18n, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const { t } = getI18n(params.locale);
  return pageMetadata(params.locale, t("seo.servicesTitle"), t("seo.servicesDescription"), "/services");
}

export default function ServicesPage({ params }: { params: { locale: Locale } }) {
  const { t, list } = getI18n(params.locale);
  const services = list<{ slug: string; title: string; summary: string; packages: string[] }>("services.items");

  return (
    <main className="section">
      <SectionHeading eyebrow={t("services.pageEyebrow")} title={t("services.pageTitle")} />
      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
        {services.map((service, index) => {
          const Icon = serviceIcons[index];
          return (
            <article key={service.slug} className="glass rounded-2xl p-6">
              <Icon className="mb-5 size-8 text-silver" />
              <h2 className="font-display text-4xl text-white">{service.title}</h2>
              <p className="mt-3 text-white/62">{service.summary}</p>
              <div className="mt-6 grid gap-3 md:grid-cols-3">
                {service.packages.map((pkg) => (
                  <div key={pkg} className="rounded-xl border border-silver/15 bg-ink/40 p-4">
                    <CheckCircle2 className="mb-3 size-5 text-white" />
                    <p className="font-semibold">{pkg}</p>
                    <p className="mt-2 text-xs text-white/50">{t("services.packageBody")}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3 text-sm">
                <Link href={`/${params.locale}/request-project`} className="rounded-full bg-white px-4 py-2 font-semibold text-ink">
                  {t("services.request")}
                </Link>
                <Link href={`/${params.locale}/services/${service.slug}`} className="rounded-full border border-silver/20 px-4 py-2 text-white/72">
                  {t("services.view")}
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
