import type { IAccountSigninParameter } from "@/modules/api/types/account-auth";
import { useLanguage, useTranslation } from "@/modules/languages";
import { useEffect, useMemo } from "react";
import { createZodSchema, useForm, zodResolver } from "venomous-ui";
import { z } from "zod";

export type SigninFormValue = IAccountSigninParameter;

const DEFAULT_SIGNIN_FORM_VALUE: SigninFormValue = {
  email: "",
  password: "",
};

export default function useSigninForm({
  defaultValues = DEFAULT_SIGNIN_FORM_VALUE,
}: {
  defaultValues?: SigninFormValue;
}) {
  const { i18nLang } = useLanguage();
  const { t } = useTranslation("common");

  const formSchemas = useMemo(() => {
    return createZodSchema<SigninFormValue>()(
      z.object({
        email: z.string().min(1, t("validations.REQUIRED")).email(t("validations.INVALID")),
        password: z.string().min(4, t("validations.TOO_SHORT")).max(20, t("validations.TOO_LONG")),
      }),
    );
  }, [t, i18nLang]);

  const form = useForm<SigninFormValue>({
    mode: "all",
    resolver: zodResolver(formSchemas),
    defaultValues: defaultValues,
  });

  /**
   * 监听语言变化并重新创建 zod schema
   */
  useEffect(() => {
    void form.trigger();
  }, [form, i18nLang]);

  return {
    form,
  };
}
