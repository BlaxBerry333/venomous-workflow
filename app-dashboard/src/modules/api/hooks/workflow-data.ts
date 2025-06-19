import { useRouteSearch } from "@/modules/router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useMemo } from "react";
import APP_SERVER_API_INSTANCE from "../instances/server-api";
import type { IWorkflowData, IWorkflowDataList } from "../types/workflow-data";
import { useAccountUserId } from "./account-user";

export const WORKFLOW_DATA_API_ENTRYPOINTS = {
  LIST: {
    key: "workflowDataList",
    url: "/:user_id/workflow/data/list/",
  },
  CREATE: {
    key: "workflowDataCreate",
    url: "/:user_id/workflow/data/create/",
  },
  DETAIL: {
    key: "workflowDataDetail",
    url: "/:user_id/workflow/data/:id/",
  },
  UPDATE: {
    key: "workflowDataUpdate",
    url: "/:user_id/workflow/data/:id/",
  },
  DELETE: {
    key: "workflowDataDelete",
    url: "/:user_id/workflow/data/:id/",
  },
} as const;

function __getWorkflowDataUrl(
  entryPoint: (typeof WORKFLOW_DATA_API_ENTRYPOINTS)[keyof typeof WORKFLOW_DATA_API_ENTRYPOINTS],
  userId: string,
  workflowId?: string,
): string {
  let url = entryPoint.url.replace(":user_id", userId);
  if (workflowId) {
    url = url.replace(":id", workflowId);
  }
  return url;
}

export function useWorkflowDataList<T = IWorkflowDataList>() {
  const userId = useAccountUserId();
  const url = useMemo<string>(
    () => __getWorkflowDataUrl(WORKFLOW_DATA_API_ENTRYPOINTS.LIST, userId),
    [userId],
  );
  return useQuery<T, AxiosError>({
    queryKey: [WORKFLOW_DATA_API_ENTRYPOINTS.LIST.key, { userId }],
    queryFn: async () => {
      const { data } = await APP_SERVER_API_INSTANCE.get(url);
      return data;
    },
    enabled: Boolean(userId),
  });
}

export function useWorkflowDataDetail<T = IWorkflowData>() {
  const { workflowId } = useRouteSearch<{ workflowId: string }>();
  const userId = useAccountUserId();
  const url = useMemo<string>(
    () => __getWorkflowDataUrl(WORKFLOW_DATA_API_ENTRYPOINTS.DETAIL, userId, workflowId),
    [userId, workflowId],
  );
  return useQuery<T, AxiosError>({
    queryKey: [WORKFLOW_DATA_API_ENTRYPOINTS.DETAIL.key, { userId, workflowId }],
    queryFn: async () => {
      const { data } = await APP_SERVER_API_INSTANCE.get(url);
      return data;
    },
    enabled: Boolean(userId && workflowId),
  });
}

export function useWorkflowDataCreate<T = IWorkflowData>() {
  const queryClient = useQueryClient();
  const userId = useAccountUserId();
  const url = useMemo<string>(
    () => __getWorkflowDataUrl(WORKFLOW_DATA_API_ENTRYPOINTS.CREATE, userId),
    [userId],
  );
  return useMutation<T, AxiosError, Omit<IWorkflowData, "id" | "user">>({
    mutationKey: [WORKFLOW_DATA_API_ENTRYPOINTS.CREATE.key, { userId }],
    mutationFn: async (formValue: Omit<IWorkflowData, "id" | "user">) => {
      const { data } = await APP_SERVER_API_INSTANCE.post(url, {
        ...formValue,
        user: userId,
      });
      return data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [WORKFLOW_DATA_API_ENTRYPOINTS.LIST.key, { userId }],
      });
    },
  });
}

export function useWorkflowDataUpdate<T = IWorkflowData>() {
  const queryClient = useQueryClient();
  const { workflowId } = useRouteSearch<{ workflowId: string }>();
  const userId = useAccountUserId();
  const url = useMemo<string>(
    () => __getWorkflowDataUrl(WORKFLOW_DATA_API_ENTRYPOINTS.UPDATE, userId, workflowId),
    [userId, workflowId],
  );
  return useMutation<T, AxiosError, Partial<IWorkflowData>>({
    mutationKey: [WORKFLOW_DATA_API_ENTRYPOINTS.UPDATE.key, { userId, workflowId }],
    mutationFn: async (formValue: Partial<IWorkflowData>) => {
      if (!workflowId) {
        throw new Error("Workflow ID is required for update.");
      }
      const { data } = await APP_SERVER_API_INSTANCE.patch(url, formValue);
      return data;
    },
    onSuccess: async (updatedData) => {
      queryClient.setQueryData(
        [WORKFLOW_DATA_API_ENTRYPOINTS.DETAIL.key, { userId, workflowId }],
        updatedData,
      );
      await queryClient.invalidateQueries({
        queryKey: [WORKFLOW_DATA_API_ENTRYPOINTS.LIST.key, { userId }],
      });
    },
  });
}

export function useWorkflowDataDelete<T = IWorkflowData>() {
  const queryClient = useQueryClient();
  const userId = useAccountUserId();
  return useMutation<T, AxiosError, IWorkflowData["id"]>({
    mutationKey: [WORKFLOW_DATA_API_ENTRYPOINTS.DELETE.key, { userId }],
    mutationFn: async (id: IWorkflowData["id"]) => {
      const url = __getWorkflowDataUrl(WORKFLOW_DATA_API_ENTRYPOINTS.DELETE, userId, id);
      const { data } = await APP_SERVER_API_INSTANCE.delete(url);
      return data;
    },
    onSuccess: async (_, deletedWorkflowId) => {
      await queryClient.invalidateQueries({
        queryKey: [WORKFLOW_DATA_API_ENTRYPOINTS.LIST.key, { userId }],
      });
      await queryClient.invalidateQueries({
        queryKey: [
          WORKFLOW_DATA_API_ENTRYPOINTS.DETAIL.key,
          { userId, workflowId: deletedWorkflowId },
        ],
      });
      queryClient.removeQueries({
        queryKey: [
          WORKFLOW_DATA_API_ENTRYPOINTS.DETAIL.key,
          { userId, workflowId: deletedWorkflowId },
        ],
      });
    },
  });
}
