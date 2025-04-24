import { Navigate, Outlet, useRoutes, type RouteObject } from "react-router-dom";
import { autoImportedRoutes, type IAutoImportedModules } from "./helpers";
import { AdminRouteLayout, AuthRouteLayout, ErrorRouteLayout } from "./layouts";

const AUTH_ROUTES: RouteObject[] = autoImportedRoutes(
  import.meta.glob("@/pages/auth/**/page.tsx", { eager: false }) as IAutoImportedModules,
  { baseDir: "/src/pages" },
);
const ADMIN_ROUTES: RouteObject[] = autoImportedRoutes(
  import.meta.glob("@/pages/admin/**/page.tsx", { eager: false }) as IAutoImportedModules,
  { baseDir: "/src/pages" },
);
const ERRORS_ROUTES: RouteObject[] = autoImportedRoutes(
  import.meta.glob("@/pages/errors/**/page.tsx", { eager: false }) as IAutoImportedModules,
  { baseDir: "/src/pages" },
);

export default function RouterViews(): React.ReactElement | null {
  return useRoutes([
    {
      path: "/",
      element: <Navigate replace to={"/auth/signin"} />,
    },

    {
      path: "/auth",
      element: (
        <AuthRouteLayout>
          <Outlet />
        </AuthRouteLayout>
      ),
      children: [
        { index: true, element: <Navigate replace to={"signin"} /> },
        ...AUTH_ROUTES,
        { element: <Navigate replace to={"signin"} /> },
      ],
    },

    {
      path: "/admin",
      element: (
        <AdminRouteLayout>
          <Outlet />
        </AdminRouteLayout>
      ),
      children: [
        { index: true, element: <Navigate replace to={"analysis"} /> },
        ...ADMIN_ROUTES,
        { element: <Navigate replace to={"analysis"} /> },
      ],
    },

    {
      path: "/errors",
      element: (
        <ErrorRouteLayout>
          <Outlet />
        </ErrorRouteLayout>
      ),
      children: [...ERRORS_ROUTES],
    },

    {
      path: "*",
      element: <Navigate replace to={"/errors/404"} />,
    },
  ]);
}
