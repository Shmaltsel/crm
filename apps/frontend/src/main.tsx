import "./instrument";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { MotionConfig } from "framer-motion";
import "./index.css";
import App from "./App";
import { ToastProvider } from "./components/ui/Toast";
import { queryClient } from "./config/queryClient";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <App />
        </ToastProvider>
      </QueryClientProvider>
    </MotionConfig>
  </StrictMode>,
);
