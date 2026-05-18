export type CardTheme = {
  id: string;
  label: string;
  background: string;
  headerBg: string;
  shikiTheme: string;
  textColor: string;
  dotColors: [string, string, string];
};

export const CARD_THEMES: CardTheme[] = [
  {
    id: "ash",
    label: "Ash",
    background: "#111111",
    headerBg: "#1c1c1c",
    shikiTheme: "github-dark",
    textColor: "#fafafa",
    dotColors: ["#ff5f57", "#febc2e", "#28c840"],
  },
  {
    id: "midnight",
    label: "Midnight",
    background: "#0d0d1a",
    headerBg: "#1a1a3e",
    shikiTheme: "nord",
    textColor: "#e2e8f0",
    dotColors: ["#f87171", "#fbbf24", "#34d399"],
  },
  {
    id: "forest",
    label: "Forest",
    background: "#0a1a0f",
    headerBg: "#0f2d18",
    shikiTheme: "vitesse-dark",
    textColor: "#d1fae5",
    dotColors: ["#f87171", "#fbbf24", "#4ade80"],
  },
  {
    id: "ember",
    label: "Ember",
    background: "#1a0a00",
    headerBg: "#2d1500",
    shikiTheme: "solarized-dark",
    textColor: "#fed7aa",
    dotColors: ["#ef4444", "#f97316", "#eab308"],
  },
  {
    id: "arctic",
    label: "Arctic",
    background: "#f0f4f8",
    headerBg: "#dde4ed",
    shikiTheme: "github-light",
    textColor: "#1a1a2e",
    dotColors: ["#f87171", "#fbbf24", "#34d399"],
  },
];

export const DEFAULT_THEME = CARD_THEMES[0];
