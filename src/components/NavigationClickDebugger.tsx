"use client";

import { useEffect } from "react";

type DebugEvent = MouseEvent | PointerEvent;

type PathNode = {
  tag: string;
  id?: string;
  className?: string;
};

const MAX_PATH_NODES = 12;

const describeNode = (node: EventTarget): PathNode => {
  if (!(node instanceof Element)) {
    return { tag: String(node) };
  }

  return {
    tag: node.tagName.toLowerCase(),
    id: node.id || undefined,
    className: node.className?.toString() || undefined,
  };
};

const formatNode = (node: PathNode): string => {
  const id = node.id ? `#${node.id}` : "";
  const className = node.className ? `.${node.className.trim().replace(/\s+/g, ".")}` : "";
  return `${node.tag}${id}${className}`;
};

const logEvent = (label: string, event: DebugEvent, anchor: HTMLAnchorElement | null) => {
  const rawHref = anchor?.getAttribute("href") ?? null;
  const resolvedHref = anchor?.href ?? null;
  console.log(
    `[ClickDebug] ${label} path=${window.location.pathname} raw=${rawHref} resolved=${resolvedHref} defaultPrevented=${event.defaultPrevented}`
  );
};

export default function NavigationClickDebugger() {
  const isEnabled = process.env.NEXT_PUBLIC_CLICK_DEBUG === "true";

  useEffect(() => {
    if (!isEnabled) return;
    if (typeof window === "undefined") return;

    const handler = (event: DebugEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest?.("a") as HTMLAnchorElement | null;
      if (!anchor) return;

      const initialDefaultPrevented = event.defaultPrevented;
      logEvent("capture", event, anchor);

      const reportIfPrevented = (phase: string) => {
        if (initialDefaultPrevented || !event.defaultPrevented) return;

        const pathSummary = event
          .composedPath()
          .slice(0, MAX_PATH_NODES)
          .map((node) => formatNode(describeNode(node)));
        console.log("DEFAULT PREVENTED AFTER CAPTURE", phase);
        console.log("[ClickDebug] anchor:", anchor.outerHTML.slice(0, 200));
        console.log("[ClickDebug] composedPath:", pathSummary);
      };

      queueMicrotask(() => {
        logEvent("microtask", event, anchor);
        reportIfPrevented("microtask");
      });

      window.setTimeout(() => {
        logEvent("timeout", event, anchor);
        reportIfPrevented("timeout");
      }, 0);
    };

    document.addEventListener("click", handler, true);
    document.addEventListener("pointerdown", handler, true);

    return () => {
      document.removeEventListener("click", handler, true);
      document.removeEventListener("pointerdown", handler, true);
    };
  }, [isEnabled]);

  if (!isEnabled) return null;

  return null;
}
