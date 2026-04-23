import { useEffect } from "react";

interface PageMeta {
  title: string;
  metaDescription: string;
}

/**
 * Sets <title> and <meta name="description"> from a page meta object.
 * Restores previous values on unmount.
 */
export function usePageMeta(meta: PageMeta) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = meta.title;

    let descTag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const created = !descTag;
    const prevDesc = descTag?.getAttribute("content") ?? "";

    if (!descTag) {
      descTag = document.createElement("meta");
      descTag.setAttribute("name", "description");
      document.head.appendChild(descTag);
    }
    descTag.setAttribute("content", meta.metaDescription);

    return () => {
      document.title = prevTitle;
      if (descTag) {
        if (created) descTag.remove();
        else descTag.setAttribute("content", prevDesc);
      }
    };
  }, [meta.title, meta.metaDescription]);
}
