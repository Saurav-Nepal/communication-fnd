import { useCallback } from 'react';

import { ParseToSelectBoxOption } from '../../Utils/select.utils';
import { FetchData } from '../useFetchData.hook';

export const useAsyncFilterOption = () => {
    const getAsyncFilterOption = useCallback(async (filter: any) => {
        if (
            !['multi_checkbox', 'multi_select', 'select'].includes(filter?.type)
        )
            return filter;

        const {
            controller,
            method = 'find',
            labelKey = 'name',
            valueKey = 'id',
            subLabelKey = 'identifier',
            isAsync,
            ...rest
        } = filter;

        if (!controller || !isAsync) return filter;
        const { response, success } = await FetchData({
            className: controller,
            method,
            ...rest,
        });

        if (!success)
            return {
                ...filter,
                options: [],
            };
        let records = [];

        if (response?.records) records = response?.records;
        else records = response;

        return {
            ...filter,
            options: ParseToSelectBoxOption(records, valueKey, labelKey, {
                subLabel: subLabelKey,
            }),
        };
    }, []);
    return {
        getAsyncFilterOption,
    };
};
