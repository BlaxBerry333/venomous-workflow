import type { ILogicDatasetInputNodeFormValue } from "@/modules/api/types/workflow-logic-node-form-value";

const DEFAULT_FORM_VALUE: ILogicDatasetInputNodeFormValue = {
  description: "",
  connection: {
    name: "",
    path: "",
  },
};

export const LOGIC_DATASET_INPUT_NODE = {
  DEFAULT_FORM_VALUE,
} as const;
