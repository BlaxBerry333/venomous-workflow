import { SignupForm } from "@/features/auth/signup";
import type { SignupFormValue } from "@/features/auth/signup/useSignupForm";
import { useAccountSignup } from "@/modules/api/hooks/account-auth";
import { useTranslation } from "@/modules/languages";
import { useRouteNavigate } from "@/modules/router/hooks";
import { AuthRouteLayoutTitle } from "@/modules/router/layouts";
import ROUTE_PATHS from "@/modules/router/paths";
import { memo, useCallback, type NamedExoticComponent } from "react";
import { useToast } from "venomous-ui";

const AuthSignupView: NamedExoticComponent = memo(() => {
  const { mutateAsync: signup, isPending: isSigningin } = useAccountSignup();

  const { t: tAuth } = useTranslation("auth");

  const toast = useToast();
  const { replace } = useRouteNavigate();

  const handleOnSubmit = useCallback(
    async (formValue: SignupFormValue) => {
      await signup(formValue)
        .then(() => {
          toast({
            type: "success",
            title: tAuth("alerts.signup-succeed"),
            description: tAuth("alerts.signup-succeed-info"),
          });
          replace(ROUTE_PATHS.ADMIN.ROOT);
        })
        .catch((error) => {
          const errorMessage = Object.values(error?.response?.data)?.[0] ?? error.message;
          const errorStatus = error?.response?.status;
          toast({
            type: "error",
            title: tAuth("alerts.signup-failed"),
            description: `${errorStatus} ${errorMessage}`,
          });
        });
    },
    [replace, signup, toast, tAuth],
  );

  return (
    <>
      <AuthRouteLayoutTitle
        title={tAuth("page-messages.signup")}
        subtitle=""
        subTitleExtraText={tAuth("page-messages.ALREADY_HAS_AN_ACCOUNT")}
        subTitleExtraUrl={ROUTE_PATHS.AUTH.SIGNIN}
      />

      <SignupForm isSubmitting={isSigningin} handleOnSubmit={handleOnSubmit} />
    </>
  );
});

AuthSignupView.displayName = "AuthSignupView";
export default AuthSignupView;
