import { memo, type NamedExoticComponent } from "react";
import { Flex, Text } from "venomous-ui";

import { useRouteState } from "@/modules/router";

const Error404Page: NamedExoticComponent = memo(() => {
  const { state } = useRouteState<{ message: string; reason: string }>();

  const message = state?.message || "Page Not Found";

  return (
    <Flex>
      <Text isTitle titleLevel="h1" text={"404"} />
      <Text isTitle titleLevel="h3" text={`Oops! ${message}`} />
      <Text text={state?.reason} />
    </Flex>
  );
});

Error404Page.displayName = "Error404Page";
export default Error404Page;
