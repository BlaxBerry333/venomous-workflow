import { INodeType, type IEdge, type INode } from "@/features/workflow/types";
import {
  LogicConditionType,
  LogicOperator,
  LogicVariableType,
} from "@/modules/api/types/workflow-logic-common";

export const MOCK_NODES: INode[] = [
  {
    id: "1749130906003",
    type: INodeType.Group,
    position: { x: 600, y: 200 },
    measured: { width: 946, height: 894 },
    height: 894,
    width: 946,
    data: { formValue: null },
  },
  {
    id: "1749130908003",
    type: INodeType.LogicStart,
    position: { x: 200, y: 100 },
    measured: { width: 250, height: 80 },
    data: {
      formValue: {
        description: "LogicStart 1 description",
        variables: [
          {
            id: crypto.randomUUID(),
            name: "price",
            type: LogicVariableType.Number,
            defaultValue: "25",
          },
          {
            id: crypto.randomUUID(),
            name: "message",
            type: LogicVariableType.Number,
            defaultValue: "25",
          },
        ],
      },
    },
  },
  {
    id: "1749130908093",
    type: INodeType.LogicEnd,
    position: { x: 200, y: 300 },
    measured: { width: 250, height: 80 },
    data: { formValue: null },
  },
  {
    id: "1749130918003",
    type: INodeType.LogicCondition,
    position: { x: 200, y: 500 },
    measured: { width: 250, height: 80 },
    parentId: "1749130906003",
    data: {
      formValue: {
        description: "LogicCondition 1 description",
        conditions: [
          {
            id: crypto.randomUUID(),
            type: LogicConditionType.If,
            variable: "price",
            operator: LogicOperator.Equal,
            value: "100",
          },
          {
            id: crypto.randomUUID(),
            type: LogicConditionType.Elif,
            variable: "price",
            operator: LogicOperator.MoreThan,
            value: "200",
          },
          {
            id: crypto.randomUUID(),
            type: LogicConditionType.Elif,
            variable: "price",
            operator: LogicOperator.NotEqual,
            value: "300",
          },
          {
            id: crypto.randomUUID(),
            type: LogicConditionType.Else,
            variable: undefined,
            operator: undefined,
            value: undefined,
          },
        ],
      },
    },
  },
  {
    id: "1749130908094",
    type: INodeType.LogicDatasetInput,
    position: { x: 500, y: 500 },
    measured: { width: 250, height: 80 },
    parentId: "1749130906003",
    data: {
      formValue: {
        description: "LogicDatasetInput 1 description",
      },
    },
  },
];

export const MOCK_EDGES: IEdge[] = [
  {
    id: "xy-edge__1749130908003-1749130908094",
    selected: false,
    source: "1749130908003",
    target: "1749130908094",
    type: "DeleteLabel",
  },
];
