import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import path from "path";

export default defineConfig(({ mode }) => {
  // Load ALL env vars — including non-VITE_ ones (server-side secrets).
  // Passing "" as the prefix means nothing is filtered out.
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      tailwindcss(),
      TanStackRouterVite({ routesDirectory: "./src/routes" }),
      react(),
    ],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    server: {
      proxy: {
        // All requests to /api/graphql are forwarded to the real GraphQL endpoint.
        // The Authorization header is injected here, in Node.js — it never reaches
        // the browser bundle.
        "/api/graphql": {
          target: env.GRAPHQL_ENDPOINT,
          changeOrigin: true,
          // Strip the /api/graphql prefix — the real server lives at its root.
          rewrite: (p) => p.replace(/^\/api\/graphql/, ""),
          headers: {
            authorization: env.API_KEY,
          },
        },
      },
    },
  };
});
