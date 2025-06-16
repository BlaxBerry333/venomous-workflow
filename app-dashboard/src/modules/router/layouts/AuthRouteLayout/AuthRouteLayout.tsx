import { memo, Suspense, type NamedExoticComponent, type PropsWithChildren } from "react";
import { Container, Flex, Loading } from "venomous-ui";
import LayoutBackgroundImage from "../LayoutBackgroundImage";
import LayoutHeader from "../LayoutHeader";

const AuthRouteLayout: NamedExoticComponent<PropsWithChildren> = memo(({ children }) => {
  return (
    <Container maxWidth="fullwidth" sx={{ positino: "relative" }}>
      {/* Background Image */}
      <LayoutBackgroundImage />

      <Flex alignItems="flex-start" gap={0.5}>
        {/* Header */}
        <LayoutHeader />

        {/* Content */}
        <Suspense fallback={<Loading />}>
          <Flex
            sx={{
              position: "absolute",
              width: "100%",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              padding: "16px",
              minWidth: 390,
            }}
          >
            <Container maxWidth="sm">{children}</Container>
          </Flex>
        </Suspense>
      </Flex>
    </Container>
  );
});

AuthRouteLayout.displayName = "AuthRouteLayout";
export default AuthRouteLayout;
