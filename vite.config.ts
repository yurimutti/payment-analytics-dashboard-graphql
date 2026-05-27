import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import path from "path";

export default defineConfig(({ mode }) => {
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
        "/api/graphql": {
          target: new URL(env.VITE_GRAPHQL_ENDPOINT).origin,
          changeOrigin: true,
          rewrite: () => "/",
          headers: {
            authorization: env.API_KEY,
          },
        },
      },
    },
  };
});
