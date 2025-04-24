import { SignupForm } from "@/features/auth/signup";
import { AuthRouteLayoutTitle } from "@/modules/router/layouts";
import { memo, useState, type NamedExoticComponent } from "react";
import { useNavigate } from "react-router-dom";

const AuthSignupView: NamedExoticComponent = memo(() => {
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  return (
    <>
      <AuthRouteLayoutTitle
        title="用户注册"
        subtitle=""
        subTitleExtraText="已经有账号了?"
        subTitleExtraUrl="/auth/signin"
      />

      <SignupForm
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

AuthSignupView.displayName = "AuthSignupView";
export default AuthSignupView;
