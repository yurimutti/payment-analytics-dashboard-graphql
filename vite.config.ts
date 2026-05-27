import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import { boneyardPlugin } from "boneyard-js/vite";
import path from "path";

export default defineConfig({
  plugins: [
    boneyardPlugin(),
    tailwindcss(),
    TanStackRouterVite({ routesDirectory: "./src/routes" }),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
