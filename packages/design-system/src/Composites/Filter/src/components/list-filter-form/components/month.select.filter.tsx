import { format } from 'date-fns';
import { useMemo } from 'react';

import { convertToPluralDigit } from '@finnoto/core';

import { SelectableDropdownMenu } from '../../../../../../Components';

export const MonthSelectFilter = ({
    filter,
    onChange,
    value,
    disableClear,
    endMonth,
    startMonth,
    children,
    ...props
}: any) => {
    const monthOptions = useMemo(() => {
        const options = getOptions();
        return options;
    }, []);

    return (
        <SelectableDropdownMenu
            {...props}
            onChange={onChange}
            options={monthOptions}
            value={value}
            isSearchDisable
            placeholder='Select Month'
            disableClear={disableClear || !!filter?.defaultValue}
        >
            {children}
        </SelectableDropdownMenu>
    );
};

const getOptions = () => {
    const options = [];
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const formatMonthYear = (year, month) => ({
        label:
            month === currentMonth && year === currentYear
                ? 'This Month'
                : monthsObject[month] + ' ' + year,
        value: Number(
            format(new Date(`${year}-${convertToPluralDigit(month)}`), 'yyyyMM')
        ),
    });

    // Previous year's months from next month to December
    for (let month = currentMonth + 1; month <= 12; month++) {
        options.push(formatMonthYear(currentYear - 1, month));
    }

    // Current year's months from January to the current month
    for (let month = 1; month <= currentMonth; month++) {
        options.push(formatMonthYear(currentYear, month));
    }

    return options;
};

// Assume monthsObject and convertToPluralDigit are defined elsewhere

export const monthsObject = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December',
};
