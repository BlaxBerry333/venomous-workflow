import { lazy, memo, Suspense, type NamedExoticComponent } from "react";
import { Flex, Loading, WorkflowWrapper } from "venomous-ui";

const NodeMenu = lazy(() => import("@/features/workflow/components/NodeMenu"));
const WorkflowPlayground = lazy(() => import("@/features/workflow/components/Playground"));

const AdminWorkflowCreateView: NamedExoticComponent = memo(() => {
  return (
    <WorkflowWrapper>
      <Flex row gap={0.5} sx={{ height: "100%", overflow: "hidden" }}>
        <Suspense fallback={<Loading />}>
          <NodeMenu />
          <WorkflowPlayground nodes={[]} edges={[]} />
        </Suspense>
      </Flex>
    </WorkflowWrapper>
  );
});

AdminWorkflowCreateView.displayName = "AdminWorkflowCreateView";
export default AdminWorkflowCreateView;
