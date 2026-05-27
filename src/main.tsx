import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { AllProviders } from "@/shared/providers";
import { Toaster } from "@/shared/ui/toaster";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AllProviders>
      <Toaster richColors position="top-right" />
    </AllProviders>
  </StrictMode>,
);
