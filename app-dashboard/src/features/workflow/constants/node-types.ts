import { INodeType } from "../types";

/**
 * 唯一节点类型
 */
export const WORKFLOW_UNIQUE_NODE_TYPES: INodeType[] = [INodeType.LogicStart, INodeType.LogicEnd];

/**
 * 逻辑节点类型
 */
export const WORKFLOW_LOGIC_NODE_TYPES: INodeType[] = [
  INodeType.Group,
  INodeType.LogicStart,
  INodeType.LogicEnd,
  INodeType.LogicCondition,
  INodeType.LogicDatasetInput,
  INodeType.LogicDatasetOutput,
];
