"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CodeEditor from "@/components/CodeEditor";
import CardPreview from "@/components/CardPreview";
import ControlPanel from "@/components/ControlPanel";
import ExportButton from "@/components/ExportButton";
import { DEFAULT_THEME } from "@/lib/theme";
import { LANGUAGES, DEFAULT_LANGUAGE } from "@/lib/languages";
import { DEFAULT_FONT } from "@/lib/fonts";

const DEFAULT_CODE = `import { useQuery } from "@tanstack/react-query";

async function fetchUser(id: string) {
  const res = await fetch(\`/api/users/\${id}\`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

export function useUser(id: string) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUser(id),
    staleTime: 1000 * 60 * 5,
  });
}`;

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
  appearance: "none" as const,
  cursor: "pointer",
};

export default function Home() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [step, setStep] = useState<1 | 2>(1);

  const [code, setCode] = useState(DEFAULT_CODE);
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE.id);
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const [font, setFont] = useState(DEFAULT_FONT);
  const [padding, setPadding] = useState(3);
  const [watermark, setWatermark] = useState("@yourhandle");
  const [fileName, setFileName] = useState("useUser.ts");

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      {/* Nav */}
      <motion.nav
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          borderBottom: "1px solid var(--border)",
          padding: "16px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span
            style={{
              background: "var(--accent)",
              color: "var(--accent-foreground)",
              fontFamily: "'Geist Mono', monospace",
              fontWeight: 700,
              fontSize: "13px",
              padding: "3px 10px",
              borderRadius: "6px",
              letterSpacing: "0.05em",
            }}
          >
            snippix
          </span>
          <span
            style={{
              fontSize: "12px",
              color: "var(--muted-foreground)",
              fontFamily: "'Geist Mono', monospace",
            }}
          >
            code card generator
          </span>
        </div>

        {/* Step indicator */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontFamily: "'Geist Mono', monospace",
            fontSize: "12px",
          }}
        >
          {[1, 2].map((s) => (
            <div
              key={s}
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <motion.span
                animate={{
                  color:
                    step === s ? "var(--accent)" : "var(--muted-foreground)",
                  fontWeight: step === s ? 700 : 400,
                }}
                style={{ cursor: s < step ? "pointer" : "default" }}
                onClick={() => s < step && setStep(s as 1 | 2)}
              >
                {s === 1 ? "1 paste" : "2 style"}
              </motion.span>
              {s === 1 && <span style={{ color: "var(--border)" }}>—</span>}
            </div>
          ))}
        </div>
      </motion.nav>

      <AnimatePresence mode="wait">
        {/* ── STEP 1 ── */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              maxWidth: "720px",
              margin: "0 auto",
              padding: "60px 24px",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: "22px",
                  fontWeight: 700,
                  marginBottom: "6px",
                  fontFamily: "'Geist Mono', monospace",
                }}
              >
                Paste your code
              </h1>
              <p
                style={{
                  fontSize: "13px",
                  color: "var(--muted-foreground)",
                  fontFamily: "'Geist Mono', monospace",
                }}
              >
                Pick a language, then style your card in the next step.
              </p>
            </div>

            {/* Language select */}
            <div>
              <label
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--muted-foreground)",
                  marginBottom: "8px",
                  display: "block",
                  fontFamily: "'Geist Mono', monospace",
                }}
              >
                Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                style={inputStyle}
              >
                {LANGUAGES.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.label}
                  </option>
                ))}
              </select>
            </div>

            <CodeEditor value={code} onChange={setCode} />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => code.trim() && setStep(2)}
              style={{
                padding: "13px",
                borderRadius: "10px",
                background: code.trim() ? "var(--accent)" : "var(--muted)",
                color: code.trim()
                  ? "var(--accent-foreground)"
                  : "var(--muted-foreground)",
                fontFamily: "'Geist Mono', monospace",
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.05em",
                border: "none",
                cursor: code.trim() ? "pointer" : "not-allowed",
                transition: "background 0.2s, color 0.2s",
              }}
            >
              Continue →
            </motion.button>
          </motion.div>
        )}

        {/* ── STEP 2 ── */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              padding: "32px 24px",
              display: "grid",
              gridTemplateColumns: "1fr 300px",
              gap: "28px",
              alignItems: "start",
              height: "calc(100vh - 65px)",
            }}
          >
            {/* Preview — vertically centered */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <CardPreview
                code={code}
                language={language}
                theme={theme}
                font={font}
                padding={padding}
                watermark={watermark}
                fileName={fileName}
                cardRef={cardRef}
              />
            </div>

            {/* Controls — sticky */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                position: "sticky",
                top: "24px",
              }}
            >
              <ControlPanel
                language={language}
                onLanguageChange={setLanguage}
                theme={theme}
                onThemeChange={setTheme}
                font={font}
                onFontChange={setFont}
                padding={padding}
                onPaddingChange={setPadding}
                watermark={watermark}
                onWatermarkChange={setWatermark}
                fileName={fileName}
                onFileNameChange={setFileName}
              />
              <ExportButton cardRef={cardRef} fileName={fileName} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
