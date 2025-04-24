import { memo, type NamedExoticComponent } from "react";
import { NavLink } from "react-router-dom";
import { Flex, Text } from "venomous-ui";

const AuthRouteLayoutTitle: NamedExoticComponent<{
  title: string;
  subtitle: string;
  subTitleExtraText?: string;
  subTitleExtraUrl?: string;
}> = memo(({ title, subtitle, subTitleExtraText, subTitleExtraUrl }) => {
  return (
    <Flex gap={0} my="16px">
      <Text isTitle titleLevel="h4" text={title} />

      <Flex row gap={0}>
        {subtitle && <Text text={subtitle} mr="8px" />}
        {subTitleExtraUrl && subTitleExtraText && (
          <NavLink to={subTitleExtraUrl} style={{ textDecoration: "none" }}>
            <Text text={subTitleExtraText} textColor="primary" />
          </NavLink>
        )}
      </Flex>
    </Flex>
  );
});

AuthRouteLayoutTitle.displayName = "AuthRouteLayoutTitle";
export default AuthRouteLayoutTitle;
