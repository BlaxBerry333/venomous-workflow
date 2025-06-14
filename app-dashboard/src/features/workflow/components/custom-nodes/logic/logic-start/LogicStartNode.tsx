import { memo } from "react";
import { WorkflowBaseNode, type WorkflowNodeComponentProps } from "venomous-ui";

import { NodeTitle } from "@/features/workflow/components/custom-nodes/_base";
import { INodeType, type INode } from "@/features/workflow/types";

const LogicStartNode = memo<WorkflowNodeComponentProps<INode>>((props) => {
  return (
    <WorkflowBaseNode {...props} hideTargetHandler>
      <NodeTitle {...props} type={INodeType.LogicStart} />
    </WorkflowBaseNode>
  );
});

LogicStartNode.displayName = "LogicStartNode";
export default LogicStartNode;
