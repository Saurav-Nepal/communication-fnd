import { useMemo } from 'react';

import { getMonthOptions, IsUndefined } from '@finnoto/core';

import {
    SelectableDropdownMenu,
    SelectableDropdownMenuProps,
} from '../../../../../../Components';

export const MonthYearSelectFilter = ({
    filter,
    onChange,
    value,
    disableClear,
    endMonth,
    startMonth,
    ...props
}: Omit<SelectableDropdownMenuProps, 'options'> & {
    endMonth?: number;
    startMonth?: number;
    filter?: any;
}) => {
    const monthOptions = useMemo(() => {
        return getMonthOptions({
            endMonth: !IsUndefined(endMonth) ? endMonth : 6,
            startMonth: !IsUndefined(startMonth) ? startMonth + 1 : 6,
            monthFormat: 'MMMM',
        });
    }, [endMonth, startMonth]);

    return (
        <SelectableDropdownMenu
            {...props}
            onChange={onChange}
            options={monthOptions}
            value={value}
            isSearchDisable
            placeholder='Select Month'
            disableClear={disableClear || !!filter?.defaultValue}
        />
    );
};
