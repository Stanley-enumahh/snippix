export type FontOption = {
  id: string;
  label: string;
  value: string;
};

export const FONT_OPTIONS: FontOption[] = [
  {
    id: "geist-mono",
    label: "Geist Mono",
    value: "var(--font-geist-mono), monospace",
  },
  {
    id: "fira-code",
    label: "Fira Code",
    value: "var(--font-fira-code), monospace",
  },
  {
    id: "jetbrains",
    label: "JetBrains Mono",
    value: "var(--font-jetbrains-mono), monospace",
  },
  {
    id: "ibm-plex",
    label: "IBM Plex Mono",
    value: "var(--font-ibm-plex-mono), monospace",
  },
  {
    id: "source-code",
    label: "Source Code Pro",
    value: "var(--font-source-code-pro), monospace",
  },
];

export const DEFAULT_FONT = FONT_OPTIONS[0];
