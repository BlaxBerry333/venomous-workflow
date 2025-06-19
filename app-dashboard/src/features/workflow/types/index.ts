import { WorkflowNodeTypeDefault, type WorkflowEdge, type WorkflowNode } from "venomous-ui";

import type {
  ILogicConditionNodeFormValue,
  ILogicDatasetInputNodeFormValue,
  ILogicDatasetOutputNodeFormValue,
  ILogicEndNodeFormValue,
  ILogicStartNodeFormValue,
} from "@/modules/api/types/workflow-logic-node-form-value";

export enum INodeType {
  Group = WorkflowNodeTypeDefault.Group,
  LogicStart = "LogicStart",
  LogicEnd = "LogicEnd",
  LogicCondition = "LogicCondition",
  LogicDatasetInput = "LogicDatasetInput",
  LogicDatasetOutput = "LogicDatasetOutput",
}

export type INode = WorkflowNode<
  INodeType,
  | Record<string, unknown>
  | ILogicStartNodeFormValue
  | ILogicEndNodeFormValue
  | ILogicConditionNodeFormValue
  | ILogicDatasetInputNodeFormValue
  | ILogicDatasetOutputNodeFormValue
>;

export type IEdge = WorkflowEdge;
