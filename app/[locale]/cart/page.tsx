import Link from "next/link";
import { ShieldCheck, ShoppingBag } from "lucide-react";
import { SectionHeading } from "@/components/ui";
import { getI18n, type Locale } from "@/lib/i18n";

export default function CartPage({ params }: { params: { locale: Locale } }) {
  const { t, list } = getI18n(params.locale);
  const items = list<{ title: string; type: string; price: string }>("marketplace.items").slice(0, 2);
  const subtotal = items.reduce((sum, item) => sum + Number(item.price.replace(/[^\d.]/g, "")), 0);
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + tax;

  return (
    <main className="section">
      <SectionHeading eyebrow={t("cart.eyebrow")} title={t("cart.title")} body={t("cart.body")} />
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_0.55fr]">
        <section className="glass rounded-2xl p-6">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.title} className="flex items-center justify-between gap-4 rounded-xl border border-silver/15 bg-ink/45 p-4">
                <div className="flex items-center gap-4">
                  <div className="grid size-12 place-items-center rounded-xl bg-white/10">
                    <ShoppingBag className="size-5" />
                  </div>
                  <div>
                    <h2 className="font-semibold">{item.title}</h2>
                    <p className="text-sm text-white/52">{item.type}</p>
                  </div>
                </div>
                <p className="font-semibold">{t("marketplace.pricePrefix")}{item.price}</p>
              </div>
            ))}
          </div>
        </section>
        <aside className="glass rounded-2xl p-6">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span>{t("cart.subtotal")}</span><span>{t("marketplace.pricePrefix")}{subtotal}</span></div>
            <div className="flex justify-between"><span>{t("cart.tax")}</span><span>{t("marketplace.pricePrefix")}{tax}</span></div>
            <div className="border-t border-silver/15 pt-3 text-lg font-semibold flex justify-between"><span>{t("cart.total")}</span><span>{t("marketplace.pricePrefix")}{total}</span></div>
          </div>
          <p className="mt-5 flex items-center gap-2 text-sm text-white/58"><ShieldCheck className="size-4" /> {t("cart.secure")}</p>
          <Link href={`/${params.locale}/checkout`} className="mt-6 inline-flex w-full justify-center rounded-full bg-white px-5 py-3 font-semibold text-ink">
            {t("cart.checkout")}
          </Link>
        </aside>
      </div>
    </main>
  );
}
