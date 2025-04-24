import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "venomous-ui";
import { RouterProvider, RouteView } from "./modules/router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider>
        <RouteView />
      </RouterProvider>
    </ThemeProvider>
  </StrictMode>,
);
