import { INodeType } from "../types";

/**
 * 自定义 Node Icon Map
 */
export const WORKFLOW_CUSTOM_NODE_ICONS: Record<INodeType, string> = {
  [INodeType.Group]: "material-symbols:stack-group-outline",
  [INodeType.LogicStart]: "entypo:flag",
  [INodeType.LogicEnd]: "entypo:flag",
  [INodeType.LogicCondition]: "tabler:arrows-split-2",
  [INodeType.LogicDatasetInput]: "solar:database-linear",
  [INodeType.LogicDatasetOutput]: "solar:database-linear",
};
