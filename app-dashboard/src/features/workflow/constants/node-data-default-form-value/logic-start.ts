import {
  LogicVariableType,
  type ILogicStartNodeFormValue,
} from "@/features/workflow/types/logic-nodes";

const DEFAULT_FORM_VALUE: ILogicStartNodeFormValue = {
  description: "",
  variables: [],
  // autoExcute: false,
  // autoExcuteInterval: undefined,
  // autoExcuteIntervalValue: undefined,
};

const VARIABLE_TYPE_OPTIONS: Array<{ label: string; value: LogicVariableType }> = Object.values(
  LogicVariableType,
).map((type) => ({
  label: type,
  value: type,
}));

export const LOGIC_START_NODE = {
  DEFAULT_FORM_VALUE,
  VARIABLE_TYPE_OPTIONS,
} as const;
