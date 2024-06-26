import { useCallback } from 'react';

import {
    AccessNestedObject,
    EmptyFunction,
    GetObjectFromArray,
    IsFunction,
    useCustomQueryDetail,
} from '@finnoto/core';

import { cn } from '../../../../../../Utils/common.ui.utils';
import { FilterItemWrapper } from './filterItem.wrapper';

export const SelectFilterItem = ({
    data,
    filter,
    removeFilterData = EmptyFunction,
    className,
}: any) => {
    const { data: detail = {} } = useCustomQueryDetail({
        type: filter?.controller_type,
        disableNetwork: !filter?.controller_type && !data,
        methodParams: data,
    });

    const renderLabel = useCallback(() => {
        if (filter?.isVisible === false) return data;
        if (filter?.controller_type) {
            return (
                AccessNestedObject(
                    detail,
                    filter?.detailKey || filter?.labelKey || 'name'
                ) || data
            );
        }
        return GetObjectFromArray(filter?.options, 'value', data)?.label;
    }, [
        data,
        detail,
        filter?.controller_type,
        filter?.detailKey,
        filter?.isVisible,
        filter?.labelKey,
        filter?.options,
    ]);

    const handleRemoveFilter = () => removeFilterData(filter?.key);
    if (IsFunction(filter?.renderFilter))
        return <>{filter?.renderFilter(data, handleRemoveFilter)}</>;

    return (
        <FilterItemWrapper
            className={cn('gap-1', className)}
            isClearable={!filter.disableClear}
            onClick={() => removeFilterData(filter.key)}
        >
            <span>
                {filter?.title || filter?.name} {'> '}
            </span>

            {renderLabel()}
        </FilterItemWrapper>
    );
};
