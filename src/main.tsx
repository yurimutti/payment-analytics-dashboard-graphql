import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import "./styles.css";
import { router } from "./router";
import { ApolloProvider } from "@/shared/providers";
import { Toaster } from "@/shared/ui/toaster";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider>
      <RouterProvider router={router} />
      <Toaster richColors position="top-right" />
    </ApolloProvider>
  </StrictMode>,
);
