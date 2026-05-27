import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import path from "path";

export default defineConfig(({ mode }) => {
  // Load ALL env vars — including non-VITE_ ones (server-side secrets).
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
        // In dev the client calls /api/graphql (relative → goes through this proxy).
        // The proxy forwards to the real endpoint and injects the API key server-side.
        // The key never reaches the browser bundle.
        "/api/graphql": {
          // VITE_GRAPHQL_ENDPOINT is the full URL (including /api/graphql path).
          // Use only the origin as the proxy target — the /api/graphql path is
          // already correct and needs no rewrite.
          target: new URL(env.VITE_GRAPHQL_ENDPOINT).origin,
          changeOrigin: true,
          headers: {
            authorization: env.API_KEY,
          },
        },
      },
    },
  };
});
