import { memo, type NamedExoticComponent } from "react";
import { Button } from "venomous-ui";

import { useRouteNavigate } from "@/modules/router";
import ROUTE_PATHS from "@/modules/router/paths";

const AdminLogicListPage: NamedExoticComponent = memo(() => {
  const router = useRouteNavigate();

  return (
    <div>
      AdminLogicListPage
      <Button
        text="Detail Page"
        onClick={() => router.push(ROUTE_PATHS.ADMIN.WORKFLOW_DETAIL + "?workflowId=1234567890")}
      />
    </div>
  );
});

AdminLogicListPage.displayName = "AdminLogicListPage";
export default AdminLogicListPage;
