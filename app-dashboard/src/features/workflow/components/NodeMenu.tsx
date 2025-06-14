import { memo, useCallback, useMemo, type JSX } from "react";
import {
  Flex,
  generateNewNodeToStore,
  Menu,
  Paper,
  Text,
  type MenuItemProps,
  type MenuProps,
} from "venomous-ui";

import { NodeIcon } from "@/features/workflow/components/custom-nodes/_base";
import { WORKFLOW_LOGIC_NODE_TYPES } from "@/features/workflow/constants";
import { getNodeDataDefaultFormValue } from "@/features/workflow/helpers";
import type { INodeType } from "@/features/workflow/types";
import { useTranslation } from "@/modules/languages";

const NodeMenu = memo(() => {
  const { t } = useTranslation("workflow");
  const menuItems = useMemo<MenuProps["items"]>(
    () =>
      WORKFLOW_LOGIC_NODE_TYPES.map((nodeType) => ({
        value: nodeType as string,
        label: t(`node-type.${nodeType}`),
      })),
    [t],
  );

  const onDragToGenerateNewNode = useCallback(
    (event: React.DragEvent<HTMLDivElement>, nodeType: INodeType) => {
      event.dataTransfer.effectAllowed = "move";
      generateNewNodeToStore({
        type: nodeType,
        data: {
          formValue: getNodeDataDefaultFormValue(nodeType),
          // isInValid:true
        },
      });
    },
    [],
  );

  const renderNodeMenuItem = useCallback(
    (item: MenuItemProps): JSX.Element => {
      const nodeType = item.value as INodeType;
      return (
        <Flex
          row
          key={nodeType}
          draggable
          onDragStart={(event) => onDragToGenerateNewNode(event, nodeType)}
          sx={{
            cursor: "move",
            userSelect: "none",
            p: "8px",
            m: "8px",
            "&:last-child": { mb: 0 },
            "&:hover": {
              borderRadius: "8px",
              backgroundColor: ({ palette }) => palette.action.hover,
            },
          }}
        >
          <NodeIcon nodeType={nodeType} />
          <Text text={item.label} bold isLabel ellipsis />
        </Flex>
      );
    },
    [onDragToGenerateNewNode],
  );

  return (
    <Paper isOutlined sx={{ height: 1, width: 160, minWidth: 160, p: 0 }}>
      <Menu
        isVirtualized
        height="100%"
        width="100%"
        items={menuItems}
        renderItem={(item) => renderNodeMenuItem(item)}
      />
    </Paper>
  );
});

NodeMenu.displayName = "NodeMenu";
export default NodeMenu;
