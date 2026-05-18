"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

type Props = {
  value: string;
  onChange: (val: string) => void;
};

export default function CodeEditor({ value, onChange }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const newVal = value.substring(0, start) + "  " + value.substring(end);
      onChange(newVal);
      requestAnimationFrame(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = start + 2;
          textareaRef.current.selectionEnd = start + 2;
        }
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative w-full rounded-xl overflow-hidden"
      style={{ background: "var(--muted)", border: "1px solid var(--border)" }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-2 px-4 py-3 text-xs"
        style={{
          background: "var(--card-bg)",
          borderBottom: "1px solid var(--border)",
          color: "var(--muted-foreground)",
        }}
      >
        <span
          className="w-2 h-2 rounded-full"
          style={{ background: "var(--accent)" }}
        />
        <span>paste your code</span>
      </div>

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        autoCorrect="off"
        autoCapitalize="off"
        placeholder={`// paste code here\nconst greet = (name: string) => {\n  return \`hello, \${name}\`\n}`}
        className="w-full resize-none bg-transparent outline-none p-4 text-sm leading-relaxed min-h-[200px]"
        style={{
          fontFamily: "'Geist Mono', monospace",
          color: "var(--foreground)",
          caretColor: "var(--accent)",
        }}
      />

      {/* Char count */}
      {value.length > 0 && (
        <div
          className="absolute bottom-3 right-4 text-xs tabular-nums"
          style={{ color: "var(--muted-foreground)" }}
        >
          {value.length} chars
        </div>
      )}
    </motion.div>
  );
}
