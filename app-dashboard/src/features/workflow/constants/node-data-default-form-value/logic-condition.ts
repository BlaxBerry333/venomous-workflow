import { LogicConditionType, LogicOperator } from "@/modules/api/types/workflow-logic-common";
import type { ILogicConditionNodeFormValue } from "@/modules/api/types/workflow-logic-node-form-value";

const DEFAULT_FORM_VALUE: ILogicConditionNodeFormValue = {
  description: "",
  conditions: [
    {
      id: crypto.randomUUID(),
      type: LogicConditionType.If,
      variable: undefined,
      operator: undefined,
      value: undefined,
    },
    {
      id: crypto.randomUUID(),
      type: LogicConditionType.Else,
      variable: undefined,
      operator: undefined,
      value: undefined,
    },
  ],
};

const CONDITION_OPERATOR_OPTIONS: Array<{ label: string; value: LogicOperator }> = Object.values(
  LogicOperator,
).map((operator) => ({ label: operator, value: operator }));

export const LOGIC_CONDITION_NODE = {
  DEFAULT_FORM_VALUE,
  CONDITION_OPERATOR_OPTIONS,
} as const;
