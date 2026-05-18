"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { codeToHtml } from "shiki";
import { CardTheme } from "@/lib/theme";
import { FontOption } from "@/lib/fonts";

type Props = {
  code: string;
  language: string;
  theme: CardTheme;
  font: FontOption;
  padding: number;
  watermark: string;
  fileName: string;
  cardRef: React.RefObject<HTMLDivElement | null>;
};

export default function CardPreview({
  code,
  language,
  theme,
  font,
  padding,
  watermark,
  fileName,
  cardRef,
}: Props) {
  const [highlighted, setHighlighted] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!code.trim()) {
      setHighlighted("");
      return;
    }

    let cancelled = false;
    setLoading(true);

    codeToHtml(code, {
      lang: language,
      theme: theme.shikiTheme as any,
    })
      .then((html) => {
        if (!cancelled) setHighlighted(html);
      })
      .catch(() => {
        if (!cancelled) setHighlighted(`<pre>${code}</pre>`);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [code, language, theme]);

  const paddingMap: Record<number, string> = {
    1: "16px",
    2: "24px",
    3: "32px",
    4: "48px",
    5: "64px",
  };

  const pad = paddingMap[padding] ?? "32px";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex items-center justify-center w-full"
    >
      {/* Exportable card */}
      <div
        ref={cardRef}
        style={{
          background: theme.background,
          padding: pad,
          borderRadius: "16px",
          minWidth: "480px",
          maxWidth: "780px",
          width: "100%",
          boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
        }}
      >
        {/* Window chrome */}
        <div
          style={{
            background: theme.headerBg,
            borderRadius: "10px 10px 0 0",
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          {/* Traffic lights */}
          <div style={{ display: "flex", gap: "6px" }}>
            {theme.dotColors.map((color, i) => (
              <span
                key={i}
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: color,
                  display: "inline-block",
                }}
              />
            ))}
          </div>

          {/* File name */}
          <span
            style={{
              fontFamily: "'Geist Mono', monospace",
              fontSize: "12px",
              color: theme.textColor,
              opacity: 0.5,
              flex: 1,
              textAlign: "center",
            }}
          >
            {fileName || "untitled"}
          </span>

          {/* Language badge */}
          <span
            style={{
              fontFamily: "'Geist Mono', monospace",
              fontSize: "11px",
              color: theme.textColor,
              opacity: 0.4,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            {language}
          </span>
        </div>

        {/* Code body */}
        <div
          style={{
            background: theme.background,
            borderRadius: "0 0 10px 10px",
            padding: "20px 0px",
            fontFamily: font.value,
            fontSize: "13px",
            lineHeight: "1.7",
            overflow: "hidden",
            opacity: loading ? 0.4 : 1,
            transition: "opacity 0.2s",
            ["--code-font" as any]: font.value,
          }}
          dangerouslySetInnerHTML={{
            __html:
              highlighted ||
              `<pre style="color:${theme.textColor};margin:0;padding:0;">${code || "// your code appears here"}</pre>`,
          }}
        />

        {/* Watermark */}
        {watermark && (
          <div
            style={{
              marginTop: "12px",
              textAlign: "right",
              fontFamily: "'Geist Mono', monospace",
              fontSize: "11px",
              color: theme.textColor,
              opacity: 0.35,
              letterSpacing: "0.05em",
            }}
          >
            {watermark}
          </div>
        )}
      </div>
    </motion.div>
  );
}
