import { memo, type NamedExoticComponent } from "react";
import {
  FormUncontrolled,
  FormUncontrolledAction,
  InputUncontrolled,
  PasswordUncontrolled,
} from "venomous-ui";
import useSigninForm, { type SigninFormValue } from "./useSigninForm";

type SigninFormProps = {
  isSubmitting: boolean;
  handleOnSubmit: (formValue: SigninFormValue) => Promise<void>;
  defaultValues?: SigninFormValue;
};

const SigninForm: NamedExoticComponent<SigninFormProps> = memo(
  ({ defaultValues, handleOnSubmit, isSubmitting }) => {
    const { form } = useSigninForm({ defaultValues });

    return (
      <FormUncontrolled
        formInstance={form}
        onSubmit={(formValue) => void handleOnSubmit(formValue)}
      >
        {/* name */}
        <InputUncontrolled name="email" label="登录邮箱" fullWidth />

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

SigninForm.displayName = "SigninForm";
export default SigninForm;
