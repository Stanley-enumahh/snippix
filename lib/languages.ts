export type Language = {
  id: string;
  label: string;
};

export const LANGUAGES: Language[] = [
  { id: "typescript", label: "TypeScript" },
  { id: "javascript", label: "JavaScript" },
  { id: "tsx", label: "TSX" },
  { id: "jsx", label: "JSX" },
  { id: "python", label: "Python" },
  { id: "rust", label: "Rust" },
  { id: "go", label: "Go" },
  { id: "java", label: "Java" },
  { id: "cpp", label: "C++" },
  { id: "c", label: "C" },
  { id: "bash", label: "Bash" },
  { id: "sql", label: "SQL" },
  { id: "json", label: "JSON" },
  { id: "yaml", label: "YAML" },
  { id: "css", label: "CSS" },
  { id: "html", label: "HTML" },
  { id: "markdown", label: "Markdown" },
  { id: "prisma", label: "Prisma" },
  { id: "graphql", label: "GraphQL" },
  { id: "dockerfile", label: "Dockerfile" },
];

export const DEFAULT_LANGUAGE = LANGUAGES[0];
