import { memo, type NamedExoticComponent } from "react";
import { NavLink } from "react-router-dom";
import { Flex, LazyImage, Text } from "venomous-ui";

import { BASIC_CONFIGS } from "@/configs";
import LOGO from "/favicon.svg";

const LayoutHeaderLogo: NamedExoticComponent<{ to: string }> = memo(({ to = "/" }) => {
  return (
    <NavLink to={to} style={{ textDecoration: "none", color: "inherit" }}>
      <Flex row gap={0} ml="2px">
        {/* Logo Image */}
        <LazyImage src={LOGO} alt="logo" width={28} />

        {/* Title */}
        <Text
          isTitle
          titleLevel="h5"
          text={BASIC_CONFIGS.APP_SERIES_NAME.slice(1)}
          sx={{ transform: "translate(-1px, 1px)" }}
        />
      </Flex>
    </NavLink>
  );
});

LayoutHeaderLogo.displayName = "LayoutHeaderLogo";
export default LayoutHeaderLogo;
