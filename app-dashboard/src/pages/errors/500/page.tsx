import { memo, type NamedExoticComponent } from "react";
import { Text } from "venomous-ui";

import { useRouteState } from "@/modules/router";

const Error500Page: NamedExoticComponent = memo(() => {
  const { state } = useRouteState<{ message: string; reason: string }>();

  return (
    <>
      <Text isTitle titleLevel="h4" text={"500"} />
      <Text isTitle titleLevel="h4" text={`Oops! ${state?.message}`} />
      <Text text={state?.reason} />
    </>
  );
});

Error500Page.displayName = "Error500Page";
export default Error500Page;
