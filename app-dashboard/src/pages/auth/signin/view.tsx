import { SigninForm } from "@/features/auth/signin";
import { AuthRouteLayoutTitle } from "@/modules/router/layouts";
import { memo, useState, type NamedExoticComponent } from "react";
import { useNavigate } from "react-router-dom";

const AuthSigninView: NamedExoticComponent = memo(() => {
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  return (
    <>
      <AuthRouteLayoutTitle
        title="用户登陆"
        subtitle="没有账号?"
        subTitleExtraText="创建一个新账号!"
        subTitleExtraUrl="/auth/signup"
      />

      <SigninForm
        isSubmitting={isSubmitting}
        handleOnSubmit={async (formValue) => {
          try {
            console.log(formValue);
            setIsSubmitting(true);
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setIsSubmitting(false);
            navigate("/admin/", { replace: true });
          } catch (error) {
            console.log(error);
          }
        }}
      />
    </>
  );
});

AuthSigninView.displayName = "AuthSigninView";
export default AuthSigninView;
