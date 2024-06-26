import { format } from 'date-fns';

import { API_DATE_TIME_FORMAT } from '@finnoto/core';

import { DatePickerInterface, defaultRanges } from '../DatePicker';

export interface DateRangePickerInterface
    extends Omit<DatePickerInterface, 'error' | 'onChange' | 'value'> {
    format?: string;
    value: dateFilterTransformerType;
    onChange?: (date: dateFilterTransformerType) => void;
    className?: string;
}

export type dateFilterTransformerType = {
    today?: boolean;
    yesterday?: boolean;
    week?: boolean;
    last_week?: boolean;
    month?: boolean;
    current_quarter?: boolean;
    previous_quarter?: boolean;
    year?: boolean;
    current_fy?: boolean;
    previous_fy?: boolean;
    range?: dateRangeFilterType;
};
export type dateRangeFilterType = {
    min: string;
    max: string;
};

export const DISPLAY_DATE_FILTER_FORMAT = 'MMM dd, yyyy';

export const dateRangesObject = defaultRanges?.reduce((prev, curr) => {
    const { valueKey, ...rest } = curr;
    prev[valueKey] = {
        ...prev,
        ...rest,
    };
    return prev;
}, {});

export const getDateRangeDescription = (date: dateFilterTransformerType) => {
    if (date?.month) return 'Last month';
    if (date?.year) return 'Last year';
    if (date?.week) return 'Last week';
    if (date?.today) return 'Today';
    if (date?.yesterday) return 'Yesterday';
    if (date?.last_week) return 'Last week';
    if (date?.current_quarter) return 'Current quarter';
    if (date?.previous_quarter) return 'Previous quarter';
    if (date?.current_fy) return 'Current financial year';
    if (date?.previous_fy) return 'Previous financial year';
    if (date?.range) {
        const { min, max } = date.range;
        const formattedMin = format(new Date(min), DISPLAY_DATE_FILTER_FORMAT);
        const formattedMax = format(new Date(max), DISPLAY_DATE_FILTER_FORMAT);
        return `${formattedMin} - ${formattedMax}`;
    }
    return '';
};
