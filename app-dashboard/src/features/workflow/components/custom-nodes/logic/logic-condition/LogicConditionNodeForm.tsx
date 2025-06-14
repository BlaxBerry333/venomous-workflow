import { memo, useEffect, useMemo } from "react";
import {
  Button,
  createZodSchema,
  Flex,
  FormUncontrolled,
  InputUncontrolled,
  SelectUncontrolled,
  Text,
  useFieldArray,
  useForm,
  zodResolver,
} from "venomous-ui";
import z from "zod";

import { LOGIC_CONDITION_NODE } from "@/features/workflow/constants";
import { useLogicStartNodeContext, useNodePanelSelected } from "@/features/workflow/hooks";
import {
  LogicConditionType,
  LogicOperator,
  type ILogicConditionNodeFormValue,
} from "@/features/workflow/types/logic-nodes";
import { useLanguage, useTranslation } from "@/modules/languages";

const LogicConditionNodeForm = memo(() => {
  const { t: tCommon } = useTranslation("common");
  const { t: tWorkflow } = useTranslation("workflow");

  const { variableOptions } = useLogicStartNodeContext();

  const { selectedNode, updateSelectedNodeFormValue, updateSelectedNodeData } =
    useNodePanelSelected<ILogicConditionNodeFormValue>();

  const { form, addCondition, removeCondition, conditions } = useLogicConditionNodeForm({
    defaultValues: selectedNode?.data?.formValue,
  });

  useEffect(() => {
    const unsub = form.subscribe({
      formState: { values: true, errors: true },
      callback: ({ values, errors }) => {
        const hasError = !!errors && Object.keys(errors).length > 0;
        updateSelectedNodeData({ isInValid: hasError });
        updateSelectedNodeFormValue(values);
      },
    });
    return () => unsub();
  }, [form, updateSelectedNodeData, updateSelectedNodeFormValue]);

  return (
    <FormUncontrolled
      formInstance={form}
      onSubmit={(formValue) => void updateSelectedNodeFormValue(formValue)}
    >
      <Flex gap={2} width={1}>
        {/* description */}
        <InputUncontrolled name="description" label={tWorkflow(`fields.description`)} fullWidth />

        {/* conditions */}
        {conditions.map((condition, index) => {
          const isFirst = index === 0;
          const isLast = index === conditions.length - 1;
          const conditionType = isFirst
            ? LogicConditionType.If
            : isLast
              ? LogicConditionType.Else
              : LogicConditionType.Elif;

          return (
            <Flex key={condition.id} width={1} sx={{ mb: "8px" }}>
              {/* Add condition */}
              {isLast && (
                <Button
                  icon="material-symbols:add-rounded"
                  text={`Elif`}
                  onClick={() => addCondition()}
                  sx={{ mt: "8px", mb: "24px", width: 1 }}
                />
              )}

              <Flex row width={1} alignItems="center" justifyContent="space-between">
                {/* condition.type */}
                <Text text={conditionType} bold textColor="primary" isTitle />
                {/* Delete condition */}
                {!isFirst && !isLast && (
                  <Button
                    icon="solar:trash-bin-trash-line-duotone"
                    color="error"
                    isGhost
                    isCircle
                    onClick={() => removeCondition(index)}
                  />
                )}
              </Flex>

              <Flex row width={1} sx={{ alignItems: "flex-start" }}>
                {/* condition.variable */}
                {!isLast && (
                  <SelectUncontrolled
                    name={`conditions[${index}].variable`}
                    label={tWorkflow(`fields.${selectedNode.type}.condition.variable`)}
                    fullWidth
                    options={variableOptions}
                    emptyOptionMessage={tCommon("messages.NO_DATA")}
                  />
                )}
                {/* condition.operator */}
                {!isLast && (
                  <SelectUncontrolled
                    name={`conditions[${index}].operator`}
                    label={tWorkflow(`fields.${selectedNode.type}.condition.operator`)}
                    fullWidth
                    options={LOGIC_CONDITION_NODE.CONDITION_OPERATOR_OPTIONS}
                    emptyOptionMessage={tCommon("messages.NO_DATA")}
                  />
                )}
                {isLast && (
                  <Text
                    text={tWorkflow(`fields.${selectedNode.type}.condition.else`)}
                    isLabel
                    textColor="disabled"
                    sx={{ py: "8px" }}
                  />
                )}
              </Flex>
              {/* condition.value */}
              {!isLast && (
                <InputUncontrolled
                  name={`conditions[${index}].value`}
                  label={tWorkflow(`fields.${selectedNode.type}.condition.value`)}
                  fullWidth
                />
              )}
            </Flex>
          );
        })}
      </Flex>
    </FormUncontrolled>
  );
});

LogicConditionNodeForm.displayName = "LogicConditionNodeForm";
export default LogicConditionNodeForm;

function useLogicConditionNodeForm({
  defaultValues = LOGIC_CONDITION_NODE.DEFAULT_FORM_VALUE,
}: {
  defaultValues?: ILogicConditionNodeFormValue;
}) {
  const { i18nLang } = useLanguage();
  const { t: tCommon } = useTranslation("common");

  // Zod Schema
  const formSchemas = useMemo(() => {
    return createZodSchema<ILogicConditionNodeFormValue>()(
      z.object({
        description: z.string().min(1, { message: tCommon("validations.REQUIRED") }),
        conditions: z
          .array(
            z
              .object({
                id: z.string(),
                type: z.nativeEnum(LogicConditionType),
                variable: z.string().optional(),
                operator: z.nativeEnum(LogicOperator).optional(),
                value: z.string().optional(),
              })
              .superRefine((data, ctx) => {
                if (data.type === LogicConditionType.Else) {
                  // Else 时允许 undefined
                  return;
                }
                if (!data.variable || data.variable.trim() === "") {
                  ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: tCommon("validations.REQUIRED"),
                    path: ["variable"],
                  });
                }
                if (!data.operator) {
                  ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: tCommon("validations.REQUIRED"),
                    path: ["operator"],
                  });
                }
                if (!data.value || data.value.trim() === "") {
                  ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: tCommon("validations.REQUIRED"),
                    path: ["value"],
                  });
                }
              }),
          )
          .min(1, { message: tCommon("validations.REQUIRED") }),
      }),
    );
  }, [tCommon, i18nLang]);

  const form = useForm<ILogicConditionNodeFormValue>({
    mode: "all",
    resolver: zodResolver(formSchemas),
    defaultValues,
  });

  useEffect(() => {
    void form.trigger();
  }, [form, i18nLang]);

  const {
    fields: conditions,
    remove,
    insert,
  } = useFieldArray({
    control: form.control,
    name: "conditions",
  });

  const addCondition = () => {
    const newCondition = {
      id: crypto.randomUUID(),
      type: LogicConditionType.Elif,
      variable: undefined,
      operator: undefined,
      value: undefined,
    };
    // 向 If 与 Else 之间插入新的 Elif
    insert(conditions.length - 1, newCondition);
    void form.trigger();
  };

  const removeCondition = (index: number) => {
    remove(index);
    void form.trigger();
  };

  return {
    form,
    conditions,
    addCondition,
    removeCondition,
  };
}
