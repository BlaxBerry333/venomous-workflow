import { memo } from "react";
import { Flex, WorkflowNodeDataFormValuePanel } from "venomous-ui";

import type { INode } from "@/features/workflow/types";
import NodePanelForm from "./NodePanelForm";
import NodePanelHeader from "./NodePanelHeader";

const NodePanel = memo(() => {
  return (
    <WorkflowNodeDataFormValuePanel
      style={{ height: "calc(100% - 80px)", width: 450 }}
      renderContent={(node: INode) => (
        <Flex
          sx={{
            p: "8px",
            overflow: "auto",
            height: "100%",
            "& form": { width: 1, pb: "40px" },
          }}
        >
          {/* Header */}
          <NodePanelHeader node={node} />
          {/* NodeDataForm */}
          {node.type && <NodePanelForm {...node} />}
        </Flex>
      )}
    />
  );
});

NodePanel.displayName = "NodePanel";
export default NodePanel;
