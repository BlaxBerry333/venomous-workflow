import { memo } from "react";
import { Flex, WorkflowToolbarPanel } from "venomous-ui";

import { default as ExecuteButton } from "./_ExecuteButton";
import Info from "./_Info";
import { default as SaveButton } from "./_SaveButton";

const PlaygroundActions = memo(() => {
  return (
    <>
      <WorkflowToolbarPanel position="top-left" isPaper={false}>
        <Info />
      </WorkflowToolbarPanel>

      <WorkflowToolbarPanel position="top-right">
        <Flex row gap={1}>
          <ExecuteButton />
          <SaveButton />
        </Flex>
      </WorkflowToolbarPanel>
    </>
  );
});

PlaygroundActions.displayName = "PlaygroundActions";
export default PlaygroundActions;
