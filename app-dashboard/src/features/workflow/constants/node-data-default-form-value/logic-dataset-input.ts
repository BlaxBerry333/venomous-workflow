import type { ILogicDatasetInputNodeFormValue } from "@/features/workflow/types/logic-nodes";

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
