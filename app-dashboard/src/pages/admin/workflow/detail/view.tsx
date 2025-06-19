import { lazy, memo, Suspense, useMemo, type NamedExoticComponent } from "react";
import { Flex, Loading, WorkflowWrapper } from "venomous-ui";

import { WORKFLOW_DEFALUT_ELEMENT } from "@/features/workflow/constants";
import { useWorkflowDataDetail } from "@/modules/api/hooks/workflow-data";

const NodeMenu = lazy(() => import("@/features/workflow/components/NodeMenu"));
const WorkflowPlayground = lazy(() => import("@/features/workflow/components/Playground"));

const AdminLogicDetailView: NamedExoticComponent = memo(() => {
  const { data: workflowData, isLoading } = useWorkflowDataDetail();
  const element = useMemo(() => {
    const elementData = workflowData?.element || WORKFLOW_DEFALUT_ELEMENT;
    return typeof elementData === "string" ? JSON.parse(elementData) : elementData;
  }, [workflowData?.element]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <WorkflowWrapper>
      <Flex row gap={0.5} sx={{ height: "100%", overflow: "hidden" }}>
        <Suspense fallback={<Loading />}>
          <NodeMenu />
          <WorkflowPlayground nodes={element.nodes} edges={element.edges} />
        </Suspense>
      </Flex>
    </WorkflowWrapper>
  );
});

AdminLogicDetailView.displayName = "AdminLogicDetailView";
export default AdminLogicDetailView;
