import type {
  ILogicVariableItem,
  LogicConditionType,
  LogicOperator,
} from "./workflow-logic-common";

type ICommonNodeFormValue = {
  description: string;
};

/**
 * LogicStartNode
 */
export type ILogicStartNodeFormValue = ICommonNodeFormValue & {
  variables: Array<ILogicVariableItem>;
  // autoExcute: boolean;
  // autoExcuteInterval?: "week" | "day" | "hour";
  // autoExcuteIntervalValue?: number; // 1-7 | 1-24 | 1-60
};

/**
 * LogicEndNode
 */
export type ILogicEndNodeFormValue = null;

/**
 * LogicConditionNode
 */
export type ILogicConditionNodeFormValue = ICommonNodeFormValue & {
  conditions: Array<{
    id: string;
    type: LogicConditionType;
    variable?: undefined | string; // variable name
    operator?: LogicOperator;
    value?: string;
  }>;
};

/**
 * LogicDatasetInputNode
 */
export type ILogicDatasetInputNodeFormValue = ICommonNodeFormValue & {
  // input from which connection
  connection: {
    name: string;
    path: string;
  };
};

/**
 * LogicDatasetOutputNode
 */
export type ILogicDatasetOutputNodeFormValue = ICommonNodeFormValue & {
  connection: {
    name: string;
    path: string;
  };
  type: "json" | "csv";
};
