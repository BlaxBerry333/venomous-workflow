import { lazy, memo, Suspense, type NamedExoticComponent } from "react";
import { AdminFullScreen, AdminHeader, Flex } from "venomous-ui";
import LayoutSettings from "../LayoutSettings";

const AdminRouteLayoutHeaderAccount = lazy(() => import("./AdminRouteLayoutHeaderAccount"));

const AdminRouteLayoutHeader: NamedExoticComponent = memo(() => {
  return (
    <AdminHeader>
      <div />

      {/* Actions */}
      <Flex row>
        <Suspense fallback={null}>
          <AdminRouteLayoutHeaderAccount />
        </Suspense>
        <AdminFullScreen />
        <LayoutSettings />
      </Flex>
    </AdminHeader>
  );
});

AdminRouteLayoutHeader.displayName = "AdminRouteLayoutHeader";
export default AdminRouteLayoutHeader;
