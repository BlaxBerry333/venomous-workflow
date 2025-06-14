import { memo } from "react";
import { WorkflowBaseNode, type WorkflowNodeComponentProps } from "venomous-ui";

import { NodeTitle } from "@/features/workflow/components/custom-nodes/_base";
import { INodeType, type INode } from "@/features/workflow/types";

const LogicEndNode = memo<WorkflowNodeComponentProps<INode>>((props) => {
  return (
    <WorkflowBaseNode {...props} hideSourceHandler>
      <NodeTitle {...props} type={INodeType.LogicEnd} />
    </WorkflowBaseNode>
  );
});

LogicEndNode.displayName = "LogicEndNode";
export default LogicEndNode;
