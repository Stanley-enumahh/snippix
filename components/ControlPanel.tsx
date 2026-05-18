"use client";

import { motion } from "framer-motion";
import { CARD_THEMES, CardTheme } from "@/lib/theme";
import { LANGUAGES } from "@/lib/languages";
import { FONT_OPTIONS, FontOption } from "@/lib/fonts";

type Props = {
  language: string;
  onLanguageChange: (val: string) => void;
  theme: CardTheme;
  onThemeChange: (val: CardTheme) => void;
  font: FontOption;
  onFontChange: (val: FontOption) => void;
  padding: number;
  onPaddingChange: (val: number) => void;
  watermark: string;
  onWatermarkChange: (val: string) => void;
  fileName: string;
  onFileNameChange: (val: string) => void;
};

const labelStyle = {
  fontSize: "11px",
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
  color: "var(--muted-foreground)",
  marginBottom: "8px",
  display: "block",
};

const inputStyle = {
  width: "100%",
  background: "var(--muted)",
  border: "1px solid var(--border)",
  borderRadius: "8px",
  padding: "8px 12px",
  fontSize: "13px",
  color: "var(--foreground)",
  outline: "none",
  fontFamily: "'Geist Mono', monospace",
};

const selectStyle = {
  ...inputStyle,
  cursor: "pointer",
  appearance: "none" as const,
};

export default function ControlPanel({
  language,
  onLanguageChange,
  theme,
  onThemeChange,
  font,
  onFontChange,
  padding,
  onPaddingChange,
  watermark,
  onWatermarkChange,
  fileName,
  onFileNameChange,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, ease: "easeOut", delay: 0.1 }}
      className="flex flex-col gap-5 w-full"
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--border)",
        borderRadius: "16px",
        padding: "20px",
      }}
    >
      <p
        style={{
          fontSize: "11px",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--muted-foreground)",
          fontFamily: "'Geist Mono', monospace",
        }}
      >
        Controls
      </p>

      {/* Language */}
      <div>
        <label style={labelStyle}>Language</label>
        <select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
          style={selectStyle}
        >
          {LANGUAGES.map((l) => (
            <option key={l.id} value={l.id}>
              {l.label}
            </option>
          ))}
        </select>
      </div>

      {/* Theme */}
      <div>
        <label style={labelStyle}>Theme</label>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {CARD_THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => onThemeChange(t)}
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: t.background,
                border:
                  theme.id === t.id
                    ? "2px solid var(--accent)"
                    : "2px solid var(--border)",
                cursor: "pointer",
                transition: "border 0.15s",
                boxShadow:
                  theme.id === t.id ? "0 0 0 2px var(--accent)33" : "none",
              }}
              title={t.label}
            />
          ))}
        </div>
      </div>

      {/* Font */}
      <div>
        <label style={labelStyle}>Font</label>
        <select
          value={font.id}
          onChange={(e) =>
            onFontChange(FONT_OPTIONS.find((f) => f.id === e.target.value)!)
          }
          style={selectStyle}
        >
          {FONT_OPTIONS.map((f) => (
            <option key={f.id} value={f.id}>
              {f.label}
            </option>
          ))}
        </select>
      </div>

      {/* Padding */}
      <div>
        <label style={labelStyle}>Padding — {padding}</label>
        <input
          type="range"
          min={1}
          max={5}
          step={1}
          value={padding}
          onChange={(e) => onPaddingChange(Number(e.target.value))}
          style={{ width: "100%", accentColor: "var(--accent)" }}
        />
      </div>

      {/* File name */}
      <div>
        <label style={labelStyle}>File name</label>
        <input
          type="text"
          value={fileName}
          onChange={(e) => onFileNameChange(e.target.value)}
          placeholder="index.ts"
          style={inputStyle}
        />
      </div>

      {/* Watermark */}
      <div>
        <label style={labelStyle}>Watermark</label>
        <input
          type="text"
          value={watermark}
          onChange={(e) => onWatermarkChange(e.target.value)}
          placeholder="@yourhandle"
          style={inputStyle}
        />
      </div>
    </motion.div>
  );
}
