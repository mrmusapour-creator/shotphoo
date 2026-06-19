import { CreditCard, WalletCards } from "lucide-react";
import { Field, inputClass, SectionHeading } from "@/components/ui";
import { getI18n, type Locale } from "@/lib/i18n";

export default function CheckoutPage({ params }: { params: { locale: Locale } }) {
  const { t } = getI18n(params.locale);

  return (
    <main className="section">
      <SectionHeading eyebrow={t("checkout.eyebrow")} title={t("checkout.title")} body={t("checkout.body")} />
      <div className="glass mx-auto grid max-w-5xl gap-6 rounded-2xl p-6 lg:grid-cols-[1fr_0.8fr]">
        <form className="grid gap-5">
          <h2 className="text-2xl font-semibold">{t("checkout.billing")}</h2>
          <div className="grid gap-5 md:grid-cols-2">
            <Field label={t("forms.name")}><input className={inputClass} required /></Field>
            <Field label={t("forms.email")}><input type="email" className={inputClass} required /></Field>
            <Field label={t("forms.phone")}><input className={inputClass} /></Field>
          </div>
          <h2 className="text-2xl font-semibold">{t("checkout.payment")}</h2>
          <div className="grid gap-3 md:grid-cols-2">
            <label className="flex items-center gap-3 rounded-xl border border-silver/20 bg-ink/45 p-4">
              <input name="payment" type="radio" defaultChecked />
              <CreditCard className="size-5" />
              <span>{t("checkout.card")}</span>
            </label>
            <label className="flex items-center gap-3 rounded-xl border border-silver/20 bg-ink/45 p-4">
              <input name="payment" type="radio" />
              <WalletCards className="size-5" />
              <span>{t("checkout.wallet")}</span>
            </label>
          </div>
          <p className="rounded-xl border border-silver/15 bg-white/5 p-4 text-sm text-white/62">{t("checkout.mockNotice")}</p>
          <button className="rounded-full bg-white px-5 py-3 font-semibold text-ink">{t("checkout.placeOrder")}</button>
        </form>
        <aside className="rounded-2xl border border-silver/15 bg-ink/45 p-6">
          <h2 className="text-2xl font-semibold">{t("cart.total")}</h2>
          <p className="mt-4 font-display text-6xl">$117</p>
          <p className="mt-4 text-sm text-white/56">{t("cart.secure")}</p>
        </aside>
      </div>
    </main>
  );
}
