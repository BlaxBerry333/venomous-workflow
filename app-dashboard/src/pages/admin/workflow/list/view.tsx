import { memo, useCallback, type NamedExoticComponent } from "react";
import { Button, Card, Flex, Loading, Text, useToast } from "venomous-ui";

import { useWorkflowDataDelete, useWorkflowDataList } from "@/modules/api/hooks/workflow-data";
import { useTranslation } from "@/modules/languages";
import { useRouteNavigate } from "@/modules/router";
import ROUTE_PATHS from "@/modules/router/paths";

const AdminLogicListView: NamedExoticComponent = memo(() => {
  const toast = useToast();
  const router = useRouteNavigate();
  const { t: tWorkflow } = useTranslation("workflow");

  const { data, isLoading, refetch } = useWorkflowDataList();
  const { mutateAsync: deleteWorkflowData, isPending: isDeleting } = useWorkflowDataDelete();

  const handleJumpToWorkflowDataDetail = useCallback(
    (workflowId: string) => {
      router.push(ROUTE_PATHS.ADMIN.WORKFLOW_DETAIL + `?workflowId=${workflowId}`);
    },
    [router],
  );

  const handleDeleteWorkflowData = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, workflowId: string) => {
      e.stopPropagation();
      await deleteWorkflowData(workflowId);
      await refetch();
      toast({
        type: "success",
        title: tWorkflow("api-message.delete-success"),
        description: `#${workflowId}`,
      });
    },
    [deleteWorkflowData, refetch, toast],
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Flex gap={0.5}>
      {data?.results?.map((item) => (
        <Card
          key={item.id}
          isOutlined
          clickable
          onClick={() => handleJumpToWorkflowDataDetail(item.id)}
          disabled={isDeleting}
          sx={{ width: 1, display: "flex", justifyContent: "space-between" }}
        >
          <Flex>
            <Text text={item.name} bold />
            <Text text={item.description} isLabel textColor="disabled" />
          </Flex>
          <Button
            isSquare
            isGhost
            icon="solar:close-square-line-duotone"
            color="error"
            disabled={isDeleting}
            onClick={(e) => void handleDeleteWorkflowData(e, item.id)}
          />
        </Card>
      ))}
    </Flex>
  );

  return (
    <div>
      AdminLogicListView
      <Button
        text="Detail Page"
        onClick={() => router.push(ROUTE_PATHS.ADMIN.WORKFLOW_DETAIL + "?workflowId=1234567890")}
      />
    </div>
  );
});

AdminLogicListView.displayName = "AdminLogicListView";
export default AdminLogicListView;
