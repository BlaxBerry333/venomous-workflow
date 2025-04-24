import { memo, type NamedExoticComponent, type PropsWithChildren } from "react";
import { Flex } from "venomous-ui";
import LayoutHeaderLogo from "./LayoutHeaderLogo";
import LayoutSettings from "./LayoutSettings";

const RouteLayoutHeader: NamedExoticComponent<PropsWithChildren> = memo(({ children }) => {
  return (
    <Flex row sx={{ width: "100%", justifyContent: "space-between", p: "16px" }}>
      <LayoutHeaderLogo to="/auth/" />
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
