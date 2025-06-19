import { memo, type NamedExoticComponent, type PropsWithChildren } from "react";
import { Flex } from "venomous-ui";

import ROUTE_PATHS from "../paths";
import LayoutHeaderLogo from "./LayoutHeaderLogo";
import LayoutSettings from "./LayoutSettings";

const RouteLayoutHeader: NamedExoticComponent<PropsWithChildren> = memo(({ children }) => {
  return (
    <Flex row sx={{ width: "100%", justifyContent: "space-between", p: "16px" }}>
      <Flex row gap={0}>
        <LayoutHeaderLogo to={ROUTE_PATHS.AUTH.ROOT} />
      </Flex>

      {children}

      {/* Actions */}
      <Flex row>
        <LayoutSettings />
      </Flex>
    </Flex>
  );
});

RouteLayoutHeader.displayName = "RouteLayoutHeader";
export default RouteLayoutHeader;
