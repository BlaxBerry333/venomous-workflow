import { memo, type NamedExoticComponent } from "react";

import { LogicConditionNodeForm, LogicStartNodeForm } from "../components/custom-nodes";
import { INodeType, type INode } from "../types";

/**
 * 自定义 Node Panel Form
 */
export const WORKFLOW_CUSTOM_NODE_PANEL_FORMS: Record<INodeType, NamedExoticComponent<INode>> = {
  [INodeType.Group]: memo(() => null),
  [INodeType.LogicStart]: LogicStartNodeForm,
  [INodeType.LogicEnd]: memo(() => null),
  [INodeType.LogicCondition]: LogicConditionNodeForm,
  [INodeType.LogicDatasetInput]: memo(() => null),
  [INodeType.LogicDatasetOutput]: memo(() => null),
};
