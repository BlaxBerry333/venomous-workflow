import { useRouteState } from "@/modules/router";
import { memo, type NamedExoticComponent } from "react";
import { Text } from "venomous-ui";

const Error404Page: NamedExoticComponent = memo(() => {
  const { state } = useRouteState<{ reason: string }>();

  return (
    <>
      <Text isTitle titleLevel="h4" text={"404"} />
      <Text isTitle text={state?.reason} />
    </>
  );
});

Error404Page.displayName = "Error404Page";
export default Error404Page;
