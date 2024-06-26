import { useCallback, useImperativeHandle, useRef } from 'react';

import {
    AccessNestedObject,
    FetchData,
    FormBuilderFormSchema,
    FormBuilderSubmitType,
    IsEmptyArray,
    IsFunction,
    IsUndefinedOrNull,
    ObjectDto,
    toastBackendError,
    useQueryClient,
} from '@finnoto/core';

import { Modal } from '../modal.utils';
import { SlidingPane } from '../slidingPane.utils';
import { ApiSchema, CommonFormProps } from './modal.formutil.dto';

export const useCommonFormHandler = (
    {
        apiSchema,
        modalType,
        initialValueId,
        initialValue,
        formSchema,
    }: {
        apiSchema: ApiSchema;
        modalType: CommonFormProps['modalType'];
        initialValue?: ObjectDto;
        initialValueId?: number;
        formSchema?: FormBuilderFormSchema;
    },
    ref: any
) => {
    const queryClient = useQueryClient();
    const formRef = useRef();

    const isEdit = !IsUndefinedOrNull(initialValueId);

    const {
        controller,
        methodParams,
        method,
        classParams: otherClassParams,
        onSuccess,
        queryKeys,
        sanitizeInitialData,
        sanitizeClassParamsData,
    } = apiSchema;

    useImperativeHandle(ref, () => formRef, []);

    const getInitialFormData = useCallback(async () => {
        if (!initialValueId) return initialValue || {};

        const { success, response } = await FetchData({
            className: controller,
            method: 'show',
            methodParams: initialValueId,
        });

        if (!success) {
            console.error(
                'FormBuilder Sanitize Initial Data:',
                'Error Finding The initial data'
            );
            return {};
        }

        if (IsFunction(sanitizeInitialData))
            return sanitizeInitialData(response, formSchema);

        return formatSchemaData(response, formSchema);
    }, [
        controller,
        formSchema,
        initialValue,
        initialValueId,
        sanitizeInitialData,
    ]);

    const onSubmit: FormBuilderSubmitType = async (
        values,
        { setError, isCreateAnother }
    ) => {
        let apiData = { ...values, ...otherClassParams };

        const classParams = IsFunction(sanitizeClassParamsData)
            ? sanitizeClassParamsData(apiData)
            : apiData;

        const { success, response } = await FetchData({
            className: controller,
            method,
            methodParams,
            classParams,
        });

        if (!success) {
            if (response?.columns) setError?.(response.columns);
            if (!response?.columns) toastBackendError(response);

            return false;
        }

        if (!IsEmptyArray(queryKeys)) {
            queryClient.invalidateQueries({
                queryKey: queryKeys,
            });
        }

        if (!isCreateAnother) {
            if (modalType === 'modal') Modal.close();
            if (modalType === 'slidingPanel') SlidingPane.close();
        }

        onSuccess?.(response as any);
    };

    return {
        isEdit,
        onSubmit,
        getInitialFormData,
    };
};

const formatSchemaData = (
    initialData: ObjectDto,
    formSchema: FormBuilderFormSchema
) => {
    const data = { id: initialData.id };

    Object.entries(formSchema)?.forEach(([key, values]: any) => {
        const value = AccessNestedObject(
            initialData,
            values?.initialDataKey,
            initialData[key]
        );

        data[key] = value;
    });

    return data;
};
