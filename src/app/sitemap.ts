import type { MetadataRoute } from "next";
import { caseHref, cases } from "@/content/cases";

export const dynamic = "force-static";

const base = "https://matipeinado.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/work/", "/about/", ...cases.map((c) => caseHref(c.slug))].map((path) => ({ url: base + path }));
}
