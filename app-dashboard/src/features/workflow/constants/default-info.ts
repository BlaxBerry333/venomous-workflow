import type { IElement } from "@/features/workflow/types";
import type { IWorkflowDataInfo } from "@/modules/api/types/workflow-data";

export const WORKFLOW_DEFALUT_ELEMENT: IElement = {
  nodes: [],
  edges: [],
};

export const WORKFLOW_DATA_DEFAULT_INFO: IWorkflowDataInfo = {
  id: "",
  user: "",
  name: "",
  description: "",
  isActive: false,
  createdAt: "",
  updatedAt: "",
};
