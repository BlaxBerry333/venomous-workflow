import {
  LOGIC_CONDITION_NODE,
  LOGIC_DATASET_INPUT_NODE,
  LOGIC_DATASET_OUTPUT_NODE,
  LOGIC_END_NODE,
  LOGIC_START_NODE,
} from "../constants/node-data-default-form-value";
import { INodeType } from "../types";

export default function getNodeDataDefaultFormValue(nodeType: INodeType) {
  switch (nodeType) {
    case INodeType.LogicStart:
      return LOGIC_START_NODE.DEFAULT_FORM_VALUE;

    case INodeType.LogicEnd:
      return LOGIC_END_NODE.DEFAULT_FORM_VALUE;

    case INodeType.LogicCondition:
      return LOGIC_CONDITION_NODE.DEFAULT_FORM_VALUE;

    case INodeType.LogicDatasetInput:
      return LOGIC_DATASET_INPUT_NODE.DEFAULT_FORM_VALUE;

    case INodeType.LogicDatasetOutput:
      return LOGIC_DATASET_OUTPUT_NODE.DEFAULT_FORM_VALUE;

    default:
      return null;
  }
}
