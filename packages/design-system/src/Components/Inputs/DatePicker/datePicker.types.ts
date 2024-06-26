// import { getFinancialDate } from '@finnoto/core';

import {
    addMonths,
    endOfDay,
    endOfMonth,
    endOfQuarter,
    endOfWeek,
    endOfYear,
    startOfDay,
    startOfMonth,
    startOfQuarter,
    startOfWeek,
    startOfYear,
    subDays,
    subMonths,
    subQuarters,
    subYears,
} from 'date-fns';
import { DateRangePickerProps } from 'react-date-range';

import { APIDateFormat } from '@finnoto/core';

import { PopoverProps } from '../../Surfaces/Popover/popover.types';

function getFinancialDate(date: Date) {
    const month = date.getMonth();
    if (month < 3) {
        return subYears(date, 1);
    }
    return date;
}

export interface DatePickerInterface {
    value?: string | Date | RangeProps;
    minDate?: string | Date;
    maxDate?: string | Date;
    disabled?: boolean;
    rangeSelector?: boolean;
    withRangeSelect?: boolean;
    withRangeSelectOnly?: boolean;
    customRanges?: RangeProps[];
    onRangeSelect?: (range: RangeProps) => void;
    onChange?: (date: Date) => void;
    offsetY?: number;
}

export interface RangeProps {
    name?: string;
    startDate: Date;
    endDate: Date;
    valueKey?: string;
}

export interface DatePickerProps extends DatePickerInterface {
    children: React.ReactNode;
    side?: PopoverProps['side'];
    align?: PopoverProps['align'];
}

export interface RenderDateProps extends DateRangePickerProps {
    value?: string | Date | RangeProps;
    withRangeSelect?: boolean;
    withRangeSelectOnly?: boolean;
    customRanges?: RangeProps[];
    onDateChange?: (date: Date) => void;
    onRangeSelect?: (range: RangeProps) => void;
    handleClose?: () => void;
    [key: string]: any;
}

export interface DatePickerInputProps extends DatePickerInterface {
    inputClassName?: any;
    label?: string;
    inputValue?: any;
    placeholder?: string;
    error?: string;
    bordered?: boolean;
    isRequired?: boolean;
    translate?: boolean;
    calender_icon?: boolean;
    customDisplay?: any;
    clearable?: boolean;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'normal';
    onBlur?(e: any): void;
    dateWrapperClassName?: string;
    iconSide?: 'left' | 'right';
}

const currentDate = new Date();

export const defaultRanges: RangeProps[] = [
    {
        name: 'Today',
        startDate: startOfDay(currentDate),
        endDate: endOfDay(currentDate),
        valueKey: 'today',
    },
    {
        name: 'Yesterday',
        startDate: startOfDay(subDays(currentDate, 1)),
        endDate: endOfDay(subDays(currentDate, 1)),
        valueKey: 'yesterday',
    },
    {
        name: 'This Week',
        startDate: startOfWeek(currentDate),
        endDate: endOfWeek(currentDate),
        valueKey: 'week',
    },
    {
        name: 'Last Week',
        startDate: subDays(startOfWeek(currentDate), 7),
        endDate: subDays(endOfWeek(currentDate), 7),
        valueKey: 'last_week',
    },
    {
        name: 'This Month',
        startDate: startOfMonth(currentDate),
        endDate: endOfMonth(currentDate),
        valueKey: 'month',
    },
    {
        name: 'Last Month',
        startDate: startOfMonth(subMonths(currentDate, 1)),
        endDate: endOfMonth(subMonths(currentDate, 1)),
        valueKey: 'last_month',
    },
    {
        name: 'Current Quarter',
        startDate: startOfQuarter(currentDate),
        endDate: endOfQuarter(currentDate),
        valueKey: 'current_quarter',
    },
    {
        name: 'Previous Quarter',
        startDate: subQuarters(startOfQuarter(currentDate), 1),
        endDate: subQuarters(endOfQuarter(currentDate), 1),
        valueKey: 'previous_quarter',
    },
    {
        name: 'This Year',
        startDate: startOfYear(currentDate),
        endDate: endOfYear(currentDate),
        valueKey: 'year',
    },
    {
        name: 'Current FY',
        startDate: addMonths(startOfYear(getFinancialDate(currentDate)), 3),
        endDate: addMonths(endOfYear(getFinancialDate(currentDate)), 3),
        valueKey: 'current_fy',
    },
    {
        name: 'Previous FY',
        startDate: subMonths(startOfYear(getFinancialDate(currentDate)), 9),
        endDate: subMonths(endOfYear(getFinancialDate(currentDate)), 9),
        valueKey: 'previous_fy',
    },
];

export const getRangeDateName = ({ startDate, endDate }: any) => {
    if (!startDate || !endDate) return null;
    const target_startDate = APIDateFormat({ date: startDate });
    const target_endDate = APIDateFormat({ date: endDate });
    for (let range of defaultRanges) {
        const startDate = APIDateFormat({ date: range.startDate });
        const endDate = APIDateFormat({ date: range.endDate });
        if (startDate === target_startDate && endDate === target_endDate)
            return range?.name;
    }
    return 'Custom Date';
};
