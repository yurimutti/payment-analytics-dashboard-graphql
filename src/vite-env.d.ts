/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GRAPHQL_ENDPOINT: string;
  // API_KEY has no VITE_ prefix — it is server-side only and never bundled.
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
