import { useMemo, useState } from 'react';

import {
    CURRENT_EMPLOYEE,
    CURRENT_USER,
    EmptyFunction,
    GetObjectFromArray,
    IsArray,
    IsEmptyArray,
    IsFunction,
    ParseToSelectBoxOption,
    useCustomQueryList,
} from '@finnoto/core';

import { CheckBoxOptionFilterItem } from './checkboxFilterItem';
import { FilterItemWrapper } from './filterItem.wrapper';

export const MultiSelectFilterItem = ({
    data,
    filter,
    removeFilterData = EmptyFunction,
    className,
}: any) => {
    const [tempOptions, setTempOptions] = useState([]);
    const ids = useMemo(
        () => filter?.idsKey || filter?.queryIds || 'ids',
        [filter?.idsKey, filter?.queryIds]
    );
    const values = useMemo(() => {
        if (!data) return [];

        return IsArray(data) ? data : [data];
    }, [data]);

    const { data: options } = useCustomQueryList({
        type: filter?.controller_type,
        method: 'find',
        classParams: {
            [ids]: values,
            limit: 10,
        },
        methodParams: filter?.methodParams,
        disableNetwork: !IsArray(values) || !values,
        queryOptions: {
            onSuccess(data) {
                setTempOptions(data);
            },
        },
    });

    const sanitizedOptions = useMemo(() => {
        let result = ParseToSelectBoxOption(
            [...(options || []), ...(tempOptions || [])],
            filter?.valueKey || 'id',
            filter.labelKey || 'name'
        );

        if (
            values?.includes(CURRENT_USER) ||
            values?.includes(CURRENT_EMPLOYEE)
        ) {
            if (ids === 'user_ids')
                return [
                    ...result,
                    { label: 'Current User', value: CURRENT_USER },
                ];

            return [
                ...result,
                { label: 'Current User', value: CURRENT_EMPLOYEE },
            ];
        }

        return result;
    }, [filter.labelKey, filter?.valueKey, ids, options, tempOptions, values]);

    return (
        <CheckBoxOptionFilterItem
            {...{
                filter: {
                    ...filter,
                    options: sanitizedOptions,
                },
                data: values,
                removeFilterData,
                className,
            }}
        />
    );
};

export const MultiObjectSelectFilterItem = ({
    data = {},
    filter,
    removeFilterData = EmptyFunction,
}: any) => {
    const labels = useMemo(() => {
        const values = IsArray(data) ? data : [data];
        return values
            .map((value) => {
                const el = GetObjectFromArray(filter?.options, 'value', value);

                return el?.label;
            })
            .join(', ');
    }, [data, filter?.options]);
    const handleRemoveFilter = () => removeFilterData(filter?.key);
    if (IsFunction(filter?.renderFilter))
        return <>{filter?.renderFilter(data, handleRemoveFilter)}</>;

    return (
        <FilterItemWrapper onClick={() => removeFilterData(filter.key)}>
            <span>
                {filter?.title} {'> '}
            </span>
            {labels}{' '}
        </FilterItemWrapper>
    );
};
