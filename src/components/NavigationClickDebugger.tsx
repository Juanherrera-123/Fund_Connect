"use client";

import { useEffect } from "react";

type DebugEvent = MouseEvent | PointerEvent;

type PathNode = {
  tag: string;
  id?: string;
  className?: string;
};

const MAX_PATH_NODES = 12;

const describeTarget = (node: HTMLElement | null): string => {
  if (!node) return "unknown";
  const id = node.id ? `#${node.id}` : "";
  const className = node.className ? `.${node.className.toString().trim().replace(/\s+/g, ".")}` : "";
  return `${node.tagName.toLowerCase()}${id}${className}`;
};

const buildPath = (event: DebugEvent): PathNode[] => {
  const composed = event.composedPath?.() ?? [];
  return composed.slice(0, MAX_PATH_NODES).map((node) => {
    if (!(node instanceof Element)) {
      return { tag: String(node) };
    }
    return {
      tag: node.tagName.toLowerCase(),
      id: node.id || undefined,
      className: node.className?.toString() || undefined,
    };
  });
};

const logEvent = (label: string, event: DebugEvent, anchor: HTMLAnchorElement | null) => {
  const rawHref = anchor?.getAttribute("href") ?? null;
  const resolvedHref = anchor?.href ?? null;
  const target = event.target as HTMLElement | null;
  console.log(
    `[ClickDebug] ${label} type=${event.type} path=${window.location.pathname} raw=${rawHref} resolved=${resolvedHref} target=${describeTarget(
      target
    )} defaultPrevented=${event.defaultPrevented}`
  );
};

export default function NavigationClickDebugger() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handler = (event: DebugEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest?.("a") as HTMLAnchorElement | null;
      const initialDefaultPrevented = event.defaultPrevented;
      logEvent("capture", event, anchor);

      let reported = false;
      const reportIfPrevented = (phase: string) => {
        if (reported) return;
        if (!initialDefaultPrevented && event.defaultPrevented) {
          reported = true;
          const pathSummary = buildPath(event).map((node) => {
            const id = node.id ? `#${node.id}` : "";
            const className = node.className
              ? `.${node.className.trim().replace(/\s+/g, ".")}`
              : "";
            return `${node.tag}${id}${className}`;
          });
          console.log(
            `[ClickDebug] defaultPrevented flipped -> true (${phase}) anchor=${anchor?.getAttribute(
              "href"
            )} resolved=${anchor?.href}`
          );
          console.log("[ClickDebug] composedPath:", pathSummary);
        }
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
  }, []);

  return null;
}
