import { memo, type NamedExoticComponent } from "react";
import { Flex } from "venomous-ui";

const AdminConnectionStorageView: NamedExoticComponent = memo(() => {
  return (
    <Flex row gap={0.5} sx={{ height: "100%", overflow: "hidden", alignItems: "flex-start" }}>
      AdminConnectionStorageView
    </Flex>
  );
});

AdminConnectionStorageView.displayName = "AdminConnectionStorageView";
export default AdminConnectionStorageView;
