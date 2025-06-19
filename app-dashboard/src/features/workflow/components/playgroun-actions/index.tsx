import { lazy, memo, Suspense } from "react";
import { Flex, WorkflowToolbarPanel } from "venomous-ui";

const ExecuteButton = lazy(() => import("./_ExecuteButton"));
const Info = lazy(() => import("./_Info"));
const SaveButton = lazy(() => import("./_SaveButton"));

const PlaygroundActions = memo(() => {
  return (
    <>
      <WorkflowToolbarPanel position="top-left" isPaper={false}>
        <Suspense fallback={null}>
          <Info />
        </Suspense>
      </WorkflowToolbarPanel>

      <WorkflowToolbarPanel position="top-right">
        <Flex row gap={1}>
          <Suspense fallback={null}>
            <ExecuteButton />
          </Suspense>
          <Suspense fallback={null}>
            <SaveButton />
          </Suspense>
        </Flex>
      </WorkflowToolbarPanel>
    </>
  );
});

PlaygroundActions.displayName = "PlaygroundActions";
export default PlaygroundActions;
