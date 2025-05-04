import { SigninForm } from "@/features/auth/signin";
import type { SigninFormValue } from "@/features/auth/signin/useSigninForm";
import { useAccountSignin } from "@/modules/api/hooks/account-auth";
import { useTranslation } from "@/modules/languages";
import { useRouteNavigate } from "@/modules/router/hooks";
import { AuthRouteLayoutTitle } from "@/modules/router/layouts";
import ROUTE_PATHS from "@/modules/router/paths";
import { memo, useCallback, type NamedExoticComponent } from "react";
import { useToast } from "venomous-ui";

const AuthSigninView: NamedExoticComponent = memo(() => {
  const { mutateAsync: signin, isPending: isSigningin } = useAccountSignin();

  const { t: tAuth } = useTranslation("auth");

  const { replace } = useRouteNavigate();
  const toast = useToast();

  const handleOnSubmit = useCallback(
    async (formValue: SigninFormValue) => {
      await signin(formValue)
        .then(() => {
          toast({
            type: "success",
            title: tAuth("alerts.signin-succeed"),
            description: tAuth("alerts.signin-succeed-info"),
          });
          replace(ROUTE_PATHS.ADMIN.ROOT);
        })
        .catch((error) => {
          const errorMessage = error?.response?.data?.error ?? error.message;
          const errorStatus = error?.response?.status;
          toast({
            type: "error",
            title: tAuth("alerts.signin-failed"),
            description: `${errorStatus} ${errorMessage}`,
          });
        });
    },
    [replace, signin, toast, tAuth],
  );

  return (
    <>
      <AuthRouteLayoutTitle
        title={tAuth("page-messages.signin")}
        subtitle={tAuth("page-messages.DO_NOT_HAVE_AN_ACCOUNT")}
        subTitleExtraText={tAuth("page-messages.CREATE_AN_ACCOUNT")}
        subTitleExtraUrl={ROUTE_PATHS.AUTH.SIGNUP}
      />

      <SigninForm isSubmitting={isSigningin} handleOnSubmit={handleOnSubmit} />
    </>
  );
});

AuthSigninView.displayName = "AuthSigninView";
export default AuthSigninView;
