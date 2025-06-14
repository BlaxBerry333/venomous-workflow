import { memo } from "react";
import { Icon, Paper } from "venomous-ui";

import {
  WORKFLOW_CUSTOM_NODE_COLORS,
  WORKFLOW_CUSTOM_NODE_ICONS,
} from "@/features/workflow/constants";
import type { INode } from "@/features/workflow/types";

const NodeIcon = memo<{ nodeType: INode["type"] }>(({ nodeType }) => {
  return (
    <Paper
      sx={{
        width: 35,
        height: 35,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: WORKFLOW_CUSTOM_NODE_COLORS[nodeType!],
        color: "white",
        mr:"8px"
      }}
    >
      <Icon icon={WORKFLOW_CUSTOM_NODE_ICONS[nodeType!]} />
    </Paper>
  );
});

NodeIcon.displayName = "NodeIcon";
export default NodeIcon;
