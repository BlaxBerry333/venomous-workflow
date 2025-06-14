import { memo } from "react";
import { Button, Flex, Tooltip, useWorkflowNodeJump } from "venomous-ui";

import type { INode } from "@/features/workflow/types";
import { useTranslation } from "@/modules/languages";
import { NodeTitle } from "../custom-nodes/_base";

const NodePanelHeader = memo<{ node: INode }>(({ node }) => {
  const { t } = useTranslation("workflow");
  const { jumpToSpecificNode } = useWorkflowNodeJump();

  return (
    <Flex
      row
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: 1,
      }}
    >
      <NodeTitle {...node} />

      <Flex row sx={{ justifyContent: "flex-end" }}>
        <Tooltip tooltip={t("actions.jump-to-current-node")}>
          <Button
            icon="solar:target-linear"
            isGhost
            isSquare
            onClick={() => void jumpToSpecificNode(node.id, node.position)}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
});

NodePanelHeader.displayName = "NodePanelHeader";
export default NodePanelHeader;
