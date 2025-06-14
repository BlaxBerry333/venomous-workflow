import { memo, useCallback, useState } from "react";
import { Button, useToast, useWorkflowElementsProtect, useWorkflowInstance } from "venomous-ui";

import { useTranslation } from "@/modules/languages";

const SaveButton = memo(() => {
  const toast = useToast();
  const { t: tCommon } = useTranslation("common");
  const { getNodes, getEdges } = useWorkflowInstance();
  const { lockElements, unlockElements } = useWorkflowElementsProtect();

  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const handleSubmit = useCallback(async () => {
    console.log({
      nodes: getNodes(),
      edges: getEdges(),
    });
    setIsUpdating(true);
    lockElements();
    await new Promise((resolve) => setTimeout(resolve, 4000));
    setIsUpdating(false);
    unlockElements();
    toast({
      type: "success",
      title: tCommon("保存成功"),
      description: tCommon("保存成功"),
    });
  }, [getNodes, getEdges, lockElements, lockElements, unlockElements]);

  return (
    <Button
      icon="ic:round-save"
      iconWidth={24}
      iconPosition="start"
      text={tCommon("actions.save")}
      loading={isUpdating}
      onClick={() => void handleSubmit()}
    />
  );
});

SaveButton.displayName = "SaveButton";
export default SaveButton;
