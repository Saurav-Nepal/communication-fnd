import React from 'react';
import { addMinutes, format, isDate, isValid, parse } from 'date-fns';

import { cn, isEmptyArray, isUndefinedOrNull } from '@slabs/ds-utils';

type SizeTypes = 'xs' | 'sm' | 'md' | 'lg' | 'extraLarge';
type TextType =
    | 'normal'
    | 'success'
    | 'error'
    | 'white'
    | 'primary'
    | 'link'
    | 'warning';

export interface FormatCurrencyStyledProps {
    amount: number;
    size?: SizeTypes;
    noDecimal?: boolean;
    textType?: TextType;
    currency?: string;
    className?: string;
    onClick?: () => void;
}

export function FormatCurrency({
    amount,
    region = 'en-IN',
    currency = 'INR',
    style = 'currency',
    noDecimal = false,
}: {
    amount: number;
    region?: string;
    currency?: string;
    style?: 'currency' | 'decimal' | 'percent' | 'unit';
    noDecimal?: boolean;
}) {
    if (noDecimal) {
        return new Intl.NumberFormat(region, {
            style,
            currency,
            maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
            minimumFractionDigits: 0,
        }).format(amount);
    }

    return new Intl.NumberFormat(region, {
        style,
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
}

export const FormatCurrencyStyled = ({
    amount = 0,
    size = 'sm',
    noDecimal = false,
    textType = 'primary',
    currency,
    className,
    onClick = () => {},
}: FormatCurrencyStyledProps) => {
    if (typeof amount !== 'number') return null; // Return null if the 'amount' is not a number

    const amountSplit = FormatCurrency({ amount, noDecimal, currency }).split(
        '.'
    ); // Split the formatted currency into two parts: integer and decimal
    const sizeClass: Record<SizeTypes, string> = {
        xs: 'text-xs ',
        sm: 'text-sm',
        md: 'text-base ',
        lg: 'text-base ',
        extraLarge: 'text-xl ',
    };

    const sizeClassSub: Record<SizeTypes, string> = {
        xs: 'text-[10px] ',
        sm: 'text-xxs',
        md: 'text-xs',
        lg: 'text-sm',
        extraLarge: 'text-base ',
    };

    const type = {
        error: 'text-error',
        success: 'text-success',
        normal: 'text-base-primary',
        white: 'text-primary-content',
        link: 'link link-hover',
        warning: 'text-warning',
        primary: 'text-base-primary',
    };

    const textbacktype = {
        error: 'text-error',
        success: 'text-success',
        normal: 'text-base-secondary',
        white: 'text-primary-content',
        primary: 'text-base-primary',
        link: 'link link-hover',
        warning: 'text-warning',
    };

    return (
        <div
            className={cn(
                'font-medium',
                sizeClass[size],
                type[textType],
                className
            )}
            onClick={onClick}
            id='invoice_amount'
        >
            {amountSplit[0]}

            {!noDecimal && (
                <span
                    className={cn(
                        '',
                        textbacktype[textType],
                        sizeClassSub[size]
                    )}
                >
                    .{amountSplit[1]}{' '}
                </span>
            )}
        </div>
    ) as any;
};

export const convertGMTToUTCDateTime = (date: Date) => {
    return addMinutes(date, date.getTimezoneOffset());
};

export const FormatDisplayDateStyled = ({
    value,
    size = 'sm',
    containerClass,
    className,
    showTime = true,
}: {
    value: string;
    containerClass?: string;
    className?: string;
    size?: SizeTypes;
    showTime?: boolean;
}) => {
    if (isUndefinedOrNull(value)) return null;

    const time = format(new Date(value), 'p');
    const date = format(
        showTime ? convertGMTToUTCDateTime(new Date(value)) : new Date(value),
        'dd MMM, yyyy'
    );

    const sizeClass: Record<SizeTypes, string> = {
        xs: 'text-xs ',
        sm: 'text-sm ',
        md: 'text-base ',
        lg: 'text-base ',
        extraLarge: 'text-xl ',
    };

    const getSecondarySize = () => {
        if (size === 'xs') return 'text-[10px]';
        const sizesInArray = Object.keys(sizeClass);
        const index = sizesInArray.findIndex((val) => val === size) - 1;
        return sizeClass[sizesInArray[index] as SizeTypes];
    };

    return (
        <div className={cn(sizeClass[size], containerClass)}>
            {date}
            {showTime && (
                <span
                    className={cn(
                        'font-normal ml-0.5',
                        className,
                        getSecondarySize(),
                        {
                            '!text-polaris-size-275': size === 'sm',
                        }
                    )}
                >
                    {time}{' '}
                </span>
            )}
        </div>
    );
};

export function GetObjectProperty<T = any>(
    object: any,
    path: string | (string | number)[] = '',
    defVal: T | undefined = undefined
): T | undefined {
    if (typeof path === 'string') {
        path = path.split('.');
    }

    if (Array.isArray(path)) {
        if (path.length === 0) {
            return defVal;
        }

        let current: any = object;
        for (const key of path) {
            if (current == null || !(key in current)) {
                return defVal;
            }
            current = current[key];
        }
        return current as T;
    }

    return defVal;
}

export const GetDateValue = (
    date: any,
    format?: string,
    defaultDate?: Date
) => {
    if (!date || isDate(date)) return date;
    if (format) {
        return parse(date, format, new Date());
    }

    if (!isValid(new Date(date))) return defaultDate;

    return new Date(date);
};

/**
 * Sort Array of Object.
 *
 * @param data `array` Array of object to sort.
 * @param sortKey `string` Key to sort by. `Default: id`
 * @param sortOrder `asc | desc` Sorting order. `Default: 'asc'`
 * @returns `array`
 */
export const SortArrayObjectBy = <TData = any,>(
    data: TData[],
    sortKey: string = 'id',
    sortOrder: 'asc' | 'desc' = 'asc',
    isDate?: boolean
) => {
    if (!sortKey || !data || isEmptyArray(data) || data.length < 2) return data;

    let newData = [...data];
    newData.sort((prev: any, next: any) => {
        const prevVal = GetObjectProperty(prev, sortKey) || 0;
        const nextVal = GetObjectProperty(next, sortKey) || 0;

        if (sortOrder === 'asc') {
            if (isDate) {
                if (!prevVal || !nextVal) return 0;
                return GetDateValue(prevVal) - GetDateValue(nextVal);
            }
            if (typeof prevVal === 'string') {
                return prevVal
                    .toString()
                    .toLowerCase()
                    .localeCompare(nextVal.toString().toLowerCase(), 'en', {
                        numeric: true,
                    });
            }
            if (typeof prevVal === 'number') {
                return prevVal - nextVal;
            }
        }

        if (sortOrder === 'desc') {
            if (isDate) {
                if (!prevVal || !nextVal) return 0;
                return GetDateValue(nextVal) - GetDateValue(prevVal);
            }
            if (typeof prevVal === 'string') {
                return nextVal
                    .toString()
                    .toLowerCase()
                    .localeCompare(prevVal.toString().toLowerCase(), 'en', {
                        numeric: true,
                    });
            }
            if (typeof prevVal === 'number') {
                return nextVal - prevVal;
            }
        }

        return 0;
    });
    return newData;
};
