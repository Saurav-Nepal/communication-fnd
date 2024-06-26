import { cva, type VariantProps } from 'class-variance-authority';
import { AnyMaskedOptions } from 'imask';
import { InputHTMLAttributes } from 'react';

import { DatePickerInputProps } from '../DatePicker/datePicker.types';
import { inputVariants } from '../InputField/input.types';

interface MaskBlocksType {
    [key: string]: AnyMaskedOptions;
}

export const maskedInputVariants = cva('input input-bordered', {
    variants: {
        size: {
            xs: 'input-xs',
            sm: 'input-sm',
            md: 'input-md',
            lg: 'input-lg',
            normal: 'input-normal',
        },

        isError: {
            true: 'input-error',
            false: 'input-default',
        },

        smallWidth: {
            true: 'max-w-[450px]',
        },
    },
});
export const maskedInputContainerVariants = cva('', {
    variants: {
        containerSize: {
            xs: 'container-input-xs',
            sm: 'container-input-sm',
            md: 'container-input-md',
            lg: 'container-input-lg',
            normal: 'container-input-normal',
        },
        disabled: {
            true: 'input-container-disabled',
        },
        isValidInput: {
            true: 'valid-input',
        },
    },
});

export const maskedInputGroupVariants = cva('input-group', {
    variants: {
        InputGroupSizes: {
            xs: 'input-group-xs',
            sm: 'input-group-sm',
            md: 'input-group-md',
            lg: 'input-group-lg',
            normal: 'input-group-normal',
        },
    },
});

export const maskedInputGroupAddonVariants = cva('input-addon-group', {
    variants: {
        InputGroupSizes: {
            xs: 'input-group-xs',
            sm: 'input-group-sm',
            md: 'input-group-md',
            lg: 'input-group-lg',
            normal: 'input-group-normal',
        },
    },
});

export interface MaskedInputProps
    extends Omit<
            InputHTMLAttributes<HTMLInputElement>,
            | 'size'
            | 'autoComplete'
            | 'prefix'
            | 'max'
            | 'min'
            | 'value'
            | 'error'
            | 'onChange'
        >,
        VariantProps<typeof maskedInputVariants>,
        VariantProps<typeof maskedInputGroupVariants>,
        VariantProps<typeof maskedInputContainerVariants> {
    onChange?(value: any): void;
    onClick?(e: any): void;
    onBlur?(e: any): void;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    addonStart?: React.ReactNode;
    addonEnd?: React.ReactNode;
    error?: string | string[];
    validate?: boolean;
    autoFocus?: boolean;
    autoComplete?: boolean;
    inputClassName?: string;
    groupClassName?: string;
    label?: React.ReactNode | string;
    value?: any;
    defaultValue?: any;
    placeholder?: any;
    isVerified?: boolean;
    min?: number;
    max?: number;
    message?: React.ReactNode;
    messageComponent?: React.ReactNode;
    isLoading?: boolean;
    warning?: string;
    smallWidth?: boolean;
    mask: any;
    blockTypes?: MaskBlocksType;
    placeholderChar?: string;
    dir?: 'rtl' | 'ltr';
    inputAddOnClassName?: string;
}

export interface MaskedDatePickerInputProps
    extends Omit<DatePickerInputProps, 'customDisplay' | 'value'> {
    value?: Date | string;
    dateFormat?: string;
    hideClear?: boolean;
    name?: string;
    inputAddOnClassName?: string;
    groupClassName?: string;
    className?: string;
    warning?: string;
    message?: React.ReactNode;
}
