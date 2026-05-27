/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GRAPHQL_ENDPOINT: string;
  // API_KEY is intentionally absent — it is server-side only (no VITE_ prefix)
  // and is never bundled. It lives in vite.config.ts proxy config only.
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
