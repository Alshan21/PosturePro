"use client";

import { useEffect, useState } from "react";

/** True only after the client has mounted (safe for localStorage, motion enter animations). */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
