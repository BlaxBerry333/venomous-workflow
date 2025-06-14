import { useRouteSearch } from "@/modules/router";
import { memo } from "react";
import { Flex, Text } from "venomous-ui";

const Info = memo(() => {
  const { workflowId } = useRouteSearch<{ workflowId: string }>();

  return (
    <Flex gap={0}>
      <Text bold textColor="primary" text="Sample Workflow" />
      <Text isLabel bold textColor="disabled" text={`#${workflowId}`} />
    </Flex>
  );
});

Info.displayName = "Info";
export default Info;
