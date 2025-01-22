import { useCallback, useImperativeHandle, useState } from 'react';
import Joi from 'joi';
import { useForm } from 'react-hook-form';
import { useSetState, useToggle } from 'react-use';

import {
    accessNestedObject,
    capitalize,
    isEmptyObject,
    isFunction,
    isUndefined,
    isValidString,
    ObjectDto,
} from '@slabs/ds-utils';

import { formBuilderElements } from '@/components/formElements/formBuilderElements.component';
import { INDIA_MOBILE_NUMBER_REGEX } from '@/constants/regex.constants';
import {
    FormBuilderFormSchema,
    FormBuilderHandleFormDataType,
    FormBuilderHasErrorType,
    FormBuilderProps,
    FormBuilderRenderElement,
} from '@/types';
import { getJoiValidationOptions } from '@/utils/joi.validation.utils';
import { joiResolver } from '@hookform/resolvers/joi';

export const useFormBuilder = (
    {
        initValues = {},
        formSchema = {},
        functionRegistry,
        onSubmit,
        formKey,
        context,
        payload,
    }: FormBuilderProps,
    ref?: any
) => {
    const [asyncValidated, setAsyncValidated] = useSetState<ObjectDto>({});
    const [isCreateAnother, setCreateAnother] = useToggle(false);
    const [isAsyncValidating, setIsAsyncValidating] = useToggle(false);
    const [initial, setInitial] = useState(true);
    const [scripts, setScripts] = useState<any>([]);

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

                    if (!isUndefined(schema.min) && schema.type === 'number') {
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
                        .trim()
                        .message('Please enter a valid email address.');
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

                    if (!isUndefined(schema.minLength)) {
                        validation = validation.min(schema.minLength);
                    }
                    if (!isUndefined(schema.maxLength)) {
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
                        'single_file_upload',
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

                if (schema.refKey && isValidString(schema.refKey)) {
                    validation = Joi.any()
                        .equal(Joi.ref(schema.refKey))
                        .messages({ 'any.only': '{{#label}} does not match' });
                }
                if (
                    schema.notValidRefKey &&
                    isValidString(schema.notValidRefKey)
                ) {
                    validation = Joi.any()
                        .invalid(Joi.ref(schema.notValidRefKey))
                        .messages({
                            'any.invalid':
                                schema.customErrorMessage ||
                                `{{#label}} can't be same as  ${capitalize(
                                    schema.notValidRefKey.split('_').join(' ')
                                )}`,
                        });
                }

                validation = validation.empty(null).empty('');
                if (!schema?.required) validation = validation.allow(null);

                if (schema.required) {
                    validation = validation.required();
                } else {
                    if (!isUndefined(schema.allow_validation)) {
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
                        capitalize(elementKey)
                );

                newValidationSchema[elementKey] = validation;
            });

            return newValidationSchema;
        },
        []
    );

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
            let values = isFunction(initValues)
                ? await initValues()
                : structuredClone(initValues);

            return values;
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

            if (!isEmptyObject(formErrors[error])) {
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
            if (!key) return !isEmptyObject(errors);
            return typeof errors[key] !== 'undefined';
        },
        [errors]
    );

    const setError = useCallback(
        (errors: ObjectDto) => {
            if (!errors || isEmptyObject(errors)) return;

            Object.keys(errors).forEach((errorKey, idx) =>
                setFormHookError(
                    errorKey,
                    { message: errors[errorKey] },
                    { shouldFocus: idx === 0 }
                )
            );
        },
        [setFormHookError]
    );

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

                const fn = functionRegistry?.[validationFn];

                if (!isFunction(fn) || !canValidate) {
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

                if (isFunction(fn)) return fn(getValues(elementKey));
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

                if (!isFunction(onSubmit) || !validationRes) return;

                result = await onSubmit(body, {
                    isCreateAnother,
                    setError,
                    reset,
                });
            })(e);

            if (isCreateAnother && result !== false) {
                reset(undefined, {
                    keepDefaultValues: true,
                });
                setTimeout(() => {
                    setFocus?.(Object.keys(formSchema)[0]);
                }, 200);
            }
        },

        [
            handleFormHookSubmit,
            isCreateAnother,
            onSubmit,
            reset,
            scripts,
            setError,
        ]
    );
    const renderFormFields: FormBuilderRenderElement = useCallback(
        (elementKey, propSchema, props = {}) => {
            let schema = propSchema || formSchema[elementKey];

            if (schema?.visible === false) return;

            if (!schema) {
                const keySegment = elementKey.split('.');
                if (keySegment.length < 2) return;

                schema = accessNestedObject(
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
            const isRequired =
                schema?.required ||
                schema?.isRequired ||
                props?.isRequired ||
                props?.required;
            return formBuilderElements({
                ...schema,
                payload,
                key: elementKey,
                label: schema.labelComponent || schema.label,
                onAsyncBlur: schema.asyncValidation
                    ? handleAsyncValidation(schema.asyncValidation, elementKey)
                    : undefined,

                onChange: (value: any) => {
                    setAsyncValidated({ [elementKey]: false });
                },
                disabled: schema.disabled,

                ...props,
                required: isRequired,
                isRequired,
                min: undefined,
                messageComponent: isFunction(messageComponent)
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
            watch,
            getFieldState,
            formState,
            handleAsyncValidation,
            getValues,
            errors,
            handleFormData,
            control,
            setAsyncValidated,
        ]
    );

    const setFormData = useCallback(
        (
            data: ObjectDto | ((prev: ObjectDto) => ObjectDto),
            validate: boolean = false
        ) => {
            let newData: ObjectDto = {};

            if (isFunction(data)) {
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

    useImperativeHandle(
        ref,
        () => ({
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

    return {
        formSchema,
        isLoading,
        isSubmitting,
        isValidating,
        errors,
        disableSubmit,
        touched: touchedFields,
        isCreateAnother,
        setCreateAnother,
        getValues,
        hasError,
        setError,
        handleSubmit,
        handleFormData,
        renderFormFields,
        validateFields,
        setFormData,
        reset,
        watch,
    };
};
