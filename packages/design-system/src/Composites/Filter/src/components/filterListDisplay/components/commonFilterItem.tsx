import { useMemo } from 'react';

import { Capitalize } from '@finnoto/core';

import { cn } from '../../../../../../Utils/common.ui.utils';
import { FilterItemWrapper } from './filterItem.wrapper';

export const CommonFilterItem = ({
    title,
    value,
    removeFilterData,
    isClearable,
    className,
    filter,
    withoutTitleAndOperator,
}: any) => {
    const displayOperator = useMemo(() => {
        if (!filter?.isDefinitionQueryFilter) return '>';
        if (filter?.selectedOperator) return filter?.selectedOperator;

        return '> ';
    }, [filter?.isDefinitionQueryFilter, filter?.selectedOperator]);

    return (
        <FilterItemWrapper
            className={cn('gap-1', className)}
            isClearable={isClearable}
            onClick={() => removeFilterData(filter.key)}
        >
            {!withoutTitleAndOperator && (
                <span className='capitalize'>
                    {Capitalize(title)} {displayOperator}
                </span>
            )}
            <span className='!font-normal'>{value}</span>
        </FilterItemWrapper>
    );
};
