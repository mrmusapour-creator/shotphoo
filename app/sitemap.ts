import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { getI18n } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://shotphoo.com";
  const staticRoutes = ["", "/portfolio", "/services", "/marketplace", "/cart", "/checkout", "/messages", "/blog", "/request-project", "/join", "/freelance", "/freelance/proposal", "/development", "/ecosystem", "/ceo-contact"];
  const serviceRoutes = getI18n("en").list<{ slug: string }>("services.items").map((service) => `/services/${service.slug}`);

  return locales.flatMap((locale) =>
    [...staticRoutes, ...serviceRoutes].map((route) => ({
      url: `${base}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.7
    }))
  );
}
