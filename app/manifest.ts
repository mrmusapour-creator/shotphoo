import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SHOTPHOO",
    short_name: "SHOTPHOO",
    description: "A multilingual creative agency, marketplace, freelance hub, and SaaS operating system.",
    id: "/",
    start_url: "/fa",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#132232",
    theme_color: "#35465A",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml"
      }
    ]
  };
}
