import { memo, useCallback, type NamedExoticComponent } from "react";
import { Text } from "venomous-ui";

import { BASIC_CONFIGS } from "@/configs";
import { useRouteNavigate } from "../hooks";
import LOGO from "/favicon.svg";

const LayoutHeaderLogo: NamedExoticComponent<{ to: string }> = memo(({ to = "/" }) => {
  const router = useRouteNavigate();
  const navigateToHome = useCallback(() => router.push(to), [router, to]);

  return (
    <>
      {/* Logo Image */}
      <img
        src={LOGO}
        alt="logo"
        width={28}
        draggable={false}
        loading="lazy"
        onClick={navigateToHome}
        style={{ display: "block", minWidth: 28, cursor: "pointer" }}
      />

      {/* Title */}
      <Text
        isTitle
        titleLevel="h5"
        ellipsis
        text={BASIC_CONFIGS.APP_SERIES_NAME.slice(1)}
        sx={{ transform: "translate(-1px, 4px)", cursor: "pointer" }}
        onClick={navigateToHome}
      />
    </>
  );
});

LayoutHeaderLogo.displayName = "LayoutHeaderLogo";
export default LayoutHeaderLogo;
