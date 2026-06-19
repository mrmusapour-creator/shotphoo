import type { Metadata } from "next";
import { Download, ShoppingCart, Star } from "lucide-react";
import { ButtonLink, SectionHeading } from "@/components/ui";
import { productIcons } from "@/lib/data";
import { getI18n, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const { t } = getI18n(params.locale);
  return pageMetadata(params.locale, t("seo.marketplaceTitle"), t("seo.marketplaceDescription"), "/marketplace");
}

export default function MarketplacePage({ params }: { params: { locale: Locale } }) {
  const { t, list } = getI18n(params.locale);
  const products = list<{ title: string; type: string; category: string; price: string }>("marketplace.items");

  return (
    <main className="section">
      <SectionHeading eyebrow={t("marketplace.eyebrow")} title={t("marketplace.title")} />
      <div className="mx-auto mb-8 flex max-w-7xl justify-end gap-3">
        <ButtonLink href={`/${params.locale}/cart`} variant="ghost">{t("marketplace.cart")}</ButtonLink>
        <ButtonLink href={`/${params.locale}/dashboard/downloads`} variant="ghost">{t("marketplace.downloads")}</ButtonLink>
      </div>
      <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product, index) => {
          const Icon = productIcons[index];
          return (
            <article key={product.title} className="glass rounded-2xl p-5">
              <div className="grid aspect-square place-items-center rounded-xl bg-white/[0.04]">
                <Icon className="size-12 text-white" />
              </div>
              <p className="mt-5 text-xs uppercase tracking-[0.18em] text-silver">{product.type}</p>
              <h2 className="mt-2 text-xl font-semibold">{product.title}</h2>
              <div className="mt-3 flex items-center gap-1 text-sm text-white">
                <Star className="size-4 fill-white text-white" /> 4.9 · 38 {t("marketplace.reviews")}
              </div>
              <div className="mt-5 flex items-center justify-between">
                <span className="font-semibold">{t("marketplace.pricePrefix")}{product.price}</span>
                <button className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink">
                  <ShoppingCart className="size-4" /> {t("marketplace.add")}
                </button>
              </div>
              <p className="mt-4 flex items-center gap-2 text-xs text-white/48">
                <Download className="size-4" /> {t("marketplace.unlock")}
              </p>
            </article>
          );
        })}
      </div>
    </main>
  );
}
