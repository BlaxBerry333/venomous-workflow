// ====================================================================================================
// ====================================================================================================

/**
 * 逻辑运算符 ( Python )
 */
export enum LogicOperator {
  And = "and",
  Or = "or",
  MoreThan = ">",
  LessThan = "<",
  Equal = "is",
  NotEqual = "is not",
  In = "in",
  NotIn = "not in",
}

/**
 * 逻辑条件类型 ( Python )
 */
export enum LogicConditionType {
  If = "if",
  Elif = "elif",
  Else = "else",
}

// ====================================================================================================
// ====================================================================================================

/**
 * 逻辑变量类型 ( Python )
 */
export enum LogicVariableType {
  String = "str",
  Number = "int", // 强制为整数
  Boolean = "bool",
  // Object = "dict", // TODO:
  // Array = "list",  // TODO:
}

/**
 * 逻辑变量 OptionItem
 */
export type ILogicVariableItem = {
  id: string;
  name: string;
  type: LogicVariableType;
  defaultValue: string;
};
