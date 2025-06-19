import { memo, type NamedExoticComponent } from "react";
import { Text } from "venomous-ui";

import { useRouteState } from "@/modules/router";

const Error500Page: NamedExoticComponent = memo(() => {
  const { state } = useRouteState<{ message: string; reason: string }>();

  const message = state?.message || "Internal Server Error";

  return (
    <>
      <Text isTitle titleLevel="h1" text={"500"} />
      <Text isTitle titleLevel="h3" text={`Oops! ${message}`} />
      <Text text={state?.reason} />
    </>
  );
});

Error500Page.displayName = "Error500Page";
export default Error500Page;
