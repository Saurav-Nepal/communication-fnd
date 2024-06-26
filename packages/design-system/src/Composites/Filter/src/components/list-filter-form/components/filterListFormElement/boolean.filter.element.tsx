import { useMemo } from 'react';

import { BooleanEnum, IsUndefinedOrNull } from '@finnoto/core';

import { BooleanSelectFilter } from '../../../../../../../Components/Inputs/SelectBox/boolean.select.filter';
import { BooleanFilterProps } from '../../list.form.filter.types';
import { useListFormFilterContext } from '../../provider/list.form.filter.provider';

export const BooleanFilterElement = ({
    filter,
}: {
    filter: BooleanFilterProps;
}) => {
    const { getValues, handleFilterData } = useListFormFilterContext();

    const value = useMemo(() => {
        const newValue = getValues(filter?.key);
        if (IsUndefinedOrNull(newValue)) return undefined;
        return newValue ? BooleanEnum.TRUE : BooleanEnum.FALSE;
    }, [filter?.key, getValues]);
    return (
        <BooleanSelectFilter
            value={value}
            onChange={(option) => {
                handleFilterData({
                    [filter?.key]: BooleanEnum.TRUE === option?.value,
                });
            }}
            positiveLabel={filter?.positiveLabel}
            negativeLabel={filter?.negativeLabel}
            placeholder={`Select ${filter?.title} ...`}
            mainClassName='flex-1 single-select-filter '
            size='sm'
        />
    );
};
