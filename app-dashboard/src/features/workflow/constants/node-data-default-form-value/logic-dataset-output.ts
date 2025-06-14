import type { ILogicDatasetOutputNodeFormValue } from "@/features/workflow/types/logic-nodes";

const DEFAULT_FORM_VALUE: ILogicDatasetOutputNodeFormValue = {
  description: "",
  connection: {
    name: "",
    path: "",
  },
  type: "csv",
};

export const LOGIC_DATASET_OUTPUT_NODE = {
  DEFAULT_FORM_VALUE,
} as const;
