import { Download } from "lucide-react";
import { SectionHeading } from "@/components/ui";
import { getI18n, type Locale } from "@/lib/i18n";

export default function DownloadsPage({ params }: { params: { locale: Locale } }) {
  const { t, list } = getI18n(params.locale);
  return (
    <main className="section">
      <SectionHeading eyebrow={t("downloads.eyebrow")} title={t("downloads.title")} />
      <div className="glass mx-auto max-w-4xl rounded-2xl p-6">
        {list<string>("downloads.items").map((item) => (
          <div key={item} className="flex items-center justify-between border-b border-silver/15 py-4 last:border-0">
            <span>{item}</span>
            <button className="inline-flex items-center gap-2 rounded-full border border-silver/20 px-4 py-2 text-sm"><Download className="size-4" /> {t("downloads.download")}</button>
          </div>
        ))}
      </div>
    </main>
  );
}
