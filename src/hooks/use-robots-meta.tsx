import { useEffect } from "react";

/**
 * Sets <meta name="robots" content="..."> dynamically per page.
 * Cleans up on unmount by removing the tag (so default = no restriction).
 */
export function useRobotsMeta(content: "index, follow" | "noindex, follow" | "noindex, nofollow") {
  useEffect(() => {
    let tag = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const created = !tag;
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("name", "robots");
      document.head.appendChild(tag);
    }
    const previous = tag.getAttribute("content");
    tag.setAttribute("content", content);

    return () => {
      if (created) {
        tag?.remove();
      } else if (previous !== null) {
        tag?.setAttribute("content", previous);
      }
    };
  }, [content]);
}
