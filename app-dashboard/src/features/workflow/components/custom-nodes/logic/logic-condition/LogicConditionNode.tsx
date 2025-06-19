import { memo } from "react";
import {
  Flex,
  Text,
  WorkflowBaseNode,
  WorkflowBaseNodeHandlerItem,
  type WorkflowNodeComponentProps,
} from "venomous-ui";

import { NodeTitle } from "@/features/workflow/components/custom-nodes/_base";
import { INodeType, type INode } from "@/features/workflow/types";
import { LogicConditionType } from "@/modules/api/types/workflow-logic-common";
import type { ILogicConditionNodeFormValue } from "@/modules/api/types/workflow-logic-node-form-value";

const LogicConditionNode = memo<WorkflowNodeComponentProps<INode>>((props) => {
  const { conditions } = props.data.formValue as ILogicConditionNodeFormValue;

  return (
    <WorkflowBaseNode {...props} hideSourceHandler>
      <NodeTitle {...props} type={INodeType.LogicCondition} />

      <div style={{ marginTop: 8 }}>
        {conditions?.map((condition, index) => {
          const isELSE: boolean = condition.type === LogicConditionType.Else;
          return (
            <WorkflowBaseNodeHandlerItem
              key={condition.id}
              id={condition.id}
              handlerType="source"
              handlerPosition="right"
              style={{ transform: "translateX(-17px)", padding: "6px 16px" }}
              handlerStyle={{ transform: "translate(-11px, -6px)" }}
            >
              <Flex row justifyContent="space-between">
                <Text
                  text={`No.${index + 1}`}
                  textColor="disabled"
                  bold
                  isLabel
                  sx={{ visibility: !isELSE ? "visible" : "hidden" }}
                />
                <Text text={condition.type} bold isLabel textColor="primary" />
              </Flex>

              {!isELSE && (
                <Flex
                  row
                  sx={{
                    backgroundColor: ({ palette }) => palette.action.selected,
                    borderRadius: 2,
                    px: 1,
                    py: 0.5,
                    height: "30px",
                  }}
                >
                  <Text text={condition.variable || ""} bold isLabel />
                  <Text text={condition.operator || ""} bold isLabel textColor="primary" />
                  <Text text={condition.value || ""} bold isLabel />
                </Flex>
              )}
            </WorkflowBaseNodeHandlerItem>
          );
        })}
      </div>
    </WorkflowBaseNode>
  );
});

LogicConditionNode.displayName = "LogicConditionNode";
export default LogicConditionNode;
