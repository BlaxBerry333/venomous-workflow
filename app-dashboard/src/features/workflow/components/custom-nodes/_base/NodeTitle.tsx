import { memo } from "react";
import { Flex, Text } from "venomous-ui";

import type { INode } from "@/features/workflow/types";
import { useTranslation } from "@/modules/languages";
import NodeIcon from "./NodeIcon";

const NodeTitle = memo<Pick<INode, "id" | "type">>(({ id, type }) => {
  const { t } = useTranslation("workflow");

  return (
    <Flex row gap={2} sx={{ height: 1 }}>
      <NodeIcon nodeType={type} />

      <Flex gap={0}>
        <Text bold text={t(`node-type.${type}`)} />
        <Text isLabel textColor="disabled" text={`#${id}`} />
      </Flex>
    </Flex>
  );
});

NodeTitle.displayName = "NodeTitle";
export default NodeTitle;
