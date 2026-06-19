import type { Metadata } from "next";
import { Field, inputClass, SectionHeading } from "@/components/ui";
import { getI18n, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const { t } = getI18n(params.locale);
  return pageMetadata(params.locale, t("nav.ceo"), t("ceo.title"), "/ceo-contact");
}

export default function CeoContactPage({ params }: { params: { locale: Locale } }) {
  const { t } = getI18n(params.locale);
  return (
    <main className="section">
      <SectionHeading eyebrow={t("ceo.eyebrow")} title={t("ceo.title")} />
      <form action="/api/lead-messages" method="post" className="glass mx-auto grid max-w-3xl gap-5 rounded-2xl p-6">
        <div className="grid gap-5 md:grid-cols-2">
          <Field label={t("forms.messageType")}><select name="type" className={inputClass}><option>CEO</option><option>SUPPORT</option><option>PROJECT</option></select></Field>
          <Field label={t("forms.priority")}><select name="priority" className={inputClass}><option>{t("forms.normal")}</option><option>{t("forms.high")}</option><option>{t("forms.urgent")}</option></select></Field>
          <Field label={t("forms.name")}><input name="name" className={inputClass} required /></Field>
          <Field label={t("forms.email")}><input name="email" type="email" className={inputClass} required /></Field>
          <Field label={t("forms.phone")}><input name="phone" className={inputClass} /></Field>
        </div>
        <Field label={t("forms.message")}><textarea name="body" className={inputClass} rows={6} required /></Field>
        <button className="rounded-full bg-white px-5 py-3 font-semibold text-ink">{t("forms.sendInquiry")}</button>
      </form>
    </main>
  );
}
