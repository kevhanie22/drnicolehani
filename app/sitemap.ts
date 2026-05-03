import { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.baseUrl;
  const now = new Date();

  const routes = ["", "about", "services", "blog", "contact"];

  const pageEntries: MetadataRoute.Sitemap = routes.map((r) => {
    const path = r ? `/${r}` : "";
    return {
      url: `${base}${path || "/"}`,
      lastModified: now,
      changeFrequency: r === "blog" ? "weekly" : "monthly",
      priority: r === "" ? 1.0 : r === "contact" ? 0.9 : 0.8,
      alternates: {
        languages: {
          en: `${base}${path || "/"}`,
          fr: `${base}/fr${path}`,
          "x-default": `${base}${path || "/"}`,
        },
      },
    };
  });

  const enPosts: MetadataRoute.Sitemap = getPosts("en").map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly",
    priority: 0.6,
    alternates: {
      languages: {
        en: `${base}/blog/${p.slug}`,
        fr: `${base}/fr/blog/${p.slug}`,
        "x-default": `${base}/blog/${p.slug}`,
      },
    },
  }));

  return [...pageEntries, ...enPosts];
}
