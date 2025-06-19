export type IWorkflowDataList = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<Omit<IWorkflowData, "element">>;
};

export type IWorkflowData = {
  id: string; // UUID
  user: string; // createdBy UUID
  name: string;
  description: string;
  element: string;
  isActive: boolean;
  createdAt: string; // ISO 日期字符串
  updatedAt: string; // ISO 日期字符串
};

export type IWorkflowDataInfo = Omit<IWorkflowData, "element">;
