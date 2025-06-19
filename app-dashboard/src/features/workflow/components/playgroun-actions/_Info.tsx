import { memo, useMemo } from "react";
import { Flex, Text } from "venomous-ui";

import { useWorkflowDataDetail } from "@/modules/api/hooks/workflow-data";
import { handleFormatDatetime } from "@/modules/tools";

const Info = memo(() => {
  const { data: worfklowDataDetail } = useWorkflowDataDetail();
  const { name, id, updatedAt } = worfklowDataDetail || {};
  const updatedAtFormatted = useMemo<string>(() => {
    if (!updatedAt) return "";
    const d = handleFormatDatetime(updatedAt);
    return `${d.DateTime} ( ${d.FromNow} )`;
  }, [updatedAt]);

  return (
    <Flex gap={0}>
      {name && <Text bold textColor="primary" text={name} />}
      {id && <Text isLabel bold textColor="disabled" text={`#${id}`} />}
      {updatedAt && <Text isLabel bold textColor="disabled" text={updatedAtFormatted} />}
    </Flex>
  );
});

Info.displayName = "Info";
export default Info;
