import { memo } from "react";
import { WorkflowBaseNode, type WorkflowNodeComponentProps } from "venomous-ui";

import { NodeTitle } from "@/features/workflow/components/custom-nodes/_base";
import { INodeType, type INode } from "@/features/workflow/types";

const LogicDatasetOutputNode = memo<WorkflowNodeComponentProps<INode>>((props) => {
  return (
    <WorkflowBaseNode {...props}>
      <NodeTitle {...props} type={INodeType.LogicDatasetOutput} />
    </WorkflowBaseNode>
  );
});

LogicDatasetOutputNode.displayName = "LogicDatasetOutputNode";
export default LogicDatasetOutputNode;
