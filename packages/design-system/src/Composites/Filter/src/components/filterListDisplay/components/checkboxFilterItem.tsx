import { useMemo } from 'react';

import { EmptyFunction, GetObjectFromArray, IsFunction } from '@finnoto/core';

import { cn } from '../../../../../../Utils/common.ui.utils';
import { FilterItemWrapper } from './filterItem.wrapper';

export const CheckboxFilterItem = ({
    data = [],
    filter,
    removeFilterData = EmptyFunction,
    className,
}: any) => {
    const handleRemoveFilter = () => removeFilterData(filter?.key);

    if (IsFunction(filter?.renderFilter))
        return <>{filter?.renderFilter(data, handleRemoveFilter)}</>;

    if ((filter?.groups || [])?.length > 0)
        return (
            <>
                {(filter?.groups || []).map((group) => {
                    if (!data[group?.key]) return null;
                    return (
                        <FilterItemWrapper
                            onClick={() => {
                                removeFilterData(group.key);
                            }}
                            key={group?.key}
                        >
                            {group?.name}
                        </FilterItemWrapper>
                    );
                })}
            </>
        );
    return (
        <SingleCheckBoxFilterItem
            {...{ data, removeFilterData, className }}
            filter={filter}
            key={filter?.key}
        />
    );
};

const SingleCheckBoxFilterItem = ({
    data,
    filter,
    removeFilterData = EmptyFunction,
    className,
}: any) => {
    const handleRemoveFilter = () => removeFilterData(filter?.key);
    if (IsFunction(filter?.renderFilter))
        return <>{filter?.renderFilter(data, handleRemoveFilter)}</>;
    if (!data) return <></>;

    return (
        <FilterItemWrapper
            className={className}
            onClick={() => removeFilterData(filter.key)}
        >
            {filter?.title}
        </FilterItemWrapper>
    );
};
export const CheckBoxOptionFilterItem = ({
    data,
    filter,
    removeFilterData,
    className,
}: any) => {
    const labels = useMemo(() => {
        return data
            .map((value) => {
                const el = GetObjectFromArray(filter?.options, 'value', value);
                return el?.label;
            })
            .join(', ');
    }, [data, filter?.options]);
    return (
        <FilterItemWrapper
            className={cn('gap-1', className)}
            onClick={() => removeFilterData(filter.key)}
            isClearable={!filter?.disableClear}
        >
            <span>
                {filter?.title}
                {' > '}
            </span>
            {labels}
        </FilterItemWrapper>
    );
};
