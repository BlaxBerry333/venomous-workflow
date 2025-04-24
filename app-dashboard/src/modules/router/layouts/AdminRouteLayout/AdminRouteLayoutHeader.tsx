import { memo, type NamedExoticComponent } from "react";
import { AdminFullScreen, AdminHeader, Flex } from "venomous-ui";
import LayoutSettings from "../LayoutSettings";

const AdminRouteLayoutHeader: NamedExoticComponent = memo(() => {
  return (
    <AdminHeader>
      <div />

      {/* Actions */}
      <Flex row>
        <AdminFullScreen />
        <LayoutSettings />
      </Flex>
    </AdminHeader>
  );
});

AdminRouteLayoutHeader.displayName = "AdminRouteLayoutHeader";
export default AdminRouteLayoutHeader;
