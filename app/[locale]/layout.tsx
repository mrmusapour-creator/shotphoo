import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getI18n, localeMeta, locales, type Locale } from "@/lib/i18n";
import { organizationJsonLd } from "@/lib/seo";
import { PwaRegister } from "@/components/pwa-register";

const nav = [
  ["portfolio", "portfolio"],
  ["services", "services"],
  ["marketplace", "marketplace"],
  ["freelance", "freelance"],
  ["messages", "messages"],
  ["projects", "development"],
  ["admin", "admin"]
] as const;

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true
  }
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  if (!locales.includes(params.locale)) notFound();
  const dir = localeMeta[params.locale].dir;
  const { t } = getI18n(params.locale);

  return (
    <div dir={dir} className="min-h-screen overflow-hidden">
      <PwaRegister />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
      />
      <header className="sticky top-0 z-50 border-b border-silver/15 bg-ink/88 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
          <Link href={`/${params.locale}`} className="font-display text-2xl font-bold tracking-normal text-white">
            {t("brand.name")}
          </Link>
          <nav className="hidden items-center gap-5 text-sm text-white/70 lg:flex">
            {nav.map(([key, href]) => (
              <Link key={href} href={`/${params.locale}/${href}`} className="hover:text-silver">
                {t(`nav.${key}`)}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            {locales.map((locale) => (
              <Link
                key={locale}
                href={`/${locale}`}
                className="grid h-9 min-w-9 place-items-center rounded-full border border-silver/20 text-xs text-white/70 hover:border-white hover:text-white"
              >
                {localeMeta[locale].label}
              </Link>
            ))}
            <Link href={`/${params.locale}/request-project`} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink">
              {t("nav.start")}
            </Link>
          </div>
        </div>
      </header>
      {children}
      <footer className="border-t border-silver/15 px-4 py-10 text-sm text-white/58">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p>{t("brand.footer")}</p>
          <div className="flex gap-4">
            <Link href={`/${params.locale}/ceo-contact`}>{t("nav.ceo")}</Link>
            <Link href={`/${params.locale}/join`}>{t("nav.join")}</Link>
            <Link href={`/${params.locale}/blog`}>{t("nav.blog")}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
