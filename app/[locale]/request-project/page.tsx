import type { Metadata } from "next";
import { Field, inputClass, SectionHeading } from "@/components/ui";
import { getI18n, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const { t } = getI18n(params.locale);
  return pageMetadata(params.locale, t("request.title"), t("request.body"), "/request-project");
}

export default function RequestProjectPage({ params }: { params: { locale: Locale } }) {
  const { t, list } = getI18n(params.locale);
  return (
    <main className="section">
      <SectionHeading eyebrow={t("request.eyebrow")} title={t("request.title")} body={t("request.body")} />
      <form action="/api/project-requests" method="post" className="glass mx-auto grid max-w-3xl gap-5 rounded-2xl p-6">
        <div className="grid gap-5 md:grid-cols-2">
          <Field label={t("forms.name")}><input name="name" className={inputClass} required /></Field>
          <Field label={t("forms.email")}><input name="email" type="email" className={inputClass} required /></Field>
          <Field label={t("forms.phone")}><input name="phone" className={inputClass} /></Field>
          <Field label={t("forms.budget")}>
            <select name="budgetRange" className={inputClass} required>
              {list<string>("request.budgets").map((item) => <option key={item}>{item}</option>)}
            </select>
          </Field>
          <Field label={t("forms.projectType")}>
            <select name="projectType" className={inputClass} required>
              {list<string>("request.types").map((item) => <option key={item}>{item}</option>)}
            </select>
          </Field>
          <Field label={t("forms.subCategory")}><input name="subCategory" className={inputClass} placeholder={t("request.placeholder")} /></Field>
          <Field label={t("forms.deadline")}><input name="deadline" type="date" className={inputClass} /></Field>
        </div>
        <Field label={t("forms.description")}>
          <textarea name="description" className={inputClass} rows={6} required placeholder={t("request.descriptionPlaceholder")} />
        </Field>
        <button className="rounded-full bg-white px-5 py-3 font-semibold text-ink">{t("forms.submitRequest")}</button>
      </form>
    </main>
  );
}
