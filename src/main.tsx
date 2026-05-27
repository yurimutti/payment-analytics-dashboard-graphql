import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import "./styles.css";
import { router } from "./router";
import { ApolloProvider } from "@/shared/providers";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider>
      <RouterProvider router={router} />
    </ApolloProvider>
  </StrictMode>,
);
