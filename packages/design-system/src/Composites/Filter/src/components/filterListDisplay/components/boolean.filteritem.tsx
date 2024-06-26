import { IsUndefinedOrNull } from '@finnoto/core';

import { BooleanFilterProps } from '../../list-filter-form';
import { FilterItemWrapper } from './filterItem.wrapper';

export const BooleanFilterItem = ({
    filter,
    value,
    removeFilterData,
    className,
}: {
    filter: BooleanFilterProps;
    value?: boolean;
    removeFilterData?: (key: string) => void;
    className?: string;
}) => {
    const positiveLabel = filter?.positiveLabel || 'Yes';
    const negativeLabel = filter?.negativeLabel || 'No';
    if (IsUndefinedOrNull(value)) return <></>;

    return (
        <FilterItemWrapper
            className={className}
            isClearable={!filter?.disableClear}
            onClick={() => removeFilterData(filter.key)}
        >
            <span>
                {filter?.title} {'> '}
            </span>
            {value ? positiveLabel : negativeLabel}
        </FilterItemWrapper>
    );
};
