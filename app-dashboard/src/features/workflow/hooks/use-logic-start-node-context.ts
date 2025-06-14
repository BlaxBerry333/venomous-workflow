import { useMemo } from "react";
import { useWorkflowInstance } from "venomous-ui";
import { INodeType, type INode } from "../types";
import type { ILogicStartNodeFormValue } from "../types/logic-nodes";

export default function useLogicStartNodeContext() {
  const { getNodes } = useWorkflowInstance();
  const logicStartNode: INode = getNodes().find((node) => node.type === INodeType.LogicStart);
  const formValue = logicStartNode?.data?.formValue as ILogicStartNodeFormValue;

  const variableOptions = useMemo<Array<{ label: string; value: string }>>(() => {
    const variables = formValue?.variables || [];
    return variables.map((variable) => ({
      label: variable.name,
      value: variable.name,
    }));
  }, [formValue?.variables]);

  return {
    logicStartNode: {
      ...logicStartNode,
      data: {
        ...logicStartNode.data,
        formValue,
      },
    },

    variableOptions,
  };
}
