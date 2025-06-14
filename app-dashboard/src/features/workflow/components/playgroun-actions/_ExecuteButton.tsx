import { memo, useCallback, useState } from "react";
import {
  Button,
  Tooltip,
  useToast,
  useWorkflowElementsProtect,
  useWorkflowInstance,
} from "venomous-ui";

import { useTranslation } from "@/modules/languages";

const ExecuteButton = memo(() => {
  const toast = useToast();
  const { t: tCommon } = useTranslation("common");
  const { getNodes, getEdges } = useWorkflowInstance();
  const { lockElements, unlockElements } = useWorkflowElementsProtect();

  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const handleExecuttion = useCallback(async () => {
    setIsExecuting(true);
    lockElements();
    await new Promise((resolve) => setTimeout(resolve, 4000));
    setIsExecuting(false);
    unlockElements();
    toast({
      type: "success",
      title: tCommon("执行成功"),
      description: tCommon("执行成功"),
    });
  }, [getNodes, getEdges, toast, tCommon, lockElements, unlockElements]);

  const handleCancle = useCallback(() => {
    setIsExecuting(false);
    toast({
      type: "info",
      title: tCommon("取消成功"),
      description: tCommon("取消成功"),
    });
  }, [toast, tCommon]);

  return (
    <Tooltip tooltip={isExecuting ? tCommon("actions.cancel") : tCommon("actions.exectue")}>
      <Button
        isSquare
        icon={isExecuting ? "solar:stop-bold" : "solar:play-bold"}
        color={isExecuting ? "error" : "primary"}
        onClick={isExecuting ? handleCancle : handleExecuttion}
      />
    </Tooltip>
  );
});

ExecuteButton.displayName = "ExecuteButton";
export default ExecuteButton;
