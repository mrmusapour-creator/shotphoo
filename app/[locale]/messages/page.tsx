import { Bell, Headphones, MessageSquareText, Send } from "lucide-react";
import { Field, inputClass, SectionHeading } from "@/components/ui";
import { getI18n, type Locale } from "@/lib/i18n";

export default function MessagesPage({ params }: { params: { locale: Locale } }) {
  const { t, list } = getI18n(params.locale);
  const threads = list<{ title: string; body: string }>("messages.threads");
  const icons = [MessageSquareText, Headphones, Bell];

  return (
    <main className="section">
      <SectionHeading eyebrow={t("messages.eyebrow")} title={t("messages.title")} body={t("messages.body")} />
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.45fr_1fr]">
        <aside className="glass rounded-2xl p-4">
          <div className="space-y-3">
            {threads.map((thread, index) => {
              const Icon = icons[index];
              return (
                <button key={thread.title} className="w-full rounded-xl border border-silver/15 bg-ink/45 p-4 text-start hover:border-white">
                  <div className="flex items-center gap-3">
                    <Icon className="size-5 text-white" />
                    <span className="font-semibold">{thread.title}</span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm text-white/52">{thread.body}</p>
                </button>
              );
            })}
          </div>
        </aside>
        <section className="glass rounded-2xl p-6">
          <div className="min-h-[22rem] space-y-4">
            {threads.map((thread, index) => (
              <div key={thread.title} className={`max-w-[80%] rounded-2xl border border-silver/15 p-4 ${index % 2 ? "ms-auto bg-white text-ink" : "bg-ink/50 text-white"}`}>
                <p className="font-semibold">{thread.title}</p>
                <p className="mt-2 text-sm opacity-75">{thread.body}</p>
              </div>
            ))}
          </div>
          <form className="mt-6 flex gap-3">
            <Field label={t("messages.compose")}>
              <input className={inputClass} placeholder={t("messages.placeholder")} />
            </Field>
            <button className="self-end rounded-full bg-white px-5 py-3 font-semibold text-ink">
              <Send className="size-4" />
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
