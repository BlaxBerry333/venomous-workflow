import type { IAccountSignupParameter } from "@/modules/api/types/account-auth";
import { useLanguage, useTranslation } from "@/modules/languages";
import { useCallback, useEffect, useMemo } from "react";
import { createZodSchema, useForm, zodResolver } from "venomous-ui";
import { z } from "zod";

export type SignupFormValue = IAccountSignupParameter & { passwordConfirm: string };

const DEFAULT_SIGNUP_FORM_VALUE: SignupFormValue = {
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

export default function useSignupForm({
  defaultValues = DEFAULT_SIGNUP_FORM_VALUE,
}: {
  defaultValues?: SignupFormValue;
}) {
  const { i18nLang } = useLanguage();
  const { t } = useTranslation("common");

  const formSchemas = useMemo(() => {
    return createZodSchema<SignupFormValue>()(
      z
        .object({
          name: z
            .string()
            .refine((val) => val === "" || val.length >= 4, { message: t("validations.TOO_SHORT") })
            .refine((val) => val.length <= 20, { message: t("validations.TOO_LONG") }),
          email: z.string().min(1, t("validations.REQUIRED")).email(t("validations.INVALID")),
          password: z
            .string()
            .min(4, t("validations.TOO_SHORT"))
            .max(20, t("validations.TOO_LONG")),
          passwordConfirm: z
            .string()
            .min(4, t("validations.TOO_SHORT"))
            .max(20, t("validations.TOO_LONG")),
        })
        .refine((data) => data.password === data.passwordConfirm, {
          message: t("validations.NOT_MATCH"),
          path: ["passwordConfirm"],
        }),
    );
  }, [t, i18nLang]);

  const form = useForm<SignupFormValue>({
    mode: "all",
    resolver: zodResolver(formSchemas),
    defaultValues,
  });

  /**
   * 监听语言变化并重新创建 zod schema
   */
  useEffect(() => {
    void form.trigger();
  }, [form, i18nLang]);

  /**
   * - 在 email 有值時，自動填入到 name
   * - 但 email 验证失败時，则不自動填入到 name
   */
  const handleAutoSetNameValue = useCallback(() => {
    const email = form.getValues("email");
    const name = form.getValues("name");
    const emailError = form.formState.errors.email;
    if (email && (!name || name === "") && !emailError) {
      form.setValue("name", email, { shouldValidate: true });
    }
  }, [form]);

  return {
    form,
    handleAutoSetNameValue,
  };
}
