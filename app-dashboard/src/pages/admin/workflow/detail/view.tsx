import { lazy, memo, Suspense, type NamedExoticComponent } from "react";
import { Flex, Loading, WorkflowWrapper } from "venomous-ui";

import { MOCK_EDGES, MOCK_NODES } from "@/__mock__/workflow";

const NodeMenu = lazy(() => import("@/features/workflow/components/NodeMenu"));
const WorkflowPlayground = lazy(() => import("@/features/workflow/components/Playground"));

const AdminLogicDetailView: NamedExoticComponent = memo(() => {
  return (
    <WorkflowWrapper>
      <Flex row gap={0.5} sx={{ height: "100%", overflow: "hidden" }}>
        <Suspense fallback={<Loading />}>
          <NodeMenu />
          <WorkflowPlayground nodes={MOCK_NODES} edges={MOCK_EDGES} />
        </Suspense>
      </Flex>
    </WorkflowWrapper>
  );
});

AdminLogicDetailView.displayName = "AdminLogicDetailView";
export default AdminLogicDetailView;
