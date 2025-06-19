import { memo, type NamedExoticComponent } from "react";

import AdminLogicListView from "./view";

const AdminLogicListPage: NamedExoticComponent = memo(() => {
  return <AdminLogicListView />;
});

AdminLogicListPage.displayName = "AdminLogicListPage";
export default AdminLogicListPage;
