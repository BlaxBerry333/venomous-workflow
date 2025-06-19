import { memo, type NamedExoticComponent } from "react";
import { WorkflowEdgeTypeDefault, WorkflowPlayground } from "venomous-ui";

import { useTranslation } from "@/modules/languages";
import { WORKFLOW_CUSTOM_NODE_COLORS, WORKFLOW_CUSTOM_NODE_COMPONENTS } from "../constants";
import type { IEdge, INode } from "../types";
import { NodePanel } from "./custom-node-panel";
import PlaygroundActions from "./playgroun-actions";

const Playground: NamedExoticComponent<{
  nodes: INode[];
  edges: IEdge[];
}> = memo(({ nodes, edges }) => {
  const { t: tCommon } = useTranslation("common");

  return (
    <WorkflowPlayground
      sx={{ width: "100%", height: "100%", p: 0 }}
      nodeTypes={WORKFLOW_CUSTOM_NODE_COMPONENTS}
      originalElements={{ nodes, edges }}
      configs={{
        styles: {
          nodeWidth: 250,
          nodeMinHeight: 80,
          nodeMaxHeight: "auto",
          nodeColors: WORKFLOW_CUSTOM_NODE_COLORS,
          edgeType: WorkflowEdgeTypeDefault.DeleteLabel,
          connectionPosition: { source: "right", target: "left" },
        },
        minimap: {
          enabled: true,
          position: "bottom-left",
          width: 150,
        },
        undoRedo: {
          enabled: true,
          position: "bottom-left",
          maxHistoryLength: 10,
          tooltips: {
            undo: tCommon("actions.undo"),
            redo: tCommon("actions.redo"),
          },
        },
      }}
    >
      <PlaygroundActions />
      <NodePanel />
    </WorkflowPlayground>
  );
});

Playground.displayName = "Playground";
export default Playground;
