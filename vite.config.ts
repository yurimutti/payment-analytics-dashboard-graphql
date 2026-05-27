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
          target: env.VITE_GRAPHQL_ENDPOINT,
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/api\/graphql/, ""),
          headers: {
            authorization: env.API_KEY,
          },
        },
      },
    },
  };
});
