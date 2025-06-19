import { memo, type NamedExoticComponent } from "react";

import AdminLogicDetailView from "./view";

const AdminLogicDetailPage: NamedExoticComponent = memo(() => {
  return <AdminLogicDetailView />;
});

AdminLogicDetailPage.displayName = "AdminLogicDetailPage";
export default AdminLogicDetailPage;
