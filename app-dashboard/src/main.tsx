import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider, Toast } from "venomous-ui";
import { QueryClientProvider } from "./modules/api";
import { LanguageProvider } from "./modules/languages";
import { RouterProvider, RouteView } from "./modules/router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider>
      <LanguageProvider>
        <ThemeProvider>
          <Toast position="bottom-right" />
          <RouterProvider>
            <RouteView />
          </RouterProvider>
        </ThemeProvider>
      </LanguageProvider>
    </QueryClientProvider>
  </StrictMode>,
);
