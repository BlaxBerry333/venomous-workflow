import { Navigate, Outlet, useRoutes, type RouteObject } from "react-router-dom";
import { autoImportedRoutes, getRouteLeaf, type IAutoImportedModules } from "./helpers";
import { AdminRouteLayout, AuthRouteLayout, ErrorRouteLayout } from "./layouts";
import ROUTE_PATHS from "./paths";

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
      element: <Navigate replace to={ROUTE_PATHS.AUTH.SIGNIN} />,
    },

    {
      path: "/auth",
      element: (
        <AuthRouteLayout>
          <Outlet />
        </AuthRouteLayout>
      ),
      children: [
        { index: true, element: <Navigate replace to={getRouteLeaf(ROUTE_PATHS.AUTH.SIGNIN)} /> },
        ...AUTH_ROUTES,
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
        {
          index: true,
          element: <Navigate replace to={getRouteLeaf(ROUTE_PATHS.ADMIN.ANALYSIS)} />,
        },
        ...ADMIN_ROUTES,
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
      element: <Navigate replace to={ROUTE_PATHS.ERRORS[404]} />,
    },
  ]);
}
