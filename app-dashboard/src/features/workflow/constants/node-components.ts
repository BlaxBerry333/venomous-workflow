import { WorkflowGroupNode, type WorkflowNodeComponent } from "venomous-ui";

import { INodeType, type INode } from "@/features/workflow/types";
import {
  LogicConditionNode,
  LogicDatasetInputNode,
  LogicDatasetOutputNode,
  LogicEndNode,
  LogicStartNode,
} from "../components/custom-nodes";

export const WORKFLOW_CUSTOM_NODE_COMPONENTS: WorkflowNodeComponent<INode> = {
  [INodeType.Group]: WorkflowGroupNode,
  [INodeType.LogicStart]: LogicStartNode,
  [INodeType.LogicEnd]: LogicEndNode,
  [INodeType.LogicCondition]: LogicConditionNode,
  [INodeType.LogicDatasetInput]: LogicDatasetInputNode,
  [INodeType.LogicDatasetOutput]: LogicDatasetOutputNode,
};
