import { memo, type NamedExoticComponent, type PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";

const RouterProvider: NamedExoticComponent<PropsWithChildren> = memo(({ children }) => {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      {children}
    </BrowserRouter>
  );
});

RouterProvider.displayName = "RouterProvider";
export default RouterProvider;
