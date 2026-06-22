import type { Locale } from "@/lib/i18n";

export function pageMetadata(locale: Locale, title: string, description: string, path = "") {
  const url = `/${locale}${path}`;
  return {
    title: `${title} | SHOTPHOO`,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `/en${path}`,
        fa: `/fa${path}`,
        ar: `/ar${path}`
      }
    },
    openGraph: {
      title: `${title} | SHOTPHOO`,
      description,
      url,
      siteName: "SHOTPHOO",
      type: "website",
      images: ["/icon.svg"]
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | SHOTPHOO`,
      description
    }
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SHOTPHOO",
    url: "https://shotphoo.shop",
    sameAs: ["https://rozatia.com"],
    brand: ["Rozatia", "Owl Magazine", "Reyhan Banoo"]
  };
}
