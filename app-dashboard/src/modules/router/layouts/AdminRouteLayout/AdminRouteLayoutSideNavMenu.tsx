import { memo, useMemo, type NamedExoticComponent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AdminSideNavMenu, type AdminSideNavMenuProps } from "venomous-ui";

import { useTranslation } from "@/modules/languages";
import ROUTE_PATHS from "@/modules/router/paths";
import LayoutHeaderLogo from "../LayoutHeaderLogo";

const AdminRouteLayoutSideNavMenu: NamedExoticComponent = memo(() => {
  const { pathname } = useLocation();
  const { menuItems } = useAdminRouteLayoutSideNavMenu();

  return (
    <AdminSideNavMenu
      renderHeader={() => <LayoutHeaderLogo to={ROUTE_PATHS.ADMIN.ROOT} />}
      menuItems={menuItems}
      currentPath={pathname}
      collapseButtonSx={{ zIndex: 1000 }}
      sx={{
        height: "calc(100svh - 8px)",
        "& #VenomousUI-Menu": { height: "calc(100svh - 50px - 18px)" },
      }}
    />
  );
});

AdminRouteLayoutSideNavMenu.displayName = "AdminRouteLayoutSideNavMenu";
export default AdminRouteLayoutSideNavMenu;

function useAdminRouteLayoutSideNavMenu() {
  const { t: tAdmin } = useTranslation("admin");

  const navigate = useNavigate();

  const menuItems = useMemo<AdminSideNavMenuProps["menuItems"]>(
    () => [
      {
        label: tAdmin("nav.analysis"),
        icon: "hugeicons:pie-chart-02",
        url: ROUTE_PATHS.ADMIN.ANALYSIS,
        onClick: () => navigate(ROUTE_PATHS.ADMIN.ANALYSIS),
      },
      {
        label: tAdmin("nav.workflow"),
        icon: "hugeicons:flow",
        subItems: [
          {
            label: tAdmin("nav.common.list"),
            icon: "hugeicons:dashboard-square-01",
            url: ROUTE_PATHS.ADMIN.WORKFLOW_LIST,
            onClick: () => navigate(ROUTE_PATHS.ADMIN.WORKFLOW_LIST),
          },
          {
            label: tAdmin("nav.common.create"),
            icon: "hugeicons:dashboard-square-add",
            url: ROUTE_PATHS.ADMIN.WORKFLOW_CREATE,
            onClick: () => navigate(ROUTE_PATHS.ADMIN.WORKFLOW_CREATE),
          },
        ],
      },
      {
        label: tAdmin("nav.connection"),
        icon: "hugeicons:connect",
        subItems: [
          {
            label: tAdmin("nav.connection-storage"),
            icon: "hugeicons:file-01",
            url: ROUTE_PATHS.ADMIN.CONNECTION_STORAGE,
            onClick: () => navigate(ROUTE_PATHS.ADMIN.CONNECTION_STORAGE),
          },
        ],
      },
    ],
    [navigate, tAdmin],
  );

  return {
    menuItems,
  };
}
