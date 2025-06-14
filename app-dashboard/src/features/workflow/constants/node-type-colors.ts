import { INodeType } from "../types";

/**
 * 自定义 Node 颜色 Map
 */
export const WORKFLOW_CUSTOM_NODE_COLORS: Record<INodeType, string> = {
  [INodeType.Group]: "#979797",
  [INodeType.LogicStart]: "#4caf50",
  [INodeType.LogicEnd]: "#ff9100",
  [INodeType.LogicCondition]: "#3f50b5",
  [INodeType.LogicDatasetInput]: "#3f50b5",
  [INodeType.LogicDatasetOutput]: "#3f50b5",
};
