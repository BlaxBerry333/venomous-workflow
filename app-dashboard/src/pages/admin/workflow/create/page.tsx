import { memo, type NamedExoticComponent } from "react";
import AdminWorkflowCreateView from "./view";

const AdminWorkflowCreatePage: NamedExoticComponent = memo(() => {
  return <AdminWorkflowCreateView />;
});

AdminWorkflowCreatePage.displayName = "AdminWorkflowCreatePage";
export default AdminWorkflowCreatePage;
