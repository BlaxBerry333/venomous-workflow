import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider, Toast } from "venomous-ui";
import { QueryClientProvider } from "./modules/api";
import { RouterProvider, RouteView } from "./modules/router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <Toast position="bottom-right" />
      <QueryClientProvider>
        <RouterProvider>
          <RouteView />
        </RouterProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);
