import Link from "next/link";
import { ArrowLeft, BriefcaseBusiness, Clock, DollarSign, FileUp, Send } from "lucide-react";
import { Field, inputClass, SectionHeading } from "@/components/ui";
import { getI18n, type Locale } from "@/lib/i18n";

export default function ProposalPage({
  params,
  searchParams
}: {
  params: { locale: Locale };
  searchParams: { project?: string };
}) {
  const { t, list } = getI18n(params.locale);
  const projects = list<{ title: string; budget: string; status: string }>("freelance.projects");
  const project = projects[Number(searchParams.project ?? 0)] ?? projects[0];

  return (
    <main className="section">
      <div className="mx-auto mb-8 max-w-5xl">
        <Link href={`/${params.locale}/freelance`} className="inline-flex items-center gap-2 text-sm text-white/64 hover:text-white">
          <ArrowLeft className="size-4" />
          {t("proposal.back")}
        </Link>
      </div>
      <SectionHeading eyebrow={t("proposal.eyebrow")} title={t("proposal.title")} body={t("proposal.body")} />
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="glass rounded-2xl p-6">
          <div className="grid size-14 place-items-center rounded-2xl bg-white/10">
            <BriefcaseBusiness className="size-7" />
          </div>
          <h2 className="mt-5 text-2xl font-semibold">{project.title}</h2>
          <p className="mt-3 text-white/58">{project.budget}</p>
          <span className="mt-5 inline-flex rounded-full border border-silver/20 px-3 py-1 text-sm text-white/70">{project.status}</span>
          <div className="mt-8 space-y-4 text-sm text-white/58">
            <p className="flex items-center gap-2"><DollarSign className="size-4" /> {t("proposal.priceHelp")}</p>
            <p className="flex items-center gap-2"><Clock className="size-4" /> {t("proposal.timelineHelp")}</p>
            <p className="flex items-center gap-2"><FileUp className="size-4" /> {t("proposal.fileHelp")}</p>
          </div>
        </aside>
        <form className="glass grid gap-5 rounded-2xl p-6">
          <div className="grid gap-5 md:grid-cols-2">
            <Field label={t("proposal.amount")}><input className={inputClass} placeholder="$3500" required /></Field>
            <Field label={t("proposal.timeline")}><input className={inputClass} placeholder={t("proposal.timelinePlaceholder")} required /></Field>
            <Field label={t("proposal.portfolio")}><input className={inputClass} placeholder="https://" /></Field>
            <Field label={t("proposal.attachment")}><input className={inputClass} type="file" /></Field>
          </div>
          <Field label={t("proposal.coverLetter")}>
            <textarea className={inputClass} rows={8} placeholder={t("proposal.coverPlaceholder")} required />
          </Field>
          <button className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-ink">
            <Send className="size-4" />
            {t("proposal.submit")}
          </button>
        </form>
      </div>
    </main>
  );
}
