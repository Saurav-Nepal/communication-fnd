import { format } from 'date-fns'; // Importing format function from 'date-fns' library

import {
    convertGMTToUTCDateTime,
    EmptyFunction,
    FormatCurrency,
    useApp,
} from '@finnoto/core';

// Importing FormatCurrency function from '@finnoto/core' library

import { cn, IsUndefinedOrNull } from './common.ui.utils'; // Importing IsUndefinedOrNull function from './common.ui.utils' file

type sizeTypes = 'xs' | 'sm' | 'md' | 'lg' | 'extraLarge' | '2xl'; // Defining a custom type 'sizeTypes' with specific string values
type textType =
    | 'normal'
    | 'success'
    | 'error'
    | 'white'
    | 'primary'
    | 'link'
    | 'warning'; // Defining a custom type 'textType' with specific string values

// Exporting FormatCurrencyStyled component as a function
export const FormatCurrencyStyled = ({
    amount = 0,
    size = 'sm',
    noDecimal = false,
    textType = 'primary',
    currency,
    className,
    onClick = EmptyFunction,
}: {
    amount: number;
    size?: sizeTypes;
    noDecimal?: boolean;
    textType?: textType;
    currency?: string;
    className?: string;
    onClick?: () => void;
}) => {
    const { isArc } = useApp();
    if (typeof amount !== 'number') return null; // Return null if the 'amount' is not a number
    if (noDecimal) return FormatCurrency({ amount, noDecimal, currency }); // If 'noDecimal' is true, return the formatted currency without decimals

    const amountSplit = FormatCurrency({ amount, noDecimal, currency }).split(
        '.'
    ); // Split the formatted currency into two parts: integer and decimal
    const sizeClass = {
        xs: 'text-xs ',
        sm: isArc ? 'text-polaris-size-325' : 'text-sm',
        md: 'text-base ',
        lg: 'text-base ',
        extraLarge: 'text-xl ',
        '2xl': 'text-2xl ',
    };

    const sizeClassSub = {
        xs: 'text-[10px] ',
        sm: 'text-xxs',
        md: 'text-xs',
        lg: 'text-sm',
        extraLarge: 'text-base ',
        '2xl': 'text-xl ',
    };

    const type = {
        error: 'text-error',
        success: 'text-success',
        normal: 'text-base-primary',
        white: 'text-primary-content',
        link: 'link link-hover',
        warning: 'text-warning',
    };

    const textbacktype = {
        error: 'text-error',
        success: 'text-success',
        normal: 'text-base-secondary',
        white: 'text-primary-content',
        primary: 'text-base-primary',
        link: 'link link-hover',
    };

    // Return a JSX element with the formatted currency and styling based on the input parameters
    return (
        <div
            className={cn(
                'font-medium',
                sizeClass[size],
                type[textType],
                className
            )}
            onClick={onClick}
        >
            {amountSplit[0]}.
            {/* Display the integer part of the formatted currency */}
            <span
                className={cn('', textbacktype[textType], sizeClassSub[size])}
            >
                {amountSplit[1]}{' '}
                {/* Display the decimal part of the formatted currency */}
            </span>
        </div>
    ) as any; // Use 'as any' to suppress TypeScript errors related to JSX
};

// Exporting FormatDisplayDateStyled component as a function
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
    size?: sizeTypes;
    showTime?: boolean;
}) => {
    const { isArc } = useApp();

    if (IsUndefinedOrNull(value)) return null; // Return null if the 'value' is undefined or null

    const time = format(new Date(value), 'p'); // Format the provided date value to display the time
    const date = format(
        showTime ? convertGMTToUTCDateTime(new Date(value)) : new Date(value),
        'dd MMM, yyyy'
    ); // Format the provided date value to display the date

    const sizeClass = {
        xs: 'text-xs ',
        sm: isArc ? 'text-polaris-size-325' : 'text-sm ',
        md: 'text-base ',
        lg: 'text-base ',
        extraLarge: 'text-xl ',
    };

    const getSecondarySize = () => {
        if (size === 'xs') return 'text-[10px]';
        const sizesInArray = Object.keys(sizeClass);
        const index = sizesInArray.findIndex((val) => val === size) - 1;
        return sizeClass[sizesInArray[index]];
    };

    // Return a JSX element with the formatted date and optional time, along with styling based on the input parameters
    return (
        <div className={cn(sizeClass[size], containerClass)}>
            {date} {/* Display the formatted date */}
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
                    {/* Display the formatted time if 'showTime' is true */}
                </span>
            )}
        </div>
    );
};

export function copyTextToClipboard(text: string) {
    if (!navigator.clipboard) {
        console.error('Could not copy text');
        return;
    }
    navigator.clipboard.writeText(text).then(
        function () {
            console.info('Async: Copying to clipboard was successful!');
        },
        function (err) {
            console.error('Async: Could not copy text: ', err);
        }
    );
}
