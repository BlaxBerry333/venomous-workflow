import { memo } from "react";
import { WorkflowBaseNode, type WorkflowNodeComponentProps } from "venomous-ui";

import { NodeTitle } from "@/features/workflow/components/custom-nodes/_base";
import { INodeType, type INode } from "@/features/workflow/types";

const LogicDatasetInputNode = memo<WorkflowNodeComponentProps<INode>>((props) => {
  return (
    <WorkflowBaseNode {...props}>
      <NodeTitle {...props} type={INodeType.LogicDatasetInput} />
    </WorkflowBaseNode>
  );
});

LogicDatasetInputNode.displayName = "LogicDatasetInputNode";
export default LogicDatasetInputNode;
