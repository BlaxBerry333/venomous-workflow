import { memo, type NamedExoticComponent } from "react";
import {
  FormUncontrolled,
  FormUncontrolledAction,
  InputUncontrolled,
  PasswordUncontrolled,
} from "venomous-ui";
import type { SignupFormValue } from "./useSignupForm";
import useSignupForm from "./useSignupForm";

type SignupFormProps = {
  isSubmitting: boolean;
  handleOnSubmit: (formValue: SignupFormValue) => Promise<void>;
  defaultValues?: SignupFormValue;
};

const SignupForm: NamedExoticComponent<SignupFormProps> = memo(
  ({ defaultValues, handleOnSubmit, isSubmitting }) => {
    const { form, handleAutoSetNameValue } = useSignupForm({ defaultValues });

    return (
      <FormUncontrolled
        formInstance={form}
        onSubmit={(formValue) => void handleOnSubmit(formValue)}
      >
        {/* name */}
        <div onBlur={handleAutoSetNameValue}>
          <InputUncontrolled name="name" label="登录名" fullWidth />
        </div>

        {/* email */}
        <div onBlur={handleAutoSetNameValue}>
          <InputUncontrolled name="email" label="登录邮箱" fullWidth />
        </div>

        {/* password */}
        <PasswordUncontrolled name="password" label="登录密码" fullWidth />

        <FormUncontrolledAction
          cancelButtonText="清空"
          submitButtonText="确认"
          isSubmitting={isSubmitting}
        />
      </FormUncontrolled>
    );
  },
);

SignupForm.displayName = "SignupForm";
export default SignupForm;
