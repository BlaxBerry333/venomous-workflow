import { isEqual } from "lodash-es";
import { useCallback, useMemo } from "react";
import { useWorkflowNodeUpdate, useWorkflowSelectedElements } from "venomous-ui";

import type { INode } from "../types";

export default function useNodePanelSelected<T extends INode["data"]["formValue"]>() {
  const selectedElements = useWorkflowSelectedElements();
  const selectedNode = useMemo<INode | null>(() => {
    if (selectedElements.nodes.length === 1) return selectedElements.nodes[0];
    return null;
  }, [selectedElements.nodes]);

  const nodeId = selectedNode?.id;
  const nodeFormValue = selectedNode?.data.formValue;

  const { updateSpecificNodeFormValue, updateSpecificNodeData } = useWorkflowNodeUpdate();

  const updateSelectedNodeData = useCallback(
    (nodeData: INode["data"]) => {
      if (!nodeId) return;
      updateSpecificNodeData(nodeId, nodeData);
    },
    [nodeId],
  );

  const updateSelectedNodeFormValue = useCallback(
    (formValue: T) => {
      if (!nodeId) return;
      if (isEqual(nodeFormValue, formValue)) return;
      updateSpecificNodeFormValue(nodeId, formValue);
    },
    [nodeId, nodeFormValue, updateSpecificNodeFormValue],
  );

  return {
    selectedNode: {
      ...selectedNode,
      data: {
        ...selectedNode?.data,
        formValue: nodeFormValue as T,
      },
    },
    updateSelectedNodeData,
    updateSelectedNodeFormValue,
  };
}
