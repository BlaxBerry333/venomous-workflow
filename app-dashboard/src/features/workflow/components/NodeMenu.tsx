import { memo, useCallback, useMemo, type JSX } from "react";
import {
  CollapsedSidebar,
  Flex,
  Menu,
  Text,
  type MenuItemProps,
  type MenuProps,
} from "venomous-ui";

import { NodeIcon } from "@/features/workflow/components/custom-nodes/_base";
import { WORKFLOW_LOGIC_NODE_TYPES } from "@/features/workflow/constants";
import type { INodeType } from "@/features/workflow/types";
import { useTranslation } from "@/modules/languages";
import { useLogicNodeCreate } from "../hooks";

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

  const { onDragToCreateNewNode } = useLogicNodeCreate();

  const renderNodeMenuItem = useCallback(
    (item: MenuItemProps): JSX.Element => {
      const nodeType = item.value as INodeType;
      return (
        <Flex
          row
          key={nodeType}
          draggable
          onDragStart={(event) => onDragToCreateNewNode(event, nodeType)}
          sx={{
            cursor: "move",
            userSelect: "none",
            p: "8px",
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
    [onDragToCreateNewNode],
  );

  return (
    <Flex sx={{ height: `calc(100svh - 80px)` }}>
      <CollapsedSidebar
        width={180}
        collapsedWidth={70}
        headerHeight={50}
        defaultIsCollapsed
        sx={{ height: 1 }}
        renderHeader={() => (
          <>
            <Text bold text="Nodes" ellipsis />
          </>
        )}
        renderContent={() => (
          <Menu
            isVirtualized
            height="100%"
            width="100%"
            items={menuItems}
            renderItem={(item) => renderNodeMenuItem(item)}
          />
        )}
      />
    </Flex>
  );
});

NodeMenu.displayName = "NodeMenu";
export default NodeMenu;
