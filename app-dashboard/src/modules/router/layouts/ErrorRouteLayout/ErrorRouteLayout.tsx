import { memo, type NamedExoticComponent, type PropsWithChildren } from "react";
import { Container, Flex } from "venomous-ui";
import LayoutBackgroundImage from "../LayoutBackgroundImage";
import LayoutHeader from "../LayoutHeader";

const ErrorRouteLayout: NamedExoticComponent<PropsWithChildren> = memo(({ children }) => {
  return (
    <Container maxWidth="lg">
      {/* Background Image */}
      <LayoutBackgroundImage />

      <Flex alignItems="flex-start" gap={0.5}>
        {/* Header */}
        <LayoutHeader />

        {/* Content */}
        <Flex
          sx={{
            position: "absolute",
            width: "100%",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            padding: "16px",
            minWidth: 390,
            maxWidth: 690,
          }}
        >
          <Container maxWidth="md">{children}</Container>
        </Flex>
      </Flex>
    </Container>
  );
});

ErrorRouteLayout.displayName = "ErrorRouteLayout";
export default ErrorRouteLayout;
