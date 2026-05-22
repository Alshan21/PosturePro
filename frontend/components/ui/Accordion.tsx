"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpen?: string;
  className?: string;
}

export function Accordion({ items, defaultOpen, className }: AccordionProps) {
  const [openItem, setOpenItem] = useState(defaultOpen);

  return (
    <div className={cn("w-full space-y-2", className)}>
      {items.map((item) => (
        <div key={item.id} className="overflow-hidden rounded-2xl border border-border bg-surface">
          <button
            onClick={() => setOpenItem(openItem === item.id ? undefined : item.id)}
            className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-canvas-warm"
          >
            <span className="font-semibold text-ink">{item.title}</span>
            <motion.div
              animate={{ rotate: openItem === item.id ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="h-5 w-5 text-ink-muted" />
            </motion.div>
          </button>
          <AnimatePresence>
            {openItem === item.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="px-5 pb-5 text-ink-muted">{item.content}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
