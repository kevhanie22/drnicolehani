import { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.baseUrl;
  const routes = ["", "about", "services", "blog", "contact"];
  const enRoutes = routes.map((r) => ({ url: `${base}/${r}`, lastModified: new Date() }));
  const frRoutes = routes.map((r) => ({ url: `${base}/fr/${r}`, lastModified: new Date() }));
  const enPosts = getPosts("en").map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: new Date(p.date) }));
  const frPosts = getPosts("fr").map((p) => ({ url: `${base}/fr/blog/${p.slug}`, lastModified: new Date(p.date) }));
  return [...enRoutes, ...frRoutes, ...enPosts, ...frPosts];
}
