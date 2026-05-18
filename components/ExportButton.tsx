"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toPng } from "html-to-image";

type Props = {
  cardRef: React.RefObject<HTMLDivElement | null>;
  fileName: string;
};

export default function ExportButton({ cardRef, fileName }: Props) {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  const handleExport = async () => {
    if (!cardRef.current || state === "loading") return;

    setState("loading");

    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 3,
        cacheBust: true,
      });

      const link = document.createElement("a");
      link.download = `${fileName || "snippet"}.png`;
      link.href = dataUrl;
      link.click();

      setState("done");
      setTimeout(() => setState("idle"), 2000);
    } catch (err) {
      console.error(err);
      setState("idle");
    }
  };

  const labels = {
    idle: "Export PNG",
    loading: "Rendering...",
    done: "Saved ✓",
  };

  return (
    <motion.button
      onClick={handleExport}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      style={{
        width: "100%",
        padding: "12px",
        borderRadius: "10px",
        background: state === "done" ? "#22c55e" : "var(--accent)",
        color: "var(--accent-foreground)",
        fontFamily: "'Geist Mono', monospace",
        fontSize: "13px",
        fontWeight: 600,
        letterSpacing: "0.05em",
        border: "none",
        cursor: state === "loading" ? "not-allowed" : "pointer",
        transition: "background 0.2s",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={state}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15 }}
          style={{ display: "block" }}
        >
          {labels[state]}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
