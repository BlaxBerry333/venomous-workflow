import { memo, useCallback, useMemo } from "react";

import type { AxiosError } from "axios";
import { isEqual } from "lodash-es";
import {
  Button,
  Modal,
  useModal,
  useToast,
  useWorkflowElementsProtect,
  useWorkflowInstance,
} from "venomous-ui";

import {
  useWorkflowDataCreate,
  useWorkflowDataDetail,
  useWorkflowDataUpdate,
} from "@/modules/api/hooks/workflow-data";
import { useTranslation } from "@/modules/languages";
import { useRouteNavigate, useRouteSearch } from "@/modules/router";
import ROUTE_PATHS from "@/modules/router/paths";
import SaveButtonForm, { type SaveButtonFormValue } from "./_SaveButtonForm";

const SaveButton = memo(() => {
  const { t: tCommon } = useTranslation("common");

  const updateModalHandler = useModal();

  const { handleSubmit, isSubmitting } = useSaveButton();

  return (
    <>
      <Button
        text={tCommon("actions.update")}
        disabled={updateModalHandler.isOpen}
        onClick={updateModalHandler.openModal}
      />
      <Modal
        isOpen={updateModalHandler.isOpen}
        closeModal={updateModalHandler.closeModal}
        isPrevented
      >
        <div style={{ padding: "16px 8px" }}>
          <SaveButtonForm
            isSubmitting={isSubmitting}
            handleOnCancel={updateModalHandler.closeModal}
            handleOnSubmit={async (formValue) => {
              await handleSubmit(formValue);
              updateModalHandler.closeModal();
            }}
          />
        </div>
      </Modal>
    </>
  );
});

SaveButton.displayName = "SaveButton";
export default SaveButton;

function useSaveButton() {
  const toast = useToast();
  const router = useRouteNavigate();
  const { t: tWorkflow } = useTranslation("workflow");

  const { workflowId } = useRouteSearch<{ workflowId: string }>();
  const { getNodes, getEdges } = useWorkflowInstance();
  const { lockElements, unlockElements } = useWorkflowElementsProtect();

  const { data: workflowData } = useWorkflowDataDetail();
  const { mutateAsync: createWorkflowData, isPending: isCreating } = useWorkflowDataCreate();
  const { mutateAsync: updateWorkflowData, isPending: isUpdating } = useWorkflowDataUpdate();

  const isSubmitting = useMemo<boolean>(() => isCreating || isUpdating, [isCreating, isUpdating]);

  const handleSubmit = useCallback(
    async (formValue: SaveButtonFormValue) => {
      const element = {
        nodes: getNodes(),
        edges: getEdges(),
      };

      lockElements();

      if (element.nodes.length === 0) {
        toast({
          type: "error",
          title: tWorkflow(`api-message.${workflowId ? "update" : "create"}-failed`),
          description: tWorkflow("api-message.nodes-canot-be-empty"),
        });
        unlockElements();
        return;
      }

      if (workflowId) {
        const currentData = {
          id: workflowData?.id,
          name: workflowData?.name,
          description: workflowData?.description,
          isActive: workflowData?.isActive,
          element: workflowData?.element,
        };
        const newData = {
          id: workflowId,
          name: formValue.name,
          description: formValue.description,
          isActive: formValue.isActive,
          element: JSON.stringify(element),
        };
        if (isEqual(currentData, newData)) {
          toast({
            type: "error",
            title: tWorkflow("api-message.update-failed"),
            description: tWorkflow("api-message.nothing-changed"),
          });
          unlockElements();
          return;
        }

        await updateWorkflowData(newData)
          .then(() => {
            toast({
              type: "success",
              title: tWorkflow("api-message.update-success"),
              description: tWorkflow("api-message.update-success"),
            });
          })
          .catch((err: AxiosError) => {
            let message: string = "";
            if (!err.response?.data) {
              message = err.message;
            } else {
              message = Object.entries(err.response?.data).map(([field, messages]) => ({
                field,
                message: messages?.[0] ?? "",
              }))?.[0]?.message;
            }
            toast({
              type: "error",
              title: tWorkflow("api-message.update-failed"),
              description: tWorkflow(message),
            });
          })
          .finally(() => {
            unlockElements();
          });

        return;
      }

      await createWorkflowData({
        name: formValue.name,
        description: formValue.description,
        isActive: formValue.isActive,
        element: JSON.stringify(element),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
        .then(() => {
          toast({
            type: "success",
            title: tWorkflow("api-message.create-success"),
            description: tWorkflow("api-message.create-success"),
          });
        })
        .catch((err: AxiosError) => {
          let message: string = "";
          if (!err.response?.data) {
            message = err.message;
          } else {
            message = Object.entries(err.response?.data).map(([field, messages]) => ({
              field,
              message: messages?.[0] ?? "",
            }))?.[0]?.message;
          }
          toast({
            type: "error",
            title: tWorkflow("api-message.create-failed"),
            description: tWorkflow(message),
          });
        })
        .finally(() => {
          unlockElements();
        });
      router.replace(ROUTE_PATHS.ADMIN.WORKFLOW_LIST);
    },
    [
      workflowId,
      getNodes,
      getEdges,
      lockElements,
      unlockElements,
      unlockElements,
      tWorkflow,
      router,
      workflowData,
    ],
  );

  return {
    handleSubmit,
    isSubmitting,
  };
}
