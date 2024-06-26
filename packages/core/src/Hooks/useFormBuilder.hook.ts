import { isDate } from 'date-fns';
import Joi from 'joi';
import {
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';
import { useForm } from 'react-hook-form';
import {
    useDeepCompareEffect,
    useSetState,
    useToggle,
    useUpdateEffect,
} from 'react-use';

import { joiResolver } from '@hookform/resolvers/joi';

import { useWizardEvent } from '../../../design-system/src/Composites/Wizard/Hooks';
import { FormScriptController } from '../backend/ap/business/controllers/form.script.controller';
import { ObjectDto } from '../backend/Dtos';
import {
    GENERIC_LIST_SELECT_REFETCH,
    INDIA_MOBILE_NUMBER_REGEX,
} from '../Constants';
import { SCRIPT_TYPE } from '../Constants/scriptType.constants';
import { user } from '../Models';
import {
    FormBuilderFormSchema,
    FormBuilderHandleFormDataType,
    FormBuilderHasErrorType,
    FormBuilderProps,
    FormBuilderRenderElement,
} from '../Types/formBuilder.types';
import {
    AccessNestedObject,
    Capitalize,
    getJoiValidationOptions,
    IsEmptyArray,
    IsEmptyObject,
    IsFunction,
    IsObjectHaveKeys,
    IsUndefined,
    IsValidString,
} from '../Utils/common.utils';
import { FormUtils, FormUtilSelfObj } from '../Utils/form.utils';
import { ExecuteScript } from '../Utils/injectScript.utils';
import {
    StoreEvent,
    SubscribeToEvent,
    UnsubscribeEvent,
} from '../Utils/stateManager.utils';
import { formElements } from '../Utils/ui.utils';
import { useApp } from './useApp.hook';
import { useCustomField } from './useCustomField.hook';
import { FetchData } from './useFetchData.hook';

export const useFormBuilder = (
    {
        initValues = {},
        formSchema: propsFormSchema = {},
        functionRegistry,
        customFieldType,
        onSubmit,
        formKey,
        context,
    }: FormBuilderProps,
    ref?: any
) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const formRef = useRef(new FormUtils());
    const formUtils = formRef.current;
    const {
        getCustomColumnSchema,
        getDefaultValues: getCustomFieldDefaultValues,
        fetchCustomColumns,
        sanitizedDateValues,
        parseMaskedDateValues,
    } = useCustomField({
        type_id: customFieldType,
        enabled: !!customFieldType,
    });

    const { isFormUpdated, toggleFormUpdated } = useApp();
    const [asyncValidated, setAsyncValidated] = useSetState({});
    const [isCreateAnother, setCreateAnother] = useToggle(false);
    const [isAsyncValidating, setIsAsyncValidating] = useToggle(false);
    const [initial, setInitial] = useState(true);
    const [scripts, setScripts] = useState<any>([]);

    const [tempFormSchema, setTempFormSchema] =
        useState<FormBuilderFormSchema>(propsFormSchema);

    const customFieldSchema: FormBuilderFormSchema = useMemo(() => {
        const customSchema = getCustomColumnSchema(
            IsFunction(initValues) ? {} : initValues
        );
        if (!IsEmptyObject(customSchema)) {
            return {
                custom_field_data: {
                    type: 'object',
                    formSchema: customSchema,
                },
            };
        }
        return {};
    }, [getCustomColumnSchema, initValues]);

    const formSchema: FormBuilderFormSchema = useMemo(
        () => ({
            ...tempFormSchema,
            ...customFieldSchema,
        }),
        [customFieldSchema, tempFormSchema]
    );

    const getValidationSchema = useCallback(
        (formSchema: FormBuilderFormSchema) => {
            const newValidationSchema: any = {};

            Object.keys(formSchema).forEach((elementKey: string) => {
                let validation: any = Joi.any();
                const schema = { ...formSchema[elementKey] };

                if (!schema || schema.disabled || !schema.type) return;

                if (schema.type === 'object' && schema.formSchema) {
                    newValidationSchema[elementKey] = Joi.object(
                        getValidationSchema(schema.formSchema)
                    );
                    return;
                }

                if (schema.type === 'card') {
                    return;
                }

                if (['date', 'masked_date'].includes(schema.type)) {
                    validation = Joi.date();
                    if (schema?.minDate || schema.maxDate) {
                        if (schema?.minDate)
                            validation = validation.min(schema?.minDate);
                        if (schema?.maxDate)
                            validation = validation.max(schema?.maxDate);
                        if (schema?.customErrorMessage) {
                            validation = validation.message({
                                'date.min': schema.customErrorMessage,
                                'date.max': schema.customErrorMessage,
                            });
                        }
                    }
                }
                if (['number'].includes(schema.type)) {
                    validation = Joi.number().empty(0);

                    if (schema.min && schema.type === 'number') {
                        validation = validation.min(schema.min);
                        if (schema?.customErrorMessage) {
                            validation = validation.message({
                                'number.min': schema.customErrorMessage,
                            });
                        }
                    }
                }
                if (schema.type === 'email') {
                    validation = Joi.string()
                        .empty('')
                        .email({
                            tlds: { allow: false },
                        })
                        .trim();
                }
                if (schema.type === 'tel') {
                    validation = Joi.string()
                        .max(10)
                        .min(10)
                        .custom((value: string, helpers: any) => {
                            if (!INDIA_MOBILE_NUMBER_REGEX.test(value + '')) {
                                return helpers.error('any.unknown');
                            }
                            return value;
                        })
                        .messages({
                            'any.unknown': `Please enter a valid 10-digit number.`,
                            'string.min':
                                'Please enter a valid 10-digit number.',
                            'string.max':
                                'Please enter a valid 10-digit number.',
                        })
                        .trim();
                }
                if (
                    ['text', 'search', 'textarea', 'password'].includes(
                        schema.type
                    )
                ) {
                    validation = Joi.string().empty('').allow(null).trim();

                    if (!IsUndefined(schema.minLength)) {
                        validation = validation.min(schema.minLength);
                    }
                    if (!IsUndefined(schema.maxLength)) {
                        validation = validation.max(schema.maxLength);
                    }
                }

                if (schema.type === 'hidden') {
                    validation = Joi.any();
                }
                if (schema.type === 'reference_select') {
                    validation = Joi.any();
                }
                if (schema.type === 'autofill_select') {
                    validation = Joi.any();
                }

                if (schema.type === 'fileupload') {
                    validation = Joi.array();
                }

                if (schema.type === 'boolean') {
                    validation = Joi.bool();
                    if (schema.required) {
                        validation = validation.valid().messages({
                            'any.valid': 'This is required field',
                            'any.required': 'This is required field',
                            'bool.validate': 'This is required field',
                            'bool.empty': 'This is required field',
                        });
                    }
                }
                if (
                    [
                        'drag_drop_file_upload',
                        'small_multiple_file_upload',
                    ].includes(schema.type)
                ) {
                    validation = Joi.array().items(
                        Joi.object().keys({
                            document_url: Joi.string().required(),
                        })
                    );
                    if (schema?.required) {
                        validation = validation.min(1).message({
                            'array.min': `${schema.label} is required `,
                        });
                    }
                }
                if (schema.type === 'profile_upload') {
                    validation = Joi.string();
                }

                if (schema.type === 'email_template') {
                    validation = Joi.any();
                }

                if (schema.type.startsWith('multi_')) {
                    validation = Joi.array().items(Joi.string());

                    if (
                        schema.type.endsWith('_number') ||
                        schema.type.endsWith('_ids')
                    ) {
                        validation = Joi.array().items(Joi.number());
                    }

                    // Its not working some how. Need to fix this.
                    // if (schema.type === 'multi_email') {
                    //     validation = Joi.array().items(
                    //         Joi.string().email({ tlds: { allow: false } })
                    //     );
                    // }

                    if (schema.min || schema.required) {
                        validation = validation.min(schema.min || 1);
                    }
                    if (schema.max) {
                        validation = validation.max(schema.max);
                    }
                }

                if (schema.regex) {
                    validation = validation.custom(
                        (value: string, helpers: any) => {
                            if (!schema.regex) return value;
                            if (!schema.regex.test(value + '')) {
                                return helpers.error('any.unknown');
                            }
                            return value;
                        }
                    );
                }

                if (schema.refKey && IsValidString(schema.refKey)) {
                    validation = Joi.any()
                        .equal(Joi.ref(schema.refKey))
                        .messages({ 'any.only': '{{#label}} does not match' });
                }
                if (
                    schema.notValidRefKey &&
                    IsValidString(schema.notValidRefKey)
                ) {
                    validation = Joi.any()
                        .invalid(Joi.ref(schema.notValidRefKey))
                        .messages({
                            'any.invalid':
                                schema.customErrorMessage ||
                                `{{#label}} can't be same as  ${Capitalize(
                                    schema.notValidRefKey.split('_').join(' ')
                                )}`,
                        });
                }

                validation = validation.empty(null).empty('');
                if (!schema?.required) validation = validation.allow(null);

                if (schema.required) {
                    validation = validation.required();
                } else {
                    if (!IsUndefined(schema.allow_validation)) {
                        validation = validation
                            .allow('', schema.allow_validation)
                            .optional();
                    } else {
                        validation = validation.allow('').optional();
                    }
                }

                validation = validation.label(
                    schema.validationLabel ||
                        schema.label ||
                        schema.name ||
                        Capitalize(elementKey)
                );

                newValidationSchema[elementKey] = validation;
            });

            return newValidationSchema;
        },
        []
    );

    const getFormScripts = useCallback(async () => {
        if (!formKey) return [];
        const userData = user.getUserData();

        // @todo no logged record message show when vendor onboarding time
        if (!userData?.id || !(userData.business || userData.vendor)) return;
        const { success, response } = await FetchData({
            className: FormScriptController,
            method: 'show',
            methodParams: formKey,
        });

        if (!success) return [];
        if (IsEmptyArray(response)) return [];

        setScripts(response);
        return response;
    }, [formKey]);

    const {
        formState,
        control,
        getValues,
        getFieldState,
        setValue,
        setFocus,
        setError: setFormHookError,
        handleSubmit: handleFormHookSubmit,
        trigger: validateFields,
        reset,
        watch,
    } = useForm({
        defaultValues: async () => {
            let values = IsFunction(initValues)
                ? await initValues()
                : structuredClone(initValues);

            const scripts = await getFormScripts();

            const formContent: FormUtilSelfObj['form'] = {
                formName: formKey,
                formSchema,
                data: values,
                formUtils,
            };

            formUtils.setForm(formContent);

            const payload = ExecuteScript({
                formContent: formContent,
                executionType: SCRIPT_TYPE.ON_LOAD,
                scripts,
                context: formUtils,
                contextName: 'form',
            });

            values = payload.data;

            if (!customFieldType) return values;

            const columns = await fetchCustomColumns();

            if (!IsEmptyObject(values?.custom_field_data)) {
                values.custom_field_data = parseMaskedDateValues(
                    values.custom_field_data,
                    columns as any[]
                );
                return values;
            }

            const data = getCustomFieldDefaultValues(columns);
            return {
                ...(values || {}),
                custom_field_data: data,
            };
        },
        resolver: joiResolver(
            Joi.object(getValidationSchema(formSchema)),
            getJoiValidationOptions()
        ),
        context,
        mode: 'onTouched',
        delayError: 1000,
    });

    const {
        isLoading,
        isSubmitting,
        isValidating,
        isDirty,
        errors: formErrors,
        isValid,
        isSubmitted,
        touchedFields,
    } = formState;

    useEffect(() => {
        return () => {
            toggleFormUpdated(false);
        };
    }, [toggleFormUpdated]);

    useEffect(() => {
        if (!formUtils?.self?.form) return;

        formUtils.setFormSchema(propsFormSchema);
        ExecuteScript({
            formContent: formUtils.getForm(),
            scripts,
            context: formUtils,
            contextName: 'form',
            executionType: SCRIPT_TYPE.ON_SCHEMA_LOAD,
        });
        ExecuteScript({
            formContent: formUtils.getForm(),
            scripts,
            context: formUtils,
            contextName: 'form',
            executionType: SCRIPT_TYPE.ON_FORM_SCHEMA_LOAD,
        });
    }, [formUtils, propsFormSchema, scripts]);

    useDeepCompareEffect(() => {
        setTempFormSchema(propsFormSchema);
    }, [propsFormSchema]);

    useUpdateEffect(() => {
        if (isFormUpdated) return;
        if (initial && isDirty) {
            // initial variable indicate initially not any change value
            setInitial(false);
            toggleFormUpdated(true);
        }

        if (!IsEmptyObject(touchedFields)) toggleFormUpdated(true);
    }, [touchedFields, getValues(), isDirty]);

    const handleFormData: FormBuilderHandleFormDataType = useCallback(
        (key, value, shouldValidate = true) => {
            setValue(key, value, {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate,
            });
        },
        [setValue]
    );

    const errors = (() => {
        const errorObj: ObjectDto = {};

        Object.keys(formErrors).forEach((error) => {
            if (formErrors[error].message) {
                errorObj[error] = formErrors[error].message;
                return;
            }

            if (IsObjectHaveKeys(formErrors[error])) {
                errorObj[error] = {};
                Object.keys(formErrors[error]).forEach((errorKey) => {
                    errorObj[error][errorKey] =
                        formErrors[error][errorKey].message;
                });
            }
        });

        return errorObj;
    })();

    const hasError: FormBuilderHasErrorType = useCallback(
        (key) => {
            if (!key) return !IsEmptyObject(errors);
            return typeof errors[key] !== 'undefined';
        },
        [errors]
    );

    const setError = (errors: ObjectDto) => {
        if (!errors || IsEmptyObject(errors)) return;

        Object.keys(errors).forEach((errorKey, idx) =>
            setFormHookError(
                errorKey,
                { message: errors[errorKey] },
                { shouldFocus: idx === 0 }
            )
        );
    };

    const handleAsyncValidation = useCallback(
        (validationFn: string, elementKey: string, forceTouch?: boolean) => {
            /**
             * Asynchronously validates a value and calls "next" with a boolean value representing if the validation passed.
             *
             * @param {any} value - The value to validate.
             * @param {Function} next - A callback function to call after the validation is complete.
             * @return {void} This function does not return anything.
             */
            const asyncValidation = async (
                value: any,
                next: (state?: boolean) => void = () => {}
            ) => {
                const fieldState = getFieldState(elementKey, formState);
                const canValidate =
                    (fieldState.isTouched || forceTouch) &&
                    (await validateFields(elementKey));

                const fn = functionRegistry[validationFn];

                if (!IsFunction(fn) || !canValidate) {
                    setAsyncValidated({ [elementKey]: false });
                    next(false);
                    return false;
                }

                setIsAsyncValidating(true);

                const result = await fn(value, getValues, handleFormData);

                setIsAsyncValidating(false);

                if (typeof result === 'string') {
                    setFormHookError(elementKey, { message: result });
                    setAsyncValidated({ [elementKey]: false });
                    next(false);
                    return false;
                }

                setAsyncValidated({ [elementKey]: true });
                next(true);
                return true;
            };

            if (!functionRegistry?.[validationFn]) return;
            return asyncValidation;
        },
        [
            formState,
            functionRegistry,
            getFieldState,
            getValues,
            handleFormData,
            setAsyncValidated,
            setFormHookError,
            setIsAsyncValidating,
            validateFields,
        ]
    );

    const postSubmitAsyncValidation = async () => {
        const asyncValidations = Object.keys(formSchema)
            .map((elementKey) => {
                const validationFn = formSchema[elementKey].asyncValidation;
                if (
                    !validationFn ||
                    !functionRegistry?.[validationFn] ||
                    asyncValidated[elementKey]
                )
                    return null;

                const fn = handleAsyncValidation(
                    validationFn,
                    elementKey,
                    true
                );

                if (IsFunction(fn)) return fn(getValues(elementKey));
                return null;
            })
            .filter(Boolean);

        const result = await Promise.all(asyncValidations);

        return result.every(Boolean);
    };

    const handleSubmit = useCallback(
        async (e?: any) => {
            let result: any = false;

            await handleFormHookSubmit(async (values: any) => {
                let body = values;

                const validationRes = await postSubmitAsyncValidation();

                if (!IsFunction(onSubmit) || !validationRes) return;

                formUtils.set('preventSubmit', false);
                formUtils.setBody(body);
                formUtils.setContext(context || {});

                const updatedPayload = ExecuteScript({
                    formContent: formUtils.getForm(),
                    scripts,
                    context: formUtils,
                    contextName: 'form',
                    executionType: SCRIPT_TYPE.ON_SUBMIT,
                });

                if (formUtils.get('preventSubmit')) {
                    return;
                }

                body = updatedPayload?.body;

                // convert custom field date to api date format
                if (customFieldType && body?.custom_field_data) {
                    body.custom_field_data = sanitizedDateValues(
                        body?.custom_field_data
                    );

                    // actually it occurring in choice type value when custom field in inactive @todo Rumesh sir you have better idea then you can change it.
                    const sanitizeCustomFieldObjectValueToId = () => {
                        const customFieldData = {
                            ...(body?.custom_field_data || {}),
                        };
                        for (const [
                            customFieldKey,
                            customFieldValue,
                        ] of Object.entries(body?.custom_field_data)) {
                            if (
                                // added date check because date is object type
                                !isDate(customFieldValue) &&
                                typeof customFieldValue === 'object'
                            ) {
                                customFieldData[customFieldKey] = (
                                    customFieldValue as ObjectDto
                                )?.id;
                            }

                            body.custom_field_data = customFieldData;
                        }
                    };
                    sanitizeCustomFieldObjectValueToId();
                }

                result = await onSubmit(body, {
                    isCreateAnother,
                    setError,
                    reset,
                });

                formUtils.setResponseValue(result);

                ExecuteScript({
                    formContent: formUtils.getForm(),
                    scripts,
                    context: formUtils,
                    contextName: 'form',
                    executionType: SCRIPT_TYPE.POST_SUBMISSION,
                });
            })(e);

            if (isCreateAnother && result !== false) {
                refetchListSelectInput(); // it for only pwa list select input
                reset(undefined, {
                    keepDefaultValues: true,
                });
                toggleFormUpdated(false);
                setTimeout(() => {
                    setFocus?.(Object.keys(formSchema)[0]);
                }, 200);
            }
        },

        // eslint-disable-next-line react-hooks/exhaustive-deps
        [
            customFieldType,
            formUtils,
            handleFormHookSubmit,
            isCreateAnother,
            onSubmit,
            reset,
            sanitizedDateValues,
            scripts,
            setError,
            toggleFormUpdated,
        ]
    );

    const renderFormFields: FormBuilderRenderElement = useCallback(
        (elementKey, propSchema, props = {}) => {
            let schema = propSchema || formSchema[elementKey];
            if (schema?.visible === false) return;

            if (!schema) {
                const keySegment = elementKey.split('.');
                if (keySegment.length < 2) return;

                schema = AccessNestedObject(
                    formSchema,
                    `${keySegment[0]}.formSchema.${keySegment[1]}`
                );
                if (!schema) return;
            }

            if (schema.type === 'object' && schema.formSchema) {
                const objSchema = schema.formSchema || {};
                return Object.keys(objSchema).map((objSchemaKey) => {
                    return renderFormFields(
                        `${elementKey}.${objSchemaKey}`,
                        objSchema[objSchemaKey]
                    );
                });
            }

            if (schema.type === 'card') return;
            if (schema.visible === false) return;

            const fieldState = getFieldState(elementKey, formState);
            const hasError = fieldState.isTouched && !!fieldState.error;

            const messageComponent =
                props.messageComponent || schema.messageComponent;
            return formElements({
                ...schema,
                key: elementKey,
                label: schema.labelComponent || schema.label,
                onAsyncBlur: handleAsyncValidation(
                    schema.asyncValidation,
                    elementKey
                ),
                onChange: (value: any) => {
                    formUtils.OnChangeListener({
                        column: elementKey,
                        value,
                        valueObj: getValues(),
                    });

                    setAsyncValidated({ [elementKey]: false });
                },
                ...props,
                messageComponent: IsFunction(messageComponent)
                    ? messageComponent(getValues(elementKey), {
                          errors,
                          hasError,
                          getValues,
                          handleFormData,
                      })
                    : null,
                control,
                handleFormData,
            });
        },
        [
            formSchema,
            getFieldState,
            formState,
            handleAsyncValidation,
            getValues,
            errors,
            handleFormData,
            control,
            formUtils,
            setAsyncValidated,
        ]
    );

    const setFormData = useCallback(
        (
            data: ObjectDto | ((prev: ObjectDto) => ObjectDto),
            validate: boolean = false
        ) => {
            let newData = {};

            if (IsFunction(data)) {
                newData = data(getValues());
            } else {
                newData = data;
            }

            Object.keys(newData).forEach((key) => {
                setValue(key, newData[key], {
                    shouldDirty: true,
                    shouldTouch: newData[key] !== undefined,
                    shouldValidate: validate,
                });
            });
        },
        [getValues, setValue]
    );

    const disableSubmit = (isSubmitted && !isValid) || isAsyncValidating;

    const formUpdated = useCallback(
        (payload: FormUtilSelfObj['form'] & { updateState: boolean }) => {
            const { updateState, formSchema: scriptFormSchema, data } = payload;

            if (updateState) {
                const newSchema = { ...formSchema };

                Object.keys(newSchema).forEach((schemaKey) => {
                    newSchema[schemaKey] = {
                        ...newSchema[schemaKey],
                        ...(scriptFormSchema[schemaKey] || {}),
                    };
                });
                setTempFormSchema(newSchema);
                setFormData(data);
            }
        },
        [setFormData, formSchema]
    );

    useEffect(() => {
        SubscribeToEvent({
            eventName: 'formChanged-' + (formKey || ''),
            callback: formUpdated,
        });
        return () => {
            UnsubscribeEvent({
                eventName: 'formChanged-' + formKey,
                callback: formUpdated,
            });
        };
    }, [formKey, formUpdated]);

    useImperativeHandle(
        ref,
        () => ({
            formDataUpdated: isFormUpdated,
            errors,
            getValues,
            handleSubmit,
            handleFormData,
            renderFormFields,
            validateFields,
            setFormData,
            reset,
        }),
        [
            isFormUpdated,
            errors,
            getValues,
            handleSubmit,
            handleFormData,
            renderFormFields,
            validateFields,
            setFormData,
            reset,
        ]
    );

    useWizardEvent({
        isSubmitting,
        handleSubmit: handleSubmit,
        disableSubmit,
        formKey,
        dependencies: [
            validateFields,
            handleFormHookSubmit,
            formSchema,
            onSubmit,
        ],
    });

    return {
        formSchema,
        isLoading,
        isSubmitting,
        isValidating,
        errors,
        disableSubmit,
        touched: touchedFields,
        formDataUpdated: isFormUpdated,
        isCreateAnother,
        setCreateAnother,
        getValues,
        hasError,
        setError,
        handleSubmit,
        handleFormData,
        renderFormFields,
        toggleFormUpdated,
        validateFields,
        setFormData,
        customFieldSchema: customFieldSchema,
        formUtils,
        reset,
        watch,
    };
};

export const refetchListSelectInput = () => {
    StoreEvent({
        eventName: GENERIC_LIST_SELECT_REFETCH,
    });
};
