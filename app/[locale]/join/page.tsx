import type { Metadata } from "next";
import { Briefcase, Store, UserRoundPlus } from "lucide-react";
import { Field, inputClass, SectionHeading } from "@/components/ui";
import { getI18n, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const { t } = getI18n(params.locale);
  return pageMetadata(params.locale, t("join.title"), t("brand.tagline"), "/join");
}

export default function JoinPage({ params }: { params: { locale: Locale } }) {
  const { t, list } = getI18n(params.locale);
  const paths = list<{ title: string; body: string }>("join.paths");
  const icons = [UserRoundPlus, Store, Briefcase];

  return (
    <main className="section">
      <SectionHeading eyebrow={t("join.eyebrow")} title={t("join.title")} />
      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">
        {paths.map((path, index) => {
          const Icon = icons[index];
          return (
            <article key={path.title} className="glass rounded-2xl p-6">
              <Icon className="mb-5 size-8 text-white" />
              <h2 className="text-2xl font-semibold">{path.title}</h2>
              <p className="mt-3 text-sm leading-6 text-white/58">{path.body}</p>
            </article>
          );
        })}
      </div>
      <form className="glass mx-auto mt-8 grid max-w-3xl gap-5 rounded-2xl p-6">
        <div className="grid gap-5 md:grid-cols-2">
          <Field label={t("join.path")}><select className={inputClass}>{paths.map((path) => <option key={path.title}>{path.title}</option>)}</select></Field>
          <Field label={t("join.experience")}><select className={inputClass}>{list<string>("join.levels").map((level) => <option key={level}>{level}</option>)}</select></Field>
          <Field label={t("join.skills")}><input className={inputClass} placeholder={t("join.skillsPlaceholder")} /></Field>
          <Field label={t("join.portfolioUrl")}><input className={inputClass} placeholder="https://" /></Field>
        </div>
        <Field label={t("join.bio")}><textarea className={inputClass} rows={5} /></Field>
        <button className="rounded-full bg-white px-5 py-3 font-semibold text-ink">{t("join.create")}</button>
      </form>
    </main>
  );
}
