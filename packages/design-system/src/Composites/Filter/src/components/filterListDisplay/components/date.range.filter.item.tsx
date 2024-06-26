import { useMemo } from 'react';

import {
    Capitalize,
    EmptyFunction,
    FormatDisplayDate,
    IsEmptyObject,
    IsFunction,
} from '@finnoto/core';

import { DateRangeFilterUtils } from '../../../../../../Components';
import { cn } from '../../../../../../Utils/common.ui.utils';
import { FilterItemWrapper } from './filterItem.wrapper';

export const DateRangeFilterItem = ({
    className,
    title,
    removeFilterData = EmptyFunction,
    renderFilter,
    isClearable = true,
    value,
}: any) => {
    const date = DateRangeFilterUtils.absoluteValue(value);

    const literalDate = useMemo(() => {
        if (!value) return;
        if (date?.name) return date;
    }, [date, value]);
    const min = useMemo(
        () => FormatDisplayDate(date?.startDate),
        [date?.startDate]
    );
    const max = useMemo(
        () => FormatDisplayDate(date?.endDate),
        [date?.endDate]
    );

    if (IsFunction(renderFilter))
        return (
            <>
                {renderFilter(
                    {
                        min,
                        max,
                    },
                    removeFilterData
                )}
            </>
        );
    if (!value) return null;
    if (!IsEmptyObject(literalDate))
        return (
            <FilterItemWrapper
                className={cn('gap-1', className)}
                {...{ isClearable }}
                onClick={() => {
                    if (isClearable) removeFilterData();
                }}
            >
                {Capitalize(title) || 'Date'}
                {' = '}
                {literalDate?.name}
            </FilterItemWrapper>
        );
    return (
        <FilterItemWrapper
            className={cn('gap-1', className)}
            onClick={() => {
                if (isClearable) removeFilterData();
            }}
            {...{ isClearable }}
        >
            <span>
                {Capitalize(title)}
                {' > '}
            </span>
            {min} {' to '}
            {max}
        </FilterItemWrapper>
    );
};
