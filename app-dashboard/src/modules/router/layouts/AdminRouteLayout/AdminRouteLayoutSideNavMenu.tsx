import { memo, useMemo, type NamedExoticComponent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AdminSideNavMenu, type AdminSideNavMenuProps } from "venomous-ui";
import LayoutHeaderLogo from "../LayoutHeaderLogo";

const AdminRouteLayoutSideNavMenu: NamedExoticComponent = memo(() => {
  const { pathname } = useLocation();
  const { menuItems } = useAdminRouteLayoutSideNavMenu({ pathname });

  return (
    <AdminSideNavMenu
      renderHeader={() => <LayoutHeaderLogo to="/admin/" />}
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

function useAdminRouteLayoutSideNavMenu({ pathname }: { pathname: string }) {
  const navigate = useNavigate();

  const menuItems = useMemo<AdminSideNavMenuProps["menuItems"]>(
    () => [
      {
        label: "Analysis",
        icon: "hugeicons:pie-chart-02",
        url: "/admin/analysis",
        onClick: () => navigate("/admin/analysis"),
      },
      {
        label: "草稿画布",
        icon: "hugeicons:node-edit",
        subItems: [
          {
            label: "所有",
            icon: "hugeicons:dashboard-square-01",
            url: "/admin/draft-flow/list",
            onClick: () => navigate("/admin/draft-flow/list"),
          },
          {
            label: "新建",
            icon: "hugeicons:dashboard-square-add",
            url: "/admin/draft-flow/create",
            onClick: () => navigate("/admin/draft-flow/create"),
          },
        ],
      },
      {
        label: "逻辑流程",
        icon: "hugeicons:hierarchy-square-01",
        subItems: [
          {
            label: "所有",
            icon: "hugeicons:dashboard-square-01",
            url: "/admin/logic-flow/list",
            onClick: () => navigate("/admin/logic-flow/list"),
          },
          {
            label: "新建",
            icon: "hugeicons:dashboard-square-add",
            url: "/admin/logic-flow/create",
            onClick: () => navigate("/admin/logic-flow/create"),
          },
        ],
      },
      {
        label: "演示文稿",
        icon: "hugeicons:ice-cubes",
        subItems: [
          {
            label: "所有",
            icon: "hugeicons:dashboard-square-01",
            url: "/admin/ppt-flow/list",
            onClick: () => navigate("/admin/ppt-flow/list"),
          },
          {
            label: "新建",
            icon: "hugeicons:dashboard-square-add",
            url: "/admin/ppt-flow/create",
            onClick: () => navigate("/admin/ppt-flow/create"),
          },
        ],
      },
    ],
    [navigate, pathname],
  );

  return {
    menuItems,
  };
}
