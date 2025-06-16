import { useCallback } from "react";
import { generateNewNodeToStore, useWorkflowInstance } from "venomous-ui";

import { WORKFLOW_UNIQUE_NODE_TYPES } from "../constants";
import { getNodeDataDefaultFormValue } from "../helpers";
import type { INodeType } from "../types";

export default function useLogicNodeCreate() {
  const { getNodes } = useWorkflowInstance();

  const onDragToCreateNewNode = useCallback(
    (event: React.DragEvent<HTMLDivElement>, nodeType: INodeType) => {
      event.dataTransfer.effectAllowed = "move";

      // 判断目标 Node 是否为仅能创建一个，已经存在时不添加
      const existUniqueNodes = getNodes().filter((n) =>
        WORKFLOW_UNIQUE_NODE_TYPES.includes(n.type),
      );
      const isAlreadyExist = existUniqueNodes.find((n) => n.type === nodeType);
      if (isAlreadyExist) {
        return;
      }

      // 获取默认 Node.data.formValue
      const defaultFormValues = getNodeDataDefaultFormValue(nodeType);
      generateNewNodeToStore({
        type: nodeType,
        data: {
          formValue: defaultFormValues,
          isInValid: defaultFormValues !== null,
        },
      });
    },
    [],
  );

  return { onDragToCreateNewNode };
}
