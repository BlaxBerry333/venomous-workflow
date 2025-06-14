import { lazy, memo, Suspense, type NamedExoticComponent } from "react";
import { Flex, Loading, WorkflowWrapper } from "venomous-ui";

const NodeMenu = lazy(() => import("@/features/workflow/components/NodeMenu"));
const WorkflowPlayground = lazy(() => import("@/features/workflow/components/Playground"));

const AdminLogicDetailView: NamedExoticComponent = memo(() => {
  return (
    <WorkflowWrapper>
      <Flex row gap={0.5} sx={{ height: "100%" }}>
        <Suspense fallback={<Loading />}>
          <NodeMenu />
          <WorkflowPlayground />
        </Suspense>
      </Flex>
    </WorkflowWrapper>
  );
});

AdminLogicDetailView.displayName = "AdminLogicDetailView";
export default AdminLogicDetailView;
