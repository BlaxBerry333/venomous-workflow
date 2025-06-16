import { memo, useMemo, type NamedExoticComponent } from "react";

import { WORKFLOW_CUSTOM_NODE_PANEL_FORMS } from "@/features/workflow/constants/node-panel-forms";
import type { INode } from "@/features/workflow/types";

const NodePanelForm = memo<INode>((node) => {
  const nodeType = node.type;

  const PanelComponent = useMemo<NamedExoticComponent<INode>>(
    () => WORKFLOW_CUSTOM_NODE_PANEL_FORMS[nodeType],
    [nodeType],
  );

  return <PanelComponent {...node} />;
});

NodePanelForm.displayName = "NodePanelForm";
export default NodePanelForm;
