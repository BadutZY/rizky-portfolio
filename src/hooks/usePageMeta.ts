import { useEffect } from "react";

type PageMeta = {
  title: string;
  description?: string | undefined;
  ogTitle?: string | undefined;
  ogDescription?: string | undefined;
};

function setMetaTag(attr: "name" | "property", key: string, content: string | undefined) {
  if (!content) return;
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/**
 * Sets document.title and meta description / og tags on mount.
 * Replaces the per-route `head()` config previously provided by
 * TanStack Router's `createFileRoute`.
 */
export function usePageMeta({ title, description, ogTitle, ogDescription }: PageMeta) {
  useEffect(() => {
    document.title = title;
    setMetaTag("name", "description", description);
    setMetaTag("property", "og:title", ogTitle ?? title);
    setMetaTag("property", "og:description", ogDescription ?? description);
  }, [title, description, ogTitle, ogDescription]);
}
