"use client";

import { useMounted } from "./useMounted";

/**
 * SSR-safe Framer Motion props.
 * - Server + first client paint: initial={false} (matches `animate` target, no mismatch)
 * - After mount: run enter animations via `animate`
 */
export function useHydrationMotion(animateTarget: string = "visible") {
  const mounted = useMounted();
  return {
    initial: false as const,
    animate: mounted ? animateTarget : undefined,
  };
}
