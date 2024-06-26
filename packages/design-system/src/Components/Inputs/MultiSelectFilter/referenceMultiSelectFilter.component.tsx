import { useMemo, useState } from 'react';

import {
    ParseToSelectBoxOption,
    removeDuplicateValueFromArrayObject,
    useCustomQueryList,
} from '@finnoto/core';

import { MultiSelectFilter } from './multiSelectFilter.component';
import { ReferenceMultiSelectInterface } from './multiSelectFilter.types';

export const ReferenceMultiSelectFilter = ({
    controller_type,
    method = 'find',
    valueKey = 'id',
    labelKey = 'name',
    ignoreKey,
    subLabelKey = 'identifier',
    subLabelPrefix,
    minLength = 3,
    filterClassParams = {},
    initMethod,
    methodParams,
    searchKey = 'str',
    ignoreValues,
    queryIds = 'ids',

    ...rest
}: ReferenceMultiSelectInterface) => {
    const [search, setSearch] = useState<string>('');

    const [tempOptions, setTempOptions] = useState(rest?.options || []);
    const tempValueIds = useMemo(
        () => tempOptions.map((option) => option?.value),
        [tempOptions]
    );

    const valueIds = useMemo(() => {
        if (rest?.isCurrentUserShow) return rest?.value;
        return rest?.value?.map((value) => Number(value));
    }, [rest?.isCurrentUserShow, rest?.value]);

    const sanitizedIds = useMemo(() => {
        if (!tempValueIds?.length) return valueIds;
        return rest?.value?.filter((value) => !tempValueIds.includes(value));
    }, [rest?.value, tempValueIds, valueIds]);

    const getOnlyNumber = (value: any[]) => {
        return value
            ?.map((value) => value)
            .filter((value) => typeof value === 'number');
    };

    //remove value dependency for prevent multiple time fetching api when change value
    const queryParams = useMemo(() => {
        if (rest?.value)
            return {
                [queryIds]: search ? getOnlyNumber(rest?.value) : sanitizedIds,
                [searchKey]: search,
            };
        return {
            [searchKey]: search ?? undefined,
        };
    }, [queryIds, rest?.value, sanitizedIds, search, searchKey]);

    const { isLoading } = useCustomQueryList({
        type: controller_type,
        method,
        methodParams: methodParams,

        pagination: {
            limit: 10,
        },
        classParams: { ...queryParams, ...(filterClassParams || {}) },
        queryOptions: {
            onSuccess: (data) => {
                const newData: any = data?.records
                    ? data?.records || []
                    : data || [];
                let parseOptions = ParseToSelectBoxOption(
                    newData || [],
                    valueKey,
                    labelKey,
                    {
                        subLabel: subLabelKey,
                        isCurrentUserShow: rest?.isCurrentUserShow,
                    }
                );

                const notPresentOptions = [];
                parseOptions.forEach((option) => {
                    if (
                        !tempOptions
                            .flatMap((item) => item?.value)
                            .includes(option?.value)
                    ) {
                        notPresentOptions.push(option);
                    }
                });
                setTempOptions([...tempOptions, ...notPresentOptions]);
            },
        },
    });

    return (
        <MultiSelectFilter
            onAsyncSearch={(value) => {
                setSearch(value);
            }}
            {...rest}
            isAsync
            isLoading={isLoading}
            options={removeDuplicateValueFromArrayObject(tempOptions, 'value')}
            containerClassName='shadow-lg border-t-2'
        />
    );
};
